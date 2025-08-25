import { Badge } from './ui/badge'
export default function RoleBadge({ role }: { role: 'USER' | 'ADMIN' | string }) {
  const variant = role === 'ADMIN' ? 'default' : 'secondary'
  return <Badge variant={variant}>{role}</Badge>
}
