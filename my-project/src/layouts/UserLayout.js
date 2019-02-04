import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Icon, Row, Col, Divider, Card } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const links1 = [
  {
    key: 'AboutUs',
    title: '关于我们',
    href: '/AboutMC',
    blankTarget: true,
  },
  {
    key: 'ContactUs',
    // title: <Icon type="github" />,
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
];
const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018-2019 样板秒出系统 版权所有
  </Fragment>
);

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return title;
  // }

  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>MC</span>
              </Link>
            </div>
            <div className={styles.desc}>MC 是西湖区最具影响力的 服装样板设计 平台</div>
          </div>
          <Card className={styles.card}>
            <Row align="middle" type="flex">
              <Col lg={12} md={12} xs={0}>
                <div className={styles.div}>
                  <h1 className={styles.h1}>个性化定制</h1>
                  <hr className={styles.divider} />
                  <h2 className={styles.h1}>让购物车里的衣服</h2>
                  <h2 className={styles.h1}>比以往更了解你</h2>
                </div>
              </Col>
              <Col lg={12} md={12} xs={24}>
                <div>{children}</div>
              </Col>
            </Row>
          </Card>
        </div>
        <GlobalFooter links={links1} copyright={copyright} links1={null} />
      </div>
    );
  }
}

export default UserLayout;
