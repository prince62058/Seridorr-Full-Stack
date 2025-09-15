"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceProvidersRelations = exports.bookingsRelations = exports.servicesRelations = exports.usersRelations = exports.contactInquiries = exports.serviceProviders = exports.bookings = exports.services = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Users table
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    username: (0, pg_core_1.varchar)('username', { length: 50 }).notNull().unique(),
    email: (0, pg_core_1.varchar)('email', { length: 100 }).notNull().unique(),
    phone: (0, pg_core_1.varchar)('phone', { length: 20 }),
    fullName: (0, pg_core_1.text)('full_name').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
// Services table
exports.services = (0, pg_core_1.pgTable)('services', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    category: (0, pg_core_1.varchar)('category', { length: 50 }).notNull(),
    description: (0, pg_core_1.text)('description'),
    price: (0, pg_core_1.integer)('price').notNull(), // Price in paise (₹1 = 100 paise)
    duration: (0, pg_core_1.integer)('duration'), // Duration in minutes
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
// Bookings table
exports.bookings = (0, pg_core_1.pgTable)('bookings', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id').references(() => exports.users.id),
    serviceId: (0, pg_core_1.integer)('service_id').references(() => exports.services.id),
    scheduledDate: (0, pg_core_1.timestamp)('scheduled_date').notNull(),
    address: (0, pg_core_1.text)('address').notNull(),
    notes: (0, pg_core_1.text)('notes'),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('pending'), // pending, confirmed, completed, cancelled
    totalAmount: (0, pg_core_1.integer)('total_amount').notNull(), // Total amount in paise
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
// Service providers table
exports.serviceProviders = (0, pg_core_1.pgTable)('service_providers', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id').references(() => exports.users.id),
    specialization: (0, pg_core_1.varchar)('specialization', { length: 100 }).notNull(),
    experience: (0, pg_core_1.integer)('experience'), // Years of experience
    rating: (0, pg_core_1.integer)('rating').default(0), // Rating out of 5 (stored as integer, divide by 100 for decimal)
    isAvailable: (0, pg_core_1.boolean)('is_available').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
// Contact inquiries table
exports.contactInquiries = (0, pg_core_1.pgTable)('contact_inquiries', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 100 }).notNull(),
    phone: (0, pg_core_1.varchar)('phone', { length: 20 }),
    subject: (0, pg_core_1.varchar)('subject', { length: 200 }),
    message: (0, pg_core_1.text)('message').notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('new'), // new, responded, closed
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
// Relations
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    bookings: many(exports.bookings),
    serviceProviders: many(exports.serviceProviders),
}));
exports.servicesRelations = (0, drizzle_orm_1.relations)(exports.services, ({ many }) => ({
    bookings: many(exports.bookings),
}));
exports.bookingsRelations = (0, drizzle_orm_1.relations)(exports.bookings, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.bookings.userId],
        references: [exports.users.id],
    }),
    service: one(exports.services, {
        fields: [exports.bookings.serviceId],
        references: [exports.services.id],
    }),
}));
exports.serviceProvidersRelations = (0, drizzle_orm_1.relations)(exports.serviceProviders, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.serviceProviders.userId],
        references: [exports.users.id],
    }),
}));
//# sourceMappingURL=schema.js.map