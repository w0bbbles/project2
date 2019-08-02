/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const SALT = "pewpew";

// Initialise postgres client
const configs = {
  user: 'KWAN',
  host: '127.0.0.1',
  database: 'sgevents',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

// Init express app
const app = express();

app.use(express.static(__dirname+'/public'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));

const cookieParser = require('cookie-parser')
app.use(cookieParser());


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Home Route
 * ===================================
 */
app.get('/', (request, response) => {
  // query database for all pokemon
  const queryString = 'SELECT * from events ORDER BY id';

    pool.query(queryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        console.log('query result:', result);

        let data = {
            events: result.rows
        }

        // response.send( result.rows );
        response.render('home', data);
        }
    });
});

/**
 * ===================================
 * Create New Event
 * ===================================
 */

app.get('/create', (request, response) => {

    response.render('newevent');
});

app.post('/newevent', (request, response) => {
    console.log("Request body: ",request.body);

    const queryString = "INSERT INTO events (name, start_date, location, url, description) VALUES ($1, $2, $3, $4, $5) returning id";

    const VALUES = [request.body.name, request.body.start_date, request.body.location, request.body.url, request.body.description];

    pool.query(queryString, VALUES, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
            let url='/event/' + result.rows[0].id;
            response.redirect(url);
        }
    });
});

/**
 * ===================================
 * Show Event
 * ===================================
 */

app.get('/event/:id', (request, response) => {

    const queryString = "SELECT * from events WHERE id=$1"
    let VALUES = [request.params.id]

    pool.query(queryString, VALUES, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
            console.log("result.rows: " + result.rows);
            let data = {
            events: result.rows[0]
            }
            response.render('showevent', data);
        }
    })
});

/**
 * ===================================
 * Register User
 * ===================================
 */

app.get('/register/new',(request, response)=>{

    // let loginSession = request.cookie('login');
    //     if (loginSession) {
    //         response.send("logged in");
    //     }
    //     else {
    response.render('register');
});

app.post('/register', (request, response)=>{

      const queryString = "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *";

        const VALUES = [request.body.name, request.body.password];

        pool.query(queryString, VALUES, (err, results)=>{

            if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {

            response.cookie('login', true);

            response.redirect('/');
        }
    })
});

/**
 * ===================================
 * Login User
 * ===================================
 */

app.get('/login/new',(request, response)=>{

    response.render('login');
});

app.post('/login', (request, response)=>{

    const queryString = "SELECT * from users WHERE name=$1 AND password=$2";

    const VALUES = [request.body.name, request.body.password];

        pool.query(queryString, VALUES, (err, results)=>{

            if (err) {
                console.error('query error:', err.stack);
                response.send( 'query error' );
            } else {

                console.log(results.rows);
                console.log("results.rows");

                if (results.rows.length === 0) {

                    // response.send("you did not register");
                    response.redirect("/loginerror");

                } else {

                    console.log('BINGO YOURE IN!');
                    response.redirect('/');
                }
            }
        })
});

/**
 * ===================================
 * Logout User
 * ===================================
 */

app.get('/logout',(request, response)=>{

    response.cookie('login', false);

    response.redirect('/');
});

/**
 * ===================================
 * Login Error
 * ===================================
 */

app.get('/loginerror',(request, response)=>{

    response.render("loginerror");
});

 /**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3001 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);