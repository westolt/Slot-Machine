import { useRef, useEffect } from "react"
import spinService from "./services/spin"
import { initSlotMachine } from "./pixi/app"
import { spinReels } from "./pixi/app"
import './App.css'

function App () {
  const pixiContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pixiContainer.current) {
      initSlotMachine(pixiContainer.current)
    }
  }, [])

  const handleClick = async () => {
    const res = await spinService.spin();
    spinReels(res.outcome)
  }

  return (
    <div className='screen'>
      <p className='title'>Slot Machine</p>

      <div className='pixi-container' ref={pixiContainer}/>

      <div className='button-row'>
        <button className='spin-button' onClick={handleClick}>
          Spin
        </button>
      </div>
    </div>
  )
};

export default App