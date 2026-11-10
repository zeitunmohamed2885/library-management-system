import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL,
});

const prisma = new PrismaClient({ adapter });


async function main() {
  const genres = [
    {
      name: 'Technology',
      description: 'Books about computing, technology, and innovation.',
    },
    {
      name: 'Science Fiction',
      description: 'Fiction involving futuristic science and technology.',
    },
    {
      name: 'History',
      description: 'Books covering historical events and civilizations.',
    },
    {
      name: 'Business',
      description: 'Books about business, leadership, and entrepreneurship.',
    },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });
  }

  const books = [
    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', publishedYear: 2008, genre: 'Technology' },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt and David Thomas', isbn: '9780135957059', publishedYear: 2019, genre: 'Technology' },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '9780262046305', publishedYear: 2022, genre: 'Technology' },
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', isbn: '9781449373320', publishedYear: 2017, genre: 'Technology' },

    { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', publishedYear: 1965, genre: 'Science Fiction' },
    { title: 'Foundation', author: 'Isaac Asimov', isbn: '9780553293357', publishedYear: 1951, genre: 'Science Fiction' },
    { title: '1984', author: 'George Orwell', isbn: '9780451524935', publishedYear: 1949, genre: 'Science Fiction' },
    { title: 'Fahrenheit 451', author: 'Ray Bradbury', isbn: '9781451673319', publishedYear: 1953, genre: 'Science Fiction' },

    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', publishedYear: 2015, genre: 'History' },
    { title: 'The Silk Roads', author: 'Peter Frankopan', isbn: '9781101912379', publishedYear: 2015, genre: 'History' },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', isbn: '9780393354324', publishedYear: 1997, genre: 'History' },
    { title: 'The Wright Brothers', author: 'David McCullough', isbn: '9781476728759', publishedYear: 2015, genre: 'History' },

    { title: 'The Lean Startup', author: 'Eric Ries', isbn: '9780307887894', publishedYear: 2011, genre: 'Business' },
    { title: 'Zero to One', author: 'Peter Thiel', isbn: '9780804139298', publishedYear: 2014, genre: 'Business' },
    { title: 'Good to Great', author: 'Jim Collins', isbn: '9780066620992', publishedYear: 2001, genre: 'Business' },
    { title: 'The E-Myth Revisited', author: 'Michael E. Gerber', isbn: '9780887307287', publishedYear: 1995, genre: 'Business' },
  ];

  for (const book of books) {
    const genre = await prisma.genre.findUniqueOrThrow({
      where: { name: book.genre },
    });

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        genreId: genre.id,
      },
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publishedYear: book.publishedYear,
        genreId: genre.id,
      },
    });
  }

  console.log('Database seeded: 4 genres and 16 books.');
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
