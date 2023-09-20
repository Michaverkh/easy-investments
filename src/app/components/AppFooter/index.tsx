import { Box, Typography, Divider } from "@mui/material";
import React, { FC } from "react";

export const AppFooter: FC = () => {
  return (
    <>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Typography variant="h2">Footer</Typography>
      </Box>
    </>
  );
};
