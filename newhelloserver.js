const express= require('express');
const hbs =require('hbs');
var app =express();
const fs=require('fs');
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
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
});
app.get('/about',(req,res)=>
{
  res.render('about.hbs',{
    //date : new Date().getFullYear(),
    con: 'this is about page'

  });
});
app.listen(port,()=>
{
  console.log('running on port number : ' ,port);
}
);
