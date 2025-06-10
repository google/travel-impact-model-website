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
  formatEmissionsPerPassengerRow,
} from "../../../components/PassengerLevelTable";
import {
  ComputeFlightEmissionsResponse,
  ComputeTypicalFlightEmissionsResponse,
  EmissionsGramsPerPax,
} from "../../../api/proto/generated/travelImpactModelProto";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("PassengerLevelTable", () => {
  it("should return passenger level table with expected values", async () => {
    const emissionsData: ComputeFlightEmissionsResponse = {
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

    render(<PassengerLevelTable emissionsData={emissionsData} />);
    expect(screen.getByText("Economy")).not.toBeEmptyDOMElement();
    expect(screen.getByText("Premium")).not.toBeEmptyDOMElement();
    expect(screen.getByText("Business")).not.toBeEmptyDOMElement();
    expect(screen.getByText("First")).not.toBeEmptyDOMElement();
    expect(screen.queryByText("Typical")).toBeNull();
  });

  it("should return passenger level table with typical emissions", async () => {
    const emissionsData: ComputeFlightEmissionsResponse = {
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

    const typicalEmissionsData: ComputeTypicalFlightEmissionsResponse = {
      typicalFlightEmissions: [
        {
          market: {
            origin: "ZRH",
            destination: "BOS",
          },
          emissionsGramsPerPax: {
            first: 1721684,
            business: 1411005,
            premiumEconomy: 566775,
            economy: 406535,
          },
        },
      ],
      modelVersion: {
        major: 2,
        minor: 0,
        patch: 0,
        dated: "20250131",
      },
    };

    render(
      <PassengerLevelTable
        emissionsData={emissionsData}
        typicalEmissionsData={typicalEmissionsData}
      />
    );

    expect(screen.queryByText("Well-to-Wake")).not.toBeNull();
    expect(screen.queryByText("Typical")).not.toBeNull();
  });

  it("should return passenger level table with emissionsGramsPerPax empty", async () => {
    const emissionsData: ComputeFlightEmissionsResponse = {
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

    const response = PassengerLevelTable({ emissionsData: emissionsData });
    expect(response).toEqual(undefined);
  });

  it("should return passenger level table with no emissionsGramsPerPax", async () => {
    const emissionsData: ComputeFlightEmissionsResponse = {
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

    const response = PassengerLevelTable({ emissionsData: emissionsData });
    expect(response).toEqual(undefined);
  });

  it("formatEmissionsPerPassengerRow: round and format value as expected", async () => {
    const name = "Emissions";
    const description = "Emissions description";
    const emissionsPerPassenger: EmissionsGramsPerPax = {
      economy: 192.352,
      premiumEconomy: 255.641,
      business: 832.909,
      first: 991.995,
    };

    const formattedEmissionsPerPassenger = formatEmissionsPerPassengerRow(
      name,
      emissionsPerPassenger,
      description
    );
    expect(formattedEmissionsPerPassenger).toEqual([
      expect.anything(),
      "192.4",
      "255.6",
      "832.9",
      "992.0",
    ]);
  });

  it("formatEmissionsPerPassengerRow: round and format SAF value as expected", async () => {
    const name = "Emissions";
    const description = "Emissions description";
    const safDiscount = 0.2;
    const emissionsPerPassenger: EmissionsGramsPerPax = {
      economy: 192.352,
      premiumEconomy: 255.641,
      business: 832.909,
      first: 991.995,
    };

    const formattedEmissionsPerPassenger = formatEmissionsPerPassengerRow(
      name,
      emissionsPerPassenger,
      description,
      -1 * safDiscount /* emissionsMultiplier */
    );
    expect(formattedEmissionsPerPassenger).toEqual([
      expect.anything(),
      "-38.5",
      "-51.1",
      "-166.6",
      "-198.4",
    ]);
  });

  it("formatEmissionsPerPassengerRow: round and format Total Emissions value as expected", async () => {
    const name = "Emissions";
    const description = "Emissions description";
    const safDiscount = 0.2;
    const emissionsPerPassenger: EmissionsGramsPerPax = {
      economy: 192.352,
      premiumEconomy: 255.641,
      business: 832.909,
      first: 991.995,
    };

    const formattedEmissionsPerPassenger = formatEmissionsPerPassengerRow(
      name,
      emissionsPerPassenger,
      description,
      1 - safDiscount /* emissionsMultiplier */,
      true /* isTotal */
    );
    expect(formattedEmissionsPerPassenger).toEqual([
      expect.anything(),
      "153.9",
      "204.5",
      "666.3",
      "793.6",
    ]);
  });

  it("formatEmissionsPerPassengerRow: return XX when value is undefined", async () => {
    const name = "Emissions";
    const description = "Emissions description";
    const emissionsPerPassenger: EmissionsGramsPerPax = {
      economy: undefined,
      premiumEconomy: undefined,
      business: undefined,
      first: undefined,
    };

    const formattedEmissionsPerPassenger = formatEmissionsPerPassengerRow(
      name,
      emissionsPerPassenger,
      description
    );
    expect(formattedEmissionsPerPassenger).toEqual([expect.anything(), "XX", "XX", "XX", "XX"]);
  });

  it("should return passenger level table with SAF discount", async () => {
    const emissionsData: ComputeFlightEmissionsResponse = {
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
            easaLabelData: {
              safDiscountPercentage: 0.03,
            },
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
          source: 2,
          contrailsImpactBucket: 1,
        },
      ],
      modelVersion: {
        major: 1,
        minor: 5,
        patch: 0,
        dated: "20220914",
      },
    };

    render(<PassengerLevelTable emissionsData={emissionsData} />);
    expect(screen.getByText("Sustainable Aviation Fuel (SAF)")).not.toBeEmptyDOMElement();
  });
});
