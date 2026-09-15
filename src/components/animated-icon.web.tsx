import { Image } from 'expo-image';
import { Dimensions, StyleSheet } from 'react-native';

export function AnimatedSplashOverlay() {
  return null;
}

export function AnimatedIcon() {
  return (
    <Image source={require('@/assets/images/icon.png')} style={styles.appIcon} />
  );
}

const styles = StyleSheet.create({
  appIcon: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
  },
});
