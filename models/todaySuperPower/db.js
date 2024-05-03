import Level from '../db/level.js'
import { join } from 'node:path'
import { Version } from '../../components/index.js'

const path = join(Version.pluginPath, 'models', 'todaySuperPower', 'db')

const db = new Level(path)
await db.open()

export default db
