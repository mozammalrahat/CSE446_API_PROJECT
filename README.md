# CSE446 API PROJECT (ECOMMERCE)
## Introduction

This full-stack e-commerce web application was developed by us for our CSE446 course project. In this case, we had to simulate e-commerce features between the various organizations. The project demonstration requires us to take into account three various organizations. The first organization is an e-commerce website that sells goods to end users. The second is a backend product supplier that provides goods to the e-commerce website. The third organization is a bank that facilitates transactions between other businesses and clients.

## Technologies used

- TypeScript
- Next.js
- React
- Chart.js
- Moment.js
- Node.js
- Express.js
- JWT
- Bycript
- Universally Unique Identifier(uuid)
- MongoDB
- Mongoose
- Axios
- Postman
- Material UI
- Cloudinary
- Nodemon
- ESLint
- Prettier

## Installation
We must first clone the repository in order to run this project locally. Before we can clone the code into our local system, we must first determine whether git is already installed there. If we don't already have git, we can get it from this [website](https://git-scm.com/downloads) and set it up using the instructions provided. We can now clone the project in an appropriate directory on our local system after properly configuring git. We have to execute the following command to clone the project.

```sh
git clone https://github.com/mozammalrahat/CSE446_API_PROJECT.git
```
Now we have all three organisation in our local directory. To successfully run these three organisation we have to go to each organisation directory and install all necessary dependecy for that organisation. To setup the bank we have to give these commands.
```sh
cd bank             // Go to bank directory
npm install         // It will install all dependency from package.json file
nodemon index.js    // This will run our local bank server(backend) on port: http://localhost:3001/
```
After that we have to configure the Supplier server. Again we have to do the same thing.
```sh
cd supplier         // Go to bank directory
npm install         // It will install all dependency from package.json file
nodemon index.js    // This will run our local supplier(backend) server on port: http://localhost:3002/
```
After successfully run two server we have to configure the Ecommerce server. The first two servers have been developed by Express.js but The third one ecommerce have been developed using NextJS. To setup this organisation we have to execute the following command
```sh
cd commerce         // Go to bank directory
npm install         // It will install all dependency from package.json file
npm run dev         // This will run our local ecommerce NextJS both front-end and back-end server on port: http://localhost:3000/
```
