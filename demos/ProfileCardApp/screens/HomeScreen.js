import { ScrollView, StyleSheet } from "react-native";
import { profiles } from "../data/profiles";
import ProfileCard from "../components/ProfileCard";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} {...profile} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    flex: 1,
  },
});

export default HomeScreen;
