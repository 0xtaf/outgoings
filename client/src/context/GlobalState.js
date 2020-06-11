import React, { createContext, useReducer } from 'react';
import AppReducer from '../reducers/AppReducer';
import axios from 'axios';

// 1. create the initialState. I'll pass this into useReducer.
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

// 2. create a global context. I'll use its provider to wrap the children
export const GlobalContext = createContext(initialState); //I think I can delete this initialState because it actually comes from the reducer not this context.
//check this out later

// 3. create a global provider that'll wrap all those components who need this state
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //I'll code the actions here because I want them all in a single related file like this.

  const getTransactions = async () => {
    try {
      const res = await axios.get('/api/v1/transactions');

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data,
      });
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data,
      });
    }
  };

  const addTransaction = async (transaction) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data,
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        getTransactions,
        error: state.error,
        loading: state.loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
