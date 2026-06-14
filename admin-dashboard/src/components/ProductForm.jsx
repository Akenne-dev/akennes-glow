import { useState } from "react";
import axios from "axios";

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "men",
    imageUrl: "",
    isDeal: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Connecting to your local backend
      await axios.post("http://localhost:4000/api/admin/add-product", formData);
      alert("Product Added Successfully!");
      setFormData({
        name: "",
        price: "",
        category: "men",
        imageUrl: "",
        isDeal: false,
      });
    } catch (err) {
      alert("Error adding product");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h3>Add New Product</h3>
      <input
        placeholder="Product Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        placeholder="Price"
        type="number"
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      <input
        placeholder="Image URL (Cloudinary Link)"
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      />

      <select
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
      </select>

      <button type="submit">Upload Product</button>
    </form>
  );
}
