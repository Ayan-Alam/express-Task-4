const express = require('express');
const fs = require('fs');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get('/login',(req,res,next)=>{
    res.send(`<form action="/" method="GET" onSubmit="localStorage.setItem('username', document.getElementById('username').value)">
    <input type="text" name="title" id="username">
    <button type="submit">Enter Username</button>
    </input>
    </form>`)
})

app.get('/',(req,res,next)=>{
    fs.readFile('message.txt',(err,data)=>{
        if(err){
            data = 'chat does not exist'
        }
        res.send(`${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')">
    <input type="text" name ="msg" id="message">
    <input type="hidden" name="title" id="username">
    <button type="submit">Enter msg</button>
    </input>
    </form>`)
    })
})

app.post('/',(req,res,next)=>{
    const user = req.body.title;
    const chat = req.body.msg;
    fs.writeFile('message.txt',`${user} : ${chat}<br>`,{flag:'a'},(err)=>{
        console.log(err);
    })
    res.redirect('/');
})
app.listen(3000,()=>{
    console.log("server runiing on port 3000")
});