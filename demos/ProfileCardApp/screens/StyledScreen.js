import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  padding: 20px;
  background-color: #e6f0ff;
`;

const Card = styled.View`
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 16px;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 16px;
`;

const Info = styled.View``;

const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Job = styled.Text`
  font-size: 14px;
  color: gray;
`;

const StyledScreen = ({ navigation }) => {
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
    <Container>
      {profiles.map((profile) => (
        <Pressable
          onPress={() =>
            navigation.navigate("HomeTab", {
              screen: "ProfileDetail",
              params: { id: profile.id },
            })
          }
        >
          <Card key={profile.id}>
            <Avatar source={{ uri: profile.avatar }} width={60} height={60} />
            <Info>
              <Name>{profile.name}</Name>
              <Job>{profile.job}</Job>
            </Info>
          </Card>
        </Pressable>
      ))}
    </Container>
  );
};

export default StyledScreen;
