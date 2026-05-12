import React from "react";
import { Box, Typography } from "@mui/material";

const DEFAULT_TITLE = "Loading...";
const DEFAULT_SUBTITLE = "Please wait a moment";

export default function Loader({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
}) {
  return (
    <LoaderContainer>
      <LoaderText title={title} subtitle={subtitle} />
    </LoaderContainer>
  );
}

function LoaderContainer({ children }) {
  return (
    <Box
      sx={{
        color: "white",
        textAlign: "center",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      {children}
    </Box>
  );
}

function LoaderText({ title, subtitle }) {
  return (
    <>
      <Typography variant="h3">{title}</Typography>

      <Typography variant="body1" sx={{ opacity: 0.75 }}>
        {subtitle}
      </Typography>
    </>
  );
}