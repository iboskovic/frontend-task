import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import toastService from "../../../services/toastService";
import { useAppDispatch, useAppSelector } from "../../hooks";
import IParams from "../interfaces/IParams";
import { IPlayer } from "../players/interfaces/IPlayer";
import { setPlayer } from "../players/slices/playerSlice";

const ACCESS_TOKEN = `wO9AhZ3Ig3-aFGAJ3SEj1vtKJ6DuYhvnwDHTJfsQX5w`;
const ENVIRONMENT = `master`;
const SPACE_ID = `ojpqlra32uom`;
const endpoint = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

const PlayerDetails = () => {
  const dispatch = useAppDispatch();
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

  return (
    <div>
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

export default PlayerDetails;
