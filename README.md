# Project Execution Guide

This guide explains how to set up and run the **Pstagonia Challenge** project.

## Prerequisites

- Node.js (version 18.x or higher)  
- npm (version 9.x or higher)
- MongoDB runing locally or remotely

## Installation

1. Clone the repository:

```bash
git clone https://github.com/nadiarosenberg/patagonia_challenge.git
cd challenge_patagonia
```

2. Install dependencies:

```bash
npm install
```

## Development Execution
Create a .env file in the project root and use the following as a reference:
* HTTP_PORT=3000
* MONGO_URI=mongodb://localhost:27017/companies-api
* TIMEZONE=America/Argentina/Buenos_Aires

To start the development server:

```bash
npm run dev
```

The server will run at http://localhost${port}
Where <PORT> is the value of HTTP_PORT defined in your .env file.

## Testing

To run unit test:

```bash
npm run test
```

## Docs
Swagger documentation is available at http://localhost:{port}/docs
