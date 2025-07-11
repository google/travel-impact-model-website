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

import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import {
  ComputeFlightEmissionsRequest,
  Flight,
} from "../api/proto/generated/travelImpactModelProto";
import { convertDateMessageToString } from "../data/flightDate";
import "./MultiFlightForm.scss";
import {
  FLIGHT_ITINERARY_URL_PARAM,
  generateFlightItineraryUrlParam,
} from "../data/flightItinerary";

interface MultiFlightFormProps {
  request: ComputeFlightEmissionsRequest;
}

function getUrl(flights: Flight[]) {
  const url = new URL(document.location.toString());
  url.searchParams.set(FLIGHT_ITINERARY_URL_PARAM, generateFlightItineraryUrlParam(flights));
  return url.toString();
}

function MultiFlightForm({ request }: MultiFlightFormProps) {
  return (
    <div className="readonly-input-fields-container">
      {request.flights.map((leg, index) => (
        <Box className="readonly-flight-container" borderRadius={3} key={index}>
          <div>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {leg.origin} to {leg.destination}
            </Typography>
            <Typography variant="body2" sx={{ color: grey[700] }}>
              {leg.operatingCarrierCode}
              {leg.flightNumber} · Departing{" "}
              {dayjs(convertDateMessageToString(leg.departureDate)).format("ddd, MMM D, YYYY")}
            </Typography>
          </div>
          <Button
            aria-label={`Emissions details for ${leg.origin} to ${leg.destination} flight`}
            href={getUrl([leg])}
            color="info">
            Emissions Details
          </Button>
        </Box>
      ))}
    </div>
  );
}

export default MultiFlightForm;
