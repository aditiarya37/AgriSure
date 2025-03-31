import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "/src/components/redux/action/AddCart";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  // Hardcoded product data with local image paths (store these in `public/images/products/`)
  const [data, setData] = useState([
    {
      id: 1,
      title: "Organic Fertilizer",
      price: 499,
      category: "men's clothing",
      description: "High-quality organic fertilizer for healthy crops.",
      // image: "/images/products/1.jpg", 
    },
    {
      id: 2,
      title: "Natural Pesticide",
      price: 599,
      category: "women's clothing",
      description: "Eco-friendly pesticide to protect your plants.",
      // image: "/images/products/2.jpg",
    },
    {
      id: 3,
      title: "Vermicompost",
      price: 1299,
      category: "jewelery",
      description: "Nutrient-rich compost for organic farming.",
      // image: "/images/products/3.jpg",
    },
    {
      id: 4,
      title: "Hybrid Seeds",
      price: 899,
      category: "electronics",
      description: "High-yield seeds for better harvests.",
      // image: "/images/products/4.jpg",
    },
    {
      id: 5,
      title: "Garden Tools",
      price: 699,
      category: "men's clothing",
      description: "Durable tools for farming and gardening.",
      // image: "/images/products/5.jpg",
    },
    {
      id: 6,
      title: "Irrigation Kit",
      price: 1599,
      category: "electronics",
      description: "Efficient water-saving irrigation system.",
      // image: "/images/products/6.jpg",
    },
  ]);

  const [filter, setFilter] = useState(data);
  const dispatch = useDispatch();

  // Add to cart function
  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Added to cart");
  };

  // Filter products by category
  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  // Render product cards
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            FERTILIZERS
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            PESTICIDES
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            ORGANIC FARMING
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            CROPS
          </button>
        </div>

        <div className="row">
          {filter.map((product) => (
            <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100">
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt={product.title}
                  height={300}
                  style={{ objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">₹ {product.price}</li>
                </ul>
                <div className="card-body">
                  <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>
      <ShowProducts />
    </div>
  );
};

export default Products;