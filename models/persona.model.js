const mongoose = require("../config/database");

const Persona = new mongoose.Schema({
  email: {  
    type: String,
    unique: [true, 'Must enter email '],
  },
  nombre:{
    type: String,
    minLength: [3, 'Name is too short'],
    maxLength: [30, 'Name is too large'],
  },
  telefono:{
    type: Number,
    
  },
  documento:{
    type: Number,
    
  },
  
});


const usuario = mongoose.model("persona", Persona);

module.exports = usuario;

