import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: '#ff6b6b', 
          tabBarInactiveTintColor: '#b0b0b0', 
          tabBarItemStyle: styles.tabItem,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ title: 'Inicio', headerShown: false }}
        />
        <Tabs.Screen
          name="Categorias"
          options={{ title: 'Categorías', headerShown: false }}
        />
        <Tabs.Screen
          name="FakeList"
          options={{ title: 'Productos', headerShown: false }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2d', 
  },
  tabBar: {
    backgroundColor: '#25253a',
    borderTopWidth: 1,
    borderTopColor: '#3a3a5a',
    height: 70, 
    paddingBottom: 15, 
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5, 
  },
  tabItem: {
    paddingTop: 5, 
  },
});
