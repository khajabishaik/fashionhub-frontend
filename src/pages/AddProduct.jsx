
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function AddProduct() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    image: "",
    description: "",
    color: "",
    sizes: "",
    material: "",
    stock: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      sizes: formData.sizes.split(",").map(size => size.trim())
    };

    await api.post("/products", productData);

    navigate("/products");
  }

  return (
    <div className="form-container">

      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Product Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
        />

        <input
          type="text"
          name="sizes"
          placeholder="Sizes (S, M, L, XL)"
          value={formData.sizes}
          onChange={handleChange}
        />

        <input
          type="text"
          name="material"
          placeholder="Material"
          value={formData.material}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Available Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">
          Add Product
        </button>

      </form>
    </div>
  );
}

export default AddProduct;
