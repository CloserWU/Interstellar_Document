export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },

      {
        path: '/_dashboard',
        icon: 'dashboard',
        name: '主页',
        component: './_Dashboard/mainpage',
      },
      {
        path: '/_goods',
        icon: 'cloud',
        name: '商品',
        component: './_Goods/DressA',
      },
      /*{
        path: '/image',
        icon: 'form',
        name: 'image',
        routes: [
          {
            path: '/image',
            redirect: '/image/image1',
          },
          {
            path: '/image/image1',
            name: 'image1',
            component: './Images/Image',
          },
        ],
      },*/
      {
        path: '/AboutMC',
        icon: 'form',
        name: '关于MC',
        component: './_AboutMC/MC',
      },
      /*{
        path: '/_User',
        icon: 'form',
        name: '_User',
        component: './_User/UserInfo',
      },*/

      {
        path: '/_User1',
        name: '个人中心',
        icon: 'user',
        routes: [
          /*
          {
            path: '/_User1/center',
            name: 'center',
            component: './_User1/Center/Center',
            routes: [
              {
                path: '/_User1/center',
                redirect: '/_User1/center/articles',
              },
              {
                path: '/_User1/center/articles',
                icon: 'form',
                component: './_User1/Center/Articles',
              },
              {
                path: '/_User1/center/applications',
                component: './_User1/Center/Applications',
              },
              {
                path: '/_User1/center/projects',
                component: './_User1/Center/Projects',
              },
            ],
          },*/
          {
            path: '/_user1/settings',
            name: 'settings',
            component: './_User1/Settings/Info',
            routes: [
              {
                path: '/_user1/settings',
                redirect: '/_user1/settings/base',
              },
              {
                icon: 'cloud',
                path: '/_user1/settings/base',
                component: './_User1/Settings/BaseView',
              },
              {
                path: '/_user1/settings/myaccount',
                component: './_User1/Settings/MyAccount',
              },
              {
                path: '/_user1/settings/mydata',
                component: './_User1/Settings/MyData',
              },
              {
                path: '/_user1/settings/address',
                component: './_User1/Settings/AddressView',
              },
              /*
              {
                path: '/_user1/settings/security',
                component: './_User1/Settings/SecurityView',
              },
              {
                path: '/_user1/settings/binding',
                component: './_User1/Settings/BindingView',
              },

              {
                path: '/_user1/settings/notification',
                component: './_User1/Settings/NotificationView',
              },*/
            ],
          },
        ],
      },
      // forms
      /*
      {
        path: '/form',
        icon: 'cloud',
        name: 'form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },*/
      {
        component: '404',
      },
    ],
  },
];
