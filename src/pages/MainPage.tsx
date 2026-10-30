import Header from '../components/Header'
import AddTask from '../components/ui/AddTask'
import Board from '../features/tasks/components/Board'
import Footer from '../components/Footer'
import useLocalStorage from '../hooks/useLocalStorage'
import ErrorBoundary from './ErrorBoundary'

function MainPage() {
  const [searchInput, setSearchInput] = useLocalStorage<string>(
    'searchInput',
    '',
  )
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-[#FEFDFB] shadow-xl">
        <Header searchInput={searchInput} setSearchInput={setSearchInput} />
        <AddTask />
        <ErrorBoundary>
          <Board searchInput={searchInput} />
        </ErrorBoundary>
        <Footer />
      </div>
    </div>
  )
}

export default MainPage
