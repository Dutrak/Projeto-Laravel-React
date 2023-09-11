
import './App.css'
import { SignUp } from './components/SignUp'
import Lista from './components/Lista'

export function Root() {

  return (
    <div className='flex flex-row justify-center'>
      <SignUp />
      <Lista />
    </div>
  )
}

export default Root