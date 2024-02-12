import { Button, Modal, Tag, notification } from "antd";
import { DataType } from "../pages/LeaveRequestList"
import { resolveTagColor } from "../services/helper.service";
import './details-modal.css'
import localforageService from "../services/localforage.service";

export default function DetailsModal({
  visible,
  data,
  onCancel,
  onItemUpdate,
}: {
  visible: boolean
  data: DataType
  onCancel: () => void
  onItemUpdate: (item: DataType) => void
}) {
  const [api, contextHolder] = notification.useNotification()

  const updateStatus = (status: string) => {
    const updatedItem = {
      ...data,
      status,
    }
    // get old item from local db and replace by new item
    localforageService.remove(data.key)
    localforageService.setItem(data.key, JSON.stringify({
      ...updatedItem,
    }))
    if (status === 'approved') {
      api.success({
        message: 'The request is approved',
      })
    } else {
      api.error({
        message: 'The request is rejected',
      })
    }
    // close the modal
    onCancel()
    onItemUpdate(updatedItem)
  }

  return (
      <>
        {contextHolder}
        <Modal
          className="details-modal"
          open={visible}
          footer={[
            <Button
              onClick={() => updateStatus('rejected')}
              key="rejected"
            >
              Reject
            </Button>,
            <Button
              onClick={() => updateStatus('approved')}
              type='primary'
              key="approved"
            >
              Approve
            </Button>
          ]}
          title={`Leave request ${data.key}`}
          onCancel={() => onCancel()}
        >
          <h4>
            Status
          </h4>
          <Tag color={resolveTagColor(data.status || 'pending')}>
            {data.status || 'pending'}
          </Tag>

          <h4>
            Employee name
          </h4>
          <input
            name="fullname"
            disabled
            value={data.name}
          />

          <h4>Period</h4>

          <input
            name="dateFrom"
            disabled
            value={new Date(data.dates[0]).toLocaleString()}
          />
          <span> - </span>
          <input
            name="dateTo"
            disabled
            value={new Date(data.dates[1]).toLocaleString()}
          />

          <h4>
            Comment
          </h4>
          <textarea
            name="comment"
            disabled
            value={data.comment}
            rows={4}
            cols={46}
          />
        </Modal>
      </>
    )
}
