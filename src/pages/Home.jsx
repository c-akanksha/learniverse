import React, { useMemo, useState } from "react";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import InsightsIcon from "@mui/icons-material/Insights";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

import { agents, features } from "../utils/data";

import FeatureCard from "../components/FeatureCard";
import AgentCard from "../components/AgentCard";
import AuthModal from "../components/AuthModal";

const iconStyles = {
  fontSize: 28,
};

const featureIcons = {
  school: (
    <SchoolIcon
      sx={{
        ...iconStyles,
        color: "#7F5AF0",
      }}
    />
  ),

  psychological: (
    <PsychologyIcon
      sx={{
        ...iconStyles,
        color: "#00C2FF",
      }}
    />
  ),

  insights: (
    <InsightsIcon
      sx={{
        ...iconStyles,
        color: "#2CB67D",
      }}
    />
  ),

  trackChanges: (
    <TrackChangesIcon
      sx={{
        ...iconStyles,
        color: "#FF7AC6",
      }}
    />
  ),

  tips: (
    <TipsAndUpdatesIcon
      sx={{
        ...iconStyles,
        color: "#FFD166",
      }}
    />
  ),
};

const sectionContainerStyles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 3,
};

const ctaButtonStyles = {
  m: 5,
  px: 5,
  py: 1.6,
  borderRadius: "18px",
  color: "white",
  fontSize: "1rem",
  fontWeight: 700,
  textTransform: "none",
  letterSpacing: "0.03em",
  transition: "all 0.3s ease",

  background: `
    linear-gradient(
      135deg,
      #7F5AF0 0%,
      #00C2FF 100%
    )
  `,

  boxShadow:
    "0 0 30px rgba(127,90,240,0.45)",

  "&:hover": {
    transform: "translateY(-4px)",

    boxShadow:
      "0 12px 40px rgba(0,194,255,0.45)",

    background: `
      linear-gradient(
        135deg,
        #8B6CFF 0%,
        #33D6FF 100%
      )
    `,
  },
};

export default function Home() {
  const [openAuthModal, setOpenAuthModal] =
    useState(false);

  const enhancedFeatures = useMemo(
    () =>
      features.map((feature) => ({
        ...feature,
        icon: featureIcons[feature.icon],
      })),
    []
  );

  return (
    <Box
      sx={{
        p: 2,
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            color: "white",
            fontWeight: 800,

            fontSize: {
              xs: "2.4rem",
              md: "4rem",
            },
          }}
        >
          Welcome to Learniverse ✨
        </Typography>

        <Typography
          sx={{
            mx: "auto",
            maxWidth: "760px",
            lineHeight: 1.8,
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Your AI-powered learning companion.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() =>
            setOpenAuthModal(true)
          }
          sx={ctaButtonStyles}
        >
          ✨ Start Learning
        </Button>
      </Box>

      <Box sx={sectionContainerStyles}>
        {enhancedFeatures.map(
          (feature, index) => (
            <Box
              key={feature.title || index}
              sx={{
                width: {
                  xs: "100%",
                  sm: "280px",
                  md: "250px",
                },
              }}
            >
              <FeatureCard
                feature={feature}
              />
            </Box>
          )
        )}
      </Box>

      <Box
        sx={{
          m: 2,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          align="center"
          sx={{
            mb: 2,
            color: "#FFFFFF",
            fontWeight: 800,
            letterSpacing: "-0.03em",

            fontSize: {
              xs: "2rem",
              md: "3.2rem",
            },
          }}
        >
          Meet Your AI Learning Team ✨
        </Typography>

        <Typography
          align="center"
          sx={{
            mx: "auto",
            mb: 7,
            maxWidth: "760px",
            lineHeight: 1.8,
            fontSize: "1rem",
            color:
              "rgba(255,255,255,0.82)",
          }}
        >
          Specialized AI agents collaborating
          together to personalize your learning
          journey, generate adaptive courses,
          evaluate your understanding, and guide
          your growth with intelligent feedback.
        </Typography>

        <Box sx={sectionContainerStyles}>
          {agents.map((agent, index) => (
            <AgentCard
              key={agent.title || index}
              agent={agent}
              index={index}
            />
          ))}
        </Box>
      </Box>

      <AuthModal
        open={openAuthModal}
        onClose={() =>
          setOpenAuthModal(false)
        }
      />
    </Box>
  );
}