import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";

/* ---------------- STYLES ---------------- */

const dialogPaperSx = {
  borderRadius: "28px",
  background:
    "linear-gradient(145deg, rgba(10,14,35,0.96), rgba(5,8,20,0.98))",
  border: "1px solid rgba(127,90,240,0.25)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 0 40px rgba(127,90,240,0.2)",
};

const textfieldStyles = {
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.7)",
  },
  "& .MuiOutlinedInput-root": {
    color: "white",
    borderRadius: "16px",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.18)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.38)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00C2FF",
    },
  },
  "& input": {
    color: "white",
  },
};

const buttonSx = {
  py: 1.5,
  borderRadius: "16px",
  textTransform: "none",
  fontWeight: 700,
  fontSize: {
    xs: "0.95rem",
    sm: "1rem",
  },
  background: "linear-gradient(135deg,#7F5AF0,#00C2FF)",
  "&:hover": {
    background: "linear-gradient(135deg,#9270ff,#2dd7ff)",
  },
};

/* ---------------- COMPONENT ---------------- */

export default function GenerateCourseModal({
  open,
  onClose,
  onSubmit,
  loading,
}) {
  const [form, setForm] = useState({
    skill: "",
    level: "",
    numOfModules: 5,
  });

  const handleChange = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      skill: form.skill,
      level: form.level,
      num_of_modules: Number(form.numOfModules),
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": dialogPaperSx,
      }}
    >
      <DialogContent sx={{ p: 4, color: "white" }}>
        <Stack spacing={2}>
          <Typography variant="h5">
            Generate New Course
          </Typography>

          <TextField
            label="Skill"
            value={form.skill}
            onChange={handleChange("skill")}
            fullWidth
            sx={textfieldStyles}
          />

          <TextField
            label="Level (Beginner | Intermediate | Advanced)"
            value={form.level}
            onChange={handleChange("level")}
            fullWidth
            sx={textfieldStyles}
          />

          <TextField
            label="Number of modules"
            value={form.numOfModules}
            onChange={handleChange("numOfModules")}
            fullWidth
            sx={textfieldStyles}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={buttonSx}
          >
            {loading ? "Generating..." : "Generate Course"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}