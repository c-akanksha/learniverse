import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const BASE_CARD_STYLE = {
  height: "100%",
  position: "relative",
  overflow: "hidden",
  borderRadius: "28px",
  color: "white",
  transition: "all 0.35s ease",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.03)",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top left, rgba(0,217,255,0.12), transparent 40%), radial-gradient(circle at bottom right, rgba(185,104,255,0.12), transparent 40%)",
    pointerEvents: "none",
  },
  "&:hover": {
    transform: "translateY(-10px) scale(1.02)",
    border: "1px solid rgba(185,104,255,0.25)",
    boxShadow:
      "0 12px 45px rgba(185,104,255,0.28), 0 0 25px rgba(0,217,255,0.18)",
  },
};

export default function FeatureCard({ feature }) {
  return (
    <Card sx={BASE_CARD_STYLE}>
      <CardContent
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          p: 4,
        }}
      >
        {/* ICON WRAPPER */}
        <Box
          sx={{
            width: 82,
            height: 82,
            mx: "auto",
            mb: 3,
            borderRadius: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, rgba(0,217,255,0.18), rgba(185,104,255,0.18))",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 25px rgba(0,217,255,0.18)",
          }}
        >
          <Box
            sx={{
              color: "#00d9ff",
              display: "flex",
              "& svg": {
                fontSize: 42,
                filter: "drop-shadow(0 0 10px rgba(0,217,255,0.6))",
              },
            }}
          >
            {feature.icon}
          </Box>
        </Box>

        {/* TITLE */}
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 700,
            wordBreak: "break-word",
          }}
        >
          {feature.title}
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          sx={{
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.8,
            fontSize: "0.98rem",
          }}
        >
          {feature.description}
        </Typography>
      </CardContent>
    </Card>
  );
}