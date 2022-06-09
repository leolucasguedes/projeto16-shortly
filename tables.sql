CREATE DATABASE "projeto16-shortly";

CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "urls"(
    "id" SERIAL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "userId" INTEGER REFERENCES users(id),
    "visitCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "deletedAt" TIMESTAMP DEFAULT NULL
);

CREATE TABLE "sessions"(
    "id" SERIAL PRIMARY KEY,
    "token" TEXT NOT NULL UNIQUE,
    "userId" INTEGER REFERENCES users(id),
    "createdAt" TIMESTAMP DEFAULT NOW()
);