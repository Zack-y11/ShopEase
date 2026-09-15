import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

import { useDrawerControls } from './DrawerContext';

export function DrawerMenuButton() {
  const { toggleDrawer } = useDrawerControls();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Open navigation menu"
      onPress={toggleDrawer}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Feather name="menu" size={22} color="#006C47" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 12,
    padding: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
