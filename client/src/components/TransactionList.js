import React, { useContext, useEffect } from 'react';
import Transaction from './Transaction';
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {
  //useContext is needed to fetch the context I want
  const { transactions, getTransactions } = useContext(GlobalContext);
  
  useEffect(()=>{
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactions.map((transaction) => {
          return (
            <Transaction transaction={transaction} key={transaction.id}/>
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionList;
