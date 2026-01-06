import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import { Search, MapPin, Star, Zap } from 'lucide-react-native';
import { CLUBS } from '../constants';
import { Screen, ScrollContent, Row } from '../components/Layout';
import { Chip } from '../components/Components';

export const ClubsScreen = ({ navigation }: any) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClubs = CLUBS.filter(club => {
    const matchesFilter = activeFilter === 'All' || club.type === activeFilter;
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          club.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.subtitle}>Let's Play</Text>
            <Text style={styles.title}>Book a court</Text>
          </View>
          <View style={styles.locationIcon}>
            <MapPin size={20} color="#2C6BFF" />
          </View>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search for clubs or areas..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {['All', 'Indoor', 'Outdoor', 'Private'].map((filter) => (
            <Chip 
              key={filter} 
              label={filter} 
              active={activeFilter === filter} 
              onPress={() => setActiveFilter(filter)} 
            />
          ))}
        </ScrollView>
      </View>

      <ScrollContent style={{ backgroundColor: '#F8FAFC' }} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}>
        {filteredClubs.map((club) => (
          <TouchableOpacity 
            key={club.id} 
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ClubDetails', { club })}
            style={styles.card}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: club.imageUrl }} style={styles.image} />
              <View style={styles.ratingBadge}>
                {/* Removed fill prop from Star to prevent native type errors */}
                <Star size={12} color="#FB923C" style={{ marginRight: 4 }} />
                <Text style={styles.ratingText}>{club.rating}</Text>
              </View>
              {club.type === 'Indoor' && (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Indoor</Text>
                </View>
              )}
            </View>

            <View style={styles.cardBody}>
              <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                  <Text style={styles.cardTitle}>{club.name}</Text>
                  <Row style={{ marginTop: 4 }}>
                    <MapPin size={14} color="#64748B" />
                    <Text style={styles.cardMeta}>{club.area} • {club.courts} courts</Text>
                  </Row>
                </View>
                <Text style={styles.price}>${club.pricePerHour}</Text>
              </Row>
              
              <View style={styles.bookBtn}>
                <Zap size={16} color="#2C6BFF" style={{ marginRight: 6 }} />
                <Text style={styles.bookBtnText}>Book Now</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollContent>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingBottom: 10, backgroundColor: '#FFF', zIndex: 10 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 },
  subtitle: { fontSize: 12, fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 4 },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  locationIcon: { padding: 8, backgroundColor: '#EFF6FF', borderRadius: 50 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 16, paddingHorizontal: 16, height: 50, marginBottom: 15 },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, fontWeight: '500', color: '#0F172A' },
  filters: { paddingBottom: 10 },
  card: { backgroundColor: '#FFF', borderRadius: 20, marginBottom: 20, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  imageContainer: { height: 180, width: '100%' },
  image: { width: '100%', height: '100%' },
  ratingBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
  tag: { position: 'absolute', bottom: 12, left: 12, backgroundColor: 'rgba(15,23,42,0.6)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  tagText: { color: '#FFF', fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  cardBody: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  cardMeta: { fontSize: 12, fontWeight: '500', color: '#64748B', marginLeft: 4 },
  price: { fontSize: 18, fontWeight: '800', color: '#2C6BFF' },
  bookBtn: { marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, backgroundColor: '#EFF6FF', borderRadius: 12 },
  bookBtnText: { color: '#2C6BFF', fontSize: 14, fontWeight: '700' },
});