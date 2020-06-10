import React, { useContext } from 'react';
import Transaction from './Transaction';
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {
  //useContext is needed to fetch the context I want
  const { transactions } = useContext(GlobalContext);
  console.log(transactions);
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
