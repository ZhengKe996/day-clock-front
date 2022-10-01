<template>
  <div class="w-full">
    <div v-if="loading" class="w-full h-screen flex justify-center items-center">
      <a-spin size="large" tip="Loading..." :delay="200" />
    </div>
    <!-- 数据图表 -->
    <Rate v-else :time="ChangeTime" :rateList="RateList" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { Rate as RateData } from '@/constants'
import { getTakeRate } from '@/api/get'
import Rate from '@/components/Rate'
const loading = ref<boolean>(true)
const ChangeTime = ref<string>('')
const RateList = ref<RateData[]>([])

const getRate = async () => {
  const { data } = await getTakeRate()
  RateList.value = data.data.result
  ChangeTime.value = data.data.result[0].time
  loading.value = false
}
onMounted(() => getRate())
onUnmounted(() => (loading.value = true))
</script>
