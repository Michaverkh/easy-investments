import { Box, Button } from "@mui/material";
import React, { FC } from "react";
import { DARK1, LIGHT1 } from "../../themes/colors";
import PaidIcon from "@mui/icons-material/Paid";
import CalculateIcon from "@mui/icons-material/Calculate";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { RouterPath } from "../../../shared/router/enums";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useStore from "../../../shared/hooks/useStore";
import { observer } from "mobx-react-lite";

const styles = {
  menu: {
    marginBottom: "100px",
  },
  menuItem: {
    width: "30px",
    height: "30px",
  },
  sideBar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "82px",
    height: "100vh",
    padding: "16px",
    position: "fixed",
    backgroundColor: DARK1,
  },
  logo: {
    width: "50px",
    height: "50px",
    backgroundColor: LIGHT1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    marginBottom: "100px",
  },
};

const { menu, menuItem, sideBar, logo } = styles;

const SideBarComponent: FC = () => {
  const { userStore } = useStore();
  const { isAuth, logout } = userStore;

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

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
      {isAuth && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: LIGHT1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
              marginBottom: "16px",
            }}
          >
            <AccountCircleIcon fontSize="large" />
          </Box>
          <Button variant="text" onClick={handleLogout}>
            <LogoutIcon
              sx={{
                fill: LIGHT1,
              }}
            />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export const SideBar = observer(SideBarComponent);
