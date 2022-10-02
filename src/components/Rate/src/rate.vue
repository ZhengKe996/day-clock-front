<template>
  <div class="w-full xl:w-[1024px] h-full mx-auto">
    <div class="mt-2 text-center font-mono text-base antialiased font-medium tracking-widest align-middle divide-y-2 divide-opacity-40 divide-dotted">
      <div class="text-3xl font-bold leading-normal">
        物联网技术学院<br />
        每日健康监测打卡率
        <span class="text-xl" v-if="!isMobileTerminal" @click="onClick">查看详情</span>
      </div>

      <div class="tracking-wider flex-1">
        数据更新时间: {{ time }}
        <span class="ml-2" v-if="isMobileTerminal" @click="onClick">查看详情</span>
      </div>
    </div>
    <div id="container" class="w-full mx-auto top-0 left-auto"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { Chart } from '@antv/g2'
import { useRouter } from 'vue-router'
import { Rate } from '@/constants'
import { isMobileTerminal } from '@/utils/flexible'

const { rateList, time } = defineProps<{ rateList: Rate[]; time: string }>()
const ratebox = ref(null)
const keepTwoDecimalWithReg = (num: number) => {
  return Number((num * 100).toString().match(/^\d+(?:\.\d{0,2})?/))
}

// 获取窗口宽度与高度 响应式
const { height } = useWindowSize()

const router = useRouter()

const onClick = () => router.push({ path: '/detial' })

async function init() {
  const chart = new Chart({
    container: 'container',
    autoFit: true,
    height: height.value * 0.95,
    padding: [10, 70, 50, 100]
  })
  chart.coordinate().transpose()

  chart.data(rateList)

  // 动画
  chart.animate(true)

  // 坐标系
  chart.axis('class', {
    title: null,
    tickLine: null,
    line: null
  })

  chart.scale({
    rate: {
      max: 1,
      min: 0,
      alias: '打卡率',
      formatter: (val) => {
        return +keepTwoDecimalWithReg(val) + '%'
      }
    },
    class: {
      alias: '班级'
    }
  })

  chart.axis('rate', {})
  chart.tooltip({
    showTitle: false,
    crosshairs: {
      type: 'xy'
    }
  })

  chart.interaction('element-active')

  chart.legend(false)
  chart
    .interval({
      background: {
        style: {
          radius: 4
        }
      }
    })
    .label('rate', (val) => {
      return {
        content: +keepTwoDecimalWithReg(val) + '%',
        style: {
          fill: val === 1 ? 'green' : 'red'
        },
        offsetX: 5
      }
    })
    .position(['class', 'rate'])
    .color('rate', (val) => {
      if (val === 1) return '#67C23A'
      if (val >= 0.8) return '#409EFF'
      if (val >= 0.6) return '#E6A23C'
      return '#F56C6C'
    })
    .tooltip('class*rate')

  chart.render()
}
onMounted(() => init())
</script>
