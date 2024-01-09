import { useHistory } from 'react-router-dom';
import React, { createContext } from 'react';

const NavigationContext = createContext();

function NavigationProvider({ children }) {
    const history = useHistory();
  
    const navigateTo = (path) => {
      history.push(path);
    };
  
    const contextValue = {
      navigateTo,
    };
  
    return (
      <NavigationContext.Provider value={contextValue}>
        {children}
      </NavigationContext.Provider>
    );
  }

export { NavigationContext, NavigationProvider };