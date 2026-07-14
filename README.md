# TodoMaster

A modern, production-ready task management application built with Next.js 14, featuring role-based authentication, subscription management, and an event-driven architecture using Clerk webhooks.

## Overview

TodoMaster is a full-stack application that demonstrates best practices for building scalable Next.js applications with:
- **Role-based access control** (Admin and User roles)
- **Event-driven architecture** using Clerk webhooks
- **Subscription system** with tiered access (Free vs Premium)
- **Type-safe API routes** with Zod validation
- **Modern UI/UX** with Radix UI components and Tailwind CSS
- **Production-ready** error handling, loading states, and accessibility

## Features

### User Features
- Secure authentication with Clerk
- Create, read, update, and delete todos
- Search and pagination for todos
- Subscription-based access limits (3 todos for free users, unlimited for premium)
- Real-time subscription status management

### Admin Features
- Search users by email
- View user details and todos
- Manage user subscriptions
- Update and delete user todos
- Role-based access control

### Technical Features
- Event-driven user creation via Clerk webhooks
- Server-side validation with Zod
- Centralized error handling
- Loading states and empty states
- SEO-optimized with metadata
- Accessible with ARIA labels
- Responsive design for all devices

## Architecture

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Validation**: Zod
- **Webhook Verification**: Svix
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, usehooks-ts

### Database Schema

```prisma
model User {
  id                String    @id
  email             String    @unique
  isSubscribed      Boolean   @default(false)
  subscriptionEnds  DateTime?
  todos             Todo[]
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  @@index([email])
}

model Todo {
  id        String   @id @default(cuid())
  title     String
  completed Boolean  @default(false)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([userId])
  @@index([createdAt])
}
```

### Event Flow

1. User signs up through Clerk
2. Clerk sends `user.created` webhook event
3. Webhook endpoint verifies signature with Svix
4. User record created in PostgreSQL database
5. User can access dashboard and manage todos

## Folder Structure

```
├── app/
│   ├── (authenticated)/          # Protected routes
│   │   ├── dashboard/            # User dashboard
│   │   ├── subscribe/            # Subscription management
│   │   ├── admin/                # Admin dashboard
│   │   └── layout.tsx            # Authenticated layout
│   ├── api/                      # API routes
│   │   ├── todos/                # Todo CRUD endpoints
│   │   ├── subscription/         # Subscription endpoints
│   │   ├── admin/                # Admin endpoints
│   │   └── webhook/              # Webhook handler
│   ├── components/ui/            # Radix UI components
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 page
│   ├── loading.tsx              # Loading state
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Custom components
│   ├── Navbar.tsx
│   ├── TodoForm.tsx
│   ├── TodoItem.tsx
│   ├── Pagination.tsx
│   └── BackButton.tsx
├── lib/                         # Utilities and helpers
│   ├── auth.ts                  # Authentication helpers
│   ├── constants.ts             # Application constants
│   ├── errors.ts                # Custom error classes
│   ├── prisma.ts                # Prisma client
│   ├── response.ts              # API response helpers
│   ├── utils.ts                 # Utility functions
│   └── validations.ts           # Zod schemas
├── prisma/
│   └── schema.prisma            # Database schema
├── middleware.ts                # Clerk middleware
└── next.config.mjs             # Next.js configuration
```

## Installation

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Neon, Railway, or local)
- Clerk account for authentication

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 30-event-driven-architecture
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env` and `.env.local.example` to `.env.local`:
   ```bash
   cp .env.example .env
   cp .env.local.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/todomaster?schema=public"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_clerk_publishable_key_here"
   CLERK_SECRET_KEY="sk_test_your_clerk_secret_key_here"
   
   # Clerk Webhook
   WEBHOOK_SECRET="whsec_your_webhook_secret_from_clerk_dashboard"
   
   # Application
   NODE_ENV="development"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Webhook Setup

To enable automatic user creation when users sign up with Clerk:

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **Webhooks** section
3. Create a new webhook
4. Set the endpoint URL to: `https://your-domain.com/api/webhook/register`
5. Select the `user.created` event
6. Copy the webhook secret and add it to your `.env` file as `WEBHOOK_SECRET`

## Admin User Setup

To set up an admin user:

1. Create a user through Clerk
2. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
3. Navigate to **Users** section
4. Find the user you want to make admin
5. Add a public metadata field `role` with value `admin`

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Railway

1. Create a new project in Railway
2. Add PostgreSQL database
3. Add environment variables
4. Deploy from GitHub

### Render

1. Create a new web service in Render
2. Connect to PostgreSQL database
3. Add environment variables
4. Deploy from GitHub

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `WEBHOOK_SECRET` | Clerk webhook secret | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `NEXT_PUBLIC_APP_URL` | Application URL | No |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema to database
- `npx prisma studio` - Open Prisma Studio

## Future Improvements

- [ ] Add email notifications for subscription reminders
- [ ] Implement real-time updates with WebSocket
- [ ] Add more subscription tiers
- [ ] Implement file attachments for todos
- [ ] Add team/collaboration features
- [ ] Add analytics dashboard
- [ ] Implement rate limiting
- [ ] Add comprehensive test suite
- [ ] Add internationalization (i18n)
- [ ] Implement offline support with PWA

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Authentication by [Clerk](https://clerk.com/)
- Database by [Prisma](https://www.prisma.io/)
- UI components by [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)
