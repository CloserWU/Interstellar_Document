# ant\_design_pro商品页带参数转到详情页  
业务上需要有一个页面当作模板，盛放不同的数据，并且页面url不同。例如淘宝每个商品以及商品的详情  
## 方法1:
---

```js
list.js
import { Link } from 'dva/router';
<Link to={{pathname:'/list/detail',query:id}}>XXX</Link>

detail.js
在render()函数中
const id = this.props.location.query;
得到传过来的参数
```
这种方法的url形如下面  
`http://localhost:8000/list/detail?0=0`  
接收参数也可以这样  
`this.props.location.search` 
不过`sreach`得到的参数形式是`0=0`，而`query`得到的参数形式是`0`  
`Link`这种方法一个很不好的地方是，每次在`detail`页面刷新时，参数就变成了空值。例如本来`id`为`string`，刷新后就是`object`  

## 方法2：
---
```js
# list.js
import { Link } from 'dva/router';

<Link to={`/list/detail/${item.id}`}>XXXX</Link>     

# detail.js
const id = this.props.match.params.id;  // 这个id要和正则式中的id匹配
```
这种方式的url形如`http://localhost:8000/list/detail/0`  
这样的参数传递，是直接根据url得到参数的，在`detail`刷新时，参数还是能用的。  

## 其他
---
如果想要传递的参数是一个object，而不单单是一个字符串，这样第一个方法在接收时，`this.props.location.query.属性`

## 参考资料
---
1. [ant design列表页，转跳到详情页，携带参数](https://blog.csdn.net/u011613356/article/details/81505883)  
1. [ant desgin pro 跨页面传参](https://blog.csdn.net/qq_25252769/article/details/79958487)  
1. [react如何在组件中获取路由参数？](https://blog.csdn.net/u010977147/article/details/53488665 )