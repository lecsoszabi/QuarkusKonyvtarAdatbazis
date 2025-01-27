import React, { useState } from 'react';
import BooksList from './components/BooksList';
import AddBookForm from './components/AddBookFrom';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBookAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Frissíti a könyvlistát új könyv hozzáadása után.
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Könyvkölcsönző</h1>
      </header>
      <main>
        <AddBookForm onBookAdded={handleBookAdded} />
        <BooksList key={refreshKey} />
      </main>
    </div>
  );
}

export default App;
