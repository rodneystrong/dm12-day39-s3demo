const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      massive = require('massive'),
      AWS = require('aws-sdk'),
      config = require('./config');


AWS.config.update({
  accessKeyId: config.aws.ACCESS_KEY,
  secretAccessKey: config.aws.SECRET_KEY,
  region: 'us-west-1'
})

//before we do this, we gotta configure s3. look above for AWS.config
const s3 = new AWS.S3();

const app = module.exports = express();
//line below limits uploads to 50mb
app.use(bodyParser.json({limit: '50mb'}));
//gonna allow us to decode base64 string
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));


app.post('/api/newimage', function(req, res, next) {
  //we need to create a buffer. what is a buffer? don't matter
  //.replce is a str method. 1st takes in regex, 2nd replaces what the regex
  //finds with the 2nd param
  const buf = new Buffer(req.body.imageBody.replace(/^data:image\/w+;base64,/, ''))
  const bucketName = 'alexk/' + req.body.userEmail;
  const params = {
    Bucket: bucketName,
    Key: req.body.imageName,
    Body: buf,
    ContentType: 'image/' + req.body.imageExtension,
    ACL: 'public-read'
  }

  s3.upload(params, function(err, data) {
    if(err) return res.status(500).send(err);
    res.status(200).json(data);
  })

})

app.listen(3000, function() {
  console.log('Listening on 3000');
})
