import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from './components/Input';
import { RepoItem } from './RepoItem';
import { TextButton } from './components/TextButton';
import { sliceKey, reducer, actions } from './slice';
import { nestJsConnectorSaga } from './saga';
import {
  selectUsername,
  selectUser,
  selectLoading,
  selectError,
} from './selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { RepoErrorType } from './types';

export function NestJsConnector() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: nestJsConnectorSaga });

  const username = useSelector(selectUsername);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const onChangeUsername = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.changeUsername(evt.currentTarget.value));
    dispatch(actions.loadRepos());
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    // When initial state username is not null, submit the form to load user
    if (username && username.trim().length > 0) {
      dispatch(actions.loadRepos());
    }
  });

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
  };

  return (
    <Wrapper>
      <FormGroup onSubmit={onSubmitForm}>
        <FormLabel>User ID</FormLabel>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Type any user ID"
            value={username}
            onChange={onChangeUsername}
          />
          {isLoading && <LoadingIndicator small />}
        </InputWrapper>
      </FormGroup>
      {user?.firstName ? (
        <List>
          <RepoItem key={user.id} name={user.firstName} />
        </List>
      ) : error ? (
        <ErrorText>{repoErrorText(error)}</ErrorText>
      ) : null}
    </Wrapper>
  );
}

export const repoErrorText = (error: RepoErrorType) => {
  switch (error) {
    case RepoErrorType.USER_NOT_FOUND:
      return 'There is no such user 😞';
    case RepoErrorType.USERNAME_EMPTY:
      return 'Type any user ID';
    case RepoErrorType.USER_HAS_NO_REPO:
      return 'User does not exist';
    default:
      return 'An error has occurred!';
  }
};

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Input} {
    width: ${100 / 3}%;
    margin-right: 0.5rem;
  }
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;

const List = styled.div``;
