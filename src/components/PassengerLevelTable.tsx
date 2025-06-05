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
  ComputeTypicalFlightEmissionsResponse,
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

function createCo2CollapsibleRowData(
  name: string | JSX.Element,
  emissionsPerPassenger: EmissionsGramsPerPax | undefined
): RowData {
  return {
    cells: formatEmissionsPerPassenger(name, emissionsPerPassenger),
    collapsibleRows: null,
    useLightGrayText: false,
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
      createCo2CollapsibleRowData(ttwName, emissionsBreakdown?.ttwEmissionsGramsPerPax),
      createCo2CollapsibleRowData(wttName, emissionsBreakdown?.wttEmissionsGramsPerPax),
    ],
    useLightGrayText: false,
  };
}

function createTypicalEmissionsRowData(
  typicalEmissionsPerPassenger: EmissionsGramsPerPax | undefined
): RowData {
  const [typicalToolTipOpen, typicalSetToolTipOpen] = useState(false);
  const rowHeader = (
    <>
      Typical
      <ClickAwayListener
        onClickAway={() => {
          typicalSetToolTipOpen(false);
        }}>
        <Tooltip
          className="typical-info-icon"
          title="Typical Well-to-Wake emissions for a flight between this origin and destination."
          onClose={() => typicalSetToolTipOpen(false)}
          open={typicalToolTipOpen}>
          <IconButton onClick={() => typicalSetToolTipOpen(!typicalToolTipOpen)}>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </>
  );
  return {
    cells: formatEmissionsPerPassenger(rowHeader, typicalEmissionsPerPassenger),
    collapsibleRows: null,
    useLightGrayText: true,
  };
}

function createTableData(
  emissionsPerPassenger: EmissionsGramsPerPax | undefined,
  emissionsBreakdown: EmissionsBreakdown | undefined,
  typicalEmissionsPerPassenger: EmissionsGramsPerPax | undefined
): TableData {
  const rows = [createCo2RowData(emissionsPerPassenger, emissionsBreakdown)];
  // Always call createTypicalEmissionsRowData as its first line is creating a hook.
  // If not we're getting "Rendered more hooks than during the previous render".
  // We can then decide to use it or not.
  const typicalRow = createTypicalEmissionsRowData(typicalEmissionsPerPassenger);
  if (typicalEmissionsPerPassenger && Object.keys(typicalEmissionsPerPassenger).length !== 0) {
    rows.push(typicalRow);
  }
  return {
    headers: ["Type", "Economy", "Premium", "Business", "First"],
    rows: rows,
  };
}

type Props = {
  emissionsData: ComputeFlightEmissionsResponse;
  typicalEmissionsData?: ComputeTypicalFlightEmissionsResponse;
};

function PassengerLevelTable({ emissionsData, typicalEmissionsData }: Props) {
  const emissionsPerPassenger = emissionsData.flightEmissions[0].emissionsGramsPerPax;
  const emissionsBreakdown = emissionsData.flightEmissions[0].emissionsBreakdown;
  const typicalEmissionsPerPassenger =
    typicalEmissionsData?.typicalFlightEmissions[0]?.emissionsGramsPerPax;

  if (
    emissionsPerPassenger &&
    Object.keys(emissionsPerPassenger).length !== 0 &&
    emissionsBreakdown &&
    Object.keys(emissionsBreakdown).length !== 0
  ) {
    return (
      <div className="passenger-level-table-container">
        <Typography variant="h4" component="h2">
          Emissions
        </Typography>
        <Typography variant="body1">Estimated kg CO2e per passenger</Typography>
        <Table
          ariaLabel="Estimated Emissions Per Passenger table"
          data={createTableData(
            emissionsPerPassenger,
            emissionsBreakdown,
            typicalEmissionsPerPassenger
          )}
        />
      </div>
    );
  }
}

export default PassengerLevelTable;
