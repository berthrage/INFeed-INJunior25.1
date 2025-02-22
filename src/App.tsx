import Feed from './components/Feed'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import './styles/globals.css'

function App() {

  return (
    <>
      <Header></Header>
      <main>
        <Sidebar></Sidebar>
        <Feed></Feed>
      </main>
    </>
  )
}

export default App
