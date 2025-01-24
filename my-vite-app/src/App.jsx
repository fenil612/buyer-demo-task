import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddBuyer from "./components/AddBuyer";
import BuyersList from "./components/BuyersList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddBuyer />} />
          <Route path="/buyers" element={<BuyersList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
