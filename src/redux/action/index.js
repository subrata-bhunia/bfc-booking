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

export const fcmSet = (user_id, fcm_token) => {
  return {
    type: 'GET_FCM',
    user_id,
    fcm_token,
  };
};
