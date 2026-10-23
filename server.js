const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, "posts.json");

app.use(express.json());

// Read posts from the JSON file
function readPosts() {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
}

// Save posts to the JSON file
function savePosts(posts) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Blog REST API!",
        status: "Server is running"
    });
});

// CREATE: Add a new blog post
app.post("/posts", (req, res) => {
    const { title, content, author, category } = req.body;

    if (!title || !content || !author || !category) {
        return res.status(400).json({
            error: "Title, content, author, and category are required."
        });
    }

    const posts = readPosts();

    const newPost = {
        id: Date.now(),
        title,
        content,
        author,
        category,
        createdAt: new Date().toISOString()
    };

    posts.push(newPost);
    savePosts(posts);

    res.status(201).json({
        message: "Blog post created successfully.",
        post: newPost
    });
});

// READ: Retrieve all blog posts
app.get("/posts", (req, res) => {
    const posts = readPosts();
    res.status(200).json(posts);
});

// READ: Retrieve a single blog post by ID
app.get("/posts/:id", (req, res) => {
    const posts = readPosts();
    const post = posts.find(p => p.id === Number(req.params.id));

    if (!post) {
        return res.status(404).json({
            error: "Blog post not found."
        });
    }

    res.status(200).json(post);
});

 // UPDATE: Modify an existing blog post
app.put("/posts/:id", (req, res) => {
    const posts = readPosts();
    const postId = Number(req.params.id);

    const index = posts.findIndex(post => post.id === postId);

    if (index === -1) {
        return res.status(404).json({
            error: "Blog post not found."
        });
    }

    const { title, content, author, category } = req.body;

    if (!title || !content || !author || !category) {
        return res.status(400).json({
            error: "Title, content, author, and category are required."
        });
    }

    posts[index] = {
        ...posts[index],
        title,
        content,
        author,
        category
    };

    savePosts(posts);

    res.status(200).json({
        message: "Blog post updated successfully.",
        post: posts[index]
    });
});

// DELETE a blog post
app.delete("/posts/:id", (req, res) => {
    const posts = readPosts();
    const postId = Number(req.params.id);

    const index = posts.findIndex(post => post.id === postId);

    if (index === -1) {
        return res.status(404).json({
            error: "Blog post not found."
        });
    }

    const deletedPost = posts[index];

    posts.splice(index, 1);
    savePosts(posts);

    res.status(200).json({
        message: "Blog post deleted successfully.",
        post: deletedPost
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Blog REST API running at http://localhost:${PORT}`);
});

