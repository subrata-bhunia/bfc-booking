const handleCalCulatePrice = (
  state = {uniqueId: 0, totalAmount: 0},
  action,
) => {
  switch (action.type) {
    case 'CALCULATE_PRICE':
      var total = 0;
      const itemRents = action.payload?.rent;
      for (var i = 0; i < Object.keys(action.payload.data).length; i++) {
        let itemId = Object.keys(action.payload.data)[i];

        total +=
          parseInt(action.payload.data[itemId]) * parseInt(itemRents[itemId]);

        // if ( == 'ITM001') {
        //   total += action.payload.data.ITM001 * 50;
        // } else {
        //   total;
        // }
      }
      console.log('=====Fun value', action.payload);
      console.log('===----==', total);
      return (state = {uniqueId: action.payload.uniqueId, totalAmount: total});
    //   for (var i = 0; i < action.payload.data.length; i++) {
    //     if (action.payload.data[action.payload.itemIdPosition] == 'ITM018') {
    //       state =
    //         action.payload.data[action.payload.itemIdPosition.qtyPosition];
    //     }
    //   }
    default:
      return state;
  }
};

export default handleCalCulatePrice;
