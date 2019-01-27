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
        "name": "_dashboard",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p___Dashboard__mainpage" */'../_Dashboard/mainpage'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/image",
        "icon": "form",
        "name": "image",
        "routes": [
          {
            "path": "/image",
            "redirect": "/image/image1",
            "exact": true
          },
          {
            "path": "/image/image1",
            "name": "image1",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Images__models__image.js' */'D:/PHP/my-project1/src/pages/Images/models/image.js').then(m => { return { namespace: 'image',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Images/Image'),
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
        "path": "/AboutMC",
        "icon": "form",
        "name": "MC",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p___AboutMC__MC" */'../_AboutMC/MC'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/_User",
        "icon": "form",
        "name": "_User",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p___User__models__geographic.js' */'D:/PHP/my-project1/src/pages/_User/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "p___User__UserInfo" */'../_User/UserInfo'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/_User1",
        "name": "_User1",
        "icon": "user",
        "routes": [
          {
            "path": "/_User1/center",
            "name": "center",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../_User1/Center/Center'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/_User1/center",
                "redirect": "/_User1/center/articles",
                "exact": true
              },
              {
                "path": "/_User1/center/articles",
                "icon": "form",
                "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../_User1/Center/Articles'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/_User1/center/applications",
                "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../_User1/Center/Applications'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/_User1/center/projects",
                "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../_User1/Center/Projects'),
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
            "path": "/_User1/settings",
            "name": "settingsssssss",
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
                "path": "/_User1/settings",
                "redirect": "/_User1/settings/base",
                "exact": true
              },
              {
                "icon": "cloud",
                "path": "/_User1/settings/base",
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
                "path": "/_User1/settings/myaccount",
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
                "path": "/_User1/settings/mydata",
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
                "path": "/_User1/settings/security",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p___User1__Settings__models__geographic.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__list.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__rule.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../_User1/Settings/SecurityView'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/_User1/settings/binding",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p___User1__Settings__models__geographic.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__list.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__rule.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../_User1/Settings/BindingView'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/_User1/settings/address",
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
                "path": "/_User1/settings/notification",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p___User1__Settings__models__geographic.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__list.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/list.js').then(m => { return { namespace: 'list',...m.default}}),
  import(/* webpackChunkName: 'p___User1__Settings__models__rule.js' */'D:/PHP/my-project1/src/pages/_User1/Settings/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../_User1/Settings/NotificationView'),
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
        "path": "/form",
        "icon": "cloud",
        "name": "form",
        "routes": [
          {
            "path": "/form/basic-form",
            "name": "basicform",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Forms__models__form.js' */'D:/PHP/my-project1/src/pages/Forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Forms/BasicForm'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/form/step-form",
            "name": "stepform",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Forms__models__form.js' */'D:/PHP/my-project1/src/pages/Forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Forms/StepForm'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "hideChildrenInMenu": true,
            "routes": [
              {
                "path": "/form/step-form",
                "redirect": "/form/step-form/info",
                "exact": true
              },
              {
                "path": "/form/step-form/info",
                "name": "info",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Forms__models__form.js' */'D:/PHP/my-project1/src/pages/Forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Forms/StepForm/Step1'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/form/step-form/confirm",
                "name": "confirm",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Forms__models__form.js' */'D:/PHP/my-project1/src/pages/Forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Forms/StepForm/Step2'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/form/step-form/result",
                "name": "result",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Forms__models__form.js' */'D:/PHP/my-project1/src/pages/Forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Forms/StepForm/Step3'),
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
            "path": "/form/advanced-form",
            "name": "advancedform",
            "authority": [
              "admin"
            ],
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Forms__models__form.js' */'D:/PHP/my-project1/src/pages/Forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Forms/AdvancedForm'),
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
        "path": "/list",
        "icon": "table",
        "name": "list",
        "routes": [
          {
            "path": "/list/table-list",
            "name": "searchtable",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'D:/PHP/my-project1/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/TableList'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/list/basic-list",
            "name": "basiclist",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'D:/PHP/my-project1/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/BasicList'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/list/card-list",
            "name": "cardlist",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'D:/PHP/my-project1/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/CardList'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/list/search",
            "name": "searchlist",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'D:/PHP/my-project1/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/List'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/list/search",
                "redirect": "/list/search/articles",
                "exact": true
              },
              {
                "path": "/list/search/articles",
                "name": "articles",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'D:/PHP/my-project1/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/Articles'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/list/search/projects",
                "name": "projects",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'D:/PHP/my-project1/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/Projects'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/list/search/applications",
                "name": "applications",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'D:/PHP/my-project1/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/Applications'),
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
        "path": "/profile",
        "name": "profile",
        "icon": "profile",
        "routes": [
          {
            "path": "/profile/basic",
            "name": "basic",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Profile__models__profile.js' */'D:/PHP/my-project1/src/pages/Profile/models/profile.js').then(m => { return { namespace: 'profile',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Profile/BasicProfile'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/profile/advanced",
            "name": "advanced",
            "authority": [
              "admin"
            ],
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Profile__models__profile.js' */'D:/PHP/my-project1/src/pages/Profile/models/profile.js').then(m => { return { namespace: 'profile',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Profile/AdvancedProfile'),
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
        "name": "result",
        "icon": "check-circle-o",
        "path": "/result",
        "routes": [
          {
            "path": "/result/success",
            "name": "success",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Result/Success'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/result/fail",
            "name": "fail",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Result/Error'),
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
        "name": "exception",
        "icon": "warning",
        "path": "/exception",
        "routes": [
          {
            "path": "/exception/403",
            "name": "not-permission",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Exception__models__error.js' */'D:/PHP/my-project1/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Exception/403'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/exception/404",
            "name": "not-find",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Exception__models__error.js' */'D:/PHP/my-project1/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Exception/404'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/exception/500",
            "name": "server-error",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Exception__models__error.js' */'D:/PHP/my-project1/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Exception/500'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/exception/trigger",
            "name": "trigger",
            "hideInMenu": true,
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Exception__models__error.js' */'D:/PHP/my-project1/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Exception/TriggerException'),
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
        "name": "account",
        "icon": "user",
        "path": "/account",
        "routes": [
          {
            "path": "/account/center",
            "name": "center",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Center/Center'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/account/center",
                "redirect": "/account/center/articles",
                "exact": true
              },
              {
                "path": "/account/center/articles",
                "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Center/Articles'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/center/applications",
                "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Center/Applications'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/center/projects",
                "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Center/Projects'),
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
            "path": "/account/settings",
            "name": "settings",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Account__Settings__models__geographic.js' */'D:/PHP/my-project1/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Settings/Info'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/account/settings",
                "redirect": "/account/settings/base",
                "exact": true
              },
              {
                "path": "/account/settings/base",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Account__Settings__models__geographic.js' */'D:/PHP/my-project1/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Settings/BaseView'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/settings/security",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Account__Settings__models__geographic.js' */'D:/PHP/my-project1/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Settings/SecurityView'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/settings/binding",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Account__Settings__models__geographic.js' */'D:/PHP/my-project1/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Settings/BindingView'),
  LoadingComponent: require('D:/PHP/my-project1/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/settings/notification",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Account__Settings__models__geographic.js' */'D:/PHP/my-project1/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Settings/NotificationView'),
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
