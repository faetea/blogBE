# Bloggie-GEN Back-End Repo

* front-end repo: [github.com/faetea/project-4](https://github.com/faetea/project-4)
* deployed front-end: [faetea.github.io/project-4](http://faetea.github.io/project-4)
* deployed back-end: [desolate-headland-9492.herokuapp.com](https://desolate-headland-9492.herokuapp.com)

## Technologies

- node.js
- Express
- Mongoose
- MongoDB

A node.js server using the Express framework.  The data structure is a MongoDB NoSQL database. Information is organized via a User model and a Post model, both have restrictions set via Mongoose schema.

## Concept

Building a blog engine! Your app must allow non-technical users to write blog posts. When a visitor visits your site, they should see content. When a user logs in, they should see a dashboard that lets them create and edit new posts. Blog posts should have comments.

## User Stories

### Visitor User Stories

As a visitor, I want to
- browse all public blogs.  **Crud Finished**
- select a public blog to read. **Crud Finished**

### Member User Stories

As a member, I want to
- Register a new account. **Crud Finished**
- Login to my account.  **Crud Finished**
- Logout of my account. **Crud Finished**

As a member, I want a dashboard that displays all of my existing blogs and blogposts. **Crud Finished**

As a member, I want to
- create a new blog.  **Crud Finished**
- edit my blog. **Crud Finished**
- delete my blog.

As a member, I want to
- create a new blog post. **Crud Finished**
- edit my post.
- delete my post.

As a member, I want to leave comments on blog posts I read.
