import React, { useMemo } from "react";
import { useState, useEffect, useRef } from "react";
import TransactionsTable from "./TransactionsTable";

/**
 * @component - which acts like dashboard displays all the records of transactions
 * @returns it calles the TransactionDetails component inturn displays the JSX code
 */

const DashBoard = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [dependency, setDependency] = useState(0);

  /**
   * fetchTransactionsData - is function which makes the API call and fetches the transactions records in the JSON 
   * format and upates the TransactionsData state
   */
  const fetchTransactionsData = useMemo(
    () => async () => {
      try {
        fetch("/data.json")
          .then((response) => response.json())
          .then((result) => {
         
            setTransactionsData(result.transactions);
            
          });
      } catch (error) {
        console.error("Error Fetching the Transactions Data:", error);
      }
    },
    [dependency]
  );

  useEffect(() => {
    fetchTransactionsData();
  }, [fetchTransactionsData]);

  return (
    <div className="container">
      <TransactionsTable transactionsDetails={transactionsData} />
    </div>
  );
};

export default DashBoard;
