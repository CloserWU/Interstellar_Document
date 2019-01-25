import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { Menu, Icon } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Info.less';

const { Item } = Menu;
const Icons = {
  base: <Icon type="cloud" />,
  myaccount: <Icon type="user" />,
  mydata: <Icon type="user" />,
  security: <Icon type="form" />,
  binding: <Icon type="table" />,
  address: <Icon type="sync" />,
  notification: <Icon type="github" />,
};
@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class Info extends Component {
  constructor(props) {
    super(props);
    const { match, location } = props;
    const menuMap = {
      base: <FormattedMessage id="app.settings.menuMap.basic" defaultMessage="Basic Settings" />,
      myaccount: <FormattedMessage id="app.settings.menuMap.myaccount" defaultMessage="MyAccount" />,
      mydata: <FormattedMessage id="app.settings.menuMap.mydata" defaultMessage="MyData" />,
      security: (
        <FormattedMessage id="app.settings.menuMap.security" defaultMessage="Security Settings" />
      ),
      binding: (
        <FormattedMessage id="app.settings.menuMap.binding" defaultMessage="Account Binding" />
      ),
      address: <FormattedMessage id="app.settings.menuMap.address" defaultMessage="Address" />,
      notification: (
        <FormattedMessage
          id="app.settings.menuMap.notification"
          defaultMessage="New Message Notification"
        />
      ),
    };
    const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: menuMap[key] ? key : 'base',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { match, location } = props;
    let selectKey = location.pathname.replace(`${match.path}/`, '');
    selectKey = state.menuMap[selectKey] ? selectKey : 'base';
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => (
      <Item key={item}>
        {Icons[item]}
        {menuMap[item]}
      </Item>
    ));
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = ({ key }) => {
    router.push(`/_User1/settings/${key}`);
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      let mode = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  render() {
    const { children, currentUser } = this.props;
    if (!currentUser.userid) {
      return '';
    }
    const { mode, selectKey } = this.state;
    return (
      <PageHeaderWrapper>
        <GridContent>
          <div
            className={styles.main}
            ref={ref => {
              this.main = ref;
            }}
          >
            <div className={styles.leftmenu}>
              <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
                {this.getmenu()}
              </Menu>
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{this.getRightTitle()}</div>
              {children}
            </div>
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default Info;
