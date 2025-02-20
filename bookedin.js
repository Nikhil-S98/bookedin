const express = require('express')
const app = express()
const port = 3000
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');

// Handlebars setup
var handlebars = require('express-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Routes
app.use('/', indexRouter);
app.use('/authors', authorsRouter);

// Error handling
app.use((req, res) => {
    res.status(404)
    res.send('<h1>404 - Not Found</h1>')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))
