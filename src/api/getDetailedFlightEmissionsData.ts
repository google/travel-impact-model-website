// Copyright 2025 Google LLC
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

import {
  ComputeDetailedFlightEmissionsRequest,
  ComputeDetailedFlightEmissionsResponse,
} from "./proto/generated/travelImpactModelProto";
import { FirebaseApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import fakeDetailedFlightEmissionsData from "./proto/fakeDetailedFlightEmissionsApiResponse.json";
import fakeEasaDetailedFlightEmissionsData from "./proto/fakeEasaDetailedFlightEmissionsApiResponse.json";
import axios from "axios";

async function getDetailedFlightEmissionsData(
  request: ComputeDetailedFlightEmissionsRequest,
  app: FirebaseApp
): Promise<ComputeDetailedFlightEmissionsResponse> {
  if (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_KEY) {
    // Get data from user input API URL. Set `VITE_API_URL=<url> VITE_API_KEY=<api key> npm start`.
    const response = await axios.post(import.meta.env.VITE_API_URL, request, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        key: import.meta.env.VITE_API_KEY,
      },
    });
    if (response?.data) {
      return response.data;
    }
  } else if (import.meta.env.VITE_FAKE_API_DATA) {
    // Get data from fake data. Set `VITE_FAKE_API_DATA=true npm start`.
    return ComputeDetailedFlightEmissionsResponse.fromJSON(fakeDetailedFlightEmissionsData);
  } else if (import.meta.env.VITE_FAKE_API_EASA_DATA) {
    // Get data from fake data. Set `VITE_FAKE_API_EASA_DATA=true npm start`.
    return ComputeDetailedFlightEmissionsResponse.fromJSON(fakeEasaDetailedFlightEmissionsData);
  } else {
    const functions = getFunctions(app);
    const computeDetailedFlightEmissions = httpsCallable(
      functions,
      "computeDetailedFlightEmissions"
    );
    const apiResponse: ComputeDetailedFlightEmissionsResponse =
      await computeDetailedFlightEmissions({
        data: request,
      })
        .then((response) => ComputeDetailedFlightEmissionsResponse.fromJSON(response.data))
        .catch((error) => {
          console.warn(error);
          return { flightsWithDetailedEmissions: [], modelVersion: undefined };
        });

    if (
      apiResponse?.flightsWithDetailedEmissions?.length != 0 &&
      apiResponse?.flightsWithDetailedEmissions?.[0].flightEmissionsDetails
        ?.emissionsGramsPerPax !== undefined
    ) {
      // Requests are for single leg flights and therefore, we only care about the first element.
      apiResponse.flightsWithDetailedEmissions = [apiResponse.flightsWithDetailedEmissions![0]];
      return apiResponse;
    }
  }
  return { flightsWithDetailedEmissions: [], modelVersion: undefined };
}

export default getDetailedFlightEmissionsData;
