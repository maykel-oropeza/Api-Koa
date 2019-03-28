var Joi = require('joi');


module.exports = { 

   // set custon label
  // field : Joi.string().required().label("custom label")

  // throw custom error 
  // field : Joi.string().required().error(new Error('Error al procesar el campo "field"'))

  //store books
  store : {
    body : {
      name: Joi.string().min(3).required(),
      editorial: Joi.string().min(3).required(),
      author : Joi.string().min(3).required(),
      edition : Joi.string().length(4),
      description : Joi.string().min(3).required()
    }
  },
  
  update : {
    body : {
      name: Joi.string().min(3).required(),
      editorial: Joi.string().min(3).required(),
      author : Joi.string().min(3).required(),
      edition : Joi.string().length(4).required(),
      description : Joi.string().min(3).required()
    }
  }
  
}
