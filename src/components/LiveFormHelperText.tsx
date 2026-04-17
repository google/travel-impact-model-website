import * as React from "react";
import FormHelperText, { FormHelperTextProps } from "@mui/material/FormHelperText";

declare module "@mui/material/TextField" {
  interface TextFieldFormHelperTextSlotPropsOverrides {
    helperTextKey?: React.Key;
  }
}

const LiveFormHelperText = React.forwardRef<
  HTMLParagraphElement,
  FormHelperTextProps & { helperTextKey?: React.Key }
>(function LiveFormHelperText(props, ref) {
  const { helperTextKey, children, ...other } = props;

  return (
    <FormHelperText ref={ref} key={helperTextKey} {...other}>
      {children}
    </FormHelperText>
  );
});

export default LiveFormHelperText;
