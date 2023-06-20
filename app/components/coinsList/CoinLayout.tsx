'use client';
import React from 'react';
import Image from 'next/image';
import type Coin from '@/app/utils/interfaces/Coin';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { type SafeUser } from '@/app/utils/interfaces/SafeUser';
import formatNumber from '@/app/utils/helpers/formatNumber';
import { useRouter } from 'next/navigation';

interface Props {
  coin: Coin;
  currentUser: null | SafeUser | undefined;
  currency: { code: string; rate: number };
}

const CoinLayout: React.FC<Props> = ({ coin, currentUser, currency }) => {
  const router = useRouter();
  const favouriteCoin = currentUser?.coins.includes(coin.symbol);
  const handleClick = () => {
    router.push(`/coins/${coin.id}`);
  };
  return (
    <tr className="h-20">
      <td
        className="mr-auto sticky left-0 bg-[#eaebf5] dark:bg-[#0d0e30] w-[12rem] cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex gap-3 items-center">
          <Image src={coin.image} alt={coin.name} width={30} height={30} />
          {favouriteCoin ? (
            <AiFillStar
              size={20}
              className="text-slate-500 dark:text-indigo-500 flex-shrink-0"
            />
          ) : (
            <AiOutlineStar size={20} className="flex-shrink-0" />
          )}
          <div className="flex flex-col md:flex-row md:flex-shrink-0 md:gap-3">
            <p className="font-semibold">{coin.name}</p>
            <p className="text-slate-500">{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
      </td>
      <td className="text-right">
        {formatNumber(coin.current_price * currency.rate, currency.code)}
      </td>
      <td
        className={`text-right ${
          coin.price_change_percentage_24h > 0
            ? 'text-green-600'
            : 'text-red-600'
        }`}
      >
        {formatNumber(coin.price_change_percentage_24h)}%
      </td>
      <td className="text-right">
        {formatNumber(coin.low_24h * currency.rate, currency.code)}
      </td>
      <td className="text-right">
        {formatNumber(coin.high_24h * currency.rate, currency.code)}
      </td>
      <td className="text-right w-[12rem]">
        {formatNumber(coin.market_cap * currency.rate, currency.code)}
      </td>
    </tr>
  );
};

export default CoinLayout;
