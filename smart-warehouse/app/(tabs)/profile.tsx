import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/authContext';
import { router } from 'expo-router';
import Header from '@/components/ui/header';


export default function ProfileScreen() {


    const {user} = useAuth()
    
    const { logout } = useAuth()

    const signout = async ()=>{

        await logout()
    }

       
  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>

        <Header title={'profile'} route={`/`}></Header>

        <View style={styles.profileSection}>
          <Image 
            source={{uri: user?.image}}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userRole}>Warehouse Manager</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.profileStat}>
              <Text style={styles.statNumber}>2.5k</Text>
              <Text style={styles.statLabel}>Items Managed</Text>
            </View>
            <View style={styles.profileStat}>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
            <View style={styles.profileStat}>
              <Text style={styles.statNumber}>5y</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
          </View>
        </View>


        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingItem}>
            <MaterialCommunityIcons name="cog" size={24} color="#4CAF50" />
            <Text style={styles.settingText}>General Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <MaterialCommunityIcons name="shield-lock" size={24} color="#2196F3" />
            <Text style={styles.settingText}>Security</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <MaterialCommunityIcons name="bell" size={24} color="#FF9800" />
            <Text style={styles.settingText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>


        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>City</Text>
            <Text style={styles.infoValue}>{user?.city}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Date Of Birth</Text>
            <Text style={styles.infoValue}>{user?.dob}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Joined Date</Text>
            <Text style={styles.infoValue}>{user?.joindDate}</Text>
          </View>
        </View>


        <TouchableOpacity style={styles.logoutButton} onPress={signout}>
          <MaterialCommunityIcons name="logout" size={24} color="#F44336" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  scrollContainer: {
    padding: 20,
    
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userRole: {
    color: '#888',
    fontSize: 16,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  profileStat: {
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
    padding: 15,
    borderRadius: 15,
    width: '30%',
  },
  statNumber: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  settingsContainer: {
    backgroundColor: '#2D2D2D',
    borderRadius: 15,
    padding: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingText: {
    color: '#fff',
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: '#2D2D2D',
    borderRadius: 15,
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoLabel: {
    color: '#888',
    fontSize: 14,
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D2D2D',
    padding: 15,
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 20,
  },
  logoutText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});