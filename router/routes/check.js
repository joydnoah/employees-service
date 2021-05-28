import express from 'express'
const checkRouter = express.Router();

/* GET home page. */
checkRouter.get('/', function(req, res, next) {
  res.send("It's working")
});

export default checkRouter;
