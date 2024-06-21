import { Version } from '#components'

/**
 * 获取群成员信息
 * @param {Object} e 事件对象
 * @param {string|number} groupId 群ID
 * @param {string|number} userId 用户ID
 * @returns
 */
export async function getGroupMemberInfo (e, groupId = e.group_id, userId = e.user_id) {
  try {
    switch (Version.BotName) {
      case 'Karin':
        return await e.bot.GetGroupMemberInfo?.({ group_id: groupId, target_uin: userId })
      default:
        return await e.bot.pickMember(e.group_id, e.at).getInfo()
    }
  } catch (error) {
    return {}
  }
}
