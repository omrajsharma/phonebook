import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: #1976d2;

  &:hover,
  &:focus {
    color: #9c27b0;
  }
`;
