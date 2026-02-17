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
  ComputeDetailedFlightEmissionsResponse,
  ComputeTypicalFlightEmissionsResponse,
  EmissionsGramsPerPax,
  Source,
  EmissionsProvenance_EmissionsProvenanceEntry_DataSource,
  EmissionsProvenance_EmissionsProvenanceEntry_DataType,
  EmissionsProvenance_EmissionsProvenanceEntry_FuelBurnEeaStrategy,
  EmissionsProvenance_EmissionsProvenanceEntry_LoadFactorsT100Strategy,
  EmissionsProvenance_EmissionsProvenanceEntry_CargoMassFractionT100Strategy,
  EmissionsProvenance_EmissionsProvenanceEntryType,
  ContrailsImpactBucket,
  EmissionsProvenance_EmissionsProvenanceEntry_SeatAreaRatioIataStrategy,
} from "../../../api/proto/generated/travelImpactModelProto";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("PassengerLevelTable", () => {
  it("should return passenger level table with expected values", async () => {
    const emissionsData: ComputeDetailedFlightEmissionsResponse = {
      flightsWithDetailedEmissions: [
        {
          flight: {
            origin: "ZRH",
            destination: "BOS",
            operatingCarrierCode: "LX",
            departureDate: { year: 2024, month: 6, day: 1 },
            flightNumber: "54",
          },
          flightEmissionsDetails: {
            emissionsGramsPerPax: {
              first: 1745475,
              business: 139638,
              premiumEconomy: 523642,
              economy: 349095,
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
            source: Source.TIM,
            contrailsImpactBucket: ContrailsImpactBucket.CONTRAILS_IMPACT_NEGLIGIBLE,
          },
          emissionsMetadata: {
            easaLabelMetadata: undefined,
            emissionsProvenance: {
              provenanceEntries: [
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.EEA,
                  fuelBurnEeaStrategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_FuelBurnEeaStrategy.FUEL_BURN_EEA_STRATEGY_UNSPECIFIED,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
                  sourceVersion: "",
                  provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.FUEL_BURN,
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.T100,
                  loadFactorsT100Strategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_LoadFactorsT100Strategy.LOAD_FACTORS_T100_STRATEGY_CARRIER_MONTH,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.DEFAULT,
                  sourceVersion: "2025-10",
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.LOAD_FACTORS,
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.T100,
                  cargoMassFractionT100Strategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_CargoMassFractionT100Strategy.CARGO_MASS_FRACTION_T100_STRATEGY_CARRIER_ROUTE_AIRCRAFT_CLASS,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
                  sourceVersion: "2025-10",
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.CARGO_MASS_FRACTION,
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.OPERATING_CARRIER,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.PRIMARY,
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.SEATING_CONFIG,
                  sourceVersion: "",
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.IATA,
                  sourceVersion: "IATA_RP_1726",
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.DEFAULT,
                  seatAreaRatioIataStrategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_SeatAreaRatioIataStrategy.SEAT_AREA_RATIO_IATA_STRATEGY_WIDE_AIRCRAFT_BODY,
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.SEAT_AREA_RATIOS,
                },
              ],
            },
          },
        },
      ],
      modelVersion: {
        major: 3,
        minor: 0,
        patch: 0,
        dated: "20261130",
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
    const emissionsData: ComputeDetailedFlightEmissionsResponse = {
      flightsWithDetailedEmissions: [
        {
          flight: {
            origin: "ZRH",
            destination: "BOS",
            operatingCarrierCode: "LX",
            departureDate: { year: 2024, month: 6, day: 1 },
            flightNumber: "54",
          },
          flightEmissionsDetails: {
            emissionsGramsPerPax: {
              first: 1745475,
              business: 139638,
              premiumEconomy: 523642,
              economy: 349095,
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
            source: Source.TIM,
            contrailsImpactBucket: ContrailsImpactBucket.CONTRAILS_IMPACT_NEGLIGIBLE,
          },
          emissionsMetadata: {
            easaLabelMetadata: undefined,
            emissionsProvenance: {
              provenanceEntries: [
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.EEA,
                  fuelBurnEeaStrategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_FuelBurnEeaStrategy.FUEL_BURN_EEA_STRATEGY_UNSPECIFIED,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
                  sourceVersion: "",
                  provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.FUEL_BURN,
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.T100,
                  loadFactorsT100Strategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_LoadFactorsT100Strategy.LOAD_FACTORS_T100_STRATEGY_CARRIER_MONTH,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.DEFAULT,
                  sourceVersion: "2025-10",
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.LOAD_FACTORS,
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.T100,
                  cargoMassFractionT100Strategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_CargoMassFractionT100Strategy.CARGO_MASS_FRACTION_T100_STRATEGY_CARRIER_ROUTE_AIRCRAFT_CLASS,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
                  sourceVersion: "2025-10",
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.CARGO_MASS_FRACTION,
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.OPERATING_CARRIER,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.PRIMARY,
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.SEATING_CONFIG,
                  sourceVersion: "",
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.IATA,
                  sourceVersion: "IATA_RP_1726",
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.DEFAULT,
                  seatAreaRatioIataStrategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_SeatAreaRatioIataStrategy.SEAT_AREA_RATIO_IATA_STRATEGY_WIDE_AIRCRAFT_BODY,
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.SEAT_AREA_RATIOS,
                },
              ],
            },
          },
        },
      ],
      modelVersion: {
        major: 3,
        minor: 0,
        patch: 0,
        dated: "20261130",
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
    const emissionsData: ComputeDetailedFlightEmissionsResponse = {
      flightsWithDetailedEmissions: [
        {
          flight: {
            origin: "ZRH",
            destination: "BOS",
            operatingCarrierCode: "LX",
            departureDate: { year: 2024, month: 6, day: 1 },
            flightNumber: "54",
          },
          flightEmissionsDetails: {
            source: Source.SOURCE_UNSPECIFIED,
            contrailsImpactBucket: ContrailsImpactBucket.CONTRAILS_IMPACT_UNSPECIFIED,
            emissionsBreakdown: undefined,
            emissionsGramsPerPax: undefined,
          },
          emissionsMetadata: undefined,
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
    const emissionsData: ComputeDetailedFlightEmissionsResponse = {
      flightsWithDetailedEmissions: [
        {
          flight: {
            origin: "ZRH",
            destination: "BOS",
            operatingCarrierCode: "LX",
            departureDate: { year: 2024, month: 6, day: 1 },
            flightNumber: "54",
          },
          flightEmissionsDetails: {
            emissionsGramsPerPax: undefined,
            emissionsBreakdown: undefined,
            source: Source.SOURCE_UNSPECIFIED,
            contrailsImpactBucket: ContrailsImpactBucket.CONTRAILS_IMPACT_UNSPECIFIED,
          },
          emissionsMetadata: undefined,
        },
      ],
      modelVersion: {
        major: 3,
        minor: 0,
        patch: 0,
        dated: "20261130",
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
    const emissionsData: ComputeDetailedFlightEmissionsResponse = {
      flightsWithDetailedEmissions: [
        {
          flight: {
            origin: "ZRH",
            destination: "BOS",
            operatingCarrierCode: "LX",
            departureDate: { year: 2024, month: 6, day: 1 },
            flightNumber: "54",
          },
          flightEmissionsDetails: {
            emissionsGramsPerPax: {
              first: 1745475,
              business: 139638,
              premiumEconomy: 523642,
              economy: 349095,
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
            source: Source.EASA,
            contrailsImpactBucket: ContrailsImpactBucket.CONTRAILS_IMPACT_NEGLIGIBLE,
          },
          emissionsMetadata: {
            easaLabelMetadata: {
              safDiscountPercentage: 0.03,
              labelExpiryDate: undefined,
              labelIssueDate: undefined,
              labelVersion: "",
            },
            emissionsProvenance: undefined,
          },
        },
      ],
      modelVersion: {
        major: 3,
        minor: 0,
        patch: 0,
        dated: "20261130",
      },
    };

    render(<PassengerLevelTable emissionsData={emissionsData} />);
    expect(screen.getByText("Sustainable Aviation Fuel (SAF)")).not.toBeEmptyDOMElement();
  });
});
