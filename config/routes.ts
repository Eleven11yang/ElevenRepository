export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/Game/CountPeople1',
        component: './Game/CountPeople1',
      },
      // game2-2
      {
        path: '/Game/TakePictures2',
        component: './Game/TakePictures2',
      },
      // game2-1
      {
        path: '/Game/TakePictures1',
        component: './Game/TakePictures1',
      },
      // child
      {
        path: '/child',
        component: './Game/Child',
      },
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        component: './404',
      },
    ],
  },

  // {
  //   path: '/user',
  //   layout: false,
  //   routes: [
  //     {
  //       name: 'login',
  //       path: '/user/login',
  //       component: './user/Login',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  // {
  //   path: '/admin/sub-page',
  //   name: 'sub-page',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   component: './404',
  // },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  // game1
];
