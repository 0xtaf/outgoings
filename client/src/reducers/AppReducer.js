export default (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        // transactions: [...state.transactions, action.payload],
        // if it comes from the state itself, the last one gets written before the action.payload
        // but if axios is getting used, we need to write it as the last
        transactions: [action.payload, ...state.transactions],
      };
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
