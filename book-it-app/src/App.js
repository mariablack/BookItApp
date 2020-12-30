import React from 'react'
import { AuthProvider, useAuthState } from "./context/auth-context"
import LoginPage from "./containers/LoginPage"

function Footer() {
  return <p>This is an awesome app!</p>
}

function Header() {
  const { user } = useAuthState()
  return <p>Hello {user.username}</p>
}

function Content() {
  const { user } = useAuthState()
  return <p>I am so happy to have you here {user.username}.</p>
}

function UnauthenticatedHeader() {
  return <p>Please login</p>
}

function UnauthenticatedContent() {
  return <p>You must login to read the message</p>
}


function UnauthenticatedApp() {
  return (
    <>
      <UnauthenticatedHeader />
      <UnauthenticatedContent />
    </>
  )
}

function AuthenticatedApp() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  )
}

function Home() {
  const { user } = useAuthState()
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}


function App ()  {

  const [login, setLogin] = React.useState(false)

  const clickMe = () => {
    setLogin(true)
  }

  return (
    <AuthProvider>
      <div>
        <h1>Hello there</h1>
        <p>Welcome to my app...</p>
        <button onClick={clickMe}>Click me</button>
        {login ? <Home /> : <div>Please log in!</div> }
      </div>
    </AuthProvider>
  )
}

export default App
