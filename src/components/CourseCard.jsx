import React, { useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";

const CHIP_BASE = {
  maxWidth: "100%",
  "& .MuiChip-label": {
    px: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};

const getChipStyles = (bg, color, border) => ({
  ...CHIP_BASE,
  bgcolor: bg,
  color,
  border: `1px solid ${border}`,
});

export default function CourseCard({
  module,
  index,
  handleComplete,
  handleOpenFeedback,
  score,
}) {
  const completed = module?.completed;
  const hasQuiz = module?.quiz;

  const scoreChip = useMemo(() => {
    if (score == null) return null;

    const good = score >= 7;

    return (
      <Chip
        size="small"
        label={`Score: ${score}/10`}
        sx={getChipStyles(
          good ? "rgba(0,255,157,0.12)" : "rgba(255,80,80,0.12)",
          good ? "#00ff9d" : "#ff7676",
          "rgba(255,255,255,0.14)"
        )}
      />
    );
  }, [score]);

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "25px",
        width: "100%",
        background:
          "linear-gradient(145deg, rgba(16,22,48,0.96), rgba(8,12,28,0.92))",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(24px)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: { xs: "none", sm: "translateY(-3px)" },
          boxShadow:
            "0 10px 35px rgba(127,90,240,0.18), 0 0 40px rgba(0,194,255,0.06)",
        },
      }}
    >
      {/* glow */}
      <Box
        sx={{
          position: "absolute",
          top: -60,
          right: -40,
          width: { xs: 120, sm: 180 },
          height: { xs: 120, sm: 180 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(127,90,240,0.18), transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <CardContent
        sx={{
          position: "relative",
          zIndex: 2,
          p: { xs: 2, sm: 3 },
          "&:last-child": { pb: { xs: 2, sm: 3 } },
        }}
      >
        <Box sx={{ display: "flex", gap: { xs: 1.5, sm: 2.5 } }}>
          {/* status */}
          <Box
            sx={{
              width: { xs: 28, sm: 34 },
              height: { xs: 28, sm: 34 },
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 0.5,
              flexShrink: 0,
              border: completed
                ? "2px solid #00ff9d"
                : "2px solid rgba(255,255,255,0.16)",
              background: completed
                ? "rgba(0,255,157,0.12)"
                : "rgba(255,255,255,0.04)",
            }}
          >
            {completed && (
              <CheckCircleRoundedIcon sx={{ color: "#00ff9d", fontSize: 18 }} />
            )}
          </Box>

          {/* content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                gap: 2,
                mb: 1.5,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "#00C2FF",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    mb: 0.7,
                  }}
                >
                  Module {index + 1}
                </Typography>

                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 800,
                    lineHeight: 1.3,
                    fontSize: { xs: 16, sm: 22 },
                  }}
                >
                  {module?.title}
                </Typography>
              </Box>

              {!completed && (
                <Button
                  variant="contained"
                  startIcon={<CheckCircleRoundedIcon />}
                  onClick={() => handleComplete(module)}
                  sx={{
                    borderRadius: 2,
                    px: 2.5,
                    py: 1,
                    textTransform: "none",
                    fontWeight: 600,
                    background:
                      "linear-gradient(135deg,#5B3FD1,#7F5AF0)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Mark Complete
                </Button>
              )}
            </Box>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.8,
                mb: 2,
                fontSize: { xs: 14, sm: 16 },
              }}
            >
              {module?.description}
            </Typography>

            <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 1 }}>
              <Chip
                size="small"
                icon={<AccessTimeRoundedIcon />}
                label={module?.estimated_time}
                sx={getChipStyles(
                  "rgba(0,194,255,0.12)",
                  "#8fe7ff",
                  "rgba(0,194,255,0.22)"
                )}
              />

              <Chip
                size="small"
                icon={<SchoolRoundedIcon />}
                label="Resource"
                component="a"
                href={module?.reference}
                target="_blank"
                rel="noopener noreferrer"
                clickable
                sx={getChipStyles(
                  "rgba(127,90,240,0.12)",
                  "#d5c5ff",
                  "rgba(127,90,240,0.22)"
                )}
              />

              {completed && (
                <Chip
                  size="small"
                  icon={<CheckCircleRoundedIcon />}
                  label="Completed"
                  sx={getChipStyles(
                    "rgba(0,255,157,0.12)",
                    "#8dffcb",
                    "rgba(0,255,157,0.22)"
                  )}
                />
              )}

              {scoreChip}

              {hasQuiz && (
                <Chip
                  size="small"
                  clickable
                  onClick={() => handleOpenFeedback(module)}
                  icon={<InsightsRoundedIcon />}
                  label="Feedback"
                  sx={getChipStyles(
                    "rgba(255,255,255,0.06)",
                    "white",
                    "rgba(255,255,255,0.12)"
                  )}
                />
              )}
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}