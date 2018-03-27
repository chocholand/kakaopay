import { createController } from 'awilix-koa'
import path from 'path'
import { initailSetup } from '../utils/file'

const INPUT_SOURCE_PATH = path.join(__dirname, '../data', 'INPUT_SOURCE.txt')
const INPUT_PATH = path.join(__dirname, '../data', 'INPUT.txt')
const api = tradeService => ({
  getTrade: async ctx => ctx.body = await tradeService.getRecent(INPUT_PATH),
  initializeTrade: async ctx => {
    await initailSetup(INPUT_SOURCE_PATH, INPUT_PATH)
      .then(() => {
        ctx.body = 'ok'
        ctx.status = 200
      })
  }
})

export default createController(api)
  .prefix('/trade')
  .get('', 'getTrade')
  .post('', 'initializeTrade')
