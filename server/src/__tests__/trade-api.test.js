import { apiHelper } from './api-helper'
import path from 'path'
import { throws } from 'smid'
import { initailSetup } from '../utils/file'

const INPUT_SOURCE_PATH = path.join(__dirname, '../data', 'INPUT_SOURCE.txt')
const INPUT_PATH = path.join(__dirname, '../data', 'INPUT.txt')

describe('trade API', () => {

  it('can get trade', async () => {
    const api = await apiHelper()
    await initailSetup(INPUT_SOURCE_PATH, INPUT_PATH)
    let gotten = ''

    gotten = await api.getTrade()
    expect(gotten.message).toEqual('S\t550\t100')

    gotten = await api.getTrade()
    expect(gotten.message).toEqual('B\t540\t100')

    gotten = await api.getTrade()
    expect(gotten.message).toEqual('S\t549\t40')

    gotten = await api.getTrade()
    expect(gotten.message).toEqual('B\t541\t100')

    try {
      while(gotten.message) {
        gotten = await api.getTrade()
      }
    } catch(err) {
    }

  })

  it('can not get trade', async () => {
    const api = await apiHelper()

    const { response } = await throws(api.getTrade())
    expect(response.status).toBe(404)
  })
})
