// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ClickAwayListener, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FirebaseApp } from "firebase/app";
import EditableInputFields from "../components/EditableInputFields";
import Footer from "../components/Footer";
import Link from "../components/Link";
import OutputData from "../components/OutputData";
import ReadonlyInputFields from "../components/ReadonlyInputFields";
import TIMAppBar from "../components/TIMAppBar";
import {
  FLIGHT_ITINERARY_URL_PARAM,
  generateFlightItineraryUrlParam,
  parseFlightItineraryUrlParam,
} from "../data/flightItinerary";
import travelImpactModelApi from "../api/travelImpactModelApi";
import {
  ComputeFlightEmissionsResponse,
  Flight,
} from "../api/proto/generated/travelImpactModelProto";
import "./EmissionsCalculator.scss";

interface EmissionsCalculatorProps {
  app: FirebaseApp;
}

function EmissionsCalculator({ app }: EmissionsCalculatorProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [toolTipOpen, setToolTipOpen] = useState(false);
  const [apiDataValid, setApiDataValid] = useState<ComputeFlightEmissionsResponse>();
  const modelVersion = searchParams.get("v");
  const request = parseFlightItineraryUrlParam(searchParams.get(FLIGHT_ITINERARY_URL_PARAM) ?? "");

  useEffect(() => {
    document.title = "Emissions Calculator Page";
  }, []);

  /** Redirects to the details page for this specific leg. */
  function redirectToItineraryPage(flights: Flight[]) {
    const url = new URL(document.location.toString());
    url.searchParams.set(FLIGHT_ITINERARY_URL_PARAM, generateFlightItineraryUrlParam(flights));
    navigate(`${url.pathname}${url.search}`);
  }

  function onSubmit(inputRowFlightLegs: Map<number, Flight>) {
    const flights: Flight[] = Array.from(inputRowFlightLegs.values());
    redirectToItineraryPage(flights);

    const updatedRequest = {
      ...request,
      flights: flights,
    };

    const apiData = travelImpactModelApi.getComputeFlightEmissions(updatedRequest, app);
    apiData.then((response) => {
      setApiDataValid(response);
    });
  }

  const CcLicencingLink = (
    <Link text="CC BY-SA 4.0" href="https://creativecommons.org/licenses/by-sa/4.0/" />
  );

  let modelVersionString = "";
  if (apiDataValid && apiDataValid.modelVersion) {
    const mv = apiDataValid.modelVersion;
    modelVersionString = `Model Version: ${mv.major}.${mv.minor}.${mv.patch}`;
  }
  const modelVersionWarning = "This data is using the latest model version.";

  const variant = "background-none";

  return (
    <div role="main">
      <TIMAppBar variant={variant} />
      <div className="emissionscalculator-container">
        <Typography variant="h2" component="h1">
          Emissions Calculator
        </Typography>

        {request.flights.length <= 1 ? (
          <>
            <Typography variant="body1" component="span">
              Add your flight info to see emissions estimates per passenger
            </Typography>
            <ClickAwayListener
              onClickAway={() => {
                setToolTipOpen(false);
              }}>
              <Tooltip
                className="info-icon"
                title="Emissions data is only available for future flights."
                onClose={() => setToolTipOpen(false)}
                open={toolTipOpen}>
                <IconButton
                  onClick={() => setToolTipOpen(!toolTipOpen)}
                  sx={{ margin: "-8px 0", padding: "16px" }}>
                  <InfoOutlinedIcon />
                </IconButton>
              </Tooltip>
            </ClickAwayListener>
            {modelVersion && apiDataValid && (
              <Alert
                className="alert-icon"
                severity="warning"
                aria-label={`Warning: ${modelVersionWarning}`}>
                <span className="screen-reader-only">Warning:</span>
                <span>{modelVersionWarning}</span>
              </Alert>
            )}
            <EditableInputFields request={request} onSubmit={onSubmit} />
            {request.flights.length === 1 && apiDataValid && <OutputData apiData={apiDataValid} />}
          </>
        ) : (
          <>
            <Typography component="h2" variant="h5">
              All flights
            </Typography>
            <ReadonlyInputFields request={request} />
          </>
        )}
        <Footer prefixInfo={modelVersionString} extraLink={CcLicencingLink} variant={variant} />
      </div>
    </div>
  );
}

export default EmissionsCalculator;
