import React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import './AwardPoints.css';




/**
 * @component - it display all the details related to reward points in the UI. It is a child component to the TransactionDetails component
 * @param {filteredTransactionData}  -  prop which is a Filtered Transactiosn Data which is filtered based on the customer ID given in Input
 * @param {monthlyRewardPoints}  - seggregared monthly reward points based on the customer ID for Each Months({June: 123, July:12, August: 12})
 * @param {setMonthlyRewardPoints} - sets the seggragated data based on the month and customer Id
 * @param {count} - is used for validation and displaying the message if the users enters a invalid customer ID.
 * @param {isSearched} - indiactes whether customer clicked in search button or not and is used for displaying data on UI
 * @returns returns the JSX code related to Reward Points that need to be displayed in the UI
 */

const AwardPoints = ({
  filteredTransactionData,
  monthlyRewardPoints,
  setMonthlyRewardPoints,
  count,
  isSearched,
 
  
 
}) => {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const monthCodes = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const sortedMonths=['June','July','August']

/**
 * the {CalculatedMonthlyRewardPoints} is a function which is used to calculate the month wise reward points based on the customer ID
 */

  const CalculatedMonthlyRewardPoints = useMemo(
    () => async () => {
      filteredTransactionData.forEach((record) => {
        let amount = 0;
        const converetedStringDate = record.transactionDate + "";
        const date = new Date(converetedStringDate);
        const month = date.getMonth();
        if (month == 5 || month == 6 || month == 7) {
          if (record.transactionAmount > 100) {
            amount = (record.transactionAmount - 100) * 2 + amount;
            setMonthlyRewardPoints((prevState) => {
              return {
                ...prevState,
                [monthCodes[month]]: prevState[monthCodes[month]]
                  ? prevState[monthCodes[month]] + amount
                  : amount,
              };
            });
          } else if (
            record.transactionAmount >= 50 ||
            record.transactionAmount <= 100
          ) {
            amount = record.transactionAmount * 1;
            setMonthlyRewardPoints((prevState) => {
              return {
                ...prevState,
                [monthCodes[month]]: prevState[monthCodes[month]]
                  ? prevState[monthCodes[month]] + amount
                  : amount,
              };
            });
          }
        }
      });
    },
    [filteredTransactionData]
  );
/**
 * {displayRewardMessage} - is a function which is called to return Montly and total reward points and it is called based on some condtions
 * @returns returns the JSX code to the component that have mothly reward points and Total reward points
 */
  const displayRewardMessage =()=>{
      return <>
       <h2>
      Congratulations {filteredTransactionData[0]?.customerName} you won the
      Award points!
    </h2>
    <ul  className="list-monthly-rewardpoints">
      {displayMonthlyData()}
      {displayTotalRewardPoints()}
    </ul>
      </>
  }

  /**
   * {displayMonthlyData} called by the {displayRewardMessage} to return the list of monthly reward points
   * @returns returns the JSX code
   */

  const displayMonthlyData = () => {
    const listofRecords = [];
    for (let i of sortedMonths) {
      if(Object.keys(monthlyRewardPoints).includes(i))
      {
        listofRecords.push(
          <li key={i}>
            The Mothly Reward Points for the Month of {i} is{" "}
            {monthlyRewardPoints[i]}
          </li>
        );
      }
    }
    return listofRecords;
  };
/**
   * {displayTotalRewardPoints} called by the {displayRewardMessage} to return the Total reward points
   * @returns returns JSX code
   */
  const displayTotalRewardPoints = () => {
    let totalRewardPoints = 0;
    for (let i in monthlyRewardPoints) {
      totalRewardPoints += monthlyRewardPoints[i];
    }
   
    return <h4>You Have Won total Reward Points of {totalRewardPoints}</h4>;
  };

  const displayErrorMessage= ()=>{
    return <h4>Please Enter a Valid Customer ID</h4>
  }

  useEffect(() => {
    CalculatedMonthlyRewardPoints();
  }, [CalculatedMonthlyRewardPoints]);

  
  /**
   * count==1 then the customer ID is valid so the monthly and total reward points are displayed
   * count==0 && isSearched===true is when customer ID is invalid and user clicked on search button, so Invalid customer ID message will be displayed
   */

  return (
    <>
    <section className=" awards-section">
      
      {(count==1) && displayRewardMessage()}
      {(count==0 && isSearched===true) && <p>Please Enter a Valid Customer ID</p>}
    
    </section>
    </>
    
  );
};

export default React.memo(AwardPoints);
