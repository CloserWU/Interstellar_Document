import React, { PureComponent } from 'react';
import { connect, Link } from 'dva';
import { Row, Col, Form, Card, Select, List, Avatar, Button, Icon, Tabs } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TagSelect from '@/components/TagSelect';
import AvatarList from '@/components/AvatarList';
import Ellipsis from '@/components/Ellipsis';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './Detail.less';

const { Meta} = Card;
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
    // const i  = this.props.location.query;
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
          <Row gutter={16} type='flex' align='middle'>
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
          <Row gutter={16} type='flex' align='middle' justify='space-around'>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Button type="primary" block className={styles.button}>加入购物车</Button>
            </Col>
            <Col lg={2} md={2} sm={2} xs={2}>
              <Icon type='heart' />
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <div>添加到我的关注</div>
            </Col>
          </Row>
          <div className={styles.div} />
          <Row gutter={16} type='flex' align='middle' justify='space-around'>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Button type="danger" block className={styles.button}>我要定制</Button>
            </Col>
            <Col lg={2} md={2} sm={2} xs={2}>
              <Icon type='question' />
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <div>寻求帮助</div>
            </Col>
          </Row>
          <div className={styles.div} />
        </StandardFormRow>
      </Form>
    );

    const Mycard = ({img}) =>(
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={img} />}
      >
        <Meta
          title="Europe Street beat"
        />
      </Card>
    );

    const Tablist = ({ data: { dressdescriptiondetail, shops, cover } }) => (
      <div className={styles.tabs}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="商品描述" key="1" className={styles.tabpane}>
            <div>
              <h4>{dressdescriptiondetail[0]}</h4>
              <h4>{dressdescriptiondetail[1]}</h4>
              <h4>{dressdescriptiondetail[2]}</h4>
              <h4>{dressdescriptiondetail[3]}</h4>
              <h4>{dressdescriptiondetail[4]}</h4>
              <h4>{dressdescriptiondetail[5]}</h4>
              <h4>{dressdescriptiondetail[6]}</h4>
            </div>
          </TabPane>
          <TabPane tab="细节" key="2">Content of Tab Pane 2</TabPane>
        </Tabs>
        <h1 className={styles.h1}>相关推荐</h1>
        <Row gutter={64}>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Mycard img="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Mycard img={shops} />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Mycard img={cover} />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Mycard img="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
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
              <Row gutter={24} type='flex' align='top' justify='center'>
                <Col lg={14} md={24} xs={24}>
                  <img alt='' src={item.shops} width='80%' />
                </Col>
                <Col lg={10} md={24} xs={24}>
                  <h2>{item.dresstitle}</h2>
                  <h2>{item.price}</h2>
                  <TitleList data={item} />

                  <li>{item.dressdescription[0]}</li>
                  <li>{item.dressdescription[1]}</li>
                  <li>{item.dressdescription[2]}</li>

                </Col>
              </Row>
              <Tablist data={item} />
            </div>
          </List.Item>):<div />

        )}
      />
    ) : null;
    // this.props.location.search  的值是0=0
    // <div>{typeof this.props.location.query.i}</div>
    return(
      <PageHeaderWrapper>
        <Card>
          {cardList}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Detail;
