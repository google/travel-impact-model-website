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
import { convertDateMessageToString, convertStringToDateMessage } from "../../../data/flightDate";
import { DateMessage } from "../../../api/proto/generated/travelImpactModelProto";

describe("convertStringToDateMessage", () => {
  it("should return test_value as DateMessage component", async () => {
    const test_value = "20191230";
    const response = convertStringToDateMessage(test_value);
    const expectedRespone = {
      year: Number(test_value.slice(0, 4)),
      month: Number(test_value.slice(4, 6)),
      day: Number(test_value.slice(6, 8)),
    } as DateMessage;
    expect(response).toEqual(expectedRespone);
  });

  it("should return current date as DateMessage component using 7-character number", async () => {
    const test_value = "2020049";
    const response = convertStringToDateMessage(test_value);
    const expectedRespone = {
      year: Number(dayjs().format("YYYY")),
      month: Number(dayjs().format("MM")),
      day: Number(dayjs().format("DD")),
    } as DateMessage;
    expect(response).toEqual(expectedRespone);
  });

  it("should return current date as DateMessage component using 8-character input", async () => {
    const test_value = "20abcdef";
    const response = convertStringToDateMessage(test_value);
    const expectedRespone = {
      year: Number(dayjs().format("YYYY")),
      month: Number(dayjs().format("MM")),
      day: Number(dayjs().format("DD")),
    } as DateMessage;
    expect(response).toEqual(expectedRespone);
  });
});

describe("convertDateMessageToString", () => {
  it("should return test_value as string in YYYYMMDD format", async () => {
    const test_value = "20191230";
    const response = convertDateMessageToString({
      year: Number(test_value.slice(0, 4)),
      month: Number(test_value.slice(4, 6)),
      day: Number(test_value.slice(6, 8)),
    } as DateMessage);
    const expectedRespone = test_value;
    expect(response).toEqual(expectedRespone);
  });
  it("should return test_value as string in YYYYMMDD format for single number month/day", async () => {
    const response = convertDateMessageToString({
      year: 2019,
      month: 1,
      day: 2,
    } as DateMessage);
    const expectedRespone = "20190102";
    expect(response).toEqual(expectedRespone);
  });

  it("should return today's date as string in YYYYMMDD format for undefined values", async () => {
    const response = convertDateMessageToString(undefined);
    const expectedRespone = dayjs().format("YYYYMMDD");
    expect(response).toEqual(expectedRespone);
  });
});
