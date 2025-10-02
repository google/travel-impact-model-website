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

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LaunchIcon from "@mui/icons-material/Launch";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { ReactElement } from "react";
import Link from "../components/Link";
import TIMAppBar from "../components/TIMAppBar";
import Footer from "../components/Footer";
import "./About.scss";

interface FaqItemProps {
  question: string;
  answer: ReactElement;
  index: number;
}

interface InlineLinkProps {
  text: string;
  href?: string;
  openInNewTab?: boolean;
}

function InlineLink({ text, href, openInNewTab = true }: InlineLinkProps) {
  return (
    <>
      {" "}
      <Link text={text} href={href} target={openInNewTab ? "_blank" : "_self"} />{" "}
    </>
  );
}

const FAQ_LIST = [
  {
    question: "What is the Travel Impact Model (TIM)?",
    answer: (
      <div>
        The Travel Impact Model (TIM) is a transparent & continuously improving emissions estimation
        model developed by Google that is built from public and licensable external datasets and
        based on the latest science. It aims to provide a single source of reliable information, as
        a public good, for calculating and presenting the climate impact of individual flight trips
        to passengers. An independent Advisory Committee was
        <InlineLink
          text="created in 2023"
          href="https://blog.google/products/travel/google-travel-impact-model-sustainability/"
        />
        to develop recommendations for improvements to the TIM.
      </div>
    ),
  },
  {
    question: "Why is the TIM needed?",
    answer: (
      <div>
        The aviation industry
        <InlineLink
          text="has agreed"
          href="https://www.icao.int/environmental-protection/Documents/Assembly/Resolution_A41-21_Climate_change.pdf"
        />
        to achieve net-zero carbon dioxide (CO2) emissions by 2050, and is developing new
        technologies to support that goal. But work is needed to mobilize consumers to support early
        adopters of those technologies. While
        <InlineLink
          text="research shows"
          href="https://theicct.org/publication/variation-in-aviation-emissions-by-itinerary-the-case-for-emissions-disclosure/"
        />
        that consumers can reduce their per trip CO2 emissions by 22 to 63% by choosing the least
        emitting flights, more consistent and transparent data is needed to help identify those
        flights.
      </div>
    ),
  },
  {
    question: "Where is the TIM used today?",
    answer: (
      <ul>
        <li>
          The TIM is currently used by a number of travel search/technology providers to display
          emission estimates. These include: Google Flights, Skyscanner, Booking.com, Expedia and
          Sabre.
        </li>
        <li>
          Other members of the
          <InlineLink text="Travalyst coalition" href="https://travalyst.org/industry/" /> like
          Amadeus and Travelport have also committed to using the TIM in the near future.
        </li>
        <li>
          The International Council on Clean Transportation (ICCT), Travalyst, and Google will
          continue to promote the adoption of the TIM across the industry to encourage greater
          consistency for prospective travelers.
        </li>
      </ul>
    ),
  },
  {
    question: "What is the ICCT's role as Secretariat?",
    answer: (
      <div>
        As Secretariat, the International Council on Clean Transportation (ICCT) conducts background
        research, moderates meetings, publicly communicates Advisory Committee decisions, engages
        external stakeholders, and undertakes other tasks to support the Advisory Committee.
      </div>
    ),
  },
  {
    question: "Who serves on the Advisory Committee?",
    answer: (
      <div>
        The committee brings together a set of individuals with deep and unique expertise, including
        leading academics as well as representatives from environmental nonprofits, aviation
        regulators, and airlines themselves. The current committee members are listed on
        <InlineLink text="this page" href="/governance" openInNewTab={false} />.
      </div>
    ),
  },
];

function FaqItem(props: FaqItemProps) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={"faq" + props.index + "-content"}
        id={"faq" + props.index + "-header"}>
        <Typography variant="h6" component="h3">
          {props.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component="div">{props.answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

function About() {
  const variant = "background-none";
  return (
    <div>
      <title>About the Travel Impact Model</title>
      <meta
        name="description"
        content="Learn about the Travel Impact Model (TIM), an open, science-based approach to estimating flight emissions. Explore its principles and how it works."
      />
      <TIMAppBar variant={variant} />
      <div className="about-container" role="main" id="main">
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
          each flight (per seat/passenger). The methodology is described in more detail on{" "}
          <Link text="GitHub" href="https://github.com/google/travel-impact-model" />
          <LaunchIcon sx={{ fontSize: "inherit", verticalAlign: "middle", ml: 0.5 }} /> and is free
          and and available publicly. See our
          <InlineLink text="Usage Guide" href="/usage-guide" openInNewTab={false} />
          page for different ways to access the data.
        </Typography>

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

        <Typography variant="h4" component="h2">
          Framework and adoption
        </Typography>
        <Typography className="section" variant="body1">
          The Travel Impact Model is Google&apos;s implementation of the Travalyst Shared Framework,
          and it has been reviewed by Travalyst&apos;s Independent Advisory Group (IAG).
        </Typography>
        <Typography className="section" variant="body1">
          The TIM powers the emissions estimates you see on Google Flights, as well as sites like
          Booking.com, Skyscanner, Expedia, Trip.com, Travelport, Amadeus, Sabre, Didi, First Choice
          and others.
        </Typography>
        <div className="faq-questions">
          <Typography className="large-header" variant="h4" component="h2">
            Frequently asked questions (FAQ)
          </Typography>

          <div>
            {FAQ_LIST.map((faqItem, index) => (
              <FaqItem
                question={faqItem.question}
                answer={faqItem.answer}
                index={index}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="end-section" />
        <Footer variant={variant} />
      </div>
    </div>
  );
}

export default About;
