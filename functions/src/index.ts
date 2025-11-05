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

/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onCall, CallableRequest } from "firebase-functions/v2/https";
import axios from "axios";
import { initializeApp } from "firebase-admin/app";

initializeApp();

/**
 * Calls Travel Impact Model computeFlightEmissions API
 *
 * @return {AxiosResponse} Returns API response
 */
export const computeFlightEmissions = onCall(
  { cors: true, secrets: ["TIM_API_KEY"] },
  async (request: CallableRequest) => {
    const apiResponse = await axios.post(
      "https://travelimpactmodel.googleapis.com/v1/flights:computeFlightEmissions",
      request.data.data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: process.env.TIM_API_KEY,
        },
      }
    );
    return apiResponse.data;
  }
);

/**
 * Calls Travel Impact Model computeTypicalFlightEmissions API
 *
 * @return {AxiosResponse} Returns API response
 */
export const computeTypicalFlightEmissions = onCall(
  { cors: true, secrets: ["TIM_API_KEY"] },
  async (request: CallableRequest) => {
    const apiResponse = await axios.post(
      "https://travelimpactmodel.googleapis.com/v1/flights:computeTypicalFlightEmissions",
      request.data.data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: process.env.TIM_API_KEY,
        },
      }
    );
    return apiResponse.data;
  }
);
