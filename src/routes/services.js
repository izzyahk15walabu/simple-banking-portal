const express= require('express');

const router= express.Router();


let {accounts,writeJSON}= require('../data');


router.get('/transfer',(req,res)=>{


  res.render('transfer');
});


router.post('/transfer',(req,res)=>{

   let amount = req.body.amount;

   let newbelance= accounts[req.body.from].balance-amount;
   accounts[req.body.from].balance= newbelance;
  
accounts[req.body.to].balance= parseInt( accounts[req.body.to].balance+amount);

// const accountsJSON= JSON.stringify(accounts);

// fs.writeFileSync(path.join(__dirname,'./json/accounts.json'),accountsJSON,'utf8');

writeJSON();


res.render('transfer',{message: "Transfer Completed"});

  

  


});

router.get('/payment',(req,res)=>{

  res.render('payment',{account: accounts.credit});


});

router.post('/payment',(req,res)=>{

  

  accounts.credit.balance= accounts.credit.balance-req.body.amount;
  accounts.credit.available=parseInt(accounts.credit.available+req.body.amount) ;

  // const accountsJSON= JSON.stringify(accounts);
  // fs.writeFileSync(path.join(__dirname,'./json/accounts.json'),accountsJSON,'utf8');
  writeJSON();

  res.render('payment',{message: "Payment Successful", account: accounts.credit});

});

module.exports= router;