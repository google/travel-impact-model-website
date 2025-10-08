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

import ErrorIcon from "@mui/icons-material/Error";
import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Market } from "../api/proto/generated/travelImpactModelProto";
import {
  getDestinationHelperText,
  getOriginHelperText,
  isOriginDestinationTextErrorMessage,
} from "../data/flightInputValidation";

interface RouteInputFieldsProps {
  market?: Market;
  setValidity: (isValid: boolean) => void;
  setValue: (market: Market) => void;
}

function RouteInput(props: RouteInputFieldsProps) {
  const [inputs, setInputs] = useState({
    origin: {
      value: props.market?.origin,
      helperText: getOriginHelperText(props.market?.origin),
      helperTextKey: 0,
      isError: isOriginDestinationTextErrorMessage(props.market?.origin),
    },
    destination: {
      value: props.market?.destination,
      helperText: getDestinationHelperText(props.market?.destination),
      helperTextKey: 0,
      isError: isOriginDestinationTextErrorMessage(props.market?.destination),
    },
  });

  function getValueAsMarket() {
    return {
      origin: inputs.origin.value,
      destination: inputs.destination.value,
    } as Market;
  }

  /** Update the form validation state and value whenever inputs change. */
  useEffect(() => {
    const isValid =
      !!inputs.origin.value &&
      !inputs.origin.helperText &&
      !!inputs.destination.value &&
      !inputs.destination.helperText;
    props.setValidity(isValid);
    props.setValue(getValueAsMarket());
  }, [inputs]);

  return (
    <div className="flight-input-container">
      <TextField
        sx={{ minWidth: "40%" }}
        required
        name="origin"
        label="Origin"
        defaultValue={inputs.origin.value}
        id="origin"
        onChange={(e) =>
          setInputs((prev) => ({
            ...prev,
            origin: {
              value: e.target.value,
              helperText: getOriginHelperText(e.target.value),
              helperTextKey: Math.random(),
              isError: isOriginDestinationTextErrorMessage(e.target.value),
            },
          }))
        }
        error={inputs.origin.isError}
        helperText={inputs.origin.helperText}
        FormHelperTextProps={{ "aria-live": "assertive", key: inputs.origin.helperTextKey }}
        InputLabelProps={{ "aria-hidden": true }}
        InputProps={{
          inputProps: { "aria-label": "Origin" },
          endAdornment: inputs.origin.isError ? (
            <InputAdornment position="end">
              <ErrorIcon color="error" />
            </InputAdornment>
          ) : (
            <></>
          ),
        }}
      />
      <TextField
        sx={{ minWidth: "40%" }}
        required
        name="destination"
        label="Destination"
        defaultValue={inputs.destination.value}
        id="destination"
        onChange={(e) =>
          setInputs((prev) => ({
            ...prev,
            destination: {
              value: e.target.value,
              helperText: getDestinationHelperText(e.target.value),
              helperTextKey: Math.random(),
              isError: isOriginDestinationTextErrorMessage(e.target.value),
            },
          }))
        }
        error={inputs.destination.isError}
        helperText={inputs.destination.helperText}
        FormHelperTextProps={{
          "aria-live": "assertive",
          key: inputs.destination.helperTextKey,
        }}
        InputLabelProps={{ "aria-hidden": true }}
        InputProps={{
          inputProps: { "aria-label": "Destination" },
          endAdornment: inputs.destination.isError ? (
            <InputAdornment position="end">
              <ErrorIcon color="error" />
            </InputAdornment>
          ) : (
            <></>
          ),
        }}
      />
    </div>
  );
}

export default RouteInput;
