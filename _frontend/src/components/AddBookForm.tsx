import React, { useState } from 'react';
import { addBook, Book } from '../services/BooksService';

interface Props {
  onBookAdded: () => void;
}

const AddBookForm: React.FC<Props> = ({ onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newBook: Book = { title, author, quantity };
      await addBook(newBook);
      onBookAdded();
      setTitle('');
      setAuthor('');
      setQuantity(1);
    } catch (error) {
      console.error('Hiba történt a könyv hozzáadása során:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Cím"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Szerző"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Darabszám"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />
      <button type="submit">Könyv hozzáadása</button>
    </form>
  );
};

export default AddBookForm;
