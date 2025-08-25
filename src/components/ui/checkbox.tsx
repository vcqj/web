import * as React from 'react'
export function Checkbox({ checked, onCheckedChange }: { checked?: boolean; onCheckedChange?: () => void }) {
  return (
    <button onClick={onCheckedChange} aria-pressed={checked} className={`h-5 w-5 rounded border flex items-center justify-center ${checked ? 'bg-black text-white' : 'bg-white'} `}>
      {checked ? '✓' : ''}
    </button>
  )
}
