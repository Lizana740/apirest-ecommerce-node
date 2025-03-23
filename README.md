# apirest-ecommerce-node

## Software stack
- [Node v20](https://nodejs.org/docs/latest-v20.x/api/documentation.html)
- [MongoDB](https://www.mongodb.com/)
- [InversifyJS 6.0](https://inversify.io/)
- [Express.js 4.17](https://expressjs.com/en/4x/api.html)
- [Jest 29.7]
- [class-validator 0.14]
- [ts-node-dev 2.0]
- [TypeScript]

## Quick Start
### Copy project 

Copy the project from a terminal
```bash
git clone https://github.com/Lizana740/apirest-ecommerce-node.git
```
### Install the dependencies
Go to the project folder and enter the following commands
```sh
npm install
```
### Create database
Create the database with the following command, for this you need to set the environment variables in your .env file

```sh
npm run create:database
```
> #### Note
> based on the .env.example file and configure the MONGODB, for example : ‘mongodb+srv://[user]:[key]@[name].tc0ri8q.mongodb.net/?retryWrites=true&w=majority&appName=[name]’.
### Dev
To start the app in dev mode:
```sh
npm run dev
```
### Test 
To start the tests 
```sh
npm run test
```
