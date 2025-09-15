const { 
  users, 
  services, 
  bookings, 
  serviceProviders, 
  contactInquiries 
} = require("../shared/schema");
const { db } = require("./db");
const { eq, desc, and } = require("drizzle-orm");

// Database storage implementation
class DatabaseStorage {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser) {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id, updates) {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Service operations
  async getServices() {
    return await db.select().from(services).where(eq(services.isActive, true));
  }

  async getServicesByCategory(category) {
    return await db.select().from(services).where(
      and(eq(services.category, category), eq(services.isActive, true))
    );
  }

  async getService(id) {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async createService(insertService) {
    const [service] = await db
      .insert(services)
      .values(insertService)
      .returning();
    return service;
  }

  async updateService(id, updates) {
    const [service] = await db
      .update(services)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return service || undefined;
  }

  // Booking operations
  async getBookings() {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBookingsByUser(userId) {
    return await db.select().from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));
  }

  async getBooking(id) {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async createBooking(insertBooking) {
    const [booking] = await db
      .insert(bookings)
      .values(insertBooking)
      .returning();
    return booking;
  }

  async updateBooking(id, updates) {
    const [booking] = await db
      .update(bookings)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return booking || undefined;
  }

  // Contact inquiry operations
  async getContactInquiries() {
    return await db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  }

  async createContactInquiry(insertInquiry) {
    const [inquiry] = await db
      .insert(contactInquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }

  async updateContactInquiry(id, updates) {
    const [inquiry] = await db
      .update(contactInquiries)
      .set(updates)
      .where(eq(contactInquiries.id, id))
      .returning();
    return inquiry || undefined;
  }
}

const storage = new DatabaseStorage();

module.exports = { storage, DatabaseStorage };