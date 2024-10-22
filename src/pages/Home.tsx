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
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "TIM Home Page";
  }, []);

  const variant = "background-image";
  return (
    <div className="tim-home-page" role="main">
      <TIMAppBar variant={variant} />

      {/* Background image from: https://www.pexels.com/photo/photo-of-people-on-top-of-mountain-2161920/ */}
      <picture className="background-image-wrapper">
        <source srcSet="/images/mountains.webp" type="image/webp" />
        <img className="background-image" src="/images/mountains.jpg" alt="" />
      </picture>

      <div className="tim-main-content-container">
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
              linkValue="/lookup/flight"
            />
          </div>
        </div>
        <Footer variant={variant} />
      </div>
    </div>
  );
}

export default Home;
