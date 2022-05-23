import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { StyledInput } from '../Styles';
import { StyledBaseButton } from '../../../styles/Button';

interface IFormSearch {
  onChange: (value: string) => void;
}

export const FormSearch: React.FC<IFormSearch> = ({ onChange }) => (
  <StyledInputGroup>
    <StyledFormSearch
      type="search"
      onChange={e => onChange(e.target.value.toLowerCase())}
      placeholder="Search"
    />
    <StyledInputGroupPrepend>
      <StyledButtonSearch type="button">
        <FontAwesomeIcon icon={faSearch} />
      </StyledButtonSearch>
    </StyledInputGroupPrepend>
  </StyledInputGroup>
);

const StyledInputGroup = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  & > input {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
    margin-bottom: 0;
  }
`;

const StyledInputGroupPrepend = styled.span`
  margin-right: -1px;
  display: flex;
`;

const StyledButtonSearch = styled(StyledBaseButton)`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.primary};
  &:focus {
    box-shadow: none;
  }
`;

const StyledFormSearch = styled(StyledInput)`
  border-radius: 0;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  height: calc(1.8em + 0.75rem + 10px);
  padding-left: 0.75rem;

  &:focus {
    border-color: ${props => props.theme.colors.border};
  }
`;
