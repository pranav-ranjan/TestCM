

require('../models/core.server.customermodel');

var mongoose = require('mongoose'),
config = require('../config/core.server.config.config'),

grid = require('gridfs-stream'),

Customer = mongoose.model('Customer');
exports.test = function(req,res){

  var options = {
    filename:'Readme.txt'
  };
  var conn = mongoose.createConnection(config.db);
  var gfs = grid(conn.db,mongoose.mongo);
  var buffer="";
  var readstream=gfs.createReadStream('Readme.txt').on("data", function (chunk) {
            buffer += chunk;
        }).on("end", function () {
            res.json( buffer);
        }).on('error', function(err) {
      res.send('ERR' + err.toString());
    });

}
exports.listAll = function( req, res) {
  var topVal = req.param('pageSize'),
        skipVal = req.param('currentPage'),
        sortBy=req.param('sortBy'),
        direction = req.param('direction'),
        top = (isNaN(topVal)) ? 10 : parseInt(req.param('pageSize'), 10),
        skip = (isNaN(skipVal)) ? 0 : parseInt(req.param('currentPage'), 0);
        if(sortBy==="name"){
          sortBy="firstName";
        }
        var sort = "desc";
        if(direction==="true")
          sort = "asc";



      var sortObject = {};
      sortObject[sortBy]=sort;
      sortObject = JSON.stringify(sortObject);
      console.log(top+','+skip+','+sortBy+','+direction +','+sort+','+sortObject);
      Customer.count({},function(err,count){
        if (err) {
           return res.status( 400).send({ message: getErrorMessage( err)
           });
         } else {
            Customer.find({}).sort(JSON.parse(sortObject)).skip(skip*top).limit(top).exec(function(err,customers){

              if (err) {
                 return res.status( 400).send({ message: getErrorMessage( err)
                 });
               } else {
                 res.setHeader('X-InlineCount', count);
                  res.json( {'count':count,'customers':customers});
               }
             });
         }
      });

  };
exports.list = function( req, res) {
  var topVal = req.param('pageSize'),
      searchText = req.param('searchText'),
        skipVal = req.param('currentPage'),
        sortBy=req.param('sortBy'),
        direction = req.param('direction'),
        top = (isNaN(topVal)) ? 10 : parseInt(req.param('pageSize'), 10),
        skip = (isNaN(skipVal)) ? 0 : parseInt(req.param('currentPage'), 0);
        if(sortBy==="name"){
          sortBy="firstName";
        }
        var sort = "desc";
        if(direction==="true")
          sort = "asc";



      var sortObject = {};
      sortObject[sortBy]=sort;
      sortObject = JSON.stringify(sortObject);

      console.log(top+','+skip +','+sortBy+','+direction+ ',' + searchText + ','+ sort);
      Customer.count({$or:[{firstName:{$regex:new RegExp(searchText,"i")}},{lastName: {$regex:new RegExp(searchText,"i")}}] },function(err,count){
        if (err) {
           return res.status( 400).send({ message: getErrorMessage( err)
           });
         } else {
           Customer.find({$or:[{firstName:{$regex:new RegExp(searchText,"i")}},{lastName: {$regex:new RegExp(searchText,"i")}}]}).sort(JSON.parse(sortObject)).skip(skip*top).limit(top).exec(function(err,customers){
              if (err) {
                 return res.status( 400).send({ message: getErrorMessage( err)
                 });
               } else {
                 res.setHeader('X-InlineCount', count);
                  res.json( {'count':count,'customers':customers});
               }
             });
         }
      });

  };
  exports.customerByID = function( req, res, next, id) {
    Customer.findOne({
      _id:id
    },function(err,customer){
      if(err){
        return next(err);
      }else{
        req.customer=customer;
        return next();
      }
    });
  };
  exports.read = function( req, res) {
    res.json( req.customer);
  };
