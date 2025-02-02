import React, { useEffect, useState } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  const getNextDonationTime = (): Date => {
    const now = new Date();
    const nextDonation = new Date();
    nextDonation.setHours(20, 0, 0, 0); // Este 8 óra

    // Ha ma már elmúlt este 8, akkor holnapra állítjuk
    if (now >= nextDonation) {
      nextDonation.setDate(nextDonation.getDate() + 1);
    }

    // Ha hétvége van (szombat vagy vasárnap), akkor hétfőre állítjuk
    while (nextDonation.getDay() === 0 || nextDonation.getDay() === 6) {
      nextDonation.setDate(nextDonation.getDate() + 1);
    }

    return nextDonation;
  };

  // Segédfüggvény az idő hátralévő részének kiszámításához
  const calculateTimeLeft = () => {
    const now = new Date();
    const nextDonation = getNextDonationTime();
    const diff = nextDonation.getTime() - now.getTime();

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setTimeLeft(
      `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    );
  };

  useEffect(() => {
    calculateTimeLeft(); // Azonnali számítás induláskor
    const timerId = setInterval(calculateTimeLeft, 1000); // Másodpercenként frissítés

    return () => clearInterval(timerId); // Takarítás a komponens unmountolásakor
  }, []);

  return (
    <div>
      <h3>Következő könyvadomány érkezése:</h3>
      <h1>{timeLeft}</h1>
    </div>
  );
};

export default CountdownTimer;
