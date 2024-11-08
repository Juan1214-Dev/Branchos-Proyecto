const exp = require('express');
const path = require('path'); // lla a path y lo guarda en una variable
const mongoose = require('./config/database')
const logger = require('morgan')
const modeloPer = require('./models/persona.model')
const app = exp();



app.use(exp.urlencoded({extended: false})); 
app.use(exp.json());
app.set('view engine','ejs');  //para declarar el tipo view engine que se usara
app.set('views', path.join(__dirname,'./views'));  // establecer la ruta por medio del paquete path

app.get('/', (req,res)=>{
    res.render('paginas/bienvenido')
})

app.get('/catalogo', (req,res)=>{
    res.render('paginas/catalogo')
})

app.get('/lista', (req,res)=>{
    res.render('paginas/lista')
})




app.get('/inicio-sesion', (req,res)=>{
    res.render('paginas/inicio-sesion')
})

app.get('/confirmar-compra', (req,res)=>{
    res.render('paginas/confirmar-compra')
})

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
app.post('/newPersona', async (req,res)=>{
    console.log(req.body)

 let aprendiz = new modeloPer({ 

    email: req.body.emailPersona,
    nombre: req.body.nombrePersona,
    telefono: req.body.emailTelefono,
    documento: req.body.nombreDocumento,
});


    await aprendiz.save()
    .then((doc) => {
        console.log(doc);
        res.send('<h2>insertado</h2>')

        res.end()

    })
    .catch((err) => {
        console.error(err);
        res.send('<h2>Error</h2>')
        res.end()

    });
})

app.get('/registrarPersona', (req,res)=>{
    res.render('paginas/registroPersona')
})


app.get('/verRegistros', (req,res)=>{
    

    modeloPer.find({  })
    .then(doc => {
        console.log(doc)
        res.render('paginas/verRegistros',{
            listaPersonas: doc
        });
        
      })
    .catch(err => {
        console.error(err)
      })
})


/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/




app.use(exp.static(path.join(__dirname, 'static')));

app.listen(9000, ( ) => {
    console.log( ' servidor en linea ');

});

