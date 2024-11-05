const express = require("express");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    fs.readdir("uploads", {withFileTypes: true}, function(err, files){
        if (err) {
           console.log(err)
        } else {
            res.render('index', {files})
        }
    })
})


app.get("/createfile", function(req, res){
    fs.writeFile(`./uploads/${req.query.filename}`, req.query.content, function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/")
        }
    })
})


app.get("/viewfile/:filename", function(req, res){
    fs.readFile(`./uploads/${req.params.filename}`, "utf-8", function(err, data){   
        if(err){
            console.log(err)
        }else{
            res.render("viewfile", {filename: req.params.filename, data})
        }
    })
})

app.get("/Deletefile/:filename", function(req, res){
    fs.unlink(`./uploads/${req.params.filename}`, function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/")
        }
    })
})


app.get("/Editfile/:filename", function(req, res){
    fs.readFile(`./uploads/${req.params.filename}`, "utf-8", function(err, data){
        res.render("edit", {filename: req.params.filename, data})
    })
})




app.get("/updatefile/:oldfilename", function(req, res){
    const oldname = req.params.oldfilename
    const newname = req.query.title
    fs.rename(`./uploads/${oldname}`, `./uploads/${newname}`, function(err){
        if(err){
            console.log(err)
        }else{
           fs.writeFile(`./uploads/${newname}`, req.query.description, function(err){
            if(err){
                console.log(err)
            }else{
                res.redirect("/")
            }
           })
        }
    })
})
app.listen(3000)