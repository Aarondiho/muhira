import React, { createContext, useContext, useState } from "react";

const TabContext = createContext({opened: false, toggleOpened: () => {}});

export const TabContextProvider = ({children}) => {
  const [opened, setOpened] =useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
  };

  return (
    <TabContext.Provider value={{opened, toggleOpened}}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabMenu = () => useContext(TabContext);