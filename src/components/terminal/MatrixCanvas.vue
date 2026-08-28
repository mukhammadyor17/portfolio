<template>
  <canvas ref="canvasEl" class="mx-canvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { themes } from '../../data/themes'

const emit = defineEmits<{ (e: 'finish'): void; (e: 'done'): void }>()

const canvasEl = ref<HTMLCanvasElement | null>(null)
let timerId: ReturnType<typeof setInterval> | undefined
let finishTimeoutId: ReturnType<typeof setTimeout> | undefined
let removeTimeoutId: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  const cv = canvasEl.value
  if (!cv) return
  const parent = cv.parentElement
  cv.width = parent?.clientWidth ?? 0
  cv.height = parent?.clientHeight ?? 0

  const ctx = cv.getContext('2d')
  if (!ctx) return

  const rootStyle = getComputedStyle(document.documentElement)
  const green = rootStyle.getPropertyValue('--term-green').trim() || themes.classic.green
  const bg = rootStyle.getPropertyValue('--term-bg').trim() || themes.classic.bg

  const fs = 16
  const cols = Math.floor(cv.width / fs)
  const drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -30))
  const chars = 'アイウエオカキクケコサシスセソ0123456789TURSKHANOV<>/={};'

  ctx.fillStyle = bg
  ctx.fillRect(0, 0, cv.width, cv.height)

  timerId = setInterval(() => {
    ctx.fillStyle = 'rgba(0,0,0,0.08)'
    ctx.fillRect(0, 0, cv.width, cv.height)
    ctx.fillStyle = green
    ctx.font = `${fs}px monospace`
    drops.forEach((y, x) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x * fs, y * fs)
      drops[x] = y * fs > cv.height && Math.random() > 0.975 ? 0 : y + 1
    })
  }, 50)

  finishTimeoutId = setTimeout(() => {
    if (timerId) clearInterval(timerId)
    timerId = undefined
    cv.style.transition = 'opacity .8s'
    cv.style.opacity = '0'
    emit('finish')
    removeTimeoutId = setTimeout(() => emit('done'), 850)
  }, 4200)
})

onUnmounted(() => {
  if (timerId) clearInterval(timerId)
  if (finishTimeoutId) clearTimeout(finishTimeoutId)
  if (removeTimeoutId) clearTimeout(removeTimeoutId)
})
</script>

<style scoped>
.mx-canvas {
  position: absolute;
  inset: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
}
</style>
