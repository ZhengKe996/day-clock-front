<template>
  <div v-if="loading" class="w-full h-screen flex justify-center items-center">
    <a-spin size="large" tip="Loading..." :delay="200" />
  </div>
  <template v-else>
    <a-table :dataSource="dataSource" :columns="!isMobileTerminal ? columns : columnsMobile" :pagination="!isMobileTerminal" />
  </template>
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
</script>
