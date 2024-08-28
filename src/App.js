import React, { useEffect, useState } from 'react';
import DashBoard from './Components/DashBoard';
import Header from './Components/Header';
import Footer from './Components/Footer';


/**
 * @component {APP} which is the component that holds all the components in the website as child component
 * @returns returns the JSX code returned by the {Header}, {DashBoard} and {Footer} component 
 */
const App = () => {
 
  return (
  <div>
    <Header />
    <DashBoard />
     <Footer />

    </div>
  );
};

export default App;