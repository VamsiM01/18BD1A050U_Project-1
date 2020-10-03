let express = require("express");
let bodyParser = require("body-parser");
let middleware = require('./middleware');
let server = require('./server');
let app = express();

app.use(bodyParser.json());

const MongoClient = require("mongodb").MongoClient;

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'HospitalManagement';

let db;
MongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(error,client) =>{
    if(error){
        throw error;
    }

    db = client.db(dbName);
})

// 1. ALL HOSPITALS' DETAILS
app.get('/allHospitals/',middleware.checkToken,(req,res) =>{
    // res.writeHead(200,{'Content-Type':'text/html'});

    db.collection('Hospital_Info').find().toArray((err,items) =>{
        if(err){
            throw err;
        }
        res.json(items);
        // res.write("<h2>All Hospitals' Details</h2>");
        // items.forEach((item) =>{
        //     res.write(`Hospital ID : <strong>${item.Hospital_ID}</strong> <br>`);
        //     res.write(`Hospital Name : <strong>${item.Name}</strong> <br>`);
        //     res.write(`Contact : <strong>${item.Contact}</strong> <br>`);   
        //     res.write(`Type : <strong>${item.Type}</strong> <br>`);
        //     res.write(`Address : <strong>${item.Address}</strong> <br>`);
        //     res.write(`<br> <hr> <br>`);
        // });
        res.end();
    }); 
});

// 2. ALL VENTILATORS' DETAILS
app.get('/allVentilators',middleware.checkToken,(req,res) =>{
    // res.writeHead(200,{'Content-Type':'text/html'});

    db.collection('Ventilator_Info').find().toArray((err,items) =>{
        if(err){
            throw err;
        }
        res.json(items);
        // res.write("<h2>All Ventilators' Details</h2>");
        // items.forEach((item) =>{
        //     res.write(`Hospital Name : <strong>${item.Name}</strong> <br>`);
        //     res.write(`Ventilator ID : <strong>${item.Ventilator_ID}</strong> <br>`);
        //     res.write(`Status : <strong>${item.Status}</strong> <br>`);
        //     res.write(`<br> <hr> <br>`);
        // });
        res.end();
    });
});

// 3. HOSPITAL DETAILS BY HOSPITAL NAME
app.get('/HospitalInfo/:hosp_name',middleware.checkToken,(req,res) => {
    // res.writeHead(200,{'Content-Type':'text/html'});

    let hosp_name = req.params.hosp_name;
    
    db.collection('Hospital_Info').find({"Name":hosp_name}).toArray((err,items) =>{
        if(err){
            throw err;
        }
        else{
            res.json(items);
            // items.forEach((item)=>{
            //     res.write(`<h2>Hospital Details of ${hosp_name}</h2>`);
            //     res.write(`Hospital ID : <strong>${item.Hospital_ID}</strong> <br>`);
            //     res.write(`Hospital Name : <strong>${item.Name}</strong> <br>`);
            //     res.write(`Contact : <strong>${item.Contact}</strong> <br>`);   
            //     res.write(`Type : <strong>${item.Type}</strong> <br>`);
            //     res.write(`Address : <strong>${item.Address}</strong> <br>`);
            // })
            res.end();
        }
    });
});

// 4. VENTILATOR DETAILS BY HOSPITAL NAME 
app.get('/VentilatorInfo/',middleware.checkToken,(req,res) =>{
    // res.writeHead(200,{'Content-Type':'text/html'});

    let hosp_name = req.query.hosp_name;

    db.collection('Ventilator_Info').find({"Name":hosp_name}).toArray((err,items) =>{
        if(err){
            throw error;
        }
        res.json(items);
        // res.write(`<h2>Ventilator Details of ${hosp_name}</h2>`);
        // items.forEach((item) =>{
        //     res.write(`Ventilator ID : <strong>${item.Ventilator_ID}</strong> <br>`);
        //     res.write(`Status : <strong>${item.Status}</strong> <br>`);
        //     res.write(`<br> <hr> <br>`);
        // })
        res.end();
    });
});

// 5. VENTILATOR DETAILS BY STATUS 
app.post('/VentilatorInfoByStatus/',middleware.checkToken,(req,res) =>{
    // res.writeHead(200,{'Content-Type':'text/html'});

    let status = req.body.Status;

    db.collection('Ventilator_Info').find({"Status":status}).toArray((err,items) =>{
        if(err){
            throw err;
        }
        res.json(items);
        // res.write(`<h2>Ventilators which are ${status}</h2>`);
        // items.forEach((item) =>{
        //     res.write(`Ventilator ID : <strong>${item.Ventilator_ID}</strong> <br>`);
        //     res.write(`Hospital Name : <strong>${item.Name}</strong> <br>`);
        //     res.write(`<br> <hr> <br>`);
        // });
        res.end();
    });
});

// 6. UPDATE VENTILATOR INFO
app.put('/updateVentilator/',middleware.checkToken,(req,res) =>{
    res.writeHead(200,{'Content-Type':'text/html'});
    let status = req.body.Status;
    let v_id = req.body.Ventilator_ID;

    let myquery = {"Ventilator_ID":v_id};
    let newquery = { $set: {"Status":status}};
    db.collection('Ventilator_Info').updateOne(myquery,newquery,(err,res1) =>{
        if(err){
            throw err;
        }
        console.log("Document updated");
        console.log(res1.result);
    });
    res.end("<h2>Ventilator Updated</h2>");
});

// 7. ADD VENTILATOR
app.post('/addVentilator/',middleware.checkToken,(req,res) =>{
    res.writeHead(200,{'Content-Type':'text/html'});
    let hosp_id = req.body.Hospital_ID;
    let hosp_name = req.body.Hospital_Name;
    let v_id = req.body.Ventilator_ID;
    let status = req.body.Status;

    let myobj = {"Hospital_ID":hosp_id,"Name":hosp_name,"Ventilator_ID":v_id,"Status":status};
    db.collection('Ventilator_Info').insertOne(myobj,(err,res1) =>{
        if(err){
            throw err;
        }
        console.log("Ventilator added");
        console.log(res1.result);
    });

    res.end("<h2>Document Added</h2>");
});

// 8. DELETE VENTILATOR
app.delete('/deleteVentilator/',middleware.checkToken,(req,res) =>{
    res.writeHead(200,{'Content-Type':'text/html'});

    let v_id = req.body.Ventilator_ID;

    let delObj = {"Ventilator_ID":v_id};
    db.collection('Ventilator_Info').deleteOne(delObj,(err,res1) =>{
        if(err){
            throw err;
        }

        console.log("Ventilator Deleted");
        console.log(res1.result);
    });
    res.end("<h2>Document Deleted</h2>");
});

app.listen(8000,() =>{
    console.log("Server listening at PORT 8000");
});

