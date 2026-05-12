import React, { useMemo } from "react";
import { Box } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { keyframes } from "@mui/system";
import Footer from "./Footer";

/* ---------------- ANIMATIONS ---------------- */

const rotateUniverse = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulseGlow = keyframes`
  0% { opacity: 0.6; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.6; transform: scale(0.95); }
`;

const floatingStars = keyframes`
  0% { transform: translateY(0px); opacity: 0.4; }
  50% { transform: translateY(-8px); opacity: 1; }
  100% { transform: translateY(0px); opacity: 0.4; }
`;

/* ---------------- STYLES ---------------- */

const rootSx = {
  minHeight: "100vh",
  width: "100%",
  bgcolor: "#070B1A",
  position: "relative",
  overflow: "hidden",
};

const glowSx = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  borderRadius: "50%",
  background:
    "radial-gradient(circle, rgba(100,149,237,0.18) 0%, rgba(0,0,0,0) 70%)",
  filter: "blur(20px)",
  animation: `${pulseGlow} 5s ease-in-out infinite`,
  zIndex: 0,
  pointerEvents: "none",
};

const orbitSx = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 180,
  height: 180,
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.08)",
  animation: `${rotateUniverse} 12s linear infinite`,
  zIndex: 0,
  pointerEvents: "none",
};

const centerStarSx = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 0,
  animation: `${pulseGlow} 2s ease-in-out infinite`,
  pointerEvents: "none",
};

/* ---------------- COMPONENT ---------------- */

export default function Layout({ children }) {
  // Generate stable stars ONLY once
  const stars = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 10 + Math.random() * 12,
      duration: 2 + Math.random() * 3,
      color: i % 2 === 0 ? "#00C2FF" : "#7F5AF0",
    }));
  }, []);

  return (
    <Box sx={rootSx}>
      {/* BACKGROUND GLOW */}
      <Box sx={glowSx} />

      {/* ORBIT */}
      <Box sx={orbitSx}>
        <Box
          sx={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #7F5AF0, #2CB67D, #00C2FF)",
            position: "absolute",
            top: -8,
            left: "50%",
            transform: "translateX(-50%)",
            boxShadow: "0 0 20px #00C2FF",
          }}
        />
      </Box>

      {/* CENTER ICON */}
      <Box sx={centerStarSx}>
        <AutoAwesomeIcon
          sx={{
            fontSize: 80,
            color: "#B388FF",
            filter: "drop-shadow(0px 0px 18px #7F5AF0)",
          }}
        />
      </Box>

      {/* FLOATING STARS */}
      {stars.map((star) => (
        <Box
          key={star.id}
          sx={{
            position: "fixed",
            top: star.top,
            left: star.left,
            animation: `${floatingStars} ${star.duration}s ease-in-out infinite`,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <AutoAwesomeIcon
            sx={{
              fontSize: star.size,
              color: star.color,
              opacity: 0.8,
            }}
          />
        </Box>
      ))}

      {/* CONTENT */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}