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
import TIMAppBar from "../components/TIMAppBar";
import { useEffect } from "react";

function NoPage() {
  useEffect(() => {
    document.title = "Page Load Error - 404";
  }, []);

  return (
    <div style={{ textAlign: "center" }} role="main">
      <TIMAppBar variant="background-none" />
      <Typography variant="h1" component="h1" color="primary">
        404
      </Typography>
      <Typography variant="h2" component="h2" color="primary">
        Page not found
      </Typography>
    </div>
  );
}

export default NoPage;
