<template>
  <div v-if="loading" class="w-full h-screen flex justify-center items-center">
    <a-spin size="large" tip="Loading..." :delay="200" />
  </div>
  <template v-else> <a-table :dataSource="dataSource" :columns="!isMobileTerminal ? columns : columnsMobile" :pagination="!isMobileTerminal" :size="isMobileTerminal ? 'middle' : ''" /> </template>
</template>

<script setup lang="ts">
import { Detail } from '@/constants'
import type { TableColumnType } from 'ant-design-vue'
import { isMobileTerminal } from '@/utils/flexible'

type TableDataType = {
  grade: string
  class: string
  name: string
  progress: string
}

defineProps<{ dataSource: Detail[]; loading: boolean }>()

const columns: TableColumnType<TableDataType>[] = [
  {
    title: '年级',
    dataIndex: 'grade',
    key: 'grade',
    align: 'center'
  },
  {
    title: '班级',
    dataIndex: 'class',
    key: 'class',
    align: 'center'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'progress',
    key: 'progress',
    align: 'center'
  }
]

const columnsMobile: TableColumnType<TableDataType>[] = [
  {
    title: '班级',
    dataIndex: 'class',
    key: 'class',
    align: 'left',
    ellipsis: true
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: 100
  },
  {
    title: '状态',
    dataIndex: 'progress',
    key: 'progress',
    align: 'center',
    width: 100
  }
]
</script>
