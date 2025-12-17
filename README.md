# TSInertia Starter Kit 🚀

A modern, production-ready starter kit for building full-stack web applications using **TypeScript**, **Laravel**, **Inertia.js**, and **React**.

---

## ✨ Features

### 🎯 **Core Stack**

- ⚡ **Laravel 12** - Modern PHP framework with elegant syntax
- ⚛️ **React 19** - Latest React with TypeScript support
- 🔗 **Inertia.js 2.0** - Modern monolith without the complexity of SPAs
- 🎨 **Tailwind CSS 4** - Utility-first CSS framework
- 📘 **TypeScript** - Type-safe JavaScript
- 🎭 **Framer Motion** - Production-ready animation library

### 🛠 **Pre-configured Features**

- ✅ **Authentication System** - Login, Register, Password Reset, Email Verification
- ✅ **Role & Permission System** - Spatie Laravel Permission integrated
- ✅ **Admin Dashboard** - User management, role management
- ✅ **Super Admin Panel** - Advanced system controls
- ✅ **Social Authentication** - Laravel Socialite ready
- ✅ **Modern UI Components** - Radix UI + shadcn/ui components
- ✅ **Dark Mode** - Built-in theme switcher with next-themes
- ✅ **Form Validation** - React Hook Form + Zod schema validation
- ✅ **Code Quality Tools** - ESLint, Prettier, Laravel Pint

### 🎨 **UI/UX**

- 🎭 Beautiful landing page with smooth animations
- 📱 Fully responsive design
- 🌙 Dark mode support
- ♿ Accessible components (Radix UI)
- 🎯 Modern, clean design system

---

## 🚀 Quick Start

### Prerequisites

- PHP >= 8.2
- Composer
- Node.js >= 18
- NPM or Bun

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/codewithwan/tsinertia-starter.git
cd tsinertia-starter
```

2. **Install PHP dependencies**

```bash
composer install
```

3. **Install Node dependencies**

```bash
npm install
# or
bun install
```

4. **Environment setup**

```bash
cp .env.example .env
php artisan key:generate
```

5. **Database setup**

```bash
# Create database
touch database/database.sqlite

# Run migrations with seeders
php artisan migrate --seed
```

6. **Start development servers**

```bash
# Option 1: Using Laravel's built-in dev command
composer dev

# Option 2: Manual (separate terminals)
php artisan serve        # Laravel backend (port 8000)
npm run dev              # Vite frontend (port 5173)
php artisan queue:listen # Queue worker
```

7. **Access the application**

- Frontend: http://localhost:8000
- Vite Dev Server: http://localhost:5173

---

## 📁 Project Structure

```
tsinertia-starter/
├── app/                    # Laravel application
│   ├── Http/
│   │   ├── Controllers/    # Application controllers
│   │   ├── Middleware/     # Custom middleware
│   │   └── Requests/       # Form requests
│   ├── Models/             # Eloquent models
│   └── helpers.php         # Helper functions
├── resources/
│   ├── js/
│   │   ├── components/     # React components
│   │   │   ├── ui/         # Reusable UI components (shadcn)
│   │   │   └── landing/    # Landing page sections
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # Inertia pages
│   │   │   ├── auth/       # Auth pages
│   │   │   ├── admin/      # Admin panel
│   │   │   └── user/       # User dashboard
│   │   ├── types/          # TypeScript types
│   │   └── app.tsx         # React app entry
│   ├── css/                # Global styles
│   └── views/              # Blade templates (minimal)
├── routes/
│   ├── web.php             # Web routes
│   ├── api.php             # API routes
│   └── auth.php            # Authentication routes
├── database/
│   ├── migrations/         # Database migrations
│   └── seeders/            # Database seeders
├── tests/                  # PHPUnit tests
├── .env.example            # Environment variables template
├── composer.json           # PHP dependencies
├── package.json            # Node dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS config
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

---

## 🔐 Default Credentials

After running seeders, you can login with:

**Super Admin:**

- Email: `admin@example.com`
- Password: `password`

**User:**

- Email: `user@example.com`
- Password: `password`

---

## 🛠 Available Scripts

### PHP/Laravel

```bash
composer dev          # Start all dev servers (Laravel + Vite + Queue)
composer dev:ssr      # Start with SSR support
composer test         # Run PHPUnit tests
php artisan pint      # Format PHP code
```

### Node/JavaScript

```bash
npm run dev           # Start Vite dev server
npm run build         # Build for production
npm run build:ssr     # Build with SSR
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run types         # Check TypeScript types
```

---

## 🎨 UI Components

This starter includes a comprehensive set of pre-built, accessible UI components:

- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch
- **Feedback**: Alert, Toast, Dialog, Popover, Tooltip
- **Navigation**: Dropdown Menu, Navigation Menu, Tabs, Breadcrumb
- **Data Display**: Table, Avatar, Badge, Card, Separator
- **Overlays**: Dialog, Sheet, Drawer, Hover Card
- **Layout**: Accordion, Collapsible, Resizable, Scroll Area

All components are built with:

- ✅ Radix UI primitives (headless, accessible)
- ✅ Tailwind CSS styling
- ✅ Dark mode support
- ✅ TypeScript support
- ✅ Customizable via CVA (Class Variance Authority)

---

## 🗄 Database

The starter uses **SQLite** by default for easy setup, but you can switch to any database supported by Laravel (MySQL, PostgreSQL, SQL Server).

**Pre-configured tables:**

- users
- roles
- permissions
- role_has_permissions
- model_has_roles
- model_has_permissions
- password_reset_tokens
- sessions
- jobs
- failed_jobs

---

## 🔧 Configuration

### TypeScript

- Path aliases configured: `@/` → `resources/js/`
- Strict mode enabled
- React JSX support

### Inertia.js

- Auto-resolved page components
- Shared data (auth user, flash messages, errors)
- Progress indicator
- Form helper utilities

### Tailwind CSS

- Custom color scheme
- Dark mode support (class strategy)
- Custom animations
- Responsive breakpoints

---

## 🧪 Testing

```bash
# Run all tests
composer test

# Run specific test file
php artisan test --filter=UserTest

# Run with coverage
php artisan test --coverage
```

---

## 📦 Production Build

```bash
# Build assets
npm run build

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set production environment
cp .env.example .env.production
# Edit .env.production with production values

# Deploy!
```

---

## 🚢 Deployment

### Recommended Platforms

- **Vercel** - For SSR builds
- **Laravel Forge** - Managed Laravel hosting
- **Digital Ocean** - VPS with Laravel Forge
- **Cloudways** - Managed cloud hosting
- **Railway** - Modern deployment platform

### Docker Support

Docker configuration included (`Dockerfile`, `docker-compose.yml`, `Caddyfile`)

```bash
docker-compose up -d
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

---

## 🙏 Credits

Built with love by **[@codewithwan](https://github.com/codewithwan)**

Powered by:

- [Laravel](https://laravel.com)
- [React](https://react.dev)
- [Inertia.js](https://inertiajs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://radix-ui.com)

---

## 📞 Support

- Documentation: [Coming soon]
- Issues: [GitHub Issues](https://github.com/codewithwan/tsinertia-starter/issues)
- Discussions: [GitHub Discussions](https://github.com/codewithwan/tsinertia-starter/discussions)

---

**Happy coding! 🎉**
