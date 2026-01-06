import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Settings, Edit2, Zap, Activity, Trophy, TrendingUp, Flame, Moon, ChevronRight } from 'lucide-react-native';
import { USER } from '../constants';
import { Screen, ScrollContent, Row } from '../components/Layout';
import { IconButton } from '../components/Components';
import { useTheme } from '../context/ThemeContext';

export const ProfileScreen = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  const styles = getStyles(colors);

  return (
    <Screen style={{ backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <IconButton icon={Settings} onPress={() => {}} style={{ backgroundColor: isDarkMode ? colors.surface : '#F1F5F9' }} color={colors.text} size={20} />
      </View>

      <ScrollContent contentContainerStyle={{ padding: 20 }} style={{ backgroundColor: colors.background }}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: USER.avatarUrl }} style={styles.avatar} />
            <View style={styles.editIcon}>
              <Edit2 size={12} color={colors.primary} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
             <Text style={styles.name}>{USER.name}</Text>
             <Text style={styles.location}>Muscat, Oman</Text>
          </View>
        </View>

        {/* Level Card */}
        <View style={styles.levelCard}>
           <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
             <View>
               <Text style={styles.levelLabel}>Padel Level</Text>
               <Text style={styles.levelValue}>{USER.rating}</Text>
             </View>
             <View style={styles.zapIcon}>
               {/* Removed fill prop */}
               <Zap size={24} color="#FACC15" />
             </View>
           </Row>
           <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '70%' }]} />
           </View>
           <Text style={styles.levelNote}>You need 3 more wins to reach level 4.3</Text>
        </View>

        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statsGrid}>
           <StatsCard icon={Activity} label="Matches" value={USER.matchesPlayed} sub="Total games" color={colors.textSecondary} colors={colors} />
           <StatsCard icon={Trophy} label="Wins" value={USER.matchesWon} sub="Top 15%" color="#EAB308" colors={colors} />
           <StatsCard icon={TrendingUp} label="Win Rate" value={`${USER.winRate}%`} sub="Last 10 games" color="#22C55E" colors={colors} />
           <StatsCard icon={Flame} label="Streak" value="3" sub="On Fire!" color="#F97316" colors={colors} />
        </View>

        <View style={styles.menu}>
           <View style={styles.menuItem}>
              <Row>
                <View style={[styles.menuIcon, { backgroundColor: isDarkMode ? colors.background : '#F1F5F9' }]}>
                  <Moon size={18} color={colors.textSecondary} />
                </View>
                <Text style={styles.menuText}>Dark Mode</Text>
              </Row>
              <Switch value={isDarkMode} onValueChange={toggleTheme} trackColor={{false: '#E2E8F0', true: colors.primary}} />
           </View>
           {['Payment Methods', 'Notifications', 'Help & Support'].map((item, i) => (
             <TouchableOpacity key={i} style={styles.menuItem}>
                <Text style={styles.menuText}>{item}</Text>
                <ChevronRight size={18} color={colors.textSecondary} />
             </TouchableOpacity>
           ))}
        </View>

      </ScrollContent>
    </Screen>
  );
};

const StatsCard = ({ icon: Icon, label, value, sub, color, colors }: any) => (
  <View style={[styles.statsCard, { backgroundColor: colors.surface }]}>
    <Row style={{ marginBottom: 8 }}>
      <View style={[styles.statsIconBox, { backgroundColor: color + '15' }]}>
        <Icon size={16} color={color} />
      </View>
      <Text style={[styles.statsLabel, { color: colors.textSecondary }]}>{label}</Text>
    </Row>
    <Text style={[styles.statsValue, { color: colors.text }]}>{value}</Text>
    <Text style={[styles.statsSub, { color }]}>{sub}</Text>
  </View>
);

const styles = StyleSheet.create({
    statsCard: { width: '48%', borderRadius: 16, padding: 16, marginBottom: 12 },
    statsIconBox: { padding: 8, borderRadius: 8, marginRight: 8 },
    statsLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
    statsValue: { fontSize: 24, fontWeight: '900', marginBottom: 2 },
    statsSub: { fontSize: 10, fontWeight: '600' },
});

const getStyles = (colors: any) => StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 },
  headerTitle: { fontSize: 14, fontWeight: '700', color: colors.textSecondary, textTransform: 'uppercase' },
  profileCard: { backgroundColor: colors.surface, borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatarContainer: { marginRight: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: colors.background },
  editIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.surface, padding: 6, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.1, elevation: 2 },
  name: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 4 },
  location: { fontSize: 14, fontWeight: '500', color: colors.textSecondary },
  levelCard: { backgroundColor: colors.primary, borderRadius: 24, padding: 24, marginBottom: 24 },
  levelLabel: { color: '#DBEAFE', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', marginBottom: 4 },
  levelValue: { fontSize: 36, fontWeight: '900', color: '#FFF' },
  zapIcon: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 12 },
  progressTrack: { height: 8, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 4, marginVertical: 12, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#FACC15', borderRadius: 4 },
  levelNote: { color: '#DBEAFE', fontSize: 12, fontWeight: '500' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 12 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  menu: { marginBottom: 40 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, padding: 16, borderRadius: 12, marginBottom: 12 },
  menuIcon: { padding: 8, borderRadius: 50, marginRight: 12 },
  menuText: { fontSize: 16, fontWeight: '700', color: colors.text },
});