import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { UserItem } from './UserItem';
import { sliceKey, reducer, actions } from './slice';
import { signupSaga } from './saga';
import {
  selectUserEmail,
  selectUser,
  selectLoading,
  selectError,
  selectIsLoggedIn,
} from './selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { UserErrorType } from './types';

export function Signup() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: signupSaga });

  const userEmail = useSelector(selectUserEmail);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const onChangeUserEmail = values => {
    const { userEmail, password, passwordConfirm } = values;
    dispatch(actions.changeUserEmail(userEmail));
    dispatch(actions.changePassword(password));
    dispatch(actions.changePasswordConfirm(passwordConfirm));
    dispatch(actions.signupUser());
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
    <>
      {isLoggedIn && <h1> You're logged in</h1>}
      {!isLoggedIn && (
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onChangeUserEmail}
        >
          <Form.Item
            name="userEmail"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              size="large"
              disabled={isLoading}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
              disabled={isLoading}
            />
          </Form.Item>
          <Form.Item
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: 'Please input your Password Confirmation!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password Confirm"
              size="large"
              disabled={isLoading}
            />
          </Form.Item>
          <Form.Item>
            <Link to="/login">Have an account? Log in!</Link>
          </Form.Item>

          <Form.Item>
            {!isLoading && (
              <LoginFormButton
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
              >
                Sign up
              </LoginFormButton>
            )}
            {isLoading && <LoadingIndicator small />}
          </Form.Item>
        </Form>
      )}
      {user?.userEmail ? (
        <List>
          <UserItem key={user.uid} name={user.userEmail} />
        </List>
      ) : error ? (
        <ErrorText>{userErrorText(error)}</ErrorText>
      ) : null}
    </>
  );
}

export const userErrorText = (error: UserErrorType) => {
  switch (error) {
    case UserErrorType.USER_NOT_FOUND:
      return 'There is no such user 😞';
    case UserErrorType.PASSWORDS_DO_NOT_MATCH:
      return 'Passwords do not match. Please try again.';
    case UserErrorType.USER_HAS_NO_USER:
      return 'User does not exist';
    default:
      return 'An error has occurred!';
  }
};

const LoginFormButton = styled(Button)`
  width: 100%;
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const List = styled.div``;
