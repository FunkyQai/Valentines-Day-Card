import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RestaurantSelect.css";
import fizImage from "../assets/images/fiz.png";
import oudImage from "../assets/images/oud.png";
import oysterbankImage from "../assets/images/oysterbank.png";

const restaurants = [
  {
    name: "Fiz (Saturday Only)",
    url: "https://www.restaurantfiz.sg/",
    image: fizImage,
  },
  {
    name: "Oud",
    url: "https://www.oudrestaurant.sg/",
    image: oudImage,
  },
  {
    name: "The Oyster Bank",
    url: "https://www.theoysterbank.sg/",
    image: oysterbankImage,
  }
];

function RestaurantSelect() {
  const [selectedOption, setSelectedOption] = useState("");
  const [customRestaurant, setCustomRestaurant] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    let selectedRestaurant;
    if (selectedOption === "custom" && customRestaurant.trim() !== "") {
      selectedRestaurant = { name: customRestaurant };
    } else {
      selectedRestaurant = restaurants.find((r) => r.name === selectedOption);
    }

    if (selectedRestaurant) {
      navigate("/summary", { state: { selectedRestaurant } });
    }
  };

  return (
    <div className="restaurant-selection">
      <h2>Where would you like to eat?</h2>
      <div className="options">
        {restaurants.map((restaurant) => (
          <label key={restaurant.name} className="option">
            <input
              type="radio"
              name="restaurant"
              value={restaurant.name}
              checked={selectedOption === restaurant.name}
              onChange={() => setSelectedOption(restaurant.name)}
            />
            <div className="info">
              <img src={restaurant.image} alt={restaurant.name} />
              <a href={restaurant.url} target="_blank" rel="noopener noreferrer">
                {restaurant.name}
              </a>
            </div>
          </label>
        ))}

        {/* Custom Option */}
        <label className="option">
          <input
            type="radio"
            name="restaurant"
            value="custom"
            checked={selectedOption === "custom"}
            onChange={() => setSelectedOption("custom")}
          />
          <div className="custom-inputs">
            Others:
            <input
              type="text"
              placeholder="Please Specify"
              value={customRestaurant}
              onChange={(e) => setCustomRestaurant(e.target.value)}
            />
          </div>
        </label>
      </div>

      <button onClick={handleSubmit} disabled={!selectedOption}>
        Submit
      </button>
    </div>
  );
}

export default RestaurantSelect;