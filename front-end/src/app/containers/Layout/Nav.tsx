import React, { useState } from 'react';
import { Link } from 'app/components/Link';
import { Layout, Menu } from 'antd';
import { VideoCameraOutlined, UserOutlined } from '@ant-design/icons';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';

import { sliceKey, reducer, actions } from '../Login/slice';
import { loginSaga } from '../Login/saga';
import { selectIsLoggedIn } from '../Login/selectors';

const { Sider } = Layout;

export function Nav({ collapsed, location }) {
  const [selectedPage, setSelectedPage] = useState('home');
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: loginSaga });
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const logoutUser = () => dispatch(actions.logoutUser());

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedPage]}>
        {/**
         * Logged in navigation
         */}
        {isLoggedIn && (
          <Menu.Item
            key="home"
            icon={<VideoCameraOutlined />}
            onClick={() => setSelectedPage('home')}
          >
            <span>Home</span>
            <Link to="/" />
          </Menu.Item>
        )}
        {isLoggedIn && (
          <Menu.Item
            key="logout"
            icon={<UserOutlined />}
            onClick={() => logoutUser() && setSelectedPage('logout')}
          >
            <span>Log out</span>
          </Menu.Item>
        )}

        {/**
         * Logged out navigation
         */}
        {!isLoggedIn && (
          <Menu.Item
            key="home"
            icon={<VideoCameraOutlined />}
            onClick={() => setSelectedPage('home')}
          >
            <span>Home</span>
            <Link to="/" />
          </Menu.Item>
        )}
        {!isLoggedIn && (
          <Menu.Item
            key="login"
            icon={<UserOutlined />}
            onClick={() => setSelectedPage('login')}
          >
            <span>Log in</span>
            <Link to="/login" />
          </Menu.Item>
        )}
        {!isLoggedIn && (
          <Menu.Item key="documentation" icon={<UserOutlined />}>
            <a
              href="https://cansahin.gitbook.io/react-boilerplate-cra-template/"
              target="_blank"
              title="Documentation"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
}
