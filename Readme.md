# School Management API

Node.js + Express + MySQL API for managing schools.

## Features
- Add a school
- Get schools sorted by distance

## Setup 
```bash
npm install
node server.js

API

POST /api/addSchool
GET /api/listSchools?lat=18.5204&lon=73.8567

Env

DB_HOST=your-host
DB_USER=your-user
DB_PASSWORD=your-password
DB_NAME=your-database
DB_PORT=3306

Live API

https://school-management-api-4gvg.onrender.com