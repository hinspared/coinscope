import type Coin from '../interfaces/Coin';

// export default function sortBy(coins: Coin[], arg1: keyof Coin, arg2: string) {
//   if (arg1 === 'name') {
//     const up = [...coins].sort((a, b) => a.name.localeCompare(b.name));
//     const down = [...coins].sort((a, b) => b.name.localeCompare(a.name));
//     return arg2 === 'down' ? up : down;
//   }
//   const up = [...coins].sort((a, b) => Number(a[arg1]) - Number(b[arg1]));
//   const down = [...coins].sort((a, b) => Number(b[arg1]) - Number(a[arg1]));
//   return arg2 === 'down' ? up : down;
// }

export default function sortBy(coins: Coin[], arg1: keyof Coin, arg2: string) {
  const isDescending = arg2 === 'down';
  coins.sort((a, b) => {
    if (arg1 === 'name') {
      return a.name.localeCompare(b.name) * (isDescending ? -1 : 1);
    } else {
      const aValue = Number(a[arg1]);
      const bValue = Number(b[arg1]);
      return (aValue - bValue) * (isDescending ? -1 : 1);
    }
  });
  return coins;
}
