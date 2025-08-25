import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useState } from 'react'
import { client } from '../apollo'

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user { username role }
    }
  }
`

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, { loading, error }] = useMutation(LOGIN)
  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await login({ variables: { username, password } })
    const token = res.data?.login?.token
    if (token) {
      localStorage.setItem('token', token)
      await client.resetStore()
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3" onSubmit={onSubmit}>
            <label className="grid gap-1">
              <span className="text-sm text-gray-600">Username</span>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="user or admin" />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-gray-600">Password</span>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            </label>
            {error && <div className="text-sm text-red-600">{error.message}</div>}
            <Button type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</Button>
          </form>
          <p className="text-xs text-gray-500 mt-3">Demo users: <code>user/password</code> (USER) and <code>admin/admin</code> (ADMIN)</p>
        </CardContent>
        <CardFooter className="text-xs text-gray-500">GraphQL + JWT + shadcn/ui</CardFooter>
      </Card>
    </div>
  )
}
