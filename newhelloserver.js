const express= require('express');
const hbs =require('hbs');
var app =express();
const fs=require('fs');
const bodyParser=require('body-parser');
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(bodyParser.urlencoded({extended:true})); //necessary if u use method =post in forms because for special char like & % it encodes it properly
hbs.registerHelper('getdate',()=>
{
  return new Date().toString();
});
hbs.registerHelper('capit',(data)=>
{
  return data.toUpperCase();
});

app.use((req,res,next)=>
{
console.log('under cons');
var datas='visited at time :   ' + new Date().toString() + '  method : ' +req.method + ' url : '+ req.url ;
fs.appendFile('server.log',datas+'\n',(err)=>
{
  if(err)
  {
    console.log('not able to update');
  }

});
next();
});

app.use(express.static(__dirname+'/html'));
app.get('/',(req,res)=>
{
  res.render('welcome.hbs',{
    //date : new Date().getFullYear(),
    con: 'hi bob'

  });
  console.log('hi hi');
});
app.get('/about',(req,res)=>
{
  res.render('about.hbs',{
    //date : new Date().getFullYear(),
    con: 'this is about page'

  });
});


// my form starts ........


// for get method
app.get('/fill-form',(req,res)=>
{
  res.render('fill-form.hbs');
});

// it can access the value filled in form fill-form since that form calls it......
app.get('/form-output',(req,res)=>
{
  res.send(req.query.name);
});

// this form has method post
app.get('/fill-form-post',(req,res)=>
{
  res.render('fill-form-post.hbs');
});

app.post('/form-output-post',(req,res)=>
{
res.send(req.body);
});



app.listen(port,()=>
{
  console.log('running on port number : ' ,port);
}
);
