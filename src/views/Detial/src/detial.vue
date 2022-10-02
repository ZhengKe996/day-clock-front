<template>
  <div class="w-full">
    <div v-if="loading" class="w-full h-screen flex justify-center items-center">
      <a-spin size="large" tip="Loading..." :delay="200" />
    </div>
    <div v-else class="w-full">
      <div class="mt-2 text-center font-mono text-base antialiased font-medium tracking-widest align-middle divide-y-2 divide-opacity-40 divide-dotted">
        <div class="text-3xl font-bold leading-normal">
          物联网技术学院<br />
          每日健康监测数据详情
          <span class="text-xl" v-if="!isMobileTerminal" @click="onClick">返回</span>
        </div>
        <div class="tracking-wider flex-1">数据更新时间: {{ ChangeTime }} <span class="ml-2" v-if="isMobileTerminal" @click="onClick">返回</span></div>
      </div>

      <div class="w-full xl:w-[1024px] mx-auto">
        <div class="flex justify-center xl:justify-start my-3">
          <a-dropdown-button class="mr-8" type="primary" :loading="gradeLoading">
            <template #overlay>
              <a-menu>
                <a-menu-item @click="changeGrade(item)" v-for="(item, index) in gradeList" :key="index">{{ item }}</a-menu-item>
              </a-menu>
            </template>
            {{ gradeTitle }}
            <template #icon><DownOutlined /></template>
          </a-dropdown-button>
          <a-dropdown-button class="mr-8" type="primary" :loading="classLoading">
            <template #overlay>
              <a-menu>
                <a-menu-item @click="changeClass(item)" v-for="(item, index) in classList" :key="index">{{ item.class }}</a-menu-item>
              </a-menu>
            </template>
            {{ classTitle }}
            <template #icon><DownOutlined /></template>
          </a-dropdown-button>
        </div>
        <Detial :dataSource="dataSource" :loading="tableLoading" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { DownOutlined } from '@ant-design/icons-vue'
import { getDetail, getNotList } from '@/api/get'
import { Detail as DetailData } from '@/constants'
import Detial from '@/components/Detial'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { isMobileTerminal } from '@/utils/flexible'

dayjs.extend(utc)
const router = useRouter()

const onClick = () => router.push('/main')
const loading = ref<boolean>(true)
const tableLoading = ref<boolean>(true)
const ChangeTime = ref<string>('')
const dataSource = ref<DetailData[]>([])
const originalClassList = ref<{ grade: string; class: string }[]>([])
const gradeList = ref<string[]>([])

const getInfo = async (value?: string) => {
  tableLoading.value = true
  const { data } = await getDetail(value)
  dataSource.value = data.data.result

  ChangeTime.value = dayjs(data.data.result[0]?.createdDate).utc().format('YYYY-MM-DD HH:mm:ss')
  tableLoading.value = false
}
const getGrade = async () => {
  loading.value = true
  const { data } = await getNotList()
  gradeList.value = data.data.result.gradeList
  originalClassList.value = data.data.result.classList
  loading.value = false
}

const gradeLoading = ref(true)
const gradeTitle = ref('请选择年级')

const changeGrade = (value: any) => {
  gradeTitle.value = value
  classList.value = originalClassList.value.filter((item) => item.grade === value)
  classTitle.value = '请选择班级'
}

const classLoading = ref(true)
const classTitle = ref('请选择班级')
const classList = ref<{ grade: string; class: string }[]>([])

const changeClass = (value: { grade: string; class: string }) => {
  getInfo(value.class)
  classTitle.value = value.class
}

onMounted(() => {
  getInfo()
  getGrade()
  gradeLoading.value = false
  classLoading.value = false
})
onUnmounted(() => {
  loading.value = true
  gradeLoading.value = true
  classLoading.value = true
  tableLoading.value = true
})
</script>
