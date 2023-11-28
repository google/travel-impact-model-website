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
  ComputeFlightEmissionsResponse,
  EmissionsBreakdown,
  EmissionsGramsPerPax,
} from "../api/proto/generated/travelImpactModelProto";
import Table, { RowData, TableData } from "./Table";
import Link from "./Link";

const ONE_KILOGRAM = 1;

function roundValue(value: number | undefined) {
  if (value) {
    if (value >= ONE_KILOGRAM) {
      return Math.round(value);
    } else {
      return value;
    }
  }

  return "XX";
}

export function createCo2RowData(
  name: string | JSX.Element,
  emissionsPerPassenger: EmissionsGramsPerPax | undefined
): RowData {
  const formatValue = (value: number | undefined) => `${roundValue(value)} kg`;

  const economy = formatValue(emissionsPerPassenger?.economy);
  const premiumEconomy = formatValue(emissionsPerPassenger?.premiumEconomy);
  const business = formatValue(emissionsPerPassenger?.business);
  const first = formatValue(emissionsPerPassenger?.first);

  return { cells: [name, economy, premiumEconomy, business, first] };
}

function createTableData(emissionsBreakdown: EmissionsBreakdown | undefined): TableData {
  const addValues = (valueOne: number | undefined, valueTwo: number | undefined) =>
    valueOne && valueTwo ? valueOne + valueTwo : undefined;

  // New emissions per passenger value is a sum of TTW and WWT.
  const emissionsPerPassenger: EmissionsGramsPerPax = {
    economy: addValues(
      emissionsBreakdown?.ttwEmissionsGramsPerPax?.economy,
      emissionsBreakdown?.wttEmissionsGramsPerPax?.economy
    ),
    premiumEconomy: addValues(
      emissionsBreakdown?.ttwEmissionsGramsPerPax?.premiumEconomy,
      emissionsBreakdown?.wttEmissionsGramsPerPax?.premiumEconomy
    ),
    business: addValues(
      emissionsBreakdown?.ttwEmissionsGramsPerPax?.premiumEconomy,
      emissionsBreakdown?.wttEmissionsGramsPerPax?.premiumEconomy
    ),
    first: addValues(
      emissionsBreakdown?.ttwEmissionsGramsPerPax?.first,
      emissionsBreakdown?.wttEmissionsGramsPerPax?.first
    ),
  };

  const wtwName = (
    <>
      Well-to-Wake CO2e (
      <Link text="WTW" href="https://github.com/google/travel-impact-model#glossary" />)
    </>
  );

  const wttName = (
    <>
      Well-to-Tank (
      <Link text="WTT" href="https://github.com/google/travel-impact-model#glossary" />)
    </>
  );
  const ttwName = (
    <>
      Tank-to-Wake (
      <Link text="TTW" href="https://github.com/google/travel-impact-model#glossary" />)
    </>
  );

  return {
    headers: ["Emissions Type", "Economy", "Premium", "Business", "First"],
    rows: [
      createCo2RowData(wtwName, emissionsPerPassenger),
      createCo2RowData(ttwName, emissionsBreakdown?.ttwEmissionsGramsPerPax),
      createCo2RowData(wttName, emissionsBreakdown?.wttEmissionsGramsPerPax),
    ],
  };
}

type Props = {
  apiData: ComputeFlightEmissionsResponse;
};

function PassengerLevelTable({ apiData }: Props) {
  const emissionsBreakdown = apiData.flightEmissions[0].emissionsBreakdown;

  if (emissionsBreakdown && Object.keys(emissionsBreakdown).length !== 0) {
    return (
      <>
        <Typography variant="h4" component="h2">
          Estimated Emissions Per Passenger
        </Typography>
        <Table
          ariaLabel="Estimated Emissions Per Passenger table"
          data={createTableData(emissionsBreakdown)}
        />
      </>
    );
  }
}
export default PassengerLevelTable;
