import Level from '../db/level.js'
import { join } from 'node:path'
import { Version } from '#components'
import { moveFileOrFolder, mkdirSync } from '../common.js'

mkdirSync('data', 'db', 'level')

const path = join(Version.pluginPath, 'data', 'db', 'level', 'todaySuperPower')

moveFileOrFolder(join(Version.pluginPath, 'models', 'todaySuperPower', 'db'), path)

const db = new Level(path)
await db.open()

export default db
