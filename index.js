const cors = require('cors');
const multer = require('multer');
const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage}).any();

app.get('/',(req,res)=>{
    res.send('Server is up and running..');
})

app.post('/postFile', (req,res) => {
    upload(req, res, (err) => {
        if(err) res.status(400).json({msg: 'Error upload file'});
        else res.status(200).json({msg: 'File uploaded successfully...'})
    })
});

app.get('/getFile/:name', (req,res) => {
    const filename = req.params.name;
    fs.readFile(`uploads/${filename}`, (err,data) => {
       if(err) res.status(400).send(err);
       else res.status(200).send(data);
    })
});

app.listen(port, ()=>{
    console.log(`Server is running in ${port}...`);
})