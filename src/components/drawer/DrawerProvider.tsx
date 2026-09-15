import { PropsWithChildren, useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { DrawerContext } from './DrawerContext';
import { DrawerHeader } from './DrawerHeader';
import { DrawerMenu } from './DrawerMenu';

const DRAWER_WIDTH = 320;

export function DrawerProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShown, setHeaderShown] = useState(true);
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const animateTo = useCallback(
    (open: boolean, onComplete?: () => void) => {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: open ? 0 : -DRAWER_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: open ? 0.45 : 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          onComplete?.();
        }
      });
    },
    [overlayOpacity, translateX],
  );

  const openDrawer = useCallback(() => {
    setIsOpen(true);
    requestAnimationFrame(() => animateTo(true));
  }, [animateTo]);

  const closeDrawer = useCallback(() => {
    animateTo(false, () => setIsOpen(false));
  }, [animateTo]);

  const toggleDrawer = useCallback(() => {
    if (isOpen) {
      closeDrawer();
      return;
    }

    openDrawer();
  }, [closeDrawer, isOpen, openDrawer]);

  const value = useMemo(
    () => ({
      isOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      headerShown,
      setHeaderShown,
    }),
    [closeDrawer, headerShown, isOpen, openDrawer, toggleDrawer],
  );

  return (
    <DrawerContext.Provider value={value}>
      <View style={styles.root}>
        {headerShown ? <DrawerHeader /> : null}
        {children}
      </View>
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={closeDrawer}
        statusBarTranslucent>
        <View style={styles.modalRoot}>
          <Pressable style={styles.backdrop} onPress={closeDrawer}>
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
          </Pressable>

          <Animated.View style={[styles.drawerPanel, { transform: [{ translateX }] }]}>
            <DrawerMenu />
          </Animated.View>
        </View>
      </Modal>
    </DrawerContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  modalRoot: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000000',
  },
  drawerPanel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 320,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 4, height: 0 },
    elevation: 8,
  },
});
