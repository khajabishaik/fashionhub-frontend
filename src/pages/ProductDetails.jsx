
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProduct() {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  if (loading) return <h2>Loading product...</h2>;
  if (error || !product) return <h2>{error || "Product not found"}</h2>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">

        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-content">

          <p className="product-detail-category">
            {product.category || "Fashion Collection"}
          </p>

          <h1>{product.name}</h1>

          <p className="product-detail-description">
            {product.description || "Discover your perfect style with this beautiful collection."}
          </p>

          <div className="product-detail-price">
            ₹ {product.price ?? "Not available"}
          </div>

          <div className="product-detail-rating">
            ⭐ {product.rating ?? "Not rated"}
          </div>

          <div className="product-detail-line"></div>

          <h3>Product Information</h3>

          <div className="product-detail-info">
            <div>
              <span>Brand</span>
              <strong>{product.brand || "Not specified"}</strong>
            </div>

            <div>
              <span>Color</span>
              <strong>{product.color || "Not specified"}</strong>
            </div>

            <div>
              <span>Material</span>
              <strong>{product.material || "Not specified"}</strong>
            </div>

            <div>
              <span>Stock Available</span>
              <strong>{product.stock ?? "Not specified"}</strong>
            </div>
          </div>

          <h3 className="product-detail-size-title">
            Available Sizes
          </h3>

          <div className="product-detail-sizes">
            {Array.isArray(product.sizes) && product.sizes.length > 0
              ? product.sizes.map((size, index) => (
                  <span key={index}>{size}</span>
                ))
              : <span>Not specified</span>
            }
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;


