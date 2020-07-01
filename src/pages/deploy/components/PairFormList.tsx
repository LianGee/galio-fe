import { Button, Form } from 'antd';
import React from 'react';
import { MinusCircleOutlined } from '@ant-design/icons/lib';
import PairInput from '@/pages/deploy/components/PairInput';

interface PairFormListProps {
  name: any;
  label: string;
  useNum: boolean;
  firstPlaceholder: string;
  secondPlaceHolder: string;
  layout: any;
  layoutWithoutLabel: any;
}

export const PairFormList = (props: PairFormListProps) => (
  <Form.List name={props.name}>
    {(fields, { add, remove }) => {
      return (
        <div>
          {fields.map((field, index) => (
            <Form.Item
              {...(index === 0 ? props.layout : props.layoutWithoutLabel)}
              label={index === 0 ? props.label : ''}
              key={field.key}
            >
              <Form.Item
                {...field}
                validateTrigger={['onChange', 'onBlur']}
                noStyle
              >
                <PairInput
                  useNum={props.useNum}
                  secondPlaceHolder={props.secondPlaceHolder}
                  firstPlaceholder={props.firstPlaceholder}
                />
              </Form.Item>
              {fields.length > 1 ? (
                <MinusCircleOutlined
                  onClick={() => {
                    remove(field.name);
                  }}
                />
              ) : null}
            </Form.Item>
          ))}
          <Form.Item
            label={fields.length === 0 ? props.label : ''}
            {...(fields.length === 0 ? props.layout : props.layoutWithoutLabel)}
          >
            <Button
              onClick={() => {
                add();
              }}
            >
              添加
            </Button>
          </Form.Item>
        </div>
      );
    }}
  </Form.List>
);
