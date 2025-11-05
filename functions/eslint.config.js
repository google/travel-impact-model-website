// Copyright 2025 Google LLC
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

import path from "path";
import { fileURLToPath } from "url";
import {
  defineConfig,
  globalIgnores,
} from "eslint/config";
import globals from "globals";
import {
  fixupConfigRules,
  fixupPluginRules,
} from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import js from "@eslint/js";
import {
  FlatCompat,
} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([{
  languageOptions: {
    globals: {
      ...globals.node,
    },

    parser: tsParser,
    sourceType: "module",

    parserOptions: {
      project: ["tsconfig.json", "tsconfig.dev.json"],
    },
  },

  extends: fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  )),

  plugins: {
    "@typescript-eslint": fixupPluginRules(typescriptEslint),
    import: fixupPluginRules(_import),
  },

  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": ["error", 2],
  },
}, globalIgnores(["lib/**/*"])]);
