const express = require("express");
const app = express();
const cors = require("cors");
const auth = require('./auth')
const Joi = require("@hapi/joi")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const saltRounds = 10;

// COnnect to DB 
const pool = require('../Nodejs_mysql_project/config/database');
const { response } = require("express");


// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());


app.get("/viewdetails", (req, res) => {
    pool.query('SELECT * from users', (err, rows) => {
        if (err) throw err;
        res.send(rows)
    });
});

app.get("/viewdetails/:id", (req, res) => {
    pool.query('SELECT *  from users WHERE id = ?', [req.params.id], (err, rows) => {
        if (err) throw err;
        res.send(rows);
        //console.log('The data from users table are: \n', rows);
        //connection.end();
    });
});
app.delete("/viewdetails/:id", (req, res) => {
    pool.query('DELETE  from users WHERE id = ?', [req.params.id], (err, rows) => {
        if (err) throw err;
        //res.send(rows);
        res.send("deleted successfully")
        //console.log('The data from users table are: \n', rows);
        //connection.end();
    });
});

app.get("/edit/:id", (req, res) => {
    pool.query('SELECT *  from users WHERE id = ?', [req.params.id], (err, rows) => {
        if (err) throw err;
        res.send(rows);
        //console.log('The data from users table are: \n', rows);
        //connection.end();
    });
});

app.put("/edit/:id", async (req, res) => {

    const { Name, Email, MobileNo, DOB, Address, UserName, Password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);
    let sql = 'UPDATE users SET  Name= ?, Email= ?, MobileNo= ?, DOB= ?,Address= ?,UserName= ?,Password= ? WHERE id= ?'
    pool.query(sql, [Name, Email, MobileNo, DOB, Address, UserName, hashedPassword, req.params.id], (err, rows) => {

        if (err) throw err;
        //res.send("Updated successfully")
        console.log("update successful")
    })
})

app.post("/signup", async (req, res) => {

    const schema = Joi.object({
        Name: Joi.string().required(),
        Email: Joi.string().email().required(),
        MobileNo: Joi.number().min(10).required(),
        DOB: Joi.date().required(),
        Address: Joi.string().required(),
        UserName: Joi.string().required(),
        Password: Joi.string().min(6).required()
    });
    
    const { error} = schema.validate(req.body);
    
    if(error){
        res.status(400).send(error);
        return;
    }

    const { Name, Email, MobileNo, DOB, Address, UserName, Password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const user = {
        Name: Name,
        Email: Email,
        MobileNo: MobileNo,
        DOB: DOB,
        Address: Address,
        UserName: UserName,
        Password: hashedPassword,

    }
    let sql = "INSERT INTO users(Name,Email,MobileNo,DOB,Address,UserName,Password,created_at) VALUES ( ?, ?, ?, ?, ?, ?, ?,now())"
    const data = await pool.query(sql, [user.Name, user.Email, user.MobileNo, user.DOB, user.Address, user.UserName, user.Password], (err, data) => {

        if (err) throw err;
        res.status(201).json({ messege: "user created successfully", data });
        //console.log('The data from users table are: \n', data);
        //connection.end();
    });
});

app.post("/login", async (req, res) => {
    var UserName = req.body.UserName;
    var Password = req.body.Password;
    pool.query('SELECT * FROM users WHERE UserName= ?', [UserName], async function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if (results.length > 0) {
                console.log(results)
                const comparision = await bcrypt.compare(Password, results[0].Password)
                if (comparision) {
                    const token = jwt.sign({ username: UserName }, "Chinmaya", {
                        
                    });
                    res.status(200).send({
                        "code": 200,
                        "success": "login sucessfull", token, results

                    })
                }
                
                else {
                    res.status(206).send({
                        "code": 206,
                        "success": "UserName and password does not match"
                    })
                }
            }
            else {
                res.status(206).send({
                    "code": 206,
                    "success": "Username does not exits"
                });
            }
        }
    });
}
)

app.get('/profile', auth, function (req, res, next) {
    const user = req.user
    console.log(user)
    res.status(200).send({ user: user })
})

app.listen(3002, () => {
    console.log('Server is running at port 3002');
});

