import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearFavorites } from "../features/favoriteSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("user");
    dispatch(clearFavorites());
    navigate("/login", { replace: true });
  }, [navigate, dispatch]);

  return null;
}

export default Logout;
