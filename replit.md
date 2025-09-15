# Overview

Servidorr is a service booking platform that connects customers with trusted professionals for various home services including repairs, cleaning, beauty services, and maintenance. The platform provides a seamless experience for booking services with features like user authentication, service browsing, booking management, and order tracking.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Multi-page Application**: Built with vanilla HTML, CSS, and JavaScript
- **Responsive Design**: Bootstrap 5 framework for mobile-first responsive layouts
- **Component Structure**: Organized into distinct pages (booking, services, profile, orders, login/signup)
- **Animation System**: AOS (Animate On Scroll) library with custom animation controllers
- **Static Asset Management**: Images and videos stored in organized asset directories

## Backend Architecture
- **Node.js with Express**: RESTful API server handling HTTP requests
- **Database Layer**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Storage Abstraction**: Centralized storage class managing all database operations
- **Seeding System**: Automated database population with initial service data
- **CORS Configuration**: Cross-origin resource sharing for frontend-backend communication

## Data Storage
- **Database**: PostgreSQL database (configured for Neon serverless)
- **Schema Design**: 
  - Users table with authentication data
  - Services table with pricing and categorization
  - Bookings table linking users to services with scheduling
  - Service providers table for professional management
  - Contact inquiries table for customer support
- **ORM**: Drizzle ORM with relations between tables
- **Data Persistence**: Local storage for session management and user preferences

## Authentication & Session Management
- **Client-side Sessions**: localStorage and sessionStorage for user session persistence
- **Demo Authentication**: Built-in demo users for testing and development
- **Profile Management**: User profile data stored locally with sync capabilities
- **Access Control**: Page-level authentication checks for protected routes

## Service Management
- **Dynamic Service Loading**: Real-time service data fetching from database
- **Category Filtering**: Services organized by repair, cleaning, beauty categories
- **Booking Workflow**: Multi-step booking process with service selection, scheduling, and payment
- **Order Tracking**: Real-time order status updates with automatic refresh

# External Dependencies

## Third-party Services
- **Stripe**: Payment processing integration for service bookings
- **Neon Database**: Serverless PostgreSQL hosting for production deployment

## Frontend Libraries
- **Bootstrap 5**: CSS framework for responsive design and components
- **Font Awesome**: Icon library for UI elements
- **AOS**: Animate On Scroll library for scroll-triggered animations
- **Google Fonts**: Inter and Poppins font families for typography

## Backend Dependencies
- **Express.js**: Web application framework for Node.js
- **Drizzle ORM**: TypeScript ORM for database operations
- **Drizzle Kit**: CLI tool for database migrations and schema management
- **@neondatabase/serverless**: Neon database adapter for serverless environments

## Development Tools
- **Node.js**: JavaScript runtime environment
- **NPM**: Package manager for dependency management