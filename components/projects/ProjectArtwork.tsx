import Image from 'next/image'

// Use project cover images for folder previews so they match project fronts.
export function RemixArtwork() {
  return (
    <div className="relative h-full w-full bg-white">
      <Image src="/images/billify/billify.png" alt="Billify preview" fill className="object-cover" priority />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/30" />
    </div>
  )
}

export function DashboardArtwork() {
  return (
    <div className="relative h-full w-full bg-white">
      <Image src="/images/phalfresh/PhalPoster.png" alt="PhalFresh preview" fill className="object-cover" priority />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/30" />
    </div>
  )
}

export function NatureArtwork() {
  return (
    <div className="relative h-full w-full bg-white">
      <Image src="/images/healthcare/Health1.png" alt="Healthcare preview" fill className="object-cover" priority />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/30" />
    </div>
  )
}

