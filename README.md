# Project Overview
This project is a Mock Streaming service created for CMSC 508. 
The purpose of the project is to demonstrate capabilties of connecting to and maniulating a database server.

## View Project
[On Vercel](https://vercel.com/matts-projects-6c5395e7/cmsc508-project)

## Download and run local
First, fork the repo to your dev environment and install the packages:
```bash
npm install
#or
yarn
```
Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Make sure to create .env.local file with contents:
```bash
DB_HOST=your_host_name
DB_USER=your_username
DB_PASS=your_password
DB_DB=your_database
JWT_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```
