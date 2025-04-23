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

import { Link as MuiLink } from "@mui/material";

type LinkProps = {
  text: string;
  href: string | undefined;
  ariaLabel?: string | undefined;
};

function Link(props: LinkProps) {
  if (props.href) {
    return (
      <MuiLink
        href={props.href}
        target="_blank"
        rel="noopener"
        color="#0000EE"
        sx={{ margin: "-8px", padding: "8px" }}
        aria-label={props.ariaLabel}>
        {props.text}
      </MuiLink>
    );
  }
  return props.text;
}

export default Link;
