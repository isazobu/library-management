
create table users
(
    id   serial primary key,
    name varchar(30)
);

alter table users
    owner to postgres;



create table books
(
    name        varchar       not null,
    is_borrowed boolean,
    score       numeric(4, 2) not null,
    id          serial
        primary key,
    created_at  date,
    updated_at  date
);

alter table books
    owner to postgres;
	
	
create table borrows
(
    user_id    integer not null
        constraint borrows_user_id_fkey
            references users,
    book_id    integer not null
        constraint borrows_book_id_fkey
            references books,
    borrow_date date    not null,
    return_date date,
    score       numeric(4, 2),
    id          serial primary key
);

alter table borrows
    owner to postgres;


