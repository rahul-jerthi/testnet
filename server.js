const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Example: Use Gmail SMTP (you can configure any SMTP service)
  auth: {
    user: 'jaisaini6167@gmail.com', // Use your Gmail address here
    pass: 'nrhrkxxglietqrdy',   // Use your Gmail password or App-specific password
  },
});

// Form route to collect name and email
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required><br><br>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br><br>

      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  // Setup email data
  const mailOptions = {
    from: email, // From user's email
    to: 'rahujerthi@gmail.com', // Admin's email where the data will be sent
    subject: 'New Form Submission',
    text: `You have a new submission:\n\nName: ${name}\nEmail: ${email}`,
  };

  // Send email with Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send('Error: ' + error.message);
    }
    res.send('Submission successful! Thank you for contacting us.');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
