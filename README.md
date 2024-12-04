
# Real Estate Management System

This project is a Real Estate Management System that allows users to view property listings and their detailed pages, managed dynamically through an admin panel. Admins can easily add, edit, or remove properties without directly interacting with the code, thanks to the use of JSON files and a backend server. Additionally, the system includes a Contact Us form that uses NodeMailer to send messages to the admin's email.




## Features
User Features:
View all available property listings as cards.
Click on a property card to view its detailed page with:
Title
Multiple images with scrolling
Descriptions
Responsive design for better user experience.

Admin Features:
Manage property listings dynamically:
Add new properties.
Edit or delete existing properties.
Update property details such as images, title, or descriptions.
JSON-based data storage for cards and detailed pages.
Easily manage images and details for properties.

Additional Features:

Contact Us Form:
Users can fill out a contact form.
Admin receives the details via email using NodeMailer.



## Update the email credentials in server.

```javascript
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password"
  }
});

```

