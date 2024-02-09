<template>
  <c-modal
    class="leave-request-modal"
    :model-value="visible"
    no-footer
    :width="600"
  >
    <template #header>
      <header class="modal-header">
        <h3 class="title-h3">Leave request #{{leaveRequest?.id}}
        </h3>
        <c-tag
          class="tag-item c-ml-5"
          :color="resolveTagColor(String(leaveRequest?.status))"
          :text-content="leaveRequest?.status || 'pending'"
        />
        <div class="flex-1" />
        <c-button
          class="close-btn"
          color="default"
          @click="$emit('close')"
        >
          X
        </c-button>
      </header>
    </template>

    <div class="content c-mt-20">
      <c-input
        name="name"
        :model-value="leaveRequest?.name"
        label="Employee name"
        :disabled="true"
        :readonly="true"
        bordered
      />

      <label>PERIOD</label>
      <VueDatePicker
        :model-value="leaveRequest ? leaveRequest.dates : []"
        range
        multi-calendars
        inline
        readonly
      />
      <br>
      <c-textarea
        name="comment"
        :model-value="leaveRequest?.comment"
        label="comment"
        disabled
        readonly
        bordered
      />
    </div>
    <div class="actions flex justify-content-center">
      <c-button
        color="primary c-mr-15"
        @click.prevent.stop="onValidate"
      >
        Validate
      </c-button>
      <c-button
        color="error c-ml-15"
        @click.prevent.stop="onReject"
      >
        Reject
      </c-button>
    </div>
  </c-modal>
</template>

<script lang="ts" setup>
import {
  computed,
  PropType,
  getCurrentInstance,
} from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import type {
  LeaveRequest,
  LeaveRequestStatus,
} from '../pages/LeaveRequests.vue'

import { resolveTagColor } from '../services/helper.service'
import localforageService from '../services/localforage.service'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  leaveRequest: {
    type: Object as PropType<LeaveRequest>,
    required: false,
  }
})
const emit = defineEmits(['close', 'status-change'])

const app = getCurrentInstance()

async function updateStatus(status: LeaveRequestStatus) {
  if (!props.leaveRequest) return
  const updatedItem: LeaveRequest = {
    ...props.leaveRequest,
    status,
  }
  await localforageService.remove(props.leaveRequest.id)
  await localforageService.setItem(
    props.leaveRequest.id,
    updatedItem
  )
  emit('status-change', status)
}

const notify = computed(
  () => app?.appContext.config.globalProperties.$notify
)

async function onValidate() {
  await updateStatus('approved')
  notify.value.success(`The request ${props.leaveRequest?.id} is approved`)
}

async function onReject() {
  await updateStatus('rejected')
  notify.value.error(`The request ${props.leaveRequest?.id} is rejected`)
}
</script>

<style>
  .leave-request-modal .modal-header {
    display: flex;
    align-items: center;
  }

  .leave-request-modal .modal-header .title-h3 {
    color: rgb(var(--color-primary));
  }

  .leave-request-modal .modal-header .close-btn {
    min-width: unset;
  }
</style>
