# CONTRIBUTING.md - Contribution Guidelines

Thank you for your interest in contributing to Vue Todo App! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We're committed to providing a welcoming and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

1. **Check existing issues** - Search the issues to see if the bug has already been reported
2. **Create a detailed bug report** with:
   - Clear title describing the bug
   - Step-by-step reproduction instructions
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment (OS, Node version, etc.)

### Suggesting Enhancements

1. **Use a clear title** for the enhancement
2. **Provide detailed description** of the suggested enhancement
3. **Explain the use case** - Why would this enhancement be useful?
4. **List examples** of how the feature would work

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/vue-app1.git
   cd vue-app1
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Keep commits atomic and descriptive
   - Follow the existing code style
   - Write clear commit messages

4. **Test your changes**
   - Test locally: `npm run dev` (backend) and `npm run serve` (frontend)
   - Ensure no errors or warnings in console
   - Test new features thoroughly

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear title and description
   - Reference any related issues (e.g., "Fixes #42")
   - Include before/after screenshots if applicable
   - Ensure your PR includes:
     - Tests for new features
     - Updated documentation
     - No breaking changes (or documented breaking changes)

## Development Setup

### Prerequisites
- Node.js v14+
- PostgreSQL v12+ or Docker

### Installation
```bash
# Backend setup
cd server
npm install

# Frontend setup
cd ../client
npm install
```

### Running Locally
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run serve
```

Access the app at **http://localhost:8082**

### Database Setup
```bash
cd server
node setup-db.js
```

## Code Style

- Use **ES6+ syntax**
- Vue: Use single-file components (`.vue`) with `<template>`, `<script>`, `<style scoped>`
- Node/Express: Use arrow functions and const/let (no var)
- Keep functions focused and DRY
- Add meaningful comments for complex logic
- Use meaningful variable and function names

## Commit Messages

Use clear, descriptive commit messages:
```
feat: Add todo editing functionality
fix: Resolve database connection timeout
docs: Update README with Docker setup instructions
refactor: Simplify TodoItem component logic
test: Add tests for API endpoints
```

Prefix types:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only
- **style**: Changes that don't affect code meaning
- **refactor**: Code changes that don't fix bugs or add features
- **perf**: Code changes that improve performance
- **test**: Adding or updating tests

## Testing

- Test new features manually
- Ensure existing features still work
- Check both happy paths and edge cases
- Test in different browsers if frontend changes

## Documentation

- Update README.md if adding new features
- Add inline comments for complex code
- Update API docs if modifying endpoints
- Document new environment variables

## Questions or Need Help?

- Check existing issues and discussions
- Create a new issue with the `question` label
- Reach out to maintainers

---

**Thank you for contributing! 🙏**
