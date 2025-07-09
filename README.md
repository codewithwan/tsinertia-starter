# 🚀 Laravel React Starter Kit

A modern, production-ready boilerplate for rapid web application development, combining the best of Laravel 12, React 19, TypeScript, Inertia.js, ShadCN/UI, and Docker with FrankenPHP.

## ✨ Features

- **⚡ Laravel 12** - Latest PHP framework with modern features
- **⚛️ React 19** - Latest React with concurrent features and server components
- **🔷 TypeScript** - Full type safety across the entire stack
- **🔄 Inertia.js** - Build single-page apps with server-side routing
- **🎨 ShadCN/UI** - Beautiful, accessible React components built on Radix UI
- **🎯 Tailwind CSS** - Utility-first CSS framework
- **🐳 Docker** - Containerized development environment
- **🔥 FrankenPHP** - Modern PHP application server for superior performance
- **🔐 Authentication** - Complete auth system with email verification
- **📱 Responsive Design** - Mobile-first responsive layouts
- **🌙 Dark Mode** - Built-in dark/light theme support
- **🧪 Testing** - Pest PHP testing framework setup
- **📦 Database** - MySQL 8.0 with migrations and seeders

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| Laravel | Backend Framework | 12.x |
| React | Frontend Library | 19.x |
| TypeScript | Type Safety | 5.x |
| Inertia.js | SPA Bridge | 2.x |
| ShadCN/UI | UI Components | Latest |
| Tailwind CSS | Styling | 4.x |
| FrankenPHP | PHP Runtime | Latest |
| Docker | Containerization | Latest |
| MySQL | Database | 8.0 |
| Vite | Build Tool | 6.x |

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url> my-app
   cd my-app
   ```

2. **Copy environment file**
   ```bash
   cp .env.example .env
   ```

3. **Start the development environment**
   ```bash
   docker-compose up -d
   ```

4. **Install dependencies & setup**
   ```bash
   # The container will automatically run these commands:
   # - composer install
   # - npm install
   # - php artisan key:generate
   # - php artisan migrate
   ```  

5. **Visit your application**
   - Frontend: http://localhost:8080
   - Database: localhost:3309

That's it! 🎉 Your application is ready.

## 📁 Project Structure

```
├── app/                    # Laravel application logic
│   ├── Http/Controllers/   # API & web controllers
│   ├── Models/            # Eloquent models
│   └── Providers/         # Service providers
├── resources/
│   ├── js/                # React TypeScript frontend
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Inertia.js pages
│   │   ├── layouts/       # Page layouts
│   │   └── types/         # TypeScript type definitions
│   └── css/               # Stylesheets
├── routes/                # Laravel routes
├── database/              # Migrations, seeders, factories
├── docker-compose.yml     # Docker services configuration
├── Dockerfile            # Application container definition
└── package.json          # Frontend dependencies
```

## 🔧 Development

### Running Tests

```bash
# PHP tests with Pest
composer test

# Frontend tests (if configured)
npm test
```

### Building for Production

```bash
# Build frontend assets
npm run build

# Build with SSR support
npm run build:ssr
```

### Development Commands

```bash
# Start development with hot reload
composer dev

# Start with SSR support
composer dev:ssr

# Format code
npm run format

# Lint code
npm run lint

# Type checking
npm run types
```

## 🐳 Docker Services

The development environment includes:

- **app**: FrankenPHP application server
- **db**: MySQL 8.0 database
- **volumes**: Persistent database storage

### Environment Variables

Key environment variables in `.env`:

```bash
APP_NAME=LaravelReact
APP_URL=http://localhost:8080

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=password
```

## 🎨 UI Components

This starter kit uses **ShadCN/UI** components built on **Radix UI** primitives. All components are:

- ✅ Fully accessible (WCAG compliant)
- ✅ Keyboard navigable
- ✅ Dark mode compatible
- ✅ Customizable with Tailwind CSS
- ✅ TypeScript ready

### Available Components

- Buttons, Forms, Inputs
- Cards, Dialogs, Modals
- Navigation, Menus, Dropdowns
- Tables, Charts, Data displays
- And many more...

## 🔐 Authentication

Pre-configured authentication system includes:

- User registration and login
- Email verification
- Password reset functionality
- Profile management
- Session management

### Protected Routes

Routes are automatically protected using Laravel's authentication middleware and Inertia.js.

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Breakpoints**: Tailwind CSS responsive breakpoints
- **Components**: All components are responsive by default
- **Navigation**: Adaptive navigation patterns
- **Typography**: Responsive text scaling

## 🌙 Theme Support

Built-in dark/light theme support:

- System preference detection
- Manual theme switching
- Persistent theme selection
- Component-level theme support

## 🔄 State Management

State management is handled through:

- **Inertia.js**: Server-state synchronization
- **React Hooks**: Local component state
- **Form Handling**: React Hook Form with validation

## 📈 Performance

Optimized for performance:

- **FrankenPHP**: High-performance PHP runtime
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Dead code elimination
- **Image Optimization**: Responsive images
- **Caching**: Laravel caching strategies

## 🧪 Testing

Testing setup includes:

- **Pest PHP**: Modern PHP testing framework
- **Feature Tests**: End-to-end testing
- **Unit Tests**: Component testing
- **Database Testing**: In-memory SQLite for tests

Run tests:

```bash
composer test
```

## 🚀 Deployment

### Production Build

1. **Build assets**
   ```bash
   npm run build
   ```

2. **Configure environment**
   ```bash
   # Set production environment variables
   APP_ENV=production
   APP_DEBUG=false
   ```

3. **Deploy with Docker**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Deployment Platforms

This starter kit is ready for deployment on:

- DigitalOcean App Platform
- Railway
- Fly.io
- AWS ECS
- Google Cloud Run
- Traditional VPS

## 📚 Documentation

### Laravel Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com)

### Frontend Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [ShadCN/UI Components](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Laravel](https://laravel.com) - The PHP framework
- [React](https://react.dev) - The JavaScript library
- [Inertia.js](https://inertiajs.com) - The modern monolith
- [ShadCN](https://ui.shadcn.com) - The component library
- [Tailwind CSS](https://tailwindcss.com) - The CSS framework
- [FrankenPHP](https://frankenphp.dev) - The modern PHP app server

## 📞 Support

If you have any questions or need help:

- 📧 Create an issue on GitHub
- 💬 Join our Discord community
- 📖 Check the documentation

---

**Happy coding!** 🎉 Built with ❤️ for developers who want to ship fast. 