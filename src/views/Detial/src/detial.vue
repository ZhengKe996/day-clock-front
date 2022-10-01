<template>
  <div class="w-full">
    <div v-if="loading" class="w-full h-screen flex justify-center items-center">
      <a-spin size="large" tip="Loading..." :delay="200" />
    </div>
    <Detial :dataSource="dataSource" :originalClassList="originalClassList" :gradeList="gradeList" :time="ChangeTime" v-else @changeClass="getInfo" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { getDetail, getNotList } from '@/api/get'
import { Detail as DetailData } from '@/constants'
import Detial from '@/components/Detial'
import dayjs from 'dayjs'

const loading = ref<boolean>(true)
const ChangeTime = ref<string>('')
const dataSource = ref<DetailData[]>([])
const originalClassList = ref<{ grade: string; class: string }[]>([])
const gradeList = ref<string[]>([])

const getInfo = async (value?: string) => {
  const { data } = await getDetail(value)
  dataSource.value = data.data.result
  ChangeTime.value = dayjs(data.data.result[0]?.createdDate).format('YYYY-MM-DD HH:mm:ss')
}
const getGrade = async () => {
  const { data } = await getNotList()
  gradeList.value = data.data.result.gradeList
  originalClassList.value = data.data.result.classList
  loading.value = false
}

onMounted(() => {
  getInfo()
  getGrade()
})
onUnmounted(() => (loading.value = true))
</script>
