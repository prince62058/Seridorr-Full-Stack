const { pgTable, serial, text, timestamp, varchar, boolean, integer } = require('drizzle-orm/pg-core');
const { relations } = require('drizzle-orm');

// Users table
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  fullName: text('full_name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Services table
const services = pgTable('services', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  description: text('description'),
  price: integer('price').notNull(), // Price in paise (₹1 = 100 paise)
  duration: integer('duration'), // Duration in minutes
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Bookings table
const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  serviceId: integer('service_id').references(() => services.id),
  scheduledDate: timestamp('scheduled_date').notNull(),
  address: text('address').notNull(),
  notes: text('notes'),
  status: varchar('status', { length: 20 }).default('pending'), // pending, confirmed, completed, cancelled
  totalAmount: integer('total_amount').notNull(), // Total amount in paise
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Service providers table
const serviceProviders = pgTable('service_providers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  specialization: varchar('specialization', { length: 100 }).notNull(),
  experience: integer('experience'), // Years of experience
  rating: integer('rating').default(0), // Rating out of 5 (stored as integer, divide by 100 for decimal)
  isAvailable: boolean('is_available').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Contact inquiries table
const contactInquiries = pgTable('contact_inquiries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  subject: varchar('subject', { length: 200 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 20 }).default('new'), // new, responded, closed
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  serviceProviders: many(serviceProviders),
}));

const servicesRelations = relations(services, ({ many }) => ({
  bookings: many(bookings),
}));

const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  service: one(services, {
    fields: [bookings.serviceId],
    references: [services.id],
  }),
}));

const serviceProvidersRelations = relations(serviceProviders, ({ one }) => ({
  user: one(users, {
    fields: [serviceProviders.userId],
    references: [users.id],
  }),
}));

module.exports = {
  users,
  services,
  bookings,
  serviceProviders,
  contactInquiries,
  usersRelations,
  servicesRelations,
  bookingsRelations,
  serviceProvidersRelations
};