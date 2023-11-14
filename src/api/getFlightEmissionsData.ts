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

import {
  ComputeFlightEmissionsRequest,
  ComputeFlightEmissionsResponse,
} from "./proto/generated/travelImpactModelProto";
import { FirebaseApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import fakeApiResponse from "./proto/fakeApiResponse.json";

async function getFlightEmissionsData(
  request: ComputeFlightEmissionsRequest,
  app: FirebaseApp
): Promise<ComputeFlightEmissionsResponse> {
  if (process.env.REACT_APP_FAKE_API_DATA) {
    // Get data from fake data. Set `REACT_APP_FAKE_API_DATA=true npm start`.
    return ComputeFlightEmissionsResponse.fromJSON(fakeApiResponse);
  }

  const functions = getFunctions(app);
  const computeFlightEmissions = httpsCallable(functions, "computeFlightEmissions");
  const apiResponse: ComputeFlightEmissionsResponse = await computeFlightEmissions({
    data: request,
  })
    .then((response) => ComputeFlightEmissionsResponse.fromJSON(response.data))
    .catch((error) => {
      console.warn(error);
      return { flightEmissions: [], modelVersion: undefined };
    });

  if (
    apiResponse?.flightEmissions?.length != 0 &&
    apiResponse?.flightEmissions?.[0].emissionsGramsPerPax !== undefined
  ) {
    return apiResponse;
  }
  return { flightEmissions: [], modelVersion: undefined };
}

export default getFlightEmissionsData;
