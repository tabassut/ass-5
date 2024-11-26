/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Tashfia Tabassum
 * Email: tabassut@oregonstate.edu
 */

const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const postData = require('./postData.json')

const app = express()
const port = process.env.PORT || 3000

// Middleware to serve static files
app.use(express.static('static'))

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Root route to render all posts
app.get('/', (req, res) => {
  res.status(200).render('posts-page', { posts: postData })
})

// Route to render a single post
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10)
  if (postId >= 0 && postId < postData.length) {
    const singlePost = [postData[postId]]
    res.status(200).render('posts-page', { posts: singlePost })
  } else {
    res.status(404).render('404', { title: 'Page Not Found', message: 'Post not found.' })
  }
})

// 404 route for all other paths
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found', message: 'The page you are looking for does not exist.' })
})

// Start the server
app.listen(port, () => {
  console.log("== Server is listening on port", port)
})
