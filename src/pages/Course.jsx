import React, { useMemo, useState, useCallback } from "react";
import { Box, Button, Typography } from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { useNavigate, useParams } from "react-router-dom";

import {
  useFetchCourse,
  useGenerateQuiz,
  useGenerateFeedback,
} from "../utils/queries";

import CourseCard from "../components/CourseCard";
import QuestionModal from "../components/QuestionModal";
import FeedbackModal from "../components/FeedbackModal";
import Loader from "../components/Loader";

const containerStyles = {
  width: "100%",
  maxWidth: "1100px",
  mx: "auto",
  overflowX: "hidden",
  color: "white",
  px: {
    xs: 1.5,
    sm: 2.5,
    md: 4,
  },
  py: {
    xs: 2,
    sm: 4,
  },
};

const buttonStyles = {
  borderRadius: "14px",
  textTransform: "none",
};

export default function Course() {
  const { learnerId, courseId } = useParams();

  const navigate = useNavigate();

  const { data: course, isLoading, refetch } = useFetchCourse(
    learnerId,
    courseId
  );

  const generateQuiz = useGenerateQuiz();
  const generateFeedback = useGenerateFeedback();

  const [loading, setLoading] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);

  const [openQuestions, setOpenQuestions] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);

  const modules = useMemo(() => course?.modules ?? [], [course]);

  const selectedFeedback = useMemo(
    () =>
      modules.find(
        ({ module_number }) =>
          module_number === selectedModule?.module_number
      )?.quiz?.evaluation ?? {},
    [modules, selectedModule]
  );

  const completedModules = useMemo(
    () => modules.filter(({ quiz }) => quiz).length,
    [modules]
  );

  const progress = useMemo(() => {
    if (!modules.length) {
      return 0;
    }

    return Math.round((completedModules / modules.length) * 100);
  }, [completedModules, modules]);

  const loaderConfig = useMemo(() => {
    if (generateQuiz.isPending) {
      return {
        title: "Generating Quiz 🧠",
        subtitle:
          "Creating adaptive AI questions for your module...",
      };
    }

    if (generateFeedback.isPending) {
      return {
        title: "Evaluating Your Answers ✨",
        subtitle:
          "Analyzing your responses and building personalized feedback...",
      };
    }

    return {
      title: "Loading Course 🚀",
      subtitle:
        "Preparing your personalized learning experience...",
    };
  }, [generateQuiz.isPending, generateFeedback.isPending]);

  const handleComplete = useCallback(
    async (module) => {
      try {
        setLoading(true);

        const response = await generateQuiz.mutateAsync({
          learner_id: learnerId,
          course_id: courseId,
          module_title: module.title,
          skill_name: course?.course_title,
        });

        setQuestions(response?.data?.questions ?? []);
        setSelectedModule(module);
        setAnswers({});
        setIndex(0);
        setOpenQuestions(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [
      learnerId,
      courseId,
      course?.course_title,
      generateQuiz,
    ]
  );

  const handleFeedback = useCallback(
    async (payload) => {
      if (!selectedModule) {
        return;
      }

      try {
        setLoading(true);

        await generateFeedback.mutateAsync({
          learner_id: learnerId,
          course_id: courseId,
          module_title: selectedModule.title,
          qa_pairs: payload,
        });

        setOpenQuestions(false);
        refetch();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [
      learnerId,
      courseId,
      selectedModule,
      generateFeedback,
      refetch,
    ]
  );

  const handleSignout = useCallback(() => {
    localStorage.removeItem("learnerId");

    window.dispatchEvent(new Event("auth-change"));

    navigate("/");
  }, [navigate]);

  const handleOpenFeedback = useCallback((module) => {
    setSelectedModule(module);
    setOpenFeedback(true);
  }, []);

  if (isLoading || loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          width: "100%",
        }}
      >
        <Loader
          title={loaderConfig.title}
          subtitle={loaderConfig.subtitle}
        />
      </Box>
    );
  }

  return (
    <Box sx={containerStyles}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
          gap: 2,
          mb: {
            xs: 3,
            sm: 5,
          },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() =>
              navigate(`/courses/${learnerId}`)
            }
            sx={{
              ...buttonStyles,
              mb: 2,
              alignSelf: "flex-start",
              color: "rgba(255,255,255,0.82)",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",

              "&:hover": {
                background: "rgba(255,255,255,0.08)",
              },
            }}
          >
            Back to Courses
          </Button>

          <Typography
            sx={{
              fontWeight: 800,
              lineHeight: 1.1,
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
              },
            }}
          >
            Welcome to Learniverse ✨
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "rgba(255,255,255,0.68)",
              fontSize: {
                xs: "0.95rem",
                sm: "1rem",
              },
            }}
          >
            Continue your adaptive AI learning journey.
          </Typography>
        </Box>

        <Button
          onClick={handleSignout}
          startIcon={<LogoutRoundedIcon />}
          sx={{
            ...buttonStyles,
            color: "white",
            px: 3,
            py: 1.2,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            alignSelf: {
              xs: "stretch",
              sm: "center",
            },
            minWidth: {
              xs: "100%",
              sm: "auto",
            },

            "&:hover": {
              background: "rgba(255,255,255,0.08)",
            },
          }}
        >
          Sign Out
        </Button>
      </Box>

      {!modules.length && (
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
            No modules found.
          </Typography>
        </Box>
      )}

      {!!modules.length && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              alignItems: {
                xs: "stretch",
                md: "center",
              },
              gap: 2,
              mb: 4,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: "white",
                  fontSize: {
                    xs: "1.8rem",
                    sm: "2.3rem",
                  },
                }}
              >
                {course?.course_title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                  mt: 1.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 1.5,
                    py: 0.8,
                    borderRadius: "999px",
                    background: "rgba(127,90,240,0.12)",
                    border:
                      "1px solid rgba(127,90,240,0.22)",
                  }}
                >
                  <TrendingUpRoundedIcon
                    sx={{
                      fontSize: 18,
                      color: "#c8b7ff",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#e3dbff",
                    }}
                  >
                    Progress: {completedModules}/{modules.length} Modules
                  </Typography>
                </Box>

                <Box
                  sx={{
                    px: 1.3,
                    py: 0.8,
                    borderRadius: "999px",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    background:
                      progress >= 70
                        ? "rgba(0,255,157,0.12)"
                        : "rgba(0,194,255,0.12)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color:
                        progress >= 70
                          ? "#8dffcb"
                          : "#8fe7ff",
                    }}
                  >
                    {progress}% Complete
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Button
              startIcon={<InsightsRoundedIcon />}
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() =>
                navigate(
                  `/progress/${learnerId}/${courseId}`
                )
              }
              sx={{
                ...buttonStyles,
                px: 2.5,
                py: 1.2,
                fontWeight: 700,
                color: "white",
                alignSelf: {
                  xs: "stretch",
                  md: "center",
                },
                border:
                  "1px solid rgba(255,255,255,0.08)",
                background: `
                  linear-gradient(
                    135deg,
                    rgba(127,90,240,0.18),
                    rgba(0,194,255,0.12)
                  )
                `,

                "&:hover": {
                  background: `
                    linear-gradient(
                      135deg,
                      rgba(127,90,240,0.28),
                      rgba(0,194,255,0.18)
                    )
                  `,
                },
              }}
            >
              Track Progress
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            {modules.map((module, moduleIndex) => (
              <CourseCard
                key={module.module_number || moduleIndex}
                module={module}
                index={moduleIndex}
                handleComplete={handleComplete}
                handleOpenFeedback={handleOpenFeedback}
                score={
                  module?.quiz?.evaluation?.total_score
                }
              />
            ))}
          </Box>
        </>
      )}

      <QuestionModal
        open={openQuestions}
        questions={questions}
        index={index}
        setIndex={setIndex}
        answers={answers}
        setAnswers={setAnswers}
        onSubmit={handleFeedback}
        onClose={() => setOpenQuestions(false)}
      />

      <FeedbackModal
        open={openFeedback}
        feedback={selectedFeedback}
        onClose={() => setOpenFeedback(false)}
      />
    </Box>
  );
}