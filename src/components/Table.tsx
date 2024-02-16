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
  IconButton,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import "./Table.scss";
import React from "react";

export interface RowData {
  cells: (string | JSX.Element)[];
  collapsableRows: RowData[] | null;
}

export interface TableData {
  headers: string[];
  rows: RowData[];
}

interface CollapsableRowProps {
  row: RowData;
}

export function CollapsableRow({ row }: CollapsableRowProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {/* Create row with the arrow icon that when clicked will collapse/uncollapse the rows below */}
      <TableRow>
        <TableCell className="collapse-row-end-cell" align="right">
          <IconButton
            aria-label={open ? "Hide more rows" : "Show more rows"}
            aria-pressed={open}
            aria-live="assertive"
            onClick={() => setOpen(!open)}
            sx={{ margin: "-8px 0" }}>
            {open ? (
              <KeyboardArrowUp
                className="row-with-subrows-icon"
                sx={{ border: 1, borderRadius: 1 }}
              />
            ) : (
              <KeyboardArrowDown
                className="row-with-subrows-icon"
                sx={{ border: 1, borderRadius: 1 }}
              />
            )}
          </IconButton>
        </TableCell>
        {row.cells.map((cell, cellIndex) => (
          <TableCell className={cellIndex != 0 ? "data-cell" : undefined} key={cellIndex}>
            {cell}
          </TableCell>
        ))}
      </TableRow>
      {/* Create collapsable rows */}
      {row.collapsableRows !== null &&
        row.collapsableRows.map((rowc, rowcIndex) => (
          <TableRow key={rowcIndex} sx={{ visibility: open ? "visible" : "collapse" }}>
            <TableCell
              className={
                row.collapsableRows !== null && rowcIndex === row.collapsableRows?.length - 1
                  ? "collapse-row-end-cell-bottom"
                  : "collapse-row-end-cell"
              }
            />
            {rowc.cells.map((cell, cellIndex) => (
              <TableCell className={cellIndex != 0 ? "data-cell" : undefined} key={cellIndex}>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
    </>
  );
}

interface TableProps {
  data: TableData;
  ariaLabel: string;
}

function Table(props: TableProps) {
  return (
    <TableContainer className="table-container">
      <MuiTable aria-label={props.ariaLabel}>
        <TableHead>
          <TableRow>
            {props.data.rows.some((row) => row.collapsableRows !== null) && (
              <TableCell key={props.data.headers.length + 1} aria-label="collapse/expand buttons">
                {""}
              </TableCell>
            )}
            {props.data.headers.map((header, headerIndex) => (
              <TableCell key={headerIndex}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.rows.map((row, rowIndex) => {
            if (row.collapsableRows === null) {
              return (
                <TableRow key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              );
            } else {
              return <CollapsableRow key={rowIndex} row={row} />;
            }
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;
