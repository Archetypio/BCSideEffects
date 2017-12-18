# Blockchain Demo for AI-Med 2017

This is the code from the Blockchain Demo I gave to the attendees at the 3rd Artificial Intelligence in Medicine Conference: [AIMed 2017](http://aimed-mi3.com/)

## Getting Started

There aren't too many steps to getting this going.

### Prerequisites

```
Node
Yarn (or NPM)
```

### Installing

Install the necessary files:

```
yarn install
```

There are two tasks setup in the package.json, /ganache/ and /begin/.

First, load and bootstrap the EVM.

```
yarn ganache
```

Next, load the server in a separate process.

```
yarn begin
```

Finally, open a browser to http://localhost:3000

## License

This project is licensed under the MIT License.

## Acknowledgments

* Hat tip to the Truffle team and the many helpful open source hackers out there trailblazing this stuff.
