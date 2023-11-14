#!/bin/bash -eu
#
# Copyright 2023 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e
cd src/api/proto
mkdir -p generated
protoc --plugin=../../../node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./generated travelImpactModelProto.proto
echo "Generated src/api/proto/generated/travelImpactModelProto.ts."
