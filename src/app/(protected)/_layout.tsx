import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { DrawerProvider } from '@/components/drawer/DrawerProvider';

export default function ProtectedLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DrawerProvider>
        <Slot />
      </DrawerProvider>
    </GestureHandlerRootView>
  );
}
