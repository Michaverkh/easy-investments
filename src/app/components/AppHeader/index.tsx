import { Box, Typography, Divider } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { RoterPath } from "../../../shared/router/enums";

export const AppHeader: FC = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          height: "min-content",
        }}
      >
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: "30px",
          }}
        ></Box> */}
        <Typography variant="h2">Easy Investments</Typography>
      </Box>
      <Divider />
    </>
  );
};
