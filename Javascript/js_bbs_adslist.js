/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
bbs.ngacn.cc ����б� v1.00
written by zeg 20051010
========================

/* �ܱ� */
if(!window.ngaAds)
	ngaAds = [];

ngaAds.objClone = function(o){
	if(o == null || typeof(o) != 'object')return o;
	var oo = new o.constructor();
	for(var k in o)oo[key] = this.objClone(o[key]);
	return oo;
	}
ngaAds.ckurl = function(url){
	return location.pathname==url ? true : false
	}
ngaAds.clear = function (){
var s = this
for (var k in s){
	if(k.match(/^bbs_ads\d+$/))
		delete s[k]
	}
}


ngaAds.push( {
	date: "01/5/2015-01/30/2015",
	id: "bbs_ads32",
	rate: "33",
	title: "�籩Ӣ�۹������Է���",
	url: "/read.php?tid=7758611"
	})
ngaAds.push( {
	date: "01/5/2015-01/30/2015",
	id: "bbs_ads32",
	rate: "33",
	title: "���ּ����� 2014�����̵�",
	url: "/read.php?tid=7727592"
	})
ngaAds.push( {
	date: "01/5/2015-01/30/2015",
	id: "bbs_ads32",
	rate: "33",
	title: "С�������� ���ι�������",
	url: "/read.php?tid=7756429"
	})



ngaAds.count32 = 0
/*bbs_ads32 һ��¥������ */
ngaAds.bbs_ads32_gen = function(){
if(__SETTING.bit & 4)
	return ''
if ((this.count32++ <= 1) && this.bbs_ads32)
	return "<span class='bbs_ds32 small_colored_text_btn'>"+this.genAds(this.bbs_ads32)+"</span> "
return ''
}

ngaAds.count31 = 0
/*bbs_ads28 ��¥��ͨ�� 900��60*/
ngaAds.bbs_ads31_gen = function(){
if(__SETTING.bit & 4)
	return
if ((ngaAds.count31++ == 1) && (this.bbs_ads31 || this.bbs_ads1)){
	var x=''
	x+="<div class='adsc' id='bbs_ds31'>"
	if(this.bbs_ads1)
		x+=this.genAds(this.bbs_ads1)
	if(this.bbs_ads31)
		x+=this.genAds(this.bbs_ads31)
	put(x+"<div class='clear'></div></div>");
	}
}

/* 
bbs_ads26 ��̳��ҳ��1 140*550~1100
bbs_ads27 ��̳��ҳ��2 140*550~1100 
*/

function bbs_ads26_27(){
if(__SETTING.bit & 8)
	return
var x = ngaAds
if (x.bbs_ads26)
	put(x.genAds(x.bbs_ads26));

if (x.bbs_ads27){
	if(x.bbs_ads26)put("<div style='width:auto;border:none;padding:0;margin:0;float:none;height:20px;font-size:0px;line-height:0px'></div>")
	put(x.genAds(x.bbs_ads27));
	}

}

/*
 bbs_ads8 ��̳�Ķ�����ҳ�棨��������1���Ҳ�190*400
 bbs_ads24 ��̳�Ķ�����ҳ�棨��������1���Ҳ�190*400 ���ȼ�����bbs_ads24

 bbs_ads21 ��̳�Ķ�����ҳ�棨��������2���Ҳ�190*400
 bbs_ads25 ��̳�Ķ�����ҳ�棨��������2���Ҳ�190*400 ���ȼ�����bbs_ads21

 bbs_ads17 ��̳�Ķ�����ҳ�棨��������3���Ҳ�190*400
 */
ngaAds.bbs_ads8_preload = function(){

}//fe

ngaAds.bbs_ads8_load_new = function(o,i,fid){
if(o.parentNode.tagName!='TR' || o.parentNode.offsetWidth<1200)
	return
var a;
if (this.bbs_ads8 && i==0)
	a = this.bbs_ads8
if (this.bbs_ads24 && i==0)
	a = this.bbs_ads24
if (this.bbs_ads21 && i==1)
	a = this.bbs_ads21
if (this.bbs_ads25 && i==1)
	a = this.bbs_ads25
if (this.bbs_ads17 && i==2)
	a = this.bbs_ads17
if (a)
	{
	if (typeof(a.file)=='object'){
		if (a.file['f'+fid])
			a.file = a.file['f'+fid];
		else
			a.file = a.file['default'];
		}
	o.innerHTML=this.genAds(a);
	_$(o).$0('style',{background:'#444',padding:'5px',width:'192px',textAlign:'center',verticalAlign:'top'},'className',null)
	}
}//fe




/*��̳ȫҳ����ͨ�� 900��60		bbs_ads1*/
ngaAds.bbs_ads1_gen=function(x){
if(__SETTING.bit & 4)
	return '';

if (this.bbs_ads1)
	return "<div id='adsc1' class='adsc' "+(x?"style='margin-top:"+x+"'":'')+">"+this.genAds(this.bbs_ads1)+'</div>'
return ''
}

/*��̳ȫҳ����ͨ�� 900��60		bbs_ads1*/
/*��̳�����б�ҳ�棨���棩��ͨ�� 900*60		bbs_ads9 bbs_ads23*/
/*-7�����б�ҳ�棨���棩��ͨ�� 900*60		bbs_ads28 */
function bbs_ads9(){
if(__SETTING.bit & 4)
	return
if (window.__CURRENT_FID && !window.__CURRENT_TID){
	var n=window.ngaAds, w = window.put, x=null;
	if(__CURRENT_FID==7)
		x = 'http://wow.178.com/201405/t_194057600319.html'
	else if(__CURRENT_FID==-152678)
		x = 'http://lol.178.com/201406/t_196305728696.html'
	else if(__CURRENT_FID==321)
		x = 'http://dota2.178.com/201406/t_196629645242.html'
	else if(__CURRENT_FID==-362960)
		x = 'http://ccq.178.com/201411/t_209179391466.html'
	else if(__CURRENT_FID==318)
		x = {0:'http://d3.178.com/s/ngacalculator/index.html',1:200}
	else if(__CURRENT_FID==422)
		x = 'http://ccq.178.com/201411/t_209252535303.html'
	else if(__CURRENT_FID==431)
		x = 'http://ccq.178.com/201412/t_212811964561.html'
	else if(__CURRENT_FID==399)
		x = 'http://d3.178.com/s/snakewindow/index.html'
	else if(__CURRENT_FID==469)
		x = {0:'http://s1.xsqs.178.com/nga_game.php?game=xsqs',1:655}
	else if(__CURRENT_FID==474)
		x = {0:'http://s1.xjwy.178.com/nga_game.php?game=xjwy',1:750}
	else if(__CURRENT_FID==472)
		x = 'http://ccq.178.com/cos/index.html'
	else if(__CURRENT_FID==452)
		x = 'http://ccq.178.com/201507/t_230506050628.html'
	else if(__CURRENT_FID==-69124)
		x = '<span style="text-align:center"><table class=" stdbtn" style="margin-left:auto;margin-right:auto"><tbody><tr><td><a href="javascript:void(0)" class="b teal" onclick="ngaAds.open_69124(event)"><nobr><span style="font-size:1.5em">ս����Ů���Ͽ�</span></nobr></a></td></tr></tbody></table></span>'
	if(x){
		var h=190
		if(x.constructor == Object)
			var h = x[1],x = x[0]
		w("<thead><tr><th style='height:3px'></th></tr></thead><tbody><tr><td>")
		if(x.substr(0,7) == 'http://')
			w("<ifra"+"me src='"+x+"' style='margin:0px;overflow:hidden;width:100%;height:"+h+"px;border:none' scrolling='no' frameborder='0' allowTransparency='true'></ifr"+"ame>")
		else
			w(x)
		w("</td></tr></tbody>");
		}
	if (n.bbs_ads1 || n.bbs_ads9 || n.bbs_ads23 || (n.bbs_ads28 && window.location.search.match(/(?:\?|&)fid=-7(?:&|$)/i))){
		w("<thead><tr><th style='height:3px'></th></tr></thead><tbody><tr><td id='adsc9' class='adsc'>");
		if(n.bbs_ads1)
			w(n.genAds(n.bbs_ads1));
		if(n.bbs_ads9)
			w(n.genAds(n.bbs_ads9));
		if(n.bbs_ads23)
			w(n.genAds(n.bbs_ads23));
		if(n.bbs_ads28)
			w(n.genAds(n.bbs_ads28));
		w("</td></tr></tbody>");
		}
	}
}//fe

ngaAds.open_69124=function(e){
if(!this.open_69124.w){
	this.open_69124.w = commonui.createCommmonWindow()
	this.open_69124.w._.addContent(null)._.addTitle('ս����Ů���Ͽ�')._.addContent(
		_$('/iframe').$0('src','http://js.ntwikis.com/?nologin=1','style',{margin:'0px',overflow:'hidden',width:'100%',height:'600px',border:'none'})
		)
	}
this.open_69124.w._.show(null,null,2)
}//fe

ngaAds.bbs_ads30 = function(){
if(__SETTING.bit & 4)
	return
window.put("<div class='catenew'><ifra"+"me src='http://wow.178.com/201407/t_198270781239.html' style=margin:0px;overflow:hidden;width:100%;height:175px;border:none' scrolling='no' frameborder='0' allowTransparency='true'></ifr"+"ame></div>");

}//fe

/*ͨ�����B ��̳ȫҳ����ͨ�� 900��60	bbs_ads14*/
ngaAds.bbs_ads14_gen = function(){
if(__SETTING.bit & 4)
	return
if (this.bbs_ads14){
	var x=''
	x+="<div class='adsc' id='bbs_ads14'><span class='dslabel'>ADVERTISEMENT</span><br/>"
	x+=this.genAds(this.bbs_ads14)
	if (this.bbs_ads14_2)
		x+="<br style='height:10px;line-height:10px'/>"+this.genAds(this.bbs_ads14_2)
	put(x+"<div class='clear'></div></div>");
	}
}

/*��̳ȫҳ����ת			bbs_ads12*/
//������js_default.js


/*�����������A ��̳�����б�ҳ�棨���棩�ײ����ٷ����Ҳ� 190*400 bbs_ads16*/
/*�Ķ�����ҳ��ײ����ٷ����Ҳ� 190*400 bbs_ads22*/
ngaAds.bbs_ads16_gen=function(){
if(__SETTING.bit & 4)
	return null
var ad = null
if (this.ckurl('/thread.php')){
	if (this.bbs_ads24)
		this.bbs_ads16=this.bbs_ads24
	if (this.bbs_ads16)
		ad = this.genAds(this.bbs_ads16)
	}
if (this.bbs_ads22 && this.ckurl('/read.php'))
	ad = this.genAds(this.bbs_ads22)
if (ad)
	return _$('/td').$0('id','bbs_ads16','className','adsh','innerHTML',ad)
return null
}

/**/
ngaAds.bbs_ads29_gen = function(id){
if((__SETTING.bit & 8)==0 && id==1 && this.bbs_ads29)
	return "<div class='adsc' id='bbs_ads29' style='margin-top:1em'><span class='dslabel'>ADVERTISEMENT</span><br/>"+this.genAds(this.bbs_ads29)+"<div class='clear'></div></div>"
return ''
}


/*���������*/
ngaAds.loadCustomAds=function(arg)
{/*
if (arg.uid && parseInt(arg.uid,10)==3213167){
ngaAds['bbs_ads23'] = {
	'id':'bbs_ads23',
	'file': __IMG_BASE+'/misc/self/tmp090903.jpg',
	'url':'',
	'title':'',
	'width':'900',
	'height':'60',
	'date':'8/4/2009-8/30/2009',
	'rate':100,
	'nolog':1,
	'type':''
	}
}*/
}//fe











/*
ngaAds.push({
	'id':'bbs_ads21',				//���λID
	'file':'http://xin.178.com/s/zt/sc2.html',		//�ļ� ͼƬ �� flash �� Ƕ��ҳ���ַ ���Ϊ����ʹ���������� ����Ϊ.title
	'url':'',			//���ӵ�ַ ��flash�Դ������򲻱���д
	'title':'178�����Ƽ�',			//ͼƬ˵�� flash������д
	'width':'190',				//���(������������190)
	'height':'400',				//�߶�(������������400)
	'date':'3/17/2009-11/1/2009',	//����(���ղ���ʾ�������) ���� 2/15/2006 7/1/2006-7/31/2006 8/1/2006-8/31/2006 ��Ϊ��2��15�պ�7����8����ʾ ����all��Ϊһֱ��ʾ
	'rate':25,					//��ʾ�ļ��ʣ��ٷֱȣ���ͬһ�����λ�����е�����ʾ�Ĺ����ʾ�������Ӧ������100���糬��100��������ǰ������ȣ������һ��70�ڶ���60������20��ʵ����Ϊ��һ��70�ڶ���30����������ʾ��
	'nolog':1,					//Ϊ1ʱ��ͳ�Ƶ���� 0ʱͳ�Ƶ����
	'type':'iframe'					//���� ��ͼƬ��flash������� Ƕ��ҳ������iframe
});
*/
/*
ngaAds.push({
	'id':'bbs_ads21',
	type:'baidu',
	'width':'190',
	'height':'400',
	'date':'all',
	cpro_id:'u1447674',
	rate:100
});

ngaAds.push({
	'id':'bbs_ads14',
	type:'baidu',
	'width':'900',
	'height':'60',
	'date':'all',
	cpro_id:'u1449408',
	rate:100
});





ngaAds.push({
	'id':'bbs_ads17',
	'file':'http://wow.178.com/s/zt/sjk4.html',
	'url':'',
	'date':'all',
	'rate':15,
	'width':'190',
	'height':'400',
	'nolog':1,
	'type':'iframe'
});

// baidu
ngaAds.push({
	id:'bbs_ads14',
	//'file':'http://cpro.baidu.com/cpro/ui/cp.js',//cpro_client
	type:'baidu',
	date:'all',
	rate:100,
	cpro_id:'u1365489',
	ifShow:function(){
		if(window.__CURRENT_FID && (__CURRENT_FID==-7 || __CURRENT_FID==-152678) && location.pathname.indexOf('/thread.php')===0)
			return true
		}
});

// taobao

ngaAds.push({
	id:'bbs_ads29',
	'file':'http://p.tanx.com/ex?i=mm_44474956_4200394_13764006',//cpro_client
	type:'taobao',
	date:'all',
	rate:100,
	mmid:'tanx-a-mm_44474956_4200394_13764006'
});
*/
/*

ngaAds.push({
	'id':'bbs_ads13',
	'file':__IMG_BASE+'/misc/self/20060830.jpg',
	'url':'',
	'title':'��߷�����ʶ�������ʺŰ�ȫ',
	'width':'',
	'height':'',
	'date':'all',
	'rate':2,
	'nolog':1
});

ngaAds.push({
	'id':'bbs_ads13',
	'file':__IMG_BASE+'/misc/self/20060829.jpg',
	'title':'ֹͣ�����ң��õ���������ͼ',
	'date':'all',
	'rate':4,
	'nolog':1
});


*/


//����

/*
(function(){
var fAds = []
//�����
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f1.jpg',
	'url':'/thread.php?fid=200'
});
//����
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f2.jpg',
	'url':'/thread.php?fid=102'
});
//ʥ��
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f184a.jpg',__IMG_BASE+'/misc/self/f/f3.jpg'),
	'url':'/thread.php?fid=184'
});
//ħ��
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f4.jpg',
	'url':'/thread.php?fid=182'
});
//����
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f187a.jpg',__IMG_BASE+'/misc/self/f/f5.jpg'),
	'url':'/thread.php?fid=187'
});
//��ʦ
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f6.jpg',
	'url':'/thread.php?fid=183'
});
//��ʿ
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f7.jpg',
	'url':'/thread.php?fid=188'
});
//der
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f8.jpg',
	'url':'/thread.php?fid=186'
});
//�ؾ�
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f9.jpg',
	'url':'/thread.php?fid=191'
});
//����
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f10.jpg',
	'url':'/thread.php?fid=272'
});
//սʿ
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f12.jpg',__IMG_BASE+'/misc/self/f/f181a.jpg'),
	'url':'/thread.php?fid=181'
});
//����
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f185.jpg',
	'url':'/thread.php?fid=185'
});
//��
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f189a.jpg',__IMG_BASE+'/misc/self/f/f189.jpg'),
	'url':'/thread.php?fid=189'
});
//����
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f11.jpg',
	'url':'/thread.php?fid=190'
});
var j = Math.floor(Math.random()*(fAds.length));
if (typeof(fAds[j]['file'])=='object')
	fAds[j].file = fAds[j].file[ Math.floor(Math.random()*fAds[j]['file'].length)]
ngaAds.push({
	'file':fAds[j]['file'],
	'url':fAds[j]['url'],
	'id':'bbs_ads13',
	'date':'all',
	'rate':5,
	'nolog':1
});
})()
*/
;(function(){
var tmp = window.navigator.userAgent.toLowerCase()
if(tmp.indexOf('iphone ')==-1  && tmp.indexOf('android')==-1)
	return
//if(tmp.indexOf('ipad')!=-1)
//	return

for(var k in ngaAds){
	if(ngaAds[k] && ngaAds[k].id && ngaAds[k].id=="bbs_ads12")
		ngaAds[k].date=null
	}
ngaAds.push( {
	date: "all",
	file: tmp.indexOf('ipad')!=-1 ? __IMG_STYLE+"/mobile_app_banner5.jpg" : __IMG_STYLE+"/mobile_app_banner4.jpg?342",
	height: "600",
	id: "bbs_ads12",
	nolog: "1",
	now: 1398355200000,
	rate: "100",
	refreshid: "",
	title: "",
	type: "",
	url: "http://app.178.com",
	width: "600"
	})
	
})();

