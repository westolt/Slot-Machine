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
   let finalResult: GameSymbol[] | undefined;
   const targets: number[] = []

   let speed = 0
   let elapsed = 0;
   const timerDuration = 3000;
   let spinning = false

   const stopped: boolean[] = [false, false, false]

   function setResult(result: GameSymbol[]) {
        console.log("Should be: ", result)
        finalResult = result
        
        for (let i = 0; i < reelContainers.length; i++) {
            reelContainers[i].removeChildren()
            reelContainers[i].y = 0
            const reelLength =  61 + 10 * i

            const symbolSet: GameSymbol[] = setRandomSymbols(reelLength)
            symbolSet.splice(-1, 0, finalResult[i])

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

   function setRandomSymbols(reelLength: number) {
        const list = [] 
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
        stopped.fill(false)
    }

    function stop() {
        spinning = false
        speed = 0
    }

    app.ticker.add((ticker) => {
        if (!spinning) return

        elapsed += ticker.deltaMS

        reelContainers.forEach((reel, i) => {
            if (stopped[i]) return

            reel.y += speed * ticker.deltaTime

            const delay = timerDuration + i * 500

            if (elapsed >= delay) {
                reel.y = targets[i]
                stopped[i] = true
            }
        })

        if (elapsed >= timerDuration + 1000) {
            stop()
            elapsed = 0
        }
    })

   return{
    container,
    setResult
   }
}