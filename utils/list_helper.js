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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
