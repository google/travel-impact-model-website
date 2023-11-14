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
import getFlightEmissionsData from "./getFlightEmissionsData";

function convertGramsToKilograms(value: number | undefined) {
  if (value === undefined) {
    return undefined;
  }
  return value / 1000;
}

const travelImpactModelApi = {
  async getComputeFlightEmissions(
    request: ComputeFlightEmissionsRequest,
    app: FirebaseApp
  ): Promise<ComputeFlightEmissionsResponse> {
    const response = await getFlightEmissionsData(request, app);
    const data = ComputeFlightEmissionsResponse.fromJSON(response);

    // Convert emissions grams to kilograms
    if (data.flightEmissions !== undefined) {
      data.flightEmissions.forEach((emissions) => {
        const emissionsGramsPerPax = emissions.emissionsGramsPerPax;
        if (emissionsGramsPerPax !== undefined) {
          emissionsGramsPerPax.economy = convertGramsToKilograms(emissionsGramsPerPax.economy);
          emissionsGramsPerPax.premiumEconomy = convertGramsToKilograms(
            emissionsGramsPerPax.premiumEconomy
          );
          emissionsGramsPerPax.business = convertGramsToKilograms(emissionsGramsPerPax.business);
          emissionsGramsPerPax.first = convertGramsToKilograms(emissionsGramsPerPax.first);
        }
      });
    }
    return data;
  },
};

export default travelImpactModelApi;
