import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
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

import Result from '@/components/Result';

import styles from './MyData.less';
//   /* 217-227行不应该添加 ，因为修改会报错，因为城市假信息无法读出来 */



const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class MyData extends PureComponent {
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

    const ListContent = ({ data: { i, href } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem} />
        <div className={styles.listContentItem}>
          {i === '0' ? <a href={href}><span>默认数据</span></a> : <a href={href}><span>设为默认</span></a>}
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

    const fenjie = (mydata, i) => {
      if(i === '0'){
        return mydata[0];
      }
      return '';
    };

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
        <div>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={12}>
              <img className={styles.img} src="https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png" width='520px' />
            </Col>
            <Col span={12}>
              <Form onSubmit={this.handleSubmit}>
                <FormItem label="前腰围" {...this.formLayout}>
                  {getFieldDecorator('mydata', {
                    rules: [{ required: true, message: '请输入任务名称' }],
                    initialValue: (current.mydata),
                  })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem label="前腰围" {...this.formLayout}>
                  {getFieldDecorator('mydata', {
                    rules: [{ required: true, message: '请输入任务名称' }],
                    initialValue: (current.mydata),
                  })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem label="前腰围" {...this.formLayout}>
                  {getFieldDecorator('mydata', {
                    rules: [{ required: true, message: '请输入任务名称' }],
                    initialValue: (current.mydata),
                  })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem label="前腰围" {...this.formLayout}>
                  {getFieldDecorator('mydata', {
                    rules: [{ required: true, message: '请输入任务名称' }],
                    initialValue: (current.mydata),
                  })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem label="昵称" {...this.formLayout}>
                  {getFieldDecorator('addname', {
                    rules: [{ required: true, message: '请输入任务名称' }],
                    initialValue: current.addname,
                  })(<Input placeholder="请输入" />)}
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
            </Col>
          </Row>


        </div>
      );
    };

    return (
      <div>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
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
                        <h3>
                          身体数据
                          {item.i}
                        </h3>
                      </div>
                    }
                    description={
                      <div>
                        <div>
                          前腰围-
                          {item.mydata[0]}
                          ，前臀围-
                          {item.mydata[1]}
                          ，直裆长-
                          {item.mydata[2]}
                        </div>
                        <div>
                          膝&emsp;长-
                          {item.mydata[3]}
                          ，腿&emsp;长-
                          {item.mydata[4]}
                          ，前臀围-
                          {item.mydata[5]}
                        </div>
                        <div>
                          腰&emsp;长-
                          {item.mydata[6]}
                          ，后腰围-
                          {item.mydata[7]}
                          ，后臀围-
                          {item.mydata[8]}
                        </div>
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
          centered={true}
          title={done ? null : `数据${current ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={1080}
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

export default MyData;
