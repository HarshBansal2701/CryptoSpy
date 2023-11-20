import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import  Alert  from "./components/Alert";


function App() {


  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
      <Alert/>
    </Router>
  );
}

export default App;
