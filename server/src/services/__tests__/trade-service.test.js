import { throws } from 'smid'
import path from 'path'
import TradeService from '../trade-service'
import tradeStore from '../../stores/trade-store'
import { logger } from '../../lib/logger'
import { initailSetup } from '../../utils/file'

const TEST_INPUT_SOURCE_PATH = path.join(__dirname, 'TEST_INPUT_SOURCE.txt')
const TEST_INPUT_PATH = path.join(__dirname, 'TEST_INPUT.txt')

describe('TradeService', () => {

  describe('getRecent', () => {
    it('throws when not found', async () => {
      const { service } = await setup()

      expect(await service.getRecent(TEST_INPUT_PATH)).toEqual('S\t550\t100')
      expect(await service.getRecent(TEST_INPUT_PATH)).toEqual('B\t540\t100')
      expect(await service.getRecent(TEST_INPUT_PATH)).toEqual('S\t549\t40')
      expect(await service.getRecent(TEST_INPUT_PATH)).toEqual('B\t541\t100')

      expect((await throws(service.getRecent(TEST_INPUT_PATH))).message).toMatch(
        /not found/
      )

    })
  })
})

async function setup() {

  return await initailSetup(TEST_INPUT_SOURCE_PATH, TEST_INPUT_PATH)
    .then(() => {
      const store = {
        getRecent: jest.fn(tradeStore(logger).getRecent),
      }
      return Promise.resolve({ service: new TradeService(store) })
    })
}