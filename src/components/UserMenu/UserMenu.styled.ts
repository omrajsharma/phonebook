import styled from '@emotion/styled';

import { NavLink } from 'react-router-dom';

export const StyledButton = styled.button`
  color: #fff;
  background-color: transparent;
  border: none;
  padding: 2px 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  :hover:not(.active),
  :focus-visible:not(.active) {
    color: #3f50b5;
    background-color: #fff;
  }

  &.active {
    color: #3f50b5;
    background-color: #fff;
  }
`;

export const StyledNavLink = styled(NavLink)`
  color: #fff;
  background-color: transparent;
  border: none;
  padding: 2px 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  text-decoration: none;

  :hover:not(.active),
  :focus-visible:not(.active) {
    color: #3f50b5;
    background-color: #fff;
  }

  &.active {
    color: #3f50b5;
    background-color: #fff;
  }
`;
