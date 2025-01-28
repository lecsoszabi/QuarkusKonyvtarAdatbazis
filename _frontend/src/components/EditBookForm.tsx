import React, { useState, useEffect } from 'react';
import { editBook, Book } from '../services/BooksService';

interface Props {
  book: Book;
  onSave: (updatedBook: Book) => void; // A callback fogadja a frissített adatokat
}

const EditBookForm: React.FC<Props> = ({ book, onSave }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [quantity, setQuantity] = useState(book.quantity);

  // Figyeljük a "book" prop változását, és frissítjük az állapotot
  useEffect(() => {
    setTitle(book.title);
    setAuthor(book.author);
    setQuantity(book.quantity);
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book.id) {
      console.error('A könyv ID-ja hiányzik!');
      return;
    }
    try {
      const updatedBook = { ...book, title, author, quantity }; // Frissített adatok
      await editBook(book.id, updatedBook); // Küldjük el az Axios hívást
      onSave(updatedBook); // Visszaadjuk a frissített adatokat a szülő komponensnek
    } catch (error) {
      console.error('Hiba történt a könyv frissítése során:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Cím"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Szerző"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Darabszám"
        required
      />
      <button type="submit">Mentés</button>
    </form>
  );
};

export default EditBookForm;
