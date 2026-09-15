import styled from "styled-components/native";
import { profiles } from "../data/profiles";

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

const StyledScreen = () => {
  return (
    <Container>
      {profiles.map((profile) => (
        <Card key={profile.id}>
          <Avatar source={profile.avatar} />
          <Info>
            <Name>{profile.name}</Name>
            <Job>{profile.job}</Job>
          </Info>
        </Card>
      ))}
    </Container>
  );
};

export default StyledScreen;
