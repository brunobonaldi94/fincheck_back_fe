#!/bin/bash


# Generate Prisma Client
npx prisma migrate dev
npx prisma db seed
npx prisma generate
