const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Title 1',
    author: 'Author 1',
    url: 'url 1',
    likes: 0,
  },
  {
    title: 'Title 2',
    author: 'Author 2',
    url: 'url2',
    likes: 2,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  // const noteObjects = initialBlogs.map((note) => new Blog(note))
  // const promiseArray = noteObjects.map((note) => note.save())
  // await Promise.all(promiseArray)
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 1000000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
