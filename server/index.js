const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "echoes_book",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  } else {
    console.log("Connected to MySQL database!");
  }

  const createTableQuery = `
          CREATE TABLE IF NOT EXISTS books_inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            book_title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            published_date DATE,
            description VARCHAR(1000),
            image_url VARCHAR(255),
            category VARCHAR(50)
          )
        `;

  db.query(createTableQuery, function (err, result) {
    if (err) {
      console.error("Table creation failed:", err);
      process.exit(1); // Exit the process with an error code
    } else {
      console.log("Table created or already exists");

      // Start the server only after table creation
      //   app.listen(3002, () => {
      //     console.log("Server is running on port 3002");
      //   });
    }
  });
});

app.post("/register", async (req, res) => {
  const { Email, RegNo, UserName, Password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const SQL =
      "INSERT INTO users (email, regNo, username, password) VALUES (?, ?, ?, ?)";
    const values = [Email, RegNo, UserName, hashedPassword];

    db.query(SQL, values, (err, results) => {
      if (err) {
        console.error("Error inserting user:", err);
        res.status(500).send(err);
      } else {
        console.log("User inserted successfully!");
        res.status(200).send({ message: "User added" });
      }
    });
  } catch (err) {
    console.error("Error hashing password:", err);
    res.status(500).send({ error: "Error registering user" });
  }
});

app.post("/login", (req, res) => {
  const { LoginEmail, LoginPassword } = req.body;

  const SQL = "SELECT * FROM users WHERE email = ?";
  const values = [LoginEmail];

  db.query(SQL, values, async (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      res.status(500).send({ error: err });
    } else if (results.length > 0) {
      const user = results[0];
      const isMatch = await bcrypt.compare(LoginPassword, user.password);
      if (isMatch) {
        res.status(200).send(user);
      } else {
        res.status(400).send({ message: "Email and password don't match!" });
      }
    } else {
      res.status(400).send({ message: "Email and password don't match!" });
    }
  });
});

app.post("/upload-book", (req, res) => {
  const {
    book_title,
    author,
    published_date,
    description,
    image_url,
    category,
  } = req.body;
  const insertQuery =
    "INSERT INTO books_inventory (book_title, author, published_date, description, image_url, category) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    insertQuery,
    [book_title, author, published_date, description, image_url, category],
    (err, result) => {
      if (err) {
        console.error("Error inserting book:", err);
        res.status(500).send(err);
      } else {
        res.send({ id: result.insertId });
      }
    }
  );
});

// Get all books
app.get("/all_books", (req, res) => {
  db.query("SELECT * FROM books_inventory ", (err, results) => {
    if (err) {
      console.error("Error fetching books:", err);
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
});

// Update book data
app.put("/update-book/:id", (req, res) => {
  const { id } = req.params;
  const {
    book_title,
    author,
    published_date,
    description,
    image_url,
    category,
  } = req.body;
  const updateQuery =
    "UPDATE books_inventory SET book_title = ?, author = ?, published_date = ?, description = ?, image_url = ?, category = ? WHERE id = ?";
  db.query(
    updateQuery,
    [book_title, author, published_date, description, image_url, category, id],
    (err, result) => {
      if (err) {
        console.error("Error updating book:", err);
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Delete book
app.delete("/delete-book/:id", (req, res) => {
  const { id } = req.params;
  const deleteQuery = "DELETE FROM books_inventory WHERE id = ?";
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error("Error deleting book:", err);
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).send({ message: "Book not found" });
    } else {
      res.send({ message: "Book deleted successfully" });
    }
  });
});

// get single book
app.get("/book/:id", (req, res) => {
  const { id } = req.params;
  const selectQuery = "SELECT * FROM books_inventory WHERE id = ?";

  db.query(selectQuery, [id], (err, result) => {
    if (err) {
      console.error("Error fetching book:", err);
      res.status(500).send(err);
    } else if (result.length === 0) {
      res.status(404).send({ message: "Book not found" });
    } else {
      res.send(result[0]);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
