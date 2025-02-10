import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./components/Card";
import RestaurantSelect from "./components/RestaurantSelect";
import Summary from "./components/Summary"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/restaurant" element={<RestaurantSelect />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
}

export default App;
