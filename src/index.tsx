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

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getPerformance } from "firebase/performance";
import { HelmetProvider } from "react-helmet-async";

const firebaseConfig = {
  apiKey: "AIzaSyDZIoS8NnZms4bFx3_bWNbQ2aj9L8H9mDQ",
  authDomain: "tim-website-e8bba.firebaseapp.com",
  projectId: "tim-website-e8bba",
  storageBucket: "tim-website-e8bba.appspot.com",
  messagingSenderId: "979758156159",
  appId: "1:979758156159:web:0af79a421e52f55c2b324a",
};
const app = initializeApp(firebaseConfig);
if (import.meta.env.VITE_API_USE_FIREBASE_EMULATOR) {
  const functions = getFunctions(app);
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}
getPerformance(app);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App app={app} />
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
