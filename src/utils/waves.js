/**
 *3D海洋效应与 Canvas2D
 * 您可以更改注释 "效果属性" 下的属性
 */

let size = 10
let up = true
setInterval(function() {
  if (up) {
    size += 10
    if (size >= 240) {
      up = false
    }
  } else {
    size -= 10
    if (size == 10) {
      up = true
    }
  }
}, 500)

// Init Context
const c = document.createElement('canvas').getContext('2d')
const postctx = document.body
  .appendChild(document.createElement('canvas'))
  .getContext('2d')
const canvas = c.canvas
const vertices = []

// Effect Properties
const vertexCount = 7000
const vertexSize = 3
const oceanWidth = 204
const oceanHeight = -100
const gridSize = 32
const waveSize = 16
const perspective = 100

// Common variables
const depth = (vertexCount / oceanWidth) * gridSize
let frame = 0
const { sin, cos, tan, PI } = Math

// Render loop
const loop = () => {
  const rad = (sin(frame / 100) * PI) / 20
  const rad2 = (sin(frame / 50) * PI) / 10
  frame++
  if (
    postctx.canvas.width !== postctx.canvas.offsetWidth ||
    postctx.canvas.height !== postctx.canvas.offsetHeight
  ) {
    postctx.canvas.width = canvas.width = postctx.canvas.offsetWidth
    postctx.canvas.height = canvas.height = postctx.canvas.offsetHeight
  }

  // 背景色
  c.fillStyle = 'hsla(200deg, 100%, 2%, 60%)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.save()
  c.translate(canvas.width / 2, canvas.height / 2)

  c.beginPath()
  vertices.forEach((vertex, i) => {
    const ni = i + oceanWidth
    let x = vertex[0] - (frame % (gridSize * 2))
    let z =
      vertex[2] - ((frame * 2) % gridSize) + (i % 2 === 0 ? gridSize / 2 : 0)
    const wave =
      cos(frame / 45 + x / 50) -
      sin(frame / 20 + z / 50) +
      sin(frame / 30 + (z * x) / 10000)
    let y = vertex[1] + wave * waveSize
    const a = Math.max(0, 1 - Math.sqrt(x ** 2 + z ** 2) / depth)
    let tx, ty, tz

    y -= oceanHeight

    // 动画坐标系
    // Transformation variables
    tx = x
    ty = y
    tz = z

    // Rotation Y
    tx = x * cos(rad) + z * sin(rad)
    tz = -x * sin(rad) + z * cos(rad)

    x = tx
    y = ty
    z = tz

    // Rotation Z
    tx = x * cos(rad) - y * sin(rad)
    ty = x * sin(rad) + y * cos(rad)

    x = tx
    y = ty
    z = tz

    // Rotation X

    ty = y * cos(rad2) - z * sin(rad2)
    tz = y * sin(rad2) + z * cos(rad2)

    x = tx
    y = ty
    z = tz

    x /= z / perspective
    y /= z / perspective

    if (a < 0.01) return
    if (z < 0) return

    c.globalAlpha = a
    // 粒子颜色
    c.fillStyle = `hsla(${size + wave * 20}deg, 100%, 50%, 100%)`
    c.fillRect(
      x - (a * vertexSize) / 2,
      y - (a * vertexSize) / 2,
      a * vertexSize,
      a * vertexSize
    )
    c.globalAlpha = 1
  })
  c.restore()

  // Post-processing
  postctx.drawImage(canvas, 0, 0)

  postctx.globalCompositeOperation = 'screen'
  postctx.filter = 'blur(16px)'
  postctx.drawImage(canvas, 0, 0)
  postctx.filter = 'blur(0)'
  postctx.globalCompositeOperation = 'source-over'

  requestAnimationFrame(loop)
}

// Generating dots
for (let i = 0; i < vertexCount; i++) {
  const x = i % oceanWidth
  const y = 0
  const z = (i / oceanWidth) >> 0
  const offset = oceanWidth / 2
  vertices.push([(-offset + x) * gridSize, y * gridSize, z * gridSize])
}

loop()
