# Dream Frame Studio - Web Application

A modern, professional web application for Dream Frame Studio - a photography and videography studio specializing in weddings, portraits, events, maternity, and newborn photography. This app includes portfolio showcase, booking system, contact forms, and is ready for Azure deployment.

## Features

- 🏠 **Home Page** - Beautiful hero section with full-screen logo background
- 📸 **Portfolio Gallery** - Filterable image gallery with category filters (Weddings, Portraits, Events, Maternity, Newborn)
- 📝 **Services** - Six comprehensive service listings
- 🎯 **Booking System** - Database-backed booking form with email notifications
- 📊 **Admin Dashboard** - View and manage all bookings in one place
- 📞 **Contact Form** - Direct contact with email integration
- 💬 **WhatsApp Integration** - Quick WhatsApp contact links
- 📷 **Instagram Integration** - Connect your Instagram portfolio
- 📧 **Email Notifications** - Automatic email alerts for bookings and contacts
- 🌐 **Azure Ready** - Configured for easy Azure deployment
- 📱 **Responsive Design** - Works perfectly on all devices

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: SQLite (easily switchable to Azure SQL)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Email**: Nodemailer
- **Deployment**: Azure App Service

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Dreamframestudio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (optional for local testing)
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=ajeevaje@gmail.com
   APP_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Visit the application**
   ```
   http://localhost:3000
   ```

## Configuration

### Email Setup (Gmail Example)

1. Enable 2-Step Verification on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in `SMTP_PASS` environment variable

### Instagram Integration

To add your Instagram photos to the portfolio:

1. **Get Instagram Image URLs:**
   - Go to your Instagram post
   - Right-click on the photo → "Copy image address"
   - Or use browser DevTools (F12) → Network tab

2. **Add to Server:**
   - Open `server.js`
   - Find the `/api/instagram` endpoint
   - Add your image URLs in the `instagramImages` array

See `INSTAGRAM_SETUP.md` for detailed instructions.

### Contact Information

Current contact details:
- **Location**: 1st floor shop no 4, Vaidya enclave, SB Temple Rd, opposite Saptagiri Orange Hotel, Halbarga, Brhampur, Kalaburagi, Karnataka 585103
- **Google Maps**: [View Location](https://maps.app.goo.gl/SgiDu4C1eo25nJHVA?g_st=aw)
- **Phone**: +91 8310900626
- **Email**: ajeevaje@gmail.com
- **WhatsApp**: +91 8310900626
- **Instagram**: [@_dream_frame_studio](https://www.instagram.com/_dream_frame_studio?igsh=MTU0cThhNDhoNThobg==)

To update contact details, edit `public/index.html`.

## Database

The app uses SQLite by default. The database file (`bookings.db`) is created automatically on first run.

### Admin Dashboard

Access the admin dashboard to view and manage all bookings:
```
http://localhost:3000/admin
```

**Features:**
- View all booking requests in a table format
- See statistics (Total, Pending, Confirmed, Cancelled)
- Update booking status (Confirm/Cancel)
- Delete bookings
- Click on email/phone to contact customers directly
- Auto-refresh functionality

**Note:** The admin dashboard is currently open access. For production, consider adding authentication.

### Database Schema

```sql
CREATE TABLE bookings (
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
);
```

## Azure Deployment

### Option 1: Azure App Service (Recommended)

1. **Create Azure App Service**
   - Go to Azure Portal
   - Create a new App Service (Node.js runtime)
   - Choose your subscription and resource group

2. **Deploy via Azure CLI**
   ```bash
   az webapp up --name dream-frame-studio --runtime "NODE:20-lts" --resource-group <your-resource-group>
   ```
   
   **Note**: Select **Node 20 LTS** (or Node 22/24 LTS) as the runtime stack in Azure Portal.

3. **Configure Environment Variables**
   - In Azure Portal, go to Configuration > Application Settings
   - Add your environment variables:
     - `SMTP_HOST` (e.g., smtp.gmail.com)
     - `SMTP_PORT` (e.g., 587)
     - `SMTP_USER` (your email)
     - `SMTP_PASS` (your app password)
     - `CONTACT_EMAIL` (ajeevaje@gmail.com)
     - `APP_URL` (your Azure app URL, e.g., https://dream-frame-studio.azurewebsites.net)
     - `PORT` (usually set automatically by Azure)

4. **Deploy Database**
   - For production, consider using Azure SQL Database
   - Update `server.js` to use Azure SQL connection

### Option 2: Azure Container Instances

1. Create a Dockerfile (included in project)
2. Build and push to Azure Container Registry
3. Deploy to Azure Container Instances

### Option 3: GitHub Actions + Azure

The project includes `azure-pipelines.yml` for CI/CD deployment.

## Services Offered

1. **Wedding Photography** - Elegant and timeless wedding photography
2. **Wedding Videography** - Cinematic wedding films
3. **Portrait Sessions** - Professional portraits for individuals, families, and couples
4. **Event Photography** - Corporate events, parties, and celebrations
5. **Maternity Photography** - Beautiful photography for expecting mothers
6. **Newborn Photography** - Professional newborn photography sessions

## Project Structure

```
Dreamframestudio/
├── server.js              # Express server and API endpoints
├── package.json           # Dependencies and scripts
├── web.config             # Azure IIS configuration
├── Dockerfile             # Docker configuration for container deployment
├── azure-pipelines.yml    # Azure DevOps pipeline
├── .gitignore            # Git ignore rules
├── README.md             # This file
├── INSTAGRAM_SETUP.md    # Instagram integration guide
└── public/               # Frontend files
    ├── index.html        # Main HTML page
    ├── admin.html        # Admin dashboard
    ├── styles.css        # Styling
    ├── script.js         # Frontend JavaScript
    ├── instagram-loader.js # Instagram portfolio loader
    └── logo.jpg          # Studio logo
```

## API Endpoints

### POST /api/bookings
Submit a new booking request.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service_type": "Wedding Photography",
  "event_date": "2024-12-25",
  "event_time": "14:00",
  "message": "Looking forward to working with you!"
}
```

### GET /api/bookings
Get all booking requests (admin endpoint).

### PUT /api/bookings/:id
Update booking status.

**Request Body:**
```json
{
  "status": "confirmed" // or "cancelled" or "pending"
}
```

### DELETE /api/bookings/:id
Delete a booking request.

### POST /api/contact
Submit a contact form message.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I have a question about your services."
}
```

## Customization

### Adding Gallery Images

**Option 1: Instagram Integration (Recommended)**
- Follow instructions in `INSTAGRAM_SETUP.md`
- Add Instagram image URLs to `server.js`

**Option 2: Manual Images**
- Replace placeholder images in `public/index.html`
- Or add images to `public/images/` folder and reference them

### Changing Colors

The app uses a black and white theme. Update CSS variables in `public/styles.css`:
```css
:root {
  --primary-color: #000000;
  --secondary-color: #1a1a1a;
  --accent-color: #ffffff;
  --black: #000000;
  --white: #ffffff;
}
```

### Adding Services

Add new service cards in the Services section of `index.html`.

## Support

For issues or questions, please contact:
- **Email**: ajeevaje@gmail.com
- **Phone**: +91 8310900626
- **WhatsApp**: [Chat with us](https://wa.me/918310900626)
- **Instagram**: [@_dream_frame_studio](https://www.instagram.com/_dream_frame_studio?igsh=MTU0cThhNDhoNThobg==)
- **Location**: Kalaburagi, Karnataka, India

## License

MIT License - Feel free to use this project for your studio!

---

**Dream Frame Studio** - Capturing Your Precious Moments ✨

