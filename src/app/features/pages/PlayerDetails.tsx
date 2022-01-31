import { useEffect, useState } from "react";
import styled from "styled-components";
import toastService from "../../../services/toastService";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Nav from "../components/Nav";
import { IPlayer } from "../players/interfaces/IPlayer";

const ACCESS_TOKEN = `wO9AhZ3Ig3-aFGAJ3SEj1vtKJ6DuYhvnwDHTJfsQX5w`;
const ENVIRONMENT = `master`;
const SPACE_ID = `ojpqlra32uom`;
const endpoint = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

const PlayerDetails = () => {
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
      {userId !== 1 && userId !== 0 ? (
        <Flex style={{ marginTop: "150px" }}>
          Sorry the details for your selected player do not exist. Try selecting
          Danil Ishutin.
        </Flex>
      ) : userId === 1 ? (
        <>
          {currentPlayer.length > 0 ? (
            currentPlayer.map((x) => (
              <Details key={x.id}>
                <DetailsImage src={x.photo.url} />
                <DetailsName>{x.name}</DetailsName>
                <DetailsPosition>{x.position}</DetailsPosition>
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
  padding: 40px;
`;

const DetailsImage = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 16px;
`;

const DetailsName = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
`;

const DetailsPosition = styled.div`
  font-size: 18px;
  opacity: 0.5;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default PlayerDetails;
