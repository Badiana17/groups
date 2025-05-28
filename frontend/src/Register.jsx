import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  MenuItem,
  Box,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword || !role) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
        role,
      });
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        py: 4
      }}
    >
      <Box
        sx={{
          width: "100%",
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
          Create Account
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

        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 2,
              backgroundColor: "#f7f9ff",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword((show) => !show)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Role"
          select
          fullWidth
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 2,
              backgroundColor: "#f7f9ff",
            },
          }}
        >
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Employee">Employee</MenuItem>
          <MenuItem value="Employee2">Employee2</MenuItem>
        </TextField>

        <Button
          variant="contained"
          fullWidth
          disabled={loading}
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
          onClick={handleRegister}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: "#555", fontFamily: "'Poppins', sans-serif" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#5369f8",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;