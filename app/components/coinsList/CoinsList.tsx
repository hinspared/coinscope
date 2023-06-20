'use client';
import React from 'react';
import sortBy from '@/app/utils/helpers/sortBy';
import type Coin from '@/app/utils/interfaces/Coin';
import CoinLayout from './CoinLayout';
import Stat from './Stat';
import { type SafeUser } from '@/app/utils/interfaces/SafeUser';
import Pagination from './Pagination';
import type { Currency } from '@prisma/client';
import SearchBar from './SearchBar';

interface CoinList {
  coins: Coin[];
  currentUser: null | SafeUser | undefined;
  currencyRates: Currency[];
}
const stats = [
  { key: 'name', name: 'Coin' },
  { key: 'current_price', name: 'Price' },
  { key: 'price_change_percentage_24h', name: 'Change' },
  { key: 'low_24h', name: 'Low' },
  { key: 'high_24h', name: 'High' },
  { key: 'market_cap', name: 'Market Cap' },
];

const CoinsList: React.FC<CoinList> = ({
  coins,
  currentUser,
  currencyRates,
}) => {
  // sort functionality
  const [active, setActive] = React.useState(''); //emphasize sorted parameter
  const [sorted, setSorted] = React.useState(coins);
  const [condition, setCondition] = React.useState(false); // arrow direction depends on it

  const handleClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as Element;
    const key = target.getAttribute('data-value') as keyof Coin;
    const up = sortBy([...coins], key, 'up');
    const down = sortBy([...coins], key, 'down');
    const condition = JSON.stringify(sorted) === JSON.stringify(up);
    condition ? setSorted(down) : setSorted(up);
    setActive(key);
    setCondition(condition);
  };

  // pagination
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = React.useState(1);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentPageItems = sorted.slice(start, end);
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);

  // exchange rates functionality
  const currencyCodes = ['USD', 'EUR', 'CZK'];
  const [currency, setCurrency] = React.useState({ code: 'USD', rate: 1 });

  const handleCurrencyClick = (e: React.MouseEvent) => {
    const target = e.target as Element;
    const currencyCode = target.innerHTML;
    const newCurrency = currencyRates.find(
      (currency) => currency.code === currencyCode
    );
    if (newCurrency) {
      setCurrency({ code: newCurrency.code, rate: newCurrency.rate });
    }
  };

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 m:px-12 sm:px-2 px-4 pb-20 pt-20">
      <div className="px-4">
        <div className="flex pt-5 mb-5 gap-5">
          {React.Children.toArray(
            currencyCodes.map((code) => (
              <button
                onClick={handleCurrencyClick}
                className={`py-2 px-8 rounded-lg  ${
                  code === currency.code
                    ? 'bg-gradient-to-r from-indigo-200 to-indigo-500 text-white'
                    : 'bg-[#f8f9ff] text-[#9A97AB]'
                }`}
              >
                {code}
              </button>
            ))
          )}
          <SearchBar coins={coins} currency={currency} />
        </div>
        <hr />
        <div className="overflow-x-auto no-scrollbar">
          <table className="min-w-[800px] w-full">
            <thead>
              <tr className="relative">
                {React.Children.toArray(
                  stats.map((stat) => (
                    <Stat
                      active={active}
                      stat={stat}
                      condition={condition}
                      onClick={handleClick}
                    />
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {React.Children.toArray(
                currentPageItems.map((coin) => (
                  <>
                    <CoinLayout
                      coin={coin}
                      currentUser={currentUser}
                      currency={currency}
                    />
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CoinsList;
