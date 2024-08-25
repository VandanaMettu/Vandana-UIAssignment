import React, { useEffect, useState } from 'react';
import DashBoard from './DashBoard';
import Header from './Header';
import Footer from './Footer';


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