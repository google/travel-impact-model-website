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
  ComputeTypicalFlightEmissionsRequest,
  ComputeTypicalFlightEmissionsResponse,
} from "./proto/generated/travelImpactModelProto";
import { FirebaseApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import fakeTypicalEmissionsApiResponse from "./proto/fakeTypicalEmissionsApiResponse.json";
import axios from "axios";

async function getTypicalFlightEmissionsData(
  request: ComputeTypicalFlightEmissionsRequest,
  app: FirebaseApp
): Promise<ComputeTypicalFlightEmissionsResponse> {
  if (process.env.REACT_APP_API_URL && process.env.REACT_APP_API_KEY) {
    // Get data from user input API URL. Set `REACT_APP_API_URL=<url> REACT_APP_API_KEY=<api key> npm start`.
    const response = await axios.post(process.env.REACT_APP_API_URL, request, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        key: process.env.REACT_APP_API_KEY,
      },
    });
    if (response?.data) {
      return response.data;
    }
  } else if (process.env.REACT_APP_FAKE_API_DATA || process.env.REACT_APP_FAKE_API_EASA_DATA) {
    // Get data from fake data. Set `REACT_APP_FAKE_API_DATA=true npm start`.
    return ComputeTypicalFlightEmissionsResponse.fromJSON(fakeTypicalEmissionsApiResponse);
  } else {
    const functions = getFunctions(app);
    const computeTypicalFlightEmissions = httpsCallable(functions, "computeTypicalFlightEmissions");
    const apiResponse: ComputeTypicalFlightEmissionsResponse = await computeTypicalFlightEmissions({
      data: request,
    })
      .then((response) => ComputeTypicalFlightEmissionsResponse.fromJSON(response.data))
      .catch((error) => {
        console.warn(error);
        return { typicalFlightEmissions: [], modelVersion: undefined };
      });

    if (
      apiResponse?.typicalFlightEmissions?.length != 0 &&
      apiResponse?.typicalFlightEmissions?.[0].emissionsGramsPerPax !== undefined
    ) {
      return apiResponse;
    }
  }
  return { typicalFlightEmissions: [], modelVersion: undefined };
}

export default getTypicalFlightEmissionsData;
