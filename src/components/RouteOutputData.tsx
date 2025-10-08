// Copyright 2025 Google LLC
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
import { ComputeTypicalFlightEmissionsResponse } from "../api/proto/generated/travelImpactModelProto";
import { formatTypicalEmissionsSection } from "./PassengerLevelTable";
import Link from "./Link";
import "./RouteOutputData.scss";

type Props = {
  typicalEmissionsData: ComputeTypicalFlightEmissionsResponse;
};

function RouteOutputData({ typicalEmissionsData }: Props) {
  if (typicalEmissionsData.typicalFlightEmissions.length == 0) {
    return (
      <div className="output-error-container" role="alert" aria-live="polite" aria-atomic="true">
        <div className="output-field-error">
          <div className="output-field-error-text">
            <Typography variant="body1" component="div">
              We could not find this route.&nbsp;
            </Typography>
            <Typography variant="body1" component="div">
              Please check the route info and try again.
            </Typography>
          </div>
        </div>
      </div>
    );
  } else {
    const typicalEmissionsPerPassenger =
      typicalEmissionsData?.typicalFlightEmissions[0]?.emissionsGramsPerPax;
    return (
      <div className="passenger-level-table-container">
        <Typography variant="h4" component="h2">
          Typical emissions
        </Typography>
        <Typography variant="subtitle1" component="h3" className="subheader">
          Fuel burn impact in kg CO2e per passenger
        </Typography>
        {typicalEmissionsPerPassenger &&
          Object.keys(typicalEmissionsPerPassenger).length !== 0 &&
          formatTypicalEmissionsSection(typicalEmissionsPerPassenger, false)}
        <div className="route-footer">
          <Typography component="div" variant="body2" color="black">
            Learn more about{" "}
            <Link
              text="how these values are calculated"
              href="https://github.com/google/travel-impact-model/blob/main/projects/typical_flight_emissions.md"
            />
            .
          </Typography>
        </div>
      </div>
    );
  }
}

export default RouteOutputData;
