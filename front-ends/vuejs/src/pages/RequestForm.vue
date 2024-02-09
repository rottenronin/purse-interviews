<template>
  <div id="request-form">
    <c-card>
      <h3>Leave Request Form</h3>
      <br>
      <form >
        <c-input
          name="name"
          v-model="form.name"
          label="Full name"
          bordered
          :error-message="state.errors?.name"
        />
        <label>DATES</label>
        <VueDatePicker
          v-model="form.dates"
          range
          multi-calendars
        />
        <div class="error-message" v-if="state.errors?.dates">
          {{ state.errors?.dates }}
        </div>
        <c-textarea
          name="comment"
          v-model="form.comment"
          label="comment"
          bordered
          :error-message="state.errors?.comment"
        />

        <div class="actions flex justify-content-center">
          <c-button
            class="c-mr-10"
            @click.prevent.stop="onValidateForm"
          >Submit</c-button>
          <c-button
            color="default"
            @click.prevent.stop="onResetForm"
          >Clear</c-button>
        </div>
      </form>
    </c-card>
  </div>
</template>

<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useYupHelper } from '@long2x/cresh-ui/helpers'
import * as yup from 'yup'

import {
  ref,
  reactive,
  getCurrentInstance,
} from 'vue'
import localForageService from '../services/localforage.service'

const form = reactive<{
  name: string
  dates: Date[]
  comment: string
}>({
  name: '',
  dates: [],
  comment: ''
})

const state = reactive<{
  errors?: Record<string, string>
}>({
})

const {
  reset,
  validate,
} = useYupHelper({
  fields: ref(form),
  schema: yup.object({
    name: yup.string().required(),
    dates: yup.array().required().test(value => value.length === 2),
    comment: yup.string().required(),
  }) as any,
  initialValues: {
    name: '',
    dates: [],
    comment: ''
  }
})

function onResetForm() {
  reset()
  state.errors = undefined
}
const app = getCurrentInstance()

async function onValidateForm() {
  const {
    errors,
    isValid,
  } = await validate()
  state.errors = undefined

  if (!isValid) {
    state.errors = errors
    return
  }
  // generate unique key as id
  const id = Math.random().toString(32).slice(2)

  await localForageService.setItem(id, {
    id,
    ...form,
    status: 'pending',
    dates: [
      form.dates[0].toISOString(),
      form.dates[1].toISOString(),
    ]
  })

  const notify = app?.appContext.config.globalProperties.$notify

  notify.success('Leave request added successfully!')

  onResetForm()
}
</script>

<style scoped>

#request-form {
  max-width: 700px;
  min-width: 600px;
}
#request-form .error-message {
  font-size: .75rem;
  margin-top: .5rem;
  color: rgb(var(--color-error));
}
</style>