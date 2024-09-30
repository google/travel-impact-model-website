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
  EmissionsInputs_EmissionsInputEntry,
} from "../api/proto/generated/travelImpactModelProto";
import Link from "./Link";
import Table, { RowData } from "./Table";
import "./DataAttributionTable.scss";

interface SourceProps {
  value: EmissionsInputs_EmissionsInputEntry;
}

export function FuelBurnSource({ value }: SourceProps): JSX.Element | undefined {
  if (value.dataSource === "EEA") {
    return (
      <ul>
        <li>
          <Link
            text="EEA Report"
            href="https://www.eea.europa.eu/publications/emep-eea-guidebook-2019/part-b-sectoral-guidance-chapters/1-energy/1-a-combustion/1-a-3-a-aviation/view"
          />{" "}
          No 13/2019 1.A.3.a Aviation 1 Master emissions calculator 2019
        </li>
        {value.dataStrategy === "EEA2023_CORRECTION_FACTOR" && (
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

export function LoadFactorSource({ value }: SourceProps): JSX.Element | undefined {
  if (value.dataSource === "T100") {
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
  } else if (value.dataSource === "CH_AVIATION") {
    return (
      <ul>
        <li>
          <Link text="ch-aviation" href="https://www.ch-aviation.com/" />{" "}
        </li>
      </ul>
    );
  } else if (value.dataSource === "GLOBAL_DEFAULT") {
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

export function PassengerSeatSource({ value }: SourceProps): JSX.Element | undefined {
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

  let dataSources: JSX.Element[] | undefined = undefined;
  if (value.dataSource === "OPERATING_CARRIER_CONFIG") {
    dataSources = [aircraftConfigFromSchedulesSource];
  } else if (value.dataSource === "OAG_SEATS_EQUIPMENT_CONFIG") {
    dataSources = [fleetLevelAircraftConfigSource];
  } else if (value.dataSource === "REFERENCE_CONFIG") {
    dataSources = [aircraftConfigFromSchedulesSource, fleetLevelAircraftConfigSource];
  }

  if (dataSources) return <ul>{dataSources}</ul>;
}

export function SeatAreaRatioSource(): JSX.Element {
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

/******************************************
 * Data attribution table
 ******************************************/

type Props = {
  apiData: ComputeFlightEmissionsResponse;
};

function DataAttributionTable({ apiData }: Props): JSX.Element {
  const attributionData = apiData.flightEmissions[0].emissionsInputs?.emissionsInputEntries;

  // If attribution data is undefined, return nothing.
  if (attributionData === undefined || Object.keys(attributionData).length === 0) {
    return <></>;
  }

  const rowsData: RowData[] = [];
  Object.entries(attributionData).forEach(([key, value]) => {
    switch (key) {
      case "totalFuelBurnEstimatedKg": {
        const fuelBurnSources = FuelBurnSource({ value: value });
        if (fuelBurnSources) {
          rowsData.push({ cells: ["Fuel Burn Estimates", fuelBurnSources], collapsibleRows: null });
        }
        break;
      }
      case "loadFactor": {
        const loadFactorSources = LoadFactorSource({ value: value });
        if (loadFactorSources) {
          rowsData.push({
            cells: ["Passenger Load Factor", loadFactorSources],
            collapsibleRows: null,
          });
        }
        break;
      }
      case "seatsPerClass": {
        const passengerSeatSources = PassengerSeatSource({ value: value });
        if (passengerSeatSources) {
          rowsData.push({
            cells: ["Passenger Seat Configuration", passengerSeatSources],
            collapsibleRows: null,
          });
        }
        break;
      }
    }
  });

  const seatAreaRatioSource = SeatAreaRatioSource();
  rowsData.push({ cells: ["Seat Area Ratios", seatAreaRatioSource], collapsibleRows: null });

  const tableData = { headers: ["Data Type", "Source"], rows: rowsData };

  return (
    <div className="data-attribution-table">
      <Typography variant="h4" component="h2">
        Data Attribution
      </Typography>
      <Table ariaLabel="Data Attribution table" data={tableData} />
    </div>
  );
}

export default DataAttributionTable;
