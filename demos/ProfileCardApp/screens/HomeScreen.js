import { ScrollView, StyleSheet } from "react-native";
import ProfileCard from "../components/ProfileCard";
import { useEffect, useState } from "react";

const HomeScreen = ({ navigation }) => {
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = () => {
    fetch("http://192.168.101.106:3000/profiles")
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          {...profile}
          onPress={() =>
            navigation.navigate("ProfileDetail", { id: profile.id })
          }
        />
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
