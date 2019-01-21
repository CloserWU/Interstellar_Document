import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'AboutUs',
          title: '关于我们',
          href: '/AboutMC',
          blankTarget: true,
        },
        {
          key: 'ContactUs',
          //title: <Icon type="github" />,
          title: '联系我们',
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Recruit',
          title: '诚聘英才',
          href: 'https://ant.design',
          blankTarget: true,
        },
        {
          key: 'LegalNotice',
          title: '法律声明',
          href: 'https://ant.design',
          blankTarget: true,
        },
        {
          key: 'FriendlyLink',
          title: '友情链接',
          href: 'https://ant.design',
          blankTarget: true,
        },
        {
          key: 'OfficialWebsite',
          title: '官方网站',
          href: 'https://ant.design',
          blankTarget: true,
        },
        {
          key: 'Forum',
          title: '商品论坛',
          href: 'https://ant.design',
          blankTarget: true,
        },
        {
          key: 'Express',
          title: '快递查询',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
      links1={[
        {
          key: 'AboutUs',
          title: '关于我们',
          href: '/AboutMC',
          blankTarget: true,
        },
        {
          key: 'ContactUs',
          //title: <Icon type="github" />,
          title: '联系我们',
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Recruit',
          title: '诚聘英才',
          href: 'https://ant.design',
          blankTarget: true,
        },
        {
          key: 'LegalNotice',
          title: '法律声明',
          href: 'https://ant.design',
          blankTarget: true,
        },
        {
          key: 'FriendlyLink',
          title: '友情链接',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018-2019 MC样板秒出平台 版权所有
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
