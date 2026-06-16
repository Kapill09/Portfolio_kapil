export type MascotState = 'idle' | 'wave' | 'point' | 'sunglasses' | 'fall'

export type MascotAnimation = {
  name: string
  duration: number
  loop: boolean
}
