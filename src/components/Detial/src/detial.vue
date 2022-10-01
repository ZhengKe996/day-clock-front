<template>
  <div class="w-full">
    <div class="mt-2 text-center font-mono text-base antialiased font-medium tracking-widest align-middle divide-y-2 divide-opacity-40 divide-dotted">
      <div class="text-3xl font-bold leading-normal">
        物联网技术学院<br />
        每日健康监测数据详情
        <span class="text-xl" v-if="!isMobileTerminal" @click="onClick">返回</span>
      </div>
      <div class="tracking-wider flex-1">数据更新时间: {{ time }} <span class="ml-2" v-if="isMobileTerminal" @click="onClick">返回</span></div>
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
      <div>
        <a-table :dataSource="dataSource" :columns="!isMobileTerminal ? columns : columnsMobile" :pagination="!isMobileTerminal" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Detail } from '@/constants'
import type { TableColumnType } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import { isMobileTerminal } from '@/utils/flexible'

type TableDataType = {
  grade: string
  class: string
  name: string
  progress: string
}

const { originalClassList, time, gradeList } = defineProps<{ dataSource: Detail[]; originalClassList: { grade: string; class: string }[]; time: string; gradeList: string[] }>()

const emits = defineEmits(['changeClass'])
const router = useRouter()
const onClick = () => router.push('/main')

const gradeLoading = ref(true)
const gradeTitle = ref('请选择年级')

const changeGrade = (value: any) => {
  gradeTitle.value = value
  classList.value = originalClassList.filter((item) => item.grade === value)
  classTitle.value = '请选择班级'
}

const classLoading = ref(true)
const classTitle = ref('请选择班级')
const classList = ref<{ grade: string; class: string }[]>([])

const changeClass = (value: { grade: string; class: string }) => {
  emits('changeClass', value.class)
  classTitle.value = value.class
}

const columns: TableColumnType<TableDataType>[] = [
  {
    title: '年级',
    dataIndex: 'grade',
    key: 'grade'
  },
  {
    title: '班级',
    dataIndex: 'class',
    key: 'class'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '状态',
    dataIndex: 'progress',
    key: 'progress'
  }
]

const columnsMobile: TableColumnType<TableDataType>[] = [
  {
    title: '班级',
    dataIndex: 'class',
    key: 'class'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '状态',
    dataIndex: 'progress',
    key: 'progress'
  }
]
onMounted(() => {
  gradeLoading.value = false
  classLoading.value = false
})
</script>
