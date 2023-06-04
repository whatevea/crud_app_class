import { Routes, Route } from "react-router-dom";
import Form from "./pages/form";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Edit from "./pages/edit";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<Form />} />
      <Route path="/:id/edit" element={<Form />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/edit" element={<Edit />} />
    </Routes>
  );
};

export default App;
