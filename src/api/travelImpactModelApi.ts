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
  ComputeTypicalFlightEmissionsRequest,
  ComputeTypicalFlightEmissionsResponse,
  EmissionsGramsPerPax,
} from "./proto/generated/travelImpactModelProto";
import { FirebaseApp } from "firebase/app";
import getFlightEmissionsData from "./getFlightEmissionsData";
import getTypicalFlightEmissionsData from "./getTypicalFlightEmissionsData";

function convertGramsToKilograms(value: number | undefined) {
  if (value === undefined) {
    return undefined;
  }
  return value / 1000;
}

function emissionsGramsToKilograms(emissionsGramsPerPax: EmissionsGramsPerPax | undefined) {
  if (emissionsGramsPerPax !== undefined) {
    emissionsGramsPerPax.economy = convertGramsToKilograms(emissionsGramsPerPax.economy);
    emissionsGramsPerPax.premiumEconomy = convertGramsToKilograms(
      emissionsGramsPerPax.premiumEconomy
    );
    emissionsGramsPerPax.business = convertGramsToKilograms(emissionsGramsPerPax.business);
    emissionsGramsPerPax.first = convertGramsToKilograms(emissionsGramsPerPax.first);
  }

  return emissionsGramsPerPax;
}

const travelImpactModelApi = {
  async getComputeFlightEmissions(
    request: ComputeFlightEmissionsRequest,
    app: FirebaseApp
  ): Promise<ComputeFlightEmissionsResponse> {
    const response = await getFlightEmissionsData(request, app);
    const data = ComputeFlightEmissionsResponse.fromJSON(response);

    // Convert emissions values from grams to kilograms
    if (data.flightEmissions !== undefined) {
      data.flightEmissions.forEach((emissions) => {
        emissions.emissionsGramsPerPax = emissionsGramsToKilograms(emissions.emissionsGramsPerPax);
        if (emissions.emissionsBreakdown !== undefined) {
          emissions.emissionsBreakdown.ttwEmissionsGramsPerPax = emissionsGramsToKilograms(
            emissions.emissionsBreakdown?.ttwEmissionsGramsPerPax
          );
          emissions.emissionsBreakdown.wttEmissionsGramsPerPax = emissionsGramsToKilograms(
            emissions.emissionsBreakdown?.wttEmissionsGramsPerPax
          );
        }
      });
    }
    return data;
  },
  async getComputeTypicalFlightEmissions(
    request: ComputeTypicalFlightEmissionsRequest,
    app: FirebaseApp
  ): Promise<ComputeTypicalFlightEmissionsResponse> {
    const response = await getTypicalFlightEmissionsData(request, app);
    const data = ComputeTypicalFlightEmissionsResponse.fromJSON(response);

    if (data.typicalFlightEmissions !== undefined) {
      data.typicalFlightEmissions.forEach((emissions) => {
        emissions.emissionsGramsPerPax = emissionsGramsToKilograms(emissions.emissionsGramsPerPax);
      });
    }
    return data;
  },
};

export default travelImpactModelApi;
