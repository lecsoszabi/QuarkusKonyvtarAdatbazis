import React, { useState } from 'react';
import BooksList from './components/BooksList';
import RentBookForm from './components/RentBookForm';
import ReturnBookForm from './components/ReturnBookForm';
import AddBookForm from './components/AddBookForm';
import UsersList from './components/UsersList';
import AddUserForm from './components/AddUserForm';
import RentalsList from './components/RentalsList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Frissíti a listákat
  };

  return (
    <div className="App">
      <h1>Könyvkölcsönző</h1>
      <main>
        <div className='addBook'>
        <AddBookForm key={`add-book-${refreshKey}`} onBookAdded={handleRefresh} />
        </div>
        <div className='listBook'>
        <BooksList key={`books-list-${refreshKey}`} />
        </div>
        <div className='listUsers'>
        <UsersList key={`users-list-${refreshKey}`} />
        </div>
        <div className='addUser'>
        <AddUserForm key={`add-user-${refreshKey}`} onUserAdded={handleRefresh} />
        </div>
        <div className='rentalsList'>
        <RentalsList key={`rentals-list-${refreshKey}`} />
        </div>
        <div className='rentBook'>
        <RentBookForm key={`rent-book-${refreshKey}`} onRentalCompleted={handleRefresh} />
        </div>
        <h2>Kölcsönzött könyv visszavitele</h2>
        <div className='returnBook'>
        <ReturnBookForm key={`return-book-${refreshKey}`} onReturnCompleted={handleRefresh} />
        </div>
      </main>
    </div>
  );
}

export default App;
