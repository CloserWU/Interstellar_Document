import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown, Carousel, Avatar, Card } from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getTimeDistance } from '@/utils/utils';

import styles from './mainpage.less';
import PageLoading from '@/components/PageLoading';

class mainpage extends Component {
  render() {
    return (
      <PageHeaderWrapper>
        <Carousel autoplay="true" className={styles.carousel}>
          <div>
            <img className={styles.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSn_T2p2N4MLbaaFXe--iGFZvW7gxdOqQWx8luYksHJ9teYVaxA" width={256} />
          </div>
          <div><h3 className={styles.h3}>2</h3></div>
          <div><h3 className={styles.h3}>3</h3></div>
          <div><h3 className={styles.h3}>4</h3></div>
        </Carousel>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={8}>
            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071572613,550686495&fm=11&gp=0.jpg" width={256} />
          </Col>
          <Col span={8}>
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548218727411&di=d3a8ae3109a571373a970e0405747150&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117130719_fzvux.jpg" width={256} />
          </Col>
        </Row>
        <Card className={styles.card}>
          <h1 className={styles.h1}>人气单品</h1>
        </Card>
        <Card className={styles.card1}>
          <h3 className={styles.h3}>潮流裙装</h3>
        </Card>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={4}>
            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071572613,550686495&fm=11&gp=0.jpg" width={256} />
          </Col>
          <Col span={4}>
            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071572613,550686495&fm=11&gp=0.jpg" width={256} />
          </Col>
          <Col span={4}>
            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071572613,550686495&fm=11&gp=0.jpg" width={256} />
          </Col>
          <Col span={4}>
            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3071572613,550686495&fm=11&gp=0.jpg" width={256} />
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default mainpage;
