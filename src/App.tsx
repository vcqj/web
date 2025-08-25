import { useQuery, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import TodoPage from './pages/TodoPage'
import { Button } from './components/ui/button'
import RoleBadge from './components/RoleBadge'
import { client } from './apollo'

const ME_AND_TODOS = gql`
  query MeAndTodos {
    me { username role }
    todos { id text done createdAt createdBy }
  }
`

export default function App() {
  const { data, loading, error, refetch } = useQuery(ME_AND_TODOS, { fetchPolicy: 'network-only', nextFetchPolicy: 'cache-first' })
  const navigate = useNavigate()

  if (loading) return <div className="p-6">Loading…</div>
  if (error) return <div className="p-6 text-red-600">Error: {error.message}</div>

  const me = data?.me
  if (!me) {
    localStorage.removeItem('token')
    navigate('/login', { replace: true })
    return null
  }

  const logout = async () => {
    localStorage.removeItem('token')
    await client.clearStore()
    navigate('/login', { replace: true })
  }

  return (
    <div className="mx-auto max-w-xl p-4">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Todo</h1>
          <RoleBadge role={me.role} />
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>Signed in as <strong>{me.username}</strong></span>
          <Button variant="secondary" onClick={logout}>Logout</Button>
        </div>
      </header>
      <TodoPage me={me} todos={data.todos} refetch={refetch} />
    </div>
  )
}
