
if(!window.commonui)
	var commonui = {}


commonui.recommendPost = function(e,i,o){
if(!window.__CURRENT_UID && !i.length)
	return
var a = commonui.postArg.data[i], tid = a.tid, pid = a.pid, i = a.atItem, y

this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('����')
var self = this, store = function(y,o){
	if(!window._ITEM)
		return loader.script(__SCRIPTS.userItem,function(){
			store(y,o)
			} )
	o.style.fontWeight='bold'
	o=o.parentNode
	for(var i=0;i<o.childNodes.length;i++)
		o.childNodes[i].disabled=1
	o=o.nextSibling
	o.innerHTML=''
	o._.add(_$('/h4').$0('className',"textTitle",'innerHTML','Ȼ����һ����Ʒ�Ա����'))
	o=o.nextSibling
	y = tid+'\t'+(pid?pid:0)+'\t'+y
	var io = new_ITEM_inset(o)
	io.storeBuyAndUse(1,5,0,y,null)//���5 ��������

	}//fe
if(window.__CURRENT_UID)
	this.adminwindow._.addContent(
		_$('/span')._.add(
			_$('/h4').$0('className',"textTitle",'innerHTML','����ѡ�����̬��'),
			_$('/span')._.add(
				_$('/button').$0('type','button','innerHTML','֧��','onclick',function(ev){store(1,this)}),
				_$('/button').$0('type','button','innerHTML','·��','onclick',function(ev){store(0,this)}),
				_$('/button').$0('type','button','innerHTML','����','onclick',function(ev){store(-1,this)})
				),
			_$('/span'),
			_$('/span')._.cls('item_ui')
			)
		)
if(i){
	var x=_$('/span').$0('className',"silver",'style',{lineHeight:'2.3em',fontSize:'2em',fontWeight:'bold'})
	for(var j=0;j<i.length;j++){
		var k = i.id(j)
		if(this.atItems[k]){
			if(this.atItems[k].constructor==String)
				this.atItems[k] = this.atItems[k].split('\t')
			x._.add(
				' '+i.count(j)+'��',
				_$('/img').$0('src',this.atItems[0]+this.atItems[k][1],'style',{width:'2em',height:'2em',verticalAlign:'middle'},'title',this.atItems[k][0]+' : '+this.atItems[k][2])
				)
			}
		if(j&1)
			x._.add(_$('/br'))
		}
	this.adminwindow._.addContent(
		_$('/br'),_$('/br'),
		_$('/h4').$0('className',"textTitle silver",'innerHTML','�����û�����ʹ�õĵ���'),
		x
		)
	}
this.adminwindow._.show(e)
}//fe

commonui.atItems = {//�ο� items/lib_at_item.php
0:__IMG_STYLE+'/items/',
1:'��Ӳ����\t5_1.gif\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
2:'׶�ξ޽�\t5_2.gif\t��ȻҲû��~���ǻ�Ǯ��������֤���ҵĳ���~',
10:'�㵱\t5_10.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
11:'��ˮ��\t5_11.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
12:'����\t5_12.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
13:'����\t5_13.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
14:'����\t5_14.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
15:'�����ҩ\t5_15.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
16:'ף��\t5_16.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
17:'�洫DNA\t5_17.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~'
}//fe

/*****************************
 * ���Ӳ������洦��
 */
commonui.postArg = {
data:{},
w:window,
__GP:window.__GP,
def:{},
toInt:__NUKE.toInt,
//�������Ӳ�����Ĭ��ֵ �μ�proc
setDefault:function(fid,stid,tid,tAid,topicMiscBit1){//����id ���ںϼ���stid ����id ����id ��������id
this.def = {
	fid:fid,
	stid:this.toInt(stid),
	tid:tid,
	tAid:this.toInt(tAid),
	tmBit1:this.toInt(topicMiscBit1)
	}
},
//�������Ӳ��� �μ�proc
proc:function(
i,//¥��/����id
pC,subjectC,contentC,signC,uInfoC,pInfoC,postBtnC,//����block/ ����/ ����/ ǩ��/ �û���Ϣ/ ������Ϣ/ ���Ӳ�����ť���� node id
fid,tid,pid,type,//����id ����id ����id ��������bit
tAid,pAid,postTime,recommend,cLength,//��������id ��������id ����ʱ��� �����Ƽ�ֵ �������ݳ���
ip,orgForum,fromClient,orgFid,stid,atItem //����ip ԭ������ �����Կͻ��� ԭ����fid ���ںϼ���stid ������ʹ�õĵ���
){
this.data[ i ]={
	i:i,
	pC:pC,
	subjectC:subjectC,
	contentC:contentC,
	signC:signC,
	uInfoC:uInfoC,
	pInfoC:pInfoC,
	postBtnC:postBtnC,
	fid:fid ? fid : this.def.fid,
	tid:tid ? tid : this.def.tid,
	pid:pid,
	type:type = this.toInt(type),
	comment:((type&1) && typeof i !='number')?true:false,//�Ƿ���ʾΪ����
	tAid:tAid ? tAid : this.def.tAid,
	pAid:pAid,
	postTime:postTime,
	recommend:__NUKE.toInt(recommend),
	cLength:this.toInt(cLength),
	ip:ip,
	orgForum:orgForum,
	orgFid:orgFid,
	atItem:atItem ? this.atItemSort(atItem) : null,
	stid:stid ? stid : this.def.stid,
	fromClient:fromClient,
	tmBit1:this.def.tmBit1,
	correctNode:i==0?true:false,
	__GP:this.__GP,
	__CURRENT_UID:this.w.__CURRENT_UID
	}

this.w.commonui.postBtn.load(i)
this.w.commonui.postDisp(i)
},//fe
atItemSort:function(a){
var a = a.split(','),b=[]
b.id=function(i){return this[i]&32767}
b.count=function(i){return this[i]>>15}
for(var j=0;j<a.length;j+=2)
	b.push((a[j+1]<<15)|(a[j]&32767))
b.sort(function(a,b){
	if(a>b)return -1
	else if(a<b)return 1
	else return 0
	})
return b
}//fe
}//ce commonui.postArg



/*****************************
* ���Ӳ�����ť
*/
commonui.postBtn={
parent:commonui,
saveKey:'postBtnHis',
d:{
1:{u:'/nuke.php?func=topicrecommend&tid={tid}',n1:'�Ƽ�',n2:'����������Ƽ�ֵ',
	ck:function(a){if (!a.pid && (a.__GP.admincheck&2))return 1} },

//2:{u:'nuke.php?func=post_recommend&tid={tid}&pid={pid}',n1:'����',n2:'��������������ή�ͷ����ߵ�����',
//	ck:function(a){if (a.pid && a.pid!='tpc'&& __GP['rvrc']>=0 && a.authorid!=__CURRENT_UID)return 1} },
//3:{u:'nuke.php?func=post_recommend&tid={tid}&pid={pid}&good=1',n1:'֧��',n2:'֧���������������߷����ߵ�����',
//	ck:function(a){if (a.pid && a.pid!='tpc'&& __GP['rvrc']>=0 && a.authorid!=__CURRENT_UID)return 1} },

4:{u:'/read.php?pid={pid}&to',n1:'����',n2:'��ת���������Ķ�����',c:'red',
	ck:function(a){if (a.pid && window.location.href.indexOf('pid=')!=-1)return 1} },

5:{n1:'�ٱ�',n2:'�ٱ�����������',on:function(e,a){commonui.logPost(e,a.tid,a.pid)},
	ck:function(a){if ( a.__GP.rvrc>-50 || a.__GP.admincheck)return 1} },

6:{
	u:'/post.php?action=modify&_newui&fid={fid}&tid={tid}&pid={pid}&article={i}',
	on:{
		mousedown:function(e,a,o){
			postfunc.btnStatOn(o)
			},
		click:function(e,a,o){
			if(postfunc.btnStatOff(o) || o.__t3){
				commonui.openPostWindow(e,postfunc.__MODIFY,'',a.tid,a.pid)
				return commonui.cancelEvent(e)
				}
			},
		touchstart:function(e,a,o){
			o.__t3 = true
			}
		},
	n1:'�༭',
	c:'disable_tap_menu',
	ck:function(a){if (a.pAid==a.__CURRENT_UID || a.__GP.admincheck)return 1} },

7:{u:'/post.php?action=quote&_newui&fid={fid}&tid={tid}&pid={pid}&article={i}',
	on:{
		mousedown:function(e,a,o){
			postfunc.btnStatOn(o)
			},
		click:function(e,a,o){
			if(postfunc.btnStatOff(o) || o.__t3){
				commonui.openPostWindow(e,postfunc.__QUOTE,'',a.tid,a.pid)
				return commonui.cancelEvent(e)
				}
			},
		touchstart:function(e,a,o){
			o.__t3 = true
			}
		},
	c:'disable_tap_menu',
	n1:'����',
	ck:function(a){if (a.__CURRENT_UID)return 1} },

8:{u:'/post.php?action=reply&_newui&fid={fid}&tid={tid}&pid={pid}&article={i}',
	on:{
		mousedown:function(e,a,o){
			postfunc.btnStatOn(o)
			},
		click:function(e,a,o){
			if(postfunc.btnStatOff(o) || o.__t3){
				commonui.openPostWindow(e,postfunc.__REPLY,'',a.tid,a.pid)
				return commonui.cancelEvent(e)
				}
			},
		touchstart:function(e,a,o){
			o.__t3 = true
			}
		},
	c:'disable_tap_menu',
	n1:'�ظ�',
	ck:function(a){if (a.__CURRENT_UID)return 1} },

9:{n1:'����',n2:'��һ����̵Ļظ� / ��ֽ��',on:function(e,a){commonui.comment(e,a.tid,a.pid)},
	ck:function(a){if (a.__CURRENT_UID)return 1} },

10:{n1:'����',on:function(e,a){adminui.addpoint(e,a.tid,a.pid,a.fid)},
	ck:function(a){if(a.__GP.admincheck&2)return 1} },

11:{u:'/nuke.php?func=set_user_reputation&uid={pAid}&fid={fid}',n1:'����',n2:'���ô��˵�����',
	ck:function(a){if (a.__GP.admincheck&2 && a.fid<0)return 1} },

12:{n1:'����',on:function(e,a){adminui.muteuser(e,a.pAid)},
	ck:function(a){if (a.__GP['super'])return 1} },

13:{n1:'Nuke',on:function(e,a){adminui.nukeUi(e,a.pAid,a.tid,a.pid)},c:'gray',
	ck:function(a){if (a.__GP.superlesser || (a.__GP.ubSecAct))return 1} },

14:{n1:'Nuke',n2:'���Բ��ۼ�����',n3:'Lesser Nuke',on:function(e,a){commonui.lessernuke(e,a.tid,a.pid,a.type)},
	ck:function(a){if (a.__GP.admincheck)return 1} },

15:{n1:'ǩ��',n2:'���ǩ��',n3:'���ǩ��',on:function(e,a){commonui.setSign(e,a.pAid,a.__GP.greater)},
	ck:function(a){if (a.__GP.greater)return 1} },

16:{n1:'ͷ��',n2:'���ͷ��',n3:'���ͷ��',on:function(e,a){commonui.setAvatar(e,a.pAid,a.__GP.greater)},
	ck:function(a){if (a.__GP.greater)return 1} },

17:{n1:'ɾ��',n2:'ɾ���ظ�',n3:'ɾ���ظ�',on:function(e,a){commonui.setPost(e,a.tid,a.pid)},
	ck:function(a){if ((a.__GP.admincheck&2) && a.pid && parseInt(a.pid,10) && a.pid>0)return 1} },

18:{n1:'����',n2:'�԰����ṩ���������ж��շ���',on:function(e,a,o){if(o._.gV('transed'))return;commonui.autoTranslate.main($('postcontent'+a.lou),a.fid);o._.sV('transed',1)},
	ck:function(a){if (window.__AUTO_TRANS_FID)return 1} },

19:{u:"/nuke.php?func=message#to={pAid}",n1:'����',n2:'�����߷��Ͷ���Ϣ',
	ck:function(a){if (a.__CURRENT_UID)return 1} },

20:{u:"/nuke.php?func=ucp&uid={pAid}",n1:'����',n2:'�鿴��������',n3:'������Ϣ'},

21:{u:"/thread.php?authorid={pAid}",n1:'����&sup1;',n2:'�������߷���������',n3:'�������ߵ�����'},

22:{u:"/thread.php?searchpost=1&authorid={pAid}",n1:'����&sup2;',n2:'�������߷����Ļظ�',n3:'�������ߵĻظ�'},

23:{u:"/read.php?tid={tid}&authorid={pAid}",n1:'����&sup3;',n2:'���������ڱ������ڵĻظ�',n3:'���������ڻظ�(ֻ��������)'},

24:{u:"http://i.178.com/?_app=cite&_controller=index&_action=newcite&type=inner_cite&url=_URL",target:'_blank',n3:"<img src='"+__COMMONRES_PATH+"/_.gif' style='background:url(http://img4.178.com/www/201102/91497211205/91497234247.png) 0px -64px;width:16px;height:16px'/>",n2:'����178���˿ռ�',on:function(e,a,o){o.href=commonui.postBtn.replaceUrl(o.href)} },

25:{u:"http://v.t.sina.com.cn/share/share.php?appkey=3938048249&title=_TOPIC&url=_URL",target:'_blank',n3:"<img src='"+__COMMONRES_PATH+"/_.gif' style='background:url(http://img4.178.com/www/201102/91497211205/91497234247.png) 0px -112px;width:16px;height:16px'/>",n2:'��������΢��',on:function(e,a,o){o.href=commonui.postBtn.replaceUrl(o.href)} },

26:{u:"http://v.t.qq.com/share/share.php?title=_TOPIC&url=_URL&appkey=8b5c8745ea364613adfda05c616d9abe",target:'_blank',n3:"<img src='"+__COMMONRES_PATH+"/_.gif' style='background:url(http://img4.178.com/www/201102/91497211205/91497234247.png) 0px -128px;width:16px;height:16px'/>",n2:'������Ѷ΢��',on:function(e,a,o){o.href=commonui.postBtn.replaceUrl(o.href)} },

27:{u:"http://t.163.com/article/user/checkLogin.do?info=_TOPIC - _URL",target:'_blank',n3:"<img src='http://img0.178.com/www/201104/97723162502/97723185658.gif'/>",n2:'��������΢��',on:function(e,a,o){o.href=commonui.postBtn.replaceUrl(o.href)} },

28:{u:"javascript:scrollTo(0,0)",n1:((window.__UA && (__UA[2]==1) && (__UA[3]<6))?'&uarr;':'&uArr;'),n2:'�ص�ҳ�涥��'},
/*
29:{n1:'<input type="checkbox" name="delatc[]" value="0"/>',n2:'ѡ�лظ�',n3:'(<input type="checkbox" name="delatc[]" value="0"/>ѡ�лظ�)',
	ck:function(a){if (__GP['admincheck'] && a.pid && parseInt(a.pid,10) && a.pid>0){
		this.n3=this.n3.replace(/value="\d+"/i,'value="'+a.pid+'"')
		this.n1=this.n1.replace(/value="\d+"/i,'value="'+a.pid+'"')
		return 1}}
	,on:function(e,a){this.value=a.pid},tag:'span'},
*/
30:{u:'/nuke.php?func=edit_history&tid={tid}&pid={pid}',n2:'�鿴�༭��¼',n3:'�༭��¼',
	ck:function(a){if (a.pAid==a.__CURRENT_UID || (a.__GP.admincheck&2))return 1} },

/*31:{u:'/nuke.php?func=locktopic&edit_lock&tid={tid}&pid={pid}&lock=1',n2:'����ʱ�䳬��ʱ�޽�ֹ�༭',n3:'��ֹ�༭',
	ck:function(a){if (__GP['admincheck'])return 1} },*/

32:{n2:'����Ϊ����ʱ�䳬��ʱ�޿��Ա༭',n3:'��ɱ༭',on:function(e,a){commonui.setPost(e,a.tid,a.pid)},
	ck:function(a){if (a.__GP.admincheck&2)return 1} },

33:{u:window.location.href+'&noBBCode',n2:'�鿴���ӵ�BBCodeԴ��',n3:'�鿴Դ��' },

34:{n1:'ת��',on:function(e,a,o){var x = commonui.postBtn.all;commonui.postBtn.all={'����':[24,25,26,27]};commonui.postBtn.allBtn(e,a);commonui.postBtn.all=x} },

35:{n1:'�ղ�',n2:'�ղش���������',on:function(e,a){commonui.favor(this,a.tid,a.pid)} }
},

replaceUrl:function (u){
var e = encodeURIComponent;
return u.replace('_TOPIC',e(document.title)).replace('_URL',e(document.location.href)).replace(/_BBSURL/g,e(window.__BBSURL))
},

def:[28,6,7,8,34],
all:{
'����':[1,4,5,6,7,8,9,18,33,35],
'�û�':[19,20,21,22,23],
'����':[10,11,12,13,14,15,16,17,29,32,30],
'����':[24,25,26,27]
},

btnCache:{},

genU:commonui.buttonBase.genU,

genT:commonui.buttonBase.genT,//fe

genC:commonui.buttonBase.genC,

genA:commonui.buttonBase.genA,

genB:commonui.buttonBase.genB,//fe

argCache:commonui.postArg.data,//����

load:function(argid){
var arg = this.argCache[argid]

if(!arg.comment && window.__CURRENT_UID)//�������� ���ҵ�¼״̬
	_$(arg.pC).$0('onmouseover',this.eventHandlerOver,'onmousewheel',this.eventHandlerOver,'onmouseout',this.eventHandlerOut)._.sV('argid',argid)

},

eventHandlerOver:function(e){

if(!this.getBoundingClientRect)
	return

var x = this.getBoundingClientRect(),y=__NUKE.position.get(e)
if(Math.abs(y.x-x.right)>(x.right-x.left)/3)
	return

var  pb=commonui.postBtn, argid = this._.gV('argid'), bc = pb.btnCache, b=bc[argid]

if(b && b.style.display=='')
	return

for (var k in bc){
	if(k!=argid && bc[k])
		bc[k].style.display='none'
	}

if(b)
	return b.style.display=''

b=pb.genB(argid)
bc[argid]=b
b._.css({left:'0px',top:'0px',display:'',visibility:(b.firstChild._.__vml?'':'hidden')})
pb.argCache[argid].postBtnC.appendChild(b)
if(b.firstChild._.__vml)
	b.firstChild._.__vml()

b._.css({left:'',top:'',marginLeft:'-'+(b.offsetWidth)+'px',marginTop:'-'+(b.offsetHeight-1)+'px',visibility:''})

},//fe

eventHandlerOut:function(e){
if(!commonui.ifMouseOut(e,this))
	return
var argid = this._.gV('argid')
var b=commonui.postBtn.btnCache[argid]
if(b)b.style.display='none'
},//fe
	
allBtn:commonui.buttonBase.allBtn,//fe

saveHis:commonui.buttonBase.saveHis,//fe

clearHis:commonui.buttonBase.clearHis//fe

}//ce commonui.postBtn


/*****************************
 * ������ʾ ��������Ϣ��ʾ ǩ����ʾ
 */

commonui.postDisp = function (argid){

var w = window, noimg = (w.__SETTING.bit & 64) ? 1 : 0, a = this.postArg.data[argid], uI = this.userInfo.users[a.pAid] 
var isLesser = (this.userInfo.groups[uI.memberid][1] & 16), small = (w.__SETTING.bit & 8) ? true:false, $ = _$


if(!a.cLength)
	a.cLength = a.contentC.innerHTML.length;
if (a.contentC.innerHTML && a.contentC.innerHTML.substr(0,24).indexOf('lessernuke')>-1)
	a.cLength=0;


var lite=(w.__SETTING.bit & 4) ? 1:0// bit 1 С��Ļ / bit 2 ������

if((a.comment || a.cLength>40 || a.pAid==w.__CURRENT_UID) && uI.active>=0)
	lite = lite | 2;

a.pInfoC.innerHTML=ngaAds.bbs_ads32_gen();

$(a.pInfoC)._.add(
	a.ip ? 
	$('/a').$0('className','silver stxt','href','javascript:void(0)',
		'innerHTML','['+a.ip+']','onclick',function(e){commonui.ipArea(e,a.ip)}) : null,
	
	a.orgForum ? 
	$('/a').$0('style',{marginLeft:'0.7em'},'className','silver',
		'href','/thread.php?fid='+a.orgFid,'innerHTML',"["+a.orgForum+"]") : null,
	
	$('/span').$0('id','postdate'+a.i,'style',{marginLeft:'0.7em'},'className','gray b stxt',
		'innerHTML',this.time2date(a.postTime,'Y-m-d H:i')),
	
	$('/nobr')._.add(
		$('/a').$0('style',{marginLeft:'0.7em'},'className','small_colored_text_btn white stxt','href','javascript:void(0)',
			'title','�ղ�','onclick',function(e){commonui.favor(this,a.tid,a.pid)},
			$('/span').$0('innerHTML','&nbsp;'),
			$('/span').$0('innerHTML','&#9733;','style',{fontFamily:'SimHei,Verdana, Tahoma,Arial,sans-serif'}),
			$('/span').$0('innerHTML','&nbsp;')
			),

		$('/a').$0('style',{marginLeft:small?'1.5em':'0.7em'},'className','small_colored_text_btn white stxt','href','javascript:void(0)',
			'title','����','onclick',function(e){commonui.recommendPost(e,argid,this)})._.add(
			this.postDispRecommendTxt(a.recommend,a.atItem)
			),

		$('/a').$0('style',{marginLeft:small?'1.5em':'0.7em'},'className','small_colored_text_btn white stxt','href','javascript:void(0)',
			'title','�����˵�','onclick',function(e){commonui.postBtn.allBtn(e,argid)},
			$('/span').$0('innerHTML','&nbsp;&#8801;'),
			$('/span').$0('innerHTML','&nbsp;','style',{fontFamily:'SimHei,Verdana, Tahoma,Arial,sans-serif'})
			)
		)
	)

if(a.atItem){

	a.pInfoC.parentNode.insertBefore($('/div').$0(
		'title','����',
		'onclick',function(e){commonui.recommendPost(e,argid,this)},
		'style',{clear:'right',cssFloat:'right','float':'right',marginBottom:'-0.2em',textAlign:'right',cursor:'pointer'},
		(function(a,s){
			var x = $('/span')._.cls('silver b opacity75'),i,j,l
			for(i=0;i<5;i++){
				j=a.id(i)
				if(!j)break;
				if(s[j].constructor==String)s[j] = s[j].split('\t')
				x._.add( (l=a.count(i))+(l>9?'':'��'), $('/img').$0('src',s[0]+s[j][1],'style',{verticalAlign:'middle',width:'3em',height:'3em'}),$('/br'))
				}
			return x
			/*
			return $('/span')._.add($('/br'),$('/div').$0(
					'style',{
						background:'url('+s[0]+s[j][1]+') bottom right no-repeat',
						cssFloat:'right',width:(parseInt(x.style.width,10)+64)+'px',
						height:64-17+'px',paddingTop:17+'px',marginBottom:'-'+64+'px'
						},x))
			*/
			})(a.atItem,this.atItems) 
		),a.pInfoC.nextSibling)
	}

//if(small)
//	a.pInfoC.parentNode.insertBefore($('/div')._.css('clear','both'),a.pInfoC.nextSibling)



if(a.type || a.tmBit1){

	//if((a.type & 512) && a.__GP.lesser)
	//	a.subjectC.innerHTML+="<span class='red nobr' title='�����'>[���]</span>"
	if ((a.type & 1) && !a.comment)
		a.subjectC.innerHTML+="<span class='red nobr' title='���Ƕ�ĳһ�����ӵĻظ�'>[����]</span>"
	if (a.type & 1024)
		a.subjectC.innerHTML+="<span class='red nobr' title='�޷��༭/�ظ�'>[����]</span>"
	if ((a.type & 2) && (a.__GP.greater||a.__GP.admincheck))
		a.subjectC.innerHTML+="<span class='red nobr' title='ֻ������/�����ɼ�'>[����]</span>";
	if ((a.type & 131072) && (a.__GP.greater||a.__GP.admincheck))
		a.subjectC.innerHTML+= "<span class='gray nobr' title='�������ϰ�������ʾ'>[��������]</span>";
	if (a.type & 262144)
		a.subjectC.innerHTML+= "<span class='red nobr' title='����ʾ��������Ϣ'>[����]</span>";
	if((a.type & 16384) && (a.__GP.greater||a.__GP.admincheck))
		a.subjectC.innerHTML+="  <span class='red nobr' title='�����б��в��ɼ�'>[����*]</span>";

	if(a.pid!=0 && (a.type & 1026)===1026 && !a.__GP.admincheck){
		var x = a.pC
		while (x.nodeName!=='BODY' && x.nodeName!=='TABLE')
			x = x.parentNode
		if(x.nodeName=='TABLE')
			x.style.display='none'
		}

	if(a.i==0){
		if (a.tmBit1 & 131072)
			a.subjectC.innerHTML+=" <span class='gray nobr' title='�ϼ����޷��༭/�ظ�/��������'>[����*]</span>";
		if(a.tmBit1 & 2097152)
			a.subjectC.innerHTML+="<span class='gray nobr' title='�ظ����������Զ�����'>[�ظ�����]</span>";
		if (a.tmBit1 & 65536)
			a.subjectC.innerHTML+=" <span class='gray nobr'>[ֱ��]</span>";
		}
	}
	
if (a.comment){//comment
	a.pInfoC.style.display='none'
	a.uInfoC.innerHTML =  this.posterInfo.main(lite, a.i, a.fid, a.tid, a.pid, a.cLength, a.pAid, a.type, a.stid, a.comment)
	return w.ubbcode.bbsCode({
		c:a.contentC,
		noImg:1,
		fId:a.fid,
		tId:a.tid,
		pId:a.pid,
		authorId:a.pAid,
		rvrc:uI.rvrc,
		isSig:0,
		callBack: (a.type & 4096) ? function(a){commonui.autoTranslate.main(a.c,a.fId)} : null,
		isLesser:isLesser,
		isNukePost:(a.type & 2048) ? 1 : 0,
		isComment:1
		})
	}

if(uI.buffs[99] || uI.buffs[102] || uI.buffs[107]){
	if(a.uInfoC.parentNode.nodeName=='TD')
		a.uInfoC.parentNode.className+=' buff_avatar_bg'
	a.contentC.innerHTML+=' [color=gray]����'+(uI.buffs[102] ? '��' : (uI.buffs[107]?'poi': '��'))+'~[/color]'
	}


/*
if (rmd && rmd<-3){
	rmd=Math.floor(100+rmd*10/1.5);
	cC.style.opacity = '0.'+rmd;
	cC.style.MozOpacity = '0.'+rmd;
	//cC.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+rmd+')';
	cLen = 0
	}
*/

if(a.contentC.nodeName=='P' && w.__UA && w.__UA[0]==1 && w.__UA[1]<=8){//ie8 not allow nest p
	var x = $('/span')
	x.id = a.contentC.id
	x.className=a.contentC.className
	a.txt = a.contentC.innerHTML
	a.contentC.parentNode.replaceChild(x,a.contentC)
	a.contentC = x
	}

w.ubbcode.bbsCode({
	c:a.contentC,
	noImg:noimg,
	fId:a.fid,
	tId:a.tid,
	pId:a.pid,
	authorId:a.pAid,
	rvrc:uI.rvrc,
	isSig:0,
	callBack: a.type & 4096 ? function(a){commonui.autoTranslate.main(a.c,a.fId)} : null,
	isLesser:isLesser,
	isNukePost:(a.type & 2048) ? 1 : 0,
	txt:a.txt!==undefined?a.txt:undefined
	})

var posterinfo =  this.posterInfo.main(lite, a.i, a.fid, a.tid, a.pid, a.cLength, a.pAid, a.type, a.stid, a.comment)

//commonui.dispUserInfo(lite,pos,avatar,honor,regdate,lastlogin,lesser,ip,level,mute,medal,postNum,rvrc,repu,aid,fid,money,site,ifRemark,$('postauthor'+pos).innerHTML)
a.contentC.parentNode.className+=' pc'+uI.memberid

a.uInfoC.innerHTML = ''
if(lite & 1){
	var xx = $('/div')
	xx.innerHTML=posterinfo
	xx.className='posterInfoLine'
	a.pC.insertBefore(xx,a.pC.getElementsByTagName('div')[1])
	a.uInfoC.parentNode.style.display='none'
	var xx = xx.parentNode
	}
else{
	a.uInfoC.innerHTML = posterinfo
	var xx = a.uInfoC.parentNode
	}

if(a.fromClient){
	var client = a.fromClient.toString().match(/^(\d+)\s*(.*)$/)
	if(client){
		switch (w.__NUKE.toInt(client[1])){
			case 7:
			case 8:
			case 9:
				xx.insertBefore(
						$("/div").$0('title','������'+(client[2]?' '+client[2]+' �ϵ�':'')+' NGA�ٷ��ͻ���',
							'className','client_icon',
							//'style',{background:'url('+__IMG_STYLE+'/mobi_all.png?1) no-repeat '+(client[1]==8 ? -99 : (client[1]==9 ? -198 : -132))+'px top'},
							$('/div')._.css('borderTopColor',__COLOR.border0),
							$('/a').$0('href','http://app.178.com','style',{display:'block',width:'19px',height:'19px',background:"url("+__IMG_STYLE+"/mobi_icon1.png) no-repeat right "+(client[1]==8 ? -42 : (client[1]==9 ? -2 : -21))+"px"})
							),
						xx.firstChild);
				//console.log("display:block;width:19px;height:19px;background:url("+__IMG_STYLE+"/mobi_icon1.png) no-repeat right "+(client[1]==8 ? -42 : (client[1]==9 ? -2 : -21))+"px")
				break;
			default:
				xx.insertBefore(
					$("/span").$0(
						'title',client[2]?'������ '+client[2]:'������ δ֪�豸',
						'className','client_icon',
						$('/div')._.css('borderTopColor',__COLOR.border2),
						$('/a').$0('href','http://app.178.com','style',{display:'block',width:'19px',height:'19px',background:"url("+__IMG_STYLE+"/mobi_icon1.png) no-repeat right "+(client[1]==100 ? -42 : (client[1]==103 ? -2 : (client[1]==101 ? -21 : 63)))+"px"})
						),
					xx.firstChild);
			}
		}
	}
//this.usernamelink($('postauthor'+pos),aid, pos % 20 )//�޸�����

if(a.signC && uI.signature){
	if(lite & 2){
		a.signC.innerHTML = "<span class='sigline'><span class='en_font xtxt'>"+w.location.hostname.toLocaleUpperCase()+"</span></span>"
		if(uI.buffs[113])
			a.signC.innerHTML += "<button type='button' disabled='disabled'>ǩ��������</button>"
		else if(noimg){
			a.signC.appendChild( $('<button type="button">�����ʾǩ��</button>')._.on('click',function(){
				var x = this.parentNode
				x.innerHTML = "<span class='sigline'><span class='en_font xtxt'>"+location.hostname.toLocaleUpperCase()+"</span></span><div class='sign ubbcode' id='postsigncontent2'></div><div class='clear'></div>"
				ubbcode.bbsCode({
					c:x.childNodes[1],
					fId:a.fid,
					tId:a.tid,
					pId:a.pid,
					authorId:a.pAid,
					rvrc:uI.rvrc,
					isSig:true,
					txt:uI.signature,
					isLesser:isLesser
					})
				}) )
			}
		else{
			a.signC.innerHTML += "<div class='sign ubbcode' id='postsigncontent2' style='visibility:hidden'></div><div class='clear'></div>"
			w.ubbcode.bbsCode({
				c:a.signC.childNodes[1],
				fId:a.fid,
				tId:a.tid,
				pId:a.pid,
				authorId:a.pAid,
				rvrc:uI.rvrc,
				isSig:true,
				callBack: function(a){window.setTimeout(function(){commonui.postSignCheckHeight(a.c)},1000)},
				txt:uI.signature,
				isLesser:isLesser
				})
			}
		a.signC.style.display='block'
		}
	else
		a.signC.style.display='none'
		//a.contentC.innerHTML+='<br/><br/>'
	}

if(this.quoteTo && a.contentC.parentNode.id.substr(0,21)=='postcontentandsubject')
	this.aE(a.contentC.parentNode,'mouseup',function(e){commonui.quoteTo.onmouseup(e, parseInt(this.id.substr(21),10) )})

}//fe commonui.postDisp

commonui.postDispRecommendTxt = function(recommend,items){
var j = 0,$=_$
if(items){
	for(var i=1;i<items.length;i++)
		j += items.count(i)
	}
return $('/span')._.add(
		$('/span').$0('innerHTML','&nbsp;'+(recommend>=0 ? '&#9650;':'&#9660;')),
		recommend ? recommend : '',
		(j && Math.abs(recommend)/j<0.9) ? (recommend?'/':'')+j : '',
		$('/span').$0('innerHTML','&nbsp;'))
}//fe

/*****************************
 * ǩ���߶�
 */
commonui.postSignCheckHeight=function(o){
if(o.offsetHeight<300){
	o.style.visibility=''
	return
	}
o.style.display='none'
o.style.visibility=''
o.parentNode.insertBefore(
	_$('<button type="button">ǩ���߶ȳ���'+this.limit+'</button>')._.on('click',function(){this.style.display='none';this.nextSibling.style.display=''}),
	o
	)
}//fe


/*****************************
//���������ť
 */
commonui.topicBtn={
parent:commonui,
saveKey:'topicBtnHis',
d:{
1:{n1:'����',n2:'�༭������ɫ',n3:'������ɫ',
	on:function(e,a){adminui.colortopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

2:{n1:'����',n2:'����/�ر����� �������ⲻ�ܻظ�/�Ķ�',n3:'��������',
	on:function(e,a){commonui.setPost(e,a.tid)},
	ck:function(a){if(a.admin)return 1} },

3:{n1:'�ƶ�',n2:'�ƶ����⵽��������',n3:'�ƶ�����',
	on:function(e,a){adminui.movetopic(e,a.tid)},
	ck:function(a){if(a.admin)return 1} },

4:{n1:'����',n2:'���������洴������ľ��� �����ⱻ�ظ�ʱ����Ҳ�����',n3:'��������',
	on:function(e,a){adminui.quotetopic(e,a.tid)},
	ck:function(a){if(a.anyAdmin)return 1} },

5:{n1:'��ǰ',n2:'������Ļظ�ʱ���޸�Ϊ��ǰʱ��',n3:'��ǰ����',
	on:function(e,a){adminui.pushtopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

6:{n1:'����',n2:'�ֶ��޸��ڻظ���ɾ���������ҳ������',n3:'����ͳ�ƻظ�',
	u:'nuke.php?func=recountreply&tid={tid}',
	target:'_blank',
	ck:function(a){if(a.admin)return 1} },

7:{n1:'�ö�',n2:'������(������)��ʾ�ڰ������Ϸ� ��Ϊ���湫��',n3:'�ö�����',
	on:function(e,a){adminui.toptopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

8:{n1:'����',n2:'����������Ϊ����',n3:'��������',
	on:function(e,a){adminui.digesttopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

9:{n1:'ɾ��',n2:'�������������վ',n3:'ɾ������',
	on:function(e,a){adminui.deltopic(e,a.tid)},
	ck:function(a){if((a.admin&2) || __CURRENT_UID == 17387322)return 1} },

10:{n1:'�ղ�',n2:'�ղ�����',
	on:function(e,a){commonui.favor(this,a.tid)},
	ck:function(a){if(__CURRENT_UID)return 1} },

11:{n1:'<span style="font-size:1.23em">����ظ�</span>',
	n2:'����ظ�',
	c:'disable_tap_menu uitxt1',
	on:{
		mousedown:function(e,a,o){
			postfunc.btnStatOn(o)
			},
		click:function(e,a,o){
			if(postfunc.btnStatOff(o) || o.__t3){
				commonui.openPostWindow(e,postfunc.__REPLY_BLANK,'',a.tid)
				return commonui.cancelEvent(e)
				}
			},
		touchstart:function(e,a,o){
			o.__t3 = true
			}
		},
	u:'/post.php?action=reply&_newui&fid={fid}&tid={tid}',
	ck:function(a){if(__CURRENT_UID)return 1} },

12:{n1:'����',n2:'���������������',
	on:function(e,a){commonui.topicBtn.allBtn(e,a)},
	ck:function(a){if(a.anyAdmin || a.admin || __CURRENT_UID == 17387322)return 1} },

13:{/*n1:'����&sup1;',*/n2:'���ü����������Ա',n3:'���Ϲ���Ա',
	on:function(e,a){commonui.setTopicAdmin(this,a.tid)},
	ck:function(a){return 1} },

14:{/*n1:'����&sup2;',*/n2:'���ü������������',n3:'���Ϻ�����',
	on:function(e,a){commonui.setTopicBlock(this,a.tid)},
	ck:function(a){return 1} },
15:{n1:'APP�Ķ�',n2:'ʹ����̳APP�Ķ�������',n3:'APP�Ķ�����',
	u:'nga://?tid={tid}',
	c:'disable_tap_menu teal',
	on:function(e,a){setTimeout(function(){location.assign('http://app.178.com/phone.html')},500)},
	ck:function(a){if(__SETTING.uA[2]==4 && navigator.userAgent.match(/iPhone|iPad/))return 1} }
},

replaceUrl:commonui.buttonBase.replaceUrl,

def:[11,12,10,15],
all:{'�������':[1,2,3,4,5,6,7,8,9,13,14]},

genU:commonui.buttonBase.genU,

genT:commonui.buttonBase.genT,

genC:commonui.buttonBase.genC,

genA:commonui.buttonBase.genA,

load:function(o,fid,tid,admin){
	
if((admin || window.__GP.userBit & 4 ||__CURRENT_UID != 17387322 ) && !window.adminui)loader.script(__COMMONRES_PATH+'/js_admin.js')
var arg={fid:fid,
	tid:tid,
	admin:admin ? admin : window.__GP.admincheck,
	anyAdmin:window.__GP.userBit & 4,
	pid:0,
	greater:window.__GP.greater}, i=0,l=this.def,xx=null, max= __SETTING.bit & 8 ? 5 : 8,oo = commonui.stdBtns()

if(!this.his){
	this.his = commonui.userCache.get(this.saveKey);
	if(!this.his)this.his=[]
	}
while(1){
	for (var k=0;k<l.length;k++){
		if(i++>=max)break
		if(xx=this.genA(arg,l[k],1))
			oo._.__ins(xx)
		}
	if(l==this.his)break
	l=this.his
	}
o.innerHTML=''

if(!oo._.__length)
	return

o.appendChild(oo)
if(oo._.__vml)
	oo._.__vml()
},//fe


allBtn:commonui.buttonBase.allBtn,//fe

saveHis:function(id){if(id!=13 && id!=14)this.saveHis1(id)},//fe
saveHis1:commonui.buttonBase.saveHis,//fe

clearHis:commonui.buttonBase.clearHis//fe

}//ce


/*****************************
 * �û���Ϣ����
 */
commonui.posterInfo={
w:window,
c:commonui,
uI:commonui.userInfo,
__PORTRAIT_PATH:window.__PORTRAIT_PATH,
__IMG_STYLE:window.__IMG_STYLE,
__IMGPATH:window.__IMGPATH,
sb:window.__SETTING.bit,
__NOW:window.__NOW,

main:function(lite,i,fid,tid,pid,cLen,uid,type,stid,comment){

var x = '',d={},  u=this.uI.users[uid], rvrc=Math.floor(u.rvrc/10), active = this.active(u.uid,u.yz, u.mute_time, u.buffs,fid,tid,this.__NOW,stid)

if(comment){
	d.avatar = this.avatar(i, 1, u.avatar, u.buffs)
	d.authorname = this.name(i,active, u.username, uid, u.buffs)
	return this.comment(d)
	}
d.avatar = this.avatar(i, lite, cLen>=15?u.avatar:'', u.buffs);
d.honor=this.honor(u.honor,lite)
d.icon=this.levelIcon(this.uI.groups[u.memberid][1] & 16, rvrc)
d.l=this.floor(i, pid)
d.uid = this.uid(uid)
d.r_bar = this.r(lite, uid)
d.level = this.level(lite, this.uI.groups[u.memberid][0], rvrc, fid, uid, active)
d.authorname = this.name(i,active, u.username, uid, u.buffs)
d.postnum=this.basic(u.postnum, u.regdate, u.thisvisit)
d.money = this.money(u.money)
d.medal = this.medal(u.medal)
d.site = this.site(uid, u.site)
d.remark = this.remark(u.remark)+this.remark(u.remark_mod)

if((lite&1)==0)
	return this.normal(d,lite)
else 
	return this.lite(d)

},//fe

normal:function(d,lite){
var x = ''
if(d.authorname)x+="<div style='text-align:left;line-height:1.5em'>"+d.l+d.authorname+d.uid+"</div>"

if(d.avatar)x+=d.avatar

if(d.honor)x+=d.honor
x+="<div class='stat' style='background:url("+d.icon+") top right no-repeat;margin:2px 0 0 0' "+(lite&2?'':"onclick='commonui.posterInfo.showAll(this)'")+"><div style='width:100%'>"

if(d.r_bar){
	for (var k in d.r_bar)
		x+="<div>"+d.r_bar[k]+"</div>"
	}
x+="<div style='float:left;margin-right:3px;min-width:49%;*width:49%'><nobr>"+d.level.level+"</nobr></div>"
x+="<div style='float:left;margin-right:3px'><nobr>"+d.level.r_value+"</nobr></div>"
//x+="<span class='clickextend' style='"+(lite&2 ? '' : 'display:none')+"'>"
x+="<div style='float:left;margin-right:3px;min-width:49%;*width:49%'><nobr>"+d.postnum+"</nobr></div>"
x+="<div style='float:left'><nobr>"+d.money+"</nobr></div>"
x+="<div class='clear'></div></div>"
x+="<span class='clickextend' style='"+((lite&2)||(d.medal==''&&d.site==''&&d.remark=='') ? '' : 'display:none')+"'>"
if(d.medal)x+=d.medal+'<br/>'

if(d.site)x+=d.site+'<br/>'

if(d.remark)x+=d.remark

x+='<div class=clear></div></span></div><div class=stat_spacer></div>'
return x
},//fe
comment:function(d){
return d.authorname+'<br/>'+d.avatar
},//fe
lite:function(d){
var x=d.l
if(d.avatar)
	x+=d.avatar+' '
if(d.authorname)
	x+=d.authorname+d.uid+' '
if(d.honor)x+=d.honor+' '

x+="<span class='gray nobr'>"+d.level.level+"</span> <span class='gray nobr'>"+d.level.r_value+"</span><span class='gray nobr'> "+d.postnum+"</span> <span class='gray nobr'>"+d.money+"</span> "

if(d.medal)x+="<span class='gray nobr'>"+d.medal+'</span> '

if(d.site)x+="<span class='gray nobr'>"+d.site+'</span> '

if(d.remark)x+=d.remark
return x
},//fe

showAll:function(o){
if(o.__gtresgvb)return
o.__gtresgvb = true
o = o.getElementsByTagName('span')
for(var i=0;i<o.length;i++)
	if(o[i].className=='clickextend')
		o[i].style.display = ''
},//fe

remark:function(remark){
if(!remark)
	return ''
var x = ''
for(var k in remark){
	var z= ''
	if(remark[k][4].indexOf('=')!=-1)
		remark[k][4] = remark[k][4].replace(/(?:http:\/|bbs\.ngacn\.cc|nga\.178\.com)\/[a-z0-9_%\/\-?.]+?(tid|pid|fid)=(\d+)[a-z0-9_%\/\-]*/i,function($0,$1,$2){
			if($1=='tid')
				z="<a href='/read.php?tid="+$2+"'>[+]</a>"
			if($1=='pid')
				z="<a href='/read.php?pid="+$2+"'>[+]</a>"
			if($1=='fid')
				z="<a href='/thread.php?fid="+$2+"'>[+]</a>"
			return ''
			}).replace(/\[(tid|pid|fid)=(\d+)\]/i,function($0,$1,$2){
			if($1=='tid')
				z="<a href='/read.php?tid="+$2+"'>[+]</a>"
			if($1=='pid')
				z="<a href='/read.php?pid="+$2+"'>[+]</a>"
			if($1=='fid')
				z="<a href='/thread.php?fid="+$2+"'>[+]</a>"
			return ''
			})
	var y = this.c.cutstrbylen(remark[k][4],9)
	if(y!=remark[k][4])
		y=y+'��'
	x+="<span class='nobr' style='background:"+__COLOR.border2+";padding:0 0.5em;border-radius:0.25em;color:"+((remark[k][3]&1)? __COLOR.quote1 : __COLOR.txt2)+"'title='"+((remark[k][3]&1)? '������ע ' : '�����ɼ� ')+remark[k][4]+"'>"+z+y+"</span> "
	}

return x
},//fe

load_user_remark : function(o,uid){
if (isNaN(parseInt(uid,10)))return;
__NUKE.doRequest({
	u:__API.remarkGet(uid),
	ca:1,
	f:function(r){
		var e = __NUKE.doRequestIfErr(r)
		if(e)
			return console.log('get remark error '+uid)
		r = r.data[0];
		var y = document.createElement('span')
		for (var k in r)
			y.innerHTML+='<span class="numeric">'+commonui.time2date(r[k].time,'y-m-d')+'</span> '+r[k].content+'<br/>';
		//commonui.load_user_remark_cache = y;
		o.parentNode.insertBefore(y,o);
		o.parentNode.removeChild(o);
		}
	}
	)
},

avatar:function(i,lite,avatar,buff){

if(this.sb & 64)//����ʾͷ��
	return ''

avatar = this.c.selectUserPortrait(avatar,buff)

if(!avatar)
	return ''

if(lite&1)
	return '<img src="'+
		avatar.replace(/http:\/\/pic1\.178\.com\/avatars\/(\d+)\/(\d+)\/(\d+)\/(\d+)_(\d+)\.jpg/ig,'http://pic1.178.com/avatars/$1/$2/$3/25_$5.jpg')+
		'" id="posteravatar'+i+'" class="avatar avatar_small'+
		(avatar.noborder?' avatar_noborder':'')+
		'"/>'
else if(lite&2)
	return '<img src="'+avatar+'" id="posteravatar'+i+'" class="avatar'+(avatar.noborder?' avatar_noborder':'')+'"/>'

return ''

},//fe

honor:function(h,lite){
if(!h)
	return ''
if (h.substr(0,1)==' '){
	h = h.split(' ');
	h[1] = parseInt(h[1]);
	if(h[1] && h[1]>this.w.__NOW)
		h= h[2]
	else if(h[3])
		h=  h[3]
	else
		return ''
	}
if(lite&1)
	return "<span class='silver' name='honor'>"+h+"</span>"
return "<div class='silver' name='honor'>"+h+"</div>"
},//fe

levelIcon:function(lesser,rvrc){
//return this.__IMG_STYLE+'/uinfobg1.png?1'
/*
var x = this.__IMG_STYLE+'/level/'
if(lesser)
	return x+'sikle_bg.gif'
else if(rvrc>=0)
	return x+'nga_bg.gif'
else
	return x+'skeleton_bg.gif'
	*/
},//fe

floor:function(i,pid){
if(!i)
	return ''
return "<span class='right'>&nbsp;<a name='l"+i+"' href='"+this.c.genPidLink(pid,i)+"' class='small_colored_text_btn stxt white'>#"+i+"</a></span>"
},//fe

uid:function(uid){
return " <a href='javascript:void(0)' name='uid'  class='small_colored_text_btn stxt white' style='background:#aaa' onclick='commonui.ucplink(event,"+uid+")'>"+uid+"</a>"
},//fe

level:function(lite,level,rvrc,fid,uid,active){
var d = {}, x=this.w.__CUSTOM_LEVEL


if ( !x ){
	d.level = "����: <span name='level' class='silver' title='"+active[3]+"'>"+level+"</span>"
	d.r_value = "����: <span class='numericl silver' name='pg'>"+rvrc+"</span>"
	return d
	}

var cRv=0, z = x[0].n, r =this.uI.reputations
for(var k in r){//ʹ�ð���ĵ�һ��������ֵ
	//if(k==fid){
		cRv=r[k][uid];
		if(!cRv)cRv=0;
		if(cRv>21000)
			cRv = 21000
		if(cRv<-21000)
			cRv = -21000
		break
	//	}
	}
for (var i=0;i<x.length;i++){
	if (cRv>=x[i].r)
		z=x[i].n
	else
		break
	}

var y = cRv>9999 ? 'numeric' :'numericl'

if((lite&1)==0){
	d.level ="<span title='��̳����:"+level+" &emsp;����:"+rvrc+" "+active[3]+"'>����: <span name='level' class='silver'>"+z+"</span></span>"
	d.r_value = "����: <span class='"+y+"'>"+cRv+"</span>"
	}
else{
	d.level ="<span title='��̳����:"+level+" &emsp;����:"+rvrc+" "+active[3]+"'>����: <span name='level' class='silver'>"+z+"</span></span>"
	d.r_value=''
	}

return d
},//fe

r:function(lite,uid){

var y,z,r_bar = {},r = this.uI.reputations
for(var k in r){
	var n = r[k][0], v = r[k][uid]
	if (v==0 || !v)
		continue;
	if (v>21000)
		v=21000
	if (v<-21000)
		v=-21000
	z = y = Math.abs(v/1000)
	y=Math.floor(y)
	if (z==y){
		y--;
		z=100;
		}
	else{
		z=(z-y)*100
		if (z<1)z=1
		}
	if((lite&1)==0)
		r_bar[k]="<div class='r_container' style='margin:2px 0 1px 0' title='"+n+' &emsp;'+v+"'><table cellspacing=1 class='"+(v>0 ?'blue':'red')+"' "+(y?"style='margin-bottom:-1px'":'')+"><tbody><td class='r_barc'><div style='width:"+z+"%' class=r_bar></div>"
	else{
		r_bar[k]="<span title='"+n+"'>����: <span class='"+(v>9999 ? 'numeric' :'numericl')+"'>"+v+"</span></span>"
		continue
		}

	if(y){
		r_bar[k]+="<table style='width:100%' cellspacing=1 class='"+(v>0?'blue':'red')+"'><tbody><tr>"
		for (var i=0;i<y;i++)
			r_bar[k]+="<td class='dot'></td>"
		r_bar[k]+="</tr></tbody></table>"
		}

	r_bar[k]+="</div></td></tr></tbody></table>"
	}
return r_bar
},//fe

basic:function(postnum,regdate,lastlogin){
regdate = this.c.time2date(regdate,'Y-m-d H:i')
lastlogin = this.c.time2date(lastlogin,'Y-m-d H:i')
if(!this.w.__GP.admincheck)
	return "<span title=' ע��ʱ��: "+regdate+" &#10; ����½: "+lastlogin+" '>ע��: <span class='numeric silver' name='regdate'>"+regdate.substr(2,8)+"</span></span>"
var tmp = postnum>9999 ? 'numeric': 'numericl'
return "<span title=' ע��ʱ��: "+regdate+" &#10; ����½: "+lastlogin+" '>����: <span class='"+tmp+" silver' name='postnum'>"+postnum+"</span></span>"
},//fe

money:function(money){
if(money<=0)
	return ''
return "�Ƹ�: <span class='numericl silver' name='money' value='"+money+"'>"+this.c.calc_money(money)+"</span>";

},//fe

medal:function(medal){
if (!medal)
	return ''
var x = '', r = this.uI.medals, medal = medal.toString().split(',')
for (var k in medal){
	if(k=='length' || !medal[k] || !this.uI.medals[medal[k]])
		continue
	var m = this.uI.medals[medal[k]]
	x+=" <img class='medalimg' src='"+this.__IMGPATH+"/medal/"+m[0]+"' title='"+m[1]+":&#10;"+m[2]+"' style='margin-bottom:-4px'/>"
	}
if(!x)
	return x
return "����:<span name='medal'>"+x+"</span>"
},//fe

active:function(uid,active,muteTime,buffs,fid,tid,now,stid){
if(active<0){
	var y= this.c.activeInfo(active,uid)
	y[3] = y[3]+' '+y[4]
	return y
	}
else if(muteTime>this.__NOW)
	return ['orange','MUTED','����',"������:"+this.c.time2date(muteTime,'Y-m-d H:i')]
else if(buffs && buffs[105]){
	var b,x = this.w.__GP.admincheck ? now-86400*60 : now,y=0,z=0
	for(var k in buffs[105]){
		b=buffs[105][k]
		if(b[1]>x)
			y++
		if(b[1]>now){
			if(b[4]){
				if(b[4]==tid || b[4]==stid){
					if(b[1]>z)z=b[1]
					}
				}
			else if(b[3]==0 || b[3]==fid){
				if(b[1]>z)z=b[1]
				}
			}
		}
	if(y==0)
		return ['','','']
	return [
		z ? 'orange':(y>0?'sandybrown':''),
		z ? ('MUTED'+(y>1?' '+y:'')) : (y>0 ? y : ''),
		z ? '����' :'',
		z ? ("������:"+this.c.time2date(z,'Y-m-d H:i')+(y>1 ? ' �������ڱ�����'+y+'��' : '')) : (y>0 ? ' �������ڱ�����'+y+'��' : '')
		]
/*
	else if(y==1)
		y='#474143'
	else if(y==2)
		y='#63502f'
	else if(y==3)
		y='#7f5e1a'
	else if(y==4)
		y='#956609'
	else if(y==5)
		y='#a06600'
	else if(y==6)
		y='#a05b00'
	else if(y==7)
		y='#a04700'
	else if(y==8)
		y='#9c3000'
	else
		y='#8c0000'
*/
	}
else
	return ['','','','']
},//fe

name:function(i,active,authorname,authorid,buff){
if(this.c.htmlName)
	authorname = this.c.htmlName(authorname)

else if(buff && buff[103])
	authorname = this.c.anonyName(authorname,true);
	
return "<a href='nuke.php?func=ucp&uid="+authorid+"' id='postauthor"+i+"' class='author b nobr' "+(active[3]?"title='"+active[3]+"'":'')+">"+authorname+"</a>"+(active[1]?"<sup class='"+active[0]+" b en_font' onclick='alert(this.previousSibling.title)'>"+active[1]+'</sup>':'')
},//fe
site:function(authorid,site){
if (!site)
	return ''
return "<a href='thread.php?fid=-"+authorid+"' name='site'>["+site+"]</a>"
}//fe
}//ce

commonui.loadAlertInfo=function(info)
{
if(!info)return;
info = info.split(/\t|\n/);
var x = '', y = ''
for (var i=0;i<info.length;i++){
	var z = info[i].replace(/^[\t\n ]+/,'');
	if (!z)
		continue
		
	if (z.match(/^edit /i)){
		x += z+' ';
		}
	else if(z.substr(0,1)=='['){
		y += z.replace(/\[([A-Z])?([-\d\.\/ ]+)( .+?)?\](.+)?/g,function($0,$1,$2,$3,$4){
			$2 = $2.split(' ')
			$3 = $3!==undefined?' '+$3:''
			$4 = $4!==undefined?' '+$4:''
			if($1=='L'){
				if($2.length>3){
					var o='['
					if($2[0]!='0'){
						o+=(
							$2[2]!='0' ? "��������"
							: (
								$2[1]!='0' ? "�ڰ�����"
								: ''
								)
							)+
							'����'+$2[0]+'�� '
						}

					if($2[3]!='0'){
						o+='�۳�����'+$2[3]
						if($2[4]!='0')
							o+=' �۳�����'+($2[4]/10)
						}
					return o+$3+']&emsp;'
					}
				else
					return '[-'+$2[0]+'���� -'+$2[1]+'���� ����'+$2[2]+'��'+$3+']&emsp;'
				}
			else if($1=='U')
				return '['+$2[0]+'���� '+$2[1]+'���� '+$2[2]+'G'+($3==' UM'?' �������':'')+' (ȡ������)]&emsp;'
			else if($1=='E'){
				var o
				if($2[1]=='0' && $2[2]=='#ANONYMOUS#')
					o='�����û� '
				else if($2[1]=='0' && $2[2]=='0')
					o=''
				else
					o="<a href='/nuke.php?func=ucp&uid="+$2[1]+"' class='b'>"+$3.substr(1)+"</a> " 
				x +=  o+'��'+commonui.time2date($2[0], 'Y-m-d H:i')+'�޸�&emsp;'
				return ''
				}
			else
				return '['+$2[0]+'���� '+$2[1]+'���� '+$2[2]+'G'+$3+$4+']&emsp;'
			});
		}
	}
if(x)put('<div class="silver">'+x+'</div>');
if(y)put("<table class='quote'><tr><td>���ּ�¼ "+y+'</td></tr></table>');
}


commonui.iDigi = function(t){
var h=29,x=0,y=0,z=_$('/div')._.cls('idigi'),k,u=z
for(var i=0;i<t.length;i++){
	k = t.charCodeAt(i)
	y = (k>=48 && k<=57) ? (k-48)*30 : 300
	u._.add(
		_$('/div')._.css('height',h+'px','background','url('+__IMG_STYLE+'/digi_gray.png) '+x+'px -'+y+'px no-repeat')
		)
	u=u.firstChild
	x += k==49 ? 22 : 26
	}
z._.css('width',x+'px')
return z
}//fe