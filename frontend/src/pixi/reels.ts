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

   let speed = 0
   let elapsed = 0;
   const timerDuration = 3;
   let spinning = false

   function setResult(result: GameSymbol[]) {
        console.log("Should be: ", result)
        finalResult = result
        
        for (let i = 0; i < reelContainers.length; i++) {
            reelContainers[i].removeChildren()
            reelContainers[i].y = 0

            const symbolSet: GameSymbol[] = setRandomSymbols()
            symbolSet.splice(-1, 0, finalResult[i])

            for (let j = 0; j < symbolSet.length; j++) {

                const symbol = createSymbol(symbolSet[j], textures)

                symbol.x = 150 + i * 200
                symbol.y = 180 - j * 150
                symbol.height = 200
                symbol.width = 200

                reelContainers[i].addChild(symbol)   
            }
        }
        spin()
   }

   function setRandomSymbols() {
        const list = [] 
        for (let i = 0; i < 13; i++){
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

            for (let i = 0; i < weights.length; i++) {
                compare += weights[i]
                if (result < compare) {
                    list.push(symbols[i])
                    break
                }
            }
        }
        return list
    }

   function spin() {
        speed = 10
        spinning = true
    }

    function stop() {
        spinning = false
        speed = 0
    }

    app.ticker.add((ticker) => {
        if (!spinning) return

        elapsed += ticker.deltaMS

        reelContainers.forEach((reel) => {
            reel.y += speed * ticker.deltaTime
        })

        if (elapsed >= timerDuration * 1000) {
            stop()
            elapsed = 0
        }
    })

   return{
    container,
    setResult
   }
}