import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Calendar, Clock, MapPin, Share2, MessageCircle } from 'lucide-react-native';
import { BOOKINGS, CLUBS } from '../constants';
import { Screen, ScrollContent, Row } from '../components/Layout';

export const BookingsScreen = () => {
  const [filter, setFilter] = useState('Upcoming');

  const getClubImage = (clubId: string) => {
    const club = CLUBS.find(c => c.id === clubId);
    return club?.imageUrl || 'https://picsum.photos/800/600';
  };

  const displayBookings = filter === 'Upcoming' ? BOOKINGS : [];

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Your Games</Text>
        <Row style={styles.tabs}>
            <TouchableOpacity onPress={() => setFilter('Upcoming')} style={[styles.tab, filter === 'Upcoming' && styles.tabActive]}>
                <Text style={[styles.tabText, filter === 'Upcoming' && styles.tabTextActive]}>Upcoming</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilter('Past')} style={[styles.tab, filter === 'Past' && styles.tabActive]}>
                <Text style={[styles.tabText, filter === 'Past' && styles.tabTextActive]}>History</Text>
            </TouchableOpacity>
        </Row>
      </View>

      <ScrollContent contentContainerStyle={{ padding: 20 }}>
        {displayBookings.map((booking) => (
          <View key={booking.id} style={styles.card}>
            <View style={styles.cardImageContainer}>
              <Image source={{ uri: getClubImage(booking.clubId) }} style={styles.cardImage} />
              <View style={styles.overlay} />
              <View style={styles.cardHeaderContent}>
                 <Text style={styles.cardClubName}>{booking.clubName}</Text>
                 <Row>
                   <MapPin size={12} color="#E2E8F0" style={{ marginRight: 4 }} />
                   <Text style={styles.cardCourt}>{booking.court}</Text>
                 </Row>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{booking.status}</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
               <Row style={{ justifyContent: 'space-between', marginBottom: 20 }}>
                 <Row>
                   <View style={styles.iconBox}><Calendar size={20} color="#2C6BFF" /></View>
                   <View>
                     <Text style={styles.metaLabel}>Date</Text>
                     <Text style={styles.metaValue}>{booking.date}</Text>
                   </View>
                 </Row>
                 <View style={styles.divider} />
                 <Row>
                   <View style={styles.iconBox}><Clock size={20} color="#2C6BFF" /></View>
                   <View>
                     <Text style={styles.metaLabel}>Time</Text>
                     <Text style={styles.metaValue}>{booking.time}</Text>
                   </View>
                 </Row>
               </Row>

               <View style={styles.line} />

               <Row style={{ justifyContent: 'space-between', marginTop: 15 }}>
                  <Row>
                    <View style={styles.avatar}><Text style={styles.avatarText}>You</Text></View>
                    <View style={[styles.avatar, styles.avatarMore]}><Text style={styles.avatarMoreText}>+3</Text></View>
                  </Row>
                  <Row>
                    <TouchableOpacity style={styles.actionBtn}><Share2 size={18} color="#94A3B8" /></TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}><MessageCircle size={18} color="#94A3B8" /></TouchableOpacity>
                    <TouchableOpacity style={styles.manageBtn}><Text style={styles.manageBtnText}>Manage</Text></TouchableOpacity>
                  </Row>
               </Row>
            </View>
          </View>
        ))}
      </ScrollContent>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 10, backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginBottom: 15 },
  tabs: { borderBottomWidth: 1, borderColor: '#F1F5F9' },
  tab: { marginRight: 20, paddingBottom: 10, borderBottomWidth: 2, borderColor: 'transparent' },
  tabActive: { borderColor: '#2C6BFF' },
  tabText: { fontSize: 14, fontWeight: '700', color: '#94A3B8' },
  tabTextActive: { color: '#2C6BFF' },
  card: { backgroundColor: '#FFF', borderRadius: 24, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, overflow: 'hidden' },
  cardImageContainer: { height: 130, width: '100%' },
  cardImage: { width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(15,23,42,0.3)' },
  cardHeaderContent: { position: 'absolute', bottom: 15, left: 15 },
  cardClubName: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 4 },
  cardCourt: { color: '#E2E8F0', fontSize: 12, fontWeight: '500' },
  statusBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  statusText: { color: '#FFF', fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  cardBody: { padding: 20 },
  iconBox: { width: 40, height: 40, backgroundColor: '#EFF6FF', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  metaLabel: { fontSize: 10, fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' },
  metaValue: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  divider: { width: 1, height: 30, backgroundColor: '#F1F5F9', marginHorizontal: 20 },
  line: { height: 1, backgroundColor: '#F1F5F9', width: '100%' },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFF' },
  avatarText: { fontSize: 10, fontWeight: '700', color: '#64748B' },
  avatarMore: { backgroundColor: '#F1F5F9', marginLeft: -10 },
  avatarMoreText: { fontSize: 10, fontWeight: '700', color: '#94A3B8' },
  actionBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  manageBtn: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: 'rgba(44,107,255,0.1)', borderRadius: 20 },
  manageBtnText: { color: '#2C6BFF', fontSize: 12, fontWeight: '700' },
});