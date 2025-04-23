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

import { Typography } from "@mui/material";
import Link from "./Link";
import "./Footer.scss";

type FooterProps = {
  prefixInfo?: string;
  extraLink?: JSX.Element;
  variant?: "background-image" | "background-none";
};

function Footer(props: FooterProps) {
  const color = props.variant === "background-none" ? "primary" : "secondary";
  const className = props.variant === "background-image" ? "solid-bg" : "";

  return (
    <Typography component="div" className={`footer ${className}`} variant="body2" color={color}>
      <span className="left-column">
        <span className="powered-by">Powered by Google</span>
        {props.prefixInfo}
      </span>
      <span className="right-column">
        <span className="links">
          {props.extraLink}
          <Link
            text="Contact Us"
            ariaLabel="Contact us"
            href="https://support.google.com/travel/contact/tim"
          />
          <Link
            text="Privacy Policy"
            ariaLabel="Privacy policy"
            href="https://policies.google.com/privacy"
          />
        </span>
      </span>
    </Typography>
  );
}

export default Footer;
