## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## 🚀 Getting Started

To run the application in development mode:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:3004](http://localhost:3004).

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router (pages, layouts, styles)
│   ├── signup/     # Signup page feature
│   └── globals.css # Global styles
├── components/     # Reusable UI components
│   └── DynamicForm.tsx # Core form engine
└── data/           # Static data and configurations
    └── formData.json # Dynamic form configuration
public/             # Static assets (images, icons, etc.)
```

## 🧹 Linting

To run the linter:

```bash
npm run lint
```
