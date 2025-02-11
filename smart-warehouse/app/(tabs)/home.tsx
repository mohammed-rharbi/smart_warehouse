import { StyleSheet, Text, View, ScrollView, TouchableOpacity , SafeAreaView} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/context/authContext';

export default function HomeScreen() {


    const {user} = useAuth()

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome Back {user?.name}</Text>
            <Text style={styles.subGreeting}>Warehouse Dashboard</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications" size={24} color="#fff" />
          </TouchableOpacity>
        </View>


        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.card1]}>
            <MaterialCommunityIcons name="package-variant" size={32} color="#fff" />
            <Text style={styles.statValue}>2,345</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>
          
          <View style={[styles.statCard, styles.card2]}>
            <MaterialCommunityIcons name="alert-octagon" size={32} color="#fff" />
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Low Stock</Text>
          </View>
        </View>


        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="plus-box" size={32} color="#4CAF50" />
            <Text style={styles.actionText}>Add Item</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="package" size={32} color="#2196F3" />
            <Text style={styles.actionText}>Manage Products</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="chart-bar" size={32} color="#FF9800" />
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="barcode-scan" size={32} color="#9C27B0" />
            <Text style={styles.actionText}>Scan Item</Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <MaterialCommunityIcons name="package-variant-closed" size={20} color="#fff" />
              </View>
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>Item #00{item} Updated</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="light" />
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
    marginTop:30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subGreeting: {
    color: '#888',
    fontSize: 16,
  },
  notificationBtn: {
    backgroundColor: '#2D2D2D',
    padding: 12,
    borderRadius: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    width: '48%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  card1: {
    backgroundColor: '#4CAF50',
  },
  card2: {
    backgroundColor: '#F44336',
  },
  statValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statLabel: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#2D2D2D',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  actionText: {
    color: '#fff',
    marginTop: 10,
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: '#2D2D2D',
    borderRadius: 20,
    padding: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityIcon: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    color: '#fff',
    fontSize: 16,
  },
  activityTime: {
    color: '#888',
    fontSize: 12,
  },
});