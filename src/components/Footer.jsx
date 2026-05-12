import React from "react";
import { Box, Typography, Link } from "@mui/material";

/* ---------------- STYLES ---------------- */

const containerSx = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  py: 6,
  m: 1,
  position: "relative",
  zIndex: 2,
};

const cardSx = {
  position: "relative",
  px: 4,
  py: 2,
  borderRadius: "999px",
  background: `
    linear-gradient(
      135deg,
      rgba(255,255,255,0.06),
      rgba(255,255,255,0.02)
    )
  `,
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: `
    0 8px 32px rgba(0,0,0,0.25),
    0 0 30px rgba(127,90,240,0.08)
  `,
  overflow: "hidden",
};

const glowSx = {
  position: "absolute",
  top: -30,
  left: "50%",
  transform: "translateX(-50%)",
  width: 120,
  height: 120,
  borderRadius: "50%",
  background:
    "radial-gradient(circle, rgba(127,90,240,0.22), transparent 70%)",
  filter: "blur(20px)",
};

const textSx = {
  position: "relative",
  zIndex: 2,
  color: "rgba(255,255,255,0.75)",
  fontSize: "0.95rem",
  letterSpacing: "0.02em",
  display: "flex",
  alignItems: "center",
  gap: 1,
  flexWrap: "wrap",
  justifyContent: "center",
};

const linkSx = {
  color: "#00C2FF",
  fontWeight: 700,
  fontFamily: "inherit",
  fontSize: "inherit",
  position: "relative",
  transition: "all 0.3s ease",

  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: -2,
    width: "100%",
    height: "1px",
    background: "linear-gradient(90deg, #00C2FF, #B388FF)",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.3s ease",
  },

  "&:hover": {
    color: "#B388FF",
    textShadow: "0 0 12px rgba(179,136,255,0.7)",
  },

  "&:hover::after": {
    transform: "scaleX(1)",
  },
};

/* ---------------- COMPONENT ---------------- */

export default function Footer() {
  return (
    <Box component="footer" sx={containerSx}>
      <Box sx={cardSx}>
        {/* glow */}
        <Box sx={glowSx} />

        {/* content */}
        <Typography sx={textSx}>
          <Box component="span">✨</Box>

          <Box component="span">
            Crafted in the Learniverse by
          </Box>

          <Link
            href="https://linkedin.com/in/c-akanksha"
            target="_blank"
            underline="none"
            sx={linkSx}
          >
            Akanksha
          </Link>

          <Box component="span">🌌</Box>
        </Typography>
      </Box>
    </Box>
  );
}