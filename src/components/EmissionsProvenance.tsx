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

import { Typography } from "@mui/material";
import {
  ComputeDetailedFlightEmissionsResponse,
  EmissionsProvenance_EmissionsProvenanceEntry,
  EmissionsProvenance_EmissionsProvenanceEntry_DataSource,
  EmissionsProvenance_EmissionsProvenanceEntry_DataType,
  EmissionsProvenance_EmissionsProvenanceEntry_FuelBurnEea_Strategy,
  EmissionsProvenance_EmissionsProvenanceEntry_LoadFactorsT100_Strategy,
  EmissionsProvenance_EmissionsProvenanceEntry_LoadFactorsChAviation_Strategy,
  EmissionsProvenance_EmissionsProvenanceEntry_CargoMassFractionT100_Strategy,
  EmissionsProvenance_EmissionsProvenanceEntry_SeatAreaRatioIata_Strategy,
  EmissionsProvenance_EmissionsProvenanceEntry_DistanceAdjustment_Strategy,
  EmissionsProvenance_EmissionsProvenanceEntryType,
  Source,
} from "../api/proto/generated/travelImpactModelProto";
import Link from "./Link";
import Table, { RowData } from "./Table";
import "./EmissionsProvenance.scss";

interface SourceProps {
  value: EmissionsProvenance_EmissionsProvenanceEntry;
}

export function FuelBurnSource({ value }: SourceProps): React.JSX.Element | undefined {
  if (value.source === EmissionsProvenance_EmissionsProvenanceEntry_DataSource.EEA) {
    return (
      <ul>
        <li>
          <Link
            text="EEA Report"
            href="https://www.eea.europa.eu/publications/emep-eea-guidebook-2019/part-b-sectoral-guidance-chapters/1-energy/1-a-combustion/1-a-3-a-aviation/view"
          />{" "}
          No 13/2019 1.A.3.a Aviation 1 Master emissions calculator 2019
        </li>
        {value.fuelBurnEeaStrategy ===
          EmissionsProvenance_EmissionsProvenanceEntry_FuelBurnEea_Strategy.EEA2023_CORRECTION_FACTOR && (
          <li>
            <Link
              text="EMEP/EEA air pollutant emission inventory guidebook"
              href="https://www.eea.europa.eu/publications/emep-eea-guidebook-2023/part-b-sectoral-guidance-chapters/1-energy/1-a-combustion/1-a-3-a-aviation.3/view"
            />{" "}
            2023 Annex 1
          </li>
        )}
        <li>
          <Link
            text="CORSIA"
            href="https://www.icao.int/environmental-protection/CORSIA/Documents/CORSIA_Eligible_Fuels/CORSIA_Supporting_Document_CORSIA%20Eligible%20Fuels_LCA_Methodology_V5.pdf"
          />{" "}
          Eligible Fuels Life Cycle Assessment Methodology
        </li>
        <li>
          <Link text="ISO 14083" href="https://www.iso.org/standard/78864.html" />{" "}
        </li>
      </ul>
    );
  }
}

export function LoadFactorSource({ value }: SourceProps): React.JSX.Element | undefined {
  if (value.source === EmissionsProvenance_EmissionsProvenanceEntry_DataSource.T100) {
    return (
      <ul>
        <li>
          <Link
            text="U.S. Department of Transportation Bureau of Transportation Statistics"
            href="https://www.bts.gov/airline-data-downloads"
          />{" "}
        </li>
      </ul>
    );
  } else if (value.source === EmissionsProvenance_EmissionsProvenanceEntry_DataSource.CH_AVIATION) {
    return (
      <ul>
        <li>
          <Link text="ch-aviation" href="https://www.ch-aviation.com/" />{" "}
        </li>
      </ul>
    );
  } else if (
    value.source === EmissionsProvenance_EmissionsProvenanceEntry_DataSource.GLOBAL_DEFAULT
  ) {
    return (
      <ul>
        <li>
          <Link
            text="Derived from historical data for the U.S."
            href="https://fred.stlouisfed.org/series/LOADFACTOR"
          />{" "}
          from 2019
        </li>
      </ul>
    );
  }
}

export function CargoMassFractionSource({ value }: SourceProps): React.JSX.Element | undefined {
  if (value.source === EmissionsProvenance_EmissionsProvenanceEntry_DataSource.T100) {
    return (
      <ul>
        <li>
          <Link
            text="U.S. Department of Transportation Bureau of Transportation Statistics"
            href="https://www.bts.gov/airline-data-downloads"
          />{" "}
        </li>
      </ul>
    );
  }
}

export function PassengerSeatSource({ value }: SourceProps): React.JSX.Element | undefined {
  const aircraftConfigFromSchedulesSource = (
    <li key="schedulesSources">
      Aircraft Configuration/Version (ACV) from published flight schedules (from{" "}
      <Link text="OAG" href="https://oag.com/" />,{" "}
      <Link text="Innovata" href="https://www.cirium.com/thoughtcloud/cirium-is/" /> and Individual
      airlines)
    </li>
  );
  const fleetLevelAircraftConfigSource = (
    <li key="fleetLevel">
      Fleet-level aircraft configuration information from the &quot;Seats (Equipment Configuration)
      File&quot; provided by <Link text="OAG" href="https://oag.com/" />
    </li>
  );

  let dataSources: React.JSX.Element[] | undefined = undefined;
  if (value.source === EmissionsProvenance_EmissionsProvenanceEntry_DataSource.OPERATING_CARRIER) {
    dataSources = [aircraftConfigFromSchedulesSource];
  } else if (value.source === EmissionsProvenance_EmissionsProvenanceEntry_DataSource.OAG) {
    dataSources = [fleetLevelAircraftConfigSource];
  } else if (
    value.source === EmissionsProvenance_EmissionsProvenanceEntry_DataSource.AIRCRAFT_MODEL_TYPICAL
  ) {
    dataSources = [aircraftConfigFromSchedulesSource, fleetLevelAircraftConfigSource];
  }

  if (dataSources) return <ul>{dataSources}</ul>;
}

export function SeatAreaRatioSource({ value }: SourceProps): React.JSX.Element | undefined {
  if (value.source === EmissionsProvenance_EmissionsProvenanceEntry_DataSource.IATA) {
    return (
      <ul>
        <li>
          <Link
            text="IATA RP 1726"
            href="https://www.iata.org/en/programs/environment/passenger-emissions-methodology/"
          />
        </li>
      </ul>
    );
  }
}

export function DistanceAdjustmentSource({ value }: SourceProps): React.JSX.Element | undefined {
  if (value.source === EmissionsProvenance_EmissionsProvenanceEntry_DataSource.ICL) {
    return (
      <ul>
        <li>
          <Link
            text="ICL"
            href="https://www.imperial.ac.uk/transport-engineering/transport-and-environment/"
          />
        </li>
      </ul>
    );
  }
}

export function EasaLabelSource(): React.JSX.Element {
  return (
    <ul>
      <li>
        <Link text="EASA Environmental Label" href="https://www.flightemissions.eu/" />
      </li>
    </ul>
  );
}

/******************************************
 * Emissions provenance table
 ******************************************/

type Props = {
  emissionsData: ComputeDetailedFlightEmissionsResponse;
};

function formatProvenanceType(name: string, description?: string): string | React.JSX.Element {
  return (
    <div>
      <Typography className="emission-name" variant="subtitle1" component="div">
        {name}
      </Typography>
      {description && (
        <Typography className="emission-description" variant="caption" component="div">
          {description}
        </Typography>
      )}
    </div>
  );
}

function toSentenceCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

interface ProvenanceEntryWithValue extends EmissionsProvenance_EmissionsProvenanceEntry {
  loadFactorsData?: number;
  cargoMassFractionData?: number;
  seatAreaRatioData?: {
    first: number;
    business: number;
    premiumEconomy: number;
    economy: number;
  };
  estimatedFlightDistanceKm?: number;
}

function formatDataValue(value: ProvenanceEntryWithValue): string | React.JSX.Element {
  if (value.loadFactorsData !== undefined) return `${(value.loadFactorsData * 100).toFixed(1)}%`;
  if (value.cargoMassFractionData !== undefined)
    return `${(value.cargoMassFractionData * 100).toFixed(1)}%`;
  if (value.seatAreaRatioData !== undefined) {
    const { first, business, premiumEconomy, economy } = value.seatAreaRatioData;
    return (
      <div style={{ whiteSpace: "pre-wrap" }}>
        {`First: ${first}\nBusiness: ${business}\nPremium: ${premiumEconomy}\nEconomy: ${economy}`}
      </div>
    );
  }
  if (value.estimatedFlightDistanceKm !== undefined) return `${value.estimatedFlightDistanceKm} km`;
  return "Not Available";
}

function formatDataStrategy(entry: EmissionsProvenance_EmissionsProvenanceEntry): string {
  switch (entry.fuelBurnEeaStrategy) {
    case EmissionsProvenance_EmissionsProvenanceEntry_FuelBurnEea_Strategy.STATIC_CORRECTION_FACTOR:
      return "Static correction factor";
    case EmissionsProvenance_EmissionsProvenanceEntry_FuelBurnEea_Strategy.EEA2023_CORRECTION_FACTOR:
      return "EEA2023 based correction factor";
  }
  switch (entry.loadFactorsT100Strategy) {
    case EmissionsProvenance_EmissionsProvenanceEntry_LoadFactorsT100_Strategy.CARRIER_ROUTE_MONTH:
      return "Calculated using carrier, route, and month of travel";
    case EmissionsProvenance_EmissionsProvenanceEntry_LoadFactorsT100_Strategy.CARRIER_MONTH:
      return "Calculated using carrier and month of travel";
    case EmissionsProvenance_EmissionsProvenanceEntry_LoadFactorsT100_Strategy.ACTUAL_CARRIER_ROUTE_YEAR_MONTH:
      return "Historical data matching carrier, route, year, and month";
  }
  switch (entry.loadFactorsChAviationStrategy) {
    case EmissionsProvenance_EmissionsProvenanceEntry_LoadFactorsChAviation_Strategy.CARRIER_MONTH:
      return "Calculated using carrier and month of travel";
    case EmissionsProvenance_EmissionsProvenanceEntry_LoadFactorsChAviation_Strategy.ACTUAL_CARRIER_YEAR_MONTH:
      return "Historical data matching carrier, year, and month";
  }
  switch (entry.cargoMassFractionT100Strategy) {
    case EmissionsProvenance_EmissionsProvenanceEntry_CargoMassFractionT100_Strategy.CARRIER_ROUTE_AIRCRAFT_CLASS:
      return "Calculated using carrier, route, and aircraft class";
    case EmissionsProvenance_EmissionsProvenanceEntry_CargoMassFractionT100_Strategy.ROUTE_AIRCRAFT_CLASS:
      return "Calculated using route and aircraft class";
    case EmissionsProvenance_EmissionsProvenanceEntry_CargoMassFractionT100_Strategy.DISTANCE_AIRCRAFT_CLASS:
      return "Calculated using distance band and aircraft class";
    case EmissionsProvenance_EmissionsProvenanceEntry_CargoMassFractionT100_Strategy.ACTUAL_CARRIER_ROUTE_YEAR_MONTH_AIRCRAFT_CLASS:
      return "Historical data matching carrier, route, year, month, and aircraft class";
  }
  switch (entry.seatAreaRatioIataStrategy) {
    case EmissionsProvenance_EmissionsProvenanceEntry_SeatAreaRatioIata_Strategy.NARROW_AIRCRAFT_BODY:
      return "Narrow body aircraft";
    case EmissionsProvenance_EmissionsProvenanceEntry_SeatAreaRatioIata_Strategy.WIDE_AIRCRAFT_BODY:
      return "Wide body aircraft";
  }
  switch (entry.distanceAdjustmentStrategy) {
    case EmissionsProvenance_EmissionsProvenanceEntry_DistanceAdjustment_Strategy.ORIGIN_DESTINATION:
      return "Calculated using route-specific distance adjustment data";
    case EmissionsProvenance_EmissionsProvenanceEntry_DistanceAdjustment_Strategy.COUNTRY_PAIR:
      return "Calculated using country-specific distance adjustment data";
    case EmissionsProvenance_EmissionsProvenanceEntry_DistanceAdjustment_Strategy.DEFAULT:
      return "Calculated using global distance adjustment data";
  }

  return "Not Applicable";
}

function getEasaLabelRowData({ emissionsData }: Props): RowData[] {
  const easaData =
    emissionsData.flightsWithDetailedEmissions[0].emissionsMetadata?.easaLabelMetadata;

  if (easaData === undefined || easaData.safDiscountPercentage === undefined) {
    return [];
  }

  const easaSource = EasaLabelSource();
  const rowsData: RowData[] = [
    {
      cells: [
        formatProvenanceType(
          "Fuel Burn Estimates",
          "Estimated fuel consumed by the aircraft during the flight."
        ),
        "Not Available",
        easaSource,
        "Not Applicable",
        "Primary",
      ],
    },
  ];
  return rowsData;
}

function getProvenanceRowData({ emissionsData }: Props): RowData[] {
  const provenanceData =
    emissionsData.flightsWithDetailedEmissions[0].emissionsMetadata?.emissionsProvenance
      ?.provenanceEntries;
  // If provenance data is undefined, return nothing.
  if (provenanceData === undefined || provenanceData.length === 0) {
    return [];
  }

  const rowsData: RowData[] = [];
  provenanceData.forEach((value) => {
    const type = value.provenanceEntryType;
    const dataTypeStr = EmissionsProvenance_EmissionsProvenanceEntry_DataType[value.dataType];
    const dataType = value.dataType && dataTypeStr ? toSentenceCase(dataTypeStr) : "Unspecified";

    switch (type) {
      case EmissionsProvenance_EmissionsProvenanceEntryType.FUEL_BURN: {
        const fuelBurnSources = FuelBurnSource({ value: value });
        if (fuelBurnSources) {
          rowsData.push({
            cells: [
              formatProvenanceType(
                "Fuel Burn Estimates",
                "Estimated fuel consumed by the aircraft during the flight."
              ),
              formatDataValue(value as ProvenanceEntryWithValue),
              fuelBurnSources,
              formatDataStrategy(value),
              dataType,
            ],
          });
        }
        break;
      }
      case EmissionsProvenance_EmissionsProvenanceEntryType.LOAD_FACTORS: {
        const loadFactorSources = LoadFactorSource({ value: value });
        if (loadFactorSources) {
          rowsData.push({
            cells: [
              formatProvenanceType(
                "Passenger Load Factor",
                "The percentage of available seats occupied by passengers."
              ),
              formatDataValue(value as ProvenanceEntryWithValue),
              loadFactorSources,
              formatDataStrategy(value),
              dataType,
            ],
          });
        }
        break;
      }
      case EmissionsProvenance_EmissionsProvenanceEntryType.CARGO_MASS_FRACTION: {
        const cargoMassFractionSources = CargoMassFractionSource({ value: value });
        if (cargoMassFractionSources) {
          rowsData.push({
            cells: [
              formatProvenanceType(
                "Cargo Mass Fraction",
                "The percentage of total payload weight attributed to cargo."
              ),
              formatDataValue(value as ProvenanceEntryWithValue),
              cargoMassFractionSources,
              formatDataStrategy(value),
              dataType,
            ],
          });
        }
        break;
      }
      case EmissionsProvenance_EmissionsProvenanceEntryType.SEATING_CONFIG: {
        const passengerSeatSources = PassengerSeatSource({ value: value });
        if (passengerSeatSources) {
          rowsData.push({
            cells: [
              formatProvenanceType(
                "Passenger Seat Configuration",
                "The total number of seats and layout of the aircraft."
              ),
              formatDataValue(value as ProvenanceEntryWithValue),
              passengerSeatSources,
              formatDataStrategy(value),
              dataType,
            ],
          });
        }
        break;
      }
      case EmissionsProvenance_EmissionsProvenanceEntryType.SEAT_AREA_RATIOS: {
        const seatAreaRatioSources = SeatAreaRatioSource({ value: value });
        if (seatAreaRatioSources) {
          rowsData.push({
            cells: [
              formatProvenanceType(
                "Seat Area Ratios",
                "The relative floor area occupied by seats in each cabin class."
              ),
              formatDataValue(value as ProvenanceEntryWithValue),
              seatAreaRatioSources,
              formatDataStrategy(value),
              dataType,
            ],
          });
        }
        break;
      }
      case EmissionsProvenance_EmissionsProvenanceEntryType.DISTANCE_ADJUSTMENT: {
        const distanceAdjustmentSources = DistanceAdjustmentSource({ value: value });
        if (distanceAdjustmentSources) {
          rowsData.push({
            cells: [
              formatProvenanceType(
                "Estimated Flight Distance",
                "The calculated flight distance adjusted for real-world routing."
              ),
              formatDataValue(value as ProvenanceEntryWithValue),
              distanceAdjustmentSources,
              formatDataStrategy(value),
              dataType,
            ],
          });
        }
        break;
      }
    }
  });

  return rowsData;
}

function EmissionsProvenance({ emissionsData }: Props): React.JSX.Element {
  const isEasaLabel =
    emissionsData.flightsWithDetailedEmissions[0].flightEmissionsDetails?.source == Source.EASA;

  const rowsData = isEasaLabel
    ? getEasaLabelRowData({ emissionsData })
    : getProvenanceRowData({ emissionsData });

  if (rowsData.length == 0) {
    return <></>;
  }

  const tableData = {
    headers: ["Provenance Type", "Value", "Source", "Strategy", "Data Type"],
    rows: rowsData,
  };

  return (
    <div className={isEasaLabel ? "emissions-provenance-table easa" : "emissions-provenance-table"}>
      <Typography variant="h4" component="h2">
        How emissions are calculated
      </Typography>
      <br />
      <Typography variant="body1" component="div">
        Our full methodology is detailed on{" "}
        <Link text="GitHub" href="https://github.com/google/travel-impact-model" />. The table below
        details the provenance of our emissions data, showing for each factor: its value, source,
        the strategy used to calculate it, and the data type (per{" "}
        <Link text="ISO 14083" href="https://www.iso.org/standard/78864.html" />
        ).
      </Typography>
      <Table ariaLabel="Emissions Provenance table" data={tableData} />
    </div>
  );
}

export default EmissionsProvenance;
