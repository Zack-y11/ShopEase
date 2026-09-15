import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await SplashScreen.hideAsync();
      setVisible(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <Image source={require('@/assets/images/splash-icon.png')} style={styles.icon} />
    </View>
  );
}

export function AnimatedIcon() {
  return (
    <Image source={require('@/assets/images/icon.png')} style={styles.appIcon} />
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#208AEF',
  },
  icon: {
    width: 76,
    height: 76,
  },
  appIcon: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
  },
});
