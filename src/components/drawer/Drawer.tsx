import { useEffect } from 'react';

import { useDrawerControls } from './DrawerContext';

type DrawerScreenOptions = {
  headerShown?: boolean;
};

type DrawerScreenProps = {
  options?: DrawerScreenOptions;
};

function DrawerScreen({ options }: DrawerScreenProps) {
  const { setHeaderShown } = useDrawerControls();
  const headerShown = options?.headerShown ?? true;

  useEffect(() => {
    setHeaderShown(headerShown);
    return () => setHeaderShown(true);
  }, [headerShown, setHeaderShown]);

  return null;
}

export const Drawer = {
  Screen: DrawerScreen,
};
