# Servidorr - Home Services Booking Platform

Live Link: https://prince62058.github.io/Seridorr-Full-Stack/

**Seamless Services, Delivered Instantly** 🏠✨

Servidorr is a comprehensive home services booking platform that connects customers with trusted professionals for various services including repairs, cleaning, beauty treatments, and maintenance. Built with modern web technologies, it provides a seamless experience for both service seekers and providers.

## 🚀 Features

### For Customers
- **Service Browsing**: Explore a wide range of home services across multiple categories
- **Easy Booking**: Simple and intuitive booking process with date/time selection
- **Order Management**: Track all your bookings and service history
- **User Profiles**: Manage personal information and preferences
- **Status Updates**: Check booking status and service information
- **Payment Integration**: Mock payment processing (demo mode)

### For Service Providers
- **Profile Management**: Demo profile management (client-side only)
- **Service Listings**: View predefined service offerings
- **Booking Management**: View booking demonstrations
- **Rating System**: Mock rating display (demo data)

### Service Categories
- 🔧 **Repairs**: Plumbing, electrical, AC repair, appliance fixes
- 🧹 **Cleaning**: Full home cleaning, bathroom deep cleaning, kitchen chimney
- 💄 **Beauty & Wellness**: Haircuts, styling, massage therapy
- 🏠 **Home Services**: Pest control, installations, maintenance
- ⚡ **Emergency Services**: Quick response for urgent repairs

## 🛠️ Tech Stack

### Frontend
- **HTML5/CSS3**: Semantic markup and modern styling
- **JavaScript**: Vanilla JS for dynamic interactions
- **Bootstrap 5**: Responsive design framework
- **Font Awesome**: Icon library
- **AOS**: Animate On Scroll library for smooth animations

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **PostgreSQL**: Robust relational database
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: Serverless PostgreSQL hosting

### Additional Technologies
- **Mock Payment**: Demo payment processing (no real transactions)
- **RESTful APIs**: Clean API architecture
- **Responsive Design**: Mobile-first approach

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (or use provided Neon setup)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/servidorr.git
cd servidorr
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory or ensure these environment variables are set:
```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

### 4. Database Setup
```bash
# Push the database schema
npx drizzle-kit push --force

# Note: The server automatically seeds the database with sample services on startup
```

### 5. Start the Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
servidorr/
├── assets/                 # Static assets (images, videos)
│   ├── services/          # Service-specific images
│   └── videos/           # Background videos
├── pages/                 # HTML pages
│   ├── booking.html      # Service booking page
│   ├── login.html        # User authentication
│   ├── orders.html       # Order management
│   ├── profile.html      # User profile
│   ├── services.html     # Service catalog
│   └── signup.html       # User registration
├── scripts/              # JavaScript files
│   ├── main.js          # Core application logic
│   ├── booking.js       # Booking functionality
│   ├── animations.js    # Animation controllers
│   └── [page].js        # Page-specific scripts
├── styles/               # CSS stylesheets
│   ├── main.css         # Global styles
│   ├── animations.css   # Animation styles
│   └── [page].css       # Page-specific styles
├── server/               # Backend code
│   ├── db.js            # Database connection
│   ├── storage.js       # Data access layer
│   └── seed.js          # Database seeding
├── shared/               # Shared code
│   └── schema.js        # Database schema definitions
├── server.js            # Main server file
├── drizzle.config.js    # Database configuration
└── package.json         # Project dependencies
```

## 🔌 API Endpoints

### Services
- `GET /api/services` - Get all available services
- `GET /api/services/:id` - Get specific service details

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get specific booking
- `PUT /api/bookings/:id` - Update booking status

### Contact
- `POST /api/contact` - Submit contact inquiry

### Health Check
- `GET /api/health` - Server health status

### Payment
- `POST /api/create-payment-intent` - Create mock payment intent (demo only)

## 🎯 Usage Guide

### For Customers

1. **Browse Services**: Visit the homepage to explore available services
2. **Demo Login**: Use demo authentication (client-side only)
3. **Select Service**: Choose from various categories like repairs, cleaning, beauty
4. **Book Appointment**: Select date, time, and provide service details
5. **Make Payment**: Demo payment processing (no real charges)
6. **Track Order**: Monitor your booking status in the Orders section

### For Service Providers

**Note**: Service provider features are currently in demo mode with client-side data only.

1. **View Demo**: Explore service provider interface
2. **Demo Profile**: View sample provider profiles
3. **Demo Bookings**: See booking management interface
4. **Demo Features**: Experience the provider workflow

## 🔧 Configuration

### Database Configuration
The application uses Drizzle ORM with PostgreSQL. Configuration is in `drizzle.config.js`:

```javascript
module.exports = {
  schema: './shared/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
};
```

### Server Configuration
Server settings in `server.js`:
- **Port**: 5000 (configurable via environment)
- **CORS**: Enabled for cross-origin requests
- **Static Files**: Served from root directory
- **Cache Control**: Disabled for development

## 🚀 Deployment

### Using Replit
1. Import the GitHub repository to Replit
2. Set environment variables in Replit
3. The application will automatically deploy

### Manual Deployment
1. Set up a PostgreSQL database
2. Configure environment variables
3. Run `npm install` and `npm start`
4. Set up reverse proxy (nginx) if needed

## 🧪 Development

### Adding New Services
1. Update the database schema in `shared/schema.js` if needed
2. Add service data through the admin interface or seed files
3. Update frontend components to display new services

### Database Migrations
```bash
# Generate migrations (if schema changes)
npx drizzle-kit generate

# Push changes to database
npx drizzle-kit push --force
```

### Testing
Run the application locally and test:
- Service browsing and filtering
- User interface and demo authentication
- Booking process end-to-end
- Payment processing (demo mode only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Test thoroughly before submitting PRs
- Update documentation for new features
- Ensure responsive design for all changes

## 📝 License

This project is licensed under the ISC License as specified in package.json.

## 🐛 Troubleshooting

### Common Issues

**Database Connection Errors**
- Ensure `DATABASE_URL` is properly set
- Verify database is accessible and running
- Check firewall and network settings

**Server Won't Start**
- Verify all dependencies are installed (`npm install`)
- Check port 5000 is not in use
- Review error logs for specific issues

**Payment Issues**
- Note: Payment is currently in demo/mock mode
- No real payment processing occurs
- All transactions are simulated for demonstration

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check documentation and troubleshooting guide

---

**Built with ❤️ by the Servidorr Team**

*Making home services accessible and convenient for everyone*
