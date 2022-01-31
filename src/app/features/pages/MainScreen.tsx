import { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import toastService from "../../../services/toastService";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Nav from "../components/Nav";
import { SortDirection } from "../lookups/sortDirection";
import { IPlayer } from "../players/interfaces/IPlayer";
import {
  setPlayers,
  setUserId,
  resetUserId,
} from "../players/slices/playerSlice";

const ACCESS_TOKEN = `wO9AhZ3Ig3-aFGAJ3SEj1vtKJ6DuYhvnwDHTJfsQX5w`;
const ENVIRONMENT = `master`;
const SPACE_ID = `ojpqlra32uom`;
const endpoint = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

// colors
export const colorPrimary = "#496BF0";
export const white = "#ffffff";
export const black = "#000000";
export const colorSuccess = "#9A58A9";
export const colorError = "#ED4337";

const MainScreen = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.players);
  const { items, userId } = state;
  const [filter, setFilter] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [sorter, setSorter] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const playersQuery = `
  {
    playersCollection(limit: ${limit}, order: ${sorter}) {
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

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filterByName = (value: any) => {
    if (filter === "") {
      return value;
    } else if (value.name.toLowerCase().includes(filter)) {
      return value;
    }
  };

  const handleShowMore = (more: number) => {
    if (limit >= 10) {
      setLimit(limit + more);
    }
  };

  const handleShowLess = (less: number) => {
    if (limit > 10) {
      setLimit(limit - less);
    }
  };

  const handleSelectSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSorter(e.target.value);
  };

  const goToPlayerDetails = (userId: number) => {
    dispatch(setUserId(userId));
    history.push(`${userId}`);
  };

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
        setLoading(true);
        dispatch(setPlayers(response.data.playersCollection.items));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastService.error(err);
      });

    dispatch(setUserId(0));
  }, [limit, sorter]);

  return (
    <>
      <Nav userId={userId} />
      <Main>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {userId === 0 ? (
            <>
              <div style={{ marginRight: "4px", color: `${white}` }}>
                Sort by:
              </div>
              <InputSelect
                placeholder="Sort by"
                onChange={(e) =>
                  handleSelectSort ? handleSelectSort(e) : null
                }
              >
                <option value={`${SortDirection.None}`}>None</option>
                <option value={`${SortDirection.Asc}`}>A-Z</option>
                <option value={`${SortDirection.Desc}`}>Z-A</option>
              </InputSelect>
              <Field>
                <Input
                  type="text"
                  placeholder="Search player"
                  onChange={handleFilter}
                  value={filter}
                />
                <InputIcon
                  className="fas fa-times"
                  onClick={() => setFilter("")}
                ></InputIcon>
              </Field>
            </>
          ) : (
            <></>
          )}
        </div>
        <Flex>
          <Content>
            {items.filter(filterByName).map((x: IPlayer) => (
              <Card onClick={() => goToPlayerDetails(x.id)} key={x.id}>
                <CardImage src={x.photo.url} />
                <CardFooter>
                  <CardFooterImage src={x.photo.url} />
                  <CardFooterPlayer>
                    <CardFooterName>{x.name}</CardFooterName>
                    <CardFooterPosition>{x.position}</CardFooterPosition>
                  </CardFooterPlayer>
                </CardFooter>
              </Card>
            ))}
          </Content>
          {filter.length > 0 ? (
            <></>
          ) : (
            // inline styling for utils reason because not all FlexRows will have the same margin
            <FlexRow style={{ marginTop: "16px" }}>
              <Button onClick={() => handleShowMore(6)}>Show More</Button>
              {limit > 10 ? (
                <ButtonLess onClick={() => handleShowLess(6)}>
                  Show Less
                </ButtonLess>
              ) : (
                <></>
              )}
            </FlexRow>
          )}
        </Flex>
      </Main>
    </>
  );
};

const Content = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
`;

const Card = styled.section`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 250px;
  &:hover {
    opacity: 0.5;
  }
`;

const CardImage = styled.img`
  background-color: #b4c0d4;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  object-fit: contain;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  background-color: #7285a3;
  padding: 16px;
`;

const CardFooterImage = styled.img`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 1000px;
  object-fit: cover;
`;

const CardFooterPlayer = styled.div`
  margin-left: 16px;
`;

const CardFooterName = styled.div`
  font-weight: 700;
  margin-bottom: 8px;
`;

const CardFooterPosition = styled.div`
  font-weight: 400;
  opacity: 0.5;
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

const ButtonLess = styled.button`
  padding: 8px 24px;
  background-color: ${colorPrimary};
  color: ${white};
  font-weight: 700;
  align-self: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 16px;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: center;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.div`
  padding: 40px;
`;

const Field = styled.div`
  position: relative;
  margin-right: 24px;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid grey;
  border-radius: 4px;
  transition: all 100ms ease-out;
  padding: 6px 8px;
  &:focus {
    outline: none;
  }
`;

const InputSelect = styled.select`
  width: 100px;
  border: 1px solid grey;
  border-radius: 4px;
  transition: all 100ms ease-out;
  padding: 6px 8px;
  margin-right: 8px;
  &:focus {
    outline: none;
  }
`;

const InputIcon = styled.i`
  cursor: pointer;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
`;

export default MainScreen;
