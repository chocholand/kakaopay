import { createController } from 'awilix-koa'
import path from 'path'

const INPUT_PATH = path.join(__dirname, '../data', 'INPUT.txt')
const api = tradeService => ({
  getTrade: async ctx => ctx.body = await tradeService.getRecent(INPUT_PATH)
})

export default createController(api)
  .prefix('/trade')
  .get('', 'getTrade')
