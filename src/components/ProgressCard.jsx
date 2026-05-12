import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

export default function ProgressCard({ title, value, icon, glow }) {
  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        color: "white",
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(145deg, rgba(16,22,48,0.96), rgba(8,12,28,0.92))",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glow}30, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      <CardContent sx={{ position: "relative", zIndex: 2, p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{ opacity: 0.7 }}>{title}</Typography>
          <Box sx={{ color: glow }}>{icon}</Box>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}