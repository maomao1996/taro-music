/**
 * 找到并返回应项的索引
 * @param list list
 * @param music 查找对象
 */
export const findIndex = (list: any[], music: any) => {
  return list.findIndex(item => {
    return item.id === music.id
  })
}
