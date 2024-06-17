import { useState } from 'react';

import { TabVariant } from './type';

const useTabMenu = (init: TabVariant) => {
  const [selectedTabMenu, setSelectedTabMenu] = useState<TabVariant>(init);

  const handleTabMenuClick = (selectedMenu: TabVariant) => {
    setSelectedTabMenu(selectedMenu);
  };

  return {
    selectedTabMenu,
    handleTabMenuClick,
  };
};

export default useTabMenu;
