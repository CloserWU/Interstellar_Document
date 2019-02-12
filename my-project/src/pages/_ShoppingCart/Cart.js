import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  List,
  Avatar,
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';

import styles from './Cart.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class Address extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 1,
      },
    });
  }

  render() {
    const {
      list: { list },
      loading,
    } = this.props;


    return (

      <Card
        className={styles.listCard}
        bordered='true'
        style={{ marginTop: 0 }}
        bodyStyle={{ padding: '0 0px 0px 20px' }}   // padding 上 右 下 左
      >
        <List
          size="large"
          rowKey="id"
          loading={loading}
          dataSource={list}
          pagination={null}
          renderItem={item => (
            <List.Item>
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
            </List.Item>
          )}
        />
      </Card>

    );
  }
}


/* eslint react/no-multi-comp:0 */
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class Cart extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };



  columns = [
    {
      title: '项目',
      dataIndex: 'Project',
      render: val => <img alt='' src={val} />,
    },
    {
      title: '名称',
      dataIndex: 'Name',
      render: (val) => (
        <div>
          <h3>{val[0]}</h3>
          <h4>{val[1]}</h4>
        </div>
      ),
    },
    {
      title: '价格',
      dataIndex: 'Price',
      sorter: true,
      align: 'right',
      render: val => `${val}`,
      // mark to display a total number
    },
    {
      title: '数量',
      dataIndex: 'Count',
      // render(text, record, val) {
      //   return (
      //     <div>
      //       <a onClick={this.handleUpdateModalVisible(true, record)}><Icon type='minus' /></a>
      //       {`${val}`}
      //       <a><Icon type='plus' /></a>
      //     </div>
      //   )
      // },
      render: (val, record) => (
        <div>
          <a onClick={() => this.handleUpdate(record, false)}><Icon type='minus' /></a>
          {val}
          <a onClick={() => this.handleUpdate(record, true)}><Icon type='plus' /></a>
        </div>
      ),
    },
    {
      title: '规格',
      dataIndex: 'Standard',
    },
    {
      title: '定制',
      dataIndex: 'Mode',
      render(val) {// val 要放在第一个！！   事实上，不论第一个参数是什么名字都是dataIndex的值，所哟完全可以把val改为text
        return (
          (val.toString() === '已选择定制') ? (
            <Fragment>
              <a href=''>{val}</a>
            </Fragment>) : (<a href=''>不需要定制</a>)
        );
      },
      // render: (text, record, val) => (
      //   <Fragment>
      //     <a onClick={() => this.handleUpdateModalVisible(true, record)}>{val}</a>
      //     <Divider type="vertical" />
      //     <a href="">已选择</a>
      //   </Fragment>
      // ),
    },
    {
      title: '总价',
      dataIndex: 'TotalPrice',
      needTotal: true,

    },
    {
      title: '',
      render() {
        return (<Icon type='close' />);
      }
    },
  ];



  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',

    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/add',
      payload: {
        desc: fields.desc,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = (fields, flag) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/update',
      payload: {
        Count: flag ? ((parseInt(fields.Count, 10)+1).toString()) : ((parseInt(fields.Count, 10)-1).toString()),
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <div>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            {selectedRows.length > 0 && (
              <span>
                <Button>批量操作</Button>
                <Dropdown overlay={menu}>
                  <Button>
                    更多操作 <Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
            )}
          </div>

          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={data}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </div>
        <div className={styles.div}>确认收货地址</div>
        <Row gutter={16}>
          <Col lg={14} md={14} sm={24} xs={24}>
            <Address />
          </Col>
          <Col lg={10} md={10} sm={24} xs={24}>
            <Button htmlType='' type='default' style={{width: '100%', height: '15vh'}}><Icon type='plus' />新建收货地址</Button>
          </Col>
        </Row>
        <div className={styles.div}>总额</div>
        <Row>
          <Col lg={6} md={6} sm={6} xs={7}>
            <Card className={styles.card}>总计</Card>
            <Card className={styles.card}>物流</Card>
            <Card className={styles.card}>订单号</Card>
          </Col>
          <Col lg={8} md={8} sm={8} xs={7}>
            <Card>123</Card>
            <Card>¥123</Card>
            <Card>123</Card>
          </Col>
          <Col lg={10} md={10} sm={10} xs={10}>
            <Button htmlType='' type='primary' className={styles.button}>提交订单并付款</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Cart;
