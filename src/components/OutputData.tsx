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

import { ComputeFlightEmissionsResponse } from "../api/proto/generated/travelImpactModelProto";
import DataAttributionTable from "./DataAttributionTable";
import PassengerLevelTable from "./PassengerLevelTable";
import Link from "./Link";
import "./OutputData.scss";
import { Typography } from "@mui/material";

interface OutputDataProps {
  apiData: ComputeFlightEmissionsResponse;
}

function OutputData({ apiData }: OutputDataProps) {
  if (apiData.flightEmissions.length == 0) {
    return (
      <div className="output-data-container">
        <div className="output-field-error">
          <div className="output-field-error-text">
            <Typography variant="body1" component="div">
              We could not find this flight.&nbsp;
            </Typography>
            <Typography variant="body1" component="div">
              Please check the flight info and try again.
            </Typography>
          </div>
          <Typography variant="body2" component="div">
            (Note that{" "}
            <Link
              text="code shares"
              href="https://www.transportation.gov/policy/aviation-policy/licensing/code-sharing"
            />{" "}
            are not supported.)
          </Typography>
        </div>
      </div>
    );
  } else {
    return (
      <div className="output-data-container">
        <div className="output-field-section">
          <PassengerLevelTable apiData={apiData} />
        </div>
        <div className="output-field-section">
          <DataAttributionTable apiData={apiData} />
        </div>
        <div className="output-field-section">
          <Typography component="div" variant="body2" color="black">
            Learn more about{" "}
            <Link
              text="how these values are calculated"
              href="https://github.com/google/travel-impact-model"
            />
            .
          </Typography>
        </div>
      </div>
    );
  }
}

export default OutputData;
