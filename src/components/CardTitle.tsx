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

import { Box, Button, Typography } from "@mui/material";
import "./CardTitle.scss";

type CardProps = {
  title: string;
  description?: string;
  linkName: string;
  linkAriaLabel: string;
  linkValue: string;
};

function CardTitle(props: CardProps) {
  return (
    <Box className="basic-card" borderRadius={3} sx={{ backgroundColor: "secondary.main" }}>
      <Typography variant="h6" component="h3" color="primary">
        {props.title}
      </Typography>
      {props.description && (
        <Typography variant="subtitle1" component="div">
          {props.description}
        </Typography>
      )}
      <Button
        aria-label={props.linkAriaLabel}
        className="card-button"
        href={props.linkValue}
        variant="contained"
        color="primary">
        {props.linkName}
      </Button>
    </Box>
  );
}

export default CardTitle;
