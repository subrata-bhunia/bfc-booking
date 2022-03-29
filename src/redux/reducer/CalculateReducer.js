const handleCalCulatePrice = (state = {userId: 0, totalAmount: 0}, action) => {
  switch (action.type) {
    case 'CALCULATE_PRICE':
      var total = 0;
      for (var i = 0; i < action.payload.data.length; i++) {
        if (action.payload.data[i][action.payload.itemIdPosition] == 'ITM019') {
          //   state =
          //     state +
          //     action.payload.data[action.payload.itemIdPosition.qtyPosition];
          console.log(
            '=====+++++',
            action.payload.data[i][action.payload.qtyPosition],
          );
          total += action.payload.data[i][action.payload.qtyPosition] * 3;
        } else if (
          (action.payload.data[i][action.payload.itemIdPosition] = 'ITM018')
        ) {
          console.log(
            '=====+++++',
            action.payload.data[i][action.payload.qtyPosition],
          );
          total += action.payload.data[i][action.payload.qtyPosition] * 2;
        }
      }
      console.log('=====', action.payload);
      console.log('===----==', total);
      return (state = {userId: action.payload.userId, totalAmount: total});
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
