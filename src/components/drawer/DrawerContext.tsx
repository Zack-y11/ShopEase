import { createContext, useContext } from 'react';

export type DrawerControls = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  headerShown: boolean;
  setHeaderShown: (shown: boolean) => void;
};

export const DrawerContext = createContext<DrawerControls | null>(null);

export function useDrawerControls() {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('useDrawerControls must be used within DrawerProvider');
  }

  return context;
}
