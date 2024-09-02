# COS30049 - Dripple Website

A decentralized trading platform developed by group 1.5 for unit COS30049 - Computing Technology Innovation Project.

## What is in this repository?

This repository contains the full source code of the project, including the smart contract, frontend and backend. 

The code for the smart contract is stored in the `blockchain/contracts/Dripple.sol` file. The `blockchain` folder also contains other migration configuration files.

The code for the frontend is stored in the `client` folder. The code for the backend is stored in the `server` folder.

At the top of this repository are two important files: `schema.sql` and `gethnode.zip`:

- `schema.sql` contains the SQL code for our backend database and will need to be run (once) before the server can be started. 

- The `gethnode.zip` file contains a Geth data directory which has our smart contract ready and can be used immediately for convenience. We recommend using this instead of initializing your own Geth node, otherwise you will need to change the code in several places.

## Setup instructions

This section assumes you use `gethnode.zip` instead of creating your own blockchain node. If you decide to create your own node, you will need to change the coinbase/contract addresses in `blockchain/truffle-config.js` and `server/.env`.

### Step 1 - Getting the necessary software

To run this project, you will need:

1. `Node.js` (**version 20 or higher**, we use v.20.11.0). Please go to [this link](https://nodejs.org/en/download) for download instructions.

2. A package manager like `npm` or `yarn`. `npm` comes included by default with Node, so you should have it after installing Node.

3. `Geth`. Please go to [this link](https://geth.ethereum.org/downloads) for download instructions. Please make sure to add Geth to your `PATH` environment variable.

4. `MySQL`. Please go to [this link](https://dev.mysql.com/downloads/) for download instructions. Alternatively, you can use `phpMyAdmin` or a similar tool to create the MySQL database.

### Step 2 - Downloading or cloning this repository

You can either download this repository as a `.zip` file or clone it to your local device. After that, `cd` into the `client` and `server` directories each and run `npm install`. This will install all the necessary modules that the website depends on.

### Step 3 - Building the frontend

After installing the dependencies, `cd` into the `client` directory and run `npm run build`. This will build the source code into a `dist` directory for production. Verify the `dist` folder exists after building.

### Step 4 - Setting up the MySQL database

With MySQL installed and a server running, run the `schema.sql` file to create the project's database. Verify that the script correctly creates 4 tables: `asset`, `user`, `transaction`, and `marketplaceposting`.

### Step 5 - Updating the environment variables

Inside the `server` directory, open the `.env` file and change the `DATABASE_PASSWORD` field to your MySQL password.

### Step 6 - Starting the Geth node

Unzip the `gethnode.zip` file into a directory of your choice and `cd` into it. If you are on Windows, you can start the Geth node by simply typing in the terminal:

```
gethstart
```

This runs a `.bat` file which we have written for your convenience. However, on other operating systems, you will need to copy and paste the following into your terminal:

```
geth --networkid 9999 --datadir ./data --port 30303 --ipcdisable --syncmode full --http --allow-insecure-unlock --http.corsdomain "" --http.port 8545 --http.addr localhost --unlock 0xd395C86E63d756fbf67854539a8CcaEcd1F274AD --password ./password.txt --mine --http.api personal,admin,eth,net,web3,miner,txpool,debug --ws --ws.addr 0.0.0.0 --ws.port 8546 --ws.origins '' --ws.api personal,admin,eth,net,web3,miner,txpool,debug --maxpeers 25 --miner.etherbase 0xd395C86E63d756fbf67854539a8CcaEcd1F274AD --miner.gasprice 0 --miner.gaslimit 9999999
```

You should see your Geth node running after issuing this command.

### Step 7 - Starting the server

At this point, your website is ready to be launched. `cd` into the `server` directory and type the following command in the terminal:

```
node index.js
```

This will start the server at `http://localhost:8000`. Please make sure port `8000` is free for the server to run. You can now open this address in the browser to view the full website.

## Need help?

If you need help setting up this project, send an email to tunggnut2004@gmail.com to get in touch with our project leader.