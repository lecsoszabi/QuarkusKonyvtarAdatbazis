import React, { useEffect, useState } from 'react';
import { Book, getBooks } from '../services/BooksService';

export const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data); // Csak egyszer állítsd be az állapotot
      } catch (error) {
        console.error('Hiba történt a könyvek lekérdezésekor:', error);
      }
    };
  
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Könyvek</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cím</th>
            <th>Szerző</th>
            <th>Darabszám</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BooksList;