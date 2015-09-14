exports.create = function(connectUrl, mongoClient, assert, collection, bson){

  mongoClient.connect(connectUrl,
    function(err, db){

      assert.equal(null, err);
      console.log("Connected Mongo at " + connectUrl);

      var collectionObj = db.collection(collection);
      collectionObj.insert(
        bson,
        function (err, result){
          if(err){
            db.close();
            console.error("I was here");
            return console.error(err);
            console.error("I was here too")
          }
          console.log('Inserted: ');
          console.log(result);
          console.log('Inserted ' + result.length + ' docs');
          return db.close();
        }
      );
    }
  );
};

exports.update = function(connectUrl, mongoClient, assert, collection, query, updatedBson){

  mongoClient.connect(connectUrl,
    function(error, db){

      assert.equal(null, error);
      console.log("Connected Mongo at " + connectUrl);

      var collectionObj = db.collection(collection);
      collectionObj.update(
        query,
        updatedBson,
        {w: 1},
        function(error, count){
          if(error){
            db.close();
            return console.error(error);
          }
          console.log('Updated ' + count + ' documents');
          return db.close();
        }
      );

    }
  );
};

exports.deletes = function(connectUrl, mongoClient, assert, collection, query){

  mongoClient.connect(connectUrl,
    function(error, db){

      assert.equal(null, error);
      console.log("Connected Mongo at " + connectUrl);

      var collectionObj = db.collection(collection);
      collectionObj.remove(
        query,
        function(error, count){
          if(error){
            db.close();
            return console.error(error);
          }
          console.log('Deleted ' + count + ' documents');
          return db.close();
        }
      );
    }
  );
};

exports.read = function(connectUrl, mongoClient, assert, collection, query, callback){

  mongoClient.connect(connectUrl,
    function(error, db){

      assert.equal(null, error);
      console.log("Connected Mongo at " + connectUrl);

      var collectionObj = db.collection(collection);
      collectionObj.findOne(
        query,
        function(error, document){
          if(error){
            db.close();
            return console.error(error);
          }
          console.log('Fetched ');
          console.log(document);
          db.close();
          return callback(document);
        }
      );
    }
  );
};