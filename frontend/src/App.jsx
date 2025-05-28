import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Dashboard2 from "./Dashboard2";
import Dashboard3 from "./Dashboard3";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/manager" element={<Dashboard />} />
        <Route path="/employee" element={<Dashboard2 />} />
        <Route path="/employee2" element={<Dashboard3 />} />
      </Routes>
    </Router>
  );
}

export default App;
