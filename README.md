# 🚀 TodoMaster SaaS

A modern, production-ready task management application built with **Next.js 14**, **TypeScript**, **Prisma**, **PostgreSQL**, and **Clerk Authentication**. The application follows industry-standard architecture with secure authentication, role-based authorization, subscription management, and a clean, responsive UI.

> Live Demo: https://30-event-driven-architecture.vercel.app  
> GitHub: https://github.com/Vinayak-123-jpj/TodoMaster-SaaS

---

## ✨ Features

- 🔐 Secure Authentication using Clerk
- 👤 Role-Based Access Control (User/Admin)
- ✅ Create, Update, Delete & Search Tasks
- 📊 Admin Dashboard
- 💳 Subscription Management
- ⚡ Event-Driven Architecture with Clerk Webhooks
- 📱 Fully Responsive Design
- 🌙 Modern SaaS UI
- ♿ Accessibility Optimized
- 🔍 SEO Optimized
- 🛡️ Production-grade Error Handling
- 📈 Optimized Database Queries
- 🚀 Ready for Production Deployment

---

## 🛠 Tech Stack

### Frontend

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Lucide React

### Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL (Neon)

### Authentication

- Clerk Authentication
- Clerk Webhooks

### Deployment

- Vercel
- Render
- Railway

---

## 📂 Project Structure

```
app/
components/
hooks/
lib/
prisma/
types/
public/
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Vinayak-123-jpj/TodoMaster-SaaS.git
```

Go into the project

```bash
cd TodoMaster-SaaS
```

Install dependencies

```bash
npm install
```

Create environment file

```bash
cp .env.example .env.local
```

Generate Prisma Client

```bash
npx prisma generate
```

Push Database Schema

```bash
npx prisma db push
```

Start development server

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env.local` file and configure:

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📸 Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f4a2efb4-25e0-44b9-88dc-378ee57a6043" />


- Landing Page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/df0288b7-e02e-45b8-b5ee-96f93ebaa47f" />

- Dashboard
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ab161d8f-2f82-4b3d-886c-2909d7da47fe" />

- Admin Panel
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/15f95eff-ef88-4e51-9c1a-48a4a58f8e96" />

- Pricing Page
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3dd8a60f-fe4b-4208-ae15-9ec97259b634" />



---

## 🚀 Deployment

This project supports deployment on:

- Vercel
- Railway
- Render

After deployment:

- Configure Environment Variables
- Add Clerk Webhook
- Run Prisma Database Migration

---

## 📈 Future Improvements

- Email Notifications
- Dark Mode
- Real-time Task Updates
- Drag & Drop Task Management
- Task Categories
- Analytics Dashboard
- Unit & Integration Testing
- Rate Limiting
- Docker Support

---

## 🧠 What I Learned

- Building scalable applications with Next.js 14
- Secure authentication using Clerk
- Database design with Prisma ORM
- Event-driven architecture using webhooks
- Production-ready project structure
- Performance optimization
- Modern UI/UX practices

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Vinayak Dhyani**

- GitHub: https://github.com/Vinayak-123-jpj
- LinkedIn: https://www.linkedin.com/in/vinayak-dhyani-18b547373/

---

⭐ If you found this project useful, consider giving it a star!
