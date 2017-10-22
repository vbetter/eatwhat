module.exports = {
  mtKuaicanData: mtKuaicanData,
  searchmtdata: searchmtdata,
  GetRandomItem: GetRandomItem,
  SetItemType: SetItemType,
  SetItemData: SetItemData,
  AddMark: AddMark,
  AddLike: AddLike,
}

var m_itemTpey = 0;//当前才当类型

var m_indexArray = new Array();

var m_uid =123;
var m_userName ="L";

var mt_data = mtKuaicanData()
function searchmtdata(id) {
  var result
  for (let i = 0; i < mt_data.list.length; i++) {
    var mt = mt_data.list[i]
    if (mt.id == id) {
      result = mt
    }
  }
  return result
}

function SetItemType(itemType)
{
  m_itemTpey = itemType;
  
  ResetIndexList();
}

function ResetIndexList()
{
  var datalist = GetDataList(m_itemTpey);

  m_indexArray.splice(0, m_indexArray.length);

  for (let i = 0; i < datalist.length; i++) 
  {
    m_indexArray.push(i);
  }

  console.log("ResetIndexList");
}

function RemoveIndexList(index)
{
  m_indexArray.splice(index, 1);

  console.log("RemoveIndexList:"+index);
}

//添加收藏
function AddMark(newItem)
{
  if (newItem==null) return null;

  var datalist = newItem.Marks;

  var isRemove = false;

  for (let i = 0; i < datalist.length; i++) {
    if (datalist[i].uid == m_uid)
    {
      isRemove = true;
      datalist.splice(i,1);
      break;
    }
  }

  if (isRemove)
  {
    //新建一个item添加进列表保存
    newItem.IsMark = false;
  }else{
    //新建一个item添加进列表保存
    var newMarkItem = GetNewComment();
    newItem.Marks.push(newMarkItem);
    newItem.IsMark = true;
  }
  //保存数据
  SetItemData(newItem);
  return newItem;
}

//添加喜欢
function AddLike(newItem,score)
{
  if (newItem == null) return null;

  var datalist = newItem.Likes;

  var isRemove = false;
  var index = -1;

  for (let i = 0; i < datalist.length; i++) {
    if (datalist[i].uid == m_uid) {
      index = i;
      break;
    }
  }

  if(index == -1)
  {
    //新建一个item添加进列表保存
    var newMarkItem = GetNewComment();
    newItem.Likes.push(newMarkItem);
    newItem.IsLike = true;
    index = datalist.length -1;
  }

  newItem.Likes[index].score =score;

  //保存数据
  SetItemData(newItem);
  return newItem;
}

//获取一个随机的元素
function GetRandomItem()
{
  if(m_indexArray.length ==0 )
  {
    ResetIndexList();
  }
  var datalist = GetDataList(m_itemTpey);

  console.log("m_indexArray.length:" + m_indexArray.length);
  var randomIndex = GetRandomNum(0, m_indexArray.length-1);
  console.log("randomIndex:" + randomIndex);
  var mt = datalist[m_indexArray[randomIndex]]
  //移除推荐了的元素
  RemoveIndexList(randomIndex)
  return mt;
}

//覆盖数据
function SetItemData(newItem)
{
  var datalist = GetDataList(m_itemTpey);

  for (let i = 0; i < datalist.length; i++) 
  {
    var item = datalist[i];
    if (item.id == newItem.id)
    {
      datalist[i] = newItem;
      break;
    }
  }
}

//获取菜单池
function GetDataList(itemType)
{
  var datalist;

  if (itemType == '0') {
    datalist = mt_data;
  } else if (itemType == '1') {
    datalist = mt_xiawucha_data;
  }
  return datalist.list;
}

function GetRandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}   

function mtKuaicanData() {
  var arr = {
    list: []
  }

  {
    var newItem = GetNewItem();
    newItem.id = 1000;
    newItem.Name = "三及第";
    newItem.price = 18;
    newItem.img = '../res/img/fastfood/sanjidi_001.jpg';
    //test data
    var newCommentData = GetNewComment();
    newCommentData.uid =m_uid;
    newCommentData.userName =m_userName;
    newCommentData.content ="test";
    newItem.Comments.push(newCommentData);

    newItem.Likes.push("4324234");
    arr.list.push(newItem);
  }

  {
    var newItem = GetNewItem();
    newItem.id = 1001;
    newItem.Name = "上海混沌";
    newItem.price = 18;
    newItem.img = '../res/img/fastfood/hundun_001.jpg';
    arr.list.push(newItem);
  }

  {
    var newItem = GetNewItem();
    newItem.id = 1002;
    newItem.Name = "哈帝斯汉堡";
    newItem.price = 18;
    newItem.img = '../res/img/fastfood/hadisi_001.jpg';
      arr.list.push(newItem);
  }
  
  {
    var newItem = GetNewItem();
    newItem.id = 1003;
    newItem.Name = "罐罐面";
    newItem.price = 18;
    newItem.img = '../res/img/fastfood/guanguanmian_001.jpg';
      arr.list.push(newItem);
  }

  {
    var newItem = GetNewItem();
    newItem.id = 1004;
    newItem.Name = "过桥米线";
    newItem.price = 18;
    newItem.img = '../res/img/fastfood/guoqiaomixian_001.jpg';
      arr.list.push(newItem);
  }

  {
    var newItem = GetNewItem();
    newItem.id = 1005;
    newItem.Name = "肯德基";
    newItem.price = 18;
    newItem.img = '../res/img/fastfood/kfc_001.jpg';
      arr.list.push(newItem);
  }

  {
    var newItem = GetNewItem();
    newItem.id = 1006;
    newItem.Name = "小米菇凉";
    newItem.price = 18;
    newItem.img = '../res/img/fastfood/xiaomiguniang_001.jpg';
    arr.list.push(newItem);
  }

  return arr
}  

var mt_xiawucha_data = Get_xiawucha_Data()
function Get_xiawucha_Data() {
  var arr = {
    list: []
  }

  {
    var newItem = GetNewItem();
    newItem.id = 2000;
    newItem.Name = "芝士太芒";
    newItem.price = 25;
    newItem.img = '../res/img/tea/taimang.jpg';
    arr.list.push(newItem);
  }

  {
    var newItem = GetNewItem();
    newItem.id = 2001;
    newItem.Name = "小鸡冰淇淋";
    newItem.price = 25;
    newItem.img = '../res/img/tea/xiaoji.jpg';
    arr.list.push(newItem);
  }

  {
    var newItem = GetNewItem();
    newItem.id = 2003;
    newItem.Name = "百香果益力多";
    newItem.price = 25;
    newItem.img = '../res/img/tea/yiliduo.jpg';
    arr.list.push(newItem);
  }

  return arr
}


//创建一个新菜单
function GetNewItem()
{
  var obj = {
    id: '',
    Name: '',
    ShopName: '',
    Describle: '',
    price: 0,
    weight: 10,
    img: '../res/img/tea/yiliduo.jpg',
    call: '18617020200',
    Score:10,//评分
    IsLike: false,//我是否喜欢
    IsComment:false,//我是否评论
    IsMark:false,//是否收藏
    Likes: [],//点赞人数
    Reads: [],//阅读数、推荐数
    Marks:[],//收藏人数
    Comments: [],//评论，列表
    Awards:[],//奖项列表
  }

//test
{
    var award=GetNewReward();
    award.icon = "../res/rewards/ic_shortcut_bianjituijian.png";
    obj.Awards.push(award)
}
{
  var award = GetNewReward();
  award.icon = "../res/rewards/ic_shortcut_yizhoumingxing.png";
  obj.Awards.push(award)
}
  {
    var award = GetNewReward();
    award.icon = "../res/rewards/ic_shortcut_zuijiashouchang.png";
    obj.Awards.push(award)
  }
  {
    var award = GetNewReward();
    award.icon = "../res/rewards/ic_shortcut_zuorizuijia.png";
    obj.Awards.push(award)
  }
  return obj;
}

function GetNewReward()
{
  var obj = {
    id: 0,
    icon: "",
    name: "",
  };
  return obj;
}

function GetNewComment()
{
  var obj = {
    uid:m_uid,
    userName:m_userName,
    content:"",
    score:0,//我的评分
  };
  return obj;
} 