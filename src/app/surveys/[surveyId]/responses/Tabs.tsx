'use client';

import { classNames } from '@/utils';
import { ReactNode, createContext, useContext, useState } from 'react';

type Tab = 'stats' | 'all_responses';
type TabsContextType = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
};
const TabsContext = createContext<TabsContextType>({
  activeTab: 'stats',
  setActiveTab: () => {},
});

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<Tab>('stats');

  const context = {
    activeTab,
    setActiveTab,
  };

  return (
    <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
  );
};

const inactiveClassName = 'border-2 border-dashed';
const activeClassName = 'bg-blue-500/75 font-semibold text-white';
const baseClassName =
  'my-5 flex items-center rounded-full px-5 hover:cursor-pointer';

export const Tabs = () => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <menu className="mx-3 flex h-full gap-2">
      <li
        onClick={() => setActiveTab('stats')}
        className={classNames(
          baseClassName,
          activeTab === 'stats' ? activeClassName : inactiveClassName,
        )}
      >
        Stats
      </li>
      <li
        onClick={() => setActiveTab('all_responses')}
        className={classNames(
          baseClassName,
          activeTab === 'all_responses' ? activeClassName : inactiveClassName,
        )}
      >
        All Responses
      </li>
    </menu>
  );
};

export const TabView = ({
  children,
  tab,
}: {
  children: ReactNode;
  tab: Tab;
}) => {
  const { activeTab } = useContext(TabsContext);
  return activeTab === tab ? <>{children}</> : null;
};
