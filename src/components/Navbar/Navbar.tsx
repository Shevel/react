import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  SmileOutlined,
  GlobalOutlined,
  WechatOutlined,
  CommentOutlined,
  SettingOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons';

import { ROUTES } from '../../constant/routes';

const { Sider } = Layout;

const Navbar: React.FC = () => {
  return (
    <Sider
      className='site-layout-background'
      width={200}
      style={{ background: '#fff', borderRadius: '5px' }}
    >
      <Menu mode='inline' style={{ height: '100%', borderRadius: '5px' }}>
        <Menu.Item key='1' icon={<SmileOutlined style={{ fontSize: '20px'}}/>}>
          <Link to={ROUTES.MY_PROFILE}>Me</Link>
        </Menu.Item>
        <Menu.Item key='2' icon={<UserOutlined style={{ fontSize: '20px'}}/>}>
          <Link to={ROUTES.USERS}>People</Link>
        </Menu.Item>
        <Menu.Item key='3' icon={<CommentOutlined style={{ fontSize: '20px'}}/>}>
          <Link to={ROUTES.DIALOGS}>Messages</Link>
        </Menu.Item>
        <Menu.Item key='4' icon={<CustomerServiceOutlined style={{ fontSize: '20px'}}/>}>
          <Link to={ROUTES.MUSIC}>Music</Link>
        </Menu.Item>
        <Menu.Item key='5' icon={<GlobalOutlined style={{ fontSize: '20px'}}/>}>
          <Link to={ROUTES.NEWS}>News</Link>
        </Menu.Item>
        <Menu.Item key='6' icon={<WechatOutlined style={{ fontSize: '20px'}}/>}>
          <Link to={ROUTES.CHAT}>Chat</Link>
        </Menu.Item>
        <Menu.Item key='7' icon={<SettingOutlined style={{ fontSize: '20px'}}/>}>
          <Link to={ROUTES.SETTINGS}>Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Navbar;
