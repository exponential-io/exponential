# Exponential
## Build better apps faster with less effort

Exponential command line utility.

> Warning: This is a 0.0.0 release. Do not use `exponential` yet as it will not
> work. `exponential` will be released in beta form on or before February 28,
> 2014.

# Prerequisites

You need the following software installed to use exponential:

## Install prerequisites on Linux

The following are guides to help you setup a development environment on Linux.

- [Install Node.js](http://exponential.io/blog/install-nodejs-on-linux)
- [Install MongoDB](http://exponential.io/blog/install-mongodb-on-linux)
- Install `build-essential` and `g++` so that you can use the optimized/native
  Mongo drivers

```bash
sudo apt-get install build-essential g++
```

# Installation

Install `exponential` after installing the prerequisites listed above.
`exponential` needs to be installed globally.

```bash
npm install exponential -g
```

## Create an account on Exponential.io

- Open a web browser and navigate to http://www.exponential.io.
- Click **Signup**.
- Enter the requested information. Please use your email address for both
  **Email** and **Username**.
- Click **Signup**.


## Create an Exponential config file

```bash
vi ~/.exponential/config.json
```

Paste the following into your `config.json` file and update `email` with your
Exponential.io email and `password` with your Exponential.io password.

```json
{
    "email": "YOUR-EMAIL-ADDRESS",
    "password": "YOUR-PASSWORD"
}
```
