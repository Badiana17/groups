import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  Box,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);

      // Navigate based on role
      if (response.data.role === "Manager") navigate("/manager");
      else if (response.data.role === "Employee") navigate("/employee");
      else if (response.data.role === "Employee2") navigate("/employee2");
      else navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #f0f4ff, #d9e4ff)",
          boxShadow: "0 15px 40px rgba(88, 99, 252, 0.3)",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 3,
            color: "#3446a6",
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Login 
        </Typography>

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 2,
              backgroundColor: "#f7f9ff",
            },
          }}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 2,
              backgroundColor: "#f7f9ff",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((show) => !show)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            fontWeight: "700",
            background: "linear-gradient(90deg, #5369f8, #ab6dff)",
            boxShadow: "0 8px 16px rgba(83, 105, 248, 0.4)",
            "&:hover": {
              background: "linear-gradient(90deg, #3f52e3, #8b47ff)",
              boxShadow: "0 10px 20px rgba(61, 79, 219, 0.6)",
            },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: "#555", fontFamily: "'Poppins', sans-serif" }}
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#5369f8",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Register here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
