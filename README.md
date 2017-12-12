# Happy Shop

An test app that demonstrates a jsonapi consumed by a frontend framework.

# Features

- JSONAPI that exposes endpoints for:
    -  Filtering products
    -  Fetching specific product detail
- Frontend that allows users to make use the api

# Technologies

- Ruby / Ruby on Rails
- ReactJS
- PostgreSQL
- JSONAPI

# Setup

1. Clone the project
    ```sh
    git clone https://lyc4n@bitbucket.org/lyc4n/happy-store.git
    ```
2. cd into the project
    ```sh
    cd happy-store
    ```
3. Run bundle install
    ```
    cd happy-store
    ```
4. Create the database 
   ```sh
    rails db:create
   ```
5. Run migrations 
   ```sh
   rails db:migrate
    ```
6. Seed the database
   ```sh
   rails db:seed
    ```
7. Make sure you have [yarn](https://yarnpkg.com/en/) installed
8. Install js dependencies
    ```sh
    yarn
    ```
9. Run webpack-server
    ```sh
    ./bin/webpack-dev-server
    ```
    
10. Run server
    ```sh
    rails s
    ```
# Running test

1. Run 
    ```sh
    rspec
    ```

# API Documentation

Api documentation can be found on the http://localhost:3000/apidoc/1.html when you run the server.
It is also available
[here](https://happy-shop-online.herokuapp.com/apidoc/1.html)
