import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from './components/Input';
import { UserItem } from './UserItem';
import { TextButton } from './components/TextButton';
import { sliceKey, reducer, actions } from './slice';
import { nestJsConnectorSaga } from './saga';
import {
  selectUserId,
  selectUser,
  selectLoading,
  selectError,
} from './selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { UserErrorType } from './types';

export function LogInSignUp() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: nestJsConnectorSaga });

  const userId = useSelector(selectUserId);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const onChangeUserId = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const userId = Number(evt.currentTarget.value);
    dispatch(actions.changeUserId(userId));
    dispatch(actions.loadUser());
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    // When initial state userId is not null, submit the form to load user
    if (userId) {
      dispatch(actions.loadUser());
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
            value={userId}
            onChange={onChangeUserId}
          />
          {isLoading && <LoadingIndicator small />}
        </InputWrapper>
      </FormGroup>
      {user?.firstName ? (
        <List>
          <UserItem key={user.id} name={user.firstName} />
        </List>
      ) : error ? (
        <ErrorText>{userErrorText(error)}</ErrorText>
      ) : null}
    </Wrapper>
  );
}

export const userErrorText = (error: UserErrorType) => {
  switch (error) {
    case UserErrorType.USER_NOT_FOUND:
      return 'There is no such user 😞';
    case UserErrorType.USER_ID_EMPTY:
      return 'Type any user ID';
    case UserErrorType.USER_HAS_NO_USER:
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
