const bcrypt = require('bcryptjs')

module.exports = {
    login: async(req, res) => {
        //TODO Login existing user
        const db = req.app.get('db')
        const { email, password } = req.body
        const [existingUser] = await db.check_user(email) //de-structured existingUser from the array that came back
        if (!existingUser) {
            return res.status(404).send('User does not exist')
        }
        const authenticated = bcrypt.compareSync(password, existingUser.password)
        if (!authenticated) {
            return res.status(403).send('Username of password does not match')
        }
        delete existingUser.password
        req.session.user = existingUser
        res.status(200).send(req.session.user)
    },
    register: async(req, res) => {
        //TODO Register new user
        const db = req.app.get('db')
        const { email, password } = req.body

        const existingUser = await db.check_user(email)
        if (existingUser[0]) {
            return res.status(409).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await db.register_user([email, hash])

        req.session.user = newUser[0]
        res.status(200).send(req.session.user)

    },
    logout: (req, res) => {
        //TODO Logout user
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        //TODO Get user from session
        if (req.session) {
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    },
}