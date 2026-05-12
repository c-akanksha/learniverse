import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

export default function InsightCard({ title, items, color }) {
  return (
    <Card
      sx={{
        borderRadius: "24px",
        color: "white",
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(145deg, rgba(16,22,48,0.96), rgba(8,12,28,0.92))",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography sx={{ mb: 2, fontWeight: 700, color }}>
          {title}
        </Typography>

        {items.map((item, i) => (
          <Box
            key={i}
            sx={{ display: "flex", gap: 1.2, mb: 1.5 }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                mt: "9px",
                borderRadius: "50%",
                background: color,
              }}
            />
            <Typography sx={{ opacity: 0.8, lineHeight: 1.7 }}>
              {item}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}