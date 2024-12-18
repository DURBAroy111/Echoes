import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BuyCart.scss";
import ListingCard from "./ListingCard";
import LoginNavbar from "./LoginNavbar";

const BuyCart = () => {
  const [cartBooks, setCartBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCartBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3002/cart", {
          withCredentials: true,
        });
        setCartBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCartBooks();
  }, []);

  const handleSelect = (book) => {
    let updatedSelection;
    if (selectedBooks.includes(book)) {
      updatedSelection = selectedBooks.filter((selected) => selected !== book);
    } else {
      updatedSelection = [...selectedBooks, book];
    }
    setSelectedBooks(updatedSelection);
    calculateTotal(updatedSelection);
  };

  const calculateTotal = (books) => {
    const total = books.reduce((sum, book) => sum + book.price, 0);
    setTotalPayment(total);
  };

  const handleDelete = async () => {
    if (selectedBooks.length === 0) {
      alert("Please select books to delete.");
      return;
    }

    try {
      const bookIds = selectedBooks.map((book) => book.id);
      await axios.delete("http://localhost:3002/delete_buy_cart", {
        data: { bookIds },
        withCredentials: true,
      });
      alert("Deletion successful.");
      setCartBooks(cartBooks.filter((book) => !selectedBooks.includes(book)));
      setSelectedBooks([]);
      setTotalPayment(0);
    } catch (err) {
      alert("Error deleting books. Please try again.");
    }
  };

  const handleBuy = () => {
    if (selectedBooks.length === 0) {
      alert("Please select books to buy.");
      return;
    }
    navigate("/checkout", { state: { selectedBooks, totalPayment } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart: {error.message}</div>;

  return (
    <>
      <div>
        <LoginNavbar />
      </div>
      <div className="cart-container">
        <h2>Viewing Cart</h2>
        <div className="listing-cards-container">
          {cartBooks.length === 0 ? (
            <div>Your cart is empty</div>
          ) : (
            cartBooks.map((book) => (
              <div key={book.id} className="listing-card-wrapper">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={selectedBooks.includes(book)}
                    onChange={() => handleSelect(book)}
                  />
                </div>
                <div className="listing-card">
                  <ListingCard book={book} />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="total-payment">
          <h3>Total Payment: TK {(Number(totalPayment) || 0).toFixed(2)}</h3>
        </div>
        <div className="cart-actions">
          <button onClick={handleBuy}>Buy</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default BuyCart;
