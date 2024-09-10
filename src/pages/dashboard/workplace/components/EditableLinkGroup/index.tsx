import { Button, message } from 'antd';
import React, { createElement, useState } from 'react';
import useStyles from './index.style';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import DatePickerWithType from '../EditableTimeSelect';
export type EditableLink = {
  title: string;
  href: string;
  id?: string;
};
type EditableLinkGroupProps = {
  onAdd: () => void;
  links: EditableLink[];
  linkElement: any;
};
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const EditableLinkGroup: React.FC<EditableLinkGroupProps> = (props) => {
  const [time, SetTime] = useState("")
  const { styles } = useStyles();
  const { links, linkElement, onAdd } = props;
  return (
    <div className={styles.linkGroup}>
      {links.map((link) =>
        createElement(
          linkElement,
          {
            key: `linkGroup-item-${link.id || link.title}`,
            to: link.href,
            href: link.href,
          },
          link.title,
        ),
      )}
      <ModalForm
        title="新建表单"
        trigger={
          <Button type="primary" onClick={onAdd} ghost>
            添加
          </Button>
        }
        modalProps={{
          destroyOnClose: true
        }}
        submitter={{
          render: (props, defaultDoms) => {
            return [
              ...defaultDoms,
              // 页脚添加的额外按钮 重置...
              // <Button
              //   key="ok"
              //   onClick={() => {
              //     props.submit();
              //   }}
              // >
              //   ok
              // </Button>,
            ];
          },
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log({
            ...values,
            deadline: time
          });
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="name" // 需要定义name字段
          label="待办事项名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />

        <ProFormText label="待办截止时间" tooltip="不能小于当前时间">
          {/* @ts-ignore */}
          <DatePickerWithType onTimeChange={(val)=> SetTime(val)} />
        </ProFormText>
      </ModalForm>
    </div>
  );
};
EditableLinkGroup.defaultProps = {
  links: [],
  onAdd: () => {},
  linkElement: 'a',
};
export default EditableLinkGroup;
