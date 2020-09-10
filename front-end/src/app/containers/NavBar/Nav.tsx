import React from 'react';
import styled from 'styled-components/macro';

import { ReactComponent as DocumentationIcon } from './assets/documentation-icon.svg';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';

import { sliceKey, reducer, actions } from '../Login/slice';
import { loginSaga } from '../Login/saga';
import { selectIsLoggedIn } from '../Login/selectors';
import { LoggedInNavigation } from './LoggedInNavigagtion';
import { LoggedOutNavigation } from './LoggedOutNavigation';
import { ItemLink } from './ItemLink';

export function Nav() {
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: loginSaga });
  const dispatch = useDispatch();

  // const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const logoutUser = () => dispatch(actions.logoutUser());

  return (
    <Wrapper>
      <ItemLink to="/">
        <DocumentationIcon />
        Home Page
      </ItemLink>
      {isLoggedIn && <LoggedInNavigation logoutUser={logoutUser} />}
      {!isLoggedIn && <LoggedOutNavigation />}
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;
