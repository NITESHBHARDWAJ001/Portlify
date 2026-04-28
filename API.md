# API Documentation

Complete REST API reference for Portfolio Builder Platform.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Error Responses

All endpoints follow a standard error format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional validation errors
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication Endpoints

### Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Auth Required:** No

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

**Validation Rules:**
- `username`: 3-30 characters, alphanumeric, unique
- `email`: Valid email format, unique
- `password`: Minimum 6 characters
- `fullName`: Required

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "60d5ec49f1b2c72b8c8e4a1a",
      "username": "johndoe",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "user",
      "createdAt": "2024-03-06T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User already exists"
}
```

---

### Login User

Authenticate and receive JWT token.

**Endpoint:** `POST /auth/login`

**Auth Required:** No

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "60d5ec49f1b2c72b8c8e4a1a",
      "username": "johndoe",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Get Current User

Get the authenticated user's profile.

**Endpoint:** `GET /auth/me`

**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4a1a",
    "username": "johndoe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "avatar": "https://...",
    "bio": "Full Stack Developer",
    "role": "user",
    "portfolios": [],
    "templates": [],
    "savedTemplates": []
  }
}
```

---

### Update Profile

Update user profile information.

**Endpoint:** `PUT /auth/profile`

**Auth Required:** Yes

**Request Body:**
```json
{
  "fullName": "John Smith",
  "bio": "Senior Full Stack Developer",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4a1a",
    "username": "johndoe",
    "email": "john@example.com",
    "fullName": "John Smith",
    "bio": "Senior Full Stack Developer",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

---

### Change Password

Update user password.

**Endpoint:** `PUT /auth/password`

**Auth Required:** Yes

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

## Portfolio Endpoints

### Create Portfolio

Create a new portfolio.

**Endpoint:** `POST /portfolios`

**Auth Required:** Yes

**Request Body:**
```json
{
  "title": "My Portfolio",
  "description": "My personal portfolio website",
  "canvasLayout": {
    "sections": [],
    "globalBackground": { "type": "color", "value": "#ffffff" }
  }
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4a1a",
    "title": "My Portfolio",
    "slug": "johndoe-my-portfolio",
    "owner": "60d5ec49f1b2c72b8c8e4a1a",
    "description": "My personal portfolio website",
    "canvasLayout": { ... },
    "isPublished": false,
    "views": 0,
    "createdAt": "2024-03-06T10:00:00.000Z"
  }
}
```

---

### Get User Portfolios

Get all portfolios owned by the authenticated user.

**Endpoint:** `GET /portfolios`

**Auth Required:** Yes

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4a1a",
      "title": "My Portfolio",
      "slug": "johndoe-my-portfolio",
      "description": "My personal portfolio",
      "isPublished": true,
      "views": 250,
      "createdAt": "2024-03-06T10:00:00.000Z",
      "updatedAt": "2024-03-06T15:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "pages": 1
  }
}
```

---

### Get Portfolio by ID

Get a specific portfolio by ID.

**Endpoint:** `GET /portfolios/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Portfolio ID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4a1a",
    "title": "My Portfolio",
    "slug": "johndoe-my-portfolio",
    "owner": {
      "_id": "60d5ec49f1b2c72b8c8e4a1a",
      "username": "johndoe",
      "fullName": "John Doe"
    },
    "description": "My personal portfolio",
    "canvasLayout": { ... },
    "isPublished": true,
    "views": 250,
    "createdAt": "2024-03-06T10:00:00.000Z"
  }
}
```

---

### Update Portfolio

Update a portfolio by ID.

**Endpoint:** `PUT /portfolios/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Portfolio ID

**Request Body:**
```json
{
  "title": "Updated Portfolio Title",
  "description": "Updated description",
  "canvasLayout": { ... }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4a1a",
    "title": "Updated Portfolio Title",
    "description": "Updated description",
    "canvasLayout": { ... },
    "updatedAt": "2024-03-06T16:00:00.000Z"
  }
}
```

---

### Delete Portfolio

Delete a portfolio by ID.

**Endpoint:** `DELETE /portfolios/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Portfolio ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Portfolio deleted successfully"
}
```

---

### Toggle Publish Status

Publish or unpublish a portfolio.

**Endpoint:** `PUT /portfolios/:id/publish`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Portfolio ID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4a1a",
    "isPublished": true,
    "publishedUrl": "https://yourdomain.com/p/johndoe"
  }
}
```

---

### Get Published Portfolio

Get a published portfolio by username (public endpoint).

**Endpoint:** `GET /portfolios/p/:username`

**Auth Required:** No

**URL Parameters:**
- `username`: Portfolio owner's username

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "portfolio": {
      "_id": "60d5ec49f1b2c72b8c8e4a1a",
      "title": "John Doe's Portfolio",
      "canvasLayout": { ... },
      "views": 251
    },
    "owner": {
      "username": "johndoe",
      "fullName": "John Doe",
      "avatar": "https://...",
      "bio": "Full Stack Developer"
    }
  }
}
```

**Note:** Views counter is incremented on each request.

---

### Discover Portfolios

Browse all published portfolios (public endpoint).

**Endpoint:** `GET /portfolios/discover`

**Auth Required:** No

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)
- `search` (optional): Search in title/description

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4a1a",
      "title": "John Doe's Portfolio",
      "description": "Full Stack Developer Portfolio",
      "owner": {
        "username": "johndoe",
        "fullName": "John Doe",
        "avatar": "https://..."
      },
      "views": 250,
      "createdAt": "2024-03-06T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "pages": 5
  }
}
```

---

## Template Endpoints

### Get All Templates

Get all public templates.

**Endpoint:** `GET /templates`

**Auth Required:** No (but authentication is checked for saved templates)

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search in name/description/tags
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)

**Categories:**
- `developer`
- `designer`
- `creative`
- `business`
- `minimal`
- `modern`

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4a1a",
      "name": "Modern Developer Template",
      "description": "Clean and modern template for developers",
      "author": {
        "_id": "60d5ec49f1b2c72b8c8e4a1a",
        "username": "johndoe",
        "fullName": "John Doe"
      },
      "category": "developer",
      "tags": ["modern", "clean", "professional"],
      "usageCount": 45,
      "likesCount": 12,
      "isLiked": false,
      "createdAt": "2024-03-06T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 24,
    "page": 1,
    "pages": 2
  }
}
```

---

### Get Template by ID

Get a specific template with full canvas layout.

**Endpoint:** `GET /templates/:id`

**Auth Required:** No

**URL Parameters:**
- `id`: Template ID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4a1a",
    "name": "Modern Developer Template",
    "description": "Clean and modern template",
    "author": {
      "username": "johndoe",
      "fullName": "John Doe",
      "avatar": "https://..."
    },
    "canvasLayout": {
      "sections": [ ... ],
      "globalBackground": { ... }
    },
    "category": "developer",
    "tags": ["modern", "clean"],
    "usageCount": 45,
    "likesCount": 12
  }
}
```

---

### Create Template

Create a new template from a portfolio.

**Endpoint:** `POST /templates`

**Auth Required:** Yes

**Request Body:**
```json
{
  "name": "My Template",
  "description": "Description of the template",
  "canvasLayout": { ... },
  "category": "developer",
  "tags": ["modern", "minimal"],
  "isPublic": true
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4a1a",
    "name": "My Template",
    "author": "60d5ec49f1b2c72b8c8e4a1a",
    "canvasLayout": { ... },
    "category": "developer",
    "tags": ["modern", "minimal"],
    "usageCount": 0,
    "likesCount": 0
  }
}
```

---

### Update Template

Update a template (only by author).

**Endpoint:** `PUT /templates/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Template ID

**Request Body:**
```json
{
  "name": "Updated Template Name",
  "description": "Updated description",
  "category": "designer",
  "tags": ["creative", "colorful"]
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4a1a",
    "name": "Updated Template Name",
    "description": "Updated description",
    "updatedAt": "2024-03-06T16:00:00.000Z"
  }
}
```

---

### Delete Template

Delete a template (only by author).

**Endpoint:** `DELETE /templates/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Template ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Template deleted successfully"
}
```

---

### Use Template

Create a new portfolio from a template.

**Endpoint:** `POST /templates/:id/use`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Template ID

**Request Body:**
```json
{
  "title": "My New Portfolio"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4a1a",
    "title": "My New Portfolio",
    "owner": "60d5ec49f1b2c72b8c8e4a1a",
    "canvasLayout": { ... },
    "createdAt": "2024-03-06T10:00:00.000Z"
  }
}
```

**Note:** Template's usage count is incremented.

---

### Like/Unlike Template

Toggle like status on a template.

**Endpoint:** `POST /templates/:id/like`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Template ID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "isLiked": true,
    "likesCount": 13
  }
}
```

---

### Get User Templates

Get all templates created by the authenticated user.

**Endpoint:** `GET /templates/user/my`

**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4a1a",
      "name": "My Template",
      "category": "developer",
      "usageCount": 5,
      "likesCount": 2,
      "isPublic": true,
      "createdAt": "2024-03-06T10:00:00.000Z"
    }
  ]
}
```

---

### Get Saved Templates

Get all templates liked/saved by the authenticated user.

**Endpoint:** `GET /templates/user/saved`

**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4a1a",
      "name": "Modern Developer Template",
      "author": {
        "username": "johndoe",
        "fullName": "John Doe"
      },
      "category": "developer",
      "likesCount": 12,
      "usageCount": 45
    }
  ]
}
```

---

## Canvas Layout Structure

### Canvas JSON Schema

```json
{
  "sections": [
    {
      "id": "section-1",
      "type": "hero",
      "title": "Header Section",
      "components": [
        {
          "id": "comp-1",
          "type": "hero",
          "content": {
            "title": "John Doe",
            "subtitle": "Full Stack Developer",
            "description": "Building amazing applications",
            "image": "https://example.com/avatar.jpg",
            "cta": {
              "text": "View Work",
              "link": "#projects"
            }
          },
          "style": {
            "backgroundColor": "#ffffff",
            "textColor": "#000000",
            "padding": "80px 20px",
            "borderRadius": "0px",
            "fontSize": {
              "title": "56px",
              "subtitle": "24px",
              "description": "16px"
            }
          },
          "props": {
            "animated": true,
            "animationDelay": 0.3
          }
        }
      ],
      "layout": "flex",
      "style": {
        "minHeight": "100vh",
        "backgroundColor": "#f9f9f9"
      }
    }
  ],
  "globalBackground": {
    "type": "gradient",
    "value": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  "responsive": {
    "desktop": {},
    "tablet": {},
    "mobile": {}
  }
}
```

### Component Types

- `hero` - Hero section
- `about` - About me section
- `project` - Project card
- `skills` - Skills grid
- `timeline` - Experience timeline
- `github-stats` - GitHub statistics
- `typing-animation` - Animated text
- `markdown` - Custom markdown content
- `contact` - Contact form

---

## Rate Limiting

**Current:** No rate limiting implemented

**Recommended:** 
- 100 requests per 15 minutes for auth endpoints
- 1000 requests per 15 minutes for other endpoints

---

## Webhooks (Future)

Not currently implemented. Future plans for:
- Portfolio published event
- Template created event
- User registered event

---

## Example Usage

### JavaScript (Fetch)

```javascript
// Register
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    fullName: 'John Doe'
  })
});

const data = await response.json();
const token = data.data.token;

// Get portfolios
const portfolios = await fetch('http://localhost:5000/api/portfolios', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Usage
const { data } = await api.get('/portfolios');
```

### cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"john@example.com","password":"password123","fullName":"John Doe"}'

# Get portfolios (with auth)
curl -X GET http://localhost:5000/api/portfolios \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Postman Collection

Import this URL to Postman for a complete API collection:

```
[Create and host a Postman collection file]
```

---

## Support

For API support:
- Check [README.md](./README.md)
- Open GitHub issue
- Email: api-support@portfoliobuilder.com

---

**Last Updated:** March 2024  
**API Version:** 1.0.0
