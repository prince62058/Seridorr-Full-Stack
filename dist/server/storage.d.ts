import { type User, type InsertUser, type Service, type InsertService, type Booking, type InsertBooking, type ServiceProvider, type InsertServiceProvider, type ContactInquiry, type InsertContactInquiry } from "../shared/schema";
export interface IStorage {
    getUser(id: number): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    createUser(insertUser: InsertUser): Promise<User>;
    updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;
    getServices(): Promise<Service[]>;
    getServicesByCategory(category: string): Promise<Service[]>;
    getService(id: number): Promise<Service | undefined>;
    createService(insertService: InsertService): Promise<Service>;
    updateService(id: number, updates: Partial<InsertService>): Promise<Service | undefined>;
    getBookings(): Promise<Booking[]>;
    getBookingsByUser(userId: number): Promise<Booking[]>;
    getBooking(id: number): Promise<Booking | undefined>;
    createBooking(insertBooking: InsertBooking): Promise<Booking>;
    updateBooking(id: number, updates: Partial<InsertBooking>): Promise<Booking | undefined>;
    getServiceProviders(): Promise<ServiceProvider[]>;
    getServiceProvider(id: number): Promise<ServiceProvider | undefined>;
    createServiceProvider(insertProvider: InsertServiceProvider): Promise<ServiceProvider>;
    updateServiceProvider(id: number, updates: Partial<InsertServiceProvider>): Promise<ServiceProvider | undefined>;
    getContactInquiries(): Promise<ContactInquiry[]>;
    createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry>;
    updateContactInquiry(id: number, updates: Partial<InsertContactInquiry>): Promise<ContactInquiry | undefined>;
}
export declare class DatabaseStorage implements IStorage {
    getUser(id: number): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    createUser(insertUser: InsertUser): Promise<User>;
    updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;
    getServices(): Promise<Service[]>;
    getServicesByCategory(category: string): Promise<Service[]>;
    getService(id: number): Promise<Service | undefined>;
    createService(insertService: InsertService): Promise<Service>;
    updateService(id: number, updates: Partial<InsertService>): Promise<Service | undefined>;
    getBookings(): Promise<Booking[]>;
    getBookingsByUser(userId: number): Promise<Booking[]>;
    getBooking(id: number): Promise<Booking | undefined>;
    createBooking(insertBooking: InsertBooking): Promise<Booking>;
    updateBooking(id: number, updates: Partial<InsertBooking>): Promise<Booking | undefined>;
    getServiceProviders(): Promise<ServiceProvider[]>;
    getServiceProvider(id: number): Promise<ServiceProvider | undefined>;
    createServiceProvider(insertProvider: InsertServiceProvider): Promise<ServiceProvider>;
    updateServiceProvider(id: number, updates: Partial<InsertServiceProvider>): Promise<ServiceProvider | undefined>;
    getContactInquiries(): Promise<ContactInquiry[]>;
    createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry>;
    updateContactInquiry(id: number, updates: Partial<InsertContactInquiry>): Promise<ContactInquiry | undefined>;
}
export declare const storage: DatabaseStorage;
//# sourceMappingURL=storage.d.ts.map