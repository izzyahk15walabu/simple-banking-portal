 const fs = require('fs');
 const path = require('path');
 const express = require('express');
 const bodyparser= require('body-parser');

 const app = express();

 const accountRoutes= require('./routes/accounts');
 const  servicesRoutes= require('./routes/services')


 app.set('views', path.join(__dirname,'/views'));

 app.set ('view engine','ejs');
 app.use(express.static(path.join(__dirname,'/public')));

 //app.use(express.urlencoded({extended:true}));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
 let {accounts,users,writeJSON} = require('./data');


 app.use('/account',accountRoutes);
 app.use('/services',servicesRoutes);

//  const accountData =fs.readFileSync(`src/json/accounts.json`,{encoding: `UTF8`});
//  const  accounts = JSON.parse(accountData);
//  //console.log(accounts);
 
//  const userData= fs.readFileSync(`src/json/users.json`,{encoding:'UTF8'});
// const users= JSON.parse(userData);


 app.get("/",(req,res)=>{

res.render('index',{title:'Account Summary', accounts: accounts});
 });



app.get('/profile',(req,res)=>{

  res.render('profile',{user: users[0]});
});






 app.listen(3000,()=>{
   console.log('PS Project Running  on port 3000!');
 });