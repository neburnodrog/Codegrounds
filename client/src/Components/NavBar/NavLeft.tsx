import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Plus, Home } from '@styled-icons/fa-solid';
import { WrapperButton } from '../StyledComponents/IconsButtons';

const Logo = styled.img`
  height: 2em;
  margin-left: 2em;
  margin-right: 1.5em;
  border-radius: 50%;
`;

const NavList = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  width: 33vw;
`;

const IconWrapper = styled(WrapperButton)`
  margin: 0em 1.5em;
  padding: 0.3em;
  border-radius: 50%;
  &:hover {
    box-shadow: 0px 0px 0.3em 0.3em #233dff;
  }
  transition: box-shadow 1s;
`;

export default function NavLeft() {
  return (
    <NavList>
      <Logo
        src="https://res.cloudinary.com/doh6rpdke/image/upload/v1620936255/code-ground/assets/Untitled_design_qhrefh.png"
        alt="logo"
      />
      <Link to="/">
        <IconWrapper>
          <Home size={'1.4rem'} />
        </IconWrapper>
      </Link>
      <Link to="/code-ground">
        <IconWrapper>
          <Plus size={'1.4rem'} />
        </IconWrapper>
      </Link>
    </NavList>
  );
}
