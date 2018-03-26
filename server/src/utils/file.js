import fs from 'fs'

export function initailSetup(TEST_INPUT_SOURCE_PATH, TEST_INPUT_PATH) {
  return new Promise((resolve, reject) => {
    fs.stat(TEST_INPUT_PATH, async (err) => {
      if(err) {
        await makeInputFile(TEST_INPUT_SOURCE_PATH, TEST_INPUT_PATH)
        return reject(err)
      }

      fs.unlink(TEST_INPUT_PATH, async (err) => {
        if(err) return reject(err)
        await makeInputFile(TEST_INPUT_SOURCE_PATH, TEST_INPUT_PATH)
        return resolve()
      });

    })
  })
}

function makeInputFile(TEST_INPUT_SOURCE_PATH, TEST_INPUT_PATH) {
  return new Promise((resolve, reject) => {
    const fd = fs.createReadStream(TEST_INPUT_SOURCE_PATH)
    fd.on('end', () => resolve())

    fd.pipe(fs.createWriteStream(TEST_INPUT_PATH))
  })
}