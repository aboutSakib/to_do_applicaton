const express=require ("express");
const app=express();
const port=5008;
const mysql = require("./connection").con 

 app.set("view engine", "hbs");
 app.set("views", "./view")
 app.use(express.static(__dirname + "/public"))
 //routing
 app.get("/",(req,res)=>{
    res.render("index")
 })

 app.get("/add", (req, res) => {
    res.render("add")

});
app.get("/search", (req, res) => {
    res.render("search")

});
app.get("/update", (req, res) => {
    res.render("update")

});

app.get("/delete", (req, res) => {
    res.render("delete")

})
app.get("/view", (req, res) => {
    res.render("view")

})


//add student start here

app.get("/addstudent", (req, res) => {
    // fetching data from form
    const { name, phone, email, gender } = req.query

    // Sanitization XSS...
    let qry = "select * from users where email=? or phone_no=?";
    mysql.query(qry, [email, phone], (err, results) => {
        if (err)
            throw err
        else {

            if (results.length > 0) {
                res.render("add", { checkmesg: true })
            } else {

                // insert query
                let qry2 = "insert into users(name,phone_no,email,gender) values(?,?,?,?)";
                mysql.query(qry2, [name, phone, email, gender], (err, results) => {
                    if(err){
                        throw err;
                    }
                    if (results.affectedRows > 0) {
                        res.render("add", { mesg: true })
                    }
                })
            }
        }
    })
});


//add student end here

// search student start here
app.get("/searchstudent", (req, res) => {
    // fetch data from the form


    const { phone } = req.query;

    let qry = "select * from users where phone_no=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("search", { mesg1: true, mesg2: false })
            } else {

                res.render("search", { mesg1: false, mesg2: true })

            }

        }
    });
})


//search student end here

//update student start here
app.get("/updatesearch", (req, res) => {

    const { phone } = req.query;

    let qry = "select * from users where phone_no=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("update", { mesg1: true, mesg2: false, data: results })
            } else {

                res.render("update", { mesg1: false, mesg2: true })

            }

        }
    });
})

//update student end here
app.get("/updatestudent", (req, res) => {
    // fetch data

    const { phone, name, gender } = req.query;
    let qry = "update users set name=?, gender=? where phone_no=?";

    mysql.query(qry, [name, gender, phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("update", { umesg: true })
            }
        }
    })

});

app.get("/removestudent", (req, res) => {

    // fetch data from the form


    const { phone } = req.query;

    let qry = "delete from users where phoneno=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("delete", { mesg1: true, mesg2: false })
            } else {

                res.render("delete", { mesg1: false, mesg2: true })

            }

        }
    });
});

//  create server

 app.listen(port,(err)=>{
    if(err)
       throw err 
    else
       console.log("servr is ruuning http://localhost:"+port);
 })
 