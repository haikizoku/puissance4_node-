const  express = require ('exprress')

const {
    listAllGames,
    findGame,

} =require('./data')

const rooter = express.Router()

module.exports =rooter



const games = [
    'Partie 1 ',
    'Partie 2 ',
    'Partie 3 ',
]

rooter.get('/', (req, res) => {
    //const html = renderGames
    listAllGames()
    .then( games => {
    const html = renderGames
    res.send(html)
})


rooter.get('/game/:id', (req,res) => {
    const id =req.params.id
    findGame(id)
    .then (game => {
    if  (game === null) {
    res.status(404).send
}
})


})


function renderGames(games) {
    const list = games
        .map(game => {
        return `
        <li>
        <a href="/game/${game}">${game}</a> 
        </li>`

    })
.join('')
    res.send(`
        <html>
        <body>
        <head>
        <title>Puissance 4</title>
    </head>
    <h1>Bienvenue</h1>
    <section>
    <h2>Toutes les parties </h2>
    <ul>
    ${list}
    </ul>
    </section>
    </body>`)
}
