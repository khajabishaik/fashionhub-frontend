
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditProduct() {

  const { id } = useParams();
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

  useEffect(() => {
    getProduct();
  }, [id]);

  async function getProduct() {
    try {
      const response = await api.get(`/products/${id}`);

      setFormData({
        ...response.data,
        sizes: Array.isArray(response.data.sizes)
          ? response.data.sizes.join(", ")
          : response.data.sizes || ""
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.put(`/products/${id}`, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        sizes: formData.sizes.split(",").map(size => size.trim())
      });

      alert("Product updated successfully!");
      navigate("/products");

    } catch (error) {
      console.error("Error updating product:", error);
      alert("Unable to update product.");
    }
  }

  return (
    <div className="form-container">

      <h2>Edit Product</h2>

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
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
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
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">
          Update Product
        </button>

      </form>
    </div>
  );
}

export default EditProduct;
