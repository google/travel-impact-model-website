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
  EmissionsGramsPerPax,
} from "../api/proto/generated/travelImpactModelProto";
import Table, { RowData, TableData } from "./Table";

function createCo2RowData(emissionsPerPassenger: EmissionsGramsPerPax | undefined): RowData {
  const formatValue = (value: number | undefined) => `${value ? Math.round(value) : "XX"} kg`;

  const economy = formatValue(emissionsPerPassenger?.economy);
  const premiumEconomy = formatValue(emissionsPerPassenger?.premiumEconomy);
  const business = formatValue(emissionsPerPassenger?.business);
  const first = formatValue(emissionsPerPassenger?.first);

  return { cells: ["Carbon Dioxide (CO2)", economy, premiumEconomy, business, first] };
}

function createTableData(emissionsPerPassenger: EmissionsGramsPerPax | undefined): TableData {
  return {
    headers: ["Emissions Type", "Economy", "Premium", "Business", "First"],
    rows: [createCo2RowData(emissionsPerPassenger)],
  };
}

type Props = {
  apiData: ComputeFlightEmissionsResponse;
};

function PassengerLevelTable({ apiData }: Props) {
  const emissionsData = apiData.flightEmissions[0].emissionsGramsPerPax;

  if (emissionsData && Object.keys(emissionsData).length !== 0) {
    return (
      <>
        <Typography variant="h4" component="h2">
          Estimated Emissions Per Passenger
        </Typography>
        <Table
          ariaLabel="Estimated Emissions Per Passenger table"
          data={createTableData(emissionsData)}
        />
      </>
    );
  }
}
export default PassengerLevelTable;
