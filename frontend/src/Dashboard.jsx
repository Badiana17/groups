import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Paper,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userRole, setRole] = useState("");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", quantity: 0 });
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/items");
    setItems(res.data);
  };

  const handleAddOrUpdate = async () => {
    if (!form.name) return alert("Name is required");

    if (editId) {
      await axios.put(`http://localhost:5000/items/${editId}`, form);
    } else {
      await axios.post("http://localhost:5000/items", form);
    }

    setForm({ name: "", description: "", quantity: 0 });
    setEditId(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
    fetchItems();
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, description: item.description, quantity: item.quantity });
    setEditId(item.id);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      setUser(storedUser);
      setRole(storedRole);

      if (storedRole !== "Manager") {
        navigate("/employee");
      } else {
        fetchItems();
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #f0f4ff, #d9e4ff)",
          boxShadow: "0 15px 40px rgba(88, 99, 252, 0.3)",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{ color: "#3446a6", mb: 5, fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}
        >
          Welcome {userRole}, {user}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 5,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              minWidth: 320,
              background:
                "linear-gradient(145deg, #e6ecff, #c6d1ff)",
              borderRadius: 3,
              p: 4,
              boxShadow: "8px 8px 20px #bcc6ff, -8px -8px 20px #ffffff",
            }}
          >
            <Typography
                variant="h6"
                sx={{ mb: 2, color: "#3446a6", textAlign: "center", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}
              >
                ORDERS
              </Typography>
            <TextField
              label="Item Name"
              fullWidth
              margin="normal"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                  backgroundColor: "#f7f9ff",
                },
              }}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                  backgroundColor: "#f7f9ff",
                },
              }}
            />
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              margin="normal"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 0 })}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                  backgroundColor: "#f7f9ff",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                fontWeight: "600",
                background:
                  "linear-gradient(90deg, #5369f8, #ab6dff)",
                boxShadow: "0 8px 16px rgba(83, 105, 248, 0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #3f52e3, #8b47ff)",
                  boxShadow: "0 10px 20px rgba(61, 79, 219, 0.6)",
                },
              }}
              onClick={handleAddOrUpdate}
            >
              {editId ? "Update Item" : "Add Item"}
            </Button>
          </Box>

          <Paper
            elevation={10}
            sx={{
              flex: 2,
              maxHeight: "70vh",
              overflowY: "auto",
              borderRadius: 3,
              p: 2,
              background:
                "linear-gradient(145deg, #d3dbff, #eaf0ff)",
              boxShadow: "12px 12px 24px #b0b9ff, -12px -12px 24px #ffffff",
              minWidth: 400,
            }}
          >
            <List>
              {items.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <>
                      <IconButton onClick={() => handleEdit(item)} aria-label="edit" sx={{ color: "#5369f8" }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item.id)} aria-label="delete" sx={{ color: "#ab6dff" }}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    bgcolor: "#f2f6ff",
                    boxShadow: "4px 4px 8px #c5cdfc, -4px -4px 8px #ffffff",
                  }}
                >
                  <ListItemText
                    primary={
                      <span
                        style={{
                          color: "#5369f8",
                          fontFamily: '"Brush Script MT", Cursive',
                          fontSize: "1.3rem",
                        }}
                      >
                        {item.name}
                      </span>
                    }
                    secondary={
                      <>
                        <strong style={{ fontSize: "0.85rem", color: "#3446a6" }}>
                          Qty: {item.quantity}
                        </strong>{" "}
                        • {item.description}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 5,
            fontWeight: "700",
            background:
              "linear-gradient(90deg, #ab6dff, #5369f8)",
            boxShadow: "0 10px 20px rgba(171, 109, 255, 0.5)",
            "&:hover": {
              background:
                "linear-gradient(90deg, #8b47ff, #3f52e3)",
              boxShadow: "0 12px 24px rgba(139, 71, 255, 0.6)",
            },
          }}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
