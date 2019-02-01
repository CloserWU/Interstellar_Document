import React from 'react';
import { Input } from 'antd';
import styles from './index.less';

const Search = Input.Search;

export default () => (
  <div>
    <Search
      placeholder="input search text"
      onSearch={value => console.log(value)}
      style={{ width: 200 }}
    />
  </div>
);
