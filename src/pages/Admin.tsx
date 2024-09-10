import React from 'react';
import '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
import UserMange from './Admin/UserManage';

const Admin: React.FC = () => {

  return (
    <PageContainer
      header={{children: <UserMange/>}}
    >
    </PageContainer>
  );
};
export default Admin;
