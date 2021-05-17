import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const StyledSearchBar = styled.div`
  color: inherit;
  border: 0px;
  padding: 0.4em 0.6em;
  text-align: center;
  background: #233dff;
  width: 95%;
  margin: 1em;
  display: flex;
  align-items: center;
  border-radius: 0.2em;
`;

const Input = styled.input`
  color: inherit;
  border: 1px solid white;
  padding: 0.4em 0.6em;
  text-align: center;
  background: #233dff;
  flex-grow: 5;
  border-radius: 0.2em;
  margin-right: 1em;
  &:focus {
    border: 0px !important;
    box-shadow: 0px 0px 0px 0px !important;
  }
`;

const Select = styled.select`
  font-size: 1em;
  color: inherit;
  margin-left: 1em;
  padding: 0.2em 0.4em;
  overflow: hidden;
  border-radius: 0.2em;
  background: #000211;
  border: 0px;
`;

const Option = styled.option`
  &:hover {
    background: #233dff;
  }
`;

interface SearchBarProps {
  handleSearch: (value: string) => void;
  handleSelect: (value: string) => void;
  search: string;
}

export default function SearchBar(props: SearchBarProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    props.handleSearch(e.currentTarget.value);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    props.handleSelect(e.currentTarget.value);
  };

  return (
    <StyledSearchBar>
      <Input
        type="text"
        name="search"
        id="search"
        value={props.search}
        onChange={handleInputChange}
      />
      <label htmlFor="category">Search by:</label>
      <Select name="category" id="category" onChange={handleSelectChange}>
        <Option value="title" selected>
          Title
        </Option>
        <Option value="user">Username</Option>
        <Option value="html">HTML</Option>
        <Option value="css">CSS</Option>
        <Option value="js">JS</Option>
      </Select>
    </StyledSearchBar>
  );
}
