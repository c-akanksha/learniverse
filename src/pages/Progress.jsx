import React, { useMemo } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import { useNavigate, useParams } from "react-router-dom";

import { useProgress } from "../utils/queries";
import Loader from "../components/Loader";

import ProgressCard from "../components/ProgressCard";
import InsightCard from "../components/InsightCard";

const cardBaseStyles = {
  borderRadius: "24px",
  color: "white",
  border: "1px solid rgba(255,255,255,0.08)",
  background: `
    linear-gradient(
      145deg,
      rgba(16,22,48,0.96),
      rgba(8,12,28,0.92)
    )
  `,
};

export default function Progress() {
  const { learnerId, courseId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useProgress(learnerId, courseId);

  const analysis = data?.progress_analysis || {};
  const completion = data?.completion_percentage || 0;

  const level = useMemo(() => {
    if (completion >= 70) return "Advanced";
    if (completion >= 40) return "Growing";
    return "Beginner";
  }, [completion]);

  const overview = [
    {
      title: "Completion",
      value: `${completion}%`,
      icon: <TrendingUpRoundedIcon />,
      glow: "#00C2FF",
    },
    {
      title: "Modules Done",
      value: `${data?.completed_modules}/${data?.total_modules}`,
      icon: <CheckCircleRoundedIcon />,
      glow: "#00ff9d",
    },
    {
      title: "Average Score",
      value: `${data?.average_score}/10`,
      icon: <StarRoundedIcon />,
      glow: "#FFD166",
    },
    {
      title: "Learning Level",
      value: level,
      icon: <PsychologyRoundedIcon />,
      glow: "#B388FF",
    },
  ];

  const insights = [
    {
      title: "🌟 Strengths",
      color: "#00ff9d",
      items: analysis?.strengths || [],
    },
    {
      title: "⚡ Weak Areas",
      color: "#ff8a8a",
      items: analysis?.weak_areas || [],
    },
    {
      title: "📈 Improvement Trends",
      color: "#FFD166",
      items: analysis?.improvement_trends || [],
    },
    {
      title: "🚀 Next Learning",
      color: "#8fe7ff",
      items: analysis?.next_learning_recommendations || [],
    },
  ];

  if (isLoading) {
    return (
      <Box sx={{ minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader
          title="Analyzing Your Progress 📈"
          subtitle="Generating insights, strengths, trends, and learning recommendations..."
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        color: "white",
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 5 },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 5,
        }}
      >
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: "2rem", md: "3rem" } }}>
            Learning Progress ✨
          </Typography>

          <Typography sx={{ mt: 1, opacity: 0.7 }}>
            Your AI-powered growth journey
          </Typography>
        </Box>

        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate(`/course/${learnerId}/${courseId}`)}
          sx={{
            color: "white",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "14px",
            px: 2.5,
            py: 1,
            textTransform: "none",
          }}
        >
          Back to Course
        </Button>
      </Box>

      {/* OVERVIEW */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", lg: "repeat(4,1fr)" },
          gap: 3,
          mb: 5,
        }}
      >
        {overview.map((item) => (
          <ProgressCard key={item.title} {...item} />
        ))}
      </Box>

      {/* JOURNEY */}
      <Card sx={{ ...cardBaseStyles, mb: 5, borderRadius: "28px" }}>
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Overall Journey
            </Typography>

            <Chip
              label={`${completion}%`}
              sx={{
                bgcolor: "rgba(0,194,255,0.12)",
                color: "#8fe7ff",
                border: "1px solid rgba(0,194,255,0.25)",
                fontWeight: 700,
              }}
            />
          </Stack>

          <LinearProgress
            variant="determinate"
            value={completion}
            sx={{
              height: 12,
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg,#7F5AF0,#00C2FF)",
              },
            }}
          />

          <Typography sx={{ mt: 2, opacity: 0.7, lineHeight: 1.8 }}>
            {analysis?.learner_summary}
          </Typography>
        </CardContent>
      </Card>

      {/* INSIGHTS */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: 3,
        }}
      >
        {insights.map((item) => (
          <InsightCard key={item.title} {...item} />
        ))}
      </Box>

      {/* MOTIVATION */}
      <Card
        sx={{
          ...cardBaseStyles,
          mt: 4,
          borderRadius: "28px",
          background:
            "linear-gradient(135deg, rgba(127,90,240,0.16), rgba(0,194,255,0.12))",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <AutoAwesomeRoundedIcon sx={{ color: "#FFD166" }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Motivation From Learniverse
            </Typography>
          </Stack>

          <Typography sx={{ opacity: 0.9, lineHeight: 1.9 }}>
            {analysis?.motivation_feedback}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}