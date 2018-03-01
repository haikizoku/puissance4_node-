const express = require('express')
const compression = require('compression')
const morgan = require('morgan')

const data = require('/data')


const app = express()
app.use(morgan('tiny'))

const myCompression = compression()


app.use((req, res, next) => {
    next()
})



.catch(err => {
    console.error('Failled to  serve /', err.stack)
res.status(500).send('oops')
})
})




app.listen(80, (err) => {
    if (err) {
        console.error(err ? err.stack : err)
        process.exit(255)

    } else {
        console.log('Listening on *:80')
}
})