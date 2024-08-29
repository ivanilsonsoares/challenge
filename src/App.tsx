import { useEffect, useState } from 'react'
import './App.scss'
import { Header } from './components/header/Header'
import GetCompanies from './core/services/getCompanies'
import Board from './components/board/Board'
import Loading from './components/loading/Loading'

function App() {
  const [companies, setCompanies] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState('');

  const handleGetCompanies = async () => {
    setIsLoading(true)
    try {
      const result = await GetCompanies(); 
      if(result) {
        setCompanies(result)
        setData(result[0].id)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  useEffect( () => {
    handleGetCompanies()
  }, [])

  
  const childToParent = (childdata: any) => {
    setData(childdata);
  }

  return (
    <>{
      isLoading ?
        <Loading/> :
        companies?.length !== 0 ?
        <div className="container">
          <Header key={1} companiesList={companies} data={childToParent}/>
          <Board data={data}/>
        </div>: <>Failed</>
    }
    </>
  )
}

export default App
