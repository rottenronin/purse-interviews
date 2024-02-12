<template>
  <div id="leave-requests">
    <c-datatable
      :items="state.items"
      :headers="headers"
      :row-clickable="true"
      @row-click="onRowClick"
    >
      <template v-slot="{item}">
        <td class="id">
          {{ item.id }}
        </td>
        <td class="name">
          {{ item.name }}
        </td>
        <td class="status">
          <c-tag
            :color="resolveTagColor(item.status)"
            :text-content="item.status || 'pending'"
          />
        </td>
        <td class="dates">
          {{ new Date(item.dates[0]).toLocaleString() }} - {{ new Date(item.dates[1]).toLocaleString() }}
        </td>
      </template>
    </c-datatable>

    <DetailsModal
      :visible="state.showDetails"
      :leave-request="state.selectedItem"
      @close="onCloseModal"
      @status-change="onStatusChange"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  onBeforeMount,
  reactive,
} from 'vue'


import localforageService from '../services/localforage.service'
import { resolveTagColor } from '../services/helper.service'
import DetailsModal from '../components/DetailsModal.vue'

const headers = [
  {
    text: '#ID',
    key: 'id',
    align: 'start',
    sortable: true,
    sortOrder: 'desc'
  },
  {
    text: 'Employee',
    key: 'name',
    align: 'start',
    sortable: true,
  },
  {
    text: 'Status',
    key: 'status',
    align: 'start',
    sortable: false,
  },
  {
    text: 'Period',
    key: 'dates',
    align: 'start',
    sortable: true,
  }
]

export type LeaveRequestStatus = 'pending' | 'approved' | 'rejected'

export type LeaveRequest = {
  id: string
  name: string
  status: LeaveRequestStatus
  comment: string
  dates: string[] | Date[]
}

const state = reactive<{
  items: LeaveRequest[]
  selectedItem?: LeaveRequest
  showDetails: boolean
}>({
  items: [],
  showDetails: false,
})

onBeforeMount(async () => {
  state.items = await localforageService.getAll()
})

function onRowClick(item: LeaveRequest) {
  state.selectedItem = item
  state.showDetails = true
}

function onCloseModal() {
  state.selectedItem = undefined
  state.showDetails = false
}

function onStatusChange(status: LeaveRequestStatus) {
  if (!state.selectedItem) return
  const index = state.items.findIndex(
    i => i.id === state.selectedItem?.id
  )
  if (index > -1) {
    state.items.splice(index, 1, {
      ...state.selectedItem,
      status,
    })
  }
  onCloseModal()
}
</script>