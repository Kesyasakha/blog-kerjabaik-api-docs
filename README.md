# API Documentation System

Internal API documentation system with authentication and multi-project support.

## Features

- **Authentication**: Simple password-based login with session cookie
- **Multi-Project**: Support for multiple API projects in one system
- **Clean Design**: Minimalist, backend-oriented UI
- **Protected Routes**: All documentation routes require authentication

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- JWT Authentication
- bcryptjs for password hashing

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
JWT_SECRET=your-secret-key-here-change-in-production
NODE_ENV=development
```

**Important**: Change `JWT_SECRET` to a strong random string in production.

### Default Login Credentials

The system comes with a default user seeded in memory:

- **Email**: `developer@kerjabaik.dev`
- **Password**: `developer123`

**Important**: Change the default password in production by modifying `lib/db.ts` or implementing a real database.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and login with the default credentials.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  (docs)/              # Protected documentation routes
    projects/          # Project-specific pages
      [projectId]/
        overview/      # Project overview
        authentication/ # Auth documentation
        endpoints/     # API endpoint details
        errors/        # Error handling
        environment/   # Environment URLs
        changelog/     # Version history
  login/               # Login page
  api/
    auth/              # Authentication API routes
lib/
  auth.ts              # Authentication utilities
  db.ts                # Database/users (in-memory)
  projects.ts          # Project data structure
components/            # React components
middleware.ts          # Route protection middleware
```

## Adding Projects

Edit `lib/projects.ts` to add new projects. Each project contains:

- Overview information
- Tech stack
- Base URLs (local, staging, production)
- Authentication details
- API groups and endpoints
- Error handling
- Changelog

## Adding Users

Currently, users are stored in-memory in `lib/db.ts`. To add users:

1. Edit `lib/db.ts`
2. Add a new user object with hashed password
3. Use `bcrypt.hash()` to hash passwords

For production, replace the in-memory database with a real database (PostgreSQL, MySQL, MongoDB, etc.).

## Customization

### Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --color-primary: #FF2D2D;
  --color-black: #0F0F0F;
  --color-white: #FFFFFF;
  /* ... */
}
```

### Fonts

The system uses:
- **Inter** for UI text
- **JetBrains Mono** for code

Fonts are loaded from Google Fonts in `app/globals.css`.

## Deployment to VPS

### Build for Production

```bash
npm run build
```

Build will generate `.next/standalone` folder with all required files.

### Running on VPS

1. Copy files to VPS:
   ```bash
   scp -r .next/standalone user@your-vps:/path/to/app
   scp -r .next/static .next/standalone/.next/static
   ```

2. Install dependencies (if needed):
   ```bash
   cd /path/to/app
   npm install --production
   ```

3. Run with PM2:
   ```bash
   npm install -g pm2
   pm2 start .next/standalone/server.js --name api-docs
   pm2 save
   pm2 startup
   ```

4. Setup Nginx (optional):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Security Notes

- Change default JWT_SECRET in production
- Change default user password
- Use HTTPS in production
- Consider implementing rate limiting
- Replace in-memory database with real database for production

## License

Private - Internal use only