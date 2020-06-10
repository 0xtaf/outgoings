import React, { createContext, useReducer } from 'react';
import AppReducer from '../reducers/AppReducer';

// 1. create the initialState. I'll pass this into useReducer.
const initialState = {
  transactions: [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 },
  ],
};

// 2. create a global context. I'll use its provider to wrap the children
export const GlobalContext = createContext(initialState); //I think I can delete this initialState because it actually comes from the reducer not this context. 
//check this out later

// 3. create a global provider that'll wrap all those components who need this state
export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  return (
    <GlobalContext.Provider value={{transactions: state.transactions, dispatch}}>{children}</GlobalContext.Provider>
  )
}
