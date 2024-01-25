import { Version, pluginPath, pluginName } from '../components/index.js'
import { join } from 'path'

function scale(pct = 1) {
  let scale = Math.min(2, Math.max(0.5, 100 / 100))
  pct = pct * scale
  return `style=transform:scale(${pct})`
}

const Render = {
  async render(path, params, cfg = { retType: 'default' }) {
    let { e } = cfg
    if (!e.runtime) {
      console.log('未找到e.runtime，请升级至最新版Yunzai')
    }

    let BotName = Version.isTrss ? 'Trss-Yunzai' : Version.isMiao ? 'Miao-Yunzai' : 'Yunzai-Bot'
    return e.runtime.render(pluginName, path, params, {
      retType: cfg.retType,
      beforeRender({ data }) {
        let plugin_name = ''
        if (data.plugin_name !== false) {
          plugin_name = ` & ${data.plugin_name || pluginName}`
          if (data.pluginVersion !== false) {
            plugin_name += `<span class="version">${data.pluginVersion || Version.version}`
          }
        }
        let resPath = data.pluResPath
        const layoutPath = join(pluginPath, 'resources', 'common', 'layout')
        return {
          ...data,
          _res_path: resPath,
          _ws_path: resPath,
          _layout_path: layoutPath,
          _tpl_path: join(pluginPath, 'resources', 'common', 'tpl'),
          defaultLayout: layoutPath + 'default.html',
          elemLayout: layoutPath + 'elem.html',
          sys: {
            scale: scale(cfg.scale || 1)
          },
          copyright: `Created By ${BotName}<span class="version">${Version.yunzai}</span>${plugin_name}</span>`,
          pageGotoParams: {
            waitUntil: 'networkidle2'
          }
        }
      }
    })
  }
}

export default Render
