# library-management

# Project Overview
This project is a library management application designed to manage members and the borrowing of books by members. It facilitates various operations for users and books.

## Database Schema

![Database Schema](db.jpeg)

## Setting Up the Environment with Docker Compose

This project uses Docker Compose to simplify the setup of the PostgreSQL database and any other services it might depend on. Follow the steps below to get your environment up and running with Docker Compose.

### Prerequisites

Ensure you have Docker and Docker Compose installed on your machine. You can download and install Docker from [Docker's official site](https://www.docker.com/get-started).

### Running Docker Compose

1. **Start Services**:
   Open a terminal in the project directory where the `docker-compose.yml` file is located and run the following command:

   ```bash
   docker-compose up -d
    ```
    Use to create tables
 ```bash
    docker exec -i your_postgres_container_name psql -U your_postgres_user -d your_database_name < your_initial_script.sql
```
Example: 
```bash
    
    docker exec -i case-study-postgres-1 psql -U postgres -d case_study < create_tables.sql

```



# Features
## User Operations
##### List Users:
Retrieve a list of all registered users.
##### User Information: 
Access detailed information about a user including their name, past borrowed books with scores, and currently borrowed books.
##### Create User:
 Add a new user to the system.

## Book Operations
##### List Books: 
Retrieve a list of all books.
##### Book Information: 
Access detailed information about a book, including its name and average rating. Note: Viewing book information is a more frequent operation than borrowing or returning.
##### Create Book: 
Add a new book to the catalog.

## Borrow-Return Operation
##### Borrow Book: 
Process the borrowing of a book by a user.
##### Return and Rate Book: 
Handle the return of a book and allow users to rate it.

# Technical Requirements
##### Version Control: Git
##### API Development: Express.js
##### Programming Language: Typescript
##### Database: Postgresql
##### ORM: Sequelize
##### API Validation: Joi
