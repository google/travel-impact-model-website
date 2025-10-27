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
import CardTitle from "../components/CardTitle";
import Footer from "../components/Footer";
import TIMAppBar from "../components/TIMAppBar";
import "./Home.scss";

function Home() {
  const variant = "background-image";
  return (
    <div className="tim-home-page">
      <title>Travel Impact Model</title>
      <meta
        name="description"
        content="The Travel Impact Model (TIM) provides clear, science-based estimates of travel emissions, built on the latest research."
      />
      <TIMAppBar variant={variant} />
      <div className="tim-main-content-container" role="main" id="main">
        <div className="tim-main-content">
          <div className="tim-title">
            <Typography className="title" variant="h1" component="h1">
              Travel Impact Model
            </Typography>
            <Typography className="subtitle" variant="h4" component="h2">
              Estimating the Impact of Air Travel
            </Typography>
          </div>
          <div className="cards">
            <CardTitle
              title="About"
              description="Learn more about the Travel Impact Model (TIM) and how it works"
              linkName="Read more"
              linkAriaLabel="Read more about Travel Impact Model"
              linkValue="/about-tim"
            />
            <CardTitle
              title="Governance"
              description="Learn who oversees & decides on changes to the emissions model"
              linkName="Read more"
              linkAriaLabel="Read more about Travel Impact Model Governance"
              linkValue="/governance"
            />
            <CardTitle
              title="Emissions Calculator"
              description="Use our tool to calculate and understand the factors in a flight's emissions"
              linkName="Try it"
              linkAriaLabel="Try emissions calculator"
              linkValue="/lookup/route"
            />
          </div>
        </div>
        <Footer variant={variant} />
      </div>
    </div>
  );
}

export default Home;
