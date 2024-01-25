import Version from './Version.js'
import YamlReader from './YamlReader.js'
import Render from './Render.js'
import { join } from 'path'
const pluginName = 'Shiranai-Plugin'
const pluginPath = join(process.cwd(), 'plugin', pluginName)
export {
    Version,
    pluginName,
    pluginPath,
    YamlReader,
    Render
}