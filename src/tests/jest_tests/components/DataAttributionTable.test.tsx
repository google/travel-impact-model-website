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

import DataAttributionTable, {
  FuelBurnSource,
  LoadFactorSource,
  CargoMassFractionSource,
  PassengerSeatSource,
  SeatAreaRatioSource,
  EasaLabelSource,
} from "../../../components/DataAttributionTable";
import {
  ComputeFlightEmissionsResponse,
  EmissionsInputs_EmissionsInputEntry,
} from "../../../api/proto/generated/travelImpactModelProto";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

describe("FuelBurnSource", () => {
  it("should return undefined", async () => {
    const data: EmissionsInputs_EmissionsInputEntry = {
      dataSource: undefined,
      dataStrategy: undefined,
    };
    const response = FuelBurnSource({ value: data });
    expect(response).toEqual(undefined);
  });

  it("should return response for EEA data", async () => {
    const data: EmissionsInputs_EmissionsInputEntry = {
      dataSource: "EEA",
      dataStrategy: undefined,
    };
    render(<FuelBurnSource value={data} />);
    expect(screen.getByText("CORSIA")).not.toBeEmptyDOMElement();
    expect(screen.getByText("EEA Report")).not.toBeEmptyDOMElement();
  });

  it("should return response for EEA and EEA correction factor data", async () => {
    const data: EmissionsInputs_EmissionsInputEntry = {
      dataSource: "EEA",
      dataStrategy: "EEA2023_CORRECTION_FACTOR",
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
    const data: EmissionsInputs_EmissionsInputEntry = {
      dataSource: undefined,
      dataStrategy: undefined,
    };
    const response = LoadFactorSource({ value: data });
    expect(response).toEqual(undefined);
  });

  it("should return response for T100 data", async () => {
    const data: EmissionsInputs_EmissionsInputEntry = {
      dataSource: "T100",
      dataStrategy: undefined,
    };
    render(<LoadFactorSource value={data} />);
    expect(
      screen.getByText("U.S. Department of Transportation Bureau of Transportation Statistics")
    ).not.toBeEmptyDOMElement();
  });

  it("should return response for GLOBAL_DEFAULT data", async () => {
    const data: EmissionsInputs_EmissionsInputEntry = {
      dataSource: "GLOBAL_DEFAULT",
      dataStrategy: undefined,
    };
    render(<LoadFactorSource value={data} />);
    expect(screen.getByText("Derived from historical data for the U.S.")).not.toBeEmptyDOMElement();
  });
});

describe("CargoMassFractionSource", () => {
  it("should return undefined", async () => {
    const data: EmissionsInputs_EmissionsInputEntry = {
      dataSource: undefined,
      dataStrategy: undefined,
    };
    const response = CargoMassFractionSource({ value: data });
    expect(response).toEqual(undefined);
  });

  it("should return response for T100 data", async () => {
    const data: EmissionsInputs_EmissionsInputEntry = {
      dataSource: "T100",
      dataStrategy: undefined,
    };
    render(<CargoMassFractionSource value={data} />);
    expect(
      screen.getByText("U.S. Department of Transportation Bureau of Transportation Statistics")
    ).not.toBeEmptyDOMElement();
  });
});

describe("PassengerSeatSource", () => {
  it("should return undefined", async () => {
    const data: EmissionsInputs_EmissionsInputEntry = {
      dataSource: undefined,
      dataStrategy: undefined,
    };
    const response = PassengerSeatSource({ value: data });
    expect(response).toEqual(undefined);
  });

  it("should return response for OPERATING_CARRIER_CONFIG data", async () => {
    const data: EmissionsInputs_EmissionsInputEntry = {
      dataSource: "OPERATING_CARRIER_CONFIG",
      dataStrategy: undefined,
    };
    render(<PassengerSeatSource value={data} />);
    expect(screen.getByText("Aircraft Configuration/Version (ACV)", { exact: false }));
    expect(screen.getByText("OAG")).not.toBeEmptyDOMElement();
    expect(screen.getByText("Innovata")).not.toBeEmptyDOMElement();
  });

  it("should return response for OAG_SEATS_EQUIPMENT_CONFIG  data", async () => {
    const data: EmissionsInputs_EmissionsInputEntry = {
      dataSource: "OAG_SEATS_EQUIPMENT_CONFIG",
      dataStrategy: undefined,
    };
    render(<PassengerSeatSource value={data} />);
    expect(screen.getByText("Fleet-level aircraft configuration", { exact: false }));
    expect(screen.getByText("OAG")).not.toBeEmptyDOMElement();
  });

  it("should return response for REFERENCE_CONFIG data", async () => {
    const data: EmissionsInputs_EmissionsInputEntry = {
      dataSource: "REFERENCE_CONFIG",
      dataStrategy: undefined,
    };
    render(<PassengerSeatSource value={data} />);
    expect(screen.getByText("Aircraft Configuration/Version (ACV)", { exact: false }));
    expect(screen.getByText("Fleet-level aircraft configuration", { exact: false }));
    expect(screen.getByText("Innovata")).not.toBeEmptyDOMElement();
    expect(screen.getAllByText("OAG")).not.toBeUndefined();
  });
});

describe("SeatAreaRatioSource", () => {
  it("should return response for EEA data", async () => {
    render(<SeatAreaRatioSource />);
    expect(screen.getByText("IATA RP 1726")).not.toBeEmptyDOMElement();
  });
});

describe("EasaLabelSource", () => {
  it("should return response for EASA data", async () => {
    render(<EasaLabelSource />);
    expect(screen.getByText("EASA Environmental Label")).not.toBeEmptyDOMElement();
  });
});

describe("DataAttributionTable", () => {
  it("should return data attribution level table with expected values", async () => {
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
          emissionsInputs: {
            emissionsInputEntries: {
              totalFuelBurnEstimatedKg: {
                dataSource: "EEA",
                dataStrategy: "EEA2023_CORRECTION_FACTOR",
              },
              loadFactor: {
                dataSource: "T100",
                dataStrategy: "CARRIER_ROUTE_MONTH",
              },
              cargoMassFraction: {
                dataSource: "T100",
                dataStrategy: "DISTANCE_AIRCRAFT_CLASS",
              },
              seatsPerClass: {
                dataSource: "OAG_SEATS_EQUIPMENT_CONFIG",
              },
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

    render(<DataAttributionTable emissionsData={emissionsData} />);

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
  });

  it("should return data attribution level table with expected EASA values", async () => {
    const emissionsData: ComputeFlightEmissionsResponse = {
      flightEmissions: [
        {
          flight: {
            origin: "ZRH",
            destination: "BOS",
            operatingCarrierCode: "LX",
            departureDate: { year: 2024, month: 6, day: 1 },
            flightNumber: 54,
          },
          emissionsInputs: {
            easaLabelData: {
              safDiscountPercentage: 0.2,
            },
            emissionsInputEntries: {},
          },
          source: 2,
        },
      ],
      modelVersion: {
        major: 1,
        minor: 5,
        patch: 0,
        dated: "20220914",
      },
    };

    render(<DataAttributionTable emissionsData={emissionsData} />);

    // Fuel Burn Source
    expect(screen.getByText("EASA Environmental Label")).not.toBeEmptyDOMElement();
  });

  it("should return invalid data", async () => {
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

    const response = DataAttributionTable({ emissionsData: emissionsData });
    expect(response).toEqual(<React.Fragment />);
  });

  it("should return empty JSX element", async () => {
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

    const response = DataAttributionTable({ emissionsData: emissionsData });
    expect(response).toEqual(<React.Fragment />);
  });
});
