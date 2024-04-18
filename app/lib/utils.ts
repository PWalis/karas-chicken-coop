export const formatCurrency = (amount: BigInt | number) => {
  return (Number(amount) / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

    