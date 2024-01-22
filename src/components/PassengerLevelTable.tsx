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

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ClickAwayListener, IconButton, Tooltip, Typography } from "@mui/material";
import {
  ComputeFlightEmissionsResponse,
  EmissionsBreakdown,
  EmissionsGramsPerPax,
} from "../api/proto/generated/travelImpactModelProto";
import Table, { RowData, TableData } from "./Table";
import Link from "./Link";
import { useState } from "react";

export function formatEmissionsPerPassenger(
  name: string | JSX.Element,
  emissionsPerPassenger: EmissionsGramsPerPax | undefined
): (string | JSX.Element)[] {
  const roundValue = (value: number | undefined) =>
    value ? (Math.round(value * 10) / 10).toFixed(1) : "XX";

  const economy = roundValue(emissionsPerPassenger?.economy);
  const premiumEconomy = roundValue(emissionsPerPassenger?.premiumEconomy);
  const business = roundValue(emissionsPerPassenger?.business);
  const first = roundValue(emissionsPerPassenger?.first);

  return [name, economy, premiumEconomy, business, first];
}

export function calculateEmissionsPerPassenger(
  emissionsBreakdown: EmissionsBreakdown | undefined
): EmissionsGramsPerPax {
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
      emissionsBreakdown?.ttwEmissionsGramsPerPax?.business,
      emissionsBreakdown?.wttEmissionsGramsPerPax?.business
    ),
    first: addValues(
      emissionsBreakdown?.ttwEmissionsGramsPerPax?.first,
      emissionsBreakdown?.wttEmissionsGramsPerPax?.first
    ),
  };

  return emissionsPerPassenger;
}

function createCo2CollapsableRowData(
  name: string | JSX.Element,
  emissionsPerPassenger: EmissionsGramsPerPax | undefined
): RowData {
  return {
    cells: formatEmissionsPerPassenger(name, emissionsPerPassenger),
    collapsableRows: null,
  };
}

function createCo2RowData(
  emissionsPerPassenger: EmissionsGramsPerPax | undefined,
  emissionsBreakdown: EmissionsBreakdown | undefined
): RowData {
  const wtwName = (
    <>
      <Link text="Well-to-Wake" href="https://github.com/google/travel-impact-model#glossary" />
    </>
  );
  const wttName = (
    <>
      <Link text="Well-to-Tank" href="https://github.com/google/travel-impact-model#glossary" />
    </>
  );
  const ttwName = (
    <>
      <Link text="Tank-to-Wake" href="https://github.com/google/travel-impact-model#glossary" />
    </>
  );

  return {
    cells: formatEmissionsPerPassenger(wtwName, emissionsPerPassenger),
    collapsableRows: [
      createCo2CollapsableRowData(ttwName, emissionsBreakdown?.ttwEmissionsGramsPerPax),
      createCo2CollapsableRowData(wttName, emissionsBreakdown?.wttEmissionsGramsPerPax),
    ],
  };
}

function createTableData(emissionsBreakdown: EmissionsBreakdown | undefined): TableData {
  const emissionsPerPassenger = calculateEmissionsPerPassenger(emissionsBreakdown);

  return {
    headers: ["Emissions Type", "Economy", "Premium", "Business", "First"],
    rows: [createCo2RowData(emissionsPerPassenger, emissionsBreakdown)],
  };
}

type Props = {
  apiData: ComputeFlightEmissionsResponse;
};

function PassengerLevelTable({ apiData }: Props) {
  const emissionsBreakdown = apiData.flightEmissions[0].emissionsBreakdown;

  if (emissionsBreakdown && Object.keys(emissionsBreakdown).length !== 0) {
    const [toolTipOpen, setToolTipOpen] = useState(false);
    return (
      <>
        <Typography variant="h4" component="h2">
          Estimated emissions in kg CO2e per passenger
          <ClickAwayListener
            onClickAway={() => {
              setToolTipOpen(false);
            }}>
            <Tooltip
              title="Small inconsistencies expected due to rounding."
              onClose={() => setToolTipOpen(false)}
              open={toolTipOpen}>
              <IconButton
                onClick={() => setToolTipOpen(!toolTipOpen)}
                sx={{ margin: "-8px 0", padding: "16px" }}>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
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
