import { useState, useEffect } from "react";
import AwardPoints from "./AwardPoints";
import "./TransactionsTable.css";
/**
 * @component - displays the recors of transactions in the form of table which also has child component {AwarsPoints}
 * @param {transactionsDetails} it has all the transaction records which are passed from DashBoard component
 * @returns JSX code which has table of transactions and reward points details
 */

const TransactionsTable = ({ transactionsDetails }) => {
  const [isSearched, setIsSearched] = useState(false);
  const [filteredTransactionData, setFilteredTransactionData] = useState([]);
  const [monthlyRewardPoints, setMonthlyRewardPoints] = useState({});
  const [customerId, setCustomerId] = useState();
  const [listofCustomerId, setListOfCustomerId] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let listofCustomers = transactionsDetails.map((item) => item.customerId);
    let set = new Set(listofCustomers);
    setListOfCustomerId([...set]);
    setFilteredTransactionData(transactionsDetails);
  }, [transactionsDetails]);
/**
 * onChangeInputHandler - is a function which gets called upon change in the values in input field
 * @param {e}  - it is the customer id that user has given in the input field and by default it receives the value
 */
  const onChangeInputHandler = (e) => {
    try {
      setCustomerId(e.target.value);
      setCount(0);
      setIsSearched(false);
      setFilteredTransactionData(transactionsDetails);
      setMonthlyRewardPoints({});
    } catch (error) {}
  };

  /**
   * {onSearchHandler}- is function which gets called when use clicks in search button and here data is filtered based on
   *  the customer ID andsetCount and setFilteredTransactionData states are data are set to 1 and fileted recors data if 
   * customerID is valid
   */
  const onSearchHandler = () => {
    setIsSearched(true);
    setMonthlyRewardPoints({});
    const fileteredData = transactionsDetails.filter(
      (record) => record.customerId == customerId
    );
    listofCustomerId.forEach((item) => {
      if (item + "" == customerId) {
        setCount(1);
      }
    });
    setFilteredTransactionData(fileteredData);
  };

  /**
   * onClearHandler is a function which gets called when user clicks on clear button and it sets all state values to default values
   */
  const onClearHandler = () => {
    setIsSearched(false);
    setFilteredTransactionData(transactionsDetails);
    setCustomerId("");
    setMonthlyRewardPoints({});
  };

  /**
   * tansactionsRows - is a function which is used to display the records of transactions dynamically
   */

  const tansactionsRows = (
    count == 1 ? filteredTransactionData : transactionsDetails
  ).map((transaction) => {
    return (
      <tr key={transaction.id}>
        <td>{transaction.id}</td>
        <td>{transaction.customerId}</td>
        <td>{transaction.customerName}</td>
        <td>{transaction.transactionDate}</td>
        <td>${transaction.transactionAmount}</td>
      </tr>
    );
  });

  return (
    <>
      <section className="search-section">
        <input
          type="text"
          placeholder="Enter customer Id"
          onChange={onChangeInputHandler}
          value={customerId}
        />
        <div className="btn-group">
          <button type="button" onClick={onSearchHandler} className="btn">
            Search
          </button>
          <button type="button" onClick={onClearHandler} className="btn">
            Clear
          </button>
        </div>
      </section>
      <main className="main-section">
        <section className="rewards-section">
          {isSearched && (
            <AwardPoints
              filteredTransactionData={filteredTransactionData}
              monthlyRewardPoints={monthlyRewardPoints}
              setMonthlyRewardPoints={setMonthlyRewardPoints}
              isSearched={isSearched}
              count={count}
            />
          )}
        </section>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Sno</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Transaction Date</th>
              <th>Transaction Amount</th>
            </tr>
          </thead>
          <tbody>
            {tansactionsRows}

            <tr></tr>
          </tbody>
        </table>
      </main>
    </>
  );
};

export default TransactionsTable;
