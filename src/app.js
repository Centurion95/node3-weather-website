//node 3-web-server/src/app.js

// console.log('Hello');

//rc95 11/07/2022 22:02
// console.log(__dirname); ///home/rodrigo/01_NODEJS_COURSE/3-web-server/src/
// console.log(__filename); ///home/rodrigo/01_NODEJS_COURSE/3-web-server/src/app.js
//https://nodejs.org/dist/latest-v16.x/docs/api/path.html
const path = require('path');
// console.log(path.join(__dirname, '../public')); ///home/rodrigo/01_NODEJS_COURSE/3-web-server/public


const hbs = require('hbs'); //49. advanced templating

const express = require('express');
const app = express();
//nodemon src/app.js -e js,hbs
//-e: extensions

//47. Dynamic pages with Templating - rc95 11/07/2022 22:26
// https://www.npmjs.com/package/hbs
// npm i hbs@4.0.1
const viewsPath = path.join(__dirname, '../templates/views');// para cambiar la carpeta por defecto /views
app.set('views', viewsPath);// para cambiar la carpeta por defecto /views
app.set('view engine', 'hbs'); //para PAGINAS DINAMICAS...

const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);
// va a buscar una carpeta en la raiz que se llame /views
//creamos la carpeta y el 1er archivo index.hbs



//rc95 11/07/2022 22:07
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath)); //esto hace que se inidie desde ../public/index.html 

//rc95 11/07/2022 22:26 - redirigimos la pagina principal.
app.get('', (req, res) => {
    res.render('index', {
        title: 'Menú principal',
        name: 'Rodrigo Centurión'
    }); //va a buscar en la carpeta /views
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Acerca de..',
        subtitle: 'Un poco mas acerca de mi..',
        body: 'Nacido en 1995, etc etc..',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ayuda..',
        subtitle: 'Necesitas una mano..',
        body: 'Puedes contactarnos al 0972..',
    });
})

// 54. Accesing API from browser - 11/07/2022 23:51
app.get('/weather', (req, res) => {
    // http://localhost:3001/weather
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address!'
        })
    }

    const address = req.query.address;
    // 55. Building a HTTP Endpoint - 11/07/2022 00:02
    const geocode = require("./utils/geocode");
    const forecast = require("./utils/forecast");

    // http://localhost:3001/weather?address=Asuncion
    // http://localhost:3001/weather?address=Lima
    // http://localhost:3001/weather?address=Brasilia
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    });
    // romper el server
    // http://localhost:3001/weather?address=!

    // http://localhost:3001/weather?address=Asuncion
    // res.send({
    //     forecast: 'Its raining',
    //     location: 'Asuncion',
    //     address: req.query.address
    // })

})

// 54. The query string (part 1)
// http://localhost:3001/products
// http://localhost:3001/products?search=games
// http://localhost:3001/products?search=games&rating=5
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query); //{ search: 'games', rating: '5' }

    res.send({
        products: []
    })
})

// 55. Building a HTTP Endpoint - 11/07/2022 00:02
// para esto vamos a copiar la carpeta utils dentro de la carpeta del proyecto "3-web-server/src/"
// npm o request@2.88.0
// ejecutamos de vuelta, y ahora podemos utilizar estas funciones desde "app.get('/weather', (req, res) => {"

//48. customizing the views directory.. 11/07/2022 22:51

//50. 404 pages 11/07/2022 23:13
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        description: 'Pagina de ayuda no encontrada..',
    });
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        description: 'Pagina no encontrada..',
    });
})



//y esto ya no se va a usar..
// app.get('', (req, res) => {
//     // res.send('Hello express!') //para enviar una respuesta al requester

//     // podemos enviar html
//     let mi_html = '<h1> Hello express! </h1> <br> '
//     mi_html += '<a href="/help"> help </a> <br> '
//     mi_html += '<a href="/about"> about </a> <br> '
//     mi_html += '<a href="/weather">weather </a> <br> '
//     res.send(mi_html)
// })

//app.com
//app.com/help
//app.com/about






//start the server:
app.listen(3001, () => {
    console.log('Server listening at port 3001');
    console.log('http://localhost:3001/');
});

//y ahora para probar: 
// http://localhost:3000/

//vamos a agregar otro app.get...
// http://localhost:3000/help
// app.get('/help', (req, res) => {
//     // res.send('Help page')

//     //podemos enviar JSON
//     res.send([
//         {
//             name: 'Rodrigo',
//             age: 27
//         },
//         {
//             name: 'Alejandro',
//             age: 26
//         }
//     ])
// })

//y aqui para no reiniciar manualmente cada vez la app, vamos a ejecutar desde nodemon..
//nodemon 3-web-server/src/app.js

// http://localhost:3000/about
// app.get('/about', (req, res) => {
//     // res.send('About page')

//     let mi_html = '<h1> About </h1> <br> '
//     mi_html += '<p> Autor: Rodrigo Centuión </p> <br> '
//     mi_html += '<p> Lugar: Asunción, Paraguay </p> <br> '
//     res.send(mi_html)

// })

// http://localhost:3000/weather
// app.get('/weather', (req, res) => {
//     // res.send('Weather page')

//     res.send(
//         {
//             forecast: 'Its raining',
//             location: 'Asunción'
//         }
//     )
// })