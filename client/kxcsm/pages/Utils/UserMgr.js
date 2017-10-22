var m_myLikeList = [];//我点赞的菜单
var m_myMarkList = [];//我收藏的菜单
var m_myCommentList = [];//我评论的菜单

module.exports =
  {
  m_myLikeList: m_myLikeList,
  m_myMarkList: m_myMarkList,
  m_myCommentList: m_myCommentList,
  SetLike: SetLike,//点赞
  SetComment: SetComment, //评论
  SetMark: SetMark,//收藏
  //---
  IsMark: IsMark,
  }

function IsMark(itemid)
{
  var isContain = m_myMarkList.find(function (x) {
    return x.itemid === itemid
  })
  return isContain;
}

//收藏
function SetMark(itemid)
{
  var isContain = IsMark(itemid);

  if (!isContain)
  {
    var item = CreateNewMarkItem();
    item.itemid = itemid;
    item.actionDate = Date.now();
    m_myMarkList.push(item);
  }
}

//评论
function SetComment(itemid,content)
{
    var item = CreateNewCommentItem();
    item.itemid = itemid;
    item.content = content;
    item.actionDate = Date.now();
    m_myCommentList.push(item);
}

function SetLike(itemid,score)
{
  var index = -1;

  var datalist = m_myLikeList;
  for (let i = 0; i < datalist.length; i++) {
    if (datalist[i].itemid == itemid) {
      index = i;
      break;
    }
  }

  if (index == -1) {
    //新建一个item添加进列表保存
    var newItem = CreateNewLikeItem();
    newItem.itemid = itemid;
    newItem.score = score;
    m_myLikeList.push(newItem);
    index = datalist.length - 1;
  }

  datalist[index].score = score;
  datalist[index].actionDate=Date.now();
}

//添加喜欢菜单模板
  function CreateNewLikeItem()
  {
    var item =
    {
        itemid:0,
        score:5,//我的评分
        actionDate: '',//操作时间
    }
    return item;
  }

//添加收藏模板
  function CreateNewMarkItem()
  {
    var item =
      {
        itemid: 0,
        actionDate: '',//操作时间
      }
    return item;
  }

  //添加评论模板
  function CreateNewCommentItem() {
    var item =
      {
        itemid: 0,
        content:'',//评论内容
        actionDate:'',//操作时间
      }
    return item;
  }