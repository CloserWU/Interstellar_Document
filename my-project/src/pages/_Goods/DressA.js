import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Form, Card, Select, List, Avatar } from 'antd';

import TagSelect from '@/components/TagSelect';
import AvatarList from '@/components/AvatarList';
import Ellipsis from '@/components/Ellipsis';
import StandardFormRow from '@/components/StandardFormRow';
import Goodwrap from '@/components/Goods';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './DressA.less';

const { Option } = Select;
const FormItem = Form.Item;

/* eslint react/no-array-index-key: 0 */

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
class DressA extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 19,
      },
    });
  }

  render() {
    const {
      list: { list = [] },
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;

    const cardList = list ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 9,
        }}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.dresstitle} src={item.cover} />}
            >
              <Card.Meta
                title={item.dresstitle}
                description={<Ellipsis lines={2}><a>我要定制</a></Ellipsis>}
              />

              <Link to={`/_goods/dressA/${item.i}`}>添加用户</Link>
              <Link to={{pathname:'/_goods/dressA/1',query:item.i}}>添加用户1</Link>
              <div className={styles.cardItemContent}>
                <span>销量 {item.sales}</span>
                <div className={styles.avatarList}>
                  <Avatar size="small" src={item.shops} />
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    ) : null;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const titleList=(
      <Card bordered={false}>
        <Form layout="inline">
          <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
            <FormItem>
              {getFieldDecorator('category')(
                <TagSelect expandable>
                  <TagSelect.Option value="cat1">A字裙</TagSelect.Option>
                  <TagSelect.Option value="cat2">短裙</TagSelect.Option>
                  <TagSelect.Option value="cat3">百褶裙</TagSelect.Option>
                  <TagSelect.Option value="cat4">一步裙</TagSelect.Option>
                  <TagSelect.Option value="cat5">长裙</TagSelect.Option>
                  <TagSelect.Option value="cat6">荷叶边裙</TagSelect.Option>
                  <TagSelect.Option value="cat7">牛仔裙</TagSelect.Option>
                  <TagSelect.Option value="cat8">鱼尾裙</TagSelect.Option>
                </TagSelect>
              )}
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="店铺">
                  {getFieldDecorator('author', {})(
                    <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                      <Option value="shop1">店铺1</Option>
                      <Option value="shop2">店铺2</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="好评度">
                  {getFieldDecorator('rate', {})(
                    <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                      <Option value="good">优秀</Option>
                      <Option value="normal">普通</Option>
                      <Option value="bad">较差</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
    );

    return (
      <PageHeaderWrapper>
        <div className={styles.coverCardList}>
          <Row gutter={24}>
            <Col lg={17} md={24}>
              {titleList}
              <div className={styles.cardList}>
                <Card>
                  {cardList}
                </Card>
              </div>
            </Col>
            <Col lg={7} md={24}>
              <Goodwrap />
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default DressA;
