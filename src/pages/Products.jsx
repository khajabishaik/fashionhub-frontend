

import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/products");

      console.log("Products API Response:", response.data);

      setProducts(
        Array.isArray(response.data)
          ? response.data
          : response.data.products || []
      );
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Get categories directly from the products
  const categories = [
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    )
  ].sort();

  // Search and filter products
  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ||
      product.category === category;

    const price = Number(product.price) || 0;

    let budgetMatch = true;

    if (budget === "Low") {
      budgetMatch = price <= 1000;
    } else if (budget === "Medium") {
      budgetMatch = price > 1000 && price <= 3000;
    } else if (budget === "High") {
      budgetMatch = price > 3000;
    }

    return searchMatch && categoryMatch && budgetMatch;
  });

  // Sort products without changing the original products array
  const finalProducts = [...filteredProducts];

  if (sort === "price-low") {
    finalProducts.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  }

  if (sort === "price-high") {
    finalProducts.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  if (sort === "rating-high") {
    finalProducts.sort(
      (a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)
    );
  }

  if (sort === "rating-low") {
    finalProducts.sort(
      (a, b) => (Number(a.rating) || 0) - (Number(b.rating) || 0)
    );
  }

  // Reset all filters
  function resetFilters() {
    setSearch("");
    setCategory("All");
    setBudget("All");
    setSort("");
  }

  return (
    <div className="products-page">

      <div className="products-header">
        <h1>Our Fashion Collection</h1>

        <p>
          Discover beautiful outfits, everyday fashion,
          traditional collections and stylish accessories.
        </p>

        <Link to="/add-product" className="add-btn">
          + Add Product
        </Link>
      </div>

      {loading ? (
        <p className="products-message">
          Loading products...
        </p>
      ) : error ? (
        <div className="products-message">
          <p>{error}</p>
          <button onClick={getProducts}>
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="products-message">
          <h2>No Products Available</h2>
          <p>
            Your fashion collection is waiting to be filled!
          </p>
          <Link to="/add-product" className="add-btn">
            + Add Your First Product
          </Link>
        </div>
      ) : (
        <>
          <div className="products-filters">

            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="All">All Budgets</option>
              <option value="Low">Low (Up to ₹1,000)</option>
              <option value="Medium">Medium (₹1,001 - ₹3,000)</option>
              <option value="High">High (Above ₹3,000)</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort Products</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating-high">Rating: High to Low</option>
              <option value="rating-low">Rating: Low to High</option>
            </select>

            <button
              className="reset-filters-btn"
              onClick={resetFilters}
            >
              Reset Filters
            </button>

          </div>

          <p className="products-count">
            Showing {finalProducts.length} of {products.length} products
          </p>

          {finalProducts.length === 0 ? (
            <div className="products-message">
              <h2>No Products Found</h2>
              <p>
                Try changing your search or filters.
              </p>
              <button
                className="reset-filters-btn"
                onClick={resetFilters}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products">
              {finalProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
}

export default Products;
