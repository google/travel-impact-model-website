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

import { Paper, Typography } from "@mui/material";
import Footer from "../components/Footer";
import Link from "../components/Link";
import TIMAppBar from "../components/TIMAppBar";
import BellyCargoPdf from "../docs/belly_cargo_apportionment_rationale_vf.pdf";
import "./Governance.scss";
import { useEffect } from "react";

interface CardProps {
  name: string;
  title: string;
  institution: string;
  institutionLink: string;
  nonVotingStar: boolean;
}

function EntityCard(props: CardProps) {
  return (
    <Paper className="card" elevation={3}>
      <Typography variant="body1" sx={{ fontWeight: 500 }} component="div">
        {props.name}
      </Typography>
      <Typography aria-label={props.nonVotingStar ? "* means non-voting observer" : ""} />
      <Typography variant="body1">
        <div>{props.title}</div>
        <div>
          <Link text={props.institution} href={props.institutionLink} />
        </div>
      </Typography>
    </Paper>
  );
}

function Governance() {
  useEffect(() => {
    document.title = "Governance | Travel Impact Model";
  }, []);

  return (
    <div role="main">
      <TIMAppBar variant="background-none" />
      <div className="governance-container">
        <Typography className="title" variant="h2" component="h1">
          Governance
        </Typography>
        <Typography className="section" variant="body1">
          The Travel Impact Model is administered by Google and overseen by an independent Advisory
          Committee that consists of world-leading experts on sustainability and aviation from
          industry, academia, policy and NGOs.
        </Typography>
        <Typography className="section" variant="body1">
          The Advisory Committee is accompanied by a Secretariat that provides technical expertise
          based on scientific evidence. The Advisory Committee together with the Secretariat ensures
          that the Travel Impact Model continues to evolve as a public good, and future development
          of the model is executed with high rigor, integrity, speed and according to the latest
          science.
        </Typography>

        <Typography variant="h4" component="h2">
          Secretariat
        </Typography>
        <div className="secretariat-list">
          <EntityCard
            name="Dr. Dan Rutherford"
            title="Aviation Program Director"
            institution="International Council on Clean Transportation"
            institutionLink="https://www.theicct.org/"
            nonVotingStar={false}
          />
        </div>

        <Typography variant="h4" component="h2">
          Advisory Committee Members
        </Typography>
        <div className="advisory-list">
          <EntityCard
            name="Jill Blickstein"
            title="Vice President, Sustainability"
            institution="American Airlines"
            institutionLink="https://www.aa.com/"
            nonVotingStar={false}
          />
          <EntityCard
            name="Tim Johnson"
            title="Director"
            institution="Aviation Environment Federation"
            institutionLink="https://www.aef.org.uk/"
            nonVotingStar={false}
          />
          <EntityCard
            name="Jane Ashton"
            title="Sustainability Director"
            institution="easyJet"
            institutionLink="https://www.easyjet.com/"
            nonVotingStar={false}
          />
          <EntityCard
            name="Achilleas Achilleos *"
            title="Strategic Programme Officer"
            institution="European Union Aviation Safety Agency"
            institutionLink="https://www.easa.europa.eu/"
            nonVotingStar={true}
          />
          <EntityCard
            name="Fabio Grandi *"
            title="Special Assistant to the Chief Scientific & Technical Advisor for Environment and Energy"
            institution="Federal Aviation Administration"
            institutionLink="https://www.faa.gov/"
            nonVotingStar={true}
          />
          <EntityCard
            name="Dr. Marc Stettler"
            title="Professor in Transport and Environment"
            institution="Imperial College London"
            institutionLink="https://www.imperial.ac.uk/"
            nonVotingStar={false}
          />
          <EntityCard
            name="Caroline Drischel"
            title="Head of Corporate Responsibility"
            institution="Lufthansa Group"
            institutionLink="http://www.dlh.de/"
            nonVotingStar={false}
          />
          <EntityCard
            name="Prof. Steven Barrett"
            title="Regius Professor of Engineering"
            institution="University of Cambridge"
            institutionLink="https://www.cam.ac.uk/"
            nonVotingStar={false}
          />
          <EntityCard
            name="Andrew Chen"
            title="Principal, Aviation Decarbonization"
            institution="Rocky Mountain Institute"
            institutionLink="https://www.rmi.org/"
            nonVotingStar={false}
          />
          <EntityCard
            name="Sally Davey"
            title="Chief Executive Officer"
            institution="Travalyst"
            institutionLink="https://www.travalyst.org/"
            nonVotingStar={false}
          />
        </div>

        <Typography variant="h4" component="h2">
          Publications
        </Typography>
        <div>
          <a href={BellyCargoPdf} download="belly_cargo_apportionment_rationale_vf.pdf">
            Technical Memo on Belly Cargo Apportionment
          </a>
        </div>

        <Typography className="footnote" variant="body2">
          * Non-voting observer
        </Typography>

        <Footer variant="background-none" />
      </div>
    </div>
  );
}

export default Governance;
