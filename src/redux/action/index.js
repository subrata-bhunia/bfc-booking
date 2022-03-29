export const calculateAction = (userId, data, itemIdPosition, qtyPosition) => {
  return {
    type: 'CALCULATE_PRICE',
    payload: {
      userId,
      data: data,
      itemIdPosition: itemIdPosition,
      qtyPosition: qtyPosition,
    },
  };
};
