// src/components/RegisterFundraiserPopup.jsx
import { useState } from "react";
import "./CreateFundraiserPopup.css";
import { useFundMe } from "../useFundMe";
import axios from "axios";

export default function RegisterFundraiserPopup({ onClose }) {
  const { createContract } = useFundMe();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const contractAddress = await createContract();
      console.log(contractAddress);
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("goal", formData.goal);
      form.append("image", formData.image);
      form.append("contractAddress", contractAddress);

      await axios.post("http://localhost:5000/create_event", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Fundraiser created successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error creating fundraiser.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Create a New Fundraiser</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <input
            name="goal"
            type="number"
            placeholder="Goal in ETH"
            value={formData.goal}
            onChange={handleChange}
            required
          />
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <button type="submit" onClick={handleSubmit}>
            Create Fundraiser
          </button>
        </form>
      </div>
    </div>
  );
}
