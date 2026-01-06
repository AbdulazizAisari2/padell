import React from 'react';
import { View as RNView, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Screen = ({ children, style }: any) => (
  <RNView style={[styles.container, style]}>
    <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      {children}
    </SafeAreaView>
  </RNView>
);

export const ScrollContent = ({ children, style, contentContainerStyle }: any) => (
  <ScrollView 
    style={[styles.scroll, style]} 
    contentContainerStyle={[styles.scrollContent, contentContainerStyle]} 
    showsVerticalScrollIndicator={false}
  >
    {children}
  </ScrollView>
);

export const View = RNView;
export const Row = ({ children, style }: any) => <RNView style={[styles.row, style]}>{children}</RNView>;
export const SafeAreaViewWrapper = Screen; 

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  row: { flexDirection: 'row', alignItems: 'center' },
});