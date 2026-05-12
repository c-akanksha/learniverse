import React, { useCallback, useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

import { useNavigate, useParams } from "react-router-dom";

import {
  useFetchAllCourses,
  useGenerateCourse,
} from "../utils/queries";

import GenerateCourseModal from "../components/GenerateCourseModal";
import Loader from "../components/Loader";

const pageStyles = {
  width: "100%",
  maxWidth: "1000px",
  mx: "auto",
  py: 4,
  minHeight: "100vh",
  overflowX: "hidden",
  color: "white",
  px: {
    xs: 2,
    sm: 3,
    md: 4,
  },
};

const actionButtonStyles = {
  color: "white",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.04)",
  borderRadius: "14px",
  textTransform: "none",
  px: 2.5,
  py: 1.2,
  whiteSpace: "nowrap",
  flexShrink: 0,

  "&:hover": {
    background: "rgba(255,255,255,0.08)",
  },
};

export default function CoursesPage() {
  const { learnerId } = useParams();

  const navigate = useNavigate();

  const { data, isLoading, refetch } =
    useFetchAllCourses(learnerId);

  const generateCourse = useGenerateCourse();

  const [openModal, setOpenModal] = useState(false);

  const courses = useMemo(() => data ?? [], [data]);

  const handleOpenCourse = useCallback(
    (courseId) => {
      navigate(`/course/${learnerId}/${courseId}`);
    },
    [navigate, learnerId]
  );

  const handleGenerate = useCallback(
    async (payload) => {
      try {
        await generateCourse.mutateAsync({
          learner_id: learnerId,
          ...payload,
        });

        setOpenModal(false);
        refetch();
      } catch (error) {
        console.error(error);
      }
    },
    [generateCourse, learnerId, refetch]
  );

  if (isLoading) {
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
          title="Loading Your Courses 📚"
          subtitle="Gathering your learning journeys and progress..."
        />
      </Box>
    );
  }

  return (
    <Box sx={pageStyles}>
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
          mb: 4,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              wordBreak: "break-word",
              fontSize: {
                xs: "1.8rem",
                sm: "2.2rem",
              },
            }}
          >
            Your Courses 🚀
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              opacity: 0.7,
            }}
          >
            Continue your AI learning journey
          </Typography>
        </Box>

        <Button
          startIcon={<AddRoundedIcon />}
          onClick={() => setOpenModal(true)}
          sx={actionButtonStyles}
        >
          Generate New Course
        </Button>
      </Box>

      <Stack
        spacing={2.5}
        sx={{
          width: "100%",
        }}
      >
        {courses.map((course) => {
          const progress = course.total_modules
            ? (course.completed_modules /
                course.total_modules) *
              100
            : 0;

          return (
            <Card
              key={course._id}
              sx={{
                width: "100%",
                overflow: "hidden",
                color: "white",
                borderRadius: "22px",
                backdropFilter: "blur(20px)",
                transition: "all 0.25s ease",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                background: `
                  linear-gradient(
                    145deg,
                    rgba(16,22,48,0.96),
                    rgba(8,12,28,0.92)
                  )
                `,

                "&:hover": {
                  boxShadow:
                    "0 10px 30px rgba(127,90,240,0.18)",
                },
              }}
            >
              <CardContent
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                  },

                  "&:last-child": {
                    pb: {
                      xs: 2,
                      sm: 3,
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                    alignItems: {
                      xs: "flex-start",
                      sm: "center",
                    },
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      width: "100%",
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        mb: 1.2,
                        fontWeight: 800,
                        wordBreak: "break-word",
                        fontSize: {
                          xs: "1.05rem",
                          sm: "1.25rem",
                        },
                      }}
                    >
                      {course.course_title}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      flexWrap="wrap"
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Chip
                        size="small"
                        icon={<SchoolRoundedIcon />}
                        label={course.level}
                        sx={{
                          maxWidth: "100%",
                          bgcolor:
                            "rgba(127,90,240,0.15)",
                          color: "#d5c5ff",
                        }}
                      />

                      <Chip
                        size="small"
                        label={`${course.completed_modules}/${course.total_modules} Modules`}
                        sx={{
                          maxWidth: "100%",
                          bgcolor:
                            "rgba(0,194,255,0.12)",
                          color: "#8fe7ff",
                        }}
                      />
                    </Stack>

                    <Box
                      sx={{
                        mt: 2,
                        width: "100%",
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 7,
                          overflow: "hidden",
                          borderRadius: 999,
                          background:
                            "rgba(255,255,255,0.08)",

                          "& .MuiLinearProgress-bar": {
                            background:
                              "linear-gradient(90deg,#7F5AF0,#00C2FF)",
                          },
                        }}
                      />

                      <Typography
                        sx={{
                          mt: 0.8,
                          opacity: 0.65,
                          fontSize: "0.78rem",
                        }}
                      >
                        {Math.round(progress)}% completed
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      flexShrink: 0,
                      alignSelf: {
                        xs: "flex-end",
                        sm: "center",
                      },
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        handleOpenCourse(course._id)
                      }
                      sx={{
                        color: "white",
                        border:
                          "1px solid rgba(255,255,255,0.12)",
                        background:
                          "rgba(255,255,255,0.03)",

                        "&:hover": {
                          background:
                            "rgba(0,194,255,0.12)",
                        },
                      }}
                    >
                      <ArrowForwardRoundedIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Stack>

      <GenerateCourseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleGenerate}
        loading={generateCourse.isPending}
      />
    </Box>
  );
}