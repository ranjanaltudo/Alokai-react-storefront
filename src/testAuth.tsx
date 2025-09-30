import React, { useEffect, useState } from "react";
import { fetchProductById } from "./services/OrderCloudService";

const TestAuth = () => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        // Replace with your actual product ID
        const data = await fetchProductById("DAIRYMILK-100G");
        console.log("Fetched product data:", data); // Console log here
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, []);
  return (
    <div>
      {product ? (
        <div>
          <h3>{product.name}</h3>
          <p>ID: {product.id}</p>
          <p>{product.description || "No description available"}</p>
        </div>
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
};

export default TestAuth;
