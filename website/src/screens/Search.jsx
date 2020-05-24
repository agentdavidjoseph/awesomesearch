import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from "../components/SearchBar";
import { ReactComponent as searchIcon } from "../assets/telescope.svg";
import { ReactComponent as errorIcon } from "../assets/cancel.svg";
import SearchEngine from "../search";
import { MessageText, MessageWrapper } from "../components/ui";
import UseAnimations from "react-useanimations";
import { theme } from "../colors";
import { useInView } from "react-intersection-observer";
import ResultItem from "../components/ResultItem";
import HeaderBar from "../components/HeaderBar";


const search = new SearchEngine();

export default function Search () {
  const [error, setError] = useState(null);
  const [result, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView === true) {
      if (search.isNextPage()) {
        search.nextPage().then(res => setResults([...result, ...res]));
      }
    }
  }, [inView]);

  function getResults () {
    return result || [];
  }

  async function fetchResults (query) {
    try {
      setLoading(true);
      setResults(await search.run(query));
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  }

  return (
    <Container>
      <HeaderBar>
        <SearchBar
          results={getResults().length}
          placeholder={"Enter search term..."}
          onChange={query => fetchResults(query)}
        />
      </HeaderBar>
      <Body>
        {loading && (
          <MessageWrapper>
            {/* https://www.davidhu.io/react-spinners/ */}
            <UseAnimations
              animationKey="loading2"
              size={60}
              style={{ padding: 100, color: theme.primary }}
            />
          </MessageWrapper>
        )}
        {error && (
          <MessageWrapper>
            <ErrorLogo/>
            <MessageText>{error.message}</MessageText>
          </MessageWrapper>
        )}
        {(!loading && !error && getResults().length === 0) && (
          <MessageWrapper>
            <SearchIcon/>
            <MessageText>Wow such empty!</MessageText>
            <MessageText>Search the largest collection of awesome resources.</MessageText>
          </MessageWrapper>
        )}
        {!loading && getResults().map((r, i) => (
          <ResultItem
            key={i}
            innerRef={i === getResults().length - 5 ? ref : null}
            type={r.object_type}
            screenshot={r.screenshot_url}
            url={r.url}
            image={r.image_url}
            title={r.title}
            tags={r.tags}
            topics={r.topics}
            description={r.description}
            styles={i === 0 ? 'margin-top: 50px !important;' : ''}
          />
        ))}
      </Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 20px;
  width: 100vw;
  position: fixed;
  bottom: 0;
  top: 7vh;
  overflow-y: scroll;
  justify-content: center;
  @media (max-width: 500px) {
    top: 10vh;
  }
`;

const SearchIcon = styled(searchIcon)`
  height: 13rem;
  width: 13rem;
  display: inline-block;
  opacity: 0.7;
  margin: 0 auto 20px;
  @media (max-width: 500px) {
    height: 6rem;
    width: 6rem;
  }
`;

const ErrorLogo = styled(errorIcon)`
  height: 10rem;
  width: 10rem;
  display: inline-block;
  opacity: 0.7;
  margin: 0 auto 20px;
`;
