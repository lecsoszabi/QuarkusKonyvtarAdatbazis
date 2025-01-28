import React, { useState } from 'react';
import { returnBook } from '../services/RentalsService';

interface Props {
    onReturnCompleted: () => void; // A visszahozás után meghívott callback
  }
  
  const ReturnBookForm: React.FC<Props> = ({ onReturnCompleted }) => {
    const [rentalId, setRentalId] = useState<number | null>(null);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!rentalId) return;
  
      try {
        await returnBook(rentalId);
        onReturnCompleted(); // Meghívjuk a callbacket
        setRentalId(null);
      } catch (error) {
        console.error('Hiba történt a visszahozás során:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Kölcsönzés ID"
          value={rentalId || ''}
          onChange={(e) => setRentalId(parseInt(e.target.value))}
          required
        />
        <button type="submit">Visszahozás</button>
      </form>
    );
  };
  
  export default ReturnBookForm;
  
