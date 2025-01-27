import React, { useEffect, useState } from 'react';
import { getRentals, Rental } from '../services/RentalsService';

const RentalsList: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const data = await getRentals();
        setRentals(data);
      } catch (error) {
        console.error('Hiba történt a kölcsönzések lekérdezésekor:', error);
      }
    };

    fetchRentals();
  }, []);

  return (
    <div>
      <h2>Kölcsönzések</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Könyv ID</th>
            <th>Felhasználó ID</th>
            <th>Darabszám</th>
            <th>Kivétel Dátuma</th>
            <th>Visszavitel Dátuma</th>
          </tr>
        </thead>
        <tbody>
  {rentals.map((rental) => (
    <tr key={rental.id}>
      <td>{rental.id}</td>
      <td>{rental.bookId}</td>
      <td>{rental.userId}</td>
      <td>{rental.quantity}</td>
      <td>{new Date(rental.takenOutAt).toLocaleDateString()}</td>
      <td>
        {rental.broughtBackAt
          ? new Date(rental.broughtBackAt).toLocaleDateString()
          : 'Nincs visszahozva'}
      </td>
    </tr>
  ))}
</tbody>


      </table>
    </div>
  );
};

export default RentalsList;
