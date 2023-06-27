// server.js

import express from 'express';
import sql from 'mssql';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8082;

// Database configuration
const config = {
  server: 'localhost',
  user: 'sa',
  password: '',
  database: 'Travel',
  options: {
    trustServerCertificate: true, // Needed if you're using self-signed certificates in development
  },
};

app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust the allowed origin if necessary
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE'); // Add DELETE method
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/users', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Users');
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving data from the database.');
  } finally {
    sql.close();
  }
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    await sql.connect(config);
    const result = await sql.query(
      `INSERT INTO Users (Username, Email, Password) VALUES ('${username}', '${email}', '${password}')`
    );

    res.send('User registered successfully.');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error registering user.');
  } finally {
    sql.close();
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    await sql.connect(config);
    const result = await sql.query(
      `SELECT * FROM Users WHERE Username = '${username}' AND Password = '${password}'`
    );

    if (result.recordset.length > 0) {
      // User found, login successful
      res.send('Login successful.');
    } else {
      // User not found, login failed
      res.status(401).send('Invalid credentials.');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error logging in.');
  } finally {
    sql.close();
  }
});

app.get('/trips', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM RoadTrips');
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving data from the database.');
  } finally {
    sql.close();
  }
});

app.post('/trips', async (req, res) => {
  try {
    const { destination, date, ticketsAvailable, price } = req.body;

    await sql.connect(config);
    const result = await sql.query(
      `INSERT INTO RoadTrips (Destination, Date, TicketsAvailable, Price) VALUES ('${destination}', '${date}', ${ticketsAvailable}, '${price}')`
    );

    res.send('Trip added successfully.');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error adding trip.');
  } finally {
    sql.close();
  }
});

app.delete('/trips/:id', async (req, res) => {
  try {
    const tripId = req.params.id;

    await sql.connect(config);
    const result = await sql.query(`DELETE FROM RoadTrips WHERE ID = ${tripId}`);

    res.send('Trip removed successfully.');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error removing trip.');
  } finally {
    sql.close();
  }
});


app.post('/book', async (req, res) => {
  try {
    const { tripId, userId, ticketsBooked } = req.body;

    await sql.connect(config);

    // Fetch user information from the Users table based on the userId
    const userResult = await sql.query(`SELECT * FROM Users WHERE ID = ${userId}`);
    const user = userResult.recordset[0];

    // Fetch trip information from the RoadTrips table based on the tripId
    const tripResult = await sql.query(`SELECT * FROM RoadTrips WHERE ID = ${tripId}`);
    const trip = tripResult.recordset[0];

    // Update TicketsAvailable in the RoadTrips table
    await sql.query(
      `UPDATE RoadTrips SET TicketsAvailable = TicketsAvailable - ${ticketsBooked} WHERE ID = ${tripId}`
    );

    // Insert a new entry in the Bookings table with user and trip information
    await sql.query(
      `INSERT INTO Bookings (UserId, TripId, Booker, TicketsBooked, Destination, Date, Price) VALUES (${userId}, ${tripId}, '${user.Username}', ${ticketsBooked}, '${trip.Destination}', '${trip.Date}', '${trip.Price}')`
    );

    res.send('Booking successful.');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error booking trip.');
  } finally {
    sql.close();
  }
});


app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
