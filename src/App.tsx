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

import { ThemeProvider } from "@emotion/react";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { FirebaseApp } from "firebase/app";
import About from "./pages/About";
import EmissionsCalculator from "./pages/EmissionsCalculator";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Governance from "./pages/Governance";

// Setting theme colors for the website.
const theme = createTheme({
  palette: {
    // Primary color is black.
    primary: {
      main: "#000000",
    },
    // Secondary color is white.
    secondary: {
      main: "#FFFFFF",
    },
    text: {
      primary: "#000000", //black
      secondary: "#FFFFFF", //white
    },
  },
  typography: {
    h1: {
      fontFamily: "Open Sans",
      fontSize: 76,
    },
    h2: {
      fontFamily: "Open Sans",
      fontSize: 52,
    },
    h3: {
      fontFamily: "Open Sans",
    },
    h4: {
      fontFamily: "Open Sans",
    },
    h5: {
      fontFamily: "Open Sans",
    },
  },
});

const responsiveTheme = responsiveFontSizes(theme);

interface AppProps {
  app: FirebaseApp;
}

// Main website app starts here.
function App({ app }: AppProps) {
  return (
    <ThemeProvider theme={responsiveTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about-tim" element={<About />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/lookup/flight" element={<EmissionsCalculator app={app} />} />
            <Route path="/404" element={<NoPage />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
