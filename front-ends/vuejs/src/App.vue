<template>
  <div id="app-content" class="flex">
    <c-drawer
      :model-value="true"
      height="100vh"
    >
      <c-drawer-item
        :selected="currentRoute === 'leave-requests'"
        @click="gotoRoute('/leave-requests')"
      >
        <div
          class="text"
        >
          Leave requests
        </div>    
      </c-drawer-item>
      <c-drawer-item
        :selected="currentRoute === 'request-form'"
        @click="gotoRoute('/request-form')"
      >
        <div class="text">
          Request form
        </div>
      </c-drawer-item>
    </c-drawer>
    <div class="app-body flex flex-direction-column flex-1">
      <c-header>
        <h2 style="font-size: large;text-align: center;">
          Leave Requests Gestion App
        </h2>
      </c-header>
    
      <main class="router-view-wrapper flex-1 flex justify-content-center">
        <RouterView />
      </main>
    </div>

  </div>
</template>

<script setup lang="ts">
import {
  computed,
} from 'vue'

import {
  useRoute,
  useRouter,
} from 'vue-router'

const route = useRoute()
const router = useRouter()

const currentRoute = computed(
  () => route.name,
)

function gotoRoute(path: string) {
  router.push(path)
}
</script>

<style>
  #app-content .app-body main.router-view-wrapper {
    padding: 20px;
    background: #ebebeb;
    box-sizing: content-box;
  }
</style>