import React, { useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useNavigate } from "react-router-dom";

import { useLogin, useRegister } from "../utils/queries";

const inputStyles = {
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.7)",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#00C2FF",
  },

  "& .MuiOutlinedInput-root": {
    color: "white",

    "& fieldset": {
      borderColor: "rgba(255,255,255,0.25)",
    },

    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.5)",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#00C2FF",
      boxShadow: "0 0 10px rgba(0,194,255,0.35)",
    },

    "& input": {
      color: "white",
    },

    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px transparent inset",
      WebkitTextFillColor: "#fff",
      transition: "background-color 5000s ease-in-out 0s",
    },
  },
};

const primaryBtn = {
  py: 1.5,
  borderRadius: "16px",
  textTransform: "none",
  fontWeight: 700,
  fontSize: "1rem",
  background: "linear-gradient(135deg, #7F5AF0, #00C2FF)",
  boxShadow: "0 0 24px rgba(127,90,240,0.35)",

  "&:hover": {
    background: "linear-gradient(135deg, #9270ff, #2dd7ff)",
  },
};

export default function AuthModal({ open, onClose }) {
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [loginEmail, setLoginEmail] = useState("");

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
  });

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const setField = (field, value) => {
    setRegisterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAuthSuccess = (learnerId) => {
    localStorage.setItem("learnerId", learnerId);
    window.dispatchEvent(new Event("auth-change"));
    navigate(`/courses/${learnerId}`);
  };

  const handleLogin = async () => {
    try {
      const res = await loginMutation.mutateAsync({
        email: loginEmail,
      });

      handleAuthSuccess(res.learner_id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await registerMutation.mutateAsync(registerData);
      handleAuthSuccess(res.learner_id);
    } catch (err) {
      console.error(err);
    }
  };

  const LoadingBtn = (loading, text) =>
    loading ? <CircularProgress size={22} color="inherit" /> : text;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          background:
            "linear-gradient(135deg, rgba(7,11,26,0.96), rgba(18,24,48,0.94))",
          color: "#fff",
          borderRadius: "28px",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
        },

        "& .MuiBackdrop-root": {
          background: "rgba(2, 6, 23, 0.72)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <DialogContent sx={{ p: 4 }}>
        {/* HEADER */}
        <Box sx={{ textAlign: "center", pt: 3 }}>
          <AutoAwesomeIcon
            sx={{
              fontSize: 52,
              color: "#B388FF",
              filter: "drop-shadow(0 0 20px rgba(127,90,240,0.8))",
            }}
          />

          <Typography variant="h4" sx={{ mt: 2, fontWeight: 700 }}>
            Learniverse
          </Typography>

          <Typography sx={{ mt: 1, color: "rgba(255,255,255,0.65)" }}>
            Your adaptive AI-powered learning universe ✨
          </Typography>
        </Box>

        {/* TABS */}
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          centered
          sx={{
            mt: 4,
            "& .MuiTabs-indicator": {
              backgroundColor: "#00C2FF",
              height: 3,
              borderRadius: "999px",
            },
            "& .MuiTab-root": {
              color: "rgba(255,255,255,0.55)",
              textTransform: "none",
              fontWeight: 600,
            },
            "& .Mui-selected": {
              color: "#00C2FF !important",
            },
          }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {/* LOGIN */}
        {tab === 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
            <TextField
              label="Email"
              fullWidth
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              sx={inputStyles}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              disabled={loginMutation.isPending}
              sx={primaryBtn}
            >
              {LoadingBtn(loginMutation.isPending, "Login")}
            </Button>
          </Box>
        )}

        {/* REGISTER */}
        {tab === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
            <TextField
              label="Name"
              fullWidth
              value={registerData.name}
              onChange={(e) => setField("name", e.target.value)}
              sx={inputStyles}
            />

            <TextField
              label="Email"
              fullWidth
              value={registerData.email}
              onChange={(e) => setField("email", e.target.value)}
              sx={inputStyles}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleRegister}
              disabled={registerMutation.isPending}
              sx={primaryBtn}
            >
              {LoadingBtn(registerMutation.isPending, "Sign Up")}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}