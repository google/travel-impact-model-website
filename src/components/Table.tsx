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

import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Typography } from "@mui/material";
import "./Table.scss";

export interface RowData {
  cells: (string | React.JSX.Element)[];
  indented?: boolean;
  emphasize?: boolean;
}

export interface TableData {
  headers: string[];
  rows: RowData[];
}

interface TableProps {
  data: TableData;
  ariaLabel: string;
  includesTotal?: boolean | undefined;
  className?: string;
}

function Table(props: TableProps) {
  return (
    <TableContainer
      className={(props.includesTotal ? "totals" : "") + " table-container " + props.className}>
      <MuiTable aria-label={props.ariaLabel}>
        {props.data.headers.length > 0 && (
          <TableHead>
            <TableRow>
              {props.data.headers.map((header, headerIndex) => (
                <TableCell key={headerIndex} className="table-header">
                  <Typography variant="subtitle2" component="div">
                    {header}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {props.data.rows.map((row, rowIndex) => {
            return (
              <TableRow key={rowIndex} className={row.emphasize ? "highlight-row" : ""}>
                {row.cells.map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className={
                      row.indented && cellIndex == 0 ? "indented-cell data-cell" : "data-cell"
                    }>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;
