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

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { Typography } from "@mui/material";
import { Launch, Link } from "@mui/icons-material";
import "./ActionCard.scss";

type ActionCardProps = {
  title: string;
  description: string;
  linkAriaLabel: string;
  linkValue: string;
  externalLink?: boolean;
};

export default function ActionCard(props: ActionCardProps) {
  return (
    <Card className="action-card">
      <CardActionArea href={props.linkValue} aria-label={props.linkAriaLabel}>
        <CardContent>
          <div className="action-card-title">
            <Typography gutterBottom variant="h6" component="div">
              {props.title}
            </Typography>
            {props.externalLink ? (
              <Launch className="action-icon" color="action" sx={{ fontSize: 16 }} />
            ) : (
              <Link className="action-icon" color="action" sx={{ fontSize: 18 }} />
            )}
          </div>
          <Typography variant="body2">{props.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
