const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Initialize Database
const db = new sqlite3.Database('./bookings.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    // Create bookings table
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service_type TEXT NOT NULL,
      event_date TEXT,
      event_time TEXT,
      message TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// Email configuration (configure with your SMTP settings)
let transporter = null;
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  try {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log('Email transporter configured');
  } catch (error) {
    console.log('Email transporter not configured:', error.message);
    transporter = null;
  }
} else {
  console.log('SMTP credentials not provided - email notifications disabled');
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Admin dashboard route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// API: Fetch Instagram posts
app.get('/api/instagram', async (req, res) => {
  try {
    // Instagram images - Add your Instagram image URLs here
    // To get Instagram image URLs:
    // Method 1: Right-click on Instagram photo > Copy image address
    // Method 2: Use Instagram post URL format: https://www.instagram.com/p/POST_ID/media/?size=l
    // Method 3: Use browser dev tools to get direct image URLs
    
    const instagramImages = [
      // Add your Instagram image URLs here
      // Format: { url: 'direct_image_url', category: 'wedding|portrait|event|commercial', title: 'Title', description: 'Description' }
      
      // Example (replace with your actual Instagram image URLs):
      // {
      //   url: 'https://scontent.cdninstagram.com/v/...',
      //   category: 'wedding',
      //   title: 'Wedding Celebration',
      //   description: 'Beautiful outdoor wedding'
      // },
      // {
      //   url: 'https://scontent.cdninstagram.com/v/...',
      //   category: 'portrait',
      //   title: 'Family Portrait',
      //   description: 'Family session'
      // }
    ];
    
    // If no images configured, return empty array (will use placeholder images)
    res.json({ 
      success: true, 
      images: instagramImages
    });
  } catch (error) {
    console.error('Instagram API error:', error);
    res.json({ success: false, images: [], error: error.message });
  }
});

// API: Submit booking
app.post('/api/bookings', (req, res) => {
  const { name, email, phone, service_type, event_date, event_time, message } = req.body;

  if (!name || !email || !phone || !service_type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `INSERT INTO bookings (name, email, phone, service_type, event_date, event_time, message) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [name, email, phone, service_type, event_date, event_time, message], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to save booking' });
    }

    // Send email notification to owner
    const ownerEmail = process.env.CONTACT_EMAIL || 'ajeevaje@gmail.com';
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@dreamframestudio.com',
      to: ownerEmail,
      subject: `🎬 New Booking Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000;">New Booking Request</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Service:</strong> ${service_type}</p>
            <p><strong>Event Date:</strong> ${event_date || 'Not specified'}</p>
            <p><strong>Event Time:</strong> ${event_time || 'Not specified'}</p>
            <p><strong>Message:</strong> ${message || 'No message'}</p>
          </div>
          <p style="color: #666; font-size: 12px;">View all bookings at: <a href="${process.env.APP_URL || 'http://localhost:3000'}/admin">Admin Dashboard</a></p>
        </div>
      `
    };

    // Only try to send email if transporter is configured (non-blocking)
    if (transporter) {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email error (non-blocking):', error.message);
        } else {
          console.log('Booking email sent:', info.response);
        }
      });
    } else {
      console.log('SMTP not configured - email notification skipped. Booking saved in database. View at /admin');
    }

    res.json({ 
      success: true, 
      message: 'Booking submitted successfully!',
      bookingId: this.lastID 
    });
  });
});

// API: Get all bookings (admin endpoint)
app.get('/api/bookings', (req, res) => {
  db.all('SELECT * FROM bookings ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }
    res.json(rows);
  });
});

// API: Update booking status
app.put('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  db.run('UPDATE bookings SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to update booking' });
    }
    res.json({ success: true, message: 'Booking status updated' });
  });
});

// API: Delete booking
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM bookings WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete booking' });
    }
    res.json({ success: true, message: 'Booking deleted' });
  });
});

// API: Contact form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Always return success - email is optional
  res.json({ success: true, message: 'Message sent successfully! We will get back to you soon.' });

  // Try to send email notification to owner (non-blocking)
  const ownerEmail = process.env.CONTACT_EMAIL || 'ajeevaje@gmail.com';
  const mailOptions = {
    from: process.env.SMTP_USER || 'noreply@dreamframestudio.com',
    to: ownerEmail,
    subject: `📧 New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #000;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #000;">${message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    `
  };

  // Only try to send email if transporter is configured (wrapped in try-catch for safety)
  if (transporter) {
    try {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email error (non-blocking):', error.message);
        } else {
          console.log('Contact email sent:', info.response);
        }
      });
    } catch (error) {
      console.error('Email transporter error (non-blocking):', error.message);
    }
  } else {
    console.log('SMTP not configured - email notification skipped. Contact form submitted successfully.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Dream Frame Studio server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});

