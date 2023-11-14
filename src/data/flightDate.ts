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

import dayjs from "dayjs";
import { DateMessage } from "../api/proto/generated/travelImpactModelProto";

const DATE_STRING_REGEX = new RegExp("^[0-9]{8}$");

export function convertStringToDateMessage(dateString: string): DateMessage {
  // If it is in unexpected format, set date to today.
  if (dateString && !DATE_STRING_REGEX.test(dateString)) {
    return {
      year: Number(dayjs().format("YYYY")),
      month: Number(dayjs().format("MM")),
      day: Number(dayjs().format("DD")),
    } as DateMessage;
  } else {
    return {
      year: Number(dateString.slice(0, 4)),
      month: Number(dateString.slice(4, 6)),
      day: Number(dateString.slice(6, 8)),
    } as DateMessage;
  }
}

export function convertDateMessageToString(dateMessage: DateMessage | undefined) {
  // If it is undefined, set date to today.
  if (!dateMessage) {
    return dayjs().format("YYYYMMDD");
  } else {
    return "".concat(
      dateMessage.year.toString(),
      dateMessage.month.toString().padStart(2, "0"),
      dateMessage.day.toString().padStart(2, "0")
    );
  }
}
