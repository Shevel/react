import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { Sider } = Layout;

export const Navbar: React.FC = () => {
  return (
    <Sider className="site-layout-background" width={200}>
      <Menu
        mode="inline"
        style={{ height: '100%' }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}><Link to="/profile">My Profile</Link></Menu.Item>
        <Menu.Item key="2" icon={<NotificationOutlined />}><Link to="/dialogs">Messages</Link></Menu.Item>
        <Menu.Item key="3" icon={<LaptopOutlined />}><Link to="/users">Users</Link></Menu.Item>
      </Menu>
    </Sider>
  )
}