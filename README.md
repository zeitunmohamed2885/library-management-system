# Library Management System

A backend library management system built with **NestJS, Prisma ORM, and PostgreSQL**. The project demonstrates relational database design, schema migration, and database seeding using a hosted Neon PostgreSQL database.

## Technology Stack

- **NestJS** – Backend application framework.
- **TypeScript** – Programming language.
- **Prisma ORM 7** – Database modeling and access.
- **PostgreSQL** – Relational database.
- **Neon** – Hosted PostgreSQL database.
- **Vitest** – Testing framework.

## Project Structure

```text
library-management-system/
├── api/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── generated/
│   │   ├── prisma/
│   │   │   └── prisma.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma7.config.ts
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## Database Schema

The database contains three main models and one enum:

| Model | Purpose |
|---|---|
| User | Stores library user information and roles. |
| Genre | Stores book genre information. |
| Book | Stores book details and references its genre. |

### Role Enum

Defines the available user roles:

- `PATRON`
- `LIBRARIAN`

### Database Relationships

- A genre can have multiple books.
- Each book belongs to one genre.
- Each user has a role defined by the Role enum.
- Book records reference genres through `genreId`.

## Schema Decisions

The database uses a **relational approach** by separating books and genres into different models.

Instead of embedding genre information directly inside every book record, the Book model stores a `genreId` foreign key that references the Genre model.

This design was chosen for several reasons:

1. **Reduces data duplication:** Genre names and descriptions are stored once rather than repeated across multiple book records.
2. **Maintains data consistency:** Updating a genre does not require updating every book belonging to that genre.
3. **Enforces referential integrity:** The foreign key ensures that every book references an existing genre.
4. **Improves maintainability:** Genres can be managed independently of books.
5. **Supports efficient relationships:** Prisma allows related books and genres to be queried through their defined relationship.

The relationship is one-to-many: one genre can contain many books, while each book belongs to one genre.

This approach is more appropriate for the library system because genres are reusable entities shared by multiple books.

## Database Migration

Prisma Migrate is used to manage database schema changes.

The initial migration was created using:

```bash
cd api
npx prisma migrate dev --name init
```

To check migration status:

```bash
npx prisma migrate status
```

## Database Seeding

The project includes a seed script at `api/prisma/seed.ts`.

The script uses Prisma `upsert` operations to create or update records without introducing duplicates when executed repeatedly.

The initial seed data contains:

- 4 genres: Technology, Science Fiction, History, and Business.
- 16 books distributed across the four genres.

Run the seed script using:

```bash
cd api
npx prisma db seed
```

## Environment Configuration

Create an `.env` file inside the `api` directory using `.env.example` as a template.

Configure the following environment variables:

```env
DATABASE_URL="your_neon_pooled_postgresql_url"
DIRECT_URL="your_neon_direct_postgresql_url"
```

- `DATABASE_URL` is used by the application at runtime.
- `DIRECT_URL` is used for database migrations and seeding.

**Never commit your actual database credentials or `.env` file to GitHub.**

## Installation and Setup

Navigate into the API directory:

```bash
cd api
```

Install dependencies:

```bash
npm install
```

Generate the Prisma Client:

```bash
npx prisma generate
```

Build the application:

```bash
npm run build
```

## Running the Application

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run start:prod
```

## Testing

Run unit tests:

```bash
npm run test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

## Project Status

The initial database implementation has been completed.

- [x] NestJS project setup.
- [x] Prisma ORM configuration.
- [x] Neon PostgreSQL connection.
- [x] Database schema design.
- [x] Initial database migration.
- [x] Prisma service implementation.
- [x] Database seed script.
- [x] Four genres and sixteen books seeded.
- [x] Database record counts verified.
- [x] Schema decisions documented.

## License

This project was developed for educational purposes.