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

import dayjs from "dayjs";
import { DateMessage } from "../api/proto/generated/travelImpactModelProto";
import { convertDateMessageToString } from "./flightDate";

export const AIRPORT_CODE_REGEX = new RegExp("^[a-zA-Z]{3}$");
export const CARRIER_CODE_REGEX = new RegExp("^[a-zA-Z0-9]{2}$");
export const FLIGHT_NUMBER_REGEX = new RegExp("^[0-9]+$");
export const NUMBER_OF_DAYS_IN_YEAR = 365;

export function getOriginHelperText(value: string | undefined) {
  if (!value || (value && !AIRPORT_CODE_REGEX.test(value))) {
    return "3-letter IATA airport code";
  }
}

export function getDestinationHelperText(value: string | undefined) {
  if (!value || (value && !AIRPORT_CODE_REGEX.test(value))) {
    return "3-letter IATA airport code";
  }
}

export function getCarrierCodeHelperText(value: string | undefined) {
  if (!value || (value && !CARRIER_CODE_REGEX.test(value))) {
    return "2-character IATA airline code";
  }
}

export function getFlightNumberHelperText(value: string | undefined) {
  if (!value || (value && !FLIGHT_NUMBER_REGEX.test(value))) {
    return "Numbers only";
  }
}

export function getDateHelperText(value: DateMessage | undefined) {
  const dateString = value ? convertDateMessageToString(value) : undefined;
  const valueInDayJsFormat = dayjs(dateString).isValid() ? dayjs(dateString) : dayjs();
  if (valueInDayJsFormat < dayjs().startOf("date")) {
    return "Departure date should be in the future";
  } else if (valueInDayJsFormat > dayjs().startOf("date").add(NUMBER_OF_DAYS_IN_YEAR, "day")) {
    return "Departure date cannot be more than a year in the future";
  }
}

export function isOriginDestinationTextErrorMessage(value: string | undefined) {
  return value !== undefined && !AIRPORT_CODE_REGEX.test(value);
}

export function isCarrierCodeTextErrorMessage(value: string | undefined) {
  return value !== undefined && !CARRIER_CODE_REGEX.test(value);
}

export function isFlightNumberTextErrorMessage(value: string | undefined) {
  return value !== undefined && !FLIGHT_NUMBER_REGEX.test(value);
}
