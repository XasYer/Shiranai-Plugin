import { Version } from '../components/index.js'
import { join } from 'path'

function scale (pct = 1) {
  let scale = Math.min(2, Math.max(0.5, 100 / 100))
  pct = pct * scale
  return `style=transform:scale(${pct})`
}

const Render = {
  async render (path, params, cfg = { retType: 'default' }) {
    let { e } = cfg
    if (!e.runtime) {
      console.log('未找到e.runtime，请升级至最新版Yunzai')
    }

    let BotName = Version.isTrss ? 'Trss-Yunzai' : Version.isMiao ? 'Miao-Yunzai' : 'Yunzai-Bot'
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
        let resPath = data.pluResPath
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
          copyright: `Created By ${BotName}<span class="version">${Version.yunzai}</span>${pluginName}</span>`,
          pageGotoParams: {
            waitUntil: 'networkidle2'
          }
        }
      }
    })
  }
}

export default Render
