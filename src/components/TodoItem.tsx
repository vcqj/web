import { gql, useMutation } from '@apollo/client'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!, $done: Boolean!) {
    toggleTodo(id: $id, done: $done) { id done }
  }
`

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) { deleteTodo(id: $id) }
`

export default function TodoItem({ todo, isAdmin, onChanged }: any) {
  const [toggle] = useMutation(TOGGLE_TODO)
  const [del] = useMutation(DELETE_TODO)

  async function onToggle() {
    await toggle({ variables: { id: todo.id, done: !todo.done } })
    onChanged()
  }

  async function onDelete() {
    if (!confirm('Delete this todo?')) return
    await del({ variables: { id: todo.id } })
    onChanged()
  }

  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-3">
      <label className="flex items-center gap-3">
        <Checkbox checked={todo.done} onCheckedChange={onToggle} />
        <div>
          <div className={"text-sm " + (todo.done ? 'line-through text-gray-500' : '')}>{todo.text}</div>
          <div className="text-xs text-gray-400">by {todo.createdBy}</div>
        </div>
      </label>
      {isAdmin && (<Button variant="destructive" onClick={onDelete}>Delete</Button>)}
    </div>
  )
}
