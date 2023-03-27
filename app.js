const express = require('express')
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const PaymentsController = require('./controllers/PaymentsControllers')
const paymentsController = new PaymentsController()

//swagger
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');


const swaggerDefinition = {
    openapi: "3.0.0",
    info:{
        title: "API de stripe node-express",
        version:"1.0.0",
    },
    servers:[{
        url: "http://localhost:5000"
    }],
    //apis:[`${path.join(__dirname,"./controllers/*js")}`],
};
const options = {
  swaggerDefinition,
  apis:[`${path.join(__dirname,"./controllers/*js")}`],
};
app.use("/doc",swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)));
app
    .use(cors({
        origin: process.env.VUE_APP_FRONT,
        optionsSuccessStatus: 200
    }));

app.use((req,res,next)=>{
        bodyParser.json()(req,res,next);
    
});
app
    .post('/customers', paymentsController.customers)
    .post('/customers/:id/update', paymentsController.update)
    .post('/customers/:id/source', paymentsController.source)
    .post('/customers/:id/cardDefault', paymentsController.cardDefault)
    .post('/customer/token/create',paymentsController.token)
    .post('/payment_intents/create', paymentsController.created)
    .post('/payment_intents/confirm', paymentsController.confirm)
app
    .get('/customers/:id/listSources', paymentsController.listSources)
    .get('/userslist', paymentsController.userList)
    .get('/userslist/:id/user', paymentsController.onlycustom)
app 
    .delete('/customers/:id/delete',paymentsController.delete)
    .delete('/customers/:id/deletecard',paymentsController.deleteCard)
module.exports = app