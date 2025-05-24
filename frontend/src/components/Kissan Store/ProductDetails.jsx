// src/components/ProductDetails/ProductDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css";

// Hardcoded product data
const productsData = [
  {
    id: 1,
    title: "Organic Fertilizer",
    price: 499,
    category: "men's clothing",
    description: "High-quality organic fertilizer for healthy crops.",
    image: "/src/assets/products/1.jpeg",
    vendor: { name: "Green Grow Supplies", address: "Market Road, Punjab" },
    details:
      "This organic fertilizer is made from natural ingredients that help improve soil fertility and promote healthy crop growth. Ideal for small and large scale farming.",
  },
  {
    id: 2,
    title: "Natural Pesticide",
    price: 599,
    category: "women's clothing",
    description: "Eco-friendly pesticide to protect your plants.",
    image: "/src/assets/products/2.jpeg",
    vendor: { name: "EcoFarm Essentials", address: "Agri Market, Maharashtra" },
    details:
      "Our natural pesticide is formulated to control pests without harmful chemicals, ensuring a safe environment for your crops and beneficial insects.",
  },
  {
    id: 3,
    title: "Vermicompost",
    price: 1299,
    category: "jewelery",
    description: "Nutrient-rich compost for organic farming.",
    image: "/src/assets/products/3.jpeg",
    vendor: { name: "Soil Boosters", address: "Village Road, Rajasthan" },
    details:
      "Vermicompost is a natural fertilizer created through the decomposition of organic waste by earthworms, offering a rich source of nutrients for your plants.",
  },
  {
    id: 4,
    title: "Hybrid Seeds",
    price: 899,
    category: "electronics",
    description: "High-yield seeds for better harvests.",
    image: "/src/assets/products/4.jpeg",
    vendor: { name: "SeedSmart", address: "Seed Bazaar, Gujarat" },
    details:
      "These hybrid seeds are specially developed to yield a higher crop output, ensuring robust growth and resistance to common diseases.",
  },
  {
    id: 5,
    title: "Garden Tools",
    price: 699,
    category: "men's clothing",
    description: "Durable tools for farming and gardening.",
    image: "/src/assets/products/5.jpeg",
    vendor: { name: "Farm Tools Hub", address: "Main Street, Karnataka" },
    details:
      "Our range of garden tools includes everything from spades to pruning shears, designed for durability and ease of use in the field.",
  },
  {
    id: 6,
    title: "Irrigation Kit",
    price: 1599,
    category: "electronics",
    description: "Efficient water-saving irrigation system.",
    image: "/src/assets/products/6.jpeg",
    vendor: { name: "WaterSave Tech", address: "Irrigation Market, Tamil Nadu" },
    details:
      "This irrigation kit is an all-in-one solution that helps you efficiently water your crops, reducing water waste and ensuring even moisture distribution.",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const product = productsData.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="product-details-container">
        <h2>Product Not Found</h2>
        <Link to="/store" className="btn btn-primary">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="product-details-container container my-5">
      <div className="product-details-card">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-info">
          <h2>{product.title}</h2>
          <p className="price">₹ {product.price}</p>
          <p className="description">{product.description}</p>
          <p className="vendor-info"><strong>Vendor:</strong> {product.vendor.name}</p>
          <p className="vendor-info"><strong>Address:</strong> {product.vendor.address}</p>
          <p className="details">{product.details}</p>
          <div className="actions">
            <Link to="/store" className="btn btn-secondary">
              Back to Store
            </Link>
            <button className="btn btn-dark">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
