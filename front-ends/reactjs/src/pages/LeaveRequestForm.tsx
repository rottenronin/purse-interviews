import React from 'react'
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
} from 'antd'

export default function LeaveRequesForm() {
  function onFinish() {

  }

  function onFinishFailed() {

  }

  type FormField = {
    name?: string
    dates?: string[]
    comment?: string
  }

  return(
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout='vertical'
        >
          <Form.Item<FormField>
            label="Full name"
            name="name"
            rules={[{
              required: true,
              message: 'Please input your full name!',
            }]}
          >
            <Input />
        </Form.Item>
        <Form.Item
          label="Dates"
          name="dates"
          rules={[{
            required: true,
            message: 'Please select your leave dates!',
          }]}
        >
          <DatePicker.RangePicker  />
        </Form.Item>
        <Form.Item
          label="Comment"
          name="comment"
          rules={[{
            required: true,
            message: 'Please leave a message',
          }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}