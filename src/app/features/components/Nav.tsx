import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks";
import {
  colorBtnPrimary,
  colorPrimary,
  fontBebas,
  fontPoppins,
  white,
} from "../pages/MainScreen";
import { setUserId } from "../players/slices/playerSlice";
import logoImg from "../../../assets/images/logo.png";

interface IProps {
  userId?: number;
}

const Nav: React.FC<IProps> = (props) => {
  let { userId } = props;
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <Navigation>
      <img src={logoImg} alt="logo" />
      <NavLink onClick={() => (userId !== 0 ? history.push("/") : null)}>
        Home
      </NavLink>
      <Button
        disabled={userId === 0 ? false : true}
        onClick={() => history.push("/addnew")}
      >
        Add player
      </Button>
    </Navigation>
  );
};

const Navigation = styled.nav`
  padding: 8px 165px;
  background-color: ${colorPrimary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled.div`
  color: ${white};
  font-weight: 400;
  font-size: 24px;
  font-family: ${fontBebas};
  cursor: pointer;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: ${colorBtnPrimary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: ${fontPoppins}
  font-weight: 400;
  &:hover {
      opacity: 0.7
  };
`;

export default Nav;
