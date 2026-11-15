import { createSlice } from "@reduxjs/toolkit";

// Creates a unique localStorage key for the currently logged-in user
const getUserFavoritesKey = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return null;
  const userId = user.email || user._id || user.id;
  return `fashionHubFavorites_${userId}`;
};

// Loads only the active user's favorites from localStorage
const getSavedFavorites = () => {
  const key = getUserFavoritesKey();
  if (!key) return [];
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

const favoriteSlice = createSlice({
  name: "favorites",

  initialState: getSavedFavorites(),

  reducers: {
    // Loads the newly logged-in user's favorites into Redux
    loadUserFavorites: () => {
      return getSavedFavorites();
    },

    // Adds product and saves to the current user's specific key
    addFavorite: (state, action) => {
      const exists = state.find(
        (product) => product.id === action.payload.id
      );

      if (!exists) {
        state.push(action.payload);
        const key = getUserFavoritesKey();
        if (key) {
          localStorage.setItem(key, JSON.stringify(state));
        }
      }
    },

    // Removes product and updates the current user's specific key
    removeFavorite: (state, action) => {
      const updatedFavorites = state.filter(
        (product) => product.id !== action.payload
      );
      const key = getUserFavoritesKey();
      if (key) {
        localStorage.setItem(key, JSON.stringify(updatedFavorites));
      }
      return updatedFavorites;
    },

    // Resets Redux state to empty when logging out
    clearFavorites: () => {
      return [];
    },
  },
});

export const {
  loadUserFavorites,
  addFavorite,
  removeFavorite,
  clearFavorites,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
