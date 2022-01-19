## Prerequisites
- [Node js]
- [yarn] OR [NPM]  

## Installing
    run npm install 
    or 
    yarn


## First You Need To Create .env File In The Root Folder

## Environment
    PORT =3000
    POSTGRES_USER  = your postgress user 
    POSTGRES_DB = your database name FOr dev
    POSTGRES_TEST_DB = your database name for testing
    POSTGRES_HOST = localhost
    POSTGRES_PASSWORD = your database pass
    ENV = for testing database
    BCRYPT_PASSWORD = your bycrypt string 
    SALT_ROUNDS = your password string for token
    TOKEN_SECRET = the number of round INTEGER    

## Create dataBase 
    psql -U (Your_USER_Name)
    create database store-dev; (For dev)
    GRANT ALL PRIVILEGES ON DATABASE store-dev TO (Your_USER_Name)
    create database store-dev; (for testing)
    GRANT ALL PRIVILEGES ON DATABASE store-test TO (Your_USER_Name)

## migrate Database
    db-migrate up
    

## For Testing 
    npm run test 

## To Build 
    npm run build 
## Running the application
    To run in application using node
    npm run start  
    or
    to run application in watch mode 
    npm run watch

## PORTS
    For database : 5432
    For listening : 3000 OR You can add In .env file 

## Tech Used :
- [TypeScript]
- [Postgres]
- [Express]  
- [Jasmine] 
- [db-migrate] 

