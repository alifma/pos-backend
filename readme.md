# Backend POS
Backend for Point of Sales Application with database relation of 3 tables 

## Application Instalation
1. Make sure you already have Redis installed on your machine
2. Clone POS-Backend Repository
3. Install Required NPM Packages 
   > `npm install`
4. Create database named `posvue` and import `posvue.sql` from this project folder
5. Create `.env` files with this value
   > - DB_HOST= (Your Database Host) 
   > - DB_USER= (Your Database User)
   > - DB_PASSWORD= (Your Database Password)
   > - DB_NAME=posvue
   > - PORT= (Your decided port number, ex:3000)
   > - JWT_SECRET= (Your own JWT)
6. Start Redis Server
   > `redis-server`
7. Start Application
   > `npm start`

## Features
- JWT Authentication
- Multilevel Authorization (Admin and Cashier)
- Upload Image
- CRUD Menus
   - Add new menu
   - Display all menu
   - Display menu details
   - Search by name
   - Sort by name, price or date added
   - Sort ascending or descending
   - Pagination
   - Update menu
   - Delete Menus
   - Soft Delete Menus
   - Redis Storage
- CRUD Categories
   - Add new category
   - Display all category
   - Display all category
   - Display category details
   - Update category
   - Delete category
   - Redis Storage
- CRUD Orders
   - Order and details order data are divided in two tables
   - Add bulk order data
   - Display order based on invoices
   - Display detail every invoice
   - Pagination
   - Update order details 
   - Delete by details
   - Delete by invoice
   - Redis Storage

## NPM Packages Used
- [Body-Parser](https://www.npmjs.com/package/body-parser)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [lodash](https://www.npmjs.com/package/lodash)
- [moment](https://www.npmjs.com/package/moment)
- [multer](https://www.npmjs.com/package/multer)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [redis](https://www.npmjs.com/package/redis)

## Deployment
> This Application currently online, you can send me an email if you want to check the backend ;)