# Vue Todo App
<img width="961" height="947" alt="image" src="https://github.com/user-attachments/assets/95198394-2cf4-418b-ba73-8b833e0cdde4" />

A full-stack todo application built with Vue.js 3, Express.js, and PostgreSQL. Create, read, update, and delete todos with a modern, responsive UI.

## Features

- ✅ **Create Todos** - Add new tasks with a simple input form
- ✏️ **Edit Todos** - Inline editing of todo text
- ✓ **Toggle Completion** - Mark todos as complete or incomplete
- ���️ **Delete Todos** - Remove todos from your list
- ��� **Statistics** - View total, completed, and remaining todo counts
- ��� **Modern UI** - Beautiful gradient design with smooth animations
- ��� **Responsive** - Works on desktop and mobile devices
- ��� **Real-time Updates** - Instant UI updates with database persistence

## Tech Stack

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **Axios** - HTTP client for API calls
- **Vue CLI** - Build tooling and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js
- **dotenv** - Environment variable management
- **Nodemon** - Auto-restart server on file changes (dev)
- **CORS** - Cross-origin resource sharing

## Project Structure

```
vue-app1/
├── client/                    # Vue.js frontend
│   ├── src/
│   │   ├── App.vue           # Main app component
│   │   ├── main.js           # Vue app entry point
│   │   ├── components/
│   │   │   └── TodoItem.vue  # Todo item component
│   │   ├── services/
│   │   │   └── todoService.js # API client service
│   │   └── assets/           # Static assets
│   ├── public/               # Public files
│   ├── package.json
│   ├── babel.config.js       # Babel configuration
│   └── .env                  # Frontend environment variables
│
├── server/                    # Express.js backend
│   ├── config/
│   │   ├── database.js       # Database connection
│   │   └── setup.sql         # Database schema
│   ├── models/
│   │   └── Todo.js           # Todo model with database methods
│   ├── routes/
│   │   └── todo.js           # Todo API routes
│   ├── server.js             # Express server entry point
│   ├── setup-db.js           # Database setup script
│   ├── package.json
│   └── .env                  # Backend environment variables
│
└── README.md                  # This file
```

## Prerequisites

- **Node.js** v14+ and npm
- **PostgreSQL** v12+ (local installation or Docker)
- **Docker** (optional, for running PostgreSQL in a container)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kiche-allan/vue-app1.git
cd vue-app1
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### 3. Set Up PostgreSQL Database

#### Option A: Using Docker (Recommended)

```bash
docker run -d --name todo-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=Kiche@74 \
  -e POSTGRES_DB=todo_app \
  -p 5432:5432 \
  postgres:15
```

#### Option B: Local PostgreSQL Installation

1. Install PostgreSQL from https://www.postgresql.org/download/
2. Create a database:
   ```bash
   createdb -U postgres todo_app
   ```

### 4. Configure Environment Variables

**Backend** (`server/.env`):
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=todo_app
DB_PASSWORD=Kiche@74
DB_PORT=5432
PORT=5000
NODE_ENV=development
```

**Frontend** (`client/.env`):
```env
VUE_APP_API_URL=http://localhost:5000/api
```

### 5. Initialize Database Schema

Run the setup script to create tables and seed sample data:

```bash
cd server
node setup-db.js
```

## Running the Application

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```

The backend will start on **http://localhost:5000**

**Terminal 2 - Start Frontend Dev Server:**
```bash
cd client
npm run serve
```

The frontend will be available at **http://localhost:8082**

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
```

Output will be in `client/dist/`

## API Endpoints

All endpoints are prefixed with `/api`

### Todos

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/:id` | Get a specific todo |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a todo |
| PATCH | `/todos/:id/toggle` | Toggle todo completion status |
| DELETE | `/todos/:id` | Delete a todo |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health status |

## Usage

1. Open **http://localhost:8082** in your browser
2. Enter a todo in the input field and click "Add Todo"
3. Click the checkbox to mark a todo as complete
4. Click the edit icon (✏️) to edit a todo's text
5. Click the delete icon (���️) to remove a todo
6. View statistics at the bottom showing total, completed, and remaining todos

## Available Scripts

### Backend

- `npm run dev` - Start development server with auto-reload
- `npm install` - Install dependencies

### Frontend

- `npm run serve` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Database Schema

### todos Table

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Troubleshooting

### Backend Connection Error: "database 'todo_app' does not exist"
- Run `node setup-db.js` in the server directory to create and seed the database

### Port Already in Use
- Backend (5000): `npx kill-port 5000`
- Frontend (8082): `npx kill-port 8082`

### PostgreSQL Connection Refused
- Ensure PostgreSQL is running: `sudo service postgresql status` (Linux/Mac) or check Services (Windows)
- Verify credentials in `server/.env`
- Check that port 5432 is accessible

### CORS Errors
- Ensure backend is running on port 5000
- Check that `VUE_APP_API_URL` in `client/.env` matches the backend URL

### Frontend Won't Load
- Clear browser cache (Ctrl+Shift+Delete)
- Ensure Node.js and npm are installed: `node --version && npm --version`
- Delete `node_modules` and `package-lock.json`, then run `npm install`

## File Descriptions

### Client

- **App.vue** - Main Vue component handling todo list, adding, editing, deletion
- **TodoItem.vue** - Individual todo item component with edit/delete actions
- **todoService.js** - Axios-based API client for communicating with backend
- **main.js** - Vue app initialization

### Server

- **server.js** - Express app setup, middleware, and route mounting
- **config/database.js** - PostgreSQL connection pool configuration
- **config/setup.sql** - SQL schema and sample data
- **models/Todo.js** - Todo class with static methods for database operations
- **routes/todo.js** - Express routes for todo CRUD operations
- **setup-db.js** - Script to initialize database

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

**Kiche Allan**

## Support

For issues and feature requests, please create an issue on GitHub.

## Future Enhancements

- User authentication and multi-user support
- Todo categories and tags
- Due dates and reminders
- Dark mode toggle
- Todo filtering and search
- Data export (CSV, JSON)
- Mobile app (React Native)

---

**Happy Todo-ing! ���**
