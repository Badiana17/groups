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
    <div className="page-wrapper">
      <div className="form-container" style={{ maxWidth: "600px" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#1d2671" }}>
          Welcome {userRole}, {user}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <TextField
            label="Item Name"
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
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={handleAddOrUpdate}
          >
            {editId ? "Update Item" : "Add Item"}
          </Button>
        </Box>

        <List sx={{ mt: 3 }}>
          {items.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <>
                  <IconButton onClick={() => handleEdit(item)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(item.id)}><DeleteIcon /></IconButton>
                </>
              }
            >
<ListItemText
  primary={
    <span style={{ color: 'blue', fontFamily: '"Brush Script MT", Cursive' }}>
      {item.name}
    </span>
  }
  secondary={
    <>
      <strong style={{ fontSize: '0.5rem' }}>Qty: {item.quantity}</strong> • {item.description}
    </>
  }
/>

            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
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

export default Dashboard;
