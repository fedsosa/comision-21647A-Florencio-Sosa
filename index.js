require('dotenv').config()


const express = require('express')
const helmet = require('helmet');
const { DBTest} = require('./database.js');
const tareaModels = require('./tareaModels.js');

const app = express()





/*confugurar puerto 3000 */
const PUERTO = process.env.PUERTO

/*confugurar .ejs */
app.set('view engine', 'ejs');
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


/*este es la ruta frond */
app.get('/', async function (req, res) {
    const tareas = await tareaModels.findAll();

    res.render('frond',{ tareas: tareas });

})  



/*este es la ruta agregar */
app.get('/agregar', function (req, res) {

    res.render('agregar',{});

})

/*este es la ruta agregar con metodo post */
app.post('/agregar', async function (req, res) {
   // const tematica = req.body.tematica
    //const descripcion = req.body.descripcion
    const {tematica, descripcion, imagen,fecha} = req.body
     
    //res.send('Producto agregado');

    try {
        const nuevaTarea = await tareaModels.create({
            tematica: tematica,
            descripcion: descripcion,
            imagen: imagen,
            fecha: fecha
        });

        if (nuevaTarea) {
            res.redirect('/');
        } else {
            res.send('No se pudo agregar la tarea :(')
        }
    } catch (err) {
        res.send('Se produjo un errror al cargar la tarea: ' + err)
    }
})



// Elimino la tarea 
app.get('/eliminar/:id', async function (req, res) {
    const { id } = req.params;

    try {
        const borrarTarea = await tareaModels.destroy({
            where: {
                id: id
            }
        })

        if (borrarTarea) {
            res.redirect('/');
        } else {
            res.send('No se pudo borrar la tarea :(')
        }
    } catch (err) {
        res.send('Se produjo un errror al borrar la tarea: ' + err)
    }
})
// editar la tarea
app.get('/editar/:id', async function (req, res) {
    const { id } = req.params;

    try {
        const tarea = await tareaModels.findOne({
            where: {
                id: id
            }
        })

        if (tarea) {
            res.render('editar', { tarea: tarea });
        } else {
            res.send('No se pudo encontrar la tarea :(')
        }
    } catch (err) {
        res.send('Se produjo un errror al buscar la tarea: ' + err)
    }
})

// actualizar la tarea 

app.post('/editar/:id', async function (req, res) {
    const { id } = req.params;
    const { tematica, descripcion,imagen,fecha } = req.body

    try {
        const tareaActualizada = await tareaModels.update(
            {
                tematica: tematica,
                descripcion: descripcion,
                imagen:imagen,
                fecha:fecha,
            }, {
                where: {
                    id: id
                }
            }
        )
        
        if (tareaActualizada) {
            res.redirect('/');
        } else {
            res.send('No se pudo actualizar la tarea :(')
        }
    } catch (err) {
        res.send('Se produjo un errror al actualizar la tarea: ' + err)
    }
})



DBTest();

app.listen(PUERTO, () => {
    console.log(`El servidor está corriendo en el puerto ${PUERTO}`)
})
