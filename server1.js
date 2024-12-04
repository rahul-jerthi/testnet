const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set up storage for multer to save uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store images in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
  }
});
const upload = multer({ storage: storage });

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Example: Use Gmail SMTP (you can configure any SMTP service)
  auth: {
    user: 'jaisaini6167@gmail.com', // Use your Gmail address here
    pass: 'nrhrkxxglietqrdy',   // Use your Gmail password or App-specific password
  },
});

// Form route to collect name, email, and image
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="POST" enctype="multipart/form-data">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required><br><br>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br><br>

      <label for="image">Upload an Image:</label>
      <input type="file" id="image" name="image" accept="image/*" required><br><br>

      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form submission
app.post('/submit', upload.single('image'), (req, res) => {
  const { name, email } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    return res.send('Error: No image file uploaded.');
  }

  // Setup email data
  const mailOptions = {
    from: email, // From user's email
    to: 'rahujerthi@gmail.com', // Admin's email where the data will be sent
    subject: 'New Form Submission with Image',
    text: `You have a new submission:\n\nName: ${name}\nEmail: ${email}`,
    attachments: [
      {
        filename: imageFile.originalname,  // Original file name
        path: imageFile.path,              // Path to the uploaded file
        cid: 'image001'                    // Optional: Inline image embedding (if needed)
      }
    ],
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
