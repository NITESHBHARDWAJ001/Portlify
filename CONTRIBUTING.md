# Contributing to Portfolio Builder Platform

Thank you for considering contributing to the Portfolio Builder Platform! 🎉

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

## How Can I Contribute?

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Use the bug report template** when creating a new issue
3. **Include details:**
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - Environment (OS, browser, Node version)

### Suggesting Features

1. **Check existing feature requests** first
2. **Use the feature request template**
3. **Describe the use case** and benefits
4. **Provide examples** or mockups if possible

### Pull Requests

#### Before Submitting

1. **Fork the repository** and create your branch from `main`
2. **Follow the coding standards** (see below)
3. **Test your changes** thoroughly
4. **Update documentation** if needed

#### PR Guidelines

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** with clear commits:
   ```bash
   git commit -m "feat: add new component library section"
   ```

3. **Follow commit message convention:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting)
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Build/config changes

4. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request** with:
   - Clear title and description
   - Link to related issues
   - Screenshots for UI changes
   - Test results

## Development Setup

### Prerequisites
- Node.js >= 18.0.0
- MongoDB >= 6.0.0
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/CPM.git
cd CPM

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Setup environment variables
cp server/.env.example server/.env
# Edit server/.env with your configuration
```

### Running Tests

```bash
# Backend tests (when available)
cd server
npm test

# Frontend tests (when available)
cd client
npm test
```

## Coding Standards

### General

- Write clear, self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Follow DRY (Don't Repeat Yourself) principle

### Backend (Node.js/Express)

```javascript
// Use async/await instead of callbacks
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Use descriptive variable names
const portfoliosByUser = await Portfolio.find({ owner: userId });

// Export at the bottom
module.exports = { getUser, createUser };
```

### Frontend (React)

```jsx
// Use functional components with hooks
const MyComponent = ({ title, onAction }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return (
    <div className="class-names">
      {/* JSX */}
    </div>
  );
};

// PropTypes or TypeScript for type safety
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onAction: PropTypes.func,
};

export default MyComponent;
```

### Styling (Tailwind CSS)

```jsx
// Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-800">Title</h2>
</div>

// Use custom classes for repeated patterns
// Add to tailwind.config.js or CSS files
```

### State Management (Zustand)

```javascript
// Keep stores focused and modular
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

## Project Structure

### Adding New Components

1. **UI Components** → `client/src/components/ui/`
   - Follow shadcn/ui patterns
   - Keep them reusable and generic

2. **Block Components** → `client/src/components/blocks/`
   - Register in `componentRegistry.js`
   - Include default props and styling
   - Support content and style customization

3. **Pages** → `client/src/pages/`
   - One file per route
   - Use consistent layout patterns

### Adding New API Endpoints

1. **Create Model** → `server/src/models/`
2. **Create Controller** → `server/src/controllers/`
3. **Add Routes** → `server/src/routes/`
4. **Register in** → `server/src/server.js`

## Testing Guidelines

### What to Test

- **Unit Tests**: Individual functions and components
- **Integration Tests**: API endpoints, database operations
- **E2E Tests**: User flows and critical paths

### Writing Tests

```javascript
// Example Jest test
describe('Portfolio Controller', () => {
  it('should create a new portfolio', async () => {
    const portfolio = await createPortfolio(mockData);
    expect(portfolio).toHaveProperty('id');
    expect(portfolio.title).toBe(mockData.title);
  });
});

// Example React component test
describe('HeroBlock', () => {
  it('renders title and subtitle', () => {
    render(<HeroBlock content={mockContent} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});
```

## Documentation

### When to Update Docs

- Adding new features
- Changing API endpoints
- Modifying environment variables
- Adding new dependencies
- Changing project structure

### Documentation Files

- `README.md` - Main documentation
- `SETUP.md` - Installation guide
- `CHANGELOG.md` - Version history
- Code comments - Complex logic

## Communication

### Where to Ask Questions

- **GitHub Discussions** - General questions
- **GitHub Issues** - Bugs and features
- **Pull Requests** - Code review questions

### Response Times

- We aim to respond to issues within 48 hours
- PRs will be reviewed within one week
- Be patient and respectful

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Recognized in community updates

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Portfolio Builder Platform! 🚀

Your efforts help make this project better for everyone. We appreciate your time and expertise!
