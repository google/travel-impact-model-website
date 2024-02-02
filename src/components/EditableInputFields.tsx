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

import { Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { convertDateMessageToString, convertStringToDateMessage } from "../data/flightDate";
import {
  ComputeFlightEmissionsRequest,
  DateMessage,
  Flight,
} from "../api/proto/generated/travelImpactModelProto";
import "./EditableInputFields.scss";

interface FlightInputFieldsProps {
  flightLeg?: Flight;
  setValidity: (isValid: boolean) => void;
  setValue: (leg: Flight) => void;
}

const AIRPORT_CODE_REGEX = new RegExp("^[a-zA-Z]{3}$");
const CARRIER_CODE_REGEX = new RegExp("^[a-zA-Z0-9]{2}$");
const FLIGHT_NUMBER_REGEX = new RegExp("^[0-9]+$");
const NUMBER_OF_DAYS_IN_YEAR = 365;

function FlightInput(props: FlightInputFieldsProps) {
  function getOriginHelperText(value: string | undefined) {
    if (!value || (value && !AIRPORT_CODE_REGEX.test(value))) {
      return "3-letter IATA airport code";
    }
  }

  function getDestinationHelperText(value: string | undefined) {
    if (!value || (value && !AIRPORT_CODE_REGEX.test(value))) {
      return "3-letter IATA airport code";
    }
  }

  function getCarrierCodeHelperText(value: string | undefined) {
    if (!value || (value && !CARRIER_CODE_REGEX.test(value))) {
      return "2-character IATA airline code";
    }
  }

  function getFlightNumberHelperText(value: string | undefined) {
    if (value && !FLIGHT_NUMBER_REGEX.test(value)) {
      return "Numbers only";
    }
  }

  function getDateHelperText(value: DateMessage | undefined) {
    const dateString = value ? convertDateMessageToString(value) : undefined;
    const valueInDayJsFormat = dayjs(dateString).isValid() ? dayjs(dateString) : dayjs();
    if (valueInDayJsFormat < dayjs().startOf("date")) {
      return "Departure date should be in the future";
    } else if (valueInDayJsFormat > dayjs().startOf("date").add(NUMBER_OF_DAYS_IN_YEAR, "day")) {
      return "Departure date cannot be more than a year in the future";
    }
  }

  function isOriginDestinationTextErrorMessage(value: string | undefined) {
    return value !== undefined && !AIRPORT_CODE_REGEX.test(value);
  }

  function isCarrierCodeTextErrorMessage(value: string | undefined) {
    return value !== undefined && !CARRIER_CODE_REGEX.test(value);
  }

  function isFlightNumberTextErrorMessage(value: string | undefined) {
    return value !== undefined && !FLIGHT_NUMBER_REGEX.test(value);
  }

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
        }}
      />
      <DatePicker
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
        }}
      />
    </div>
  );
}

interface EditableInputFieldsProp {
  request: ComputeFlightEmissionsRequest;
  onSubmit: (arg: Map<number, Flight>) => void;
}

function EditableInputFields({ request, onSubmit }: EditableInputFieldsProp) {
  const [inputRowsValid, setInputRowsValid] = useState(new Map());
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

export default EditableInputFields;
