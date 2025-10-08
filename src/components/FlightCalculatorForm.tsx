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

import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ComputeFlightEmissionsRequest,
  Flight,
} from "../api/proto/generated/travelImpactModelProto";
import "./FlightCalculatorForm.scss";
import FlightInput from "./FlightInput";

interface FlightCalculatorFormProp {
  request: ComputeFlightEmissionsRequest;
  onSubmit: (arg: Map<number, Flight>) => void;
}

function FlightCalculatorForm({ request, onSubmit }: FlightCalculatorFormProp) {
  const initialValidity = new Map(
    request.flights.length > 0 ? request.flights.map((_, idx) => [idx, false]) : [[0, false]]
  );
  const [inputRowsValid, setInputRowsValid] = useState(initialValidity);
  const [inputRowFlightLegs, setInputRowFlightLegs] = useState(
    new Map(request.flights.map((el, index) => [index, el]))
  );

  /** Update the `allInputsValid` state on render only. */
  useEffect(() => {
    if (Array.from(inputRowsValid.values()).every((e) => e === true)) {
      onSubmit(inputRowFlightLegs);
    }
  }, []);

  return (
    <Box className="input-box" component="fieldset" borderRadius={3}>
      {request.flights.length > 0 ? (
        request.flights.map((leg, index) => (
          <FlightInput
            flightLeg={leg}
            key={index}
            setValidity={(isValid: boolean) =>
              setInputRowsValid((row) => new Map(row.set(index, isValid)))
            }
            setValue={(leg: Flight) => setInputRowFlightLegs((map) => new Map(map.set(index, leg)))}
          />
        ))
      ) : (
        <FlightInput
          setValidity={(isValid: boolean) =>
            setInputRowsValid((map) => new Map(map.set(0, isValid)))
          }
          setValue={(leg: Flight) => setInputRowFlightLegs((map) => new Map(map.set(0, leg)))}
        />
      )}
      <div className="show-emissions-button">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSubmit(inputRowFlightLegs)}
          disabled={Array.from(inputRowsValid.values()).includes(false)}>
          Show emissions
        </Button>
      </div>
    </Box>
  );
}

export default FlightCalculatorForm;
