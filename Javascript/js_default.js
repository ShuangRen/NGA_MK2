/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
论坛通用函数 v1.00
written by zeg 2006-4-27
========================
*/


//
;
(function (){
var x = __COOKIE.getCookie('continueBack'), y=''
if(x){
	y=x.substr(2)
	x=x.substr(0,2)|0
	}
if(x && x<30 && location.pathname==y){
	x--
	__COOKIE.setCookieInSecond('continueBack',x+y)
	history.back(-1)
	window.setTimeout(function(){__COOKIE.deleteCookie('continueBack')},1000)
	}
else
	__COOKIE.deleteCookie('continueBack')
})();//fe

//date
var date = new Date;

//----------------------------
commonui.topicArg.init()

//--------------------------
commonui.touchMoveInit()

//--------------------------
//内嵌窗口阅读
commonui.loadNotiScript=function(f){loader.script(__SCRIPTS.notification,f)}
//commonui.checkIfInIframe =function(){return commonui.checkIfInIframe.check};


//--------------------------
/**
 *防止滚轮影响父页面
 **/
;
(function (){
if (!commonui.checkIfInIframe())return
commonui.aE(__UA[0]==1 ? document : window,__UA[0]==3 ? 'DOMMouseScroll' : 'mousewheel',function(e){//防止滚轮影响父页面 manual mousescroll
	window.scrollBy(0, e.wheelDelta ? e.wheelDelta*-1 : e.detail/3*120)
	commonui.cancelBubble(e)
	return commonui.cancelEvent(e)
	})
})();//fe

//--------------------------
//ip change alert
(function(){
if(!window.__GP || !window.__GP['greater'] || !__CURRENT_UID)return
var x = cookieFuncs.getCookie('CheckLog'+__CURRENT_UID)
if (x && x.length>32){
	cookieFuncs.setCookieInSecond('CheckLog'+__CURRENT_UID,x.substr(0,32),86400*7)
	commonui.loadNotiScript(function(){commonui.notification.addMsg(2,{0:9})})
	}
})();//fe


//--------------------------
//自定义发帖检测
commonui.postPerCheck =function(arg){//返回true终止发帖
var fid=arg[3],act=arg[1],stid=arg[6]//commonui.newPost
//if(act == postfunc.__NEW){
if(fid==-43){
	if(!window.confirm('本版禁止讨论近现代中国相关话题 (1921年~现在)\n违者禁言\n是否继续'))
		return true;
	}
else if(fid==400 || fid==318 || fid==395 || fid==396 || fid==446 || fid==397 || fid==398 || fid==399){
	var x = $('d3selector001')
	if(!x)return
	x.contentWindow.getUrls()
	arg[8] = '[diablo3charsim]'+x.contentDocument.getElementById('sharelink').value + '[/diablo3charsim]\n'+ arg[8].replace(/^\s*/,'')//content
	}
//	}
}//fe

commonui.preMessageHint = function(){
if(window.__CURRENT_UID && window.__GP && __GP.active<0)
	return _$('/span')._.add(
		_$('/br'),
		_$('/a').$0('href',"/read.php?tid=7504167",'innerHTML','[解锁等帐号安全问题]','target','_blank','className','b ngared'),
		' 请发至收件人 ',
		_$('/a').$0('href',"/read.php?tid=7504167",'innerHTML','34909933','target','_blank','className','b ngared'),
		', 请不要发送给版主 '
		)
else
	return null
}//fe
commonui.prePostHintAfterSubject = function(act, fid, tid, pid, stid){

var y = (window.__CURRENT_UID && (window.__CURRENT_F_BIT & 8192) && __GP.active<1) ? _$('/span')._.add(
	_$('/br'),
	'你可在用户中心',
	_$('/a').$0('href',"http://i.178.com/~index.bind.index/uid/"+__CURRENT_UID,'innerHTML','[绑定手机]','target','_blank','className','b ngared'),
	'进行帐号激活',
	_$('/br'),
	'请不要从任何途径购买论坛帐号 论坛备有详细的用户追踪记录 发现盗用帐号或违规激活会立即封禁',
	_$('/br'),
	'如果你的账号因安全问题而被锁定 请至银色黎明版查看',_$('/a').$0('href',"/read.php?tid=7504167",'innerHTML','[相关说明]','target','_blank','className','b ngared'),
	_$('/br')
	) : null

if(fid==400 || fid==318 || fid==395 || fid==396 || fid==446 || fid==397 || fid==398 || fid==399){
	return _$('/span')._.add(
		_$('/br'),
		__NUKE.trigger(function(){
			var c = (postfunc.o_f_content && this.parentNode.parentNode==postfunc.o_f_content.parentNode) ? postfunc.o_f_content : postfunc.o_content, m
			if(!c.value)return
			c.value = c.value.replace(/\s?\[diablo3charsim\]([^\x00]+?)\[\/diablo3charsim\]\s?/,function($0,$1){m = $1;return ''})
			if(m){
				var y = function(o){o.contentDocument.getElementById('sharelink').value = m;	o.contentWindow.proStart()}
				var x = _$('/iframe').$0('id','d3selector001','allowtransparency','true','frameborder','0','frameBorder','0','style',{width:'100%',height:'1500px',border:'none',margin:'0.5em 0'})
				if('onreadystatechange' in x)
					x.onreadystatechange = function(){
						if (this.readyState && this.readyState != 'loaded' && this.readyState != 'complete')return;
						y(this)}
				else
					x.onload = function(){y(this)}
				x.src='/misc/d3selector.html'
				this.parentNode.replaceChild(x,this.nextSibling)
				}
			}),
		_$('/button').$0('innerHTML','装备/技能模拟器','onclick',function(e){
			var x = _$('/iframe').$0('id','d3selector001','src','/misc/d3selector.html','allowtransparency','true','frameborder','0','frameBorder','0','style',{width:'100%',height:'1605px',border:'none',margin:'0.5em 0'})
			this.parentNode.replaceChild(x,this)
			}),
		y
		)
	}

return y
}//fe
//--------------------------
//fid custom
if(window.__CURRENT_FID){
	//if(!window.postfunc)window.postfunc={}
	switch (__CURRENT_FID){
		/*
		case 401:
		case 404:
			postfunc.prePostHint = function(){
				loader.script( __RES_PATH+'/js_d3_item_select.js?120647',function(){postfunc.prePostHint()},'gbk')
				}
			break;
		case 423:
			postfunc.prePostHint = function(){
				loader.script( __RES_PATH+'/js_wot_select.js?457683',function(){postfunc.prePostHint()},'gbk')
				}
			break;
		case 318:
		case 395:
		case 396:
		case 397:
		case 398:
		case 399:
			postfunc.prePostHint = function(){
				if(parseInt(this.getItem('tid').value,10))return
				_$(this.content)._.on('keyup',function(){
					if(!this.__d3hinted){
						alert('装备估价/比较/展示 等装备交易相关讨论请于 装备询价区 发布，否则可能被禁言')
						this.__d3hinted = true
						}
					})
				}
			break;
			*/
		case -152678:
			commonui.forumBtns.d[15] = {n1:'<span style="font-size:1.23em">战绩查询</span>',c:'uitxt1',
				u:'http://lolnewbf.178.com/search/index',
				ck:function(a){if(a.fid==-152678)return 1} }
			commonui.forumBtns.def1.unshift(15)
			break;
		}
	}
//--------------------------
//do sth from search

if(location.search){
	(function(){
		var m = location.search.match(/(?:&|\?)_fu=(\d+)/)
		if(m){
			m=m[1]
			window.setTimeout(
				function(){
						__NUKE.doPost({	u:{u:'/nuke.php?__lib=count&__act=sc&raw=3',a:{uid:m}},	f:function(){return true}	})
					},
				7000
				)
			}
		})()
	}
	
//--------------------------
//do sth from hash
if(location.hash){

commonui.aE(window,'DOMContentLoaded',
function(){

var c=commonui, m = w.location.hash.match(/^#pid(\d+)Anchor$/)
if(m){
	var x=w.$(m[0].substr(1))
	if(x){
		while(x.nodeName!='TABLE' && x.nodeName!='BODY')
			x = x.parentNode
		if(x.nodeName=='TABLE')
			x.style.borderLeft='10px solid #551200'
		}
	return
	}

var m = location.hash.match(/^#do:(.+?)$/)
if(!m)return
m = m[1].split('.')
switch(m[0]){
	case 'item':
		var tmp = function(){
			if(m[1]=='codeui')
				c.userItem.codeUi()
			else if(m[1]=='codeanduseui')
				c.userItem.codeUi(true)
			else if(m[1]=='list'){
				if(m[2])
					c.userItem.list(1,0,0,m[2])
				else
					c.userItem.list()
				}
			}
		if(c.userItem)
			tmp()
		else
			loader.script(__SCRIPTS.userItem,function(){tmp()} )
		break;
	}
}//fe
);//aE
	
}//if

//--------------------------
//全屏中专广告
//--------------------------
/*
if((__SETTING.uA[2] ==4 && window.navigator.userAgent.toLowerCase().indexOf('ipad')==-1) || __SETTING.uA[2] ==2){//ios android
	var c = __NUKE.toInt(__COOKIE.getMiscCookie('mobanner'))
	if(!c)
		__COOKIE.setMiscCookieInSecond('mobanner',1,300)
	else if(c==1)
		__COOKIE.setMiscCookieInSecond('mobanner',2,300)
	else if(c>1 && c<4){
		__COOKIE.setMiscCookieInSecond('mobanner',c+1,86400)
		w.put( "<div id='adsc1' class='adsc'><a href='http://app.178.com' target='_blank' style='border:1px solid #000;display:block;text-align:center;height:90px;background:#551200'><img style='border:none' src='"+__IMG_STYLE+"/mobile_app_banner2.png'/></a></div>")
		}
	}
*/
(function(){

if(!ngaAds || !ngaAds['bbs_ads12'] || (window.__GP && window.__GP.greater && !window.__GP['super'] ) )
	return

if(location.pathname!='/' && location.pathname!='/thread.php' && location.pathname!='/read.php')
	return

if (ngaAds['bbs_ads12']['refreshid'] && cookieFuncs.getMiscCookie('insad_refreshid')!=ngaAds['bbs_ads12']['refreshid'])
	cookieFuncs.setMiscCookieInSecond('insad_refreshid',ngaAds['bbs_ads12']['refreshid'],3600*24*7)

var v = __NUKE.toInt(cookieFuncs.getMiscCookie('insad_views')), c = cookieFuncs.getMiscCookie('pv_count_for_insad')
if(c===null){
	var d = new Date
	d = (24-d.getHours())*3600 + (60-d.getMinutes())*60 + d.getSeconds()
	cookieFuncs.setMiscCookieInSecond('pv_count_for_insad',0,d)
	cookieFuncs.setMiscCookieInSecond('insad_views',0,d)
	return
	}

if(__NUKE.toInt(c)>0){
	v++
	cookieFuncs.setMiscCookieInSecond('insad_views',v)
	cookieFuncs.setMiscCookieInSecond("pv_count_for_insad",0-v*v*48)
	window.location.replace( __BBSURL+'/misc/adpage_insert_2.html?'+window.location.href );
	}
})()
//fe	



	
/*
if(!window.postfunc)window.postfunc={}
postfunc.prePostHint = function (){
var x=',181,182,183,184,185,186,187,188,189,320,190,218,258,272,191,200,240,274,327,'
if (x.indexOf(','+this.form.elements.namedItem('fid').value+',')!=-1){
	if ($('postform_hint')){
		$('postform_hint').innerHTML+="<div class='page_nav'><a href='javascript:void(0)' class='start'></a><a href='http://zhidao.178.com/qlist/562' target='_blank' class='rep blue' style='text-align:center;font-weight:bold;font-size:16px'>有问题 试试 178知道</a><a href='javascript:void(0)' class='end'></a></div>"
		}
	}
}//fe
*/

__API.indexForumList=function(){
var r = Math.floor(__NOW/7200)
return [
	__IMG_BASE+'/proxy/cache_attach/67/6f/676f37d60a946f8b1ca2375c59512539.js?4_'+r,
	__IMG_BASE+'/proxy/proxy.php?r=4_'+r+'&host=bbs.ngacn.cc&url=nuke.php%3F__lib%3Dnga_index%26__act%3Dget_all_forums%26raw%3D1'
	]
}//fe

function time2date(t){
return commonui.time2date(t)
}

function checkindex(){
if (location.href.indexOf('index.php') > -1 || location.href.indexOf('.php') == -1)
	return true;
else
	return false;
}
function getScrollPos(){
var pos = Array();
if (window.innerHeight)
	{
		pos['y'] = window.pageYOffset
		pos['x'] = window.pageXOffset;
	}
else if (document.documentElement && document.documentElement.scrollTop)
	{
		pos['y'] = document.documentElement.scrollTop;
		pos['x'] = document.documentElement.scrollLeft;
	}
else if (document.body)
	{
		pos['y'] = document.body.scrollTop
		pos['x'] = document.body.scrollLeft;
	}
return pos;
}
//fe
function getClientWidth(){
if (document.documentElement && document.documentElement.clientWidth)
	return (document.documentElement.clientWidth);
else if (document.body)
	return (document.body.clientWidth);
else
	return (document.innerWidth);
}
//fe
function add_pv_count()
{
var w = window
//if (w.__CURRENT_FID || w.__CURRENT_TID)
//	put("<div style='text-align:center'><a href='/temp.html?"+(w.__CURRENT_TID ? 'tid='+w.__CURRENT_TID : 'fid='+w.__CURRENT_FID)+"' title='如果你的浏览器无法正常发帖 可以使用简易发帖在站务区（版面id 10）汇报问题'><b>简易"+(w.__CURRENT_TID ? '回复' : '发帖')+"</b></a></div>")
	
cookieFuncs.setMiscCookieInSecond('pv_count_for_insad',__NUKE.toInt(cookieFuncs.getMiscCookie('pv_count_for_insad'))+1);

if (w.location.href.indexOf('allblank')!=-1){
	var x = document.body.getElementsByTagName('A');
	for (var i=0; i<x.length; i++)
		{
		if (x[i].href.indexOf('read.php') != -1 && x[i].href.indexOf('thread.php') == -1)
			{
			x[i].target='_blank'
			}
		}
	}

if (w.location.href.indexOf('autoreload')!=-1){
	w._reloader=function(){
		var date=new Date;
		if(date.getTime()-w.userlastmove<10000) {w.setTimeout(w._reloader,60*1000);document.title='xxxx'}
		else w.location.reload()
	}
	w.setTimeout(w._reloader,60*5000);
	var tmp = function(){var date=new Date;w.userlastmove=date.getTime();document.title=w.userlastmove}
	addEvent(w,'scroll',tmp);
	addEvent(document.body,'click',tmp);
	}

}
//fe

function nextElement(obj){
var next = obj.nextSibling;
while (next && next.nodeType != 1)
	next = next.nextSibling;
return next;
}
//fe

function prevElement(obj){
var prev = obj.previousSibling;
while (prev && prev.nodeType != 1)
	prev = prev.previousSibling;
return prev;
}
//fe

function findNameInNeighbor(o,n){
o = o.parentNode;
return findNameInChild(o,n);
}
//fe

function findNameInChild(o,n){
for (var i=0; i<o.childNodes.length;i++){
	if (o.childNodes[i].getAttribute && o.childNodes[i].getAttribute('name') == n){
			return o.childNodes[i];
		}
	}
}//fe

function elmIncL3(e1,e2)
{
if (e2 == e1)
	{
		return true;
	}
if (e2.parentNode == e1)
	{
		return true;
	}
if (e2.parentNode.parentNode == e1)
	{
		return true;
	}
return false;
}
//fe

function cutstrbylen(s,l)
{
var j = 0.0;
var c= '';
for (var i=0;i<s.length;i++)
	{
		c = s.charCodeAt(i);
		if (c > 127)
			{
				j = j+1;
			}
		else if ( (c<=122 && c>=97)||(c<=90 && c>=65) )
			{
				j = j+0.65;
			}
		else
			{
				j = j+0.35;
			}
		if (j>=l)
			{
				return (s.substr(0,i+1));
			}
	}
return (s);
}
//fe
function getStyle(o,css)
{
if( document.defaultView && document.defaultView.getComputedStyle )
	{
		return document.defaultView.getComputedStyle( o, '' ).getPropertyValue(
		css.replace( /([A-Z])/g, '-$1'));
	}
else if ( o.currentStyle )
	{
		return o.currentStyle[ css ];
	}
else
	{
		false;
	}
}
//fe
function jsdebug()
{
if (typeof(cookieFuncs.cookieCache[cookieFuncs.misccookiename]) != 'object')
	cookieFuncs.extractMiscCookie();

	function d(f,c)
		{
			for (var k in c)
				{
					if (typeof(c[k])=='object')
						{
							d(f+k+'.',c[k]);
						}
					else
						{
							put(f+k+' = '+c[k]+'\n');
						}
				}
		}
if(commonui  && commonui._debug){
	put('---js debug---\n');
	d('',commonui._debug)
	}
put('---cookies---\n');
var cc = document.cookie.split(';');
for (var k in cc)
	{
		put(cc[k]+'\n');
	}
put('---misccookies---\n');
d('',cookieFuncs.cookieCache[cookieFuncs.misccookiename]);

}
//fe

function addEvent(obj,evt,fn) {
commonui.aE(obj,evt,fn)
}

function addEventDOMContentLoadedAct(){
commonui.triggerEventDOMContentLoadedAct ()
}//fe
/*
function loadtab(o,t,f)
{
if (typeof(o)=='string'){o = document.getElementById(o);}
if (typeof(t)=='string'){t = document.getElementById(t);}
var p = o.parentNode.childNodes;
var j =0, k = 0;
for (var i=0; i<p.length; i++)
	{
	if (p[i].nodeType==1)
		{
		j++;
		if (p[i]==o)
			{
			k=j;
			p[i].className='active';
			}
		else
			{
			p[i].className='inactive';
			}
		}
	}
p = t.childNodes;
j = 0;
for (var i=0; i<p.length; i++)
	{
	if (p[i].nodeType==1)
		{
		j++;
		if (j==k)
			{
			p[i].style.display='';
			if (f)
				{
				f(o,p[i]);
				}
			}
		else
			{
			p[i].style.display='none';
			}
		}
	}
}
*/
//--------------------------
//bbs code parser 预加载
var ubbcode={},bbscode
bbscode = ubbcode.bbscode=function(o,noimg,tid,pid,uid){
window.setTimeout(function(){ubbcode.bbscode(o,noimg,tid,pid,uid)},50);
}

//--------------------------
//user info & partrait load
//--------------------------
/*delete function getPortraitUrl(p)
{
return commonui.loadCurUserPortrait(p)
}*/
//fe
/*delete
function loadCurUserInfo(name,nick,icon,honor,id)
{
$('portrait').style.backgroundColor = '#FFE';
if (nick)
	{
	if (name)
		{
		name = nick+'('+name+')'
		}
	else 
		{
		name = nick
		}
	}
if (name)
	{
		$('portraitcover').title = name;
		if (honor.substr(0,1)==' '){
			honor = honor.split(' ');
			honor[1] = parseInt(honor[1]);
			if(honor[1] && honor[1]>__NOW)
				honor = honor[2]
			else if(honor[3])
				honor=honor[3]
			else
				honor=''
			}
		$('usernamebg').innerHTML =  (honor ? ("<span class='sub"+(honor.match(/[\u4e00-\u9fa5]/)?' chn_bold':'')+"'>"+honor+" · </span>") : '')
			+(name.match(/[\u4e00-\u9fa5]/)? '<span class="chn_bold">'+name+'</span>' : name)
			+(id ? ' · '+id : '')
		window.setTimeout(function(){$('portrait').style.backgroundImage = 'url('+commonui.loadCurUserPortrait(icon)+')'},5)
	}
else 
	{
		$('usernamebg').innerHTML = '<span class="chn_bold">访客</span>';
		$('portraitcover').title = '访客';
		window.setTimeout(function(){$('portrait').style.backgroundImage = 'url('+__IMG_STYLE+'/nobody2.gif)'},5)
	}
if (ngaAds && ngaAds.loadCustomAds)ngaAds.loadCustomAds({'uid':id})
}
//fe
*/

//--------------------------

if (!window.commonui)
	commonui = {}


/**
* 获取论坛背景图
* @param fid 当前版面ID
* @param bit 当前版面的bit type
 */
commonui.getForumBg=function(fid,bit){
var w = window,noV = (w.__UA && w.__UA[0]==1 && w.__UA[1]<=6) || w.__NUKE.position.get().cw<1400
switch (fid){
	case 318:
	case 394:
	case 393:
	case 395:
	case 396:
	case 397:
	case 398:
	case 399:
	case 400:
		return [1,w.__IMGPATH +'/head/20120512a.jpg',0,190]
	//case -65653:
	//	if(!noV)
	//		return [2,w.__IMGPATH +'/head/20131126.jpg',190,1600]
	//	break;
	case 224:
		if(w.__UA && w.__UA[0]==1 && w.__UA[1]<9){}//__IMGPATH +'/head/test1.jpg'
		else
			return noV ? [1,0,1600,190] : [2,0,190,1600]
		break;
	case -46468:
		return [1,w.__IMGPATH +'/head/20140115-46468.jpg',0,190]
	case -6194253:
		return [1,w.__IMGPATH +'/head/20140115-6194253.jpg',0,190]
	case -152678:
		return noV ? [1,w.__IMGPATH +'/head/20150911a.jpg',0,190] : [2,w.__IMGPATH +'/head/20150911.jpg',190,1600]
	case -985658:
		return [1,w.__IMGPATH +'/head/-985658.jpg',0,190]
	case 431:
		return [1,w.__IMGPATH +'/head/20150716.jpg',0,190]
	case 321:
		return [1,w.__IMGPATH +'/head/20140929.jpg',0,190]
	case 452:
		return [1,w.__IMGPATH +'/head/20140617.jpg',0,190]
	case 422:
		return [1,w.__IMGPATH +'/head/20150803.jpg',0,190]
	case -51095:
		return [1,w.__IMGPATH +'/head/20140915a.png',0,190]
//	case -7202235:
//		return [1,w.__IMGPATH +'/head/20150306.jpg',0,190]
	case 426:
		return [1,w.__IMGPATH +'/head/2015030604.jpg',0,190]
	case -69124:
		return [1,w.__IMGPATH +'/head/20150409.jpg',0,190]
	case -362960:
		return [1,w.__IMGPATH +'/head/150615.jpg',0,190]
	}
if(typeof bit=='number' && fid && (bit & 512))
	return [1,w.__IMG_BASE +'/proxy/cache_attach/_f/or/_forum_bg'+fid,0,190]

return [1,w.__IMGPATH+'/head/20141121.jpg',0,190]
}//fe

/*
 *自动替换帖子中[img]图片的地址
 */
commonui.correctAttachUrl = function(u){
return u
//if(__ATTACH_BASE == 'http://img6.nga.178.com:8080')
//	return u.replace(/^http:\/\/(img\d?)\.ngacn\.cc\//,'http://$1.nga.178.com/')
//else
//	return u.replace(/^http:\/\/(img\d?)\.nga\.178\.com\//,'http://$1.ngacn.cc/')
}//fe


/**
*获取附件地址
*@param u 附件相对地址 
*/
commonui.getAttachBase=function(u){

	if(__ATTACH_BASE == 'http://test.attach.ngacn.cc')
		return 'http://test.attach.ngacn.cc/attachments'
	else
		return __ATTACH_BASE.replace('img7','img').replace(':8080','')+'/attachments'
/*
if(u.substr(0,2)!='./')
	u='./'+u
var m = u.match(/^\.\/mon_(\d+)\/(\d+)/)
if(m){
	if(__ATTACH_BASE == 'http://test.attach.ngacn.cc')
		return 'http://test.attach.ngacn.cc/attachments'
	var b = (__ATTACH_BASE == 'http://img6.ngacn.cc:8080') ? true : false
	if(parseInt(m[1].toString()+m[2].toString(),10)>=20130104){
		//if(b)
		//	return 'http://img6.ngacn.cc/attachments'
		//else
			return 'http://img6.nga.178.com/attachments'
		}
	else{
		//if(b)
		//	return 'http://img.ngacn.cc/attachments'
		//else
			return 'http://img.nga.178.com/attachments'
		}
	}
return ''*/
}
/**
*地址是否是附件
*@param u 地址 
*/
commonui.ifUrlAttach = function(u){
if(u.match(/^http:\/\/(img\.ngacn\.cc|img6\.ngacn\.cc|ngaimg\.178\.com|img\.nga\.178\.com|img6\.nga\.178\.com)\//))
	return true
}


/**
 * 设置 内嵌/不加载图片 样式
 * 设置论坛背景图
 * 设置178导航
 * 设置顶通栏广告
 * 必须在div#mmc存在后运行
 */
commonui.initAfterBody=function(){
var w = window, b =w.__SETTING.bit ,x=''
if(b & (1024 | 64 | 2048)){
	if(b & 1024){
		x+=' notLoadImg isInAnIframe embed'
		w.ngaAds.clear()
		}
	else{
		if(b & 64)
			x+=' notLoadImg'
		if(b & 2048)
			x+=' isInAnIframe'
		}
	document.body.className+=x
	}
else{
	//if(window._178NavAll_110906_765453)
	//	w.put(_178NavAll_110906_765453(w.__CURRENT_UNAME,1))
	//if(location.pathname == '/read.php')
	//	w.put(w.ngaAds.bbs_ads1_gen())
	this.customBackgroundInit( this.getForumBg(w.__CURRENT_FID,w.__CURRENT_F_BIT) )
	}
if(__SETTING.uA[2] ==4 || __SETTING.uA[2] ==2)
	commonui.mobanner()

if((__SETTING.bit & (4|8|16))==0 && __SETTING.uA[0]==2 && w.getComputedStyle){//非小屏幕且是chrome 则用缩放取代小字号
	var y = w.document, x = y.createElement('span')
	x.style.fontSize = '9px'
	y.body.insertBefore(x,y.body.firstChild)
	var z = parseInt(y.defaultView.getComputedStyle(x,null).getPropertyValue('font-size'),10)
	y.body.removeChild(x)
	if(z && z>9)
		w.__NUKE.addCss('.xtxt , .stxt , .xxtxt {display:inline-block;font-size:inherit;transform: scale(0.75) translateY(8%);} \n .stxt {transform: scale(0.83) translateY(8%);} \n .xxtxt {transform: scale(0.583) translateY(8%);} ')
	}

var x=null
if(x = this._addEventOnbodyInitFuncs){//commonui.aE : onbodyInit
	for (var i=0;i< x.length;i++)
		x[i]()
	x.done=true
	}
else
	this._addEventOnbodyInitFuncs={done:true}
}//fe

commonui.mobanner = function(){
var c = __NUKE.toInt(__COOKIE.getMiscCookie('mobanner1'))
if(!c){
//	__COOKIE.setMiscCookieInSecond('mobanner1',1,300)}
//else if(c==1)
//	__COOKIE.setMiscCookieInSecond('mobanner1',2,300)
//else if(c==2){
	var x = _$('<div/>').$0('style',{position:'fixed',background:'#551200',lineHeight:'3em',height:'3em',bottom:'0px',color:'#fff',fontSize:'1.5em',width:'100%',textAlign:'center',zIndex:6},_$('<a/>').$0('innerHTML','下载论坛移动客户端','href','http://app.178.com','target','_blank','className','white'),_$('<a/>').$0('style',{'display':'block','cssFloat':'right',width:'1.5em',height:'1.5em',fontSize:'2em'},'href','javascript:void(0)','innerHTML','X','className','white','onclick',function(){this.parentNode.style.display='none';__COOKIE.setMiscCookieInSecond('mobanner1',3,86400)}) )
	document.body.appendChild(x)
	}
}

commonui.put_post_rule = function()
{

}//fe

commonui.topic_key = function(fid)
{
put("\
<span name='tk'>\
	<select onclick='commonui.onloadtopic_key(this,"+fid+")'>\
		<option value='' selected='selected'>主题分类</option>\
	</select>\
</span>\
");
}//fe

commonui.forumjump = function(){
put("\
<span name='fj'>\
	<select onclick='commonui.onloadforumlist(this)'>\
		<option value='' selected='selected'>选择版面</option>\
	</select>\
</span>\
");
}


/*
commonui.unisearchAddSelectedForum = function (){}//fe

commonui.uniSearchWindow = function (e){
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('搜索')
var x='',y=''
if (window.__SELECTED_FORUM)
	x = 'selected'
else
	y='selected'
this.adminwindow._.addContent( "\
<span style='white-space:nowrap;width:23em'>\
<input type='text' name='key' size='20' maxlength='50' value='' onkeydown='if(!event)event=window.event;if(event.keyCode==13)commonui.uniSearch(this.parentNode);'/><button onclick='commonui.uniSearch(this.parentNode)' type='button'>搜索</button> <a href='search.php' title='搜索' class='b'>高级搜索</a><br/>\
<input type='radio' name='type' value='f' checked>以标题内容搜索主题 <select><option "+x+">搜索当前版面</option><option "+y+">搜索非用户版面</option><option>搜索用户版面</option></select><br/>\
<input type='radio' name='type' value='forum'>以版面名或版主名搜索版面<br/>\
<input type='radio' name='type' value='username'>以用户名搜索用户<br/>\
<input type='radio' name='type' value='uid'>以用户ID搜索用户<br/>\
<input type='radio' name='type' value='db'>搜索魔兽世界数据库<br/>\
<form method='get'></form></span>\
")
tTip.showdscp(e,this.adminwindow);
}//fe

commonui.uniSearch = function (oo){
var x=oo.getElementsByTagName('input')
if (!x[0].value)
	return alert('请输入关键词')
var z=oo.getElementsByTagName('select'),o=oo.getElementsByTagName('form')[0],y=_$('<input/>')._.attr({value:x[0].value,type:'hidden'})
o.innerHTML=''
if (x[5].checked){
	o.method = 'post'
	o.target = '_blank';
	o.action = 'http://db.178.com/wow/cn/search.html?name='+encodeURIComponent(y.value);
	o.target='_blank'
	}
else if (x[1].checked){
	if(z[0].selectedIndex==0)
		o.appendChild(_$('<input/>')._.attr({value:__SELECTED_FORUM.match(/-?\d+/g).join(','),name:'fid',type:'hidden'}))
	else if(z[0].selectedIndex==2)//if current forum is user search all user forum
		o.appendChild(_$('<input/>')._.attr({value:'user',name:'fidgroup',type:'hidden'}))
	o.target = ''
	o.action = 'thread.php?'
	y._.attr('name','key')
	}
else if (x[2].checked){
	o.target = ''
	o.action = 'forum.php?'
	y._.attr('name','key')
	}
else if (x[3].checked){
	o.action = 'nuke.php'
	y._.attr('name','username')
	o.appendChild(_$('<input/>').$0('value','ucp','name','func','type','hidden'))
	o.target='_blank'
	}
else if (x[4].checked){
	o.action = 'nuke.php'
	y._.attr('name','uid')
	o.appendChild(_$('<input/>').$0('value','ucp','name','func','type','hidden'))
	o.target='_blank'
	}
o.appendChild(y)
o.submit()
}//fe
*/

commonui.uniSearchWindow = function (e){
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('搜索')
var st,stc,sf,su,sd,fc,fa,fo,foi,foii,k,$=_$
this.adminwindow._.addContent(
$('/span')._.css({whiteSpace:'nowrap',width:'23em'})._.add(
	fo=$('/form').$0(
		'method','get',
		'action','',
		foi=$('/input').$0('type','hidden'),
		foii=$('/input').$0('type','hidden')
		),
	k=$('/input').$0('type','text','size','20','maxlength','50','onkeydown',
		function(e){if(e.keyCode==13)__NUKE.fireEvent(this.nextSibling, 'click')}
		),
	$('/button').$0('type','button','innerHTML','搜索','onclick',function(){
		if (!k.value)
			return alert('请输入关键词')
		if(st.checked || stc.checked){
			fo.method='post'
			fo.action = '/thread.php?key='+encodeURIComponent(k.value)
			if(fc.checked)
				fo.action += '&fid='+__SELECTED_FORUM.match(/-?\d+/g).join(',')
			if(stc.checked)
				fo.action += '&content=1'
			}
		if(sf.checked){
			fo.action = '/forum.php?'
			foi.name='key'
			foi.value=k.value
			}
		if(su.checked){
			fo.action = '/nuke.php?'
			foii.name='func'
			foii.value='ucp'
			foi.value=k.value
			if(parseInt(k.value,10))
				foi.name='uid'
			else{
				if(foi.value.substr(0,1)=='\\')
					foi.value = foi.value.substr(1)
				foi.name='username'
				}
			}
		if(sd.checked){
			fo.method='post'
			fo.target = '_blank';
			fo.action = 'http://db.178.com/wow/cn/search.html?name='+encodeURIComponent(k.value);
			}
		fo.submit()
		}),
	' ',
	$('/a').$0('href','/search.php','className','b','innerHTML','高级搜索'),
	$('/br'),
	st=$('/input').$0('type','radio','name','rsch1'),' 搜索主题标题     ',fc=$('/input').$0('type','radio','name','rsch2'),' 当前版面',
	$('/br'),
	stc=$('/input').$0('type','radio','name','rsch1'),' 搜索主题标题和内容 ',fa=$('/input').$0('type','radio','name','rsch2'),' 全部版面',
	$('/br'),
	sf=$('/input').$0('type','radio','name','rsch1'),' 搜索版面或版主',
	$('/br'),
	su=$('/input').$0('type','radio','name','rsch1'),$('/span').$0('innerHTML',' 搜索用户?','title','输入用户ID或用户名 数字用户名需在前加\ '),
	$('/br'),
	sd=$('/input').$0('type','radio','name','rsch1'),' 搜索魔兽世界数据库'
	)
)
st.checked=1
if (window.__SELECTED_FORUM)
	fc.checked=1
else
	fa.checked=1
this.adminwindow._.show(e);
}//fe


commonui.added_child_forum = function (fid){

}

commonui.blackscreen = function (d){
if (!id2e('blackscreendiv'))
	{
	var w = document.createElement('div');
	document.body.appendChild(w);
	w.id = 'blackscreendiv';
	w.className='blackscreendiv';
	}
if (d)
	{
	id2e('blackscreendiv').style.display='block';
	}
else
	{
	id2e('blackscreendiv').style.display='none';
	}
}


commonui.loadboardnews = function (o,t,nocache){
var self=this;
var x = findNameInChild(t,'boardnews');
if (x.innerHTML=='')
	{
	var onsucc = function(d){
		if (!d || !d.data)
			return false
		if ((__NOW-d.time)>3600*1000*2.1 && !nocache)
			return commonui.loadboardnews(o,t,1)
		d = d.data
		var y = ''
		var bg = 'b1'
		for (var k in d)
			{
			if (bg=='b1')
				bg = 'b2'
			else
				bg = 'b1'
			y+="<li class='"+bg+"'><SPAN title='"+commonui.time2date(d[k].postdate)+"'>"+commonui.time2date(d[k].lastpost)+"</SPAN><A href='http://bbs.ngacn.cc/read.php?tid="+d[k].tid+"'>"+d[k].subject+"</A></li>"
			}
		x.innerHTML='<ul>'+y+'</ul>';
		}
	var onfail = function(){x.innerHTML=='Load error ...'}
	var q = []
	if (!nocache)
		q.push('data/bbscache/load_topic_cache/mostuserrecommend_7,181,182,183,184,185,186,187,188,189,320_3.js');
	q.push('nuke.php?func=loadtopic&f=mostuserrecommend&fid=7,181,182,183,184,185,186,187,188,189,320&day=3&js=1');
	httpDataGetter.script_muti_get(q,onsucc,onfail,'gbk');
	}
}

commonui.setbg = function(o)
{
if(typeof(o)=='string')o = id2e(o);
var c = 'b1';
for (var k in o.childNodes)
	{
		if(c=='b1')c='b2';else c='b1';
		o.childNodes[k].className+=' '+c;
	}
}

commonui.posthot = function(pnum,rum){
var w = 16
if(pnum>999)w=13
else if(pnum>9999)w=10
var c = '4682B4';
if(pnum>500)c='B22222'
else if(pnum>450)c='FF8C00'
else if(pnum>400)c='ef9b00'
else if(pnum>350)c='e6c200'
else if(pnum>300)c='c7ba47'
else if(pnum>250)c='9ACD32'
else if(pnum>200)c='63a252'
else if(pnum>150)c='3CB371'
else if(pnum>100)c='20B2AA'
else if(pnum>50)c='008B8B'
put("<span style='font-weight:bold;font-size:"+w+"px;color:"+c+"' title='"+pnum+"回复 点击在新窗口打开'>"+pnum+"</span>")
}



commonui.loadScriptInOrder_loadedScript = {}
commonui.loadScriptInOrder = function(s,onready)
{
if (typeof(s)=='string') s=new Array(s);
var cur = s.shift();
if (this.loadScriptInOrder_loadedScript[cur])
	{
	if(s.length)this.loadScriptInOrder(s,onready);
	else onready();
	return;
	}
var h = document.createElement('script');
h.src = cur;
h.onload=h.onreadystatechange = function(){
	if (this.readyState && this.readyState != 'loaded' && this.readyState != 'complete')
		return;
	commonui.loadScriptInOrder_loadedScript[this.src]=1;
	if (s.length==0) onready();
	else commonui.loadScriptInOrder(s,onready);
	}
document.getElementsByTagName('head')[0].appendChild(h)
}

commonui.loadAlertInfo=function(info)
{
if(!info)return;
info = info.split(/\t|\n/);
var e = '';
var p = '';
for (var k in info){
	if(typeof(info[k])!='string')continue
	info[k] = info[k].replace(/^[\t\n ]+/,'');
	if (info[k])
		{
		if (info[k].substr(0,4).toLowerCase()=='edit')e+=info[k]+' ';
		else p+=info[k].replace(/\[(L|U)?([\d\.\/ ]+)( .+?)?\](.+)?/g,function($0,$1,$2,$3,$4){
				$2 = $2.split(' ')
				$3 = $3!==undefined?' '+$3:''
				$4 = $4!==undefined?' '+$4:''
				if($1=='L')
					return '[-'+$2[0]+'声望 -'+$2[1]+'威望 禁言'+$2[2]+'天'+$3+']&emsp;'
				else if($1=='U')
					return '['+$2[0]+'声望 '+$2[1]+'威望 '+$2[2]+'G'+($3==' UM'?' 解除禁言':'')+' (取消操作)]&emsp;'
				else
					return '['+$2[0]+'声望 '+$2[1]+'威望 '+$2[2]+'G'+$3+$4+']&emsp;'
				});
		}
	}
if(e)put('<div class="silver">'+e+'</div>');
if(p)put("<table class='quote'><tr><td>评分记录 "+p+'</td></tr></table>');
}

commonui.switchDisp = function(o,d,close)
{
if (o.style.display && o.style.display=='none')
	{
	if(d)o.style.display=d
	else o.style.display=''
	if(close)
		{
		o.onmouseout=function(e){
			if (!e) var e = window.event;
			var to = (e.relatedTarget) ? e.relatedTarget : e.toElement;
			if (to && to!=this && to.parentNode!=this && to.parentNode.parentNode!=this)
				{
				this.style.display='none'
				}
			}
		}
	}
else
	o.style.display='none'
}



commonui.calc_money = function (c){
c = parseInt(c,10);
if (!c || c <= 0)
	return ('');
var g = Math.floor(c / 10000), s = Math.floor(c / 100) - g * 100,  h ='' , t = ''
c = c - g * 10000 - s * 100;
if (g){
	t+=g+'金币 '
	h += g+"<img alt='金币' style='margin:2px 1px -2px 0px' src='"+__IMG_STYLE+"/g.gif'/>";
	}
if (s){
	t+=s+'银币 '
	if(g<100)
		h += s+"<img alt='银币' style='margin:2px 1px -2px 0px' src='"+__IMG_STYLE+"/s.gif'>";
	}
if (c){
	t+=c+'铜币 '
	if(!g)
		h += c+"<img alt='铜币' style='margin:2px 1px -2px 0px' src='"+__IMG_STYLE+"/c.gif'/>";
	}
return "<span title='"+t+"'>"+h+"</span>"
}//fe





commonui.bgCssSelector = {
'key':{0:2,1:1},
'p':0,
'set':function(o,pf){
	if(!pf)
		pf = ''
	pf = pf+this.key[this.p];
	if(o)
		o.className+=' '+pf
	return pf
	},
'update':function(o,pf){
	pf = this.set(o,pf)
	if(this.p==0)this.p=1
	else this.p=0
	return pf
	},
'init':function(){
	this.key = arguments
	}
}

/*
commonui.forumHisOnIndex = function(){
var h = cookieFuncs.getMiscCookie('ForumViewHis')
if(!h || typeof(h[0])!='object')return
var x = '';
for (var k in h){
	x+="<div class='c' style='width:33%;background-image:url("+__IMG_STYLE+"/f/37.png)'><span class='d'></span><div class='a'><div class='b'><a href='thread.php?fid="+h[k][0]+"'>"+h[k][1]+"</a><br/><p></p></div></div></div>"
	}
put("<h2 class='catetitle'>..::最近访问过的版面::..</h2>\
<div class='module_wrap'>\
<div class='w100'>\
<div class='catenew'>\
	"+x+"\
	<div class='clear'></div>\
</div>\
<div class='clear'></div>\
</div>\
</div>")
}//fe
*/

commonui.mainMenuItems={
	//hisAddon:[100],
	hisDefLeft:[7,5,6,8,9,151,10],
	hisDef:[0,115,5,116,119,118,144,18,146,147],
	0:{subKeys:[144,18,118,147],
		title:(__GP.userBit&256) ? '移动验证成功' : '点此打开主菜单',
		innerHTML:__CURRENT_UID ? '<div class="half">你好<br/>'+commonui.cutstrbylen(__CURRENT_UNAME,7,6,'...')+'</div>' : '开始',
		className:((__GP.userBit&256) ? 'teal' : 'invert')
		},//0为根菜单
	1:{href:'/thread.php?recommend=1',innerHTML:'精华主题',color:'#80C0C0'},
	2:{u:1,href:'/thread.php?favor=1',innerHTML:'收藏的主题',color:'#80C0C0'},
	3:{u:1,href:'/thread.php?authorid='+__CURRENT_UID,innerHTML:'我的主题',color:'#80C0C0'},
	/*
	4:{u:1,disableDefault:1,html:_$('/div')._.add(_$('/img').$0('src','about:blank','style',{display:'none'},'onerror',function(){
			var i = new Image(),self = this, x=commonui.loadCurUserPortrait(__CURRENT_AVATAR)
			i.src = x
			i.onreadystatechange=i.onload=function(){
				if(this&&this.readyState&&this.readyState!='complete')
					return
				this.onreadystatechange = this.onload=null
				self.parentNode._.css('borderLeft','0.5em solid #591804','height','100%','width',(this.width+2)+'px','background','#FFF0CD url('+i.src+') 1px '+(x.cY ? x.cY*100 : 50)+'% no-repeat','boxShadow','#FFF0CD '+(x*2)+'px 0 '+x+'px -'+x+'px inset')
				}//
			}))},//头像预留
		*/
	5:{href:'http://nga.cn',innerHTML:'首页'},
	6:{href:'/',innerHTML:'论坛',className:'active'},
	7:{href:'/',innerHTML:_$('/img').$0('src',__IMG_STYLE+'/logo9.png','style','backgroundColor:'+__COLOR.border0),disableDefault:1},
	8:{href:'http://nga.cn/special/',innerHTML:'专题'},
	9:{href:'http://nga.cn/museum/',innerHTML:'博物馆'},
	10:{href:'http://app.178.com/',innerHTML:'移动端'},

/*
	4:{ innerHTML:'魔兽世界',subKeys:[5,7,28,39,54,61,72,83,86,87],color:'#808FBC' },
	5:{innerHTML:'魔兽世界专题站',href:"http://wow.178.com"},

	7:{ innerHTML:'工具',subKeys:[8,9,10,11,12,13,14,15,16,17,100] },
	8:{ innerHTML:'数据库（简体）',href:"http://db.178.com/wow/cn/index.html" },
	9:{ innerHTML:'数据库（繁体）',href:"http://db.178.com/wow/tw/index.html" },
	10:{ innerHTML:'大脚插件',href:"http://bigfoot.178.com/" },
	11:{ innerHTML:'天赋模拟器',href:"http://wow.178.com/talent/" },
	12:{ innerHTML:'签名生成器',href:"http://wowsig.178.com/" },
	13:{ innerHTML:'成就查询',href:"http://wow.178.com/chengjiu/" },
	14:{ innerHTML:'3D幻化试衣间',href:"http://db.178.com/wow/transmogrification/index.html" },
	15:{ innerHTML:'竞技场点数计算器',href:"http://wow.178.com/jjc/" },
	16:{ innerHTML:'WMO战斗数据分析',href:"http://wmo.178.com/" },
	17:{ innerHTML:'魔兽网络加速',href:"http://www.ofcard.com/showinfo.do?cardid=3809&amp;username=173178" },

	18:{ innerHTML:'论坛设置',subKeys:[19,20,21,22,97,101,102,109,110,111,112,113,108,141,142] },
	19:{ html:function(){return commonui.picswitch()},title:'选择显示较少的图片',disableDefault:1 },
	20:{ html:function(){return commonui.setfont()},title:'选择论坛显示字体',disableDefault:1},
	21:{ html:function(){return commonui.iframeread()},title:'是否在内嵌窗口内阅读主题',disableDefault:1},
	*/
	22:{ innerHTML:'用户脚本',on:{event:'click',func:function(e){commonui.loadUserScript(__NUKE.position.dummyEvent(e))} }, check:function(){if(__CURRENT_UID)return true} },
/*
	23:{ innerHTML:'暗黑破坏神',subKeys:[24,98,99,106],color:'firebrick' },
	24:{innerHTML:'暗黑破坏神专题站',href:"http://d3.178.com"},
*/
	25:{u:1,href:'/nuke.php?func=ucp&uid='+__CURRENT_UID,innerHTML:'论坛用户中心',disableDefault:1,color:'#551200'},
	26:{u:1,href:'/nuke.php?func=message',innerHTML:'短消息',disableDefault:1,color:'sandybrown'},
	27:{u:1,
		check:function(){
			if(commonui.userCache)
				return true
			},
		innerHTML:'提醒信息',
		on:{
			event:'click',
			func:function(){
				if(commonui.notification)commonui.notification.openIndex()
				else commonui.loadNotiScript(function(){commonui.notification.openIndex()})
				}
			},
		color:'sandybrown'
		},
/*
	28:{ innerHTML:'职业',subKeys:[29,30,31,32,33,34,35,36,37,38] },
	29:{ innerHTML:'死亡骑士',href:"http://wow.178.com/list/dk/" },
	30:{ innerHTML:'战士',href:"http://wow.178.com/list/zs/" },
	31:{ innerHTML:'圣骑士',href:"http://wow.178.com/list/sq/" },
	32:{ innerHTML:'猎人',href:"http://wow.178.com/list/lr/" },
	33:{ innerHTML:'萨满祭司',href:"http://wow.178.com/list/sm/" },
	34:{ innerHTML:'潜行者',href:"http://wow.178.com/list/dz/" },
	35:{ innerHTML:'德鲁伊',href:"http://wow.178.com/list/dly/" },
	36:{ innerHTML:'法师',href:"http://wow.178.com/list/fs/" },
	37:{ innerHTML:'牧师',href:"http://wow.178.com/list/ms/" },
	38:{ innerHTML:'术士',href:"http://wow.178.com/list/ss/" },

	39:{ innerHTML:'技能',subKeys:[89,40,41,42,43,44,45,46,47,48,49,50,51,52,53,94] },
	40:{ innerHTML:'附魔',href:"http://wow.178.com/fumo/" },
	41:{ innerHTML:'珠宝',href:"http://wow.178.com/zhubao/" },
	42:{ innerHTML:'铭文',href:"http://wow.178.com/mingwen/" },
	43:{ innerHTML:'工程学',href:"http://wow.178.com/gongcheng/" },
	44:{ innerHTML:'锻造',href:"http://wow.178.com/duanzao/" },
	45:{ innerHTML:'制皮',href:"http://wow.178.com/zhipi/" },
	46:{ innerHTML:'裁缝',href:"http://wow.178.com/caifeng/" },
	47:{ innerHTML:'炼金',href:"http://wow.178.com/lianjin/" },
	48:{ innerHTML:'钓鱼',href:"http://wow.178.com/diaoyu/" },
	49:{ innerHTML:'烹饪',href:"http://wow.178.com/pengren/" },
	50:{ innerHTML:'采矿',href:"http://wow.178.com/caikuang/" },
	51:{ innerHTML:'草药',href:"http://wow.178.com/caoyao/" },
	52:{ innerHTML:'剥皮',href:"http://wow.178.com/bopi/" },
	53:{ innerHTML:'急救',href:"http://wow.178.com/jijiu/" },

	54:{ innerHTML:'攻略',subKeys:[55,56,57,58,59,60] },
	55:{ innerHTML:'副本',href:"http://wow.178.com/list/fuben/index.html" },
	56:{ innerHTML:'成就',href:"http://wow.178.com/list/chengjiu/index.html" },
	57:{ innerHTML:'声望',href:"http://wow.178.com/list/shengwang/index.html" },
	58:{ innerHTML:'PVP',href:"http://wow.178.com/list/pvp/index.html" },
	59:{ innerHTML:'任务',href:"http://wow.178.com/list/renwu/index.html" },
	60:{ innerHTML:'物品',href:"http://wow.178.com/list/wupin/index.html" },

	61:{ innerHTML:'图片',subKeys:[62,63,64,65,66,67,68,69,70,71] },
	62:{ innerHTML:'画匠专栏',href:"http://wow.178.com/pic/" },
	63:{ innerHTML:'NGA画窟活动',href:"http://wow.178.com/list/39465524376.html" },
	64:{ innerHTML:'NGA画窟作品集',href:"http://wow.178.com/list/18492273712.html" },
	65:{ innerHTML:'搞笑图片',href:"http://wow.178.com/list/33270107982.html" },
	66:{ innerHTML:'漫画',href:"http://wow.178.com/list/manhua/index.html" },
	67:{ innerHTML:'热门连载',href:"http://wow.178.com/list/39465028323.html" },
	68:{ innerHTML:'游戏周边',href:"http://wow.178.com/200907/t_42237847459.html" },
	69:{ innerHTML:'暴雪画廊',href:"http://wow.178.com/list/39465575675.html" },
	70:{ innerHTML:'精美壁纸',href:"http://wow.178.com/list/bizhi/index.html" },
	71:{ innerHTML:'魔兽翻唱',href:"http://wow.178.com/list/30568303503.html" },

	72:{ innerHTML:'UI插件',subKeys:[88,73,74,75,76,77,78,79,80,81,82] },
	73:{ innerHTML:'商业物品',href:"http://wowui.178.com/sort/36" },
	74:{ innerHTML:'战斗增强',href:"http://wowui.178.com/sort/29" },
	75:{ innerHTML:'聊天交流',href:"http://wowui.178.com/sort/45" },
	76:{ innerHTML:'地图',href:"http://wowui.178.com/sort/22" },
	77:{ innerHTML:'团队和副本',href:"http://wowui.178.com/sort/12" },
	78:{ innerHTML:'界面增强',href:"http://wowui.178.com/sort/18" },
	79:{ innerHTML:'任务',href:"http://wowui.178.com/sort/26" },
	80:{ innerHTML:'PvP',href:"http://wowui.178.com/sort/30" },
	81:{ innerHTML:'职业',href:"http://wowui.178.com/sort/1" },
	82:{ innerHTML:'管理与周边',href:"http://wowui.178.com/sort/35" },

	83:{ innerHTML:'公会',subKeys:[84,85] },
	84:{ innerHTML:'公会系统',href:"http://gh.178.com/" },
	85:{ innerHTML:'DKP系统',href:"http://dkp.178.com/" },


	86:{ innerHTML:'魔兽数据库',href:"http://db.178.com/wow/" },
	87:{ innerHTML:'人口普查',href:"http://db.178.com/wow/summary/" },


	88:{ innerHTML:'插件中心',href:"http://wowui.178.com" },
	89:{ innerHTML:'技能首页',href:"http://http://wow.178.com/list/syjn/" },


	90:{ innerHTML:'点击开始找到你需要的功能',tagName:'span' ,color:'silver',disableDefault:1},

	91:{href:'/search.php',innerHTML:'高级搜索',color:'gray'},
	92:{tagName:'select','options':[ {k:'版面跳转',v:0} ],on:{
			event:'click',
			func:function(){
				if(this._loaded)return
				this._loaded=true
				commonui.onloadforumlist(this);
				this.onchange=function(){window.location="/thread.php?fid="+this.options[this.selectedIndex].value}
				}
			}
		},
	*/
	93:{u:1,href:'/thread.php?fid=357',innerHTML:'收藏的版面',check:function(){if(window.__GP && __GP['rvrc'] && __GP['rvrc']>=20)return true}},
	//94:{ innerHTML:'考古学',href:"http://wow.178.com/kaogu/" },
//95:custombg
//96:autodomain
	97:{ innerHTML:'控制台',on:{event:'click',func:function(e){commonui.console.open()} } },
	//98:{innerHTML:'游戏数据库',href:"http://db.178.com/d3/"},
	//99:{innerHTML:'技能模拟器',href:"http://db.178.com/d3/calculator/bar.htm"},
	//100:{ check:function(){if(!(__SETTING.bit & 4))return true},innerHTML:'魔兽点卡充值',href:"http://wow.178.com/200909/47347481167.html" },
	101:{ innerHTML:'设置头像',on:{event:'click',func:function(e){commonui.setAvatar(e,__CURRENT_UID)}} },
	102:{ innerHTML:'设置签名',href:"/nuke.php?func=sign" },
	//103:{ innerHTML:'用户脚本',href:"/nuke.php?func=user_script" },
	104:{u:1,href:'/thread.php?searchpost=1&authorid='+__CURRENT_UID,innerHTML:'我的回复',color:'#80C0C0'},
	105:{u:1,href:'http://i.178.com/?_app=index&_controller=index&_action=index&uid='+__CURRENT_UID,innerHTML:'178用户中心',color:'#551200'},
	
	//106:{href:'http://db.178.com/d3/calculator/dps.htm',innerHTML:'DPS计算器'},
	
	107:{ innerHTML:'物品/道具',color:'gray',check:function(){
			if(window.__CURRENT_UID)
				return true
			},on:{event:'click',func:function(e){
		if(commonui.userItem)
			commonui.userItem.open()
		else
			loader.script(__SCRIPTS.userItem,function(){commonui.userItem.open()} )
		} } },

	108:{u:1,check:function(){if(__GP.admin)return true},innerHTML:'管理密码输入',on:{event:'click',func:function(e){commonui.adminPassInput()}}},
	109:{u:1,check:function(){if(__GP.greater)return true},href:'/nuke.php?func=modifymedal',innerHTML:'论坛徽章设置'},
	110:{u:1,check:function(){if(__GP.admin)return true},href:'/nuke.php?func=modifygroup',innerHTML:'用户组设置'},
	111:{u:1,check:function(){if(__GP.admin)return true},href:'/nuke.php?func=modifyforum',innerHTML:'版面设置'},
	112:{u:1,check:function(){if(__GP.admin)return true},href:'/nuke.php?func=modifyreputation',innerHTML:'论坛声望设置'},
	113:{u:1,check:function(){if(__GP.admin)return true},href:'/nuke.php?func=listuser',innerHTML:'统计'},
	
	114:{on:{event:'click',func:function(e){commonui.mainMenu.menuOpen(e)}},innerHTML:'开始',className:'invert',disableDefault:1},
	
	115:{u:0,href:'https://account.178.com/?p=trylogin&to='+encodeURIComponent(location.href), innerHTML:'登录',disableDefault:1},
	116:{u:0,href:'http://account.178.com/?p=register', innerHTML:'注册',disableDefault:1},
	//117:{u:1,href:'/nuke.php?func=message', innerHTML:'短消息',disableDefault:1},
	
	118:{u:1,innerHTML:'搜索',on:{event:'click',func:function(e){commonui.uniSearchWindow(e)}},disableDefault:1},

	119:{u:1,title:'登出: 若你的帐号在其他终端登录本站, 亦可一并登出' ,innerHTML:'登出',
		href:'http://account.178.com/q_account.php?_act=logout&to='+window.location.href,
		on:{event:'click',func:function(e){
				if(confirm("你确认要登出吗")){
					if(confirm("是否要将其他终端一并登出\n\n(本机或其他设备上的浏览器与APP等)"))
						return true;
					else{
						__NUKE.doRequest({
							u:window.__API.logoutCurrent(),
							b:this,
							f:function(){
								alert('操作成功')
								}
							})
						}
					}
				commonui.cancelEvent(e);
				return false
				}
			},
		disableDefault:1
		},
	//120~140 for custom
	141:{ innerHTML:'界面设置',on:{event:'click', func:function(e){__SETTING.ui()} }},
	142:{ innerHTML:'移动验证器(beta)',on:{event:'click', func:function(e){commonui.extraAuthInput(e)} }},

	144:{u:1,innerHTML:'我的',subKeys:[25,105,146,1,2,3,104,93,107,101,102,149]},
	18:{innerHTML:'设置',subKeys:[97,95,141,22,108,142,109,110,111,112,113,149,150,152]},
	146:{innerHTML:'消息',subKeys:[26,27,148]},
	147:{ innerHTML:'商店',color:'gray',check:function(){
			if(window.__CURRENT_UID)
				return true
			},on:{event:'click',func:function(e){
		if(commonui.userItem)
			commonui.userItem.storeUi()
		else
			loader.script(__SCRIPTS.userItem,function(){commonui.userItem.storeUi()} )
		} } },
	148:{u:1,check:function(){if(__GP.ubSecAct)return true},href:'/nuke.php?func=message&asuid=34909933',innerHTML:'公共收件箱(帐号安全)',disableDefault:1,color:'sandybrown'},
	149:{u:1,href:'https://account.178.com/?p=renew_pass',innerHTML:'修改密码',disableDefault:1},
	150:{u:0,href:'https://account.178.com/?p=reset_pass',innerHTML:'重置密码',disableDefault:1},
	151:{href:'http://tv.nga.cn/',innerHTML:'直播站'},
	152:{u:1,check:function(){if(__GP.ubMod)return true},innerHTML:'debug',on:{event:'click',func:function(e){commonui.userDebug()}}}
	}




//版面icon==============
commonui.forumIcon={

get : function (fid){
if(fid<0)fid=fid.toString()
if (typeof(this.icon[fid])!='undefined'){
	if(this.icon[fid])
		fid=this.icon[fid]
	}
else
	fid=this.icon[0]
return __IMG_STYLE+'/f/'+fid+'.png'
},//fe
icon:{
0:37, 320:0, 181:0, 182:0, 183:0, 184:0, 185:0, 186:0, 187:0, 188:0, 189:0, 255:10, 306:10, 336:10, 190:0, 213:0, 218:0, 258:0, 272:0, 191:0, 200:0, 240:0, 274:0, 315:0, 333:0, 327:0, 318:0, 332:0, 321:0, 7:0, '-7':354, 354:0, 310:0, 323:0, 264:0, 10:0, 335:0, 18:0, 13:0, 16:0, 12:0, 8:0, 102:0, 254:0, 355:0, 116:0, 193:0, 201:0, 230:0, 334:0, 335:0, 29:0, 387:0, 388:0, 390:0, 391:0, '-46468':0,393:0,394:0,395:0,396:0,397:0,398:0,399:0,'-152678':0,403:0,'-447601':0,'-2371813':0,'-65653':0,411:0,412:0,414:0,311:414,'-235147':0,420:0,422:0,'-8725919':0,425:0,428:0,427:0,'-7861121':0,'-6194253':0,'-84':0,431:0,430:0,435:0,432:0,442:0,444:0,445:0,426:0,'-362960':0,452:0,'-187579':0,'-47218':0,'-51095':0,'-452227':0,'-532408':0,459:0,'-7202235':0,464:0,441:0,'-69124':0,'-1437546':0,469:0,463:0,474:0,406:0,446:0,'-343809':0,476:0,477:0}

}//ce

//
commonui.menuRight = function(){
return "<a href='http://www.xunyou.com/ep/dj/' target='_blank' style='display:block;position:absolute;right:0px;top:45px;width:50px;height:48px;background:url("+__IMG_BASE+"/misc/self/proxy2.png)'></a>"
}


commonui.indexBlock = {

single: 0,
l:null,
r:null,
rr:null,

loaded:null,
data:null,

load:function (l,r,c,rr){

if(!this.loaded){
	this.loaded=true
	var ee=1,self = this
	return __NUKE.doRequest({
		u:window.__API.indexForumList(),
		f:function(d){
			var e = __NUKE.doRequestIfErr(d,7209)
			if(e===true && ee){
				ee=false
				return
				}
			if(e)
				return console.log(e)
			var d = d.data[0]
			self.data = d
			commonui.indexBlock.load(l,r,c,rr)
			return true
			}
		})
	}

var x,h,w = window

this.single = w.__SETTING.bit & 4

if(this.single)
	x = this.data.single,h=1
else 
	x = this.data['double'],h=1

if(h==1){
	h = w.commonui.userCache.get('ForumViewHis')
	if(h){
		var hc =[]
		for (var k in h){
			if (h[k][2])
				hc.push(
					{fid:h[k][0],
					name:h[k][1]}
					)
			}
		if(hc.length)
			this.add(hc,'fast',0)
		}
	}

if(w.__CURRENT_UID && w.__GP && w.__GP.userBit & 32){//当前用户有个人版
	for(var k in this.data.all.other.content){}
	this.add([ {fid:w.__CURRENT_UID*-1 , name:"我的个人版" , bit:1/*hight light*/} ],'other',k)
	}

if(this.added){
	for(var i in this.added){
		var k = i.split('\t')
		this.data.all[k[0]].content[k[1]].content[k[2]] = this.added[i]
		}				
	}

var y='',z=''

for(var k in x[0]){
	if(this.data.all[x[0][k]])
		y+=this.genBlock( this.data.all[x[0][k]] )
	}
if(x[1]){
	for(var k in x[1]){
		if(this.data.all[x[1][k]])
			z+=this.genBlock( this.data.all[x[1][k]] )
		}
	}
else{
	r.style.display=c.style.display='none'
	l.style.width='100%'
	}

l.innerHTML=y
if(z)
	r.innerHTML=z


if ((w.ngaAds.bbs_ads26 || w.ngaAds.bbs_ads27) && !(w.__SETTING.bit & 16)){
	if(x[0] && x[1])
		var z = 75
	else
		var z = 150
	if(x[0])l.style.width=(l.offsetWidth-z)+'px'
	if(x[1])
		r.style.width=(r.offsetWidth-z)+'px', r.style.marginRight='5px'
	else
		l.style.marginRight='5px'
	rr.style.width='144px'
	rr.style.padding='4px 0px'
	rr.style.overflow='hidden'
	rr.style.height=(rr.parentNode.offsetHeight-8)+'px'
	rr.style.display='block'
	}

},//fe

added:null,

/*
将一个版面列表插入到某一块的末尾
x  array 数据数组 [版面数据,版面数据,版面数据 ...]
b  string 欲加入到的块ID 见this.data.all
c  int 欲加入到的子块ID
*/
add:function(x,b,c){
if(!this.added)
	this.added = []
var i=10000
for(var k in x){
	if(k!='length' && x[k])
		this.added[b+'\t'+c+'\t'+(i++)]=x[k]
	}
},//fe

genBlock :function(o){
//o = this.data.all[o]
if(o.id=='follow')
	return this.followBlock(o)
var c = ''
for (var k in o.content){
	if(o.content[k])
		c+=this.genSubBlock(o.content[k])
	}
if(!c.length)
	return ''
return "<span id='indexBlock"+o.id+"' class='indexblock'><h2 class='catetitle' "+(o.info?"title='"+o.info+"'":'')+">:: "+o.name+" ::<img src='about:blank' onerror='if(commonui.customBackgroundCheckHeight && commonui.customBackgroundCheckHeight(this.parentNode))this.parentNode.className+=\" invertThis\"' class='x'/></h2><div class='catenew' id='indexBlock"+o.id+"Content'>"+(o.pic?this.genPicTitle(o.pic):'')+c+"</div class='catenew'></span id='indexBlock'>"+ngaAds.bbs_ads29_gen(o.id)
},//fe

followBlock:function(o){
if(!__CURRENT_UID)return ''
if(!__DEBUG)return ''
var c = "indexBlock"+o.id+"Content" , $ = _$,
_QPK_TYPE = 0,
_QPK_AID = 1,
_QPK_TID = 2,
_QPK_PID = 3,
_QPK_RPID = 4,
_QPK_TIME = 5,
_QPK_MORE =6,

_P_TID = 0,
_P_FID = 1,
_P_PID = 2,
_P_TYPE = 3,
_P_AID = 4,
_P_TIME = 5,
_P_SUBJ = 6,
_P_CNT = 7,

_Q_TP_USER = 1,//uid发布了tid/pid 回复pid为reply_to的回复
_Q_TP_TOPIC = 2,//tid中uid发布了pid 回复pid为reply_to的回复
_Q_TP_POST = 4//tid中uid发布了pid 回复pid为reply_to的回复

httpDataGetter.script_muti_get({u:__API._base+"__lib=follow&__act=get_push&raw=3",a:{raw:3}},
	function(x){
		if (!x)
			$(c).innerHTML = 'error 0';
		else if (!x.data)
			$(c).innerHTML = 'error 1';
		else if( x.error)
			$(c).innerHTML = x.error
		else{
			//console.log(x.data)
			var l = x.data[0][1], t = x.data[0][2], p = x.data[0][3], u = x.data[0][4], max = x.data[0][0], perp = x.data[0][5], i=0, b= $('/table').$0('className','forumbox', 'style','border:none'), more=[]
			
			for(var k in l){
				var brk=0
				for(var j in l[k]){
					var d = l[k][j], r=null, tt = null, pp = null
					if(brk){
						if(!more[k])more[k]=[]
						more[k].push(d)
						//b._.add($('/tr').$0('className','row'+(1+((i++)&1)), $('/td')._.add('continue '+k) ))
						continue;
						}
					if(d[_QPK_TYPE] & _Q_TP_USER){
						if(!t[d[_QPK_TID]] || (d[_QPK_PID] && !p[d[_QPK_PID]])){
							r = $('/td').$0('className','c1','style','padding:0.25em')._.add('点击查看 '+u[d[_QPK_AID]]+' 的更多动态 '+k+ ' '+t[d[_QPK_TID]]+' '+p[d[_QPK_PID]])
							brk = 1
							}
						if(d[_QPK_PID])
							pp = p[d[_QPK_PID]]
						else
							pp = t[d[_QPK_TID]]
						}
					else if(d[_QPK_TYPE] & _Q_TP_TOPIC){
						if(!u[d[_QPK_AID]] || (d[_QPK_PID] && !p[d[_QPK_PID]])){
							r = $('/td').$0('className','c1','style','padding:0.25em')._.add('点击查看 '+t[d[_QPK_TID]][_P_SUBJ]+' 的更多动态 '+k)
							brk = 1
							}
						pp = p[d[_QPK_PID]]
						}
					else if(d[_QPK_TYPE] & _Q_TP_POST){
						if(!u[d[_QPK_AID]] || (d[_QPK_PID] && !p[d[_QPK_PID]])){
							r = $('/td').$0('className','c1','style','padding:0.25em')._.add('点击查看回复的更多动态 '+k)
							brk = 1
							}
						pp = p[d[_QPK_PID]]
						}

					tt = t[d[_QPK_TID]]

					if(!r){
						r = $('/td').$0('className','c1','style','padding:0.25em')._.add(
							$('/span').$0('style','float:right')._.add(
								commonui.time2date(d[_QPK_TIME] , 'y-m-d H:i '),
								$('/a').$0('href','/read.php?tid='+d[_QPK_TID]+(d[_QPK_PID] ? '&to=1&pid='+d[_QPK_PID] : ''),'innerHTML','阅读')
								),
							'('+k+')',
							$('/a').$0('href','/nuke.php?func=ucp&uid='+d[_QPK_AID],'innerHTML',u[d[_QPK_AID]]),
							d[_QPK_PID] ? ' 回复了 ' :  ' 发布了 ',
							$('/a').$0('href','/read.php?tid='+d[_QPK_TID],'innerHTML',t[d[_QPK_TID]][_P_SUBJ]),
							d[_QPK_RPID] ? ' 中的 ' : '',
							d[_QPK_RPID] ? $('/a').$0('href','/read.php?tid='+d[_QPK_TID]+'&to=1&pid='+d[_QPK_RPID],'innerHTML','回复') : '',
							$('/br'),
							$('/div').$0('className','postcontent ubbcode gray','style','padding:0.5em','innerHTML',ubbcode.bbsCode({
								txt:d[_QPK_PID] ? p[d[_QPK_PID]][_P_CNT] : t[d[_QPK_TID]][_P_CNT],
								noImg:1,
								fId:0,
								tId:d[_QPK_TID],
								pId:d[_QPK_PID] ? d[_QPK_PID] : 0,
								authorId:pp[_P_AID],
								rvrc:__GP.rvrc,
								isSig:0,
								isLesser:0,
								isNukePost:(pp[_P_TYPE] & 2048) ? 1 : 0
								}))
							)
						}
					b._.add($('/tr').$0('className','row'+(1+((i++)&1)), r ))
					}
				}
			$(c)._.add(b)
			}
		return true
		},
	function(){
		$(c).innerHTML = 'error 2'
		}
	);

return "<span id='indexBlock"+o.id+"' class='indexblock'><h2 class='catetitle' "+(o.info?"title='"+o.info+"'":'')+">:: "+o.name+" ::<img src='about:blank' onerror='if(commonui.customBackgroundCheckHeight && commonui.customBackgroundCheckHeight(this.parentNode))this.parentNode.className+=\" invertThis\"' class='x'/></h2><div class='catenew' id='indexBlock"+o.id+"Content'>"+(o.pic?this.genPicTitle(o.pic):'')+"</div class='catenew'></span id='indexBlock'>"+ngaAds.bbs_ads29_gen(o.id)
},//fe

genPicTitle :function(o){//txt,link,color,shadow
if(!o.shadow)o.shadow = '#000'
if(!o.color)o.color = '#A99877'
if(o.link)
	o.txt = "<a href='"+o.link+"' taeget='_blank' style='color:"+o.color+";text-shadow:"+o.shadow+" 2px 2px'>"+o.txt+"</a>"
else if(o.txt)
	o.txt = "<span style='color:"+o.color+";text-shadow:"+o.shadow+" 2px 2px'>"+o.txt+"</span>"
else
	o.txt = ''
if(o.pic.substr(0,7)!='http://')
	o.pic = __IMG_STYLE+o.pic
return "<div style='height:38px;font-size:18px;font-weight:bold;vertical-align:bottom;text-align:right;padding:5px'>"+o.txt+"</div><img src='about:blank' class='x' onerror=\"this.parentNode.style.backgroundImage='url("+o.pic+")';this.parentNode.style.backgroundRepeat='repeat-x'\"/>"
},//fe

bg2 : [4,3,3,4],
bg3 : [4,3],
bgs:null,
genSubBlock :function(o){//content,subWidth,name,dscp,icon,nameWidth
var c='',x,y,bg,i=0
if (!o.subWidth || o.subWidth==33)
	bg = this.bg3,y=3
else
	bg = this.bg2,y=2
while(bg[0]==this.bgs)
	bg.push(bg.shift())
for (var k in o.content){
	if(k=='length')continue
	x = o.content[k]
	if(!x)continue
	if(i%y==0)
		this.bgs=bg[0]
	i++
	c+=this.genforum(x, bg[0], c.length?0:1)
	bg.push(bg.shift())
	}
if(!c)
	return '';

return (o.name ? "<h3 class='catetitle'>:: "+o.name+" ::</h3>" : '')+"<div class='c b2' style='float:none;width:auto;margin:0;height:auto'><div style='height:auto' class='b sw"+o.subWidth+"'>"+(o.clp ? '<div class="c b3" style="width:100%;text-align:center"><div class="a"><div class="b"><a href="javascript:void(0)" onclick="var tmp = this.parentNode.parentNode.parentNode;tmp.style.display=\'none\';tmp.nextSibling.style.display=\'\'" class="uitxt1"><span style="font-size:1.15em">显示更多版面</span></a></div></div></div><span style="display:none">' : '')+c+(o.clp ? '</span>' :'')+"<div class='clear'></div></div class='b sw'></div class='c b2'>"


},//fe

genforum :function(x,bg,first){
if(typeof x=='number')
	var x = this.index[x]
if(typeof x[1] == 'object')
	var link = x[2], icon = x[3], k=x[0], name = this.single && x[1][2]?x[1][2]:x[1][0], info = this.single && x[1][3]?x[1][3]:x[1][1], invert = x[4],stid
else if(x.name)
	var link = x.link, icon = x.icon, k=x.fid, stid=x.stid, name = this.single && x.nameS ? x.nameS : x.name, info = this.single && x.infoS ? x.infoS : x.info, invert = (x.bit & 1) || (x.time && __NOW-x.time<86400*7)
else
	var link = x[3], icon = x[4], k=x[0], name = this.single && x[5]?x[5]:x[1], info = this.single && x[6]?x[6]:x[2], invert = x[7],stid

var target=''
if(!link)link = stid ? "/thread.php?stid="+stid : "/thread.php?fid="+k
else target = "target='_blank'"
if(!info)info=''
return "<div class='c b"+bg+(invert?' invert':'')+(first?' first':'')+"' style='background-image:url("+this.getIcon(k,icon,invert)+")'><div class='a'><div class='b'><a href='"+link+"' "+target+" class='uitxt1'>"+name+"</a><br/><p"+(k==477?" onclick='commonui.indexBlock.change(this)'":'')+">"+info+" </p></div class='b'></div class='a'></div class='c'>"

},//fe

change:function(d){
var o=d.previousSibling.previousSibling, w = o.offsetWidth, p = o.parentNode
p._saveChange = [ p.removeChild(o.nextSibling), p.removeChild(o), p.removeChild(d)]
_$(p)._.add(
	_$('/textarea').$0('style', 'height:2.4em;padding:1px;line-height:1.1em;width:90%', 'value', o.innerHTML+"\n"+d.innerHTML, 'onblur', function(){commonui.indexBlock.saveChange(this)})
	)
},//fe

saveChange:function(o){
var p = o.parentNode, n = o.value.match(/.+/g)
if(n&&n[0]){
	p._saveChange[1].innerHTML = n[0]
	p._saveChange[2].innerHTML = n[1]
	}
p.innerHTML = ""
p.appendChild(p._saveChange[1])
p.appendChild(p._saveChange[0])
p.appendChild(p._saveChange[2])
console.log( p._saveChange)
},//fe


getIcon:function (fid,icon,invert){
if(icon){
	if(parseInt(icon,10))
		fid=icon
	else
		return icon
	}
fid = commonui.forumIcon.get(fid)
if(invert)
	fid = fid+'.invert.png'
return fid
}//fe

}//ce
