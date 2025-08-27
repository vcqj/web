import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import TodoItem from '../components/TodoItem'
import { useNavigate } from 'react-router-dom'

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) { id text done createdAt createdBy }
  }
`

export default function TodoPage({ me, todos, refetch }: any) {
  const [text, setText] = useState('')
  const [addTodo, { loading }] = useMutation(ADD_TODO)
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    await addTodo({ variables: { text } })
    setText('')
    refetch()
  }

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={submit} className="flex gap-2 mb-4">
          <Input placeholder="Add a todo…" value={text} onChange={(e) => setText(e.target.value)} />
          <Button type="submit" disabled={loading || !text.trim()}>Add</Button>
        </form>
        <div className="grid gap-2">
          {todos.map((t: any) => (<TodoItem key={t.id} todo={t} isAdmin={me.role === 'ADMIN'} onChanged={refetch} />))}
          {todos.length === 0 && (<div className="text-sm text-gray-500">No items yet.</div>)}
        {me.role === 'ADMIN' && (
          <div className='pt-3 text-right'> 
            <Button><a href="/dashboards">View admin logs</a></Button>
          </div>
        )}
        </div>
      </CardContent>
    </Card>
  )
}
