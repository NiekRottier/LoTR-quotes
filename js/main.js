const search = document.getElementById("search")

const quoteDOM = document.getElementById("quote")
const characterDOM = document.getElementById("character")
const movieDOM = document.getElementById("movie")

const headers = { 'Authorization': 'Bearer 2ZsdpXFsprQovRNhts-E' }
let quotes = [];

search.addEventListener('click', quoteSearch)

// Fetch all the quotes
function getQuotes() {
    fetch(`https://the-one-api.dev/v2/quote?limit=100000`, { headers: headers })
        .then(res => res.json())
        .then(json => quotes = json.docs)
}

getQuotes()

async function quoteSearch(){

    // Select random qoute
    let quote = quotes[Math.floor(Math.random() * 2390)]
    let character = '';
    let movie = '';

    // Get character name
    await fetch(`https://the-one-api.dev/v2/character/${quote.character}`, { headers: headers })
        .then(res => res.json())
        .then(json => character = json.docs[0].name)

    // Get movie name 
    await fetch(`https://the-one-api.dev/v2/movie/${quote.movie}`, { headers: headers })
        .then(res => res.json())
        .then(json => movie = json.docs[0].name)

    // Show the quote, character and movie in the DOM
    quoteDOM.innerHTML = `${quote.dialog}`
    characterDOM.innerHTML = `—${character}`
    movieDOM.innerHTML = `${movie}`
}
