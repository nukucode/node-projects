const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const TARGET_URL = "https://scrapeme.live/shop/";


//: => getting all the pokemons
const getPokemons = ($) => {
    // Get all list items from the unOrdered list with a class name of 'products'
    const pokemons = $('.products li');
    const pokemonData = [];

    // The 'each()' method loops over all pokemon list items 
    pokemons.each((index, el) => {
        // Get the image, name, and price of each pokemon and create an object 
        const pokemon = {}

        // Selector to get the image 'src' value of a pokemon 
        pokemon.img = $(el).find('a > img').attr('src');
        pokemon.name = $(el).find('h2').text();
        pokemon.price = $(el).find('.amount').text();

        pokemonData.push(pokemon)
    })


    // Create a 'pokemon.json' file in the root directory with the scraped pokemonData 
    fs.writeFile("pokemon.json", JSON.stringify(pokemonData, null, 2), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Data written to file successfully!");
    });
}

// axios function to fetch HTML Markup from target URL
axios.get(TARGET_URL).then((res) => {
    const body = res.data;
    const $ = cheerio.load(body); // Load HTML data and initialize cheerio
    getPokemons($);
})