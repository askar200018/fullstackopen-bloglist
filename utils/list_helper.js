const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum , item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) {
    return {}
  }

  const reducer = ((prevItem, newItem) => {
    if(newItem.likes > prevItem.likes) {
      return newItem
    }
    return prevItem
  })
  const blog = blogs.reduce(reducer)

  if(!blog) {
    return {}
  }

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}


const mostBlogs = (blogs) => {
  const authors = {}

  blogs.forEach(blog => {
    if(blog.author in authors) {
      authors[blog.author] += 1
    }else {
      authors[blog.author] = 1
    }
  })

  let author = { blogs: 0, author: '' }

  for(const property in authors) {
    if(authors[property] > author.blogs) {
      author = {
        blogs: authors[property],
        author: property
      }
    }
  }

  return author
}

const mostLikes  = (blogs) => {
  const authors = {}

  blogs.forEach(blog => {
    if(blog.author in authors) {
      authors[blog.author] += blog.likes
    }else {
      authors[blog.author] = blog.likes
    }
  })

  const author = Object.keys(authors).reduce((prevAuthor, key) => {
    if(authors[key] > prevAuthor.likes) {
      return { author: key, likes: authors[key] }
    }
    return prevAuthor
  }, { likes: 0, author: '' })

  return author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
