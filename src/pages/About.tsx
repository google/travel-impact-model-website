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

import { Button, Typography } from "@mui/material";
import TIMAppBar from "../components/TIMAppBar";
import "./About.scss";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "About the Travel Impact Model";
  }, []);

  const variant = "background-none";
  return (
    <div role="main">
      <TIMAppBar variant={variant} />
      <div className="about-container">
        <Typography className="title" variant="h2" component="h1">
          About the Travel Impact Model
        </Typography>
        <Typography variant="body1">
          The Travel Impact Model (TIM) is a transparent & continuously improving emissions
          estimation model that is built from public and licensable external datasets, based on the
          latest science. It aims to provide a single source of truth, as a public good, for
          calculating and presenting the climate impact of individual flight trips to passengers.
        </Typography>

        <Typography variant="h4" component="h2">
          How the model works
        </Typography>
        <Typography className="section" variant="body1">
          The model combines flight origin and destination, aircraft type, cabin class and seat
          configuration, load factors and average aircraft utilization to estimate CO2e emissions
          for each flight (per seat/passenger). The methodology output is free and available
          publicly via an API.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          href="https://github.com/google/travel-impact-model"
          target="_blank">
          Github
        </Button>

        <Typography variant="h5" component="h3">
          Model principles
        </Typography>
        <Typography className="section" variant="body1" component="ul">
          <li>
            <b>Accurate</b> and validated with real-world data
          </li>
          <li>
            <b>Precise</b> in distinguishing more and less emitting flights
          </li>
          <li>
            <b>Comprehensive</b> in covering the full climate impacts of aviation
          </li>
          <li>
            <b>Futureproof</b> across new technologies and aircraft designs
          </li>
          <li>
            <b>Transparent</b> in methods, data sources, and assumptions
          </li>
          <li>
            <b>Consistent</b> across airlines and industry stakeholders
          </li>
          <li>
            <b>Accessible</b> and free to all users
          </li>
        </Typography>
      </div>
    </div>
  );
}

export default About;
