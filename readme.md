# Backend POS
Backend untuk aplikasi Point of Sales dengan 3 tabel yang saling berelasi satu sama lain.

## Application Instalation
1. Install NPM Packages
   > `npm install`
2. Start Application
   > `npm start`

## Features
- CRUD Menus
   - Menambahkan menu 
   - Menampilkan semua menu
   - Menampilkan detail menu
   - Mencari menu berdasarkan nama
   - Mengurutkan secara asc ataupun desc
   - Paginasi halaman 
   - Update menu
   - Delete menu
- CRUD Categories
   - Menambahkan categories
   - Menampilkan semua categories
   - Menampilkan detail categories
   - Update categories
   - Delete categories
- CRUD Orders
   - Menambahkan Beberapa Order Sekaligus
   - Menampilkan order per invoice
   - Menampilkan detail order tiap invoice
   - Paginasi halaman 
   - Update detail order
   - Delete detail order
   - Delete berdasarkan invoice

## NPM Packages Used
- [Body-Parser](https://www.npmjs.com/package/body-parser)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [mysql2](https://www.npmjs.com/package/mysql2)
