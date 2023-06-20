import { NextResponse } from 'next/server';
import prisma from '../../../server/db/client';
import getCurrencyRates from '@/app/utils/helpers/getCurrencyRates';
import type ExchangeRateApiResponse from '../../../utils/interfaces/ExchangeRateApiResponse';

export async function GET() {
  try {
    const currentDate = new Date();
    const startDate = new Date('2023-06-01');

    if (currentDate < startDate) {
      return NextResponse.json({ message: 'Cron job has not started yet' });
    }
    // cron job
    const currencyRates: ExchangeRateApiResponse = await getCurrencyRates(true);
    const conversionRates = currencyRates.conversion_rates;
    const mainCurrencies = ['USD', 'EUR', 'CZK'];
    const mainRates = Object.keys(conversionRates).filter((code) =>
      mainCurrencies.includes(code)
    );
    for (const currencyCode in mainRates) {
      const rate = conversionRates[currencyCode];

      // Check if the instance already exists in the database
      const existingInstance = await prisma.currency.findUnique({
        where: {
          code: currencyCode,
        },
      });

      if (existingInstance) {
        // Update the existing instance in the database
        await prisma.currency.update({
          where: {
            code: currencyCode,
          },
          data: {
            rate,
          },
        });
      } else {
        // Create a new instance in the database
        await prisma.currency.create({
          data: {
            code: currencyCode,
            rate,
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
