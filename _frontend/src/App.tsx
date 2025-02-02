import React, { useState, useEffect } from 'react';
import BooksList from './components/BooksList';
import RentBookForm from './components/RentBookForm';
import ReturnBookForm from './components/ReturnBookForm';
import AddBookForm from './components/AddBookForm';
import UsersList from './components/UsersList';
import AddUserForm from './components/AddUserForm';
import RentalsList from './components/RentalsList';
import CountdownTimer from './components/CountdownTimer';
import { getDonationSummary, BookDonationSummary, simulateDonation } from './services/BooksService';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Frissíti a listákat
  };

  const handleSimulateDonation = async () => {
    try {
      await simulateDonation(); // Meghívja az adományozási funkciót
      console.log('Adomány könyvek sikeresen hozzáadva!');
      handleRefresh(); // Frissíti a könyvek listáját
    } catch (error) {
      console.error('Hiba történt az adomány szimuláció során:', error);
    }
  };

  // Adománykönyvek lekérése
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const donations: BookDonationSummary[] = await getDonationSummary();
        console.log('Adomány könyvek:', donations);
      } catch (error) {
        console.error('Hiba történt az adományok lekérésekor:', error);
      }
    };
  
    fetchDonations();
  }, []);   // Csak egyszer fusson le a komponens betöltésekor

  return (
    <div className="App">
      <h1>Könyvkölcsönző</h1>
      <main>
        <div className="addBook">
          <AddBookForm key={`add-book-${refreshKey}`} onBookAdded={handleRefresh} />
        </div>
        <div className="listBook">
          <BooksList key={`books-list-${refreshKey}`} />
        </div>
        <div className="listUsers">
          <UsersList key={`users-list-${refreshKey}`} />
        </div>
        <div className="addUser">
          <AddUserForm key={`add-user-${refreshKey}`} onUserAdded={handleRefresh} />
        </div>
        <div className="rentalsList">
          <RentalsList key={`rentals-list-${refreshKey}`} />
        </div>
        <div className="rentBook">
          <RentBookForm key={`rent-book-${refreshKey}`} onRentalCompleted={handleRefresh} />
        </div>
        <h2>Kölcsönzött könyv visszavitele</h2>
        <div className="returnBook">
          <ReturnBookForm key={`return-book-${refreshKey}`} onReturnCompleted={handleRefresh} />
        </div>
        <div className="countDown">
          <h2><CountdownTimer /></h2>
        </div>
        <div className='testButton'>
        <button onClick={handleSimulateDonation}>Teszt adományozás</button>
        </div>
      </main>
    </div>
  );
}

export default App;
