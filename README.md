# Trello Clone

A full-stack Trello clone built with modern web technologies. This project implements the core functionalities of Trello, allowing users to create boards, lists, and cards for effective project management and task organization.

## 🌟 Features

- **Workspace Management**
  - Create and manage multiple workspaces
  - Invite team members

- **Board Operations**
  - Create unlimited boards

- **List & Card Management**
  - Create, edit, and delete lists
  - Add cards with rich text descriptions
  - Add comments

## 🛠️ Tech Stack

- **Frontend**
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - React Beautiful DND

- **Backend**
  - Node.js
  - MongoDB

- **Authentication**
  - NextAuth.js
  - OAuth 2.0

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- MongoDB
- npm or yarn
- Git

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/trello-clone.git
   cd trello-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="your_mongodb_url"
   NEXTAUTH_SECRET="your_secret"
   NEXTAUTH_URL="http://localhost:3000"

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🏗️ Project Structure

```
├── app/
│   ├── api/            # API routes
│   ├── (auth)/        # Authentication pages
│   ├── (dashboard)/   # Protected dashboard routes
│   └── (marketing)/   # Public marketing pages
├── components/        # Reusable UI components
├── lib/              # Utility functions and configurations
├── prisma/           # Database schema and migrations
└── public/           # Static assets
```

## 🔒 Authentication Flow

1. Users can sign up/login using:
   - Email/Password
   - Google OAuth

2. Protected routes using Next.js middleware
3. Role-based access control for boards and workspaces

## 🎯 Core Functionalities

### Boards
- Create and manage boards
- Set board visibility and preferences
- Add members and set permissions
- Archive/delete boards

### Lists
- Create unlimited lists
- Drag and drop to reorder
- Copy and move lists
- Archive functionality

### Cards
- Rich text editor for descriptions
- File attachments
- Due dates and reminders
- Labels and categories
- Checklists
- Activity log
- Comments and reactions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Inspired by [Trello](https://trello.com)
- UI Components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

## 📞 Support

For support, email support@yourproject.com or join our Discord channel.

## 🚀 Deployment

The project is configured for easy deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Ftrello-clone)

---

Made with ❤️ by [rHarylala]
