// Copyright 2026 Google LLC
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
import Footer from "../components/Footer";
import TIMAppBar from "../components/TIMAppBar";
import "./Publications.scss";

interface MemoProps {
  url: string;
  name: string;
  publicationDate: string;
  description: string;
}

function MemoItem(props: MemoProps) {
  return (
    <div className="memo">
      <a href={props.url} download>
        {props.name}
      </a>
      <Typography variant="caption" component="p" className="memo-description">
        {props.publicationDate}
      </Typography>
      <Typography variant="body2" component="p" className="memo-description">
        {props.description}
      </Typography>
    </div>
  );
}

const MEMO_LIST = [
  {
    url: "/static/media/tim_contrails_impact_update.pdf",
    name: "Contrails Impact Update",
    publicationDate: "November 2025",
    description: `
           This technical brief documents the updates to the contrail warming
           estimates of the Travel Impact Model (TIM).  It outlines three major
           methodological improvements, and compares the results of the updated
           estimation model with the results of the previous one,
           which were presented in the January 2025 technical brief.`,
  },
  {
    url: "/static/media/tim_boosting_model_granularity.pdf",
    name: "Boosting Model Granularity",
    publicationDate: "January 2025",
    description: `
           This technical brief explores improving the Travel Impact Model's (TIM) fuel burn
           estimates by incorporating factors beyond aircraft type and stage length (first-order
           effects). It reviews literature and data availability for other influencing factors
           (second-order effects). A qualitative analysis identified aircraft age, engine variant,
           and payload as the most promising second-order effects for further study and development
           of correction factors.`,
  },
  {
    url: "/static/media/tim_contrails_impact.pdf",
    name: "Contrails Impact",
    publicationDate: "January 2025",
    description: `
          This technical brief details progress on communicating contrail impacts in the Travel
          Impact Model (TIM). It outlines four methods for classifying flights by contrail warming
          impact risk for consumers at booking. The currently preferred method classifies flights
          relative to typical route CO2 emissions.`,
  },
  {
    url: "/static/media/tim_model_selection.pdf",
    name: "Model Selection",
    publicationDate: "December 2024",
    description: `
          This technical brief details two improvements to the Travel Impact Model (TIM) for
          estimating fuel burn. First, the model was updated to the latest 2023 European
          Environment Agency data, improving accuracy and coverage. Second, a distance adjustment
          factor now accounts for real-world flight path variations beyond the great-circle
          distance between airports. This memo contains the latest validation results,
          demonstrating that these model changes enhance TIM's coverage and reduce estimation
          errors.`,
  },
  {
    url: "/static/media/tim_roadmap.pdf",
    name: "TIM Roadmap",
    publicationDate: "November 2024",
    description: `
          This technical brief outlines the Travel Impact Model (TIM) Roadmap, detailing its key
          principles, operating plan, and ongoing workstreams. The roadmap emphasizes
          transparency, accuracy, and continuous improvement of the TIM, ensuring it remains a
          reliable and future-proof tool for estimating flight emissions.`,
  },
  {
    url: "/static/media/tim_model_validation_methodology.pdf",
    name: "Model Validation Methodology",
    publicationDate: "November 2024",
    description: `
          This technical brief outlines the validation process used to ensure the Travel Impact
          Model (TIM) accurately estimates aircraft fuel burn. It details the methodology, which
          leverages both public and private fuel burn data, and how it's applied to evaluate
          model changes. This rigorous process increases transparency and ensures that TIM
          provides reliable fuel consumption estimates.`,
  },
  {
    url: "/static/media/tim_belly_cargo_apportionment_rationale.pdf",
    name: "Belly Cargo Apportionment",
    publicationDate: "October 2023 (revised April 2025)",
    description: `
          This technical brief explains the rationale for a Travel Impact Model (TIM) update that
          apportions carbon dioxide (CO2) emissions to both passengers and belly cargo (cargo
          carried in the belly of passenger aircraft) using a mass-based approach.`,
  },
];

function Publications() {
  return (
    <div>
      <title>Publications</title>
      <meta
        name="description"
        content="Technical briefs and publications related to the Travel Impact Model (TIM)."
      />
      <TIMAppBar variant="background-none" />
      <div className="publications-container" role="main" id="main" tabIndex={-1}>
        <Typography className="title" variant="h2" component="h1">
          Publications
        </Typography>
        {MEMO_LIST.map((memoItem, index) => (
          <MemoItem
            url={memoItem.url}
            name={memoItem.name}
            publicationDate={memoItem.publicationDate}
            description={memoItem.description}
            key={index}
          />
        ))}
        <div className="end-section" />
        <Footer variant="background-none" />
      </div>
    </div>
  );
}

export default Publications;
