import { Container } from "pixi.js";
import { createSymbol } from "./symbols";
import type { GameSymbol } from "../../../shared/types";
import type { Texture, Application } from "pixi.js"

type Textures = {
    star: Texture
    cherry: Texture
    question: Texture
}

export function createReels(app: Application, textures: Textures) {
   const container = new Container()
   const reelContainers: Container[] = []

   const first = new Container()
   const second = new Container()
   const third = new Container()

   reelContainers.push(first, second, third)
   reelContainers.forEach(reel => container.addChild(reel))

   const targets: number[] = []

   let speed = 0
   let elapsed = 0;
   const timerDuration = 3000;
   let spinning = false

   const velocities: number[] = [0, 0, 0]

   function setResult(result: GameSymbol[]) {
        
        for (let i = 0; i < reelContainers.length; i++) {
            reelContainers[i].removeChildren()
            reelContainers[i].y = 0
            const reelLength =  61 + 10 * i

            const symbolSet: GameSymbol[] = setRandomSymbols(reelLength)
            symbolSet.splice(-1, 0, result[i])

            const stopIndex = symbolSet.length - 0.8
            const symbolY = 180 - stopIndex * 150
            targets[i] = -symbolY

            for (let j = 0; j < symbolSet.length; j++) {

                const symbol = createSymbol(symbolSet[j], textures)

                symbol.x = 150 + i * 200
                symbol.y = 180 - j * 150
                symbol.height = 150
                symbol.width = 150

                reelContainers[i].addChild(symbol)   
            }
        }
        spin()
   }

   function setRandomSymbols(reelLength: number): GameSymbol[] {
        const list: GameSymbol[] = [] 
        for (let i = 0; i < reelLength; i++){
            const symbolsObject: Record<GameSymbol, number> = {
                'S': 30,
                'C': 40,
                'Q': 30,
            }
            const symbols = Object.keys(symbolsObject) as GameSymbol[]
            const weights = Object.values(symbolsObject);
            const sum = weights.reduce((a, b) => a + b, 0)
            const result = Math.random() * sum;

            let compare = 0

            for (let j = 0; j < weights.length; j++) {
                compare += weights[j]
                if (result < compare) {
                    list.push(symbols[j])
                    break
                }
            }
        }
        return list
    }

   function spin() {
        speed = 50
        spinning = true
        elapsed = 0
    }

    function stop() {
        spinning = false
        speed = 0
    }

    function spring(x: number, v: number, target: number): { x: number, v: number } {
        const k = 0.1
        const damping = 0.9

        const force = (target - x) * k
        v += force
        v *= damping

        x += v

        return {x, v}
    }

    app.ticker.add((ticker) => {
        if (!spinning) return

        elapsed += ticker.deltaMS

        reelContainers.forEach((reel, i) => {

            const delay = timerDuration + i * 500

            if (elapsed < delay) {
                reel.y += speed * ticker.deltaTime
            } else {

               if (elapsed >= delay && elapsed < delay + ticker.deltaMS) {
                    velocities[i] = speed
                }

                const result = spring(reel.y, velocities[i], targets[i])
                reel.y = result.x
                velocities[i] = result.v
            }
        })

        if (elapsed >= timerDuration + 2000) {
            stop()
            elapsed = 0
        }
    })

   return{
    container,
    setResult
   }
}