
import { Link } from "react-router-dom";
import api from "../services/api";

import { useDispatch, useSelector } from "react-redux";

import {
  addFavorite,
  removeFavorite
} from "../features/favoriteSlice";

function ProductCard({ product }) {

  const dispatch = useDispatch();

  const favorites = useSelector(
    state => state.favorites
  );

  const isFavorite = favorites.some(
    item => item.id === product.id
  );

  function handleFavorite() {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        await api.delete(`/products/${product.id}`);
        alert("Product deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Unable to delete product.");
      }
    }
  }

  return (
    <div className="card">

      <img
        src={product.image}
        alt={product.name}
      />

      <h3>{product.name}</h3>

      <p>{product.category}</p>

      <p>₹ {product.price}</p>

      <p>⭐ {product.rating}</p>

      <div className="card-actions">

        <Link
          className="view-btn"
          to={`/products/${product.id}`}
        >
          View Details
        </Link>

        <Link
          className="edit-btn"
          to={`/edit-product/${product.id}`}
        >
          Edit
        </Link>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>

        <button
          className={`favorite-btn ${
            isFavorite ? "remove-favorite" : "add-favorite"
          }`}
          onClick={handleFavorite}
        >
          {isFavorite
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </button>

      </div>

    </div>
  );
}

export default ProductCard;
