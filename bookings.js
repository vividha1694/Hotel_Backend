var express = require("express");

var router = express.Router();

var app = express();
var MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri =
  "mongodb+srv://vividha1694:xNd7hmC9aVDW8E0u@cluster1.2uosjhd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

const client = new MongoClient(uri);

const DB_NAME = "Hotel";
const COLLECTION_ROOM = "bookings";

router.get("/", async function (req, res) {
  let dbo = await client.db(DB_NAME);
  let data = await dbo
    .collection(COLLECTION_ROOM)
    .find()
    .sort({ name: 1 })
    .toArray();
  console.log("data >> ", data);
  res.json(data);
});

router.post("/", async function (req, res) {
  let dbo = await client.db(DB_NAME);
  var myobj = req.body;
  let data = await dbo.collection(COLLECTION_ROOM).insertOne(myobj);
  console.log(data);

  console.log(req.body);
  const user = req.body;
  res.json({ message: "1 record inserted" });
});

router.get("/:id", async function (req, res) {
  console.log("I am id= " + req.params.id);

  let dbo = await client.db(DB_NAME);
  let data = await dbo
    .collection(COLLECTION_ROOM)
    .find({ _id: new ObjectId("" + req.params.id + "") })
    .toArray();
  console.log("data >> ", data);
  res.json(data[0]);
});

router.put("/:id", async function (req, res) {
  console.log("I am id= " + req.params.id);
  console.log(req.body);
  const user = req.body;

  var myquery = { _id: new ObjectId(req.params.id) };
  var newvalues = { $set: req.body };

  let dbo = await client.db(DB_NAME);
  let data = await dbo
    .collection(COLLECTION_ROOM)
    .updateOne(myquery, newvalues);

  res.json({ message: "1 record inserted" });
});

router.delete("/:id", function (req, res) {
  console.log("I am id= " + req.params.id);

  var con = mysql.createConnection({
    host: "localhost",
    user: "react",
    password: "react",
    database: "cart_app",
  });

  con.connect(function (err) {
    if (err) throw err;
    con.query(
      `Delete FROM users where id=${req.params.id}`,
      function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json({ message: "User Deleted" });
      }
    );
  });
});

//Routes will go here
module.exports = router;