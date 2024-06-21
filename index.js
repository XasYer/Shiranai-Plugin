import { Version } from '#components'
import { logger } from '#lib'

logger.info('-----------------')
logger.info(`${Version.pluginName}${Version.version}初始化~`)
logger.info('-------^_^-------')

export * from './apps/index.js'
