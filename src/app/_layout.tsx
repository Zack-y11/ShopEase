import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

function NavigationGuard() {
  const { token, isLoadingSession } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const isInProtectedRoute = segments[0] === '(protected)';

  useEffect(() => {
    if (isLoadingSession) {
      return;
    }

    if (token) {
      if (!isInProtectedRoute) {
        router.replace('/(protected)/dashboard');
      }
    } else if (isInProtectedRoute) {
      router.replace('/(public)');
    }
  }, [token, isLoadingSession, segments, router]);

  const waitingForRedirect =
    !isLoadingSession &&
    ((Boolean(token) && !isInProtectedRoute) || (!token && isInProtectedRoute));

  return (
    <View style={styles.root}>
      <Slot />
      {isLoadingSession || waitingForRedirect ? (
        <View style={styles.sessionOverlay} pointerEvents="auto">
          <ActivityIndicator size="large" color="#005C3A" />
        </View>
      ) : null}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <NavigationGuard />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  sessionOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
