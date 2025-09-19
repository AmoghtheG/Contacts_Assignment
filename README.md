This is a full-stack CRUD application that allows users to manage contacts (name, phone, email, address).
This project demonstrates Angular (frontend), Node.js/Express (backend), and PostgreSQL (database) working together.

Features:
Full CRUD (Create, Read, Update, Delete) for contacts
Backend RESTful API with validation
No duplicate emails
Required fields enforced
Angular frontend with:
Contact list view
Add/Edit form with validation
Routing (standalone components, Angular 17+)
PostgreSQL database schema for storing contacts
Optional: Angular Material UI (tables, forms, buttons, snackbars)
Responsive, modular code structure
Project Structure

contacts-assignment/
 ├── backend/                # Node.js + Express + PostgreSQL
 │    ├── src/
 │    │    ├── controllers/  # Route handlers
 │    │    ├── models/       # DB schema / ORM (Prisma or Sequelize)
 │    │    ├── routes/       # Express routes
 │    │    └── server.ts     # App entry point
 │    ├── package.json
 │    └── prisma/            # If using Prisma for migrations
 │
 ├── frontend/               # Angular 17+ 
 │    ├── src/
 │    │    ├── app/
 │    │    │    ├── app.component.ts   # Root shell
 │    │    │    ├── app.routes.ts      # Routes
 │    │    │    ├── services/          # ContactsService (API calls)
 │    │    │    └── pages/
 │    │    │         ├── contact-list/ # List page
 │    │    │         └── contact-form/ # Add/Edit page
 │    ├── angular.json
 │    └── package.json
 │
 └── README.md

Technologies Used:

Frontend: Angular 17+, Standalone Components, Router, HttpClient, ReactiveForms
Styling: SCSS, Angular Material (optional)
Backend: Node.js, Express.js
Database: PostgreSQL (via Prisma ORM or pg client)
Dev Tools: VS Code, Git, npm
