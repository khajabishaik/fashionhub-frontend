import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const favoritesState = useSelector((state) => state.favorites);
  const favorites = Array.isArray(favoritesState)
    ? favoritesState
    : favoritesState?.items || [];

  const favoriteCount = favorites.length;

  return (
    <nav>
      <Link to="/">Home</Link>

      <Link to="/products">Products</Link>

      {user && (
        <Link to="/favorites" className="favorites-link">
          Favorites{" "}
          <span
            style={{
              backgroundColor: "transparent",
              borderRadius: "0",
              padding: "0",
              color: "inherit",
              fontWeight: "bold",
              marginLeft: "4px",
            }}
          >
            ({favoriteCount})
          </span>
        </Link>
      )}

      {!user && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}

      {user && <Link to="/logout">Logout</Link>}
    </nav>
  );
}

export default Navbar;
