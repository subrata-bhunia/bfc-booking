const handleCalCulatePrice = (
  state = {uniqueId: 0, totalAmount: 0},
  action,
) => {
  switch (action.type) {
    case 'CALCULATE_PRICE':
      var total = 0;
      const itemRents = (action.payload?.rent) ? action.payload?.rent : 0;
      for (var i = 0; i < Object.keys(action.payload.data).length; i++) {
        var itemId = Object.keys(action.payload.data)[i];
        if(itemId){
          var itemqty = action.payload.data[itemId] ? action.payload.data[itemId] : 0;
          total += parseInt(itemqty) * parseInt(itemRents[itemId]);
        }
      }
      return (state = {uniqueId: action.payload.uniqueId, totalAmount: total});
    default:
      return state;
  }
};

export default handleCalCulatePrice;
