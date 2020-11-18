### Microservice for PokeDex Application

Using Nodejs, Express, Typescript, Passport, MongoDb, Docker

## Server Setup

Copy over environment variables from

`cp .env.example .env`

Run:

`docker-compose up`

## Data Setup

Use the postman collection on the folder to initialize the pokemon data and create your pokedex

1) Seed the pokemons: GET /pokemon/seed

You can verify the data with the get all pokemons route GET /pokemon

1) SignUp with an email and password of your choice:  POST /signup

2) Login to obtain your access token and your user id: POST /login

3) Create your pokedex with your token, user id and the pokemon ids of your favorite pokemons POST /pokedex

4) Get your pokedex with your token and userId: GET /pokedex


### Note

This is meant to be the backend for a front-end application. Link to React front end coming soon.


## Background

Based on data from :  https://github.com/fanzeyi/pokemon.json/blob/master/pokedex.json

Add and delete Pokemons from a user Pokedex (only if authenticated and limited to 5/user)

A user can only see his Pokedex

The API only exposes information on the user language (default to English)

“Base” attributes should come only in the get of a single resource, not in the list