import { Button, Form, Input } from 'antd';
import React from 'react';
import { MinusCircleOutlined } from '@ant-design/icons/lib';

interface FormListProps {
  name: string;
  layout: any;
  layoutWithoutLabel: any;
}

export const FormList = (props: FormListProps) => (
  <Form.List name={props.name}>
    {(fields, { add, remove }) => {
      return (
        <div>
          {fields.map((field, index) => (
            <Form.Item
              {...(index === 0 ? props.layout : props.layoutWithoutLabel)}
              label={index === 0 ? props.name : ''}
              key={field.key}
            >
              <Form.Item
                {...field}
                validateTrigger={['onChange', 'onBlur']}
                noStyle
              >
                <Input style={{ width: '60%' }}/>
              </Form.Item>
              {fields.length > 1 ? (
                <MinusCircleOutlined
                  style={{ margin: '0 8px' }}
                  onClick={() => {
                    remove(field.name);
                  }}
                />
              ) : null}
            </Form.Item>
          ))}
          <Form.Item
            label={fields.length === 0 ? props.name : ''}
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
