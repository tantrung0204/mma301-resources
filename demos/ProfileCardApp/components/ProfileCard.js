import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const ProfileCard = ({ name, job, avatar, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
          width={60}
          height={60}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.job}>{job}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  job: {
    fontSize: 14,
    color: "gray",
  },
});

export default ProfileCard;
