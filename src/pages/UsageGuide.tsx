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

import { Typography } from "@mui/material";
import Link from "../components/Link";
import ActionCard from "../components/ActionCard";
import Footer from "../components/Footer";
import TIMAppBar from "../components/TIMAppBar";
import "./UsageGuide.scss";

function UsageGuide() {
  const variant = "background-none";
  return (
    <div>
      <title>Usage Guide</title>
      <meta
        name="description"
        content="Learn how to use the Travel Impact Model (TIM) through our Emissions Calculator, Developer API, or Google Sheets add-on."
      />
      <TIMAppBar variant={variant} />
      <div className="usage-guide-container" role="main" id="main">
        <Typography className="title" variant="h2" component="h1">
          Usage Guide
        </Typography>
        <Typography className="section" variant="body1">
          The Travel Impact Model (TIM) is designed to be accessible to a wide range of users, from
          individual travelers to large-scale developers. Below are the different ways you can
          access and utilize the model&apos;s emissions data.
        </Typography>
        <br />
        <div className="action-card-container">
          <ActionCard
            title="Emissions Calculator"
            description="Try it yourself with our easy to use emissions calculator!"
            linkAriaLabel="Emissions Calculator. Try it yourself with our easy to use emissions calculator!"
            linkValue="/lookup/flight"
          />
          <ActionCard
            title="Developers API"
            description="Are you a developer? Try our API."
            linkAriaLabel="Developers API. Are you a developer? Try our API."
            linkValue="https://developers.google.com/travel/impact-model"
            externalLink={true}
          />
          <ActionCard
            title="Google Sheets Ext."
            description="Not a developer? Want to do some analysis on your own? Try the Google Sheets add-on."
            linkAriaLabel="Google Sheets Ext. Not a developer? Want to do some analysis on your own? Try the Google Sheets add-on."
            linkValue="https://workspace.google.com/marketplace/app/flight_emissions_for_sheets/655425728274"
            externalLink={true}
          />
        </div>
        <Typography className="section" variant="body1">
          If the API or Google Sheets Add-On is not optimal for you to access the emissions data,
          please{" "}
          <Link
            text="contact us"
            href="https://support.google.com/travel/contact/tim?pcff=category:travel_Impact_model_(TIM)_API"
          />{" "}
          to discuss other options.
        </Typography>

        <div className="end-section" />
        <Footer variant={variant} />
      </div>
    </div>
  );
}

export default UsageGuide;
