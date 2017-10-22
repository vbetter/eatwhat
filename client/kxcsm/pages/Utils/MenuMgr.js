
var ConfigMgr = require('ConfigMgr.js')

module.exports = {
  GetRandomItem:GetRandomItem,
  SetItemType: SetItemType,
  GetFastFoods: GetFastFoods,
  GetItemType: GetItemType,
}

var m_itemTpey = 0;//当前菜单类型，0：快餐，1：下午茶

var m_fastFood = ConfigMgr.FindItemByType(0);

var m_AfternoonTea = ConfigMgr.FindItemByType(1); 

var m_indexArray = new Array();//当前类型的索引列表，防止重复推荐

function SetItemType(itemType) {
  m_itemTpey = itemType;

  ResetIndexList();
}

function GetFastFoods()
{
  return m_fastFood;
}

function GetItemType()
{
  return m_itemTpey;
}

function ResetIndexList() {
  var datalist = GetDataList(m_itemTpey);

  m_indexArray.splice(0, m_indexArray.length);

  for (let i = 0; i < datalist.length; i++) {
    m_indexArray.push(i);
  }

  console.log("ResetIndexList");
}

function RemoveIndexList(index) {
  m_indexArray.splice(index, 1);

  console.log("RemoveIndexList:" + index);
}

//获取菜单池
function GetDataList(itemType) {
  var datalist;

  if (itemType == '0') {
    datalist = m_fastFood;
  } else if (itemType == '1') {
    datalist = m_AfternoonTea;
  }
  return datalist;
}

//获取一个随机的元素
function GetRandomItem() {
  if (m_indexArray.length == 0) {
    ResetIndexList();
  }
  var datalist = GetDataList(m_itemTpey);

  console.log("m_indexArray.length:" + m_indexArray.length);
  var randomIndex = GetRandomNum(0, m_indexArray.length - 1);
  console.log("randomIndex:" + randomIndex);
  var mt = datalist[m_indexArray[randomIndex]]

  //console.log("mt:",mt);
  //移除推荐了的元素
  RemoveIndexList(randomIndex)
  return mt;
}

function GetRandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}   
