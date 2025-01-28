import React, { useState } from 'react';
import { editBook, Book } from '../services/BooksService';

interface Props {
  book: Book;
  onSave: () => void;
}

const EditBookForm: React.FC<Props> = ({ book, onSave }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [quantity, setQuantity] = useState(book.quantity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book.id) {
      console.error('A könyv ID-ja hiányzik!');
      return;
    }
    try {
      const updatedBook = { ...book, title, author, quantity };
      await editBook(book.id, updatedBook);
      onSave(); // Hívjuk meg a mentés utáni callbacket
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
