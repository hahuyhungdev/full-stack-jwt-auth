import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./conponents/Home";
import Layout from "./conponents/Layout";
import { Login } from "./conponents/Login";
import Profile from "./conponents/Profile";
import { Register } from "./conponents/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
