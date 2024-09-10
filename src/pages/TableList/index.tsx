import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Badge, Table, TableColumnType, Tag } from 'antd';

import UpdateModal from './components/UpdateModal';
import { RuleListDataType } from './data';
import { getRuleData } from './service';

interface DataType {
  key: React.Key;
  name: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: string;
}
const TableList: React.FC = () => {
  const { loading, data } = useRequest(getRuleData);

  const columns: TableColumnType<DataType> = [
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: RuleListDataType, b: RuleListDataType) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      copyable: true,
    },
    {
      title: '服务器调用次数',
      dataIndex: 'callNo',
      key: 'callNo',
      // onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a: RuleListDataType, b: RuleListDataType) => a.callNo - b.callNo,
      defaultSortOrder: 'descend',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: RuleListDataType) =>
        record.status === 0 ? (
          <Badge status="error" text="已停用" />
        ) : (
          <Badge status="success" text="运行中" />
        ),
    },
    {
      title: '上次调用时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '操作',
      key: 'operation',
      valueType: 'option',
      render: (_: any, record: RuleListDataType) => (
        <UpdateModal
          trigger={<a>配置</a>}
          key="config"
          // onOk={()=> window.location.reload()}
          values={record}
        />
      ),
    },
  ];
  return (
    <PageContainer title="规则管理">
      <Table
        title={() => <Tag>规则列表</Tag>}
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{
          position: ['bottomCenter'],
          responsive: true,
          size: 'default',
          showQuickJumper: true,
          hideOnSinglePage: false,
          pageSize: 5,
          total: data?.length,
        }}
      ></Table>
    </PageContainer>
  );
};

export default TableList;
