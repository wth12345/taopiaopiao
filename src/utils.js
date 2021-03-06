export default function upLoadMore(dom, callback) {//上拉加载
  let timer;//定义一个定时器
  dom.addEventListener('scroll', function (e) {//监听滚轮事件
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      let height = dom.clientHeight, scrollHeight = dom.scrollHeight, scrollTop = dom.scrollTop;
      if (height + scrollTop + 10 >= scrollHeight) callback();//如果一屏的高度+卷出的高度比总共内容的高度小10，那么执行回调函数
    }, 100)
  })
}
//touches：这个属性是多点触碰时每个触碰点的集合，touches[0]可获取到第一个触碰点对象
export default function downFresh(dom, callback) {//下拉刷新
  let startY,//最开始的位置
    distance,//一共拉的距离
    originTop = dom.offsetTop;//记录最开始的top值
  dom.addEventListener('touchStart', touchStart);//监听按下时触发的事件
  function touchStart(e) {
    startY = e.touches[0].pageY;//touches这个属性是触摸点的集合，touches[0]代表着第一个触摸点
    if (dom.offsetTop === originTop && dom.offsetTop === 0) {//当回到原点的时候，解除触摸事件
      dom.removeEventListener('touchmove', touchMove);
      dom.removeEventListener('touchend', touchEnd);
    }

    function touchMove(e) {
      let pageY = event.touches[0].pageY;
      if (pageY > startY) {//如果点击的坐标大于原坐标
        distance = pageY - startY;//下拉的距离
        dom.style.top = originTop + distance + 'px';//组件的top值就等于初始top值+下拉的距离
      } else {
        dom.removeEventListener('touchmove', touchMove);
        dom.removeEventListener('touchend', touchEnd);
      }
    }

    function touchEnd(e) {
      dom.removeEventListener('touchmove', touchMove);
      dom.removeEventListener('touchend', touchEnd);
      let timer = setInterval(function () {//当松手的时候执行定时器，distance每隔一段时间减少，知道top回到初始状态
        dom.style.top = originTop + (--distance) + 'px';
        if (distance < 1) {
          clearInterval(timer);
        }
      },14);
      if(distance>50){
        callback();//如果下拉的距离超过50，则进行刷新
      }
    }
  }
}