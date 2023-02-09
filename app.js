var express = require('express');
var app = express();
var PORT = 3000;
const router = require('./routes')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}));
app.use(router)

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});