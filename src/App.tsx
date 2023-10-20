import { AddData, Home, EditData, Login, Register, Dashboard } from "./pages";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main-menu" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-data" element={<AddData />} />
          <Route path="/edit-data/:id" element={<EditData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
