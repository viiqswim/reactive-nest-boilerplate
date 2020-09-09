import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { UserItem } from './UserItem';
import { TextButton } from './components/TextButton';
import { sliceKey, reducer, actions } from './slice';
import { logInSignUpSaga } from './saga';
import {
  selectUserEmail,
  selectUser,
  selectLoading,
  selectError,
  selectIsLoggedIn,
} from './selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { UserErrorType } from './types';

export function LogInSignUp() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: logInSignUpSaga });

  const userEmail = useSelector(selectUserEmail);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const onChangeUserEmail = values => {
    const { userEmail, password } = values;
    dispatch(actions.changeUserEmail(userEmail));
    dispatch(actions.changePassword(password));
    dispatch(actions.loadUser());
    if (userEmail === 'v.dozal@live.com') {
      dispatch(actions.loginUser());
    }
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    // When initial state userEmail is not null, submit the form to load user
    if (userEmail) {
      dispatch(actions.loadUser());
    }
  });

  return (
    <Wrapper>
      {isLoggedIn && <h1> You're logged in</h1>}
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onChangeUserEmail}
      >
        <Form.Item
          label="User Email"
          name="userEmail"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          {!isLoading && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
          {isLoading && <LoadingIndicator small />}
        </Form.Item>
      </Form>
      {user?.userEmail ? (
        <List>
          <UserItem key={user.uid} name={user.userEmail} />
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

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const List = styled.div``;
