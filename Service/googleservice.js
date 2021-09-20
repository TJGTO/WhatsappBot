

require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID; 
const authToken = process.env.AUTH_TOKEN; 
const axios = require("axios").default;

const client = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

module.exports = class GoogleService {
    
    async sendhelloworld(req){
        
        let country,body;
        if(req.Body){
            if(req.Body.toLowerCase().startsWith('!covid')){
               country = req.Body.split(" ")[1];
               if(country){

                    let {newcase, newdeath, active} = await this.fetchlaligaresult(country);
                    if(!newcase && !newdeath && !active){
                        body = "Thik kore country name de gandu";
                    }else{
                        body = 
                       `${country} -->    
                        New Case : ${newcase}
                        Death : ${newdeath}
                        Active : ${active}`;
                    }

               }else{
                    body = "Please send a valid Message";
               }

           }else{

                body = "I am not trained enough";

           }
        }

        
       console.log("body",body);
        await client.messages
        .create({
          
        // Message to be sent
            body: body,
    
            // Senders Number (Twilio Sandbox No.)
            from: req.To,
    
            // Number receiving the message
            to: req.From
        })
      
    }

    async fetchlaligaresult(country){
        var options = {
            method: 'GET',
            url: 'https://covid-193.p.rapidapi.com/statistics',
            params: {country: country},
            headers: {
              'x-rapidapi-host': 'covid-193.p.rapidapi.com',
              'x-rapidapi-key': 'c9f04f9445msha244258667749e2p141d46jsnc78c32cdacf0'
            }
        };
          
        let result = await axios.request(options);
        let newcase,newdeath,active;
        if(result){
            if(result.data.response[0]){
                newcase = result.data.response[0].cases.new;
                newdeath = result.data.response[0].deaths.new;
                active = result.data.response[0].cases.active;
            }  
        }
        
        return { newcase , newdeath , active}
    }
};