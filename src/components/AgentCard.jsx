import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const baseCardStyle = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "28px",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
  boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
  transition: "all 0.35s ease",
};

export default function AgentCard({ agent }) {
  const glow = agent.color;

  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          sm: "300px",
          md: "320px",
        },
        ...baseCardStyle,
        border: `1px solid ${glow}25`,

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(
              circle at top left,
              ${glow}22,
              transparent 45%
            )
          `,
          pointerEvents: "none",
        },

        "&:hover": {
          transform: "translateY(-10px)",
          border: `1px solid ${glow}50`,
          boxShadow: `0 12px 40px ${glow}35`,
        },
      }}
    >
      <CardContent
        sx={{
          p: 4,
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        {/* ICON */}
        <Box
          sx={{
            width: 84,
            height: 84,
            mx: "auto",
            mb: 3,
            borderRadius: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `${glow}15`,
            border: `1px solid ${glow}35`,
            boxShadow: `0 0 30px ${glow}25`,
            fontSize: "2.5rem",
          }}
        >
          {agent.icon}
        </Box>

        {/* NAME */}
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: 800,
            color: "#fff",
            mb: 1,
            textShadow: `0 0 18px ${glow}50`,
          }}
        >
          {agent.name}
        </Typography>

        {/* ROLE */}
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "#fff",
            mb: 2,
          }}
        >
          {agent.role}
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          sx={{
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.8,
            fontSize: "0.95rem",
          }}
        >
          {agent.description}
        </Typography>
      </CardContent>
    </Card>
  );
}