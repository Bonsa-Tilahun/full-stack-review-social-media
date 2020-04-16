module.exports = {
    getPosts: async(req, res) => {
        //TODO Get all posts
        const posts = await req.app.get('db').get_posts()
        res.status(200).send(posts)
    },
    addPost: async(req, res) => {
        //TODO Create new post
        const db = req.app.get('db')
        const { users_id, content } = req.body
        await db.add_post([users_id, content])
        const posts = await req.app.get('db').get_posts()
        res.status(200).send(posts)
    },
    editPost: async(req, res) => {
        //TODO Edit existing post
        const db = req.app.get('db')
        const { post_id } = req.params
        const { content } = req.body
        await db.edit_post(content, post_id)
        const posts = await req.app.get('db').get_posts()
        res.status(200).send(posts)
    },
    deletePost: async(req, res) => {
        //TODO Delete existing post
        const db = req.app.get('db')
        const { post_id } = req.params
        await db.delete_post(post_id)
        const posts = await req.app.get('db').get_posts()
        res.status(200).send(posts)
    }
};