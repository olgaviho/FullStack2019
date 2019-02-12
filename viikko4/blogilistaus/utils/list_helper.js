const dummy = (blogs) => {
    //...
    return 1
}

const totalLikes = (blogs) => {


    if (blogs.length === 0) {
        return 0
    } else {
        const likes = blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
        return likes
    }
}

const favouriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return 0
    } else {
        let mostLikes = -1
        let bestBlog = {
            title: "title",
            author: "author",
            likes: -1
        }

        blogs.forEach(blog => {
            if (blog.likes > mostLikes) {
                mostLikes = blog.likes
                bestBlog = {
                    title: blog.title,
                    author: blog.author,
                    likes: blog.likes 
                }
            }
        })
        return bestBlog;
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}