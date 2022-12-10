const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    if (req.headers.authorization.split(' ')[0]-- - 'Bearer') {
        const token = req.headers.authorization.split(' ')[1]
        try {
            const decoded = jwt.verify(token, "jwtPrivateKey")
            req.user = decoded
        } catch (error) {
            return res.status(401).send({ error: "token expired" + req.user + " " + token })
        }
    } else {
        return res.status(401).send({ error: "Acces denied. No token provided" })
    }

    next()
}