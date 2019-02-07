import React, { PureComponent } from 'react';
import { connect, Link } from 'dva';
import { Row, Col, Form, Card, Select, List, Avatar, Button, Icon, Tabs } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TagSelect from '@/components/TagSelect';
import AvatarList from '@/components/AvatarList';
import Ellipsis from '@/components/Ellipsis';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './Detail.less';


const { Option } = Select;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;



function callback(key) {
  console.log(key);
}

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    console.log(changedValues, allValues);
    // 模拟查询表单生效
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 19,
      },
    });
  },
})
class Detail extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;


    dispatch({
      type: 'list/fetch',
      payload: {
        count: 19,
      },
    });
  }



  render(){

    const {
      list: { list = [] },
      form,
      loading,
    } = this.props;
    const id = this.props.match.params.i;
    const i  = this.props.location.query;
    // const { id } = this.props.match.params.id; this.props.location.search

    const { getFieldDecorator } = form;


    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const TitleList = ({ data: { i, href } }) =>(
      <Form>
        <StandardFormRow grid last>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <FormItem {...formItemLayout} label="尺寸">
                {getFieldDecorator('author', {})(
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="l">L</Option>
                    <Option value="m">M</Option>
                    <Option value="s">S</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <FormItem {...formItemLayout} label="颜色">
                {getFieldDecorator('rate', {})(
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="black">黑色</Option>
                    <Option value="white">白色</Option>
                    <Option value="red">红色</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Button type="primary" block>Primary</Button>
            </Col>
            <Col lg={2} md={2} sm={2} xs={2}>
              <Icon type='cloud' />
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <h3>123</h3>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Button type="primary" block>Primary</Button>
            </Col>
            <Col lg={2} md={2} sm={2} xs={2}>
              <Icon type='cloud' />
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <h3>123</h3>
            </Col>
          </Row>
        </StandardFormRow>
      </Form>
    );

    const Tablist = ({ data: { i, href } }) => (
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Tab 1" key="1">
            <div>
              <h3>123</h3>
              <h3>123</h3>
              <h3>123</h3>
              <h3>123</h3>
            </div>
          </TabPane>
          <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
        </Tabs>
        <h2>123</h2>
        <Row gutter={24}>
          <Col lg={6} md={6} sm={12} xs={24}>
            <img alt='' src='https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png' />
          </Col>
          <Col lg={6} md={6} sm={12} xs={24}>
            <img alt='' src='https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png' />
          </Col>
          <Col lg={6} md={6} sm={12} xs={24}>
            <img alt='' src='https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png' />
          </Col>
          <Col lg={6} md={6} sm={12} xs={24}>
            <img alt='' src='https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png' />
          </Col>
        </Row>
      </div>
    );

    const cardList = list ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
        dataSource={list}
        renderItem={item => ( item.i === id ? (
          <List.Item>
            <div className={styles.card}>
              <Row gutter={24}>
                <Col lg={14} md={24}>
                  <img alt='' src='https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png' />
                </Col>
                <Col lg={10} md={24}>
                  <h3>{item.dresstitle}</h3>
                  <TitleList data={item} />
                  <ul>
                    <li>{item.dressdescription[0]}</li>
                    <li>{typeof item.i}</li>
                    <li>{item.i}</li>
                    <li>{item.dressdescription[1]}</li>
                    <li>{item.dressdescription[2]}</li>
                  </ul>
                </Col>
              </Row>
              <Tablist data={item} />
            </div>
          </List.Item>):<div />

        )}
      />
    ) : null;
    // this.props.location.search  的值是0=0
    return(
      <PageHeaderWrapper>
        <Card>
          <div>{typeof this.props.location.query}</div>
          <div>{typeof id}</div>
          {cardList}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Detail;
