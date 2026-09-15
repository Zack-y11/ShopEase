import { Feather } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useDrawer } from '@/admin/viewmodels/use-drawer';

export function DrawerMenu() {
  const { profile, navigationOptions, handleNavigate, handleLogout, isActiveRoute } = useDrawer();

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.header}>
        <View style={styles.headerInfoUser}>
          <Image style={styles.avatar} source={{ uri: profile.avatarUrl }} />

          <View style={styles.headerInfo}>
            <Text style={styles.adminName}>{profile.name}</Text>
            <Text style={styles.adminRole}>{profile.role}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.versionTag}>{profile.version}</Text>
        </View>
      </View>

      <View style={styles.menuList}>
        {navigationOptions.map((option) => {
          const isSelected = isActiveRoute(option.name);

          return (
            <TouchableOpacity
              key={option.name}
              style={[styles.menuItemList, isSelected && styles.menuItemSelected]}
              onPress={() => handleNavigate(option.name)}>
              <Feather
                name={option.icon as keyof typeof Feather.glyphMap}
                size={20}
                color={isSelected ? '#FFF' : '#374151'}
                style={styles.menuIcon}
              />
              <Text style={[styles.menuText, isSelected && styles.menuTextSelected]}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={20} color="#EF4444" style={styles.menuIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    padding: 24,
    borderWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'flex-start',
  },
  headerInfoUser: {
    flexDirection: 'row',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },
  headerInfo: {
    marginLeft: 15,
    marginTop: 5,
  },
  adminName: {
    fontSize: 20,
    color: '#006C47',
    fontWeight: 'bold',
  },
  adminRole: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  versionTag: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 8,
    borderColor: '#D1D5D8',
    borderRadius: 12,
  },
  menuList: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  menuItemList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginVertical: 4,
  },
  menuItemSelected: {
    backgroundColor: '#00B074',
    borderRadius: 8,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#374151',
  },
  menuTextSelected: {
    color: '#FFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginBottom: 15,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#EF4444',
  },
});
