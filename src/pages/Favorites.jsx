
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { removeFavorite } from "../features/favoriteSlice";

function Favorites() {

  const dispatch = useDispatch();

  const favorites = useSelector(
    state => state.favorites
  );

  return (
    <div className="favorites-page">

      <div className="favorites-heading">
        <h1>My Favorite Collection</h1>

        <p>
          Your favorite fashion pieces, all in one place.
        </p>
      </div>

      {favorites.length === 0 ? (

        <div className="favorites-empty">

          <h2>No Favorite Products Yet</h2>

          <p>
            Explore our collection and add products
            you love to your favorites.
          </p>

          <Link to="/products" className="explore-btn">
            Explore Products
          </Link>

        </div>

      ) : (

        <div className="favorites-grid">

          {favorites.map(product => (

            <div
              className="favorite-product-card"
              key={product.id}
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <div className="favorite-product-content">

                <h2>{product.name}</h2>

                <p>{product.category}</p>

                <p className="favorite-price">
                  ₹ {product.price}
                </p>

                <p>⭐ {product.rating}</p>

                <div className="favorite-actions">

                  <Link
                    to={`/products/${product.id}`}
                    className="favorite-view-btn"
                  >
                    View Details
                  </Link>

                  <button
                    className="favorite-remove-btn"
                    onClick={() =>
                      dispatch(removeFavorite(product.id))
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Favorites;
