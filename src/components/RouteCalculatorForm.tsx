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
  ComputeTypicalFlightEmissionsRequest,
  Market,
} from "../api/proto/generated/travelImpactModelProto";
import RouteInput from "./RouteInput";

interface RouteCalculatorFormProp {
  request: ComputeTypicalFlightEmissionsRequest;
  onSubmit: (arg: Market) => void;
}

function RouteCalculatorForm({ request, onSubmit }: RouteCalculatorFormProp) {
  const [inputsValid, setInputsValid] = useState(request.markets?.[0] !== undefined);
  const [inputMarket, setInputMarket] = useState(request.markets?.[0]);

  /** Update the `allInputsValid` state on render only. */
  useEffect(() => {
    if (inputsValid) {
      onSubmit(inputMarket);
    }
  }, []);

  return (
    <Box className="input-box" component="fieldset" borderRadius={3}>
      {request.markets.length > 0 ? (
        <RouteInput
          market={request.markets?.[0]}
          setValidity={(isValid: boolean) => setInputsValid(isValid)}
          setValue={(market: Market) => setInputMarket(market)}
        />
      ) : (
        <RouteInput
          setValidity={(isValid: boolean) => setInputsValid(isValid)}
          setValue={(market: Market) => setInputMarket(market)}
        />
      )}
      <div className="show-emissions-button">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSubmit(inputMarket)}
          disabled={!inputsValid}>
          Show emissions
        </Button>
      </div>
    </Box>
  );
}

export default RouteCalculatorForm;
