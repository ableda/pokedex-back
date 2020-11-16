### Microservice for PokeDex Application

Using Nodejs, Express, Typescript, Passport, MongoDb, Docker

## Setup

Copy over environment variables from .env.example to .env

Run:

`docker-compose up`

After that you should be able to use /signup and /login routes. Token will be given to the signed in user to simulate session

## Background

Based on data from :  https://github.com/fanzeyi/pokemon.json/blob/master/pokedex.json

Add and delete Pokemons from a user Pokedex (only if authenticated and limited to 5/user)

A user can only see his Pokedex

The API only exposes information on the user language (default to English)

“Base” attributes should come only in the get of a single resource, not in the list