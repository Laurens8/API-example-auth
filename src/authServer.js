const jwt = require("jsonwebtoken")
const express = require("express")
const user = require('./models/user')
const router = express.Router()

router.post('/user/auth', async(req, res) => {
    console.log('user/auth router called')
    user.findOne({ eamil: req.body.eamil }),
        function(error, user) {
            if (error) res.status(401).send(error)
            else {
                if (!user || !req.body.password || user.password != req.body.password)
                    res.status(401).send("Invalid user or password")
                else {
                    console.log(user.permissionlevel)
                    const token = jwt.sign({
                        id: user.eamil,
                        roles: user.permissionlevel,
                    }, "jwtPrivateKey", { expiresin: "15m" })
                    res.status(200).send(user.email + " gevonden \n" + "token: " + token)
                }
            }


        }
})
module.exports = router