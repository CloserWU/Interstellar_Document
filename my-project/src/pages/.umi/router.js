import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from 'D:/PHP/my-project1/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__UserLayout" */'../../layouts/UserLayout'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'D:/PHP/my-project1/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__Login" */'../User/Login'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'D:/PHP/my-project1/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__Register" */'../User/Register'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'D:/PHP/my-project1/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__RegisterResult" */'../User/RegisterResult'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('D:/PHP/my-project1/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "path": "/",
        "redirect": "/dashboard/analysis",
        "exact": true
      },
      {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "routes": [
          {
            "path": "/dashboard/analysis",
            "name": "analysis",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Dashboard__models__activities.js' */'D:/PHP/my-project1/src/pages/Dashboard/models/activities.js').then(m => { return { namespace: 'activities',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__chart.js' */'D:/PHP/my-project1/src/pages/Dashboard/models/chart.js').then(m => { return { namespace: 'chart',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__monitor.js' */'D:/PHP/my-project1/src/pages/Dashboard/models/monitor.js').then(m => { return { namespace: 'monitor',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Dashboard/Analysis'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/dashboard/monitor",
            "name": "monitor",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Dashboard__models__activities.js' */'D:/PHP/my-project1/src/pages/Dashboard/models/activities.js').then(m => { return { namespace: 'activities',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__chart.js' */'D:/PHP/my-project1/src/pages/Dashboard/models/chart.js').then(m => { return { namespace: 'chart',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__monitor.js' */'D:/PHP/my-project1/src/pages/Dashboard/models/monitor.js').then(m => { return { namespace: 'monitor',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Dashboard/Monitor'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/dashboard/workplace",
            "name": "workplace",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Dashboard__models__activities.js' */'D:/PHP/my-project1/src/pages/Dashboard/models/activities.js').then(m => { return { namespace: 'activities',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__chart.js' */'D:/PHP/my-project1/src/pages/Dashboard/models/chart.js').then(m => { return { namespace: 'chart',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__monitor.js' */'D:/PHP/my-project1/src/pages/Dashboard/models/monitor.js').then(m => { return { namespace: 'monitor',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Dashboard/Workplace'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/PHP/my-project1/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/_dashboard",
        "icon": "dashboard",
        "name": "主页",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p___Dashboard__mainpage" */'../_Dashboard/mainpage'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/_goods",
        "icon": "cloud",
        "name": "商品",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p___Goods__DressA" */'../_Goods/DressA'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/_goods/dressA/:i",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p___Detail__Detail" */'../_Detail/Detail'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/AboutMC",
        "icon": "form",
        "name": "关于MC",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p___AboutMC__MC" */'../_AboutMC/MC'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/account",
        "name": "个人中心",
        "icon": "user",
        "routes": [
          {
            "path": "/account/settings",
            "name": "settings",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p___User1__Settings__models__geographic.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__list.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__rule.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../_User1/Settings/Info'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/account/settings",
                "redirect": "/account/settings/base",
                "exact": true
              },
              {
                "icon": "cloud",
                "path": "/account/settings/base",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p___User1__Settings__models__geographic.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__list.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__rule.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../_User1/Settings/BaseView'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/settings/myaccount",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p___User1__Settings__models__geographic.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__list.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__rule.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../_User1/Settings/MyAccount'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/settings/mydata",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p___User1__Settings__models__geographic.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__list.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__rule.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../_User1/Settings/MyData'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/settings/address",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p___User1__Settings__models__geographic.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__list.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__rule.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../_User1/Settings/AddressView'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('D:/PHP/my-project1/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('D:/PHP/my-project1/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__404" */'../404'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('D:/PHP/my-project1/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('D:/PHP/my-project1/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
