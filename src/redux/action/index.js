export const calculateAction = (uniqueId, data, rent) => {
  return {
    type: 'CALCULATE_PRICE',
    payload: {
      uniqueId,
      data: data,
      rent,
    },
  };
};
