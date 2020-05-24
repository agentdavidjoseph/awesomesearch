import React, {useState} from 'react';
import styled from "styled-components";
import UseAnimations from "react-useanimations";


export default function SearchBar ({ results, onChange, placeholder }) {
    const [isFocused, setFocused] = useState(false);

  return (
    <Container>
      <SearchIcon
        isFocused={isFocused}
        animationKey="searchToX"
        size={50}
      />
      <Input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        type="text"
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  transition: all ease 0.5s;
  width: 100%;
  padding: 13px;
  @media (max-width: 700px) {
    width: 80%;
  }
`;

const Input = styled.input`
  display: flex;
  outline: none;
  border: none;
  padding: 0 10px;
  font-size: 16px;
  flex: 10;
  background: transparent;
  border-radius: 10px;
  color: ${props => props.theme.primary};
  ::placeholder {
    color: ${props => props.theme.lightText};
  }
  font-family: 'Libre Franklin', sans-serif;
`;

const SearchIcon = styled(UseAnimations)`
  height: 1.5rem;
  display: inline-block;
  margin: auto 0;
  color: ${props => props.isFocused ? props.theme.secondary : props.theme.primary};
  pointer-events: none;
`;
