export default [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/analysis',
      },
      {
        name: '分析页',
        icon: 'smile',
        path: '/dashboard/analysis',
        component: './dashboard/analysis',
      },
      {
        name: '监控页',
        icon: 'smile',
        path: '/dashboard/monitor',
        component: './dashboard/monitor',
      },
      {
        name: '工作台',
        icon: 'smile',
        path: '/dashboard/workplace',
        component: './dashboard/workplace',
      },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    // 全局权限状态管理文件access.ts 可控制用户访问权限
    access: 'canAdmin',
    // 二级管理页的入口，公共组件
    component: './Admin',
    routes: [
      // { path: '/admin', redirect: '/admin/sub-page' },
      // { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Admin' },
      {
        path: '/admin/user-manage',
        name: '用户管理',
        icon: 'smile',
        component: './Admin/UserManage',
      },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },

  {
    path: '/user',
    layout: false,
    // E.g. 通过全局权限状态管理 添加
    // access: 'canVip',
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },

  { path: '*', layout: false, component: './404' },
];
