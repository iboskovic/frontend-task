import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks";
import { colorPrimary, white } from "../pages/MainScreen";
import { setUserId } from "../players/slices/playerSlice";

interface IProps {
  userId?: number;
}

const Nav: React.FC<IProps> = (props) => {
  let { userId } = props;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleResetPlayer = () => {
    dispatch(setUserId(0));
  };

  return (
    <Navigation>
      {userId === 0 ? (
        <TextPrimary>Home</TextPrimary>
      ) : (
        <TextPrimary
          onClick={() => {
            handleResetPlayer;
            history.push("/");
          }}
          style={{ cursor: "pointer" }}
        >
          Back
        </TextPrimary>
      )}
      <Button
        disabled={userId === 0 ? false : true}
        onClick={() => history.push("/addnew")}
      >
        Add player{" "}
        <Icon className="fas fa-plus" style={{ color: "white" }}></Icon>
      </Button>
    </Navigation>
  );
};

const Navigation = styled.nav`
  background-color: ${colorPrimary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 45px;
`;

const TextPrimary = styled.div`
  color: ${white};
`;

const Icon = styled.i`
  cursor: pointer;
  vertical-align: middle;
`;

const Button = styled.button`
  padding: 8px 24px;
  background-color: ${colorPrimary};
  color: ${white};
  font-weight: 700;
  align-self: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default Nav;
