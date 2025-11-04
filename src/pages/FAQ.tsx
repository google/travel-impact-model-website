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
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { ReactElement } from "react";
import Footer from "../components/Footer";
import Link from "../components/Link";
import TIMAppBar from "../components/TIMAppBar";
import "./FAQ.scss";

interface FaqItemProps {
  question: string;
  answer: ReactElement;
  index: number;
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
        to passengers. An independent Advisory Committee was{" "}
        <Link
          text="created in 2023"
          href="https://blog.google/products/travel/google-travel-impact-model-sustainability/"
        />{" "}
        to develop recommendations for improvements to the TIM.
      </div>
    ),
  },
  {
    question: "Why is the TIM needed?",
    answer: (
      <div>
        The aviation industry{" "}
        <Link
          text="has agreed"
          href="https://www.icao.int/environmental-protection/Documents/Assembly/Resolution_A41-21_Climate_change.pdf"
        />{" "}
        to achieve net-zero carbon dioxide (CO2) emissions by 2050, and is developing new
        technologies to support that goal. But work is needed to mobilize consumers to support early
        adopters of those technologies. While{" "}
        <Link
          text="research shows"
          href="https://theicct.org/publication/variation-in-aviation-emissions-by-itinerary-the-case-for-emissions-disclosure/"
        />{" "}
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
          Other members of the{" "}
          <Link text="Travalyst coalition" href="https://travalyst.org/industry/" /> like Amadeus
          and Travelport have also committed to using the TIM in the near future.
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
    question: "What is the ICCT’s role as Secretariat?",
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
        regulators, and airlines themselves. The current committee members are listed on{" "}
        <Link text="this page" href="/governance" />.
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
        <Typography variant="h6" component="div">
          {props.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component="div">{props.answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

function FAQ() {
  const variant = "background-none";
  return (
    <div>
      <title>FAQ</title>
      <meta
        name="description"
        content="Find answers to common questions about the Travel Impact Model (TIM) - including its purpose, how to use it, and how it's governed."
      />
      <TIMAppBar variant={variant} />
      <div className="faq-container" role="main" id="main">
        <div className="faq-questions">
          <Typography className="large-header" variant="h2" component="h1" color="primary">
            Frequently Asked Questions
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
        <Footer variant={variant} />
      </div>
    </div>
  );
}

export default FAQ;
