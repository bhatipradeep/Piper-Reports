const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const AWS = require('aws-sdk');


const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
AWS.config.loadFromPath('./cred.json');
var docClient = new AWS.DynamoDB.DocumentClient();
var lambda = new AWS.Lambda({apiVersion: '2015-03-31'});

//get the missing values by signing up and creating applcication autho.com
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: ``
    }),

    audience: '',
    issuer: ``,
    algorithms: ['RS256']
});






app.get('/:name',checkJwt,async (req,res)=>{
    const name = req.params.name;
    console.log(name);
    var params = {
        TableName: 'UserInfo',
        Key:{
            'name':name 
        }
    };
    const db = docClient.get(params).promise();
    try{
        const data = await db;
        if(data.hasOwnProperty('Item')){
            res.send(data.Item);
        }else{
            data={
                type:"-1"
            }
            res.send(data);
        }
    }catch(err){
        const data={
            type:"-1"
        }
        res.send(data);
    }

    
})

function getSubsriptionId(){
    return Math.random().toString(36).substr(2,15);
}
app.post('/:name',checkJwt,async (req,res)=>{
    console.log(req.body);
    const subcriptionId = getSubsriptionId(); 
    var params = {
        TableName:'UserInfo',
        Item:{
            "name":req.params.name,
            "UserName" : req.body.userName ,
            "type" : req.body.type,
            "subscriptionId" : subcriptionId
        }
    }
    console.log(params);
    var db = docClient.put(params).promise();
    await db;
    params = {
        TableName:'SubscriptionIds',
        Item:{
            "SubscriptionIds" : subcriptionId,
            "name" : req.params.name,
            "type" : req.body.type,
        }
    }
    console.log(params);
    db = docClient.put(params).promise();
    await db;
    res.status(200).send();

    
})

app.post('/subscribe/:name',checkJwt,async (req,res)=>{
    console.log(req.body);
    const subcriptionId = req.body.subscriptionId;
    var date = new Date();
    date = date.toString(); 
    const params = {
        TableName:'Subscrptions',
        Item:{
            "name":req.params.name,
            "bossId" : subcriptionId
        }
    }
    console.log(params);
    const db = docClient.put(params).promise();
    await db;
    res.status(200).send();

    
})




async function updateReports(name,report){
    var date = new Date();
    date = date.toString();
    var params = {
        TableName:'EmployeeReports',
        Item:{
            "name":name,
            "timestamp" : date,
            "report" : report,
            "keyName": name
        }
    }
    console.log(params);
    var db = docClient.put(params).promise();
    await db;
    
    params = {
        TableName: 'Subscrptions',
        Key:{
            'name':name 
        }
    }; 
    db = docClient.get(params).promise();
    const data = await db;
    console.log(data);
    params = {
        TableName:'BossReports',
        Item:{
            "bossId":data.Item.bossId,
            "author":name,
            "timestamp":date,
            "report":report
        }
    }
    console.log(params);
    var db = docClient.put(params).promise();
    await db;
    
}

app.post('/report/:name',checkJwt,async (req,res)=>{
    console.log(req.body);
    console.log(req.params)
    await updateReports(req.params.name,req.body.report);
    res.status(200).send();

    
})

app.get('/reports/:name',checkJwt,async(req,res)=>{
    const name = req.params.name;
    var params = {
        TableName: 'UserInfo',
        Key:{
            'name':name 
        }
    };
    var db = docClient.get(params).promise();
    var data = await db;
    console.log(data);
    params = {
        TableName: 'BossReports',
        Key:{
            'bossId':data.Item.subscriptionId 
        }
    };
    db = docClient.get(params).promise();
    data = await db;
    console.log(data);
    res.send(data.Item);
})


app.listen(8081, () => {
    console.log('listening on port 8081');
});
