import React, { useState, useEffect } from 'react';
import EditBookForm from './EditBookForm';
import { Book, deleteBook, getBooks } from '../services/BooksService';

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Könyvek lekérése a backendből
  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data); // Állapot frissítése
    } catch (error) {
      console.error('Hiba történt a könyvek lekérdezésekor:', error);
    }
  };

  // Komponens betöltésekor egyszer lefut
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSave = () => {
    fetchBooks(); // Frissítjük az adatokat mentés után
    setEditingBook(null); // Szerkesztési mód bezárása
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id); // Könyv törlése backendből
      setBooks(books.filter((book) => book.id !== id)); // Állapot frissítése
    } catch (error) {
      console.error('Hiba történt a könyv törlésekor:', error);
    }
  };

  return (
    <div>
      <h2>Könyvek</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cím</th>
            <th>Szerző</th>
            <th>Darabszám</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.quantity}</td>
              <td>
                <button onClick={() => setEditingBook(book)}>Szerkesztés</button>
                <button onClick={() => handleDelete(book.id!)}>Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Szerkesztési form megjelenítése */}
      {editingBook && (
        <EditBookForm book={editingBook} onSave={handleSave} />
      )}
    </div>
  );
};

export default BooksList;
