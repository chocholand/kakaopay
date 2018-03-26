import fs from 'fs'
import path from 'path'

/**
 * read file INPUT.docs
 */
export default function createTradeStore(logger) {

  return {
    async getRecent(filePath) {
      logger.debug('Getting recent trade')
      const line = await getFirstLine(filePath)

      if (!line) {
        return null
      }
      return line
    }
  }
}

function getFirstLine(path) {
  return new Promise((resolve, reject) => {
    const rs = fs.createReadStream(path)
    let acc = ''
    let pos = 0
    let index

    rs
      .on('data', (chunk) => {
        index = chunk.indexOf('\n')
        acc += chunk
        index !== -1 ? rs.close() : pos += chunk.length
      })
      .on('close', () => {
        fs.writeFileSync(path, acc.slice(pos + index + 1))
        resolve(acc.slice(0, pos + index + 1).replace('\n', ''))
      })
      .on('error', (err) => {
        reject(err);
      })
  })
}
