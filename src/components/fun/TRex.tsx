import { useEffect, useRef, RefObject } from 'react'
import useEventStore from '../../store/useEventStore'

const FRAME_1 = `
█▀▀▀▄
█░░░░█▄▄
▀▀▀▀▀░░░█
██████▄▄▄▀
`

const FRAME_2 = `
█▀▀▀▄
█░░░░█▄▄
▀▀▀▀▀░░░█
██████▄▄▄▀
`

// Pixel art frames as CSS box-shadow pixel art
const PIXELS_1 = [
  // Head
  [2,0],[3,0],[4,0],
  [1,1],[2,1],[3,1],[4,1],[5,1],
  [1,2],[2,2],[3,2],[4,2],
  [2,3],[3,3],[4,3],[5,3],[6,3],
  // Body
  [0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],
  [0,5],[1,5],[2,5],[3,5],[4,5],[5,5],
  [1,6],[2,6],[3,6],[4,6],
  [2,7],[3,7],
  // Legs frame 1
  [2,8],[3,8],
  [2,9],[4,9],
]

const PIXELS_2 = [
  // Head
  [2,0],[3,0],[4,0],
  [1,1],[2,1],[3,1],[4,1],[5,1],
  [1,2],[2,2],[3,2],[4,2],
  [2,3],[3,3],[4,3],[5,3],[6,3],
  // Body
  [0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],
  [0,5],[1,5],[2,5],[3,5],[4,5],[5,5],
  [1,6],[2,6],[3,6],[4,6],
  [2,7],[3,7],
  // Legs frame 2
  [1,8],[3,8],
  [1,9],[3,9],
]

const PIXEL_SIZE = 4

function makeBoxShadow(pixels: number[][], color: string) {
  return pixels
    .map(([x, y]) => `${x * PIXEL_SIZE}px ${y * PIXEL_SIZE}px 0 ${color}`)
    .join(', ')
}

// Keep FRAME_1 and FRAME_2 references to avoid unused var warning
void FRAME_1; void FRAME_2;

interface TRexProps {
  areaRef: RefObject<HTMLDivElement | null>
}

const TRex = ({ areaRef }: TRexProps) => {
  const showTRex = useEventStore((s) => s.showTRex)
  const canvasRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef({
    x: 30,
    y: 30,
    vx: 1.5,
    vy: 0,
    frame: 0,
    tick: 0,
    jumpCooldown: 0,
    rafId: 0,
  })

  useEffect(() => {
    if (!showTRex) return
    const s = stateRef.current
    const DINO_W = 7 * PIXEL_SIZE
    const DINO_H = 10 * PIXEL_SIZE

    const animate = () => {
      const area = areaRef.current
      const el = canvasRef.current
      if (!area || !el) {
        s.rafId = requestAnimationFrame(animate)
        return
      }

      const areaW = area.clientWidth - DINO_W
      const areaH = area.clientHeight - DINO_H

      s.tick++
      if (s.tick % 8 === 0) s.frame = s.frame === 0 ? 1 : 0

      // Random jump
      s.jumpCooldown--
      if (s.jumpCooldown <= 0 && s.vy === 0 && Math.random() < 0.01) {
        s.vy = -3.5
        s.jumpCooldown = 80
      }

      // Gravity
      s.vy += 0.18
      s.y += s.vy
      s.x += s.vx

      // Ground clamp
      if (s.y >= areaH) {
        s.y = areaH
        s.vy = 0
      }
      if (s.y < 0) {
        s.y = 0
        s.vy = 0
      }

      // Wall bounce
      if (s.x <= 0) {
        s.x = 0
        s.vx = Math.abs(s.vx)
      }
      if (s.x >= areaW) {
        s.x = areaW
        s.vx = -Math.abs(s.vx)
      }

      const pixels = s.frame === 0 ? PIXELS_1 : PIXELS_2
      const color = '#22c55e'
      el.style.transform = `translate(${s.x}px, ${s.y}px) scaleX(${s.vx >= 0 ? 1 : -1})`
      el.style.boxShadow = makeBoxShadow(pixels, color)

      s.rafId = requestAnimationFrame(animate)
    }

    s.rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(s.rafId)
  }, [showTRex, areaRef])

  if (!showTRex) return null

  return (
    <div
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: PIXEL_SIZE,
        height: PIXEL_SIZE,
        pointerEvents: 'none',
        zIndex: 10,
        transformOrigin: 'top left',
      }}
    />
  )
}

export default TRex
