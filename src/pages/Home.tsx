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
import { preload } from "react-dom";
import CardTitle from "../components/CardTitle";
import Footer from "../components/Footer";
import TIMAppBar from "../components/TIMAppBar";
import mountainsJpg from "../assets/images/mountains.jpg";
import mountainsWebp from "../assets/images/mountains.webp";
import "./Home.scss";

function Home() {
  const variant = "background-image";
  preload(mountainsWebp, { as: "image", type: "image/webp" });
  preload(mountainsJpg, { as: "image", type: "image/jpeg" });
  return (
    <div className="tim-home-page">
      <title>Travel Impact Model</title>
      <meta
        name="description"
        content="The Travel Impact Model (TIM) provides clear, science-based estimates of travel emissions, built on the latest research."
      />
      <div className="background-image">
        <picture>
          <source srcSet={mountainsWebp} type="image/webp" />
          <source srcSet={mountainsJpg} type="image/jpeg" />
          {/* Background image from: https://www.pexels.com/photo/photo-of-people-on-top-of-mountain-2161920/ */}
          <img
            src={mountainsJpg}
            alt="Distant view of people on a mountain peak under a partly cloudy sky."
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </picture>
      </div>
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
              title="Usage Guide"
              description="Discover the different ways to use the TIM, from our calculator to the API"
              linkName="Learn how"
              linkAriaLabel="Learn how to use the Travel Impact Model (TIM) in the Usage Guide"
              linkValue="/usage-guide"
            />
            <CardTitle
              title="About"
              description="Learn more about the TIM, explore its methodology, and find answers in the FAQ"
              linkName="Read more"
              linkAriaLabel="Read more about Travel Impact Model (TIM)"
              linkValue="/about-tim"
            />
            <CardTitle
              title="Governance"
              description="Learn who oversees & decides on changes to the emissions model"
              linkName="Read more"
              linkAriaLabel="Read more about Travel Impact Model Governance"
              linkValue="/governance"
            />
          </div>
        </div>
        <Footer variant={variant} />
      </div>
    </div>
  );
}

export default Home;
