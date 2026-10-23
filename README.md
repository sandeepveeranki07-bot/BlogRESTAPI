# Blog REST API

## Project Description

The Blog REST API is a backend application built with Node.js and Express.js. It allows users to create, retrieve, update, and delete blog posts through HTTP requests.

Blog posts are stored in a local JSON file named `posts.json`.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- JSON file storage
- REST API

## Features

- Create a blog post.
- Retrieve all blog posts.
- Retrieve a single blog post by ID.
- Update an existing blog post.
- Delete a blog post.
- Validate required fields.
- Return appropriate HTTP status codes and error messages.

## Installation

1. Install Node.js.
2. Open a terminal in the project folder.
3. Install the dependencies:

   ```bash
   npm install
   ```

## Run the Project

Start the server:

```bash
npm start
```

The API runs at:

`http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check server status |
| POST | `/posts` | Create a blog post |
| GET | `/posts` | Retrieve all blog posts |
| GET | `/posts/:id` | Retrieve a post by ID |
| PUT | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |

## Blog Post Fields

Each post contains:

- `id`: Unique identifier
- `title`: Blog post title
- `content`: Blog post content
- `author`: Author name
- `category`: Blog category
- `createdAt`: Creation timestamp

## Validation

The API requires `title`, `content`, `author`, and `category` when creating or updating a post.

If required fields are missing, it returns HTTP `400 Bad Request`.

If a requested post does not exist, it returns HTTP `404 Not Found`.

## Data Storage

Blog posts are saved in `posts.json`. The file should contain a valid JSON array.

## Author

Student