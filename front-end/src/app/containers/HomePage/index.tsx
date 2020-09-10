import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { Masthead } from './Masthead';
import { Features } from './Features';

const { Header, Sider, Content } = Layout;

export function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed(!collapsed);
  const collapsedMenuIcon = collapsed ? (
    <MenuUnfoldOutlined />
  ) : (
    <MenuFoldOutlined />
  );

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A Reactive Nest Boilerplate application homepage"
        />
      </Helmet>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Collapse Nav
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Button
              type="link"
              icon={collapsedMenuIcon}
              onClick={toggleCollapse}
            />
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: toggleCollapse,
              },
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Masthead />
            <Features />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}