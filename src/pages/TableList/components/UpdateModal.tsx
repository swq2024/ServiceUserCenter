import { updateRule } from '@/services/ant-design-pro/api';
import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { message, Modal } from 'antd';
import React, { cloneElement, useCallback, useState } from 'react';

type UpdateModalProps = {
  trigger?: JSX.Element;
  onOk?: () => void;
  values: Partial<API.RuleListItem>;
};
const UpdateModal: React.FC<UpdateModalProps> = (props) => {
  const { trigger, onOk, values } = props;
  const [open, setOpen] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const { run } = useRequest(updateRule, {
    manual: true, //阻止初始化执行。只有触发 run 时才会开始执行。
    onSuccess: () => {
      messageApi.destroy();
      messageApi.success('配置成功');
      onOk?.();
    },
    onError: () => {
      messageApi.error('配置失败，请重试！');
    },
  });

  const onCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onFinish = useCallback(
    async (values?: any) => {
      await run({ data: values });

      onCancel();
    },
    [onCancel, run],
  );
  return (
    <>
      {contextHolder}
      {trigger
        ? cloneElement(trigger, {
            onClick: onOpen,
          })
        : null}
      <StepsForm
        setpsProps={{ size: 'small' }}
        // @ts-ignore
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              width={640}
              styles={{ body: { padding: '32px 40px 48px' } }}
              destroyOnClose
              title={'规则配置'}
              open={open}
              footer={submitter}
              onCancel={onCancel}
            >
              {dom}
            </Modal>
          );
        }}
        onFinish={onFinish}
      >
        <StepsForm.StepForm initialValues={values} title={'基本信息'}>
          <ProFormText
            name="name"
            label={'规则名称'}
            width="md"
            rules={[
              {
                required: true,
                message: '请输入规则名称！',
              },
            ]}
          />
          <ProFormTextArea
            name="desc"
            width="md"
            label={'规则描述'}
            placeholder={'请输入至少五个字符'}
            rules={[
              {
                required: true,
                message: '请输入至少五个字符的规则描述！',
                min: 5,
              },
            ]}
          />
        </StepsForm.StepForm>

        <StepsForm.StepForm
          initialValues={{
            target: '0',
            template: '0',
          }}
          title={'配置规则属性'}
        >
          <ProFormSelect
            name="target"
            width="md"
            label={'监控对象'}
            valueEnum={{
              0: '表一',
              1: '表二',
            }}
          />
          <ProFormSelect
            name="template"
            width="md"
            label={'规则模板'}
            valueEnum={{
              0: '规则模板一',
              1: '规则模板二',
            }}
          />
          <ProFormRadio.Group
            name="type"
            label={'规则类型'}
            options={[
              {
                value: '0',
                label: '强',
              },
              {
                value: '1',
                label: '弱',
              },
            ]}
          />
        </StepsForm.StepForm>

        <StepsForm.StepForm
          initialValues={{
            type: '1',
            frequency: 'month',
          }}
          title={'设定调度周期'}
        >
          <ProFormDateTimePicker
            name="time"
            width="md"
            label={'开始时间'}
            rules={[
              {
                required: true,
                message: '请选择开始时间！',
              },
            ]}
          />
          <ProFormSelect
            name="frequency"
            label={'监控对象'}
            width="md"
            valueEnum={{
              month: '月',
              week: '周',
            }}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};

export default UpdateModal;
