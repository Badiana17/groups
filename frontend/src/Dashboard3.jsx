// Dashboard3.jsx
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
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Dashboard3 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userRole, setRole] = useState("");
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", quantity: 0 });

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/items");
    setItems(res.data);
  };

  const handleEdit = (item) => {
    setEditItemId(item.id);
    setForm({ name: item.name, description: item.description, quantity: item.quantity });
  };

  const handleSave = async () => {
    await axios.put(`http://localhost:5000/items/${editItemId}`, form);
    setEditItemId(null);
    setForm({ name: "", description: "", quantity: 0 });
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
    fetchItems();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      setUser(storedUser);
      setRole(storedRole);

      if (storedRole !== "Employee2") {
        navigate("/dashboard2");
      } else {
        fetchItems();
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="page-wrapper">
      <div className="form-container" style={{ maxWidth: "600px" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#1d2671" }}>
          Welcome {userRole}, {user}
        </Typography>

        <List sx={{ mt: 3 }}>
          {items.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={<span style={{ color: 'blue', fontFamily: '"Brush Script MT", Cursive' }}>{item.name}</span>}
                secondary={
                  <>
                    <strong style={{ fontSize: '0.5rem' }}>Qty: {item.quantity}</strong> • {item.description}
                  </>
                }
              />
              <IconButton onClick={() => handleEdit(item)}><EditIcon /></IconButton>
              <IconButton onClick={() => handleDelete(item.id)}><DeleteIcon /></IconButton>
            </ListItem>
          ))}
        </List>

        {editItemId && (
          <Box sx={{ mt: 2 }}>
            <Typography>Edit Item</Typography>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              margin="normal"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        )}

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard3;
