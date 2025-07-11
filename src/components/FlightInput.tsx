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
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Flight } from "../api/proto/generated/travelImpactModelProto";
import { convertDateMessageToString, convertStringToDateMessage } from "../data/flightDate";
import {
  NUMBER_OF_DAYS_IN_YEAR,
  getCarrierCodeHelperText,
  getDateHelperText,
  getDestinationHelperText,
  getFlightNumberHelperText,
  getOriginHelperText,
  isCarrierCodeTextErrorMessage,
  isFlightNumberTextErrorMessage,
  isOriginDestinationTextErrorMessage,
} from "../data/flightInputValidation";

interface FlightInputFieldsProps {
  flightLeg?: Flight;
  setValidity: (isValid: boolean) => void;
  setValue: (leg: Flight) => void;
}

function FlightInput(props: FlightInputFieldsProps) {
  // Data used to render the inputs fields and the corresponding error messages.
  // helperTextKeys are needed in order to re-read the error messages by screen readers.
  const [inputs, setInputs] = useState({
    origin: {
      value: props.flightLeg?.origin,
      helperText: getOriginHelperText(props.flightLeg?.origin),
      helperTextKey: 0,
      isError: isOriginDestinationTextErrorMessage(props.flightLeg?.origin),
    },
    destination: {
      value: props.flightLeg?.destination,
      helperText: getDestinationHelperText(props.flightLeg?.destination),
      helperTextKey: 0,
      isError: isOriginDestinationTextErrorMessage(props.flightLeg?.destination),
    },
    carrierCode: {
      value: props.flightLeg?.operatingCarrierCode,
      helperText: getCarrierCodeHelperText(props.flightLeg?.operatingCarrierCode),
      helperTextKey: 0,
      isError: isCarrierCodeTextErrorMessage(props.flightLeg?.operatingCarrierCode),
    },
    flightNumber: {
      value: props.flightLeg?.flightNumber,
      helperText: getFlightNumberHelperText(props.flightLeg?.flightNumber.toString()),
      helperTextKey: 0,
      isError: isFlightNumberTextErrorMessage(props.flightLeg?.flightNumber.toString()),
    },
    date: {
      value: props.flightLeg?.departureDate
        ? dayjs(convertDateMessageToString(props.flightLeg?.departureDate))
        : dayjs(),
      helperText: getDateHelperText(props.flightLeg?.departureDate),
      helperTextKey: 0,
    },
  });

  function getValueAsFlight() {
    return {
      origin: inputs.origin.value,
      destination: inputs.destination.value,
      operatingCarrierCode: inputs.carrierCode.value,
      flightNumber: inputs.flightNumber.value,
      departureDate: convertStringToDateMessage(inputs.date.value.format("YYYYMMDD")),
    } as Flight;
  }

  /** Update the form validation state and value whenever inputs change. */
  useEffect(() => {
    const isValid =
      !!inputs.origin.value &&
      !inputs.origin.helperText &&
      !!inputs.destination.value &&
      !inputs.destination.helperText &&
      !!inputs.carrierCode.value &&
      !inputs.carrierCode.helperText &&
      !!inputs.flightNumber.value &&
      !inputs.flightNumber.helperText &&
      !!inputs.date.value &&
      !inputs.date.helperText;
    props.setValidity(isValid);
    props.setValue(getValueAsFlight());
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
      <TextField
        required
        name="carrierCode"
        label="Carrier Code"
        defaultValue={inputs.carrierCode.value}
        id="carrierCode"
        onChange={(e) =>
          setInputs((prev) => ({
            ...prev,
            carrierCode: {
              value: e.target.value,
              helperText: getCarrierCodeHelperText(e.target.value),
              helperTextKey: Math.random(),
              isError: isCarrierCodeTextErrorMessage(e.target.value),
            },
          }))
        }
        error={inputs.carrierCode.isError}
        helperText={inputs.carrierCode.helperText}
        FormHelperTextProps={{
          "aria-live": "assertive",
          key: inputs.carrierCode.helperTextKey,
        }}
        InputLabelProps={{ "aria-hidden": true }}
        InputProps={{
          inputProps: { "aria-label": "Carrier Code" },
          endAdornment: inputs.carrierCode.isError ? (
            <InputAdornment position="end">
              <ErrorIcon color="error" />
            </InputAdornment>
          ) : (
            <></>
          ),
        }}
      />
      <TextField
        required
        name="flightNumber"
        label="Flight Number"
        defaultValue={inputs.flightNumber.value}
        id="flightNumber"
        onChange={(e) =>
          setInputs((prev) => ({
            ...prev,
            flightNumber: {
              value: e.target.value,
              helperText: getFlightNumberHelperText(e.target.value),
              helperTextKey: Math.random(),
              isError: isFlightNumberTextErrorMessage(e.target.value),
            },
          }))
        }
        error={!!inputs.flightNumber.isError}
        helperText={inputs.flightNumber.helperText}
        FormHelperTextProps={{
          "aria-live": "assertive",
          key: inputs.flightNumber.helperTextKey,
        }}
        InputLabelProps={{ "aria-hidden": true }}
        InputProps={{
          inputProps: { "aria-label": "Flight Number" },
          endAdornment: inputs.flightNumber.isError ? (
            <InputAdornment position="end">
              <ErrorIcon color="error" />
            </InputAdornment>
          ) : (
            <></>
          ),
        }}
      />
      <DesktopDatePicker
        label="Departure Date"
        defaultValue={inputs.date.value}
        format="YYYY/MM/DD"
        onChange={(e) => {
          setInputs((prev) => ({
            ...prev,
            date: {
              value: e ?? dayjs(),
              helperText: getDateHelperText(
                e ? convertStringToDateMessage(e?.format("YYYYMMDD")) : undefined
              ),
              helperTextKey: Math.random(),
            },
          }));
        }}
        disablePast
        maxDate={dayjs().add(NUMBER_OF_DAYS_IN_YEAR, "day")} // Don't allow dates > 365 days in the future
        slotProps={{
          textField: {
            helperText: inputs.date.helperText,
            required: true,
            FormHelperTextProps: { "aria-live": "assertive", key: inputs.date.helperTextKey },
            InputLabelProps: { "aria-hidden": true },
            InputProps: { "aria-label": "Departure Date" },
          },
          openPickerButton: {
            "aria-label": `Departure date, selected date is ${inputs.date.value.format(
              "MMM DD, YYYY"
            )}`,
          },
        }}
      />
    </div>
  );
}

export default FlightInput;
