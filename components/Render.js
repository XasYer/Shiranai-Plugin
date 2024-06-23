import { join } from 'path'
import { puppeteer } from '#lib'
import { Version } from '#components'

function scale (pct = 1) {
  const scale = Math.min(2, Math.max(0.5, 100 / 100))
  pct = pct * scale
  return `style=transform:scale(${pct})`
}

const Render = {
  async render (path, params, cfg = { retType: 'default' }) {
    const { e } = cfg
    if (!e.runtime) {
      console.log('未找到e.runtime，请升级至最新版Yunzai')
    }

    return e.runtime.render(Version.pluginName, path, params, {
      retType: cfg.retType,
      beforeRender ({ data }) {
        let pluginName = ''
        if (data.plugin_name !== false) {
          pluginName = ` & ${data.plugin_name || Version.pluginName}`
          if (data.pluginVersion !== false) {
            pluginName += `<span class="version">${data.pluginVersion || Version.version}`
          }
        }
        const resPath = data.pluResPath
        const layoutPath = join(Version.pluginPath, 'resources', 'common', 'layout')
        return {
          ...data,
          _res_path: resPath,
          _ws_path: resPath,
          _layout_path: layoutPath,
          _tpl_path: join(Version.pluginPath, 'resources', 'common', 'tpl'),
          defaultLayout: layoutPath + 'default.html',
          elemLayout: layoutPath + 'elem.html',
          sys: {
            scale: scale(cfg.scale || 1)
          },
          copyright: `Created By ${Version.BotName}<span class="version">${Version.BotVersion}</span>${pluginName}</span>`,
          pageGotoParams: {
            waitUntil: 'networkidle2'
          }
        }
      }
    })
  },
  async simpleRender (path, params) {
    path = path.replace(/.html$/, '')
    const data = {
      tplFile: `${Version.pluginPath}/resources/${path}.html`,
      pluResPath: `${Version.pluginPath}/resources/`,
      saveId: path.split('/').pop(),
      imgType: 'jpeg',
      ...params
    }
    return await puppeteer.screenshot(path, data)
  },
}

export default Render
