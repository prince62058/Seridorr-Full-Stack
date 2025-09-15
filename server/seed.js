const { storage } = require('./storage');

// Seed services data
async function seedDatabase() {
  try {
    // Check if services already exist
    const existingServices = await storage.getServices();
    if (existingServices.length > 0) {
      console.log('✅ Database already seeded with', existingServices.length, 'services');
      return;
    }

    // Insert seed services
    const services = [
      {
        name: 'Leaky Faucet Repair',
        description: 'Fix minor leaks in faucets and pipes',
        price: 5000, // 50 INR in paise
        category: 'repair',
        duration: 120,
      },
      {
        name: 'Water Heater Installation',
        description: 'Install new water heater systems',
        price: 10000, // 100 INR in paise
        category: 'repair',
        duration: 180,
      },
      {
        name: 'Full Home Cleaning',
        description: 'Deep cleaning of entire house',
        price: 10000, // 100 INR in paise
        category: 'cleaning',
        duration: 240,
      },
      {
        name: 'Haircut & Styling',
        description: 'Professional hairstyling at home',
        price: 5000, // 50 INR in paise
        category: 'beauty',
        duration: 120,
      },
      {
        name: 'AC Repair',
        description: 'Fix and service air conditioning units',
        price: 7500, // 75 INR in paise
        category: 'repair',
        duration: 180,
      },
      {
        name: 'Fan Installation',
        description: 'Install and replace ceiling fans and lighting',
        price: 7500, // 75 INR in paise
        category: 'repair',
        duration: 120,
      },
      {
        name: 'Switchboard Repair',
        description: 'Repair faulty switchboards and electrical outlets',
        price: 5000, // 50 INR in paise
        category: 'repair',
        duration: 90,
      },
      {
        name: 'Bathroom Deep Cleaning',
        description: 'Deep cleaning of bathroom surfaces, tiles, and fixtures',
        price: 7500, // 75 INR in paise
        category: 'cleaning',
        duration: 120,
      },
      {
        name: 'Full Body Massage',
        description: 'Relaxing full body massage therapy at home',
        price: 10000, // 100 INR in paise
        category: 'beauty',
        duration: 180,
      },
      {
        name: 'Kitchen Chimney Cleaning',
        description: 'Deep cleaning of kitchen chimneys to remove grease and soot',
        price: 10000, // 100 INR in paise
        category: 'cleaning',
        duration: 150,
      },
      {
        name: 'Pest Control (Cockroach)',
        description: 'Treatment to remove cockroaches from home',
        price: 15000, // 150 INR in paise
        category: 'home',
        duration: 240,
      },
      {
        name: 'Pest Control (Termite)',
        description: 'Termite control service with safe chemicals',
        price: 20000, // 200 INR in paise
        category: 'home',
        duration: 300,
      },
      {
        name: 'AC Service',
        description: 'Routine service of window and split AC units',
        price: 10000, // 100 INR in paise
        category: 'repair',
        duration: 120,
      },
      {
        name: 'Refrigerator Repair',
        description: 'Servicing and minor repairs of refrigerators',
        price: 8000, // 80 INR in paise
        category: 'repair',
        duration: 150,
      },
    ];

    for (const service of services) {
      await storage.createService(service);
    }

    console.log('✅ Database seeded with', services.length, 'services');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

module.exports = { seedDatabase };