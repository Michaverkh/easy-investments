import { Box } from "@mui/material";
import React, { FC } from "react";
import { LIGHT1 } from "../../themes/colors";
import PaidIcon from "@mui/icons-material/Paid";
import CalculateIcon from "@mui/icons-material/Calculate";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { RouterPath } from "../../../shared/router/enums";
import { Link } from "react-router-dom";

const menu = {
  marginBottom: "100px",
};

const menuItem = {
  width: "30px",
  height: "30px",
};

const sideBar = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "82px",
  position: "fixed",
  padding: "16px",
};

const logo = {
  width: "50px",
  height: "50px",
  backgroundColor: LIGHT1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  marginBottom: "100px",
};

export const SideBar: FC = () => {
  return (
    <Box sx={sideBar}>
      <Box sx={logo}>
        <PaidIcon
          sx={{
            width: "40px",
            height: "40px",
          }}
        />
      </Box>
      <Box sx={menu}>
        <Link to={RouterPath.PORTFOLIO} title="Portfolio">
          <Box>
            <LocalMallIcon
              fontSize="large"
              sx={{
                fill: LIGHT1,
              }}
            />
          </Box>
        </Link>
        <Link to={RouterPath.CALCULATOR} title="Calculator">
          <Box>
            <CalculateIcon
              fontSize="large"
              sx={{
                fill: LIGHT1,
              }}
            />
          </Box>
        </Link>
      </Box>
      <Box>
        <LogoutIcon
          sx={{
            fill: LIGHT1,
          }}
        />
      </Box>
    </Box>
  );
};
