import React from 'react';
import CoinsList from './components/coinsList/CoinsList';
import getCoins from './utils/helpers/getCoins';
import getCurrentUser from './api/actions/getCurrentUser';
import getCurrencyRates from './utils/helpers/getCurrencyRates';
import Header from './components/Header';

export default async function Home() {
  const coins = await getCoins();
  const currentUser = await getCurrentUser();
  const currencyRates = await getCurrencyRates();

  return (
    <main>
      <Header currentUser={currentUser} />
      <CoinsList
        coins={coins}
        currentUser={currentUser}
        currencyRates={currencyRates}
      />
    </main>
  );
}
