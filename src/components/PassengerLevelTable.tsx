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
import "./PassengerLevelTable.scss";
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

function createCo2CollapsableRowData(
  name: string | JSX.Element,
  emissionsPerPassenger: EmissionsGramsPerPax | undefined
): RowData {
  return {
    cells: formatEmissionsPerPassenger(name, emissionsPerPassenger),
    collapsibleRows: null,
  };
}

function createCo2RowData(
  emissionsPerPassenger: EmissionsGramsPerPax | undefined,
  emissionsBreakdown: EmissionsBreakdown | undefined
): RowData {
  const [wtwToolTipOpen, wtwSetToolTipOpen] = useState(false);
  const [wttToolTipOpen, wttSetToolTipOpen] = useState(false);
  const [ttwToolTipOpen, ttwSetToolTipOpen] = useState(false);

  const wtwName = (
    <>
      Well-to-Wake
      <ClickAwayListener
        onClickAway={() => {
          wtwSetToolTipOpen(false);
        }}>
        {/*If you change the definition for WTW, make sure to also change it on the Travel Impact Model github spec page as well.*/}
        <Tooltip
          className="breakdown-info-icon"
          title="The sum of Well-to-Tank (WTT) and Tank-to-Wake (TTW) emissions."
          onClose={() => wtwSetToolTipOpen(false)}
          open={wtwToolTipOpen}>
          <IconButton onClick={() => wtwSetToolTipOpen(!wtwToolTipOpen)}>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </>
  );
  const wttName = (
    <>
      Well-to-Tank
      <ClickAwayListener
        onClickAway={() => {
          wttSetToolTipOpen(false);
        }}>
        {/*If you change the definition for WTT, make sure to also change it on the Travel Impact Model github spec page as well.*/}
        <Tooltip
          className="breakdown-info-icon"
          title="Emissions generated during the production, processing, handling, and delivery of jet fuel."
          onClose={() => wttSetToolTipOpen(false)}
          open={wttToolTipOpen}>
          <IconButton onClick={() => wttSetToolTipOpen(!wttToolTipOpen)}>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </>
  );
  const ttwName = (
    <>
      Tank-to-Wake
      <ClickAwayListener
        onClickAway={() => {
          ttwSetToolTipOpen(false);
        }}>
        {/*If you change the definition for TTW, make sure to also change it on the Travel Impact Model github spec page as well.*/}
        <Tooltip
          className="breakdown-info-icon"
          title="Emissions produced by burning jet fuel during takeoff, flight, and landing of an aircraft."
          onClose={() => ttwSetToolTipOpen(false)}
          open={ttwToolTipOpen}>
          <IconButton onClick={() => ttwSetToolTipOpen(!ttwToolTipOpen)}>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </>
  );
  return {
    cells: formatEmissionsPerPassenger(wtwName, emissionsPerPassenger),
    collapsibleRows: [
      createCo2CollapsableRowData(ttwName, emissionsBreakdown?.ttwEmissionsGramsPerPax),
      createCo2CollapsableRowData(wttName, emissionsBreakdown?.wttEmissionsGramsPerPax),
    ],
  };
}

function createTableData(
  emissionsPerPassenger: EmissionsGramsPerPax | undefined,
  emissionsBreakdown: EmissionsBreakdown | undefined
): TableData {
  return {
    headers: ["Emissions Type", "Economy", "Premium", "Business", "First"],
    rows: [createCo2RowData(emissionsPerPassenger, emissionsBreakdown)],
  };
}

type Props = {
  apiData: ComputeFlightEmissionsResponse;
};

function PassengerLevelTable({ apiData }: Props) {
  const emissionsPerPassenger = apiData.flightEmissions[0].emissionsGramsPerPax;
  const emissionsBreakdown = apiData.flightEmissions[0].emissionsBreakdown;

  if (
    emissionsPerPassenger &&
    Object.keys(emissionsPerPassenger).length !== 0 &&
    emissionsBreakdown &&
    Object.keys(emissionsBreakdown).length !== 0
  ) {
    return (
      <div className="passenger-level-table-container">
        <Typography variant="h4" component="h2">
          Estimated emissions in kg CO2e per passenger
        </Typography>
        <Table
          ariaLabel="Estimated Emissions Per Passenger table"
          data={createTableData(emissionsPerPassenger, emissionsBreakdown)}
        />
      </div>
    );
  }
}

export default PassengerLevelTable;
