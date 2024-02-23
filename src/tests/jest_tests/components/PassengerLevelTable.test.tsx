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

import PassengerLevelTable, {
  formatEmissionsPerPassenger,
} from "../../../components/PassengerLevelTable";
import {
  ComputeFlightEmissionsResponse,
  EmissionsGramsPerPax,
} from "../../../api/proto/generated/travelImpactModelProto";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("PassengerLevelTable", () => {
  it("should return passenger level table with expected values", async () => {
    const apiData: ComputeFlightEmissionsResponse = {
      flightEmissions: [
        {
          flight: {
            origin: "ZRH",
            destination: "BOS",
            operatingCarrierCode: "LX",
            departureDate: { year: 2024, month: 6, day: 1 },
            flightNumber: "54",
          },
          emissionsGramsPerPax: {
            first: 1745475,
            business: 139638,
            premiumEconomy: 523642,
            economy: 349095,
          },
          emissionsInputs: {
            emissionsInputEntries: {},
          },
          emissionsBreakdown: {
            wttEmissionsGramsPerPax: {
              first: 4004,
              business: 3003,
              premiumEconomy: 2002,
              economy: 1001,
            },
            ttwEmissionsGramsPerPax: {
              first: 1745475,
              business: 139638,
              premiumEconomy: 523642,
              economy: 349095,
            },
          },
        },
      ],
      modelVersion: {
        major: 1,
        minor: 5,
        patch: 0,
        dated: "20220914",
      },
    };

    render(<PassengerLevelTable apiData={apiData} />);
    expect(screen.getByText("Economy")).not.toBeEmptyDOMElement();
    expect(screen.getByText("Premium")).not.toBeEmptyDOMElement();
    expect(screen.getByText("Business")).not.toBeEmptyDOMElement();
    expect(screen.getByText("First")).not.toBeEmptyDOMElement();
  });

  it("should return passenger level table with emissionsGramsPerPax empty", async () => {
    const apiData: ComputeFlightEmissionsResponse = {
      flightEmissions: [
        {
          flight: {
            origin: "ZRH",
            destination: "BOS",
            operatingCarrierCode: "LX",
            departureDate: { year: 2024, month: 6, day: 1 },
            flightNumber: "54",
          },
          emissionsGramsPerPax: {},
          emissionsInputs: {
            emissionsInputEntries: {},
          },
        },
      ],
      modelVersion: {
        major: 1,
        minor: 5,
        patch: 0,
        dated: "20220914",
      },
    };

    const response = PassengerLevelTable({ apiData: apiData });
    expect(response).toEqual(undefined);
  });

  it("should return passenger level table with no emissionsGramsPerPax", async () => {
    const apiData: ComputeFlightEmissionsResponse = {
      flightEmissions: [
        {
          flight: {
            origin: "ZRH",
            destination: "BOS",
            operatingCarrierCode: "LX",
            departureDate: { year: 2024, month: 6, day: 1 },
            flightNumber: "54",
          },
        },
      ],
      modelVersion: {
        major: 1,
        minor: 5,
        patch: 0,
        dated: "20220914",
      },
    };

    const response = PassengerLevelTable({ apiData: apiData });
    expect(response).toEqual(undefined);
  });

  it("formatEmissionsPerPassenger: round and format value as expected", async () => {
    const name = "Emissions";
    const emissionsPerPassenger: EmissionsGramsPerPax = {
      economy: 192.352,
      premiumEconomy: 255.641,
      business: 832.909,
      first: 991.995,
    };

    const formattedEmissionsPerPassenger = formatEmissionsPerPassenger(name, emissionsPerPassenger);
    expect(formattedEmissionsPerPassenger).toEqual([name, "192.4", "255.6", "832.9", "992.0"]);
  });

  it("formatEmissionsPerPassenger: return XX when value is undefined", async () => {
    const name = "Emissions";
    const emissionsPerPassenger: EmissionsGramsPerPax = {
      economy: undefined,
      premiumEconomy: undefined,
      business: undefined,
      first: undefined,
    };

    const formattedEmissionsPerPassenger = formatEmissionsPerPassenger(name, emissionsPerPassenger);
    expect(formattedEmissionsPerPassenger).toEqual([name, "XX", "XX", "XX", "XX"]);
  });
});
