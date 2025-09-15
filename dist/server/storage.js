"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.DatabaseStorage = void 0;
const schema_1 = require("../shared/schema");
const db_1 = require("./db");
const drizzle_orm_1 = require("drizzle-orm");
// Database storage implementation
class DatabaseStorage {
    // User operations
    async getUser(id) {
        const [user] = await db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
        return user || undefined;
    }
    async getUserByUsername(username) {
        const [user] = await db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.username, username));
        return user || undefined;
    }
    async getUserByEmail(email) {
        const [user] = await db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email));
        return user || undefined;
    }
    async createUser(insertUser) {
        const [user] = await db_1.db
            .insert(schema_1.users)
            .values(insertUser)
            .returning();
        return user;
    }
    async updateUser(id, updates) {
        const [user] = await db_1.db
            .update(schema_1.users)
            .set({ ...updates, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
            .returning();
        return user || undefined;
    }
    // Service operations
    async getServices() {
        return await db_1.db.select().from(schema_1.services).where((0, drizzle_orm_1.eq)(schema_1.services.isActive, true));
    }
    async getServicesByCategory(category) {
        return await db_1.db.select().from(schema_1.services).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.services.category, category), (0, drizzle_orm_1.eq)(schema_1.services.isActive, true)));
    }
    async getService(id) {
        const [service] = await db_1.db.select().from(schema_1.services).where((0, drizzle_orm_1.eq)(schema_1.services.id, id));
        return service || undefined;
    }
    async createService(insertService) {
        const [service] = await db_1.db
            .insert(schema_1.services)
            .values(insertService)
            .returning();
        return service;
    }
    async updateService(id, updates) {
        const [service] = await db_1.db
            .update(schema_1.services)
            .set({ ...updates, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.services.id, id))
            .returning();
        return service || undefined;
    }
    // Booking operations
    async getBookings() {
        return await db_1.db.select().from(schema_1.bookings).orderBy((0, drizzle_orm_1.desc)(schema_1.bookings.createdAt));
    }
    async getBookingsByUser(userId) {
        return await db_1.db.select().from(schema_1.bookings)
            .where((0, drizzle_orm_1.eq)(schema_1.bookings.userId, userId))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.bookings.createdAt));
    }
    async getBooking(id) {
        const [booking] = await db_1.db.select().from(schema_1.bookings).where((0, drizzle_orm_1.eq)(schema_1.bookings.id, id));
        return booking || undefined;
    }
    async createBooking(insertBooking) {
        const [booking] = await db_1.db
            .insert(schema_1.bookings)
            .values(insertBooking)
            .returning();
        return booking;
    }
    async updateBooking(id, updates) {
        const [booking] = await db_1.db
            .update(schema_1.bookings)
            .set({ ...updates, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.bookings.id, id))
            .returning();
        return booking || undefined;
    }
    // Service provider operations
    async getServiceProviders() {
        return await db_1.db.select().from(schema_1.serviceProviders).where((0, drizzle_orm_1.eq)(schema_1.serviceProviders.isAvailable, true));
    }
    async getServiceProvider(id) {
        const [provider] = await db_1.db.select().from(schema_1.serviceProviders).where((0, drizzle_orm_1.eq)(schema_1.serviceProviders.id, id));
        return provider || undefined;
    }
    async createServiceProvider(insertProvider) {
        const [provider] = await db_1.db
            .insert(schema_1.serviceProviders)
            .values(insertProvider)
            .returning();
        return provider;
    }
    async updateServiceProvider(id, updates) {
        const [provider] = await db_1.db
            .update(schema_1.serviceProviders)
            .set({ ...updates, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.serviceProviders.id, id))
            .returning();
        return provider || undefined;
    }
    // Contact inquiry operations
    async getContactInquiries() {
        return await db_1.db.select().from(schema_1.contactInquiries).orderBy((0, drizzle_orm_1.desc)(schema_1.contactInquiries.createdAt));
    }
    async createContactInquiry(insertInquiry) {
        const [inquiry] = await db_1.db
            .insert(schema_1.contactInquiries)
            .values(insertInquiry)
            .returning();
        return inquiry;
    }
    async updateContactInquiry(id, updates) {
        const [inquiry] = await db_1.db
            .update(schema_1.contactInquiries)
            .set(updates)
            .where((0, drizzle_orm_1.eq)(schema_1.contactInquiries.id, id))
            .returning();
        return inquiry || undefined;
    }
}
exports.DatabaseStorage = DatabaseStorage;
exports.storage = new DatabaseStorage();
//# sourceMappingURL=storage.js.map