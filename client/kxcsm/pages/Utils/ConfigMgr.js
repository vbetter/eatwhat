module.exports = {
  FindItemByID: FindItemByID,
  FindItemByType: FindItemByType,
}

//查找元素
function FindItemByID(itemid)
{
  for (let i = 0; i < m_data.length; i++) 
  {
    var item = m_data[i];
    if (item.id == itemid) {
      return item;
    }
  }
  return null;
}

//获取同类型的元素
function FindItemByType(itemType)
{
  var list =[];
  for (let i = 0; i < m_data.length; i++) {
    var item = m_data[i];
    if (item.type == itemType) {
      list.push(item);
    }
  }
  return list;
}

var m_data = 
  [
    {
      "id": 10000,
      "name": "三及第",
      "type": 0,
      "shopName": "未知",
      "describle": "三及第掩面,肉质不错 ",
      "price": 16,
      "baseScore": 8,
      "icon": "../res/img/fastfood/sanjidi_001.jpg",
      "phone": 18617020200,
      "address": "科兴科学园原味街"
    },
    {
      "id": 10001,
      "name": "上海混沌",
      "type": 0,
      "shopName": "未知",
      "describle": "我们家乡叫包面",
      "price": 35,
      "baseScore": 8,
      "icon": "../res/img/fastfood/hundun_001.jpg",
      "phone": 18617020200,
      "address": "科兴科学园原味街"
    },
    {
      "id": 10002,
      "name": "哈帝斯汉堡",
      "type": 0,
      "shopName": "未知",
      "describle": "很扎实的汉堡",
      "price": 18,
      "baseScore": 8,
      "icon": "../res/img/fastfood/hadisi_001.jpg",
      "phone": 18617020200,
      "address": "科兴科学园原味街"
    },
    {
      "id": 10003,
      "name": "罐罐面",
      "type": 0,
      "shopName": "未知",
      "describle": "老客户了，三鲜罐罐面",
      "price": 18,
      "baseScore": 8,
      "icon": "../res/img/fastfood/guanguanmian_001.jpg",
      "phone": 18617020200,
      "address": "科兴科学园原味街"
    },
    {
      "id": 10004,
      "name": "过桥米线",
      "type": 0,
      "shopName": "未知",
      "describle": "配菜很多，我超喜欢吃米线",
      "price": 20,
      "baseScore": 8,
      "icon": "../res/img/fastfood/guoqiaomixian_001.jpg",
      "phone": 18617020200,
      "address": "科兴科学园原味街"
    },
    {
      "id": 10005,
      "name": "奥尔良汉堡套餐",
      "type": 0,
      "shopName": "未知",
      "describle": "汉堡、薯条、可乐",
      "price": 18,
      "baseScore": 8,
      "icon": "../res/img/fastfood/kfc_001.jpg",
      "phone": 18617020200,
      "address": "科兴科学园原味街"
    },
    {
      "id": 10006,
      "name": "小米菇凉",
      "type": 0,
      "shopName": "未知",
      "describle": "价格亲民，加块鸡排",
      "price": 16,
      "baseScore": 8,
      "icon": "../res/img/fastfood/xiaomiguniang_001.jpg",
      "phone": 18617020200,
      "address": "科兴科学园原味街"
    },
    {
      "id": 20000,
      "name": "芝士太芒",
      "type": 1,
      "shopName": "未知",
      "describle": "大号芒果杯",
      "price": 16,
      "baseScore": 8,
      "icon": "../res/img/tea/taimang.jpg",
      "phone": 18617020200,
      "address": "科兴科学园原味街"
    },
    {
      "id": 20001,
      "name": "小鸡冰淇淋",
      "type": 1,
      "shopName": "未知",
      "describle": "科兴没有，图是朋友圈找的",
      "price": 16,
      "baseScore": 8,
      "icon": "../res/img/tea/xiaoji.jpg",
      "phone": 18617020200,
      "address": "科兴科学园原味街"
    },
    {
      "id": 20002,
      "name": "百香果益力多",
      "type": 1,
      "shopName": "未知",
      "describle": "酸酸的，百香果的籽可以吃",
      "price": 16,
      "baseScore": 8,
      "icon": "../res/img/tea/yiliduo.jpg",
      "phone": 18617020200,
      "address": "科兴科学园原味街"
    }
  ]