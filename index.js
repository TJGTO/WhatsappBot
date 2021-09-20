const GoogleService = require('./Service/googleservice');
const express = require('express');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello");
});

app.post('/whatsapp',async(req,res)=>{
    console.log(req.body);


    const result = await new GoogleService().sendhelloworld(req.body);

});
const PORT = 8000;
app.listen(PORT,()=>{
    console.log(`Server is running on port no ${PORT}`);
});