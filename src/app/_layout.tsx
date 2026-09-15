import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

function NavigationGuard() {
  const { token, isLoadingSession } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoadingSession) {
      return;
    }

    const isInProtectedRoute = segments[0] === '(protected)';

    if (token) {
      if (!isInProtectedRoute) {
        router.replace('/(protected)/dashboard');
      }
    } else if (isInProtectedRoute) {
      router.replace('/(public)');
    }
  }, [token, isLoadingSession, segments, router]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <NavigationGuard />
    </AuthProvider>
  );
}
