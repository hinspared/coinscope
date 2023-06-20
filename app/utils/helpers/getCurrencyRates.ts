import prisma from '../../server/db/client';

export default async function getCurrencyRates(cron = false) {
  try {
    if (cron) {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`
      );
      if (!res.ok) {
        throw new Error('Failed to fetch currency rates');
      }
      return res.json();
    }
    const conversionRates = prisma.currency.findMany();
    return conversionRates;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}
