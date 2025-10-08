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

import CalculateIcon from "@mui/icons-material/Calculate";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import QuizIcon from "@mui/icons-material/Quiz";
import Button from "@mui/material/Button";
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./TIMAppBar.scss";

type Props = {
  variant: "background-image" | "background-none";
};

type DrawerProps = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

const pages = [
  { link: "/", text: "Home", icon: <HomeIcon /> },
  { link: "/about-tim", text: "About", icon: <InfoIcon /> },
  { link: "/governance", text: "Governance", icon: <InfoIcon /> },
  { link: "/lookup/route", text: "Emissions Calculator", icon: <CalculateIcon /> },
  { link: "/faq", text: "FAQ", icon: <QuizIcon /> },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

function MenuDrawer({ selectedIndex, setSelectedIndex }: DrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: { xs: "flex", sm: "none" }, justifyContent: "flex-end", flexGrow: 1 }}>
      <IconButton
        size="large"
        edge="start"
        color="primary"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Box>
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <DrawerHeader>
            <IconButton
              aria-label="close menu"
              onClick={() => setOpen(false)}
              sx={{ margin: "12px 8px" }}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          <Divider aria-hidden="true" />
          <List>
            {pages.map((page, index) => {
              return (
                <ListItemButton
                  href={page.link}
                  sx={{ paddingRight: "24px" }}
                  key={index}
                  selected={selectedIndex === index}
                  aria-current={selectedIndex === index ? "page" : undefined}
                  onClick={() => setSelectedIndex(index)}>
                  <ListItemIcon sx={{ minWidth: "46px" }}>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.text} />
                </ListItemButton>
              );
            })}
          </List>
        </Drawer>
      </Box>
    </Box>
  );
}

function TIMAppBar({ variant }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    // Try to find an exact match first.
    const exactMatchIndex = pages.findIndex((page) => currentPath === page.link);
    if (exactMatchIndex !== -1) {
      setSelectedIndex(exactMatchIndex);
    }
    // If there's no exact match, we find the first match by prefix.
    const partialMatchIndex = pages.findIndex(
      (page) => page.link !== "/" && currentPath.startsWith(page.link)
    );
    setSelectedIndex(partialMatchIndex !== -1 ? partialMatchIndex : 0);
  }, [location.pathname]);

  return (
    <AppBar
      color="primary"
      position="sticky"
      sx={{
        backgroundColor: variant === "background-image" ? "rgba(255, 255, 255, 0.8)" : "#FFFFFF",
        boxShadow: "none",
      }}>
      <Toolbar>
        <IconButton href="/">
          <Typography variant="h6" component="div" color="text.primary">
            TIM
          </Typography>
        </IconButton>
        <Box sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "flex-end", flexGrow: 1 }}>
          {pages.map((page, index) => (
            <Button
              className="appbar-link"
              key={page.text}
              href={page.link}
              sx={{ color: "text.primary" }}
              aria-current={selectedIndex === index ? "page" : undefined}
              onClick={() => setSelectedIndex(index)}>
              {page.text}
            </Button>
          ))}
        </Box>
        <MenuDrawer selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      </Toolbar>
    </AppBar>
  );
}

export default TIMAppBar;
