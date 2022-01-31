import { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import toastService from "../../../services/toastService";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { persistor } from "../../store";
import Nav from "../components/Nav";
import { SortDirection } from "../lookups/sortDirection";
import { IPlayer } from "../players/interfaces/IPlayer";
import { setPlayers, setUserId } from "../players/slices/playerSlice";

const ACCESS_TOKEN = `wO9AhZ3Ig3-aFGAJ3SEj1vtKJ6DuYhvnwDHTJfsQX5w`;
const ENVIRONMENT = `master`;
const SPACE_ID = `ojpqlra32uom`;
const endpoint = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

// colors
export const colorPrimary = "#222836";
export const colorSecondary = "#131A24";

export const white = "#ffffff";
export const black = "#000000";

export const colorSuccess = "#9A58A9";
export const colorError = "#ED4337";

export const colorBtnPrimary =
  "linear-gradient(263.44deg, #FBD300 0%, #ED8812 99.35%);";

export const fontBebas = "'Bebas Neue', cursive;";
export const fontPoppins = "'Poppins', sans-serif;";

const MainScreen = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.players);
  const { items, userId } = state;
  const player = useAppSelector((state) => state.addPlayer);
  const [filter, setFilter] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [sorter, setSorter] = useState<any>(null);
  const [sortBy, setSortBy] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  console.log(sorter);

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
        countryFlag {
          url
        }
      }
    }
  }`;

  const toggleSort = () => {
    const val =
      sorter === SortDirection.None || sorter === SortDirection.Desc
        ? SortDirection.Asc
        : SortDirection.Desc;
    setSorter(val);
    setSortBy(val);
  };

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

  console.log("Created player: ", player);

  return (
    <>
      <Nav userId={userId} />
      <Main>
        <TitlePrimary style={{ marginBottom: "64px" }}>
          Featured players
        </TitlePrimary>

        <Flex>
          <Util>
            <div style={{ flexGrow: 1 }}></div>
            <Sort onClick={() => toggleSort()}>
              <SortTxt>Sort by:</SortTxt>
              <Icon className="fas fa-sort-amount-up"></Icon>
            </Sort>
            <Sort onClick={() => setSorter(SortDirection.None)}>
              <SortReset>Reset sort</SortReset>
            </Sort>
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
          </Util>
          <Content>
            {items.filter(filterByName).map((x: IPlayer) => (
              <Card onClick={() => goToPlayerDetails(x.id)} key={x.id}>
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
              </Card>
            ))}
          </Content>
          {filter.length > 0 ? (
            <></>
          ) : (
            // inline styling for utils reason because not all FlexRows will have the same margin
            <FlexRow style={{ marginTop: "80px" }}>
              <Button
                onClick={() => handleShowMore(6)}
                disabled={limit > items.length ? true : false}
              >
                Show More
              </Button>
              {limit > 10 ? (
                <Button
                  style={{ marginLeft: "16px" }}
                  onClick={() => handleShowLess(6)}
                >
                  Show Less
                </Button>
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 24px;
`;

const Card = styled.section`
  background-color: ${colorPrimary};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 24px;
  &:hover {
    opacity: 0.5;
  }
`;

const TitlePrimary = styled.div`
  font-family: ${fontBebas};
  font-size: 80px;
  font-weight: 400;
  color: ${white};
  text-align: center;
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
  background: ${colorBtnPrimary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: ${fontPoppins}
  font-weight: 400;
  &:hover {
      opacity: 0.7
  }
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
  background-color: ${colorSecondary};
  padding: 80px;
`;

const Field = styled.div`
  position: relative;
  margin-right: 24px;
`;

const Input = styled.input`
  background-color: ${colorPrimary};
  color: ${white};
  border: none;
  width: 100%;
  border-radius: 10px;
  padding: 12px 16px;
  font-family: ${fontPoppins};
  font-size: 16px;
  font-weight: 400;
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
  color: ${white};
`;

const Icon = styled.i`
  color: ${white};
  cursor: pointer;
`;

const Util = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const Sort = styled.div`
  background-color: ${colorPrimary};
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  margin-right: 40px;
`;

const SortTxt = styled.div`
  color: ${white};
  font-family: ${fontPoppins};
  margin-right: 16px;
  font-weight: 400;
  font-size: 16px;
`;

const SortReset = styled.div`
  color: ${white};
  font-family: ${fontPoppins};
  font-weight: 400;
  font-size: 16px;
`;

export default MainScreen;
