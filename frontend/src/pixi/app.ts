import { Application, Assets } from 'pixi.js';
import type { Container } from "pixi.js"
import initScene from "./scene";
import { initDevtools } from '@pixi/devtools';

import starImg from "../assets/star.png";
import cherryImg from "../assets/cherry.png";
import questionImg from "../assets/question.png";
import backgroundImg from "../assets/background.png";
import borderImg from "../assets/border.png";
import type { GameSymbol } from '../../../shared/types';

type Reels = {
    container: Container
    setResult: (result: GameSymbol[]) => void
}

let app: Application | null = null;
let reels: Reels = null;

export async function initSlotMachine(container: HTMLElement) {
    if (app) return

    app = new Application()
    await app.init({
        background: "#262b36",
        resizeTo: container
    })

    initDevtools({ app })

    container.appendChild(app.canvas)

    const textures = {
        star: await Assets.load(starImg),
        cherry: await Assets.load(cherryImg),
        question: await Assets.load(questionImg),
        background: await Assets.load(backgroundImg),
        border: await Assets.load(borderImg)
    }

    reels = initScene(app, textures)
}

export function spinReels(result: GameSymbol[]) {
  if (!reels) return
  reels.setResult(result)
}