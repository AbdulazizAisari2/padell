import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export const Button = ({ label, onPress, variant = 'primary', style, icon: Icon, disabled }: any) => {
  const bg = disabled ? '#CBD5E1' : (variant === 'primary' ? '#2C6BFF' : (variant === 'outline' ? 'transparent' : '#EFF6FF'));
  const text = disabled ? '#94A3B8' : (variant === 'primary' ? '#FFF' : (variant === 'outline' ? '#334155' : '#2C6BFF'));
  const border = variant === 'outline' ? '#E2E8F0' : 'transparent';

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.btn, { backgroundColor: bg, borderColor: border, borderWidth: variant === 'outline' ? 1 : 0 }, style]}
    >
      {Icon && <Icon size={18} color={text} style={{ marginRight: 8 }} />}
      <Text style={[styles.btnText, { color: text }]}>{label}</Text>
    </TouchableOpacity>
  );
};

export const Chip = ({ label, active, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
  >
    <Text style={[styles.chipText, active ? { color: '#FFF' } : { color: '#64748B' }]}>{label}</Text>
  </TouchableOpacity>
);

export const IconButton = ({ icon: Icon, onPress, style, color = '#1E293B', size=24 }: any) => (
  <TouchableOpacity onPress={onPress} style={[styles.iconBtn, style]}>
    <Icon size={size} color={color} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 100 },
  btnText: { fontWeight: '700', fontSize: 15 },
  chip: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 100, marginRight: 8, borderWidth: 1 },
  chipActive: { backgroundColor: '#2C6BFF', borderColor: '#2C6BFF' },
  chipInactive: { backgroundColor: '#FFF', borderColor: '#E2E8F0' },
  chipText: { fontSize: 13, fontWeight: '700' },
  iconBtn: { padding: 10, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
});