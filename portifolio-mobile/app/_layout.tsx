import React, { useEffect } from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Slot />
      <StatusBar style="auto" />
    </>
  );
}
