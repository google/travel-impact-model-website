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

import EmissionsProvenance, {
  FuelBurnSource,
  LoadFactorSource,
  CargoMassFractionSource,
  PassengerSeatSource,
  SeatAreaRatioSource,
  EasaLabelSource,
  DistanceAdjustmentSource,
} from "../../../components/EmissionsProvenance";
import {
  ComputeDetailedFlightEmissionsResponse,
  EmissionsProvenance_EmissionsProvenanceEntry,
  EmissionsProvenance_EmissionsProvenanceEntry_DataSource,
  EmissionsProvenance_EmissionsProvenanceEntry_DataType,
  EmissionsProvenance_EmissionsProvenanceEntry_FuelBurnEea_Strategy,
  EmissionsProvenance_EmissionsProvenanceEntry_LoadFactorsT100_Strategy,
  EmissionsProvenance_EmissionsProvenanceEntry_CargoMassFractionT100_Strategy,
  EmissionsProvenance_EmissionsProvenanceEntry_DistanceAdjustment_Strategy,
  EmissionsProvenance_EmissionsProvenanceEntryType,
  EmissionsProvenance_EmissionsProvenanceEntry_SeatAreaRatioIata_Strategy,
  Source,
  ContrailsImpactBucket,
} from "../../../api/proto/generated/travelImpactModelProto";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

describe("FuelBurnSource", () => {
  it("should return undefined", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.UNRECOGNIZED,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.UNRECOGNIZED,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.UNRECOGNIZED,
    };
    const response = FuelBurnSource({ value: data });
    expect(response).toEqual(undefined);
  });

  it("should return response for EEA data", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.EEA,
      fuelBurnEeaStrategy:
        EmissionsProvenance_EmissionsProvenanceEntry_FuelBurnEea_Strategy.STRATEGY_UNSPECIFIED,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.FUEL_BURN,
    };
    render(<FuelBurnSource value={data} />);
    expect(screen.getByText("CORSIA")).not.toBeEmptyDOMElement();
    expect(screen.getByText("EEA Report")).not.toBeEmptyDOMElement();
  });

  it("should return response for EEA and EEA correction factor data", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.EEA,
      fuelBurnEeaStrategy:
        EmissionsProvenance_EmissionsProvenanceEntry_FuelBurnEea_Strategy.EEA2023_CORRECTION_FACTOR,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.FUEL_BURN,
    };
    render(<FuelBurnSource value={data} />);
    expect(screen.getByText("CORSIA")).not.toBeEmptyDOMElement();
    expect(screen.getByText("EEA Report")).not.toBeEmptyDOMElement();
    expect(
      screen.getByText("EMEP/EEA air pollutant emission inventory guidebook")
    ).not.toBeEmptyDOMElement();
  });
});

describe("LoadFactorSource", () => {
  it("should return undefined", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.UNRECOGNIZED,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.UNRECOGNIZED,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.UNRECOGNIZED,
    };
    const response = LoadFactorSource({ value: data });
    expect(response).toEqual(undefined);
  });

  it("should return response for T100 data", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.T100,
      loadFactorsT100Strategy:
        EmissionsProvenance_EmissionsProvenanceEntry_LoadFactorsT100_Strategy.CARRIER_MONTH,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.DEFAULT,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.LOAD_FACTORS,
    };
    render(<LoadFactorSource value={data} />);
    expect(
      screen.getByText("U.S. Department of Transportation Bureau of Transportation Statistics")
    ).not.toBeEmptyDOMElement();
  });

  it("should return response for GLOBAL_DEFAULT data", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.GLOBAL_DEFAULT,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.DEFAULT,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.LOAD_FACTORS,
    };
    render(<LoadFactorSource value={data} />);
    expect(screen.getByText("Derived from historical data for the U.S.")).not.toBeEmptyDOMElement();
  });
});

describe("CargoMassFractionSource", () => {
  it("should return undefined", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.UNRECOGNIZED,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.UNRECOGNIZED,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.UNRECOGNIZED,
    };
    const response = CargoMassFractionSource({ value: data });
    expect(response).toEqual(undefined);
  });

  it("should return response for T100 data", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.T100,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.CARGO_MASS_FRACTION,
    };
    render(<CargoMassFractionSource value={data} />);
    expect(
      screen.getByText("U.S. Department of Transportation Bureau of Transportation Statistics")
    ).not.toBeEmptyDOMElement();
  });
});

describe("PassengerSeatSource", () => {
  it("should return undefined", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.UNRECOGNIZED,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.UNRECOGNIZED,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.SEATING_CONFIG,
    };
    const response = PassengerSeatSource({ value: data });
    expect(response).toEqual(undefined);
  });

  it("should return response for OPERATING_CARRIER_CONFIG data", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.OPERATING_CARRIER,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.PRIMARY,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.SEATING_CONFIG,
    };
    render(<PassengerSeatSource value={data} />);
    expect(screen.getByText("Aircraft Configuration/Version (ACV)", { exact: false }));
    expect(screen.getByText("OAG")).not.toBeEmptyDOMElement();
    expect(screen.getByText("Innovata")).not.toBeEmptyDOMElement();
  });

  it("should return response for OAG_SEATS_EQUIPMENT_CONFIG  data", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.OAG,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.SEATING_CONFIG,
    };
    render(<PassengerSeatSource value={data} />);
    expect(screen.getByText("Fleet-level aircraft configuration", { exact: false }));
    expect(screen.getByText("OAG")).not.toBeEmptyDOMElement();
  });

  it("should return response for REFERENCE_CONFIG data", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.AIRCRAFT_MODEL_TYPICAL,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.DEFAULT,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.SEATING_CONFIG,
    };
    render(<PassengerSeatSource value={data} />);
    expect(screen.getByText("Aircraft Configuration/Version (ACV)", { exact: false }));
    expect(screen.getByText("Fleet-level aircraft configuration", { exact: false }));
    expect(screen.getByText("Innovata")).not.toBeEmptyDOMElement();
    expect(screen.getAllByText("OAG")).not.toBeUndefined();
  });
});

describe("SeatAreaRatioSource", () => {
  it("should return response for IATA data", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.IATA,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.DEFAULT,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.SEAT_AREA_RATIOS,
    };
    render(<SeatAreaRatioSource value={data} />);
    expect(screen.getByText("IATA RP 1726")).not.toBeEmptyDOMElement();
  });
});

describe("DistanceAdjustmentSource", () => {
  it("should return undefined", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.UNRECOGNIZED,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.UNRECOGNIZED,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.DISTANCE_ADJUSTMENT,
    };
    const response = DistanceAdjustmentSource({ value: data });
    expect(response).toEqual(undefined);
  });
  it("should return response for ICL data", async () => {
    const data: EmissionsProvenance_EmissionsProvenanceEntry = {
      source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.ICL,
      dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
      sourceVersion: "",
      provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.DISTANCE_ADJUSTMENT,
    };
    render(<DistanceAdjustmentSource value={data} />);
    expect(screen.getByText("ICL")).not.toBeEmptyDOMElement();
  });
});

describe("EasaLabelSource", () => {
  it("should return response for EASA data", async () => {
    render(<EasaLabelSource />);
    expect(screen.getByText("EASA Environmental Label")).not.toBeEmptyDOMElement();
  });
});

describe("EmissionsProvenance", () => {
  it("should return emissions provenance level table with expected values", async () => {
    const emissionsData: ComputeDetailedFlightEmissionsResponse = {
      flightsWithDetailedEmissions: [
        {
          flight: {
            origin: "ZRH",
            destination: "BOS",
            operatingCarrierCode: "LX",
            departureDate: { year: 2026, month: 11, day: 30 },
            flightNumber: "54",
          },
          flightEmissionsDetails: {
            emissionsGramsPerPax: {
              first: 1592890,
              business: 1274312,
              premiumEconomy: 477866,
              economy: 318578,
            },
            emissionsBreakdown: {
              wttEmissionsGramsPerPax: {
                first: 268465,
                business: 214772,
                premiumEconomy: 80539,
                economy: 53693,
              },
              ttwEmissionsGramsPerPax: {
                first: 1324425,
                business: 1059540,
                premiumEconomy: 397327,
                economy: 264885,
              },
            },
            contrailsImpactBucket: ContrailsImpactBucket.CONTRAILS_IMPACT_NEGLIGIBLE,
            source: Source.TIM,
          },
          emissionsMetadata: {
            easaLabelMetadata: undefined,
            emissionsProvenance: {
              provenanceEntries: [
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.EEA,
                  fuelBurnEeaStrategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_FuelBurnEea_Strategy.EEA2023_CORRECTION_FACTOR,
                  provenanceEntryType: EmissionsProvenance_EmissionsProvenanceEntryType.FUEL_BURN,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
                  sourceVersion: "",
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.T100,
                  loadFactorsT100Strategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_LoadFactorsT100_Strategy.CARRIER_ROUTE_MONTH,
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.LOAD_FACTORS,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.DEFAULT,
                  sourceVersion: "",
                  loadFactorsData: 0.808520211655448,
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.T100,
                  cargoMassFractionT100Strategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_CargoMassFractionT100_Strategy.DISTANCE_AIRCRAFT_CLASS,
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.CARGO_MASS_FRACTION,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
                  sourceVersion: "",
                  cargoMassFractionData: 0.29636906672461827,
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.OAG,
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.SEATING_CONFIG,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
                  sourceVersion: "",
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.IATA,
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.SEAT_AREA_RATIOS,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.DEFAULT,
                  sourceVersion: "IATA_RP_1726",
                  seatAreaRatioIataStrategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_SeatAreaRatioIata_Strategy.WIDE_AIRCRAFT_BODY,
                  seatAreaRatioData: {
                    first: 5,
                    business: 4,
                    premiumEconomy: 1.5,
                    economy: 1,
                  },
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.ICL,
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.DISTANCE_ADJUSTMENT,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
                  sourceVersion: "",
                  distanceAdjustmentStrategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_DistanceAdjustment_Strategy.ORIGIN_DESTINATION,
                  estimatedFlightDistanceKm: 6003,
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
        dated: "20260213",
      },
    };

    render(<EmissionsProvenance emissionsData={emissionsData} />);

    // Headers
    expect(screen.getByText("Value")).not.toBeEmptyDOMElement();
    expect(screen.getByText("Data Type")).not.toBeEmptyDOMElement();
    expect(screen.getByText("Strategy")).not.toBeEmptyDOMElement();

    // Fuel Burn Source
    expect(screen.getByText("CORSIA")).not.toBeEmptyDOMElement();
    expect(screen.getByText("EEA Report")).not.toBeEmptyDOMElement();
    expect(
      screen.getByText("EMEP/EEA air pollutant emission inventory guidebook")
    ).not.toBeEmptyDOMElement();

    // Load Factor Source
    expect(
      screen.getAllByText(
        "U.S. Department of Transportation Bureau of Transportation Statistics"
      )[0]
    ).not.toBeEmptyDOMElement();

    // Cargo Mass Fraction Source
    expect(
      screen.getAllByText(
        "U.S. Department of Transportation Bureau of Transportation Statistics"
      )[1]
    ).not.toBeEmptyDOMElement();

    // Passenger Seat Source
    expect(screen.getByText("Fleet-level aircraft configuration", { exact: false }));
    expect(screen.getByText("OAG")).not.toBeEmptyDOMElement();

    // Distance Adjustment Source
    expect(screen.getByText("ICL")).not.toBeEmptyDOMElement();

    // Data Categories
    expect(screen.getAllByText("Modeled")).toHaveLength(4);
    expect(screen.getAllByText("Default")).toHaveLength(2);

    // Values
    expect(screen.getByText("80.9%")).not.toBeEmptyDOMElement();
    expect(screen.getByText("29.6%")).not.toBeEmptyDOMElement();
    expect(
      screen.getByText(/First: 5\s+Business: 4\s+Premium: 1\.5\s+Economy: 1/)
    ).not.toBeEmptyDOMElement();
    expect(screen.getByText("6003 km")).not.toBeEmptyDOMElement();

    // Strategies
    expect(screen.getByText("EEA2023 based correction factor")).not.toBeEmptyDOMElement();
    expect(
      screen.getByText("Calculated using carrier, route, and month of travel")
    ).not.toBeEmptyDOMElement();
    expect(
      screen.getByText("Calculated using distance band and aircraft class")
    ).not.toBeEmptyDOMElement();
    expect(screen.getByText("Wide body aircraft")).not.toBeEmptyDOMElement();
    expect(
      screen.getByText("Calculated using route-specific distance adjustment data")
    ).not.toBeEmptyDOMElement();
  });

  it("should return data provenance level table with expected EASA values", async () => {
    const emissionsData: ComputeDetailedFlightEmissionsResponse = {
      flightsWithDetailedEmissions: [
        {
          flight: {
            origin: "ZRH",
            destination: "BOS",
            operatingCarrierCode: "LX",
            departureDate: { year: 2026, month: 11, day: 30 },
            flightNumber: "54",
          },
          flightEmissionsDetails: {
            emissionsGramsPerPax: {
              first: 1592890,
              business: 1274312,
              premiumEconomy: 477866,
              economy: 318578,
            },
            emissionsBreakdown: {
              wttEmissionsGramsPerPax: {
                first: 268465,
                business: 214772,
                premiumEconomy: 80539,
                economy: 53693,
              },
              ttwEmissionsGramsPerPax: {
                first: 1324425,
                business: 1059540,
                premiumEconomy: 397327,
                economy: 264885,
              },
            },
            contrailsImpactBucket: ContrailsImpactBucket.CONTRAILS_IMPACT_MODERATE,
            source: Source.EASA,
          },
          emissionsMetadata: {
            easaLabelMetadata: {
              safDiscountPercentage: 0,
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

    render(<EmissionsProvenance emissionsData={emissionsData} />);

    // Fuel Burn Source
    expect(screen.getByText("Value")).not.toBeEmptyDOMElement();
    expect(screen.getByText("Data Type")).not.toBeEmptyDOMElement();
    expect(screen.getByText("Not Available")).not.toBeEmptyDOMElement();
    expect(screen.getByText("Not Applicable")).not.toBeEmptyDOMElement();
    expect(screen.getByText("Strategy")).not.toBeEmptyDOMElement();
    expect(screen.getByText("EASA Environmental Label")).not.toBeEmptyDOMElement();
  });

  it("should return emissions provenance table with all distance adjustment strategies", async () => {
    const emissionsData: ComputeDetailedFlightEmissionsResponse = {
      flightsWithDetailedEmissions: [
        {
          flight: {
            origin: "ZRH",
            destination: "BOS",
            operatingCarrierCode: "LX",
            departureDate: { year: 2026, month: 11, day: 30 },
            flightNumber: "54",
          },
          flightEmissionsDetails: {
            emissionsGramsPerPax: {
              first: 1592890,
              business: 1274312,
              premiumEconomy: 477866,
              economy: 318578,
            },
            emissionsBreakdown: {
              wttEmissionsGramsPerPax: {
                first: 268465,
                business: 214772,
                premiumEconomy: 80539,
                economy: 53693,
              },
              ttwEmissionsGramsPerPax: {
                first: 1324425,
                business: 1059540,
                premiumEconomy: 397327,
                economy: 264885,
              },
            },
            contrailsImpactBucket: ContrailsImpactBucket.CONTRAILS_IMPACT_NEGLIGIBLE,
            source: Source.TIM,
          },
          emissionsMetadata: {
            easaLabelMetadata: undefined,
            emissionsProvenance: {
              provenanceEntries: [
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.ICL,
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.DISTANCE_ADJUSTMENT,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
                  sourceVersion: "",
                  distanceAdjustmentStrategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_DistanceAdjustment_Strategy.COUNTRY_PAIR,
                  estimatedFlightDistanceKm: 6004,
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.ICL,
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.DISTANCE_ADJUSTMENT,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
                  sourceVersion: "",
                  distanceAdjustmentStrategy:
                    EmissionsProvenance_EmissionsProvenanceEntry_DistanceAdjustment_Strategy.DEFAULT,
                  estimatedFlightDistanceKm: 6005,
                },
                {
                  source: EmissionsProvenance_EmissionsProvenanceEntry_DataSource.ICL,
                  provenanceEntryType:
                    EmissionsProvenance_EmissionsProvenanceEntryType.DISTANCE_ADJUSTMENT,
                  dataType: EmissionsProvenance_EmissionsProvenanceEntry_DataType.MODELED,
                  sourceVersion: "",
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

    render(<EmissionsProvenance emissionsData={emissionsData} />);

    expect(screen.getByText("6004 km")).not.toBeEmptyDOMElement();
    expect(
      screen.getByText("Calculated using country-specific distance adjustment data")
    ).not.toBeEmptyDOMElement();

    expect(screen.getByText("6005 km")).not.toBeEmptyDOMElement();
    expect(
      screen.getByText("Calculated using global distance adjustment data")
    ).not.toBeEmptyDOMElement();

    expect(screen.getByText("Not Available")).not.toBeEmptyDOMElement();
    expect(screen.getByText("Not Applicable")).not.toBeEmptyDOMElement();
  });

  it("should return invalid data", async () => {
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
            contrailsImpactBucket: ContrailsImpactBucket.CONTRAILS_IMPACT_NEGLIGIBLE,
            source: Source.SOURCE_UNSPECIFIED,
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

    const response = EmissionsProvenance({ emissionsData: emissionsData });
    expect(response).toEqual(<React.Fragment />);
  });

  it("should return empty JSX element", async () => {
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
            contrailsImpactBucket: ContrailsImpactBucket.CONTRAILS_IMPACT_NEGLIGIBLE,
            source: Source.SOURCE_UNSPECIFIED,
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

    const response = EmissionsProvenance({ emissionsData: emissionsData });
    expect(response).toEqual(<React.Fragment />);
  });
});
