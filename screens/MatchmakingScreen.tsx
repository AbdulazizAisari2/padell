import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Users, Clock, Plus, ChevronRight } from 'lucide-react-native';
import { Screen, ScrollContent, Row } from '../components/Layout';
import { Button } from '../components/Components';
import { MATCHES, CLUBS } from '../constants';

const LEVELS = ['Beginner (1.0-2.5)', 'Intermediate (3.0-4.5)', 'Advanced (5.0+)'];
const TIMES = ['07:00', '08:30', '10:00', '17:00', '18:30', '20:00', '21:30'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MatchmakingScreen = () => {
  const [mode, setMode] = useState<'FIND' | 'CREATE'>('FIND');
  
  // Create Match State
  const [selectedClubId, setSelectedClubId] = useState(CLUBS[0].id);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState('18:30');
  const [level, setLevel] = useState('Intermediate (3.0-4.5)');

  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      day: i === 0 ? 'Today' : DAYS[d.getDay()],
      date: d.getDate(),
      fullDate: d,
    };
  });

  const getLevelStyles = (levelStr: string) => {
    const lower = levelStr.toLowerCase();
    if (lower.includes('beginner')) return { bg: '#DCFCE7', text: '#15803D', bar: '#22C55E' };
    if (lower.includes('advanced')) return { bg: '#FFEDD5', text: '#C2410C', bar: '#F97316' };
    return { bg: '#DBEAFE', text: '#1D4ED8', bar: '#2C6BFF' };
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Row style={{ justifyContent: 'space-between', marginBottom: 15 }}>
          <Text style={styles.title}>Matches</Text>
          <TouchableOpacity 
            onPress={() => setMode(mode === 'CREATE' ? 'FIND' : 'CREATE')}
            style={[styles.fab, mode === 'CREATE' ? { backgroundColor: '#F1F5F9', transform: [{rotate: '45deg'}] } : { backgroundColor: '#2C6BFF' }]}
          >
            <Plus size={24} color={mode === 'CREATE' ? '#0F172A' : '#FFF'} />
          </TouchableOpacity>
        </Row>
        
        <Row style={styles.tabs}>
          <TouchableOpacity onPress={() => setMode('FIND')} style={[styles.tab, mode === 'FIND' && styles.tabActive]}>
            <Text style={[styles.tabText, mode === 'FIND' && styles.tabTextActive]}>Open Matches</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMode('CREATE')} style={[styles.tab, mode === 'CREATE' && styles.tabActive]}>
            <Text style={[styles.tabText, mode === 'CREATE' && styles.tabTextActive]}>Create Match</Text>
          </TouchableOpacity>
        </Row>
      </View>

      <ScrollContent contentContainerStyle={{ padding: 20 }}>
        {mode === 'FIND' ? (
          MATCHES.map((match) => {
            const stylesLevel = getLevelStyles(match.level);
            return (
              <View key={match.id} style={styles.card}>
                <View style={[styles.cardBar, { backgroundColor: stylesLevel.bar }]} />
                
                <View style={styles.cardContent}>
                  <View style={{ flex: 1 }}>
                    <Row style={{ marginBottom: 6 }}>
                      <View style={[styles.levelBadge, { backgroundColor: stylesLevel.bg, borderColor: stylesLevel.bar }]}>
                        <Text style={[styles.levelText, { color: stylesLevel.text }]}>{match.level.split(' ')[0]}</Text>
                      </View>
                      <Text style={styles.dot}>•</Text>
                      <Clock size={12} color="#94A3B8" style={{ marginRight: 4 }} />
                      <Text style={styles.timeText}>{match.time}</Text>
                    </Row>
                    <Text style={styles.matchClub}>{match.clubName}</Text>
                    <Text style={styles.matchDate}>{match.date}</Text>
                  </View>
                </View>

                {/* Level Visual Bar */}
                <View style={styles.visualBarContainer}>
                  <View style={[styles.visualBarTrack, { backgroundColor: stylesLevel.bg }]}>
                    <View style={[
                      styles.visualBarFill, 
                      { 
                        backgroundColor: stylesLevel.bar,
                        left: match.level.includes('Intermediate') ? '33%' : match.level.includes('Advanced') ? '66%' : '0%'
                      }
                    ]} />
                  </View>
                </View>

                <Row style={{ justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 16 }}>
                  <Row>
                     {[...Array(match.joined)].map((_, i) => (
                        <View key={i} style={[styles.avatar, { marginLeft: i > 0 ? -10 : 0 }]}>
                          <Image source={{ uri: `https://picsum.photos/id/${200+i}/100/100` }} style={{ width: '100%', height: '100%' }} />
                        </View>
                     ))}
                      {[...Array(match.totalSpots - match.joined)].map((_, i) => (
                        <View key={`e-${i}`} style={[styles.avatar, styles.emptyAvatar, { marginLeft: -10 }]}>
                           <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#CBD5E1' }}>?</Text>
                        </View>
                     ))}
                  </Row>
                  <Button 
                    label={match.isJoined ? 'Leave' : 'Join'} 
                    onPress={() => {}}
                    variant={match.isJoined ? 'outline' : 'primary'}
                    style={{ height: 40, paddingVertical: 0, paddingHorizontal: 20 }}
                  />
                </Row>
              </View>
            );
          })
        ) : (
          <View style={styles.formCard}>
             <Text style={styles.label}>Location</Text>
             <View style={styles.picker}>
               <Text style={styles.pickerText}>{CLUBS.find(c => c.id === selectedClubId)?.name}</Text>
               <ChevronRight size={20} color="#94A3B8" />
             </View>

             <Text style={styles.label}>Date</Text>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                {dates.map((d, index) => {
                    const isSelected = selectedDateIndex === index;
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedDateIndex(index)}
                            style={[styles.dateBtn, isSelected && styles.dateBtnActive]}
                        >
                            <Text style={[styles.dateBtnDay, isSelected && { color: '#FFF' }]}>{d.day}</Text>
                            <Text style={[styles.dateBtnNum, isSelected && { color: '#FFF' }]}>{d.date}</Text>
                        </TouchableOpacity>
                    )
                })}
             </ScrollView>

             <Text style={styles.label}>Time</Text>
             <View style={styles.timeGrid}>
                {TIMES.map((t) => {
                  const isSelected = selectedTime === t;
                  return (
                    <TouchableOpacity
                      key={t}
                      onPress={() => setSelectedTime(t)}
                      style={[styles.timeBtn, isSelected && styles.timeBtnActive]}
                    >
                      <Text style={[styles.timeBtnText, isSelected && { color: '#FFF' }]}>{t}</Text>
                    </TouchableOpacity>
                  )
                })}
             </View>
             
             <View style={{ marginTop: 20 }}>
              <Button label="Create Match" onPress={() => setMode('FIND')} />
             </View>
          </View>
        )}
      </ScrollContent>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 10, backgroundColor: '#FFF', paddingBottom: 0 },
  title: { fontSize: 24, fontWeight: '800', color: '#0F172A' },
  fab: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  tabs: { borderBottomWidth: 1, borderColor: '#F1F5F9' },
  tab: { marginRight: 20, paddingBottom: 10, borderBottomWidth: 2, borderColor: 'transparent' },
  tabActive: { borderColor: '#2C6BFF' },
  tabText: { fontSize: 14, fontWeight: '700', color: '#94A3B8' },
  tabTextActive: { color: '#2C6BFF' },
  card: { backgroundColor: '#FFF', borderRadius: 20, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#F1F5F9' },
  cardBar: { width: 6, position: 'absolute', top: 0, bottom: 0, left: 0 },
  cardContent: { padding: 16, paddingLeft: 20 },
  levelBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1 },
  levelText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  dot: { marginHorizontal: 6, color: '#CBD5E1' },
  timeText: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  matchClub: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginTop: 4 },
  matchDate: { fontSize: 12, fontWeight: '500', color: '#94A3B8' },
  visualBarContainer: { height: 6, backgroundColor: '#F1F5F9', marginHorizontal: 16, borderRadius: 3, marginBottom: 16, overflow: 'hidden' },
  visualBarTrack: { flex: 1, borderRadius: 3 },
  visualBarFill: { width: '33%', height: '100%', position: 'absolute' },
  avatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#FFF', overflow: 'hidden' },
  emptyAvatar: { backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center' },
  formCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 24 },
  label: { fontSize: 12, fontWeight: '700', color: '#64748B', textTransform: 'uppercase', marginBottom: 10 },
  picker: { backgroundColor: '#F8FAFC', borderRadius: 16, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 20 },
  pickerText: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  dateBtn: { width: 60, height: 70, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  dateBtnActive: { backgroundColor: '#0F172A', borderColor: '#0F172A' },
  dateBtnDay: { fontSize: 10, fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' },
  dateBtnNum: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  timeBtn: { width: '23%', paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center' },
  timeBtnActive: { backgroundColor: '#2C6BFF', borderColor: '#2C6BFF' },
  timeBtnText: { fontSize: 14, fontWeight: '700', color: '#64748B' },
});