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
        <AddBookForm key={`add-book-${refreshKey}`} onBookAdded={handleRefresh} />
        <BooksList key={`books-list-${refreshKey}`} />
        <RentBookForm key={`rent-book-${refreshKey}`} onRentalCompleted={handleRefresh} />
        <RentalsList key={`rentals-list-${refreshKey}`} />
        <ReturnBookForm key={`return-book-${refreshKey}`} onReturnCompleted={handleRefresh} />
        <AddUserForm key={`add-user-${refreshKey}`} onUserAdded={handleRefresh} />
        <UsersList key={`users-list-${refreshKey}`} />
      </main>
    </div>
  );
}

export default App;
