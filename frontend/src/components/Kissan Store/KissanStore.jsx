// src/components/KissanStore/KissanStore.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "./KissanStore.css";

const KissanStore = () => {
  // --- Hero Section ---
  const heroSection = (
    <div className="hero border-1 pb-3">
      <div className="card bg-dark text-white border-0 mx-3">
        <img
          className="card-img img-fluid"
          src="/src/assets/main.webp"
          alt="Card"
          height={350}
          style={{
            height: "350px",
            filter: "brightness(0.6)",
            objectFit: "cover",
          }}
        />
        <div className="card-img-overlay d-flex align-items-center justify-content-center text-center">
          <div className="container">
            <h5 className="card-title display-4 fw-bold mb-3">KISSAN STORE</h5>
            <p
              className="card-text fs-5 d-none d-sm-block mx-auto"
              style={{ maxWidth: "600px" }}
            >
              AGRI SURE brings you Kissan Store. Your one-stop solution for all your farm needs, from fertilizers to organic farming products—we've got you covered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Products Data ---
  const productsData = [
    {
      id: 1,
      title: "Organic Fertilizer",
      price: 499,
      category: "Fertilizers",
      description: "High-quality organic fertilizer for healthy crops.",
      image: "/src/assets/products/1.jpeg",
      vendor: { name: "Green Grow Supplies", address: "Market Road, Punjab" },
    },
    {
      id: 2,
      title: "Natural Pesticide",
      price: 599,
      category: "Pesticides",
      description: "Eco-friendly pesticide to protect your plants.",
      image: "/src/assets/products/2.jpeg",
      vendor: { name: "EcoFarm Essentials", address: "Agri Market, Maharashtra" },
    },
    {
      id: 3,
      title: "Vermicompost",
      price: 1299,
      category: "Organic Farming",
      description: "Nutrient-rich compost for organic farming.",
      image: "/src/assets/products/3.jpeg",
      vendor: { name: "Soil Boosters", address: "Village Road, Rajasthan" },
    },
    {
      id: 4,
      title: "Hybrid Seeds",
      price: 899,
      category: "Crops",
      description: "High-yield seeds for better harvests.",
      image: "/src/assets/products/4.jpeg",
      vendor: { name: "SeedSmart", address: "Seed Bazaar, Gujarat" },
    },
    {
      id: 5,
      title: "Garden Tools",
      price: 699,
      category: "Tools",
      description: "Durable tools for farming and gardening.",
      image: "/src/assets/products/5.jpeg",
      vendor: { name: "Farm Tools Hub", address: "Main Street, Karnataka" },
    },
    {
      id: 6,
      title: "Irrigation Kit",
      price: 1599,
      category: "Irrigation",
      description: "Efficient water-saving irrigation system.",
      image: "/src/assets/products/6.jpeg",
      vendor: { name: "WaterSave Tech", address: "Irrigation Market, Tamil Nadu" },
    },
  ];

  const [data, setData] = useState(productsData);
  const [filter, setFilter] = useState(productsData);

  const filterProduct = (category) => {
    setFilter(category === "All" ? data : data.filter((item) => item.category === category));
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-4">
          {["All", "Fertilizers", "Pesticides", "Organic Farming", "Crops", "Tools", "Irrigation"].map((category) => (
            <button key={category} className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct(category)}>
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="row">
          {filter.map((product) => (
            <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100">
                <img className="card-img-top p-3" src={product.image} alt={product.title} height={250} style={{ objectFit: "contain" }} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="vendor-info"><strong>Vendor:</strong> {product.vendor.name}</p>
                  <p className="vendor-info"><strong>Address:</strong> {product.vendor.address}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">₹ {product.price}</li>
                </ul>
                <div className="card-body">
                  <Link to={`/product/${product.id}`} className="btn btn-dark m-1">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="kissan-store-container">
      {heroSection}
      <div className="products-section container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <ShowProducts />
      </div>
    </div>
  );
};

export default KissanStore;
