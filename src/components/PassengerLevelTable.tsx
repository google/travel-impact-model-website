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
  ContrailsImpactBucket,
  ComputeTypicalFlightEmissionsResponse,
  EmissionsBreakdown,
  EmissionsGramsPerPax,
} from "../api/proto/generated/travelImpactModelProto";
import Table, { TableData } from "./Table";
import "./PassengerLevelTable.scss";

function multiplyAndRoundValue(value: number | undefined, multiplier: number) {
  return value ? (Math.round(value * 10 * multiplier) / 10).toFixed(1) : "XX";
}

function formatContrailsImpactBucket(contrailsImpactBucket: ContrailsImpactBucket | undefined) {
  switch (contrailsImpactBucket) {
    case ContrailsImpactBucket.CONTRAILS_IMPACT_NEGLIGIBLE:
      return "Low";
    case ContrailsImpactBucket.CONTRAILS_IMPACT_MODERATE:
      return "Medium";
    case ContrailsImpactBucket.CONTRAILS_IMPACT_SEVERE:
      return "High";
    case ContrailsImpactBucket.UNRECOGNIZED:
    case ContrailsImpactBucket.CONTRAILS_IMPACT_UNSPECIFIED:
    case undefined:
      return "Unknown";
  }
}

export function formatEmissionsPerPassengerRow(
  name: string | React.JSX.Element,
  emissionsPerPassenger: EmissionsGramsPerPax | undefined,
  description: string | React.JSX.Element,
  emissionsMultiplier = 1,
  isTotalRow = false
): (string | React.JSX.Element)[] {
  const info = (
    <div className="passenger-level-table-container">
      <Typography
        className={isTotalRow ? "total emission-name" : "emission-name"}
        variant="subtitle1"
        component="div">
        {name}
      </Typography>
      {description && (
        <Typography className="emission-description" variant="caption" component="div">
          {description}
        </Typography>
      )}
    </div>
  );

  const economy = multiplyAndRoundValue(emissionsPerPassenger?.economy, emissionsMultiplier);
  const premiumEconomy = multiplyAndRoundValue(
    emissionsPerPassenger?.premiumEconomy,
    emissionsMultiplier
  );
  const business = multiplyAndRoundValue(emissionsPerPassenger?.business, emissionsMultiplier);
  const first = multiplyAndRoundValue(emissionsPerPassenger?.first, emissionsMultiplier);

  return [info, economy, premiumEconomy, business, first];
}

function formatEmissionsRow(
  name: string | React.JSX.Element,
  emissionsPerPassenger: EmissionsGramsPerPax | undefined,
  description: string | React.JSX.Element
): (string | React.JSX.Element)[] {
  return formatEmissionsPerPassengerRow(name, emissionsPerPassenger, description);
}

function formatSafDiscountRow(
  name: string | React.JSX.Element,
  emissionsPerPassenger: EmissionsGramsPerPax | undefined,
  description: string | React.JSX.Element,
  safDiscountPercentage: number
): (string | React.JSX.Element)[] {
  // For SAF rows, multiply emissions by the negative SAF percentage to render emissions reduction
  // (e.g. 20% SAF of 200kg total emissions = -40kg)
  const safMultiplier = safDiscountPercentage * -1;
  return formatEmissionsPerPassengerRow(name, emissionsPerPassenger, description, safMultiplier);
}

function formatTotalsRow(
  name: string | React.JSX.Element,
  emissionsPerPassenger: EmissionsGramsPerPax | undefined,
  safDiscountPercentage: number
): (string | React.JSX.Element)[] {
  // For Total Rows, multiply by (1 - SAF discount percentage) to render net emissions
  const totalMultiplier = 1 - safDiscountPercentage;
  return formatEmissionsPerPassengerRow(
    name,
    emissionsPerPassenger,
    "" /* description */,
    totalMultiplier,
    true /* isTotalRow */
  );
}

function formatContrailsSection(
  contrailsImpactBucket: ContrailsImpactBucket | undefined
): string | React.JSX.Element {
  const info = (
    <div className="passenger-level-table-container">
      <Typography className={"emission-name"} variant="subtitle1" component="div">
        Contrails impact bucket
      </Typography>
      <Typography className="emission-description" variant="caption" component="div">
        The relative impact bucket of contrails compared to fuel burn for this flight.
      </Typography>
    </div>
  );
  const tableData = {
    headers: [],
    rows: [
      {
        cells: [info, formatContrailsImpactBucket(contrailsImpactBucket)],
        indented: false,
      },
    ],
  };
  return (
    <div className="contrails">
      <Typography variant="subtitle1" component="h3" className="subheader">
        Contrails
      </Typography>
      <Table
        ariaLabel="Estimated Contrails impact table"
        data={tableData}
        className={"contrails"}
        includesTotal={false}
      />
    </div>
  );
}

export function formatTypicalEmissionsSection(
  typicalEmissionsPerPassenger: EmissionsGramsPerPax,
  displayTitle = true
): string | React.JSX.Element {
  const tableData = {
    headers: ["Emission Type", "Economy", "Premium", "Business", "First"],
    rows: [
      {
        cells: formatEmissionsRow(
          "Typical",
          typicalEmissionsPerPassenger,
          "Typical Well-to-Wake emissions for a flight between this origin and destination." /* description */
        ),
        indented: false,
      },
    ],
  };
  return (
    <div>
      {displayTitle && (
        <Typography variant="subtitle1" component="h3" className="subheader">
          Typical Emissions
        </Typography>
      )}
      <Table
        ariaLabel="Typical Well-to-Wake emissions for a flight between this origin and destination"
        data={tableData}
        includesTotal={false}
      />
    </div>
  );
}

function createTableData(
  emissionsPerPassenger: EmissionsGramsPerPax | undefined,
  emissionsBreakdown: EmissionsBreakdown | undefined,
  safDiscountPercentage: number
): TableData {
  const tableData : TableData = {
    headers: ["Emission Type", "Economy", "Premium", "Business", "First"],
    rows: [
      {
        cells: formatEmissionsRow(
          "Well-to-Wake",
          emissionsPerPassenger,
          "The sum of Well-to-Tank and Tank-to-Wake emissions."
        ),
        indented: false,
      },
      {
        cells: formatEmissionsRow(
          "Tank-to-Wake",
          emissionsBreakdown?.ttwEmissionsGramsPerPax,
          "Emissions produced by burning jet fuel during takeoff, flight, and landing of an aircraft."
        ),
        indented: true,
      },
      {
        cells: formatEmissionsRow(
          "Well-to-Tank",
          emissionsBreakdown?.wttEmissionsGramsPerPax,
          "Emissions generated during the production, processing, handling, and delivery of jet fuel."
        ),
        indented: true,
      },
    ],
  };

  if (safDiscountPercentage) {
    tableData.rows.push({
      cells: formatSafDiscountRow(
        "Sustainable Aviation Fuel (SAF)",
        emissionsPerPassenger,
        `Accounts for -${safDiscountPercentage * 100}% of the jet fuel`,
        safDiscountPercentage
      ),
      indented: false,
    });
    tableData.rows.push({
      cells: formatTotalsRow(
        "Total emissions including SAF",
        emissionsPerPassenger,
        safDiscountPercentage
      ),
      indented: false,
      emphasize: true,
    });
  }

  return tableData;
}

type Props = {
  emissionsData: ComputeFlightEmissionsResponse;
  typicalEmissionsData?: ComputeTypicalFlightEmissionsResponse;
};

function PassengerLevelTable({ emissionsData, typicalEmissionsData }: Props) {
  const emissionsPerPassenger = emissionsData.flightEmissions[0].emissionsGramsPerPax;
  const emissionsBreakdown = emissionsData.flightEmissions[0].emissionsBreakdown;
  const emissionsSafDiscount =
    emissionsData.flightEmissions[0].emissionsInputs?.easaLabelData?.safDiscountPercentage ?? 0;
  const emissionsContrailImpact = emissionsData.flightEmissions[0].contrailsImpactBucket ?? 0;
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
          Emissions estimates
        </Typography>
        <Typography variant="subtitle1" component="h3" className="subheader">
          Fuel burn impact in kg CO2e per passenger
        </Typography>
        <Table
          ariaLabel="Estimated Emissions Per Passenger table"
          data={createTableData(emissionsPerPassenger, emissionsBreakdown, emissionsSafDiscount)}
          includesTotal={emissionsSafDiscount > 0}
        />
        {typicalEmissionsPerPassenger &&
          Object.keys(typicalEmissionsPerPassenger).length !== 0 &&
          formatTypicalEmissionsSection(typicalEmissionsPerPassenger)}
        {emissionsContrailImpact > 0 && formatContrailsSection(emissionsContrailImpact)}
      </div>
    );
  }
}

export default PassengerLevelTable;
