import { Container } from "pixi.js";
import { createSymbol } from "./symbols";
import type { GameSymbol } from "../../../shared/types";
import type { Texture, Sprite, Application } from "pixi.js"

type Textures = {
    star: Texture
    cherry: Texture
    question: Texture
}

export function createReels(app: Application, textures: Textures) {
   const container = new Container()

   let currentSymbols: Sprite[] = []
   let speed = 0
   let elapsed = 0;
   const timerDuration = 3;
   let spinning = false

   function setResult(result: GameSymbol[]) {
    currentSymbols.forEach(s => container.removeChild(s))
    currentSymbols = []
    result.forEach((symbolType, index) => {
        spin()
        const symbol = createSymbol(symbolType, textures)

        symbol.x = 150 + index * 200
        symbol.y = 180
        symbol.height = 200
        symbol.width = 200

        container.addChild(symbol)
        currentSymbols.push(symbol)
    })
   }

   function spin() {
        speed = 20
        spinning = true
    }

    function stop() {
        spinning = false
        speed = 0
    }

    app.ticker.add((ticker) => {
        if (!spinning) return
        elapsed += ticker.deltaMS;

        const seconds = Math.floor(elapsed / 1000);

        container.y += speed * ticker.deltaTime

        if (seconds >= timerDuration) {
            stop();
            container.y = 0
            elapsed = 0
        }
    })

   return{
    container,
    setResult
   }
}