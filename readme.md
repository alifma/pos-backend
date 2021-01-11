# Backend POS
Backend for Point of Sales Application with database relation of 3 tables 

## Application Instalation
1. Install Required NPM Packages 
   > `npm install`
2. Create database named `posvue` and import `posvue.sql` from this project folder
3. Create `.env` files with this value
   > - DB_HOST= (Your Database Host) 
   > - DB_USER= (Your Database User)
   > - DB_PASSWORD= (Your Database Password)
   > - DB_NAME=posvue
   > - PORT= (Your decided port number, ex:3000)
4. Start Application
   > `npm start`

## Features
- CRUD Menus
   - Add new menu
   - Display all menu
   - Display menu details
   - Search by name
   - Sort by name, price or date added
   - Sort ascending or descending
   - Pagination
   - Update menu
   - Soft delete menu
- CRUD Categories
   - Add new category
   - Display all category
   - Display category details
   - Update category
   - Soft delete category
- CRUD Orders
   - Add bluk order data
   - Display order based on invoices
   - Display detail every invoice
   - Pagination
   - Update order details 
   - Delete by details
   - Delete by invoice

## NPM Packages Used
- [Body-Parser](https://www.npmjs.com/package/body-parser)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [moment](https://www.npmjs.com/package/moment)
