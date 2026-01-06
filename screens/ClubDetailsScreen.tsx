import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { ArrowLeft, MapPin, Star, Share2, Check } from 'lucide-react-native';
import { generateSlots } from '../constants';
import { ScrollContent, Row } from '../components/Layout';
import { Button, IconButton } from '../components/Components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const ClubDetailsScreen = ({ route, navigation }: any) => {
  const { club } = route.params;
  const insets = useSafeAreaInsets();
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slots, setSlots] = useState<any[]>([]);

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      day: DAYS[d.getDay()],
      date: d.getDate(),
      fullDate: d,
    };
  });

  useEffect(() => {
    setSlots([]);
    const timer = setTimeout(() => {
      setSlots(generateSlots(club.pricePerHour));
    }, 150);
    setSelectedSlot(null);
    return () => clearTimeout(timer);
  }, [selectedDateIndex, club.pricePerHour]);

  const handleBookPress = () => {
    const slot = slots.find(s => s.id === selectedSlot);
    if (slot) {
      // Mock booking action
      navigation.goBack();
      alert('Booking functionality simulated!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Hero */}
      <View style={styles.hero}>
        <Image source={{ uri: club.imageUrl }} style={styles.heroImage} />
        <View style={styles.overlay} />
        
        <View style={[styles.header, { top: insets.top + 10 }]}>
          <IconButton icon={ArrowLeft} onPress={() => navigation.goBack()} color="#FFF" />
          <IconButton icon={Share2} onPress={() => {}} color="#FFF" />
        </View>

        <View style={styles.heroContent}>
          <Text style={styles.clubName}>{club.name}</Text>
          <Row>
            <View style={styles.badge}>
              <MapPin size={12} color="#FFF" style={{ marginRight: 4 }} />
              <Text style={styles.badgeText}>{club.area}</Text>
            </View>
            <View style={[styles.badge, { marginLeft: 8 }]}>
              {/* Removed fill prop */}
              <Star size={12} color="#FACC15" style={{ marginRight: 4 }} />
              <Text style={styles.badgeText}>{club.rating}</Text>
            </View>
          </Row>
        </View>
      </View>

      <ScrollContent style={styles.content} contentContainerStyle={{ paddingTop: 20 }}>
        {/* Date Selector */}
        <View style={styles.section}>
          <Row style={{ justifyContent: 'space-between', marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <Text style={styles.selectedDate}>
              {dates[selectedDateIndex].fullDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Text>
          </Row>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
            {dates.map((item, index) => {
              const isSelected = selectedDateIndex === index;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedDateIndex(index)}
                  style={[styles.dateCard, isSelected && styles.dateCardActive]}
                >
                  <Text style={[styles.dateDay, isSelected && { color: '#DBEAFE' }]}>{item.day}</Text>
                  <Text style={[styles.dateNum, isSelected && { color: '#FFF' }]}>{item.date}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Slots */}
        <View style={[styles.section, { paddingBottom: 120 }]}>
          <Text style={styles.sectionTitle}>Available Slots</Text>
          <View style={styles.grid}>
            {slots.map((slot) => {
              const isSelected = selectedSlot === slot.id;
              return (
                <TouchableOpacity
                  key={slot.id}
                  disabled={!slot.available}
                  onPress={() => setSelectedSlot(slot.id)}
                  style={[
                    styles.slotCard, 
                    !slot.available && styles.slotDisabled,
                    isSelected && styles.slotActive
                  ]}
                >
                  <Row style={{ justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={[styles.slotTime, isSelected && { color: '#FFF' }]}>{slot.time}</Text>
                    {isSelected && <Check size={16} color="#FFF" />}
                  </Row>
                  <Text style={[styles.slotCourt, isSelected ? { color: '#DBEAFE' } : { color: '#94A3B8' }]}>
                    {slot.court}
                  </Text>
                  <Text style={[styles.slotPrice, isSelected ? { color: '#FFF' } : { color: '#0F172A' }]}>
                    ${slot.price}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollContent>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Button 
          label={selectedSlot ? `Book for $${club.pricePerHour}` : 'Select a time'} 
          onPress={handleBookPress} 
          disabled={!selectedSlot}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  hero: { height: 260, width: '100%' },
  heroImage: { width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(15,23,42,0.4)' },
  header: { position: 'absolute', left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between' },
  heroContent: { position: 'absolute', bottom: 30, left: 20 },
  clubName: { fontSize: 28, fontWeight: '800', color: '#FFF', marginBottom: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  content: { flex: 1, backgroundColor: '#FFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -24 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
  selectedDate: { fontSize: 14, fontWeight: '700', color: '#2C6BFF' },
  dateCard: { width: 64, height: 76, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  dateCardActive: { backgroundColor: '#2C6BFF', borderColor: '#2C6BFF' },
  dateDay: { fontSize: 10, fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 2 },
  dateNum: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  slotCard: { width: '48%', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
  slotDisabled: { backgroundColor: '#F8FAFC', opacity: 0.6 },
  slotActive: { backgroundColor: '#2C6BFF', borderColor: '#2C6BFF' },
  slotTime: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  slotCourt: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', marginBottom: 8 },
  slotPrice: { fontSize: 14, fontWeight: '800' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.9)', padding: 20, borderTopWidth: 1, borderColor: '#F1F5F9' },
});