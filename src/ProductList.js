import React, { useState, useEffect } from "react";
import productsData from "./products.json";
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    setProducts(productsData.products);
    setFilteredProducts(productsData.products);
    setMaxPrice(
      Math.max(...productsData.products.map((product) => product.price))
    );
  }, []);

  useEffect(() => {
    handlePriceFilter();
  }, [minPrice, maxPrice]);

  useEffect(() => {
    handleBrandFilter();
  }, [selectedBrand]);

  useEffect(() => {
    handleSort();
  }, [sortBy]);

  const handlePriceFilter = () => {
    const filtered = products.filter(
      (product) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (selectedBrand === "" ||
          product.brand.toLowerCase().includes(selectedBrand.toLowerCase()))
    );
    setFilteredProducts(filtered);
  };

  const handleBrandFilter = () => {
    const filtered = products.filter(
      (product) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (selectedBrand === "" ||
          product.brand.toLowerCase().includes(selectedBrand.toLowerCase()))
    );
    setFilteredProducts(filtered);
  };

  const handleSort = () => {
    let sortedProducts = [...filteredProducts];
    if (sortBy === "name") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "brand") {
      sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand));
    }
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="product-page-container">
      <div className="sidebar">
        <h2>Filters</h2>
        <div className="filter-section">
          <h3>Price Range</h3>
          <div className="price-filter">
            <input
              type="number"
              placeholder="Min"
              min={0}
              max={maxPrice}
              value={minPrice === 0 ? "" : minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              min={minPrice}
              max={maxPrice}
              value={maxPrice === 0 ? "" : maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="filter-section">
          <h3>Brand</h3>
          <input
            type="text"
            placeholder="Search Brand"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          />
        </div>
      </div>
      <div className="product-list">
        <div className="sort-section">
          <span>Sort By:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Select</option>
            <option value="name">Name</option>
            <option value="brand">Brand</option>
          </select>
        </div>
        <div className="grid-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="grid-item">
                <img src={product.thumbnail} alt={product.title} />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p>Brand: {product.brand}</p>
                  <p>Price: ${product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <div>No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
