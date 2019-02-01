import React, { Component } from 'react';
import { Col, Row, Card, Pagination } from 'antd';
import styles from './DressA.less';
import Goodwrap from '@/components/Goods';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

function itemRender1(current, type, originalElement) {
  if (type === 'prev') {
    return <a>Previous</a>;
  } if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
}

class DressA extends Component {

  render() {
    return (
      <PageHeaderWrapper>
        <Row gutter={24}>
          <Col lg={17} md={24}>
            <Card className={styles.card}>
              <Row>
                <Col span={8}>
                  <div>
                    <img alt='' src="https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png" width={200} />
                    <h3><a href="https://google.com">123</a></h3>
                    <h3>456</h3>
                  </div>
                  <div>
                    <img alt='' src="https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png" width={200} />
                    <h3><a href="https://google.com">123</a></h3>
                    <h3>456</h3>
                  </div>
                  <div>
                    <img alt='' src="https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png" width={200} />
                    <h3><a href="https://google.com">123</a></h3>
                    <h3>456</h3>
                  </div>
                </Col>
                <Col span={8}>
                  <div>
                    <img alt='' src="https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png" width={200} />
                    <h3><a href="https://google.com">123</a></h3>
                    <h3>456</h3>
                  </div>
                </Col>
                <Col span={8}>
                  <div>
                    <img alt='' src="https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png" width={200} />
                    <h3><a href="https://google.com">123</a></h3>
                    <h3>456</h3>
                  </div>
                </Col>
              </Row>
              <Pagination className={styles.page} total={500} itemRender={itemRender1} />,
            </Card>

          </Col>

          <Col lg={7} md={24}>
            <Goodwrap />
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default DressA;
