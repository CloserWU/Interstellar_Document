import React, { Component } from 'react';
import { Col, Row, Card } from 'antd';
import styles from './DressA.less';
import Goodwrap from '@/components/Goods';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class DressA extends Component {
  render() {
    return (
      <PageHeaderWrapper>
        <Row gutter={24}>
          <Col lg={17} md={24}>
            <Card>
              <Goodwrap />
              <Goodwrap />
              <Goodwrap />
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
