import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import toastService from "../../../services/toastService";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Nav from "../components/Nav";
import { IPlayer } from "../players/interfaces/IPlayer";
import {
  colorBtnPrimary,
  colorPrimary,
  fontBebas,
  fontPoppins,
  white,
} from "./MainScreen";

const ACCESS_TOKEN = `wO9AhZ3Ig3-aFGAJ3SEj1vtKJ6DuYhvnwDHTJfsQX5w`;
const ENVIRONMENT = `master`;
const SPACE_ID = `ojpqlra32uom`;
const endpoint = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

const PlayerDetails = () => {
  const history = useHistory();
  const state = useAppSelector((state) => state.players);
  const { userId, player } = state;
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const playersQuery = `
  {
    playersCollection(where: {id: ${userId}}) {
      items 
      {
        id
        name
        position
        photo {
          url
        }
        countryFlag {
          url
        }
      }
    }
  }`;

  useEffect(() => {
    fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: playersQuery }),
    })
      .then((res) => res.json())
      .then((response) => {
        setCurrentPlayer(response.data.playersCollection.items);
        // dispatch(setPlayer(response.data.playersCollection));
      })
      .catch((err) => {
        setLoading(false);
        toastService.error(err);
      });
  }, [userId]);

  useEffect(() => {
    userId !== 1 && userId !== 0
      ? toastService.error("Details for this player do not exist.")
      : "";
  }, [userId]);

  return (
    <div>
      <Nav />
      <Button onClick={() => history.push("/")}>Back</Button>
      {userId !== 1 && userId !== 0 ? (
        <Flex>
          <NotFoundTxt>404</NotFoundTxt>
          <PlayerNotFound>Player not found</PlayerNotFound>
        </Flex>
      ) : userId === 1 ? (
        <>
          {currentPlayer.length > 0 ? (
            currentPlayer.map((x) => (
              <Details key={x.id}>
                <CardImageWrapper>
                  <CardImage src={x.photo.url} />
                  <CardFooterImage
                    src={x.countryFlag ? x.countryFlag.url : x.photo.url}
                  />
                </CardImageWrapper>
                <CardFooter>
                  <CardFooterName>{x.name}</CardFooterName>
                  <CardFooterPosition>{x.position}</CardFooterPosition>
                </CardFooter>
              </Details>
            ))
          ) : (
            <>Empty</>
          )}
        </>
      ) : userId === 0 ? (
        <>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "80px",
                color: `${white}`,
              }}
            >
              Loading...
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const Details = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CardImage = styled.img`
  width: 207px;
  height: 207px;
  border-radius: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  border: 2px solid #fbd300;
  margin-bottom: 16px;
`;

const CardImageWrapper = styled.div`
  position: relative;
  align-self: center;
`;

const CardFooterImage = styled.img`
  width: 60px;
  height: 60px;
  bottom: 20px;
  right: 0;
  border-radius: 1000px;
  border: 1px solid ${white};
  position: absolute;
`;
const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CardFooterName = styled.div`
  font-family: ${fontBebas};
  font-size: 32px;
  color: ${white};
  font-weight: 400;
`;

const CardFooterPosition = styled.div`
  font-family: ${fontPoppins};
  font-size: 16px;
  font-weight: 400;
  color: ${white};
  opacity: 0.7;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: transparent;
  border: 2px solid #fbd300;
  border-radius: 10px;
  cursor: pointer;
  font-family: ${fontPoppins}
  font-weight: 400;
  &:hover {
      opacity: 0.7
  }
  margin-top: 80px;
  margin-bottom: 80px;
  margin-left: 165px;
  color: #fbd300;
`;

const NotFoundTxt = styled.div`
  font-family: ${fontBebas};
  font-size: 240px;
  font-weight: 400;
  color: ${white};
  opacity: 0.5;
`;

const PlayerNotFound = styled.div`
  font-family: ${fontBebas};
  font-size: 160px;
  font-weight: 400;
  color: ${white};
  opacity: 0.2;
`;

export default PlayerDetails;
