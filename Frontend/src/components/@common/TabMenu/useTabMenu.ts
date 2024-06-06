import { useState } from 'react';

const useTabMenu = <T>(init: T) => {
  const [selectedTabMenu, setSelectedTabMenu] = useState<T>(init);

  const handleTabMenuClick = (selectedMenu: T) => {
    setSelectedTabMenu(selectedMenu);
  };

  return {
    selectedTabMenu,
    handleTabMenuClick,
  };
};

export default useTabMenu;
