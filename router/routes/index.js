import express from 'express'
import checkRouter from './check.js'
import employeesRouter from './employees.js'

var routes = express.Router();

routes.use('/', checkRouter);
routes.use('/employees', employeesRouter);


routes.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

export default routes;
