import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
} from 'antd';
import GeographicView from './GeographicView';

import Result from '@/components/Result';

import styles from './AddressView.less';
//   /* 217-227行不应该添加 ，因为修改会报错，因为城市假信息无法读出来 */

const validatorGeographic = (rule, value, callback) => {
  const { province, city } = value;
  if (!province.key) {
    callback('请输入省份!'); //   Please input your province
  }
  if (!city.key) {
    callback('请输入城市!'); //  Please input your city
  }
  callback();
};

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class AddressView extends PureComponent {
  state = { visible: false, done: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 3,
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'list/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/submit',
      payload: { id },
    });
  };

  render() {
    const {
      list: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除地址',
          content: '确定删除该地址吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const extraContent = <div className={styles.extraContent} />;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { geographic1, addaddress } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem} />
        <div className={styles.listContentItem}>
          {geographic1 === '浙江省杭州市' ? (
            addaddress === '江干区浙江理工大学' ? (
              <span>默认地址</span>
            ) : (
              <span>设为默认</span>
            )
          ) : (
            <span>设为默认</span>
          )}
        </div>
        <div className={styles.listContentItem} />
      </div>
    );

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="一系列的信息描述，很短同样也可以带标点。"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="昵称" {...this.formLayout}>
            {getFieldDecorator('addname', {
              rules: [{ required: true, message: '请输入任务名称' }],
              initialValue: current.addname,
            })(<Input placeholder="请输入" />)}
          </FormItem>

          <FormItem label="地址" {...this.formLayout}>
            {getFieldDecorator('geographic1', {
              rules: [
                {
                  validator: validatorGeographic,
                  initialValue: current.geographic1,
                },
              ],
            })(<GeographicView />)}
          </FormItem>
          <FormItem label="详细地址" {...this.formLayout}>
            {getFieldDecorator('addaddress', {
              rules: [{ required: true, message: '请输入任务名称' }],
              initialValue: current.addaddress,
            })(<Input placeholder="请输入" />)}
          </FormItem>

          <FormItem label="电话号码" {...this.formLayout}>
            {getFieldDecorator('addtelnum', {
              rules: [{ required: true, message: '请输入任务名称' }],
              initialValue: current.addtelnum,
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      );
    };

    return (
      <div>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 0px 40px 0px' }}   // padding 上 右 下 左
            extra={extraContent}
          >
            <Button
              type="Primary"
              style={{ width: '20%', marginBottom: 8 }}
              icon="plus"
              onClick={this.showModal}
              ref={component => {
                /* eslint-disable */
                this.addBtn = findDOMNode(component);
                /* eslint-enable */
              }}
            >
              添加
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      onClick={e => {
                        e.preventDefault();
                        this.showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <MoreBtn current={item} />,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <div>
                        <a href={item.href}>
                          <h2>{item.addname}</h2>
                        </a>
                        <h3>{item.addtelnum}</h3>
                      </div>
                    }
                    description={
                      <div>
                        {item.geographic1}
                        {item.addaddress}
                      </div>
                    }
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
        <Modal
          title={done ? null : `任务${current ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </div>
    );
  }
}

export default AddressView;
