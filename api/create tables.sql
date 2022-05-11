create table account (
    id serial primary key,
    email varchar(255) not null unique,
    password varchar(255) not null,
    confirmed boolean not null
);

create table client (
    id serial primary key,
    account_id integer references account(id),
    name varchar (255) not null,
    is_owner boolean not null
);

create table currency (
    id serial primary key,
    code smallint not null,
    name varchar(255) not null
);

create table wallet (
    id serial primary key,
    user_id integer references client(id),
    currency_id integer references currency(id),
    amount money not null
);

create table wallet_transaction (
    id serial primary key,
    from_wallet_id integer references wallet(id),
    to_wallet_id integer references wallet(id),
    name varchar(255) not null,
    amount money not null,
    time  timestamp default now(),
    description text not null
);

create table category (
    id serial primary key,
    account_id integer references account(id),
    name varchar(255) not null,
    money_limit money not null,
    currency_id integer references currency(id),
    description text not null,
    active boolean not null
);

create table category_transaction (
    id serial primary key,
    wallet_id integer references wallet(id),
    category_id integer references category(id),
    amount money not null,
    time timestamp default now(),
    description text not null
);