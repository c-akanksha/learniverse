import React from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

export default function QuestionModal({
  open,
  onClose,
  questions = [],
  onSubmit,
  index,
  setIndex,
  answers,
  setAnswers,
}) {
  const current = questions[index];

  const isLast = index === questions.length - 1;

  const hasAnswer = !!answers?.[index];

  const updateAnswer = (val) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: val,
    }));
  };

  const handleNext = () => setIndex((p) => p + 1);

  const handleSubmit = () => {
    const payload = questions.map((q, i) => ({
      question: q.question,
      answer: answers[i] || "",
      difficulty: q.difficulty,
    }));

    onSubmit(payload);

    onClose();
    setIndex(0);
    setAnswers({});
  };

  return (
    <DialogContainer open={open} onClose={onClose}>
      <DialogContent sx={{ p: 4, color: "white" }}>
        {!questions.length ? (
          <LoadingState />
        ) : (
          <>
            <QuestionHeader
              index={index}
              current={current}
            />

            <QuestionBody question={current?.question} />

            <AnswerBox
              value={answers[index] || ""}
              onChange={updateAnswer}
            />

            <Actions
              isLast={isLast}
              disabled={!hasAnswer}
              onNext={handleNext}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </DialogContent>
    </DialogContainer>
  );
}

function DialogContainer({ open, onClose, children }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "28px",
          background:
            "linear-gradient(145deg, rgba(10,14,35,0.96), rgba(5,8,20,0.98))",
          border: "1px solid rgba(127,90,240,0.25)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 40px rgba(127,90,240,0.2)",
        },
      }}
    >
      {children}
    </Dialog>
  );
}

function LoadingState() {
  return (
    <Typography
      sx={{
        textAlign: "center",
        color: "rgba(255,255,255,0.7)",
      }}
    >
      Generating your cosmic questions...
    </Typography>
  );
}

function QuestionHeader({ index, current }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 3 }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          letterSpacing: "0.5px",
        }}
      >
        Question {index + 1}
      </Typography>

      <DifficultyChip difficulty={current?.difficulty} />
    </Stack>
  );
}

function DifficultyChip({ difficulty }) {
  const styles = {
    easy: {
      bg: "rgba(0,194,255,0.15)",
      color: "#7fdfff",
    },
    hard: {
      bg: "rgba(255,100,100,0.15)",
      color: "#ff8a8a",
    },
    medium: {
      bg: "rgba(127,90,240,0.15)",
      color: "#c4a7ff",
    },
  };

  const s = styles[difficulty] || styles.medium;

  return (
    <Chip
      label={difficulty}
      sx={{
        bgcolor: s.bg,
        color: s.color,
        border: "1px solid rgba(255,255,255,0.12)",
        textTransform: "capitalize",
        marginX: 1
      }}
    />
  );
}


function QuestionBody({ question }) {
  return (
    <Typography
      sx={{
        mb: 3,
        fontSize: "1.05rem",
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.85)",
      }}
    >
      {question}
    </Typography>
  );
}


function AnswerBox({ value, onChange }) {
  return (
    <TextField
      fullWidth
      multiline
      rows={5}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your answer..."
      sx={{
        mb: 3,
        "& .MuiOutlinedInput-root": {
          color: "white",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.03)",
          "& fieldset": {
            borderColor: "rgba(255,255,255,0.15)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(127,90,240,0.4)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#7F5AF0",
          },
        },
      }}
    />
  );
}

function Actions({ isLast, disabled, onNext, onSubmit }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        variant="contained"
        disabled={disabled}
        onClick={isLast ? onSubmit : onNext}
        sx={{
          borderRadius: "14px",
          px: 3,
          textTransform: "none",
          background:
            "linear-gradient(135deg,#7F5AF0,#00C2FF)",
        }}
      >
        {isLast ? "Get Feedback" : "Next Question"}
      </Button>
    </Box>
  );
}