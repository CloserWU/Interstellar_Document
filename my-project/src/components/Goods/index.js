import React from 'react';
import { Input, Card, Slider, Button, Col, Row, Divider, List, Avatar } from 'antd';
import styles from './index.less';

const Search = Input.Search;

function onChange(value) {
  console.log('onChange: ', value);
}

function onAfterChange(value) {
  console.log('onAfterChange: ', value);
}

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
];

export default () => (
  <div>
    <Card>
      <h3>搜索</h3>
      <Search
        placeholder="input search text"
        onSearch={value => console.log(value)}
        style={{ width: 200 }}
        className={styles.search}
      />
      <Divider />
      <h3>价格区间</h3>
      <Slider max={1000} range step={1} defaultValue={[220, 650]} onChange={onChange} onAfterChange={onAfterChange} />
      <Row align="middle" type="flex">
        <Col span={8}>
          <h4 className={styles.h4}>价格0-650</h4>
        </Col>
        <Col span={6} offset={10}>
          <Button type="primary" className={styles.button}>筛选</Button>
        </Col>
      </Row>
      <Divider />
      <h3>最受欢迎</h3>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item className={styles.list}>
            <List.Item.Meta
              avatar={<img alt='' src="https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png" width={50} height={50} />}
              title={item.title}
              description={<a href="https://ant.design">我要定制</a>}
            />
          </List.Item>
        )}
      />,
    </Card>
  </div>
);
