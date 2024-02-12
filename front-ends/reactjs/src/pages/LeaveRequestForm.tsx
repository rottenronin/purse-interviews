import {
  Button,
  DatePicker,
  Form,
  Input,
  notification,
} from 'antd'

import './leave-request-form.css'
import localforageService from '../services/localforage.service'
import { uniqueKey } from '../services/helper.service'

export default function LeaveRequesForm() {
  const [api, contextHolder] = notification.useNotification()

  function onFinish(values: FormFields) {
    const key = uniqueKey()
    const dateFrom = values.dates?.[0].$d.toISOString()
    const dateTo = values.dates?.[1].$d.toISOString()
    
    localforageService.setItem(key, JSON.stringify({
      ...values,
      key,
      dates: [
        dateFrom,
        dateTo,
      ],
      status: 'pending'
    }))
    api.success({
      message: 'You added a new request'
    })
    form.resetFields()
  }

  function onFinishFailed() {
    api.error({
      message: 'Errors occured',
      description: 'Please fix errors before continuing'
    })
  }

  type FormFields = {
    name?: string
    dates?: [{
      $d: Date
    }, {
      $d: Date
    }]
    comment?: string
  }

  const [form] = Form.useForm()

  return(
    <>
      {contextHolder}
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout='vertical'
        className="leave-request-form"
        >
          <Form.Item<FormFields>
            label="Full name"
            name="name"
            rules={[{
              required: true,
              message: 'Please input your full name!',
            }]}
          >
            <Input />
        </Form.Item>
        <Form.Item<FormFields>
          label="Dates"
          name="dates"
          rules={[{
            required: true,
            message: 'Please select your leave dates!',
          }]}
        >
          <DatePicker.RangePicker showTime={true} />
        </Form.Item>
        <Form.Item<FormFields>
          label="Comment"
          name="comment"
          rules={[{
            required: true,
            message: 'Please leave a message',
          }]}
        >
          <Input.TextArea />
        </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
      </Form>
    </>
  )
}