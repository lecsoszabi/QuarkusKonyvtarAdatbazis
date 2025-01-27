import React, { useState } from 'react';
import { rentBook } from '../services/RentalsService';

interface Props {
  onRentalCompleted: () => void;
}

const RentBookForm: React.FC<Props> = ({ onRentalCompleted }) => {
  const [bookId, setBookId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId || !userId) {
      console.error('Hiányzó paraméterek!');
      return;
    }
  
    try {
      await rentBook({ bookId, userId, quantity });
      onRentalCompleted();
      setBookId(null);
      setUserId(null);
      setQuantity(1);
    } catch (error) {
      console.error('Hiba történt a kölcsönzés során:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Könyv ID"
        value={bookId || ''}
        onChange={(e) => setBookId(parseInt(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Felhasználó ID"
        value={userId || ''}
        onChange={(e) => setUserId(parseInt(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Darabszám"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        required
      />
      <button type="submit">Kölcsönzés</button>
    </form>
  );
};

export default RentBookForm;
