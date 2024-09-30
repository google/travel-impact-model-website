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
  Divider,
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
  collapsibleRows: RowData[] | null;
}

export interface TableData {
  headers: string[];
  rows: RowData[];
}

interface CollapsibleRowProps {
  row: RowData;
}

export function CollapsibleRow({ row }: CollapsibleRowProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {/* Create row with the arrow icon that when clicked will collapse/uncollapse the rows below */}
      <TableRow className="row-with-subrows">
        <TableCell className="row-with-subrows-icon-cell" align="center">
          <IconButton
            aria-label={open ? "Hide more rows" : "Show more rows"}
            aria-pressed={open}
            onClick={() => setOpen(!open)}>
            {open ? (
              <KeyboardArrowUp className="row-with-subrows-icon" />
            ) : (
              <KeyboardArrowDown className="row-with-subrows-icon" />
            )}
          </IconButton>
        </TableCell>
        {row.cells.map((cell, cellIndex) => (
          <TableCell
            className={
              cellIndex === 0 ? "row-with-subrows-name-cell" : "row-with-subrows-data-cell"
            }
            key={cellIndex}>
            {cell}
          </TableCell>
        ))}
      </TableRow>
      {/* Create collapsible rows */}
      {row.collapsibleRows !== null &&
        row.collapsibleRows.map((rowc, rowcIndex) => (
          <TableRow
            className="subrow"
            key={rowcIndex}
            sx={{ display: open ? "table-row" : "none" }}
            aria-hidden={!open}>
            <TableCell className="subrow-icon-cell">
              <div className="subrow-divider">
                <Divider orientation="vertical" />
              </div>
            </TableCell>
            {rowc.cells.map((cell, cellIndex) => (
              <TableCell
                className={cellIndex === 0 ? "subrow-name-cell" : "subrow-data-cell"}
                key={cellIndex}>
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
            {props.data.rows.some((row) => row.collapsibleRows !== null) && (
              <TableCell key={props.data.headers.length + 1}></TableCell>
            )}
            {props.data.headers.map((header, headerIndex) => (
              <TableCell key={headerIndex}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.rows.map((row, rowIndex) => {
            if (row.collapsibleRows === null) {
              return (
                <TableRow key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              );
            } else {
              return <CollapsibleRow key={rowIndex} row={row} />;
            }
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;
