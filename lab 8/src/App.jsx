
import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";

function Product({ products }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td className="price">₹{p.price}</td>
            <td>{p.expiryDate}</td>
          </tr>
        ))}
        {products.length === 0 && (
          <tr><td colSpan="3">No products found.</td></tr>
        )}
      </tbody>
    </table>
  );
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(null);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    fetch("/products.csv")
      .then((res) => res.text())
      .then((csv) => {
        setProducts(
          Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
          }).data
        );
      });
  }, []);

  const filtered = limit === null
    ? products
    : products.filter((p) => p.price < limit);

  const shown = sort
    ? [...filtered].sort((a, b) => a.price - b.price)
    : filtered;

  return (
    <div className="container">
      <h1>Product List</h1>
      <p className="subtitle">Manage products and expiry dates.</p>

      {[null, 100, 200, 300, 500].map((value) => (
        <button
          key={value ?? "all"}
          onClick={() => setLimit(value)}
        >
          {value === null ? "Show All" : `Under ₹${value}`}
        </button>
      ))}

      <button onClick={() => setSort(!sort)}>
        {sort ? "Default Order" : "Sort: Low to High Price"}
      </button>

      <Product products={shown} />

      <p className="count">
        Showing {shown.length} of {products.length} products
      </p>
    </div>
  );
}
