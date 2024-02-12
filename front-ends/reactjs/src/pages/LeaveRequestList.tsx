import React, {
  useEffect,
  useState, } from 'react'
import {
  Table,
  Tag,
} from 'antd'

import type {
  TableProps,
} from 'antd'
import {
  resolveTagColor,
} from '../services/helper.service'
import localforageService from '../services/localforage.service';
import DetailsModal from '../components/DetailsModal';

export type DataType = {
  key: string
  name: string
  status: string
  dates: string[]
  comment: string
}

export default function LeaveRequesList() {
  const [
    selectedDataItem,
    setSelectedDataItem,
  ] = useState<DataType>()
  const [
    isModalVisible,
    setIsModalVisible,
  ] = useState(false)


  const onCell = (record: DataType) => {
    return {
      onClick: () => onRowSelect(record)
    }
  }
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'key',
      dataIndex: 'key',
      key: 'key',
      onCell,
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      onCell,
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: status => <Tag color={resolveTagColor(status || 'pending')}>
        {status || 'pending'}
      </Tag>,
      onCell,
      shouldCellUpdate: (record, prevRecord) => {
        return record.status !== prevRecord.status
      },
    },
    {
      title: 'dates',
      dataIndex: 'dates',
      key: 'dates',
      render: dates => {
        const from = new Date(dates[0])
        const to = new Date(dates[1])
        return `${from.toLocaleString()} - ${to.toLocaleString()}`
      },
      onCell,
    }
  ]
  const [data, setData] = useState<DataType[]>([])

  useEffect(() => {
    const getData = async () => {
      const data = await localforageService.getAll()
      setData(data.map(d => JSON.parse(d)))
    }
    getData()
  }, [])

  function onRowSelect(item: DataType) {
    setSelectedDataItem(item)
    setIsModalVisible(true)
  }

  function onItemUpdate(item: DataType) {
    const index = data.findIndex(d => item.key === d.key)
    if (index > -1) {
      data.splice(index, 1, item)
      setData([...data])
    }
  }
  return(
    <>
      <Table
        columns={columns}
        dataSource={data}
      />
      {
        selectedDataItem && <DetailsModal
          visible={isModalVisible}
          data={selectedDataItem}
          onCancel={() => {
            setIsModalVisible(false)
           } }
          onItemUpdate={onItemUpdate}
        />
      }
    </>
  )
}