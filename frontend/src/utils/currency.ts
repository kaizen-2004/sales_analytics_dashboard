import type { MoneyValue } from '../types/SalesTransaction';

export const toNumber = (value: MoneyValue): number => {
  if (value === null || value === undefined || value === '') {
    return 0;
  }
  return Number(value);
};

export const formatCurrency = (value: MoneyValue): string =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(toNumber(value));

export const formatCompactCurrency = (value: MoneyValue): string =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(toNumber(value));

export const formatPercent = (value: MoneyValue): string => {
  const numeric = toNumber(value);
  const percent = Math.abs(numeric) <= 1 ? numeric * 100 : numeric;
  return `${percent.toFixed(2)}%`;
};
