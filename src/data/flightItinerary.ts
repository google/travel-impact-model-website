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

import { convertDateMessageToString, convertStringToDateMessage } from "./flightDate";
import {
  ComputeFlightEmissionsRequest,
  ComputeTypicalFlightEmissionsRequest,
  Flight,
} from "../api/proto/generated/travelImpactModelProto";

/** The flight itinerary URL parameter name. */
export const FLIGHT_ITINERARY_URL_PARAM = "itinerary";

/**
 * Converts the flight itinerary URL param to the FlightItinerary object.
 * The expected format is "ZRH-LON-LH-123-20231101,MUC-NYC-BA-456-20241124".
 * Both "-" and "/" are supported separators between flights and are treated equally.
 */
export function parseFlightItineraryUrlParam(itineraryStr: string): ComputeFlightEmissionsRequest {
  return {
    flights: itineraryStr
      ? itineraryStr.split(/[//,]+/).map((leg) => {
          const legBits = leg.split("-");
          return {
            origin: legBits[0] || "",
            destination: legBits[1] || "",
            operatingCarrierCode: legBits[2] || "",
            flightNumber: legBits[3] || "",
            departureDate: convertStringToDateMessage(legBits[4]) || "",
          } as Flight;
        })
      : [],
    includeEmissionsInputs: true,
    includeEmissionsBreakdown: true,
  };
}

export function flightEmissionsRequestToTypicalFlightEmissionsRequest(
  flightRequest: ComputeFlightEmissionsRequest
): ComputeTypicalFlightEmissionsRequest {
  return {
    markets: flightRequest?.flights.map((flight) => {
      return { origin: flight.origin, destination: flight.destination };
    }),
  };
}

/**
 * Encodes the provided FlightItinerary object into a URL param in the format
 * "ZRH-LON-LH-123-20231101,MUC-NYC-BA-456-20241124".
 */
export function generateFlightItineraryUrlParam(itinerary: Flight[]): string {
  return itinerary
    .map((leg) =>
      [
        leg.origin || "",
        leg.destination || "",
        leg.operatingCarrierCode || "",
        leg.flightNumber || "",
        leg.departureDate ? convertDateMessageToString(leg.departureDate) : "",
      ].join("-")
    )
    .join(",");
}
