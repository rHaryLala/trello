# Trello Clone
![image](https://github.com/user-attachments/assets/802281fd-d783-4cdd-a529-57d6bb1428ef)

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
  - JavaScript
  - Tailwind CSS
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

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🏗️ Project Structure

```
frontend/
├── node_modules/
├── public/
└── src/
    ├── assets/          # Static assets and images
    ├── components/      # Reusable UI components
    │   ├── AddCollaborator.jsx
    │   ├── AddProject.jsx
    │   ├── CustomNavbar.jsx
    │   ├── DeleteProject.jsx
    │   ├── EditProject.jsx
    │   ├── Footer.jsx
    │   └── Sidebar.jsx
    ├── pages/          # Application pages
    │   ├── Dashboard.jsx
    │   ├── DashboardTest.jsx
    │   ├── Landing.jsx
    │   ├── Login.jsx
    │   ├── Profile.jsx
    │   └── Register.jsx
    ├── redux/          # State management
    │   ├── actions.js
    │   ├── reducers.js
    │   └── store.js
    ├── App.css         # Global styles
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    └── ProtectedRoute.jsx      
      
```

## 🔒 Authentication Flow

1. Users can sign up/login using:
   - Email/Password
   - Google OAuth
2. Role-based access control for boards and workspaces

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
- Icons from [Lucide](https://lucide.dev)

## 📞 Support

For support, email rabenamanaharylala2001@gmail.com

---

Made with ❤️ by Hary Lala
