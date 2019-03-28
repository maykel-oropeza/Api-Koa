const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const uuidv4 = require('uuid/v4');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const fs = require('fs');
const books = JSON.parse(fs.readFileSync('./src/books.json', 'utf8'));
const validate = require('koa-joi-validate');
const bookReqValidation = require('./requestValidations/book.js');
//const Joi = require('joi');

const app = new Koa();
const router = new Router();

const store = books;

router.get('/books', ctx => {
  ctx.body = store
})

router.post('/book', validate(bookReqValidation.store), (ctx , next) => {
  try {

    const register = {
      id: uuidv4(),
      ...ctx.request.body
    };
  
    store[register.id] = register
    ctx.body = register
    
    //throw error
    //throw new Error('hardcode Error');

  }catch(err){
    ctx.throw(500, 'some other code error' + err);
  }
});

router.get('/book/:id', ctx => {
  const book = store[ctx.params.id];
  if(book){
    ctx.body = book;
  }else{
    ctx.throw(400,'Books with ID: ' + ctx.params.id +' Not found');
  }
});

router.put('/book/:id', validate(bookReqValidation.update), ctx => {

  const register = store[ctx.params.id];

  if (register) {
    store[register.id] = {
      ...register,
      ...ctx.request.body
    };

    ctx.body = store[register.id];
  }
});

router.delete('/book/:id', ctx => {

  const book = store[ctx.params.id];
  
  if(book){
    let removed = store[ctx.params.id];
    delete store[ctx.params.id];

    ctx.body = {
      "msj" : "Remove Succes",
      "object": removed
    };

  }else{
    ctx.throw(400,'Books with ID: ' + ctx.params.id +' Not found');
  }
  
});

/*
  Joi.validate(req.body, schema, function(err, value) {
    if (err) {
      return catched(err.details); 
    }
  });

  function catched(reject) {
    res.json({
      validData: false,
      errors: reject
    });
  }
*/

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(logger())

app.listen(8080);
