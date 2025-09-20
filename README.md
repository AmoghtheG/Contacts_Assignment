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


System Requirements:
Operating Systems

Windows 10/11, macOS 12+ (Monterey or newer), Ubuntu 22.04+ (or similar Linux)

Required Software

Node.js: v18.x or v20.x (LTS)
Check: node -v (and npm -v)
npm: v9+ (bundled with Node LTS) or pnpm/yarn if you prefer

Angular CLI: v17+
Install: npm i -g @angular/cli  Check: ng version

PostgreSQL: v14+
Check: psql --version

Git: latest
Check: git --version
Optional (recommended for Material UI)
@angular/animations installed in frontend (we include this below)
Ports (defaults)
Backend API: http://localhost:4000
Frontend: http://localhost:4200
PostgreSQL: localhost:5432


BACKEND:
1) Clone the Repository
2) Start PostgreSQL (service/app).
Create a database user and database (adjust names/passwords as you like):

-- in psql (or use a GUI like pgAdmin)
CREATE USER contacts_user WITH PASSWORD 'contacts_pass';
CREATE DATABASE contacts_db OWNER contacts_user;
GRANT ALL PRIVILEGES ON DATABASE contacts_db TO contacts_user;

3) Run Backend

//bash
cd backend
npm install

.env file:
# backend.dev
PORT=4000
DATABASE_URL=postgresql://contacts_user:contacts_pass@localhost:5432/contacts_db
# Example Prisma config (only if you use Prisma):
# DATABASE_URL="postgresql://contacts_user:contacts_pass@localhost:5432/contacts_db?schema=public"

npm run dev  //to run application

FRONTEND:

1) cd frontend
   npm install

2)install animations
npm install @angular/animations

3) start the applicaiton
ng serve --open
