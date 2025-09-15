const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Cache control headers for Replit environment
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Database storage
const { storage } = require('./server/storage');
const { seedDatabase } = require('./server/seed');

// Helper function to get service images
function getServiceImage(category, name) {
  const imageMap = {
    'Leaky Faucet Repair': '/assets/faucet_images.png',
    'Water Heater Installation': '/assets/water_heater.png',
    'Full Home Cleaning': '/assets/cleaning_tools.png',
    'Haircut & Styling': '/assets/barbar_image.png',
    'AC Repair': '/assets/ac_image.png',
    'Fan Installation': '/assets/fan_image.png',
    'Switchboard Repair': '/assets/services/switches_images.png',
    'Bathroom Deep Cleaning': '/assets/services/toilet_seat_image.png',
    'Full Body Massage': '/assets/services/massage_images.png'
  };
  
  return imageMap[name] || '/assets/service1.png';
}

// API Routes
app.get('/api/services', async (req, res) => {
  try {
    const services = await storage.getServices();
    // Add compatibility fields for frontend
    const servicesWithCompatibility = services.map(service => ({
      ...service,
      price: service.price / 100, // Convert from paise to rupees for display
      image: getServiceImage(service.category, service.name),
      rating: 4.5 + Math.random() * 0.5, // Mock rating for now
      reviews: Math.floor(Math.random() * 100) + 20, // Mock reviews
      availability: 'available'
    }));
    res.json(servicesWithCompatibility);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

app.get('/api/services/:id', async (req, res) => {
  try {
    const service = await storage.getService(parseInt(req.params.id));
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    // Add compatibility fields
    const serviceWithCompatibility = {
      ...service,
      price: service.price / 100, // Convert from paise to rupees
      image: getServiceImage(service.category, service.name),
      rating: 4.5 + Math.random() * 0.5,
      reviews: Math.floor(Math.random() * 100) + 20,
      availability: 'available'
    };
    res.json(serviceWithCompatibility);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const booking = {
      serviceId: req.body.serviceId,
      scheduledDate: new Date(req.body.scheduledDate),
      address: req.body.address,
      notes: req.body.notes || '',
      totalAmount: (req.body.totalAmount || 0) * 100, // Convert to paise
      status: 'confirmed'
    };
    
    const createdBooking = await storage.createBooking(booking);
    
    // Format response for frontend compatibility
    const response = {
      id: 'ORD' + createdBooking.id.toString().padStart(6, '0'),
      ...req.body,
      status: 'confirmed',
      createdAt: createdBooking.createdAt,
      estimatedTime: '2-4 hours'
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await storage.getBookings();
    // Format for frontend compatibility
    const formattedBookings = bookings.map(booking => ({
      id: 'ORD' + booking.id.toString().padStart(6, '0'),
      serviceId: booking.serviceId,
      scheduledDate: booking.scheduledDate,
      address: booking.address,
      notes: booking.notes,
      status: booking.status,
      createdAt: booking.createdAt,
      totalAmount: booking.totalAmount / 100, // Convert from paise
      estimatedTime: '2-4 hours'
    }));
    res.json(formattedBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.get('/api/bookings/:id', async (req, res) => {
  try {
    // Parse order ID (remove ORD prefix)
    const numericId = parseInt(req.params.id.replace('ORD', ''));
    const booking = await storage.getBooking(numericId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    const formattedBooking = {
      id: 'ORD' + booking.id.toString().padStart(6, '0'),
      serviceId: booking.serviceId,
      scheduledDate: booking.scheduledDate,
      address: booking.address,
      notes: booking.notes,
      status: booking.status,
      createdAt: booking.createdAt,
      totalAmount: booking.totalAmount / 100,
      estimatedTime: '2-4 hours'
    };
    
    res.json(formattedBooking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

app.put('/api/bookings/:id', async (req, res) => {
  try {
    const numericId = parseInt(req.params.id.replace('ORD', ''));
    const updates = { ...req.body };
    if (updates.totalAmount) {
      updates.totalAmount = updates.totalAmount * 100; // Convert to paise
    }
    
    const updatedBooking = await storage.updateBooking(numericId, updates);
    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    const formattedBooking = {
      id: 'ORD' + updatedBooking.id.toString().padStart(6, '0'),
      serviceId: updatedBooking.serviceId,
      scheduledDate: updatedBooking.scheduledDate,
      address: updatedBooking.address,
      notes: updatedBooking.notes,
      status: updatedBooking.status,
      createdAt: updatedBooking.createdAt,
      totalAmount: updatedBooking.totalAmount / 100,
      estimatedTime: '2-4 hours'
    };
    
    res.json(formattedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const inquiry = await storage.createContactInquiry(req.body);
    res.json(inquiry);
  } catch (error) {
    console.error('Error creating contact inquiry:', error);
    res.status(500).json({ error: 'Failed to create inquiry' });
  }
});

// Payment processing (mock implementation)
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'inr' } = req.body;
    
    // Mock payment intent creation
    const paymentIntent = {
      id: 'pi_' + Date.now(),
      amount: amount * 100, // Convert to paise
      currency: currency,
      status: 'requires_payment_method',
      client_secret: 'pi_' + Date.now() + '_secret_' + Math.random().toString(36).substr(2, 9)
    };
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Initialize database with sample data
async function initializeSampleData() {
  try {
    await seedDatabase();
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    console.log('⚠️  Continuing without database, please check connection');
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve main index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Servidorr server running on port ${PORT}`);
  console.log(`📱 Website: http://localhost:${PORT}`);
  
  // Initialize sample data
  await initializeSampleData();
  
  console.log('✅ Server ready to accept connections');
});

module.exports = app;