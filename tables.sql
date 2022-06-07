CREATE DATABASE "projeto16-shortly";

CREATE TABLE users (
	id serial NOT NULL PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL
)

CREATE TABLE urls (
	id serial NOT NULL PRIMARY KEY,
    url text NOT NULL,
    "userId" integer REFERENCES users(id)
)

CREATE TABLE "shortUrls" (
	id serial NOT NULL PRIMARY KEY,
    "shortUrl" text NOT NULL,
    "urlId" integer REFERENCES urls(id)
)

CREATE TABLE visitors (
	id serial NOT NULL PRIMARY KEY,
    quantity integer,
    "urlId" integer REFERENCES urls(id)
)