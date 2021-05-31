const jwt = require('jsonwebtoken')
const pool = require('./config/database')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, "Chinmaya")
        pool.query('SELECT * FROM users WHERE UserName= ?', [decoded.username], async function (error, results, fields) {
            if (error) {
                return error;
            }
            console.log(results[0])
            req.user = results[0];
            next()
        })

    } catch (e) {
        res.status(401).send({ message: "Please Authenticate" })
    }
}
module.exports = auth