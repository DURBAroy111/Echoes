import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/SingleBook.scss";
import LoginNavbar from "../components/LoginNavbar";

function SingleRentBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // Store current user ID
  const [rentDays, setRentDays] = useState(1); // Default to 1 day
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/book-rent/${id}`
        );
        setBook(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:3002/protected", {
          withCredentials: true,
        });
        setUserId(response.data.id);
      } catch (err) {
        console.error("Error fetching user ID:", err);
      }
    };

    fetchBook();
    fetchUserId();
  }, [id]);

  const calculateTotalPayment = () => {
    if (book) {
      const totalPrice = rentDays * book.price;
      setTotalPayment(totalPrice);
    }
  };

  useEffect(() => {
    calculateTotalPayment();
  }, [rentDays, book]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const addToCart = async () => {
    try {
      await axios.post(
        "http://localhost:3002/add-to-rent-cart",
        { book_id: id, rent_days: rentDays, total_price: totalPayment },
        { withCredentials: true }
      );
      alert("Book added to cart successfully!");
    } catch (err) {
      console.error("Error adding book to cart:", err);
      alert("Failed to add book to cart.");
    }
  };

  const handleBuy = () => {
    navigate("/checkout", {
      state: { selectedBooks: [book], totalPayment: totalPayment },
    });
  };

  const handleUpdate = () => {
    navigate(`/edit-book-rent/${id}`, { state: { book } });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/del-book-rent/${id}`, {
        withCredentials: true,
      });
      alert("Book deleted successfully!");
      navigate("/HomeAfterLogin");
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete book.");
    }
  };

  const handleRentDaysChange = (e) => {
    const days = parseInt(e.target.value);
    if (!isNaN(days) && days >= 1 && days <= 30) {
      setRentDays(days);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading book: {error.message}</div>;

  return (
    <>
      <div style={{ marginTop: "90px" }}>
        <LoginNavbar />
      </div>
      <div className="single-book-container">
        {book && (
          <div className="book-details">
            <div className="book-images">
              {book.image_url &&
                JSON.parse(book.image_url).map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:3002${image}`}
                    alt={book.book_title}
                    className="book-image"
                  />
                ))}
            </div>
            <div className="book-info">
              <h1>{book.book_title}</h1>
              <div className="info-item">
                <strong>Author:</strong>
                <span>{book.author}</span>
              </div>
              <div className="info-item">
                <strong>Published Date:</strong>
                <span>{formatDate(book.published_date)}</span>
              </div>
              <div className="info-item">
                <strong>Description:</strong>
                <span>{book.description}</span>
              </div>
              <div className="info-item">
                <strong>Category:</strong>
                <span>{book.category}</span>
              </div>
              <div className="info-item">
                <strong>Price (Per Day):</strong>
                <span>{book.price}</span>
              </div>
              <div className="info-item">
                <strong>Rent Days:</strong>
                <input
                  type="number"
                  value={rentDays}
                  onChange={handleRentDaysChange}
                  min={1}
                  max={30}
                />
              </div>
              <div className="info-item">
                <strong>Total Price:</strong>
                <span>{totalPayment}</span>
              </div>
              <div className="buttons">
                {userId === book.user_id ? (
                  <>
                    <button className="cart-button" onClick={handleUpdate}>
                      Update
                    </button>
                    <button className="buy-button" onClick={handleDelete}>
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button className="cart-button" onClick={addToCart}>
                      Add To Cart
                    </button>
                    <button className="buy-button" onClick={handleBuy}>
                      Rent
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SingleRentBook;
