import * as React from 'react'
import { cn } from './utils'
export function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default'|'secondary' }) {
  const styles = variant === 'default' ? 'bg-black text-white' : 'bg-gray-200 text-gray-900'
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', styles, className)} {...props} />
}
