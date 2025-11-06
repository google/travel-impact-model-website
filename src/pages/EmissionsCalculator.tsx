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
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FirebaseApp } from "firebase/app";
import FlightCalculatorForm from "../components/FlightCalculatorForm";
import RouteCalculatorForm from "../components/RouteCalculatorForm";
import RouteOutputData from "../components/RouteOutputData";
import Footer from "../components/Footer";
import Link from "../components/Link";
import OutputData from "../components/OutputData";
import MultiFlightForm from "../components/MultiFlightForm";
import TIMAppBar from "../components/TIMAppBar";
import {
  FLIGHT_ITINERARY_URL_PARAM,
  generateFlightItineraryUrlParam,
  parseFlightItineraryUrlParam,
  generateRouteItineraryUrlParam,
  flightEmissionsRequestToTypicalFlightEmissionsRequest,
} from "../data/flightItinerary";
import travelImpactModelApi from "../api/travelImpactModelApi";
import {
  ComputeFlightEmissionsResponse,
  ComputeTypicalFlightEmissionsResponse,
  Flight,
  Market,
} from "../api/proto/generated/travelImpactModelProto";
import "./EmissionsCalculator.scss";
import Box from "@mui/material/Box";

interface EmissionsCalculatorProps {
  app: FirebaseApp;
}

function EmissionsCalculator({ app }: EmissionsCalculatorProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [toolTipOpen, setToolTipOpen] = useState(false);
  const [emissionsDataValid, setEmissionsDataValid] = useState<ComputeFlightEmissionsResponse>();
  const [typicalEmissionsDataValid, setTypicalEmissionsDataValid] =
    useState<ComputeTypicalFlightEmissionsResponse>();
  const modelVersion = searchParams.get("v");
  const param = searchParams.get(FLIGHT_ITINERARY_URL_PARAM) ?? "";
  const flightRequest = parseFlightItineraryUrlParam(param);
  const routeRequest = flightEmissionsRequestToTypicalFlightEmissionsRequest(flightRequest);
  const url = new URL(document.location.toString());
  const [selectedTab, setSelectedTab] = useState(
    url.pathname == "/lookup/route" ? "route" : "flight"
  );

  /** Change the URL so that it contains the details of the search. */
  function updateFlightUrl(itinerary: Flight[]) {
    const url = new URL(document.location.toString());
    url.searchParams.set(FLIGHT_ITINERARY_URL_PARAM, generateFlightItineraryUrlParam(itinerary));
    navigate(`${url.pathname}${url.search}`);
  }

  function updateRouteUrl(market: Market) {
    const url = new URL(document.location.toString());
    url.searchParams.set(FLIGHT_ITINERARY_URL_PARAM, generateRouteItineraryUrlParam(market));
    navigate(`${url.pathname}${url.search}`);
  }

  const handleToggle = (event: React.MouseEvent, value: string) => {
    if (value === "route" || value === "flight") {
      setSelectedTab(value);
      const url = new URL(document.location.toString());
      navigate(`/lookup/${value}${url.search}`);
    }
  };

  function onFlightSubmit(inputRowFlightLegs: Map<number, Flight>) {
    const flights: Flight[] = Array.from(inputRowFlightLegs.values());
    updateFlightUrl(flights);

    const updatedRequest = {
      ...flightRequest,
      flights: flights,
    };

    const emissionsData = travelImpactModelApi.getComputeFlightEmissions(updatedRequest, app);
    emissionsData.then((response) => {
      setEmissionsDataValid(response);
    });

    const typicalEmissionsData = travelImpactModelApi.getComputeTypicalFlightEmissions(
      flightEmissionsRequestToTypicalFlightEmissionsRequest(updatedRequest),
      app
    );
    typicalEmissionsData.then((response) => {
      setTypicalEmissionsDataValid(response);
    });
  }

  function onRouteSubmit(market: Market) {
    // Preserve the full flight info in the URL when switching tabs.
    // But update it when it's a differnt route.
    if (
      flightRequest?.flights[0]?.origin !== market?.origin ||
      flightRequest?.flights[0]?.destination !== market?.destination
    ) {
      updateRouteUrl(market);
    }

    const updatedRequest = {
      ...routeRequest,
      markets: [market],
    };

    const typicalEmissionsData = travelImpactModelApi.getComputeTypicalFlightEmissions(
      updatedRequest,
      app
    );
    typicalEmissionsData.then((response) => {
      setTypicalEmissionsDataValid(response);
    });
  }

  const CcLicencingLink = (
    <Link text="CC BY-SA 4.0" href="https://creativecommons.org/licenses/by-sa/4.0/" />
  );

  let modelVersionString = "";
  if (emissionsDataValid && emissionsDataValid.modelVersion) {
    const mv = emissionsDataValid.modelVersion;
    modelVersionString = `Model Version: ${mv.major}.${mv.minor}.${mv.patch}`;
  }
  const modelVersionWarning = "This data is using the latest model version.";

  const variant = "background-none";

  return (
    <div>
      <title>Emissions Calculator</title>
      <meta
        name="description"
        content="Use the TIM calculator to estimate route or flight emissions. Enter your trip details to get a clear, per-passenger breakdown of carbon impact."
      />
      <TIMAppBar variant={variant} />
      <div className="emissionscalculator-container" role="main" id="main" tabIndex={-1}>
        <Typography variant="h2" component="h1">
          Emissions Calculator
        </Typography>
        {flightRequest?.flights.length > 1 ? (
          // Multi-flight page: clickable links for each leg.
          <>
            <Typography component="h2" variant="h5">
              All flights
            </Typography>
            <MultiFlightForm request={flightRequest} />
          </>
        ) : (
          // 2 tabs to select Route or Flight.
          <>
            <Box sx={{ pb: 3 }}>
              <ToggleButtonGroup
                exclusive
                fullWidth
                size="large"
                aria-label="Select Route or Flight Emissions Calculator"
                value={selectedTab}>
                <ToggleButton value="route" onChange={handleToggle}>
                  Route
                </ToggleButton>
                <ToggleButton value="flight" onChange={handleToggle}>
                  Specific flight
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {selectedTab == "route" ? (
              <Box>
                <Typography variant="body1" component="span">
                  Add your route info to see typical emissions per passenger
                </Typography>
                <RouteCalculatorForm request={routeRequest} onSubmit={onRouteSubmit} />
                {routeRequest.markets.length === 1 && typicalEmissionsDataValid && (
                  <RouteOutputData typicalEmissionsData={typicalEmissionsDataValid} />
                )}
              </Box>
            ) : (
              <Box>
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
                      aria-label={
                        toolTipOpen
                          ? "Emissions data is only available for future flights."
                          : "Click to show tooltip."
                      }
                      onClick={() => setToolTipOpen(!toolTipOpen)}
                      sx={{ margin: "-8px 0", padding: "16px" }}>
                      <InfoOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </ClickAwayListener>
                {modelVersion && emissionsDataValid && (
                  <Alert
                    className="alert-icon"
                    severity="warning"
                    aria-label={`Warning: ${modelVersionWarning}`}>
                    <span className="screen-reader-only">Warning:</span>
                    <span>{modelVersionWarning}</span>
                  </Alert>
                )}
                <FlightCalculatorForm request={flightRequest} onSubmit={onFlightSubmit} />
                {flightRequest.flights.length === 1 && emissionsDataValid && (
                  <OutputData
                    emissionsData={emissionsDataValid}
                    typicalEmissionsData={typicalEmissionsDataValid}
                  />
                )}
              </Box>
            )}
          </>
        )}
        <Footer prefixInfo={modelVersionString} extraLink={CcLicencingLink} variant={variant} />
      </div>
    </div>
  );
}

export default EmissionsCalculator;
