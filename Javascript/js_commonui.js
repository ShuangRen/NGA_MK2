//==================================
//����
//==================================
if(!window.__NUKE){
var __NUKE = {}
__NUKE.scEn=function (v,no){
switch (typeof(v)) { 
	case 'string':
		return v.replace(/~/g,'');
	case 'number':
		return v.toString(10);
	case 'boolean':
		return v?1:0
	case 'object':
		if(no)return ''
		var buf=[]
		for (var k in v)
			buf.push(this.scEn(k,1) + '~' + this.scEn(v[k],1));
		return buf.join('~');
	default: 
		return '';
	}
}//fe

__NUKE.scDe=function (s){
s = s.split('~')
if(s.length==1)return s
var v={}
for (var i=0;i<s.length;i+=2)
	v[s[i]]=s[i+1]
return v
}//fe
}//end if

/**
*��̳����
*/
var __API = {
auto_trans:function(fid){//�Զ������ȡ�б�
	return [this._cache+'auto_translate/'+fid+'.js',
		this._base+'__lib=auto_translate&__act=auto_translate&raw=1&fid='+fid]
	},
auto_trans_set:function(fid){//�Զ������޸�
	return this._base+'__lib=auto_translate&__act=auto_translate&set=1&fid='+fid
	},
//auto_trans_save:function(form,fid){//�Զ����뱣�� , ���� content
//	return this._gen(form, '__lib', 'auto_translate', '__act', 'auto_translate', 'save', 1, 'fid', fid )
//	},
admin_code:function(){//��������
	return this._base+'__lib=admin_code&__act=admin_code&raw=1'
	},
user_forum_manage:function(fid){//�û��������
	return this._base+'func=userforum&act=manage&fid='+fid
	},
user_forum_nuke:function(fid){//�û�����ر�
	return this._base+'func=nuke_user_forum&fid='+fid
	},
forum_manage:function(fid){//�������
	return this._base+'func=modifyforum&fid='+fid
	},
minor_moderator:function(fid){//����������
	return this._base+'func=minor_moderator&fid='+fid
	},
forum_stat:function(fid){//����ͳ��
	return this._base+'func=admin_stat&day_limit=30&fid='+fid
	},
topic_key_set:function(fid){//�����������
	return this._base+'func=topic_key&fid='+fid
	},
keyword_watch_set:function(fid){//�ؼ��ּ�������
	return this._base+'func=logpost&setkey=1&fid='+fid
	},
keyword_watch:function(fid){//�ؼ��ּ��¼�¼
	return this._base+'func=logpost&fid='+fid
	},
filter_key:function(fid){//����
	return [this._cache+'filter/'+fid+'.js?'+Math.floor(__NOW/3600),
		this._base+'func=logpost&getkey&fid='+fid+'&time='+Math.floor(__NOW/3600)]
	},
topic_key:function(fid,x){//�������
	return [this._cache+'bbs_topic_key/'+fid+'.js?'+Math.floor(__NOW/3600),
		this._base+'__lib=topic_key&__act=get&raw=1&fid='+fid+'&time='+Math.floor(__NOW/3600)]
	},
nuke:function(uid,tid,pid,info,infoadd,time_range,limit,mode,ip){//nuke
	return {u:this._base+'__lib=nuke&__act=nuke_act&raw=3',a:{
		uid:uid,tid:tid?tid:'',pid:pid?pid:'',info:info,infoadd:infoadd,time_range:time_range?time_range:'',limit:limit?limit:'',mode:mode,ip:ip
		}}
	},
digest:function(fid){
	return "/thread.php?&recommend=1&fid="+fid+"&order_by=postdatedesc&admin=1"
	},
viewFPg:function(fid){
	return this._base+"__lib=view_privilege&__act=view&fid="+fid
	},
set_user_reputation:function(fid,user,value){//�û�����
	return {u:this._base+'__lib=user_reputation&__act=set&raw=3',a:{
		user:user,fid:fid,value:value
		}}
	//return this._base+'func=set_user_reputation&fid='+fid
	},
userRepu:function(fid){
	return this._base+"func=set_user_reputation&fid="+fid
	},
ufSetting:function(fid){
	return this._base+"func=userforum&act=manage&fid="+fid
	},
favorTopic:function(tid,pid){
	return this._base+"__lib=topic_favor&__act=topic_favor&action=add&raw=3&tid="+tid+(pid? '&pid='+pid : '')
	},
favorTopicDel:function(tid,page){//tid=tid,tid_pid,tid,tid ...
	return {u:this._base+"__lib=topic_favor&__act=topic_favor&raw=3",a:{action:'del',tidarray:tid,page:page}}
	},
remarkAdd:function(uid,remark,pub){
	return {u:this._base,a:{__lib:'user_remark',__act:'add',uid:uid,remark:remark,pub:pub?1:'',raw:3}}
	},
remarkDel:function(uid,id){
	return {u:this._base,a:{__lib:'user_remark',__act:'del',uid:uid,rid:id,raw:3}}
	},
remarkGet:function(uid){
	return this._base+"__lib=user_remark&__act=get&raw=1&uid="+uid
	},
userInfo:function(uid,name){
	uid = uid ? "&uid="+uid :''
	name = name ? "&username="+name:''
	return this._base+"__lib=ucp&__act=get&lite=js"+uid+name
	},
editLock:function(tid,pid,lock){
	return {u:this._base, a:{__lib:'topic_lock', __act:'edit_lock', tid:tid, lock:(lock?1:0), pid:(pid?pid:0),raw:3} }
	},
messageNew:function(s,c,t,asuid){
	return {
		u:this._base+"__lib=message&__act=message&act=new&raw=3"+(asuid?'&asuid='+asuid:''),
		a:{subject:s, content:c, to:t}
		}
	},
messageReply:function(s,c,m,asuid){
	return {
		u:this._base+"__lib=message&__act=message&act=reply&raw=3"+(asuid?'&asuid='+asuid:''),
		a:{subject:s, content:c, mid:m}
		}
	},
messageAdd:function(t,m,asuid){
	return {
		u:this._base+"__lib=message&__act=message&act=add&raw=3"+(asuid?'&asuid='+asuid:''),
		a:{to:t, mid:m}
		}
	},
messageAddBlock:function(t,asuid){
	return {
		u:this._base+"__lib=message&__act=message&act=add_block&raw=3"+(asuid?'&asuid='+asuid:''),
		a:{buids:t}
		}
	},
messageDel:function(mid,asuid){
	return {
		u:this._base+"__lib=message&__act=message&act=del_topic&raw=3"+(asuid?'&asuid='+asuid:''),
		a:{mid:mid}
		}
	},
messageDelBlock:function(t,asuid){
	return {
		u:this._base+"__lib=message&__act=message&act=del_block&raw=3"+(asuid?'&asuid='+asuid:''),
		a:{buids:t}
		}
	},
messageLeave:function(mid,uid,asuid){
	return {
		u:this._base+"__lib=message&__act=message&act=leave_topic&raw=3"+(asuid?'&asuid='+asuid:''),
		a:{mid:mid,luid:uid}
		}
	},
messagelistBlock:function(asuid){
	return this._base+"__lib=message&__act=message&act=list_block&raw=1&rand="+Math.floor((new Date).getTime()/3000)+(asuid?'&asuid='+asuid:'')
	},
messageRead:function(mid,page,asuid){
	return this._base+'__lib=message&__act=message&act=read&raw=1&mid='+mid+'&page='+page+'&rand='+Math.floor((new Date).getTime()/3)+(asuid?'&asuid='+asuid:'')
	},
messageList:function(page,asuid){
	return this._base+'__lib=message&__act=message&act=list&raw=1&page='+page+'&rand='+Math.floor((new Date).getTime()/3)+(asuid?'&asuid='+asuid:'')
	},
vote:function(x,y){
	return {u:this._base,
		a:{__lib:'vote',__act:'vote',tid:x,voteid:y,raw:3}
		}
	},
voteSettle:function(x,y){
	return {u:this._base,
		a:{__lib:'vote',__act:'settle',tid:x,winid:y,raw:3}
		}
	},
delAttach:function(pid,tid,aid){
	return {u:this._base,
		a:{func:"delattach",pid:pid,tid:tid,aid:aid,raw:3}
		}
	},
notiGet:function(){
	return this._base+'__lib=noti&__act=get_all'
	},
notiTopicIgnore:function(tid,pid){
	return {u:this._base,
		a:{func:"noti_tag",no_hint:1,tid:tid,pid:pid?pid:0,raw:3}
		}
	},
topicMove2:function(tid,fid,pm,info,op,delay,stid){
	return {u:this._base,
		a:{__lib:"topic_move",__act:"move",tid:tid,fid:fid,pm:pm,info:info,op:op,delay:delay,stid:stid,raw:3}
		}
	},
getAvatar:function(uid){
	return {u:this._base,
		a:{__lib:"set_avatar",__act:"get",uid:uid,raw:3}
		}
	},
setAvatar:function(uid,a,d){
	return {u:this._base,
		a:{__lib:"set_avatar",__act:"set",uid:uid,avatar:a,disable:d?d:'',raw:3}
		}
	},
getSign:function(uid){
	return {u:this._base,
		a:{__lib:"set_sign",__act:"get",uid:uid,raw:3}
		}
	},
setSign:function(uid,s,d){
	return {u:this._base,
		a:{__lib:"set_sign",__act:"set",uid:uid,sign:s,disable:d?d:'',raw:3}
		}
	},
/*
topicMove:function(tid,fid,pm,info,notag,delay,stid){
	return {u:this._base,
		a:{__lib:"topic_move_2",__act:"move",tid:tid,fid:fid,pm:pm,info:info,notag:notag,delay:delay,stid:stid,raw:3}
		}
	},
topicQuote:function(tid,fid,mode){
	return {u:this._base,
		a:{__lib:"topic_move_2",__act:"quote",tid:tid,fid:fid,mode:mode,raw:3}
		}
	},
*/
topicPush:function(tid){
	return {u:this._base,
		a:{__lib:"topic_push",__act:"push",tid:tid,raw:3}
		}
	},
setTopicAdmin:function(stid,admin){
	var a = (admin === undefined) ? 
		{__lib:"topic_set",__act:"update_admin",stid:stid,raw:3} : 
		{__lib:"topic_set",__act:"update_admin",stid:stid,admin:admin,raw:3}
	return {u:this._base,
		a:a
		}
	},
setTopicBlock:function(stid,block){
	var a = (block === undefined) ? 
		{__lib:"topic_set",__act:"update_block",stid:stid,raw:3} : 
		{__lib:"topic_set",__act:"update_block",stid:stid,block:block,raw:3}
	return {u:this._base,
		a:a
		}
	},
postGet:function(tid,pid,mode,fid,stid,isComment){
	if(!mode)mode = 'reply'
	return '/post.php?lite=js&action='+mode+(fid?'&fid='+fid:'')+'&tid='+(tid?tid:'')+'&pid='+(pid?pid:'')+'&stid='+(stid?stid:'')+'&comment='+(isComment?1:'')
	},
topicLock:function(tid,lock,pm,info,delay,cfid){
	return {u:this._base,
		a:{__lib:"topic_lock",__act:"lock",tid:tid,pm:pm,info:info,lock:lock,delay:delay,cfid:cfid,raw:3}
		}
	},
setPost:function(ids,ton,toff,pon,poff,pm,info,delay,cfid){
	return {u:this._base,
		a:{__lib:"topic_lock",__act:"set",ids:ids,ton:ton,toff:toff,pon:pon,poff:poff,pm:pm,info:info,delay:delay,cfid:cfid,raw:3}
		}
	},
topicColor:function(tid,font){
	return {u:this._base,
		a:{__lib:"topic_color",__act:"set",tid:tid,font:font,raw:3}
		}
	},
logoutCurrent:function(){
	return {u:this._base,
		a:{__lib:"login",__act:"logout",logout_current_only:1,raw:3}
		}
	},
activeHelper:function(){
	return '/read.php?tid=6724814'
	},
forumSubscription:function(ufid,fid,type){//1 add 2 del
	return {u:this._base,
		a:{func:"save_subscription",ufid:ufid,fid:fid,type:type,raw:3}
		}
	},
lesserNuke:function(tid,pid,level,info,infos){
	return {u:this._base,
		a:{__lib:"lesser_nuke",__act:"lesser_nuke",tid:tid,pid:pid?pid:0,level:level,info:info,infos:infos,raw:3}
		}
	},
lesserNuke2:function(tid,pid,opt,info,infos){
	return {u:this._base,
		a:{__lib:"nuke",__act:"lesser_nuke",tid:tid,pid:pid?pid:0,opt:opt,info:info,infos:infos,raw:3}
		}
	},
topicTop:function(tid,level){
	return {u:this._base,
		a:{__lib:"topic_top",__act:"set",tid:tid,level:level?level:0,raw:3}
		}
	},
reputationLevelSet:function(fid,txt){
	if(!txt)txt=''
	return {u:this._base,
		a:{__lib:"reputation_level",__act:"set",fid:fid,txt:txt,raw:3}
		}
	},
reputationLevel:function(fid){
	return {u:this._base,
		a:{__lib:"reputation_level",__act:"get",fid:fid,raw:3}
		}
	},
extraAuth:function(code,reset){
	return {u:this._base,
		a:{__lib:"safe_reg",__act:"auth_code_check",code:code,reset:reset,raw:3}
		}
	},
userDebug:function(uid,day,type){
	return {u:this._base,
		a:{__lib:"admin_code",__act:"set_debug",uid:uid|0,day:day|0,type:type|0,raw:3}
		}
	},
post:function(
action,//����
fid,//����id
tid,//����id
pid,//�ظ�id
stid,//
subject,//����
content,//����
mention,//����@����
hidden,//�������� �������ɼ�
selfReply,//ֻ�����ߺͰ����ɻظ�
attach,//����
attachChk,//����У��
hiddenInfo,//���ص�����
filterKey,//�м��Ӵ�
hasAutoTran,//���Զ������
hideUpload,//�۵��ϴ��ļ�
contentNoMod,//�������޸�
subjectNoMod,//�������޸�
fromDevice,//�����豸
fromClient,//����ϵͳ
vote,//ͶƱ����
voteType,// 0ͶƱ 1Ͷעͭ��
voteMax,//ÿ������Ͷ 0����
voteEnd,//Сʱ�����
voteBetMax,//Ͷע���ֵ
voteBetMin,//Ͷע��Сֵ
modifyAppend,//�޸�ʱ�޸����������ԭ����֮��
comment,//����/�����ظ�
anony,//����
live,//ֱ��
replyAnony//�ظ�����
	){
	var a = {
			nojump:1,
			lite:'htmljs',
			step:2,
			action:				action,
			fid:				fid,
			tid:				tid,
			pid:				pid,
			stid:				stid,
			post_subject:		subject,
			post_content:		content,
			mention:			mention,
			hidden:				hidden,
			self_reply:			selfReply,
			attachments:		attach,
			attachments_check:	attachChk,
			hidden_content:		hiddenInfo,
			filter_key:			filterKey,
			has_auto_translate:	hasAutoTran,
			hide_upload:		hideUpload,
			content_not_modify:	contentNoMod,
			subject_not_modify:	subjectNoMod,
			from_device:		fromDevice,
			from_client:		fromClient,
			newvote:			vote,
			newvote_type:		voteType,
			newvote_max:		voteMax,
			newvote_end:		voteEnd,
			newvote_betmin:		voteBetMin,
			newvote_betmax:		voteBetMax,
			modify_append:		modifyAppend,
			comment:			comment,
			anony:				anony,
			live:				live,
			reply_anony:			replyAnony
			}

	for(var k in a){
		if(a[k]==='' || a[k]===0 || a[k]===undefined || a[k]===null)
			delete a[k]
		}

	return {u:'/post.php',	a:a}
	},//fe
phpRawurlencode:function(text){//
	return {u:this._base,
		a:{__lib:"misc",__act:"php_rawurlencode",text:text,raw:3}
		}
	},
_gen:function(){
	var f = arguments[0]
	f.action = this._base
	for(var i=1;i<arguments.length;i+=2)
		f.appendChild(_$('input/').$0('type','hidden','name',arguments[i],'value',arguments[i+1]))
	},
_cache:'/data/bbscache/',
_base:'/nuke.php?'
}//ce

//==================================
//setting
//==================================
var __LITE = {}, __UA = {}//old
var __SETTING = {
o:null,

defB:65536,

bit:0,

bits:{
auto	:1, //���������Զ�

//���гߴ綼����Ϊ�Զ��ߴ�
size24	:2, //24+����ʾ��
size10	:4,//10������
size7	:8,//7������
size4	:16, //4������

lessPic	:64,//��ͼƬ
iframe	:128,//��Ƕ�Ķ�
fontDef :256,//��ָ���������� ʹ��ϵͳĬ��
fontHei	:512,//ָ����������Ϊ΢���ź�(���������δ�����Զ�ѡ�� (windows vista+�ź� ��������ָ��
embed	:1024,//�ͻ�����Ƕ(bitfoot
inIframe:2048,//�Ƿ�����һ��iframe��
touch	:4096,//�Ƿ�֧�ִ���

touched :8192,//�Ƿ����� ���û�����
orientation:16384, //�Ƿ�֧����ת ���û�����
notGenericDevice:32768, //�Ƿ��Ƿ�����ǱʼǱ��������豸 ���û�����

style0:65536, //ʹ����ʽ0
style1:131072, //ʹ����ʽ1
style2:262144 //ʹ����ʽ2
},
width:null,
cName:'uisetting',

uA:{},// 0:����� 1ie 2chrome 3ff 1:������汾 2:����ϵͳ 1windows 2android 3osx 3:����ϵͳ�汾

UAInit:function (){
var u = window.navigator.userAgent.toLowerCase(), x
var a={}
if ((x=u.indexOf('msie'))!=-1){
	x=u.substr(x+5,2)
	a[0]=1
	}
else if ((x=u.indexOf('chromium'))!=-1){
	x=u.substr(x+7,2)
	a[0]=2
	}
else if ((x=u.indexOf('chrome'))!=-1){
	x=u.substr(x+7,2)
	a[0]=2
	}
else if ((x=u.indexOf('firefox'))!=-1){
	x=u.substr(x+8,2)
	a[0]=3
	}
else if ((x=u.indexOf('safari'))!=-1){
	x=u.substr(x+8,3)
	a[0]=5
	}
else if ((x=u.indexOf('opera'))!=-1){
	x=u.substr(x+6,2)
	a[0]=4
	}
if(x!=-1)
	a[1]=parseInt(x,10)
if(a[0]==1 && a[1]<=6){
	try{document.execCommand('BackgroundImageCache',false,true)}catch(e){};
	window.isIE6=true;//
	}
if ((x=u.indexOf('windows nt'))!=-1){
	x=u.substr(x+11,2)
	a[2]=1
	a[3]=parseInt(x,10)
	}
else if((x=u.indexOf('android'))!=-1){
	x=u.substr(x+7,2)
	a[2]=2
	a[3]=parseInt(x,10)
	}
else if((x=u.indexOf(' os '))!=-1 && u.indexOf(' like mac os x')!=-1){
	a[2]=4
	x=u.substr(x+4,2)
	a[3]=parseInt(x,10)
	}
else if((x=u.indexOf(' mac '))!=-1){
	a[2]=3
	}
this.uA = a
window.__UA = a//old
},

ui:function(){
var bit = __NUKE.toInt(__COOKIE.getMiscCookie(this.cName));
this.save(this.bits.auto,7)
this.o = commonui.createCommmonWindow()
this.o._.addContent(null)
var $ = window._$, self=this
this.o._.addTitle('��������');
var size24 = $('/input').$0('type','radio','checked',0,'name','ssize'),
size24_10 = size24.cloneNode(),
size10_7 = size24.cloneNode(),
size7_4 = size24.cloneNode(),
size4 = size24.cloneNode(),
style = $('/input').$0('type','radio','checked',0,'name','style__'),
style0 = style.cloneNode(),
style1 = style.cloneNode(),
style2 = style.cloneNode(),
sizeauto = size24.cloneNode(),
lessPic = $('/input').$0('type','checkbox','checked',0),
iframe = lessPic.cloneNode(),
fontDef = $('/input').$0('type','radio','checked',0,'name','font'),
fontHei = fontDef.cloneNode(),
fontAuto = fontDef.cloneNode()



if(bit & this.bits.size24)
	size24.checked = true
else if(bit & this.bits.size4)
	size4.checked = true
else if(bit & this.bits.size7)
	size7_4.checked = true
else if(bit & this.bits.size10)
	size10_7.checked = true
else
	size24_10.checked = true

if(bit & this.bits.lessPic)
	lessPic.checked = true

if(bit & this.bits.iframe)
	iframe.checked = true
else{
	var a = this.uA
	if(a[2]==2 || a[2]==4){
		if((a[0]==1 && a[1]>=9) || (a[0]==2 && a[1]>=25) || (a[0]==3 && a[1]>=16) || (a[0]==4 && a[1]>=15) || (a[0]==5 && a[1]>=536))
		iframe.checked = true
		}
	}

if(this.uA[2]!=1){
	fontDef.disabled = fontHei.disabled = true
	fontAuto.checked=true
	}
else{
	if(bit & this.bits.fontDef)
		fontDef.checked = true
	if(bit & this.bits.fontHei)
		fontHei.checked = true
	else
		fontAuto.checked=true
	}



if(bit & this.bits.style0)
	style0.checked = true
if(bit & this.bits.style1)
	style1.checked = true
if(bit & this.bits.style2)
	style2.checked = true
else
	style.checked = true

this.o._.addContent(

	size24.$0('onchange',function(){if(this.checked){iframe.checked=true;lessPic.checked=false}}),
	'�ҵ���Ļ̫�������',
	$('/br'),

	$(size24_10).$0('onchange',function(){if(this.checked){lessPic.checked=false}}),
	'�Զ��жϳߴ� ',
	$('/span').$0('className','silver','innerHTML','��ͨ���� �ֻ�/ƽ���/����'),
	$('/br'),

	$(size10_7).$0('onchange',function(){if(this.checked){lessPic.checked=true}}),
	'��Ļ�ߴ���7~10�� ',
	$('/span').$0('className','silver','innerHTML','ƽ�����'),
	$('/br'),

	$(size7_4).$0('onchange',function(){if(this.checked){lessPic.checked=true}}),
	'��Ļ�ߴ���5~7�� ',
	$('/span').$0('className','silver','innerHTML','�ֻ����� ƽ������'),
	$('/br'),

	$(size4).$0('onchange',function(){if(this.checked){lessPic.checked=true}}),
	'��Ļ�ߴ���5������ ',
	$('/span').$0('className','silver','innerHTML','�ֻ�����'),
	$('/br'),
	$('/br'),

	lessPic,
	'��ʾ���ٵ�ͼƬ',
	$('/br'),
	$('/span').$0('className','silver','innerHTML','�ֶ�����ͼƬ ����ٶ�'),
	$('/br'),
	$('/br'),

	iframe,
	'����Ƕ��������ʾ����',
	$('/br'),
	$('/span').$0('className','silver','innerHTML','����ҳ����ش��� ����ٶ� ���µ����������<sup>*</sup>','title','IE9+, IEMobile 10+, Chrome12+, Android broswer 4+, FireFox16+, Safari3.1+, iOS Safari4+'),
	$('/br'),
	$('/br'),

	fontAuto,
	'�Զ�ѡ������',
	$('/br'),
	fontDef.disabled ? null:  $('/span')._.add(
		fontDef,
		'ϵͳĬ������',
		$('/br')
		),
	fontHei.disabled ? null:  $('/span')._.add(
		fontHei,
		'΢���ź�����',
		$('/br')
		),
	$('/br'),

	[ '����ɫ��',
	$('/br'),
	$(style),
	'Ĭ�� ',
	$(style0),
	'�� ',
	$(style1),
	'�� ',
	$(style2),
	'�� ',
	$('/br'),
	$('/br')] ,

	$('/button')._.attr({innerHTML:'ȷ��',type:'button'})._.on('click',function(){
			var x = this.parentNode.getElementsByTagName('input'),bit=0
			//�ߴ�
			if(size24_10.checked)
				bit=0
			else{
				if(size24.checked)
					bit = bit | self.bits.size24
				if(size10_7.checked)
					bit = bit | self.bits.size10
				if(size7_4.checked)
					bit = bit | self.bits.size7
				if(size4.checked)
					bit = bit | self.bits.size4
				}
			//ͼƬ
			if(lessPic.checked)
				bit = bit | self.bits.lessPic
			//��Ƕ
			if(iframe.checked)
				bit = bit | self.bits.iframe
			//����
			if(self.uA[2]==1){
				if(fontDef.checked)
					bit = bit | self.bits.fontDef
				else if(fontHei.checked)
					bit = bit | self.bits.fontHei
				}

			if(style0.checked)
				bit = bit | self.bits.style0
			if(style1.checked)
				bit = bit | self.bits.style1
			if(style2.checked)
				bit = bit | self.bits.style2

			self.save(bit)
			alert('������ϣ�������� ���˵�>��̳����>�������� ���޸�')
			window.location.reload()
			}
		),

	$('/button')._.attr({innerHTML:'ȡ��(ȫ�Զ�)',type:'button'})._.on('click',function(){
			var bit=self.bits.auto
			self.save(bit)
			alert('������ϣ�������� ���˵�>��̳����>�������� ���޸�')
			window.location.reload()
			}
		)
	)
this.o._.show()
},

get:function(k){
return this.bit & this.bits[k]
},

initOld:function(){
var	bit = this.bit, bits = this.bits, w = window, c = w.__COOKIE

this.UAInit()

if ('ontouchstart' in document.documentElement || w.navigator.msMaxTouchPoints)
	bit = bit | bits.touch

if(w.navigator.userAgent.indexOf('d3-bigfoot')!=-1 || w.location.hash.indexOf('ua=d3-bigfoot')!=-1){
	bit = bit | bits.embed | bits.inIframe
	w.__LITE.embed=true//old
	}

var f = parseInt(c.getMiscCookie('globalfont'),10);
if(f==1)
	bit = bit | bits.fontHei
else if(f==2)
	bit = bit | bits.fontDef

if(parseInt(c.getMiscCookie('notLoadPAndS'),10)){
	bit = bit | bits.lessPic
	w.__LITE.notLoadPAndS=true//old
	}

if(parseInt(c.getMiscCookie('iframeread'),10)){
	bit = bit | bits.iframe
	}

if(w.commonui.checkIfInIframe && w.commonui.checkIfInIframe()){
	w.__LITE.inIframe=true//old
	bit = bit | bits.inIframe
	}

if(typeof(w.orientation) != 'undefined' || w.navigator.mozNotification)
	bit = bit | bits.notGenericDevice

bit = bit | bits.auto
this.bit = bit
var w = this.getWidth()
if(w)
	this.setWidth(w)
this.setfont()
this.setIframe()

},

syncLoadStyle:function(def){
var s = 
(this.bit & this.bits.style0) ? 0 : (
	(this.bit & this.bits.style1) ? 1 : (
		(this.bit & this.bits.style2) ? 2 :	(
			(def ? def : 0)
			)
		)
	)
document.write("<link rel='stylesheet' href='"+__STYLE[s][1]+"' type='text/css'/>")
var x ='<scr'+'ipt src=\"'+__STYLE[s][2]+'\" type=\"text/javasc'+'ript\"></scr'+'ipt>';
document.write(x)
},

save:function(bit,day){
this.bit = bit
__COOKIE.setMiscCookieInSecond(this.cName,bit,86400*(day?day:90))
},

init:function(defS){
var w=window, ci=commonui, n = w.__NUKE, bits = this.bits, c=w.__COOKIE, bit = c.getMiscCookie(this.cName), self=this;
//if(w.navigator.userAgent.indexOf('d3-bigfoot')!=-1 || w.location.hash.indexOf('ua=d3-bigfoot')!=-1){
//	bit = bits.auto | bits.embed | bits.inIframe
//	w.__LITE.embed=true//old
//	}
this.defS = defS;
if(__GP._bit & 4){
	if(bit===null){
		c.setMiscCookieInSecond(this.cName,'a',300)
		bit=bits.auto
		}
	else if(bit=='j'){
		ci.aE(window, 'DOMContentLoaded', function(){__SETTING.ui()})
		c.setMiscCookieInSecond(this.cName,'a',300)
		bit=bits.auto
		}
	else if(bit.toString().match(/^[a-i]$/)){
		c.setMiscCookieInSecond(this.cName,String.fromCharCode(bit.toString().charCodeAt(0)+1),300)
		bit=bits.auto
		}
	}
else if(bit===null)
	bit=bits.auto

bit = n.toInt(bit)

this.UAInit()

if ('ontouchstart' in document.documentElement || w.navigator.msMaxTouchPoints)
	bit = bit | bits.touch

if(typeof(w.orientation) != 'undefined' || w.navigator.mozNotification)
	bit = bit | bits.notGenericDevice

if(ci.checkIfInIframe && ci.checkIfInIframe()){
	w.__LITE.inIframe=true//old
	bit = bit | bits.inIframe
	}

if(bit & bits.auto){//old
	var f = parseInt(c.getMiscCookie('globalfont'),10);
	if(f==1)
		bit = bit | bits.fontHei
	else if(f==2)
		bit = bit | bits.fontDef

	if(parseInt(c.getMiscCookie('notLoadPAndS'),10)){
		bit = bit | bits.lessPic
		w.__LITE.notLoadPAndS=true//old
		}

	if(parseInt(c.getMiscCookie('iframeread'),10)){
		bit = bit | bits.iframe
		}
	}


this.bit = bit

this.syncLoadStyle(defS)

var wi = this.getWidth()
this.width = wi
if(wi)
	this.setWidth(wi)
this.setfont()
this.setIframe()
},

devPixDetect:function(){
var max=function(a,b){
	if(a>b) return a
	else	return b
},ww=window

//�з����Ӧ���豸��ΪС�ߴ��ֳ��豸��������
//window.orientation for iosSafari androidDefault mqq ucweb
//window.navigator.mozNotification for mobileFirfox
if(typeof(ww.orientation) == 'undefined' && !ww.navigator.mozNotification)
	return ((ww.__CURRENT_UID && ww.__CURRENT_UID==58) ? ww.innerWidth : ww.screen.width)//û�з�����豸������Ļ���

var w=max(ww.screen.width,ww.screen.height)

if(ww.innerWidth<ww.innerHeight)
	max=function(a,b){
		if(a<b) return a
		else	return b
		}
//console.log(ww.outerWidth+'/'+ww.outerHeight+'/'+ww.innerWidth+'/'+ww.innerHeight)

var cPix = ww.__COOKIE.getCookie('devPix')

if(!cPix){//��ת�������ȼ��
	if(ww.document.referrer.indexOf('resolution_detect.html')==-1)
		ww.location.replace(ww.location.protocol+'//'+ww.location.host+'/nuke/resolution_detect.html?'+ww.location.href)//���������
	else
		alert('��Ļ�����ȼ��ʧ��')
	}

if(cPix){//console.log(cPix)
	cPix = cPix.split('/')
	for(var i=0;i<cPix.length;i++){
		cPix[i]=parseInt(cPix[i],10) 
		if(!cPix[i])cPix[i]=0
		}

	}
else
	cPix = [480,320,480,320,1] //w.outerWidth w.outerHeight w.screen.width w.screen.height w.devicePixelRatio

if(this.uA[2]==2 && this.uA[3]<=2){//android<3
	if(ww.navigator.userAgent.toLowerCase().indexOf(' uc')!=-1){//uc
		if(cPix[2])
			w=max(cPix[2],cPix[3])
		else
			w = 480
		}
	else
		w=max(cPix[0],cPix[1])
	}
else
	w=max(cPix[2],cPix[3])

if(this.uA[2]==4)//ios
	w = w*cPix[4]

//�Ƽ��ֱ��� = ʵ�ʷֱ���/devicePixelRatio
//�Ƽ��ֱ���һ��ϵ� �ʶ���devicePixelRatio�ɱ�����СһЩ 1->1 2->1.5
if(cPix[4])
	w = Math.floor(w/((cPix[4]+1)*0.5))

if(w==0)
	w=480

return w
},

getWidth:function(){

var ww=window, w, b = this.bit, s=this.bits
if(b & s.embed){//�����Ƕ��ͻ���
	var m = ww.navigator.userAgent.match(/size(\d+)\*(\d+)/)
	if(m)
		w=m[1]
	else if(ww.location.hash){
		m = ww.location.hash.match(/size=(\d+)_(\d+)/)
		if(m)
			w=m[1]
		}
	else
		w=525
	this.bit = 0 | s.size4 | s.embed | s.lessPic
	ww.__VERY_SMALL_SCREEN = ww.__SMALL_SCREEN = true//old
	}
else if( (b&(s.size10|s.size7|s.size4|s.size24))==0 || (b & s.auto)){//���û��ߴ��ѡ���Զ�
	w = this.devPixDetect()
	if (w>0){
		if(w<625){
			w =525
			this.bit = b | s.size10 | s.size7 | s.size4 | ((b & s.auto) ? s.lessPic : 0)
			ww.__VERY_SMALL_SCREEN = ww.__SMALL_SCREEN = true//old
			}
		else if (w<700){
			w=625
			this.bit = b | s.size10 | s.size7 | ((b & s.auto) ? s.lessPic : 0)
			ww.__SMALL_SCREEN = true//old
			}
		else if(w<=1000){
			w=700
			this.bit = b | s.size10 | ((b & s.auto) ? s.lessPic : 0)
			ww.__SMALL_SCREEN = true//old
			}
		else
			w=0
		}
	else
		w=0
	}
else{//������˳ߴ�
	if(b & s.size4){
		w = 525
		ww.__VERY_SMALL_SCREEN = ww.__SMALL_SCREEN = true//old
		this.bit = b | s.size10 | s.size7 | s.size4
		}
	else if(b & s.size7){
		w=625
		ww.__SMALL_SCREEN = true//old
		this.bit = b | s.size10 | s.size7
		}
	else if(b & s.size10){
		w=700
		ww.__SMALL_SCREEN = true//old
		this.bit = b | s.size10
		}
	else
		w=0
	}

return w
},

setfont:function(){
if((this.bit & (this.bits.fontHei | this.bits.fontdef))==0){
	if (this.uA[2]==1){
		if (this.uA[3]>=6)
			this.bit = this.bit | this.bits.fontHei
		}
	else
		this.bit = this.bit | this.bits.fontDef
	}

if(this.bit & this.bits.fontHei)
	__NUKE.addCss('body, textarea, select, input, button {font-family:Microsoft Yahei, ΢���ź�, Verdana, Tahoma, Arial, sans-serif}')

},

setWidth:function(w){
//console.log(w)
var h = document.getElementsByTagName('head')[0], ww = window, fz = this.bit & this.bits.size7 ? true : false
h.appendChild(_$('</meta>')._.attr({name:'viewport',content:'width='+w}))
ww.__NUKE.addCss('@-ms-viewport {width:'+w+'px}\nbody {font-size:'+(fz?19:16)+'px} \nbody * {max-height:50000em;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%; -ms-text-size-adjust:100%}\n.posterInfoLine {font-size:0.85em}\nbody , #minWidthSpacer {width:'+w+'px} \n #adsc1, #_178NavAll_110906_765453, #mc , #custombg {width:'+w+'px;overflow:hidden} \n .urltip, .urltip2, .default_tip {font-size:1em} \n .nav {font-size:1.2em} \n .notLoadImg #m_nav {margin-left:10px} \n .notLoadImg #mainmenu {margin-bottom:0px} \n .single_ttip2 {max-width:'+w+'px}\n.postrow td.c1 {display:none} \n.module_wrap {margin-left:3px;margin-right:3px}\n.adsc {max-width:'+w+'px;overflow:hidden}\n.navhisurltip {line-height:2em;margin-top:2.5em}\n.navhisurltip .star {margin-top:0.5em} \n .nav_root, .nav_link {line-height:2.6em;margin-bottom: 0.5em} \n .nav_link {background-color:'+__STYLE.bg6+'} \n .nav_spr {display:none} ')
ww.commonui.aE(window,'DOMContentLoaded',function(){document.body.style.width='auto',$('mc').style.overflow='visible'})
},

setIframe:function(){
if((this.bit & this.bits.iframe)==0)
	return
window.loader.script( window.__SCRIPTS.iframeRead2 , function(){if(!commonui.checkIfInIframe())iframeRead.init()} )
}
}//ce



//==================================
//commonui
//==================================
if (!window.commonui)
	var commonui = {}

commonui._w = window

//debug============
commonui._debug={
data:{},
length:0,
on:function(x){
cookieFuncs.setCookieInSecond("debug",x?x:1,3600*24)
},
push:function (e){
this.data[this.length++]=e
},
_d:function d(f,c){
if(f && typeof(c)=='undefined'){
	c=f
	f=''
	}
var r =''
for (var k in c){
	if (typeof(c[k])=='object')
		r+=this._d(f+k+'.',c[k]);
	else
		r+=f+k+' = '+c[k]+'\n';
	}
return r
},
gen:function(){
if (typeof(cookieFuncs.cookieCache[cookieFuncs.misccookiename]) != 'object')
	cookieFuncs.extractMiscCookie();
var r=''
r+='---js debug---\n';
r+=this._d('',this.data);
r+='---cookies---\n';
var cc = document.cookie.split(';');
r+=this._d('',cc);
r+='---misccookies---\n';
r+=this._d('',cookieFuncs.cookieCache[cookieFuncs.misccookiename]);
return r
},
display:function (){
document.write(this.gen())
}
}//ce

//�¼�ע��==================
commonui.aE=function(obj,e,fn) {
if (e=='DOMContentLoaded' || e=='bodyInit'){
	if(!this['_addEventOn'+e+'Funcs'])
		this['_addEventOn'+e+'Funcs'] = {length:0}
	var x = this['_addEventOn'+e+'Funcs']
	x[x.length++]=fn
	if(x.done)fn()
	return
	}
else if (e=='beforeunload' || e=='pagehide')
	e= ('onpagehide' in window) ? 'pagehide' : 'beforeunload'

if (obj.addEventListener)
	obj.addEventListener(e,fn,false)
else if (obj.attachEvent)
	obj.attachEvent('on'+e,function(ee){if(!ee)ee=window.event;fn.call(obj,ee)})
}//fe
//commonui._addEventOnbodyInitFucns={length:0}
//commonui._addEventOnDOMContentLoadedFucns={length:0}
commonui.triggerEventDOMContentLoadedAct = function(){
var x
if(x = this._addEventOnDOMContentLoadedFuncs){
	for (var i=0;i< x.length;i++)
		x[i]()
	x.done=true
	}
else
	this._addEventOnDOMContentLoadedFuncs={done:true}
}//fe

commonui.cancelBubble=function(e){
if (!e) var e = window.event;
e.cancelBubble = true;
if (e.stopPropagation) e.stopPropagation()
}
commonui.cancelEvent=function(e){
if (!e) var e = window.event;
e.returnValue = false
if (e.preventDefault) e.preventDefault()
return false
}

//����̨======
commonui.console = {
cache:null,
ckey:null,
_w:null,
_t:{value:''},
echo:function (txt,nonl){
if(typeof(txt)=='object')
    txt = commonui._debug._d(txt)
if(!nonl)txt+='\n'
this._t.value+=txt
var x = this._t.scrollHeight - this._t.clientHeight;
if (x>0)
	this._t.scrollTop =x
},//fe
open:function (){
if(!this._w){
	var v=this._t.value
	this._t = _$('<textarea/>')._.css({width:'500px',height:'200px',overflow:'hidden',display:'block',background:'#000',border:'none',color:'#eee',margin:'0',padding:'0',fontFamily:'Monospace',textAlign:'left'})._.attr('readonly','readonly')
	this.echo(v)
	this._w = _$('<div/>')._.css({left:'5px',top:'5px',padding:'5px',position:'absolute',display:'none',background:'#000',border:'2px solid #aaa',borderRadius:'8px','boxShadow':'9px 9px 9px #444'})._.aC(this._t,
		_$('<input/>')._.attr('type','text')._.css({width:'480px',background:'#000',border:'none',color:'#eee',fontFamily:'Monospace'})._.on('keyup',function(e){commonui.console.input(e,this)}),
		_$('<button/>')._.attr({type:'button',innerHTML:'&lt;'})._.css({width:'20px'})._.on('click',function(e){commonui.console.input({keyCode:13},this.previousSibling)})
		)
	document.body.appendChild(this._w)
	}
if(this._w.style.display=='none'){
	var s = this.getScroll();
	this._w.style.left=(s.x+5)+'px'
	this._w.style.top=(s.y+5)+'px'
	this._w.style.display='block'
	this._w.getElementsByTagName('input')[0].focus()
	}
else
	this._w.style.display='none'
},//fe
input:function(e,o){
if (!e)e = window.event;
if(e.keyCode == 13 || e.keyCode == 38 || e.keyCode == 40){
	var c = this.cache,k = this.ckey
	if(!c)c=commonui.userCache.get('consoleCache')
	if(!c)c=[]
	if(k==null)k=c.length-1

	if (e.keyCode == 13 && o.value){
		var x = o.value
		o.value=''
		c.push(x)
		if(c.length>20)c.shift()
		k = c.length-1
		this.cache=c
		commonui.userCache.set('consoleCache',c)
		try{
			eval('var r=( '+x+' )')
			}
		catch(e){
			try{
				eval('var r=(function(){\n'+x+'\n})()')
				}
			catch (ee){
				if(ee.stack)
					console.log(ee.stack)
				}
			}
		if(typeof(ee)==='undefined')this.echo(r)
		}
	else if (e.keyCode == 38){
		if (typeof(c[k])!='uindefined'){
			o.value = c[k]
			k--
			if (k<0)
				k=c.length-1
			}
		}
	else if (e.keyCode == 40){
		k++
		if (k>=c.length)
			k=0
		if(typeof(c[k])!='uindefined')o.value = c[k]
		}

	this.ckey=k
	}
},
getScroll:function (){
return commonui.getScroll()
},//fe
init:function (){
commonui.aE(document,'keyup',function (e){
	var x = document.activeElement
	if (x && (x.nodeName && (x.nodeName=='INPUT' || x.nodeName=='TEXTAREA')))return
	if (!e)e = window.event;
	if (e.keyCode == 192){
		commonui.console.open()
		}
	})

if(window.console){
	/*
	//Error.prototype.toStringBak = Error.prototype.toString
	//Error.prototype.toString = function(){var x = this.stack+' ';return this.toStringBak()+'\n| '+x.replace(/\n/g,'\n| ')}
	console.logBak = console.log
	try{
		console.log = function(){
			commonui.console.echo.apply(commonui.console,arguments)
			if(this.logBak){
				if(this.logBak.apply)
					this.logBak.apply(this,arguments)
				else
					this.logBak(arguments[0])
				}
			}
		}
	catch(e){
		commonui.console.echo(e)
		}
*/
	}
else{
	console = {
		log:function(e){commonui.console.echo(e)}
		}
	}	

}//fe
}
commonui.console.init();

//�������Ի�ȡ================
commonui.compPropName = function(a,b){
if(b.toLowerCase() in a)
	return b.toLowerCase()
var c= this.compatibleCheck.c
for(var k in c)
	if(c[k]+b in a)
		return c[k]+b
}//fe
commonui.compPropName.c= {0:'moz',1:'webkit',2:'ms',3:'o',4:'khtml'}

//��������ʾ����Ϊ��λ��ȡ�ַ���================
/**
 *@param s �ַ���
 *@param l �����˳��Ƚ����ض�
 *@param t �ضϵ��˳��� �������l
 *@param �ضϺ���ĩβ���ӵ��ַ��� ����Ϊ��
 */
commonui.cutstrbylen=function(s,l,t,a)
{
var j = 0.0, c, z;
if(s===undefined || s.constructor!=String)
	s = new String(s)
for (var i=0;i<s.length;i++){
	c = s.charCodeAt(i);
	if (c > 127)
		j = j+1;
	else if ( (c<=122 && c>=97)||(c<=90 && c>=65) )
		j = j+0.65;
	else
		j = j+0.35;
	if (t && !z && j>=t)
		z = i
	if (j>=l)
		return s.substr(0,(z ? z : i)+1)+(a===undefined ? '' : a);
	}
return s;
}

/**
 *�ж���iframe��
 */
if (window.parent!=window.self){
	try{
		window.parent.location.href.replace('http','http')
		commonui.checkIfInIframe = function(){return true}
		}
	catch (e){
		commonui.checkIfInIframe = function(){return false}
		}//script must run after document.body init
	}
else
	commonui.checkIfInIframe = function(){return false}

//ʱ��ת����================
commonui.time2date = function(t,f){
if(!t)return '';
if(!this._time2date_date)this._time2date_date=new Date;
var y=this._time2date_date;
y.setTime(t*1000);
if(!f)f='Y-m-d H:i:s'
var x = function(s){s=String(s);if(s.length<2)s='0'+s;return s}
f = f.replace(/([a-zA-Z])/g,function($0,$1){
	switch ($1)
		{
		case 'Y':
			return y.getFullYear()
		case 'y':
			$1 = String(y.getFullYear())
			return $1.substr($1.length-2)
		case 'm':
			return x(y.getMonth()+1)
		case 'd':
			return x(y.getDate())
		case 'H':
			return x(y.getHours())
		case 'i':
			return x(y.getMinutes())
		case 's':
			return x(y.getSeconds())
		}
	})
return f
}//fe
commonui.time2shortdate=function(t,f){
if(!f)f='y-m-d H:i'
return this.time2date(t,f)
}//fe


//ʱ��תʱ��================
commonui.time2dis = function(y,f)
{
if(!this.time2dis.now){
	if (window.__NOW)
		this.time2dis.now = __NOW
	else{
		this.time2dis.now = new Date;
		this.time2dis.now = Math.floor(this.time2dis.now.getTime()/1000)
		}
	var z = new Date(this.time2dis.now*1000)
	z.setHours(0,0,0)
	this.time2dis.nowDayStart = Math.floor(z.getTime()/1000)
	z.setDate(1)
	z.setMonth(0)
	this.time2dis.nowYearStart = Math.floor(z.getTime()/1000)
	}

var x = this.time2dis.now-y,z=''

if (x<4500){
	z='����ǰ'
	if(x<60)
		x="�ղ�"
	else if(x<450)
		x=5+z
	else if(x<750)
		x=10+z
	else if(x<1050)
		x=15+z
	else if(x<1350)
		x=20+z
	else if(x<1650)
		x=25+z
	else if(x<2100)
		x=30+z
	else if(x<2700)
		x=40+z
	else if(x<3300)
		x=50+z
	else
		x='1Сʱǰ'
	}
else{
	if (y>(this.time2dis.nowDayStart-172800)){
		if (y>this.time2dis.nowDayStart)
			z='����'
		else if (y>(this.time2dis.nowDayStart-86400))
			z='����'
		else
			z='ǰ��'
		z+=' H:i'
		}
	else if(y>this.time2dis.nowYearStart)
		z='m-d H:i'
	else
		z=f?f:'Y-m-d'
	x = this.time2date(y,z)
	}

return x;
}//fe

//��ȡ��ʽ=================
commonui.getStyle=function(o,s){
var y=null,z=s.replace(/-([a-z])/g,function($0,$1){return $1.toUpperCase()}),w=window
if (w.getComputedStyle){
	y = w.document.defaultView.getComputedStyle(o,null).getPropertyValue(z)
	if(!y)y = w.document.defaultView.getComputedStyle(o,null).getPropertyValue(s)
	}
else if (o.currentStyle)
	y = o.currentStyle[z];
 
return y;
}//fe

//��ȡborder+padding��ֵ
commonui.getPad=function(o){
var x = [0,0,0,0], y=function(z){
	var b = []
	commonui.getStyle(o,z).replace(/[-\d\.]+/g,function($0){b.push(Math.round($0))})
	if(b[0]===undefined)return
	if(b[1]===undefined)
		x[2]+=b[0],x[0]+=b[0],x[3]+=b[0],x[1]+=b[0]
	else if(b[2]===undefined)
		x[2]+=b[0],x[0]+=b[0],x[3]+=b[1],x[1]+=b[1]
	else if(b[3]===undefined)
		x[0]+=b[0],x[1]+=b[1],x[2]+=b[2],x[3]+=b[1]
	else
		x[0]+=b[0],x[1]+=b[1],x[2]+=b[2],x[3]+=b[3]
	}
y('border-width')
y('padding')
return x
}//fe

//��ȡ�߶�====================
commonui.getScroll=function (){
var x = document.documentElement.scrollLeft || document.body.scrollLeft || 0;
var y = document.documentElement.scrollTop || document.body.scrollTop || 0;
return {x:x,y:y}
}//fe

//�Ƴ�����====================
commonui.removeSelf= function(o){
o.parentNode.removeChild(o)
}

/**
 *o this
 *p <0���� >0����
 *s &1 block &2 inline &4 invert &8 hide this
 */
commonui.sw = function(o,p,s){
var n = (p<0)?'previousSibling':'nextSibling', pp = o
while(pp = pp[n]){
	if((--p)==0){
		n = (s&1)?'block':((s&2)?'inline':'')
		pp.style.display =  ((s&4) && pp.style.display==n) ? 'none' : n
		if(s&8)o.style.display='none'
		break;
		}
	}
}

/**
 *��ȡ�ؼ�����ֵ
 */
commonui.getInputValue = function(f,n){
var x = f.elements.namedItem(n)
if(!x){
	for(var i=0;i<f.elements.length;i++){//old ie
		if(f.elements[i].name==n)
			x=f.elements[i]
		}
	}
if(!x.nodeName && x.length){
	for(var i=0;i<x.length;i++){
		if(x[i].checked)
			return x[i].value
		}
	return
	}
if(x.nodeName=='select')
	return x.options[x.selectedIndex].value
if(x.type=='checkbox')
	return x.checked ? 1 :''
return x.value
}

/**
 *�ۼӲ�����������marginright���
 *����֮ǰ��marginright
 */
;(function(){
var mW=0
commonui.addMmcMargin= function(w){
	mW += w
	__NUKE.addCss("#mmc {margin-right:"+mW+"px}")
	__NUKE.position.mr = mW
	return mW-w
	}
})();


//mouseleave====================
commonui.ifMouseOut=function(e,o){
var t = e.srcElement ? e.srcElement : e.target, r = e.relatedTarget ? e.relatedTarget : e.toElement;
while (r && r != o && r.nodeName != 'BODY')
	r= r.parentNode
if (r==o) return;
return true
}//fe

//��ȡbody������ߴ�px
;(function(){
var s = 0
commonui.getBaseFontPx = function(){
return s ? s : (s = parseInt(commonui.getStyle(document.body,'font-size'),10))
}//fe
})();

//=========================================
//��׼��ť
commonui.stdBtns = function(){

var y = _$('/tr') , x = _$('/table')._.cls('stdbtn')._.add(_$('/tbody')._.add( y ))
//tr
x._.__tr = y
//length
x._.__length=0
//�����һ����Ԫ
x._.__add = function(a,x){
	this.__length++
	if(x)
		this.__tr.insertBefore(_$('/td')._.add(a),this.__tr.firstChild)
	else
		this.__tr.appendChild(_$('/td')._.add(a))
	}
//�����һ����Ԫ
x._.__ins = function(a){
	this.__add(a,1)
	}
//�Ƴ�һ�� ָ��index�������һ��
x._.__remove = function(i){
	if(i)
		this.__tr.removeChild(this.__tr.childNodes[i])
	else
		this.__tr.removeChild(this.__tr.lastChild)
	this.__length--
	}
//������Բ��
x._.__cL = function(x){
	var f = function(o,x){
		x = x?'Right':'Left'
		o.style['borderTop'+x+'Radius']=o.style['borderBottom'+x+'Radius']='0';
		}
	f( x?this.__tr.lastChild.firstChild:this.__tr.firstChild.firstChild ,x)
	f(this.self,x)
	}
//����Ҳ�Բ��
x._.__cR = function(){
	this.__cL(1)
	}

if(__SETTING.uA[0]!=1 || __SETTING.uA[1]>8)
	return x

x._.__setStyleBak={}
x._.css=function(){
	if(arguments.length==1){
		var o = arguments[0]
		for (var k in o)
			this.__setStyleBak[k]=this.self.style[k]=o[k]
		}
	else
		for(var i=0;i<arguments.length;i+=2)
			this.__setStyleBak[arguments[i]]=this.self.style[arguments[i]]=arguments[i+1]
	return this.self
	}
x._.__vml = function(no){
	if(__SETTING.uA[0]==1 && __SETTING.uA[1]<=8){}
	else return this.self

	if(this.__length==0)
		return this.self

	var z = document.createElement("div"), x = this.self, y = x.firstChild

	if (!__SETTING.__loadVml){
		__SETTING.__loadVml = true
		document.namespaces.add("vml", "urn:schemas-microsoft-com:vml")
		}

	if(y.nodeName!='tr')
		y = y.firstChild
	x.className +=' stdbtnie'
	y.firstChild.className+=' first'
	y.lastChild.className+=' last'

	var r = document.createElement("vml:roundrect")
	r.strokecolor=__STYLE.border1
	r.strokeweight="1px"
	r.fillcolor = '#fff'
	var y=x.getBoundingClientRect(), w = y.right-y.left, h = y.bottom-y.top
	r.style.width = (w-1)+'px'//vml��ȶ�һ����
	r.style.height = (h-1)+'px'//vml�߶ȶ�һ����
	//r.coordorigin="0px 0px"
	//r.coordsize = (w-1)+' '+(h-1)
	//r.path = coords(true, (w-1), (h-1), [5,5,5,5], 0, 0, 1)
	r.className = 'stdbtnvml'
	if(no&1)
		r.arcsize = '0'
	else
		r.arcsize = '0.1'

	if(no&2){
		for(var k in x._.__setStyleBak){
			x.style[k]=''
			z.style[k]=x._.__setStyleBak[k]
			}
		}
	z.style.width = w+'px'
	z.style.height = h+'px'

	z.appendChild(r)
	x.parentNode.replaceChild(z,x)	
	r.appendChild(x)
	return z
	}
return x
}//fe


//=============================
//inline tip����

commonui.genTip={
style:{
backgroundColor:'#fffee1',
border:'1px solid #444',
padding:'0px 2px 1px 2px',
textDecoration:'none',
position:'absolute',
display:'none',
lineHeight:'1.33em',
marginTop:'-1.2em',
borderRadius:'3px'
},
add:function (o,oo,arg){//arg.triggerElm ����node  arg.hide=1 �Ƴ�����Ԫ�ؼ���ʧ
if(typeof(o)=='string')
	o=$(o)
var t = document.createElement('span')
	t.name='tip'
if (typeof(oo)=='string')
	t.innerHTML = oo
else
	t.appendChild(oo)
for (var k in this.style)
	t.style[k]=this.style[k]
if (arg && arg.margin)
	t.style.marginTop = typeof(arg.margin)=='number'? arg.margin+'px' : arg.margin
//else
//	t.style.marginTop = '-'+(o.offsetHeight-1)+'px'
o.parentNode.insertBefore(t,o)
if(arg && arg.triggerElm)o=arg.triggerElm
o._tip = t
t._parent = o
o.onmouseover = function(){this._tip.style.display='inline'}
if(arg && arg.hide==1){
	o.onmouseout = function(e){
		if (commonui.genTip.checkTo(e,this))
			this._tip.style.display='none'
		}
	}
else{
	o.onmouseout = function(e){
		if (commonui.genTip.checkTo(e,this,this._tip))
			this._tip.style.display='none'
		}
	t.onmouseout = function(e){
		if (commonui.genTip.checkTo(e,this,this._parent))
			this.style.display='none'
		}
	}
},//fe
checkTo:function (e,o,oo){
if (!e) var e = window.event;
var to = e.relatedTarget || e.toElement;
if (to && to != o && to.parentNode != o && to.parentNode.parentNode != o && to.parentNode.parentNode.parentNode != o){
	if (oo){
		if(to != oo && to.parentNode != oo && to.parentNode.parentNode != oo && to.parentNode.parentNode.parentNode != oo)
			return to
		}
	else
		return to
	}
}//fe

}//ce

//=============================
//���ػ���=====================
commonui.userCache ={
cache:null,
change:false,
key:'userCache_',
w:window,
init:function (){
if(this.cache)return true
if(!this.w.domStorageFuncs)return false
this.key = 'userCache_'
this.key += this.w.__CURRENT_UID ? this.w.__CURRENT_UID+'_' :'0_'
this.cache = {}
this.w.commonui.aE(this.w,'beforeunload',function(){
	commonui.userCache.save()
	})
return true
},//fe

set:function (k,v,t){
if (!this.init())return false
if (!t)t=86400*30
this.cache[k]={v:v,t:t}
this.change=true
if(this.w.__UA[0]==4)
	this.save()
},//fe

get:function (k){
if (!this.init())return false
if(typeof(this.cache[k])=='undefined'){
	var v = this.w.domStorageFuncs.get(this.key+k)
	if(v!=null)v=this.w.__COOKIE.json_decode(v)
	this.cache[k]={v:v}
	}
return this.cache[k].v
},//fe

del:function (k){
if (!this.init())return false
this.cache[k]={v:null,t:-1}
this.change=true
},//fe

save:function (){
if (!this.init())return false
if (this.change){
	for (var k in this.cache){
		var t = this.cache[k].t
		if(t>0)
			this.w.domStorageFuncs.set(this.key+k,this.w.__COOKIE.json_encode(this.cache[k].v),t)
		else if (t<0)
			this.w.domStorageFuncs.remove(this.key+k)
		}
	}
this.change=false
}//fe

}//ce

//=============================
//��ɫת��=====================
commonui.rgbToHsv=function(r, g, b){//0-255
r = r/255, g = g/255, b = b/255;
var max = Math.max(r, g, b), min = Math.min(r, g, b);
var h, s, v = max;

var d = max - min;
s = max == 0 ? 0 : d / max;

if(max == min){
	h = 0; // achromatic
}else{
	switch(max){
		case r: h = (g - b) / d + (g < b ? 6 : 0); break;
		case g: h = (b - r) / d + 2; break;
		case b: h = (r - g) / d + 4; break;
	}
	h /= 6;
}

return [h, s, v];//0~1
}//fe

commonui.getRGBFromStyle=function(s){
if(!s)return null
if(s.substr(0,1)=='#')
	s = this.hexToRgb(s)
else
	s = s.match(/\d+/g)
return s
}

commonui.hsvToRgb=function(h, s, v){//0~1
var r, g, b;

var i = Math.floor(h * 6);
var f = h * 6 - i;
var p = v * (1 - s);
var q = v * (1 - f * s);
var t = v * (1 - (1 - f) * s);

switch(i % 6){
	case 0: r = v, g = t, b = p; break;
	case 1: r = q, g = v, b = p; break;
	case 2: r = p, g = v, b = t; break;
	case 3: r = p, g = q, b = v; break;
	case 4: r = t, g = p, b = v; break;
	case 5: r = v, g = p, b = q; break;
}

return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];//0-255
}//fe

commonui.hexToRgb=function (h){
if (h.length>4){
	h = h.match(/[0-9a-f]{2}/ig)
	return [ ("0x"+h[0])- 0, ("0x"+h[1])- 0, ("0x"+h[2])- 0]
	}
h = h.match(/[0-9a-f]/ig)
return [ ("0x"+h[0]+h[0])- 0, ("0x"+h[1]+h[1])- 0, ("0x"+h[2]+h[2])- 0]
}//fe

commonui.rgbToHex=function (rgb){
rgb = rgb.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
if(rgb){
	for (var h='#',i=1; i<4; i++)
		h+=("0" + parseInt(rgb[i],10).toString(16)).slice(-2)
	return h
	}
else
	return ''
}
//==================================
//��������
//==================================

commonui.createCommmonWindow = function (){
var y = _$('<div/>')._.cls('div3'),

t = _$('<div/>').$0(
	'className','tip_title',
	'draggable',true,
	'ondragstart' , function(e){
		this._p = {x:e.screenX,y:e.screenY}
		},
	'ondragend' , function(e){
		var x = this.parentNode.parentNode
		x.style.left = (e.screenX - this._p.x + parseInt(x.style.left,10)) + 'px'
		x.style.top = (e.screenY - this._p.y + parseInt(x.style.top,10)) + 'px'
		},

	_$('<a/>').$0('className','small_colored_text_btn ngared','href','javascript:void(0)','style',{backgroundColor:'#fff',fontSize:'1em',margin:'0 0.5em 0 0',padding:'0 0.4em'},'innerHTML','X','onclick',function(){this.parentNode.parentNode.parentNode._.hide()}),
	_$('<span/>').$0('className','title','innerHTML','&nbsp;')
	),

w = _$('<div/>')._.cls('single_ttip2')._.aC(
		_$('<div/>')._.cls('div1')._.aC(
			t,
			_$('<div/>')._.cls('div2')._.aC(
				y
				)
			)
		)

w._.__c = y
w._.__t = t
w._.addTitle=function(t){
	if(!t)t=''
	var x = this.self._.__t
	x.className='tip_title'
	x.lastChild.innerHTML = t
	return this.self
	};//fe
w._.addAfterContent=function(o){
	this.self._.__c.parentNode.parentNode.appendChild(o)
	};//fe
w._.addBeforeContent=function(o){
	this.self._.__c.parentNode.parentNode.insertBefore(o,this.self._.__c)
	};//fe
w._.addContent=function (x){
	var z = this.self._.__c
	if(arguments.length>1){ //�������ʱֱ�ӵ���add
		if(!arguments[0])
			z.innerHTML = ''
		z._.add.apply(z._,arguments)
		return this.self
		}
	if (!x)
		z.innerHTML = ''

	else if (typeof(x)=='object')
		z.appendChild(x)
	else//��������ʱ��������innerhtml
		z.innerHTML+=x
	return this.self
	};//fe
w._.show=function (x,y,z){
	var o = this.self
	if(!o.parentNode || o.parentNode.nodeType!=1 || o.nextSibling)
		document.body.appendChild(o)
	__NUKE.position.setPos(o,x,y,z?z:0)
	return o
	};//fe
w._.hide=function (e){
	this.self.style.display='none';
	return this.self
	};//fe
return w
}//fe

//alert & confirm
commonui.alertWindow = null
commonui.alert = function(txt){
if(!this.alertWindow)this.alertWindow = this.createCommmonWindow()
this.alertWindow._.addContent(null)
this.alertWindow._.addContent(txt)
this.alertWindow._.show()
}//fe

//������洰��================
commonui.createadminwindow = function(id){
if(this.adminwindow)return this.adminwindow
this.adminwindow = this.createCommmonWindow()
if(!id)
	this.adminwindow.id = 'commonuiwindow';
else
	this.adminwindow.id = id;
document.body.appendChild(this.adminwindow);
return this.adminwindow
}//fe
commonui.hideAdminWindow = function(){
this.adminwindow.style.display='none'
return this.adminwindow
}//fe

commonui.unselectCheckBox = function(o){
this.massAdmin.unCheckAll(o ? o : document)
}



commonui.massAdmin ={
getChecked:function (){
var i = ''
for (var id in this.d){
	if (parseInt(id,10))
		i+=','+id
	}
if (!i){
	window.alert('������Ҫѡ��һ��')
	return '';
	}
this.unCheckAll()
i= i.substr(1)
return i
},//fe
unCheckAll:function(o){
for(var id in this.d)
	this._uncheck(this.d[id],id)
},//fe
checkAll:function(o){
if(this.l)
	return this.unCheckAll(o)

var x = o.getElementsByTagName('input')
for(var i=0;i<x.length;i++){
	with(x[i]){
		if(type=='checkbox' && parseInt(value,10)){
			if(this.l<15)
				this._check(x[i],value)
			else
				this._uncheck(x[i],value)
			}
		}
	}
},//fe
check:function(o,id){

if (!o.checked){
	this._uncheck(o,id)
	}
else{
	this._check(o,id)
	if(this.l>=16){
		this._uncheck(o,id)
		return window.alert('�㲻��ѡ�������')
		}
	}
},//fe
_check:function(o,id){
if(!o.checked)
	o.checked='checked'
if(!this.d[id]){
	this.d[id]=o
	this.l++
	var s = $('selectallbtn')
	if(s && s.firstChild.innerHTML!='����')
		s.firstChild.innerHTML='����'
	}
},//fe
_uncheck:function(o,id){
if(o.checked)
	o.checked=false
if(this.d[id]){
	delete this.d[id]
	this.l--;
	var s = $('selectallbtn')
	if(this.l==0 && s)
		s.firstChild.innerHTML='ȫѡ'
	}
},//fe
d:{},
l:0
}


//�ղ�����==================
commonui.favor = function (o,tid,pid){
if(window.confirm('�Ƿ�Ҫ�ղش���'+(pid?'[PID:'+pid+']':'[TID:'+tid+']')))
	__NUKE.doPost({u:__API.favorTopic(tid,pid),	b:(o && o.tagName)?o:null })
}//fe

commonui.favordelmass = function (o){
var tids=commonui.massAdmin.getChecked(), p = window.location.search.match(/(?:\?|&)page=(\d+)/)
if(p)
	p = p[1]
else
	p = 1
if(tids)
	__NUKE.doPost({u:__API.favorTopicDel(tids,p),	b:(o & o.tagName)?o:null })
else
	alert('��ѡ������')
}//fe

//baidu ip==================
commonui.ipArea = function (e,ip){
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addContent(
	_$('/div').$0('style',{width:'450px',height:'130px',overflow:'hidden'},
		_$('/iframe').$0('src','http://www.baidu.com/s?wd='+ip,'style',{width:'800px',height:'600px',border:'none',marginLeft:'-265px',marginTop:'-150px'})
		)
	)
this.adminwindow._.show(e)
}//fe
//admin pass==================
commonui.adminPassInput = function (e){
if(!window.__CURRENT_UID || !window.__NOW)
	return alert('��Ҫ�ȵ�½')
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addContent(
	'ĳЩ������������ȷ������󷽿�ʹ��(��Ч��1.5������) ��ͬ������Ҫ���ö�� ip�䶯��Ҫ���ö��',
	_$('/br'),
	_$('/input')._.attr('size',20),
	_$('/button')._.attr({innerHTML:'ȷ��',type:'button'})._.on('click',function(){
			var p = this.previousSibling.value.replace(/^\s*|\s*$/g,''), o = this
			loader.script(window.__SCRIPTS.md5,function(){
				__NUKE.doRequest({
					u:window.__API.admin_code(),
					b:o,
					f:function(d){
						var e = __NUKE.doRequestIfErr(d)
						if(e)
							return alert(e)
						d = d.data[0]
						if(!d || !d[0] || !d[1] || !d[2]  || !d[3] )
							return alert('error')
						__NUKE.doRequest({
							u:d[3].replace('_REPLACE_COOKIE_HERE_', hex_md5(p+'_j67h8i'+__CURRENT_UID+''+d[1]+''+Math.floor(d[0]/d[2])) ),
							b:this,
							f:function(d){
								var e = __NUKE.doRequestIfErr(d)
								if(e)
									return alert(e)
								alert(d.data[0])
								}
							})//request2
						}
					})//request

				});//load md5

			}
		)
	)
this.adminwindow._.show(e)
}//fe

//debug==================
commonui.userDebug = function (e){
if(!window.__CURRENT_UID || !window.__NOW)
	return alert('��Ҫ�ȵ�½')
var x,y,z,$ = _$
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('����debug')
this.adminwindow._.addContent(
	$('/button').$0('innerHTML','����','type','button','onclick',
		function(){
			commonui._debug.on(1)
			}),
	'(����Ա��׼����Ч) ',
	$('/br'),
	$('/br')
	)

if(!__GP.admin)
	return;

this.adminwindow._.addContent(
	'�����ض��û���debug',
	$('/br'),
	x=$('/input').$0('size',20),
	'UID ',$('/br'),
	y=$('/input').$0('size',20),
	'����(<90 ��0���)',
	$('/br'),
	z=$('/select').$0(
		$('/option').$0('value',1024,'innerHTML','JS'),
		$('/option').$0('value',1024|2048|4096,'innerHTML','JS+PHP')
		),'���� ',
	$('/br'),
	$('/button')._.attr({innerHTML:'ȷ��',type:'button'})._.on('click',function(){
			__NUKE.doRequest({
				u:__API.userDebug(x.value, y.value, z.options[z.selectedIndex].value),
				b:this,
				f:function(d){
					var e = __NUKE.doRequestIfErr(d)
					if(e)
						return alert(e)
					alert(d.data[0])
					}
				})
			}
		)
	)
this.adminwindow._.show(e)
}//fe

//set avatar==================
commonui.setAvatar = function (e,uid,ad){
if(!__CURRENT_UID)
	return alert('��Ҫ�ȵ�½')
var x,y,y1,y2,y3,$=_$,n = function(u){return $('/input').$0('value',u?u:'','size','50')}
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('����ͷ��'+(uid==__CURRENT_UID?'':' UID:'+uid))
this.adminwindow._.addContent(x = $('/span'),
	y=$('/span').$0('style','display:none')._.add(
		'���ͷ�����ʾ��ʽ ',
		y1=$('/input').$0('type','radio','name','sa1234','checked','checked'),
		'��� ',
		y2=$('/input').$0('type','radio','name','sa1234'),
		'ʱ�� ',
		$('/br')
		),
	(ad && uid!=__CURRENT_UID)?$('/span')._.add(
		'����ͷ�� ',
		y3=$('/select')._.add(
			$('/option').$0('innerHTML','--','value',0),
			$('/option').$0('innerHTML','3��','value',3),
			$('/option').$0('innerHTML','7��','value',7),
			$('/option').$0('innerHTML','15��','value',15),
			$('/option').$0('innerHTML','30��','value',30),
			$('/option').$0('innerHTML','60��','value',60)
			),
		'�� ',
		$('/br')
		):null,
	$('/button').$0('innerHTML','����һ��','title','��������ö��ͷ�� ���ǵ�ַ���ܳ��Ȳ��ܳ���1000�ֽ�','type','button','onclick',
		function(){
			if( x.getElementsByTagName('input').length>=5)
				return alert('���ܳ���5��')
			y.style.display=''
			x._.add(
				n(),$('/br')
				)
			}),
	$('/button').$0('innerHTML','ȷ��','type','button','onclick',
		function(){
			var a = (y2&&y2.checked)?'2':'',b = x.getElementsByTagName('input'),z=[],j=0
			for(var i=0;i<b.length;i++){
				if(!b[i].value)
					continue;
				for(var l=0;l<b.length;l++){
					if(i!=l && b[i].value==b[l].value){
						b[l].style.backgroundColor='#fee'
						alert('��ַ�ظ�')
						}
					}
				j++
				z[i] = new Image()
				z[i]._pi = b[i]
				z[i].onerror = function(){
					this._pi.style.backgroundColor='#fee'
					alert('ͼƬ�޷���ȡ')
					}
				z[i].onload = function(){
					if(this.width>180 || this.height>255){
						this._pi.style.backgroundColor='#fee'
						alert('ͷ��ߴ����')
						}
					else{
						this._pi.style.backgroundColor='#efe'
						j--
						if(j==0){
							for(var i=0;i<b.length;i++){
								if(b[i].value)
									a+='\t'+b[i].value+'\t\t'
								}
							__NUKE.doRequest({
								u:__API.setAvatar(uid,a,y3?y3.options[y3.selectedIndex].value:''),
								b:this,
								f:function(d){
									var e = __NUKE.doRequestIfErr(d)
									if(e)
										return alert(e)
									alert(d.data[0])
									}
								})
							}
						}
					}
				}
			if(j==0){
				__NUKE.doRequest({
					u:__API.setAvatar(uid,'',y3?y3.options[y3.selectedIndex].value:''),
					b:this,
					f:function(d){
						var e = __NUKE.doRequestIfErr(d)
						if(e)
							return alert(e)
						alert(d.data[0])
						}
					})
				}
			for(var i=0;i<b.length;i++){
				if(b[i].value)
					z[i].src = b[i].value
				}
			})
	)

__NUKE.doRequest({
	u:__API.getAvatar(uid),
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		try{
		eval('var d='+(d.data[0].charAt(0)=='{'?d.data[0]:'"'+d.data[0]+'"'))
		}catch(e){return}
		if(d && d.l){
			if(d.l>1){
				y.style.display=''
				if(d.t==2){
					y2.checked='checked'
					y1.checked=''
					}
				}
			for(var i=0;i<d.l;i++)
				x._.add(
					n(d[i].constructor==String?d[i]:d[i][0]),$('/br')
					)
			}
		else{
			x._.add(
				n(),$('/br')
				)			
			}

		}
	})

this.adminwindow._.show(e)
}//fe

//set sign==================
commonui.setSign = function (e,uid,ad){
if(!__CURRENT_UID)
	return alert('��Ҫ�ȵ�½')
var x,y,$=_$,n = function(u){return $('/input').$0('value',u?u:'','size','50')}
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('����ǩ��'+(uid==__CURRENT_UID?'':' UID:'+uid))
this.adminwindow._.addContent(x = $('/span'),
	(ad && uid!=__CURRENT_UID)?$('/span')._.add(
		'����ǩ�� ',
		y=$('/select')._.add(
			$('/option').$0('innerHTML','--','value',0),
			$('/option').$0('innerHTML','3��','value',3),
			$('/option').$0('innerHTML','7��','value',7),
			$('/option').$0('innerHTML','15��','value',15),
			$('/option').$0('innerHTML','30��','value',30),
			$('/option').$0('innerHTML','60��','value',60)
			),
		'�� ',
		$('/br')
		):null,
	x = $('/textarea').$0('value','','cols','35','rows','20','title','ǩ������ʹ��bbscode'),
	$('/br'),
	$('/button').$0('innerHTML','ȷ��','type','button','onclick',
		function(){
			__NUKE.doRequest({
				u:__API.setSign(uid,x.value,y?y.options[y.selectedIndex].value:''),
				b:this,
				f:function(d){
					var e = __NUKE.doRequestIfErr(d)
					if(e)
						return alert(e)
					alert(d.data[0])
					}
				})
			})
	)

__NUKE.doRequest({
	u:__API.getSign(uid),
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		x.value = d.data[0]
		}
	})

this.adminwindow._.show(e)
}//fe

//extra pass==================
commonui.extraAuthInput = function (e){
if(!window.__CURRENT_UID)
	return alert('��Ҫ�ȵ�½')
this.createadminwindow()
this.adminwindow._.addTitle('�ƶ���֤��(beta)')
this.adminwindow._.addContent(null)
var $ = _$,self=this
if(__GP.userBit & 128)	this.adminwindow._.addContent(
	'��ȷ���豸ʱ��׼ȷ ',$('/button').$0('type','button','innerHTML','�鿴������ʱ��','onclick',function(){
		__NUKE.doRequest({
			u:'/nuke.php?__lib=safe_reg&__act=get_server_time&raw=1',
			b:this,
			f:function(d){
				var e = __NUKE.doRequestIfErr(d)
				if(e)
					return alert(e)
				alert(d.data[1])
				}
			})
		}),$('/br'),
	'�����ƶ���֤������ʾ������',$('/br'),
	$('/input')._.attr('size',20),
	$('/button')._.attr({innerHTML:'��֤',type:'button'})._.on('click',function(){
			var p = this.previousSibling.value.replace(/^\s*|\s*$/g,''),
			s='salt'+Math.floor(Math.random()*10000), md5 = hex_md5(p+s+__CURRENT_UID)+s
			__NUKE.doRequest({
				u:window.__API.extraAuth(md5,this.nextSibling.nextSibling.checked?1:''),
				b:this,
				f:function(d){
					var e = __NUKE.doRequestIfErr(d)
					if(e)
						return alert(e)
					alert(d.data[0])
					}
				})

			}
		),$('/br'),
	$('/input').$0('type','checkbox'),'������������/�ͻ����ϵ���֤״̬',
	$('/br'),$('/br'),$('/br'),
	$('/button').$0('type','button','innerHTML','������ƶ���֤��','onclick',function(){
		if(confirm('���ȷ�� ȡ����֤����˵���������͵�����ʺ�����'))
			__NUKE.doRequest({
				u:'/nuke.php?__lib=safe_reg&__act=auth_unactive_send&raw=1',
				b:this,
				f:function(d){
					var e = __NUKE.doRequestIfErr(d)
					if(e)
						return alert(e)
					alert(d.data[0])
					}
				})
		})
	)
else	this.adminwindow._.addContent(
	"�����Ϊ����ʺŰ��ƶ���֤�� ",
	$('/a').$0('href','http://baike.baidu.com/view/2233048.htm','target','_blank','className','b','innerHTML','(ʲô���ƶ���֤��)'),
	$('/br'),$('/br'),
	'���ƶ���֤����ĳЩ��������Ҫʹ����֤����֤֮�󷽿ɽ��У�����',$('/br'),
	' . ĳЩ������',$('/br'),
	$('/br'),
	'��/ȡ���� ��Ҫͨ������ʺŵ�������в���',$('/br'),
	$('/br'),
	'���µ��ƶ���֤����ʹ�ɵ�ʧЧ',$('/br'),
	$('/br'),
	'�����ʹ�ö���豸/�ͻ���/������������޲���������Ҫ��ÿһ���豸/�ͻ���/�������������֤',$('/br'),
	$('/br'),
	'��֤��ÿ����֤֮����ܱ����������֤״̬',$('/br'),
	$('/br'),
	'�����Ľ��������IP�仯�ϴ��������ҪƵ��������֤',$('/br'),
	$('/br'),$('/br'),
	$('/button')._.attr({innerHTML:'��һ��',type:'button'})._.on('click',function(){
		var x,y,z
		self.adminwindow._.addContent(null)
		self.adminwindow._.addContent(
			'�����ϣ��Ϊ����ʺŰ��ƶ���֤��',$('/br'),
			x=$('/input').$0('type','checkbox'),$('/b').$0('innerHTML','������ȷ������ʺ�ע��������ʵ����'),$('/br'),
			'������������޷�ʹ��',$('/a').$0('href','/read.php?tid=7504167','className','b','innerHTML','�ɲ��մ�������','target','_blank'),
			$('/br'),$('/br'),
			y=$('/input').$0('type','checkbox'),$('/b').$0('innerHTML','Ȼ��������ƶ��豸�а�װ "Google Authenticator" �� "Google�����֤��"'),$('/br'),
			'Google�����֤���������� ����Google�˺����ʹ��',$('/br'),
			'���ڰ�ȫ������г������ش˳���',$('/br'),
			$('/a').$0('href','https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2','className','b','innerHTML','Android','target','_blank'),', ',$('/a').$0('href','http://www.wandoujia.com/apps/com.google.android.apps.authenticator2','className','b','innerHTML','Android*','target','_blank'),', ',$('/a').$0('href','https://itunes.apple.com/en/app/google-authenticator/id388497605','className','b','innerHTML','IOS','target','_blank'),', ',$('/a').$0('href','http://www.windowsphone.com/en-us/store/app/authenticator/021dd79f-0598-e011-986b-78e7d1fa76f8','className','b','innerHTML','WP','target','_blank'),', ',$('/a').$0('href','https://winauth.com/','className','b','innerHTML','Windows','target','_blank'),
			$('/br'),$('/br'),
			'��װ����֤��֮�� ���ڴ�����һ����ʱ����(���ֺ���ĸ)',$('/br'),
			'�������һ��������˺�',$('/br'),
			z=$('/input')._.attr('maxlength',6,'size',10),
			$('/button')._.attr({innerHTML:'��һ��',type:'button'})._.on('click',function(){
					if(!x.checked || !y.checked)return
					var p = z.value.replace(/^\s*|\s*$/g,'')
					if(!p)return
					var s='salt'+Math.floor(Math.random()*10000), md5 = hex_md5(p+s+__CURRENT_UID)+s
					__NUKE.doRequest({
						u:{u:'/nuke.php?__lib=safe_reg&__act=auth_code_send&raw=3',a:{secret:this.previousSibling.value}},
						b:this,
						f:function(d){
							var e = __NUKE.doRequestIfErr(d)
							if(e)
								return alert(e)
							alert(d.data[0])
							}
						})

					}
				)
			)
		})
	)
this.adminwindow._.css('width','40em')
this.adminwindow._.show(e)
}//fe


/*
commonui.lockmass = function (e)
{
adminui.locktopic(e)

}//fe
*/
//��ҳ��ת==============
commonui.jumpToForm = function (e,postPerPage,cp,mp){

var min = cp-10, max = cp+10, s = _$('/select')
if(min<1)min=1
if(max>mp)max=mp
if(min>1)
	s._.add(_$('/option').$0('innerHTML',1,'value',1))

for(var i=min; i<=max; i++)
	s._.add(_$('/option').$0('innerHTML',i,'value',i,i==cp?'selected':'_null',1))
s._.on('change',function(){
	if(!this.options[this.selectedIndex].value)
		return
	var l = window.location , h = l.protocol+'//'+l.host+l.pathname+(l.search.replace(/(?:\?|&)page=(?:e|\d+)/gi,'')+'&page='+this.options[this.selectedIndex].value).replace(/^&/,'?')
	window.location.href = h
	})
if(max<mp)
	s._.add(_$('/option').$0('innerHTML','ĩҳ('+mp+')','value',mp))

this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addContent(
	window.location.pathname.indexOf('/read.php')==-1 ? '' : _$('/span')._.add(
		'��',
		_$('/input').$0('size',4),
		_$('/button')._.attr({innerHTML:' ¥ ',type:'button'})._.on('click',function(){
				var x = __NUKE.toInt(this.previousSibling.value)
				if(!x)return
				var l = window.location
				l.href = l.protocol+'//'+l.host+l.pathname+(l.search.replace(/(?:\?|&)page=(?:e|\d+)/gi,'')+'&page='+Math.ceil((x+1)/postPerPage)).replace(/^&/,'?')+'#l'+x;
				}
			),
		_$('/br'),
		_$('/br')
		),
	'��',
	_$('/input').$0('size',4),
	_$('/button')._.attr({innerHTML:' ҳ ',type:'button'})._.on('click',function(){
			var x = __NUKE.toInt(this.previousSibling.value)
			if(!x)return
			var l = window.location
			l.href = l.protocol+'//'+l.host+l.pathname+(l.search.replace(/(?:\?|&)page=(?:e|\d+)/gi,'')+'&page='+x).replace(/^&/,'?')
			}
		),
	_$('/br'),
	_$('/br'),
	'��',
	s,
	'ҳ'
	)


tTip.showdscp(e,this.adminwindow);
}//fe
//lesser nuke==================
commonui.lessernuke = function (e,tid,pid)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$, rg, rf, rs, m2, m4, m6, n1, n2, info, infos;
this.adminwindow._.addTitle('�μ�NUKE');

this.adminwindow._.addContent(
	rg = $('/input').$0('type','radio','name','opt0'),'ȫ��̳ ',
	rf = $('/input').$0('type','radio','name','opt0'),'������ ',
	rs = $('/input').$0('type','radio','name','opt0'),'���ϼ� ',
	$('/br'),
	m2 = $('/input').$0('type','radio','name','opt1','checked',1),'����2�� ',
	m4 = $('/input').$0('type','radio','name','opt1'),'����4�� ',
	m6 = $('/input').$0('type','radio','name','opt1'),'����6�� ',
	$('/br'),
	$('/input').$0('type','radio','name','opt2','checked',1),$('/span').$0('innerHTML','���ۼ����� '),
	n1 = $('/input').$0('type','radio','name','opt2'),$('/a').$0('innerHTML','�ۼ����� ','href','javascript:void(0)','onclick',function(){alert('�ۼ�150������������ʽ�����İ���ۼ�1����')}),
	n2 = $('/input').$0('type','radio','name','opt2'),$('/a').$0('innerHTML','�ӱ��ۼ����� ','href','javascript:void(0)','onclick',function(){alert('�ۼ�300������������ʽ�����İ���ۼ�2����')}),
	$('/br'),
	$('/br'),
	infos = $('/input').$0('value','����˵��(����ʾ��������)','style',{color:'silver'},'name','no','maxlength','20','onfocus',function(){if(!this.name)return;this.name='',this.value='',this.style.color=''}),
	$('/br'),
	$('/br'),
	info = $('/textarea').$0('value','�����Ĳ���˵��(��ͨ�����ŷ���)','style',{color:'silver'},'name','no','rows','3','cols','20','onfocus',function(){if(!this.name)return;this.name='',this.value='',this.style.color=''}),
	$('/br'),
	$('/br'),
	$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
		var opt = 0;
		if(rg.checked)opt|=128
		if(rf.checked)opt|=256
		if(rs.checked)opt|=512
		if(m2.checked)opt|=16
		if(m4.checked)opt|=32
		if(m6.checked)opt|=64
		if(n1.checked)opt|=1
		if(n2.checked)opt|=2
		__NUKE.doRequest({
			u:__API.lesserNuke2(tid, pid, opt, !info.name? info.value : '', !infos.name? infos.value : ''),
			b:this,
			inline:true
			})
		}
	)
	)
if(__GP.greater)
	rg.checked=1
else
	rf.checked=1
this.adminwindow._.show(e)
}






//�������=================
commonui.comment = function (event,tid,pid)
{

__NUKE.doRequest({
	u:__API.postGet(tid,pid,postfunc.__REPLY,null,null,1),
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		if(d.data.__MESSAGE)
			return alert(d.data.__MESSAGE[1])

		var d= d.data

		commonui.comment_sub(event,d.tid,d.pid,d.fid,__NUKE.toInt(d.__F.bit_data),d.content,d.warning)

		}
	})
}//fe


commonui.comment_sub = function (e,tid,pid,fid,fbit,c,warning)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$, x, y=null, a=null;
this.adminwindow._.addTitle('����/����');
if(warning){
	y=$('/b')._.cls('red')
	for(var k in warning){
		if(typeof(warning[k])=='object')
			y._.add(warning[k][1],$('/br'))
		} 
	}
this.adminwindow._.addContent(
	$('/form')._.add(
		'������300��, һЩBBSCODE��Ч',
		$('/br'),
		y,
		y?$('/span').$0('class','silver','innerHTML','���ⷢ���� �������������еĻظ�<br/>���һ�����ӱ����������� ��ô���ķ�����Ҳ��������<br/>'):null,
		$('/br'),
		x = $('/textarea').$0('name','info','rows','5','cols','40'),
		$('/br'),
		a = $('/input').$0('type','checkbox','checked',''),
		' ����(100ͭ��)',
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
				x.value = x.value.replace(/^\s+|\s+$/,'')
				if(x.value.length==0)return
				//alert(c ? c+x.value : x.value)

				commonui.newPost(
					this,
					postfunc.__REPLY,//����
					fbit,//����bit type
					fid,//����id
					tid,//����id
					pid,//�ظ�id
					null,//o_setTopic
					null,//����
					c ? c+x.value : x.value,//����
					0,//�������� �������ɼ�
					0,//ֻ�����ߺͰ����ɻظ�
					null,//����
					null,//����У��
					null,//ͶƱ����
					null,// 0ͶƱ 1Ͷעͭ��
					null,//ÿ������Ͷ 0����
					null,//Сʱ�����
					null,//Ͷע���ֵ
					null,//Ͷע��Сֵ
					null,
					1,
					a.checked?1:null
					)
				}
			)
		)
	)
this.adminwindow._.show(e)

}//fe


/*
 *���ü�������Ĺ���Ա
 *adminsΪundefined��ȡ��ǰ�Ĺ���Ա��Ϣ
 */
commonui.setTopicAdmin = function (e,stid,admins)
{
if(admins===undefined){
	__NUKE.doRequest({
		u:__API.setTopicAdmin(stid),
		f:function(d){
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return alert(e)
			commonui.setTopicAdmin( e, stid, d.data[0] ? d.data[0] : '' )
			return true
			}
		})
	return
	}
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$, x, y='';
for(var x in admins)
	y+=admins[x]+"\n"

this.adminwindow._.addTitle('���ü��Ϲ���Ա');

this.adminwindow._.addContent(
	$('/span')._.add(
		'���Ϲ���Ա���Ա༭�������������',
		$('/br'),
		'���Խ������Ƴ�����',
		$('/br'),
		'���Ա༭������',
		$('/br'),
		'ÿ������һ���û�ID���û���',
		$('/br'),
		'�����û���ǰ���\\ ',
		$('/br'),
		x = $('/textarea').$0('value',y,'rows','5','cols','40'),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
				x.value = x.value.replace(/^\s+|\s+$/,'')
				//if(x.value.length==0)return
				__NUKE.doRequest({
					u:__API.setTopicAdmin(stid, x.value)
					})
				}//fe
			)
		)
	)
this.adminwindow._.show(e)
}//fe


/*
 *���ü�������ĺ�����
 *adminsΪundefined��ȡ��ǰ�Ĺ���Ա��Ϣ
 */
commonui.setTopicBlock = function (e,stid,blocks)
{
if(blocks===undefined){
	__NUKE.doRequest({
		u:__API.setTopicBlock(stid),
		f:function(d){
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return alert(e)
			commonui.setTopicBlock( e, stid, d.data[0] ? d.data[0] : '' )
			return true
			}
		})
	return
	}
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$, x, y='';
for(var x in blocks)
	y+=blocks[x]+"\n"
this.adminwindow._.addTitle('���ü������������');

this.adminwindow._.addContent(
	$('/span')._.add(
		'�������е��û��޷��ڼ����з���',
		$('/br'),
		'ÿ������һ���û�ID���û���',
		$('/br'),
		'�����û���ǰ���\\ ',
		$('/br'),
		x = $('/textarea').$0('value',y,'rows','5','cols','40'),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
				x.value = x.value.replace(/^\s+|\s+$/,'')
				//if(x.value.length==0)return
				__NUKE.doRequest({
					u:__API.setTopicBlock(stid, x.value)
					})
				}//fe
			)
		)
	)
this.adminwindow._.show(e)
}//fe


//���=================
commonui.audit = function (e,tid,pid)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addContent( "\
	<form action='nuke.php?func=audit&yes=0,"+tid+","+pid+"' target='commonuiwindowiframe' method='post' onsubmit='commonui.disableInputOnSubmit(this)'>\
	<input name='submit' value='���ͨ��' type='submit'> <input value='ȡ��' type='button' onclick='commonui.hideAdminWindow()'>\
	</form>\
	<iframe name='commonuiwindowiframe' id='commonuiwindowiframe' scrolling='no' allowtransparency='true' src='about:blank' style='height:50px;width:200px;border:none;overflow:hidden'></iframe>\
")
tTip.showdscp(e,this.adminwindow);
}
//fe

//����=================
commonui.addpoint = function (e,tid,pid,fid)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addContent( "\
	<form action='nuke.php?func=addpoint&tid="+tid+"&pid="+pid+"' target='commonuiwindowiframe' method='post' onsubmit='commonui.disableInputOnSubmit(this)'>\
	����/�۳��û��ڱ��������\
	<table>\
		<tr>\
			<td>\
				����\
			</td>\
			<td>\
				<input type='text' size='10' maxlength='10' name='rcvc' value=''>(-10000~10000)\
			</td>\
		</tr>\
		<tr>\
			<td>\
				����\
			</td>\
			<td>\
				<input type='text' size='10' maxlength='16' name='info' value=''>\
			</td>\
		</tr>\
		<tr>\
			<td>\
				PM\
			</td>\
			<td>\
				<input type='radio' name='pm' value='1' checked='checked'>��\
				<input type='radio' name='pm' value='0'>��\
			</td>\
		</tr>\
		<tr>\
			<td colspan=2>\
				<input name='submit' value='�ύ' type='submit'> <input value='ȡ��' type='button' onclick='commonui.hideAdminWindow()'>\
			</td>\
		</tr>\
	</table>\
	</form>\
	<iframe name='commonuiwindowiframe' id='commonuiwindowiframe' scrolling='no' allowtransparency='true' src='about:blank' style='height:50px;width:200px;border:none;overflow:hidden'></iframe>\
")
tTip.showdscp(e,this.adminwindow);
}
//fe

//������������=================
commonui.setPost = function (e,tid,pid)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$, de=null,t=null,p=null,pm,info

this.adminwindow._.addTitle('������������');


de = $('/select').$0('name','delay')
de.$0($('/option').$0('value','','innerHTML','����'))
for (var i=0.5;i<24;i+=0.5)
	de.$0($('/option').$0('value',i*3600,'innerHTML',i+"Сʱ��"))


var f = function(e){
	var x = this
	if(x.innerHTML=='on')
		x.innerHTML='off',x.title='��';
	else if(x.innerHTML=='off')
		x.innerHTML='--',x.style.backgroundColor='gray',x.title='���ֵ�ǰ����';
	else if(x.innerHTML=='--')
		x.innerHTML='on',x.style.backgroundColor='#551200',x.title='��';
	}, 
	ck=function(k){
	return $('/a').$0('href','javascript:void(0)','title','���ֵ�ǰ����','className','small_colored_text_btn stxt white','name',k,'onclick',f,'innerHTML','--','style',{backgroundColor:'gray'})
	}

this.adminwindow._.addContent(
	$('/form')._.add(
		de,
		p = $('/div')._.add(
			ck(1024), ' ���� ���ܱ༭/�ظ�', $('/br'),
			ck(2), ' ���� ����/�����ɼ�����*', $('/br'),
			ck(128), ' �������߱༭', $('/br'),
			pid ? 
				null 
				: $('/span')._.add(ck(256), ' ֻ�����߻ظ�', $('/br')),
			//ck(2048), ' �������', $('/br'),
			(!window.__GP.admin || pid) ? 
				null 
				: $('/span')._.add(ck(16384), ' ���� ����/�ÿ�/�����ɼ�', $('/br')),
			pid ? 
				null 
				: $('/span')._.add(ck(131072), ' �������ϰ�����ʾ', $('/br'))
			),
		pid ? null : (t = $('/div')._.add(
			ck(131072), ' �����ϼ���ȫ������', $('/br'),
			ck(524288), ' �ϼ������ⲻ���»ظ�ʱ��(����չʾ��)', $('/br'),
			ck(256), ' �ظ�����ע��ʱ������', $('/br'),
			ck(2097152), ' �ظ��Զ�����', $('/br'),
			window.__GP['super'] ? 
				$('/span')._.add(ck(512), ' δ�����û��ɻظ�', $('/br')) 
				: null,
			//window.__GP['super'] ? 
			//	$('/span')._.add(ck(1024), ' �����û��ɻظ�', $('/br'))
			//	: null,
			window.__GP['super'] ? 
				$('/span')._.add(ck(2048), ' NUKE�û��ɻظ�', $('/br'))
				: null
			)),
		$('/br'),$('/span').$0('className','small_colored_text_btn stxt white','innerHTML','--','style',{backgroundColor:'gray'}),' ��Ϊ"���ֵ�ǰ״̬"',
		$('/br'),'*�����������Ļظ����б��в��ɼ�',
		$('/br'),$('/br'),
		pm = $('/input').$0('type','checkbox','name','pm'),' ���û����Ͷ���Ϣ',
		$('/br'),
		info = $('/textarea').$0('name','info','rows','3','cols','20'),
		$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
				var f = this.parentNode
				if(!tid){
					var tids = commonui.massAdmin.getChecked()
					if(!tids)return
					tids = tids.replace(/,/g,',0,')+',0'
					}
				var tOn=0, tOff=0, pOn=0, pOff=0, x = p.getElementsByTagName('a')
				for(var i=0;i<x.length;i++){
					if(x[i].innerHTML=='on')
						pOn |= parseInt(x[i].name, 10)
					else if(x[i].innerHTML=='off')
						pOff |= parseInt(x[i].name, 10)
					}
				if(t){
					var x = t.getElementsByTagName('a')
					for(var i=0;i<x.length;i++){
						if(x[i].innerHTML=='on')
							tOn |= parseInt(x[i].name, 10)
						else if(x[i].innerHTML=='off')
							tOff |= parseInt(x[i].name, 10)
						}
					}
				if(!tOn && !tOff && !pOn && !pOff)
					return
				__NUKE.doRequest({
					u:__API.setPost(
						tid ? tid+','+(pid?pid:0) : tids, 
						tOn,
						tOff,
						pOn,
						pOff,
						pm.checked?1:'',
						info.value.replace(/^\s+|\s+$/,''),
						de.value,
						window.__CURRENT_FID?__CURRENT_FID:''

						),
					b:this
					})
				}
			)
		)
	)
this.adminwindow._.show(e)
}


//postDispMini=================
commonui.postDispMini = function(cS,cC,fid,tid,pid,aid,type){
if(type){
	//if((type & 512) && __GP.lesser)
	//	cS.innerHTML+="  <span class='red nobr' title='�����'>[���]</span>";
	if((type & 16384) && (__GP.greater||__GP.admincheck))
		cS.innerHTML+="  <span class='red nobr' title='�����б��в��ɼ�'>[����*]</span>";
	if (type & 1024)
		cS.innerHTML+=" <span class='red nobr' title='�޷��༭/�ظ�'>[����]</span>";
	//if (type & 1048576)
	//	cS.innerHTML+=" <span class='red nobr' title='�ϼ��޷��༭/�ظ�/��������'>[����*]</span>";
	if ((type & 2) && (__GP.greater||__GP.admincheck))
		cS.innerHTML+=" <span class='red nobr' title='ֻ������/�����ɼ�'>[����]</span>";
	if ((type & 131072) && (__GP.greater||__GP.admincheck))
		cS.innerHTML+=" <span class='gray nobr' title='�������ϰ�������ʾ'>[��������]</span>";
	if (type & 1)
		cS.innerHTML+=" <span class='nobr' title='��һ������'>[����]</span>";
	}
ubbcode.bbsCode({
	c:cC,
	noImg:1,
	fId:fid,
	tId:tid,
	pId:pid,
	authorId:aid,
	rvrc:0,
	isSig:0
	})
}//fe

//��������Ϣ����
commonui.userInfo = {
w:window,
u:{uid:0,username:'',credit:0,medal:'',reputation:'',groupid:0,memberid:0,avatar:'',active:0,yz:0,site:'',honor:'',regdate:0,mute_time:0,postnum:0,rvrc:0,money:0,thisvisit:0,signature:'',nickname:'',buffs:{},bit_data:0},
users:{},
groups:null,
medals:null,
buffs:null,
reputations:null,
setAll:function(v){
if(v.__REPUTATIONS)
	this.reputations = v.__REPUTATIONS
delete v.__REPUTATIONS
if(v.__GROUPS)
	this.groups = v.__GROUPS
delete v.__GROUPS
if(v.__MEDALS)
	this.medals = v.__MEDALS
delete v.__MEDALS
var n=function(u){
	if(u.buffs){
		var now = window.__NOW
		for(var k in u.buffs){
			if(u.buffs[k][1]<now)
				u.buffs[k]=null
			}
		}
	for(var k in u)
		this[k]=u[k]
	if(typeof this.username != 'string')
		this.username = new String(this.username)
	this.active = this.yz
	}
n.prototype=this.u
for(var k in v)
	this.users[k] = new n(v[k])

}
}//ce




//�ɵ�ǰ�����⣩��ַ���ɵ����ӵ�����====
commonui.genPidLink = function(pid,lou){
if(!this.genPidLink.base){
	var l = window.location;
	if(l.pathname!='/read.php')
		this.genPidLink.base=1
	else
		this.genPidLink.base = l.pathname+l.search.replace(/(&|\?)(?:_ff|topid|to|pid)=.+?(?:&|$)/ig,'$1')
	}
if(this.genPidLink.base===1)
	return ''
else
	return this.genPidLink.base+( pid ? '&pid='+pid+'&to=1' : '#'+lou )
}


//��ֹ�ظ��ύ=================
commonui.remuseInputAfterSubmit = function(o)
{
var f = o.parentNode;
if (f.nodeName=='FORM'){
	if (o.readyState=='complete')
	{
		f.submiting = false;
		var i = f.getElementsByTagName('input');
		for (var j=0; j<i.length; j++){
			if (i[j].getAttribute('type')=='submit'){
				i[j].disabled = false;
			}
		}
	}
}
}//fe

//��ֹ�ظ��ύ=================
commonui.disableInputOnSubmit = function(o)
{
if (o.submiting){return false;}
o.submiting = true;
var i = o.getElementsByTagName('input');
for (var j=0; j<i.length; j++){
		if (i[j].getAttribute('type')=='submit'){
			i[j].disabled = true;
		}
	}
}//fe

//logpost==================
commonui.logPost = function (e,tid,pid)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addContent( "\
<form action='./nuke.php?func=logpost&tid="+tid+"&pid="+pid+"&log' target='commonuiwindowiframe' method='post'><input type=text name=info size=35/>�ٱ�����</form><button type='button' onclick='this.previousSibling.submit();this.disabled=1'>������ٱ�����</button><br/>\
<iframe name='commonuiwindowiframe' id='commonuiwindowiframe' onreadystatechange='commonui.remuseInputAfterSubmit(this)' scrolling='no' allowtransparency='true' src='about:blank' frameBorder='0' style='height:50px;width:200px;border:none;overflow:hidden'></iframe>\
")
tTip.showdscp(e,this.adminwindow);
}//fe

//==================================
//��ʾ����
//==================================

//��������===============
commonui.setfont = function(){

}//fe

//�û��ű�����===============
commonui.ifuserscript=function(){}

commonui.loadUserScript=function(e){
if (!domStorageFuncs || !__CURRENT_UID || !Object.freeze)return
if(!e){
	if(!parseInt(cookieFuncs.getMiscCookie('user_script_'+__CURRENT_UID),10))
		return
	}
if(commonui.userScript){
	if(e)
		commonui.userScript.setUi(e)
	else
		commonui.userScript.load()
	}
else
	loader.script(__SCRIPTS.userScript,function(){ commonui.loadUserScript(e) })
}//fe

//��Ƕ�����Ķ�===============
commonui.iframeread = function(r){
var t ={
	0:{0:'Ĭ�Ϸ�ʽ�Ķ�����',1:'���������ת���Ķ�����ҳ��'},
	1:{0:'��Ƕ�����Ķ�����',1:'������Ӵ��Ķ�������Ƕ����'}
	}
r=parseInt(r,10)
if (!isNaN(r))
	{
	if(r)cookieFuncs.setMiscCookieInSecond('iframeread',r,3600*24*30);
	else cookieFuncs.setMiscCookieInSecond('iframeread',0,0);
	window.location.href=window.location.href
	return;
	}
var r=parseInt(cookieFuncs.getMiscCookie('iframeread'),10);
if (!r)r=0;
var s = "<select title='�Ķ����ⷽʽѡ��' onchange='commonui.iframeread(this.options[this.selectedIndex].value)'>";
for (var k in t)
	{
	s+="<option ";
	if(k==r)s+=" selected ";
	s+="value='"+k+"' title="+t[k][1]+">"+t[k][0]+"</option>";
	}
s+="</select>";
return s
}//fe

//����ʾǩ����ͷ��===============
commonui.picswitch = function(r){
var t ={
	0:{0:'��ʾǩ����ͷ��',1:'�Ķ�����ҳ������ʾǩ����ͷ��'},
	1:{0:'����ʾǩ����ͷ��',1:'�Ķ�����ҳ���в���ʾǩ����ͷ��'}
	}
r=parseInt(r,10)
if (!isNaN(r))
	{
	if(r)cookieFuncs.setMiscCookieInSecond('notLoadPAndS',r,3600*24*30);
	else cookieFuncs.setMiscCookieInSecond('notLoadPAndS',0,0);
	window.location.href=window.location.href
	return;
	}
var r=window.__LITE.notLoadPAndS ? 1 : 0
var s = "<select title='��ʾǩ����ͷ��ѡ��' onchange='commonui.picswitch(this.options[this.selectedIndex].value)'>";
for (var k in t)
	{
	s+="<option ";
	if(k==r)s+=" selected ";
	s+="value='"+k+"' title="+t[k][1]+">"+t[k][0]+"</option>";
	}
s+="</select>";
return s
}//fe


//==================================
//��ʷ����
//==================================

//������ʷ����==============
commonui.lockViewHis = function (fid,lock,stid){
var h = this.userCache.get('ForumViewHis'),x=null
for (var i in h){
	x=h[i]
	if (x && x[0]==fid && ( (stid || x[5]) ? x[5]==stid : true )){
		if(typeof lock=='undefined')
			lock=x[2] ? 0 : 1

		if (lock){
			x[2]=1
			delete x[3]
			delete x[4]
			}
		else{
			delete x[2]
			}
		this.userCache.set('ForumViewHis',h,3600*24*30)
		return lock
		}
	}
}//fe


/**
*������ʷ����
*@param n ������
*@param id ����id
*@param stidN ����������
*@param stid ��������id
*@param page ��ǰpage
*
*��ʷ���ʼ�¼�Ľṹ
*{
	{0:����id
	1:������
	2:����״̬
	3:�Զ���������
	4:�Զ���������
	5:�ϼ�����id
	6:�ϼ�������
	7:��ǰpage
	}
*}
*/
commonui.addForumViewHis = function(n,id,stidN,stid,p)
{
var h = this.userCache.get('ForumViewHis'),p = p|0
if(!h || typeof(h[0])!='object'){
	h={0:{0:id,1:n}}
	if(stid){
		h[0][5] = stid
		h[0][6] = this.cutstrbylen(stidN,11,10,'...')
		}
	if(p)h[0][7] = p
	this.userCache.set('ForumViewHis',h,3600*24*30)
	return
	}

var l=null,x=null,limit=22,d,lock,dis,lc=false
for (var i=0;i<limit;i++){
	if(!h[i]){
		l = i//l is last space
		break
		}
	if(!h[i][2])//l is last unlock
		l = i
	if(id==h[i][0] && 
		( (stid || h[i][5]) ? h[i][5]==stid : true )
			){//if fid hit
		if(lc===false){
			lc=0
			for(var k in h){
				if(h[k][2])
					lc++
				}
			}

		if(lc<8){//����8������Զ�����
			//add hit count
			d=new Date
			d = Math.floor( (d.valueOf()/1000-d.getTimezoneOffset()*60)/86400 ) //����ʱ���1970 1 1����ǰ������
			dis = d-h[i][3]
			if(dis<0)//old
				h[i][4] = 0
			else if(dis<1)//����ÿ��+1
				h[i][4]++
			else if(dis>=1 && dis<2)//����+10
				h[i][4]+=10
			else//���������õ�10
				h[i][4]=10

			h[i][3]=d

			if(h[i][4]>40)
				lock = true

			}

		//l=i
		x=h[i]
		if(h[i][1]!=n)//if forum rename
			h[i][1] = n
		if(stid && h[i][6]!=stidN)//if set rename
			h[i][6] = stidN
		if(p)h[0][7] = p
		break	
		}
	}

if(x && x[2])//if hit a lock
	return true


if(l!==null){//l is the last nolock or last space
	for (var i=l;i>0;i--)
		h[i]=h[i-1]
	h[0]=x ? x : {0:id,1:n,3:d,4:1}
	if(stid){
		h[0][5] = stid
		h[0][6] = this.cutstrbylen(stidN,11,10,'...')
		}
	if(p)h[0][7] = p
	this.userCache.set('ForumViewHis',h,3600*24*30)
	if(lock)
		this.lockViewHis(id,true)
	return x ? true : false
	}

}//fe

commonui.triggerEvent = function(o,n){
var e,w=window;
  if (w.document.createEvent) {
    e = w.document.createEvent("HTMLEvents");
    e.initEvent(n, true, true);
  } else {
    e = w.document.createEventObject();
    e.eventType = n;
  }

  //e.eventName = eventName;
  //e.memo = memo || { };

  if (w.document.createEvent) {
    o.dispatchEvent(e);
  } else {
    o.fireEvent("on" + e.eventType, e);
  }
}

//==================================
//��ҳ��ť
//p[1] ���ҳ Ϊ0ʱ��ʾ ��������1ҳ   С��0��ʾ ��������p[1]*-1ҳ
//==================================
commonui.pageBtn = function(o,p,c){
if(c && this.pageBtn.cache && this.pageBtn.cache.nodeName=='TABLE'){
	o.innerHTML=''
	o.appendChild(	this.pageBtn.cache.cloneNode(1)	)
	var x = o.getElementsByTagName('a')
	for(var i=0;i<x.length;i++){
		if(x[i].name=='topage')
			_$(x[i])._.on('click',function(e){commonui.jumpToForm(e,p[3],p[2],p[1])})
		}
	return
	}
var bit = __SETTING.bit, more = bit & 8 ? 1 : (bit & 4 ? 3 : 5),url=p[0], max=p[1], cur=p[2], postPerPage=p[3], e = max, s = cur-more
if(max < 1){//��������ҳ
	if(max<0)//��ʾָ����ҳ��
		e = cur-max
	else//��ʾ��һҳ
		e = cur+1
	}
if(e>cur+more)
	e = cur+more
if(s<1)
	s=1

if(e<s)
	return

var oo = this.stdBtns()

for(var i=s;i<=e;i++){
	oo._.__add(
		_$('/a').$0(
			'href',url+(i!=1 ? '&page='+i : ''),
			'innerHTML','&nbsp;'+i+(i==max? '.' : '&nbsp;'),
			'className',(i>cur ? (max>1 ? 'uitxt1' : 'silver') : (i<cur ? 'uitxt1' : 'invert') ),
			'title',(i>cur && max<=1 ? '�����е�'+i+'ҳ' : (i==max? '���ҳ' : '') )
			)
		)
	}
if(cur>1 && (bit&4)==0){
	oo._.__ins(
		_$('/a').$0(
			'href',url+'&page='+(cur-1),
			'innerHTML','ǰҳ',
			'title','��һҳ',
			'className','uitxt1'
			),1
		)
	}
if(s>1){
	oo._.__ins(
		_$('/a').$0(
			'href',url,
			'innerHTML',bit & 8 ? '��' : '��ҳ',
			'title','��һҳ',
			'className','uitxt1'
			),1
		)
	}
if(cur<max && (bit&4)==0){
	oo._.__add(
		_$('/a').$0(
			'href',url+'&page='+(cur+1),
			'innerHTML','��ҳ',
			'title','��һҳ',
			'className','uitxt1'
			),1
		)
	}
if(e<max){
	oo._.__add(
		_$('/a').$0(
			'href',url+'&page='+max,
			'innerHTML',bit & 8 ? 'β' : 'ĩҳ',
			'title','���ҳ ��'+max+'ҳ',
			'className','uitxt1'
			)
		)
	}
if(max>1 || max<1){
	oo._.__add(
		_$('/a').$0(
			'href','javascript:void(0)',
			'innerHTML','��',
			'name','topage',
			'title','��ָ����ҳ��',
			'className','uitxt1',
			'onclick',function(e){commonui.jumpToForm(e,postPerPage,cur,max)}
			)
		)
	}
o.innerHTML=''

if(!oo._.__length)
	return

o.appendChild(oo)
if(oo._.__vml)
	oo._.__vml()
this.pageBtn.cache =o.firstChild

}//fe

//==================================
//�жϰ�ť�Ƿ�����
commonui.pageBtnAdjHeight = function(o,oo){
window.setTimeout(function(){
	if(!oo.offsetHeight || o.offsetHeight<oo.offsetHeight*2)return
	o.className = 'doublebtns'
	if(o.style.visibility)o.style.visibility=''
	},100)
}//fe

commonui.genHisLink = function(h,f){
var $ = _$, x = $('/span')._.cls('his_select_c'), self= this, t1='����������', t2='����������� (����ӵ���ҳ���ٵ�����)', sw = function(o,y){
	var x = (o.title == t1)
	self.lockViewHis(y[0],(x ? 0 : 1),y[5])
	o.title = x ? t2 : t1
	o.className = o.className.substr(0,17)+(x ? ' starleft' : ' starright')
	}
for (var k in h){
	var y = h[k]
	x._.add(
		$('/span')._.add(
			$('/a').$0(
				//'name',y[0]+','+(y[5]?y[5]:''),
				'href','javascript:void(0)',
				'onclick',function(){sw(this,this.parentNode._.gV('data'))},
				'title',(y[2] ? t1:t2),
				'className','inlineBlock star '+(y[2] ? 'starright':'starleft')
				),
			$('/a').$0(
				'href','/thread.php?fid='+y[0],
				'innerHTML',y[1],
				f?'onclick':null,
				f? function(e){return f(e,this.parentNode._.gV('data'))} : null
				),
			y[5] ? $('/br') : null,
			y[5] ? $('/a').$0(
				'className','teal sub',
				'href','/thread.php?stid='+y[5],
				'innerHTML',y[6],
				f?'onclick':null,
				f? function(e){f(e,this.parentNode._.gV('data'))} : null
				) : null
			)._.sV('data',y),
		$('/br')
		)
	}
return x
}//fe

//==================================
//������ʷ��������
//==================================
commonui.advNav = function (o){
var w = window, h = this.userCache.get('ForumViewHis'), a = o.getElementsByTagName('a'), u = a[0], p = u.parentNode, s = o.getElementsByTagName('span')
p.appendChild(_$('/div').$0('className','clear'))

for(var i=0;i<s.length;i++){
	if(s[i].className=='nav_spr')
		s[i].innerHTML = '&emsp;<span>&raquo;</span>'
	}

for(var i=0;i<a.length;i++){
	var z = a[i]
	if(z.className=='nav_root')
		z.innerHTML = 'NGA'
	else if(z.className!='nav_link')
		continue
	if(z.innerHTML.length<5)
		z.innerHTML = z.innerHTML.replace(/(.)/g,"&nbsp;$1").substr(6)
	}

if (!h || !h[0]) return;

var x = _$('/div').$0('onmouseout',function(e){
		var to = e.relatedTarget || e.toElement;
		if(to && to!=this && to.parentNode!=this && to.parentNode.parentNode!=this)y.style.display='none'
		},
	'onmouseover',function(){
		if(y.style.display=='block')
			return
		y.style.display='block'
		},
	'className','nav_root_c'
	)
, y = _$('<div/>').$0('className','urltip urltip2 navhisurltip','style',{display:'none'} , commonui.genHisLink(h))


x.appendChild(y)
p.replaceChild(x,u)
x.appendChild(u)
if(w.__SETTING.bit & 4096)
	w.commonui.touchOver.init(x)
}//fe


//==================================
//touchmove ��� mouseover
//==================================
commonui.touchOver = {
$:_$,
init:function(o){
this.$(o)._.on('touchmove',function(e){
var c = commonui
if(!this._previousTTime || e.timeStamp.valueOf()-this._previousTTime>1000){
	if(!this._touchFocus){
		this._touchFocus=true
		this._previousTTime = e.timeStamp.valueOf()
		c.triggerEvent(this,'mouseover')
		c.touchOver.focus(o)
		}
	else{
		this._touchFocus=false
		this._previousTTime = e.timeStamp.valueOf()
		c.triggerEvent(this,'mouseout')
		c.touchOver.blur(o)
		}
	}
c.cancelBubble(e)
c.cancelEvent(e)
})
},//fe
focus:function(o){
o.style.backgroundColor='#faa'
o.style.MozBoxShadow='inset 0 0 3px #f00,0 0 3px #f00';
o.style.WebkitBoxShadow='inset 0 0 3px #f00,0 0 3px #f00';
o.style.boxShadow='inset 0 0 3px #f00,0 0 3px #f00';
},
blur : function(o){
o.style.backgroundColor=''
o.style.MozBoxShadow='';
o.style.WebkitBoxShadow='';
o.style.boxShadow='';
}
}

//==================================
//�������
//==================================

//����תΪ����============
/**
*����תΪ����
*o (string ��������
*fid (string ����İ���id
*stid (string ����ĺϼ�id
*cfids (string ��ǰ����id ���ŷָ�
*cstid (string ��ǰ�ϼ�id
*/
commonui.topicLinkTipLoad = function (o,fid,stid,cfids,cstid){
var y = '', z = cstid ? '&stid='+cstid : ('&fid='+(cfids ? cfids : fid));
o.innerHTML=o.innerHTML.replace(/\[.+?\]/g,function($0){
	y += "<a href='thread.php?key="+encodeURIComponent($0)+z+"'>"+$0+"</a> "
	if(window.__TOPIC_KEY_COLOR && __TOPIC_KEY_COLOR[$0])
		return '<span class="t_k_c'+__TOPIC_KEY_COLOR[$0][1]+'">'+$0+'</span>'
	else
		return '<span class="silver">'+$0+'</span>'})
if (y!='')
	this.genTip.add(o,y)
}//fe


//��ȡ����ķ���==================
commonui.onloadtopic_key = function(o,fid){
var ffid = false
if (o.form && o.form.elements.namedItem('fid') && o.form.elements.namedItem('fid').value)
	ffid = o.form.elements.namedItem('fid').value
if (ffid)
	{
	if (o._last_fid==ffid)return
	fid=o._last_fid = ffid
	}
else
	{
		if (!fid){
			window.alert('�����ѡ��һ������');
			return
		}
		if (o.onchange)
			return;
	}
o.disabled=true
o.innerHTML='';
var x = document.createElement('option');
x.innerHTML = '������...'
x.value=''
o.appendChild(x)

__NUKE.doRequest({
	u:__API.topic_key(fid),
	f:function(d){
		if(!__NUKE.doRequestIfData(d,3600))
			return false
		if(!d.data || d.error)
			return true
		if(typeof d.data[0][0] == 'object')
			d.data = d.data[0]
		o.options[0].innerHTML = '...'
		var r = d.data;
		for (var k in r){
			var x = document.createElement('option');
			x.value=r[k][0]
			x.innerHTML=r[k][0]
			if (r[k][1]) x.style.backgroundColor='#eee'
			o.appendChild(x)
			}
		o.onchange=function(){
			if (o.form.elements.namedItem("post_subject"))var x=o.form.elements.namedItem("post_subject")
			else if(o.form.elements.namedItem("key"))var x = o.form.elements.namedItem("key")
			x.value=o.value+" "+x.value
			}
		o.disabled=false
		o.onclick = function(){commonui.onloadtopic_key(this)}
		return true
		}
	})//doRequest

}//fe


//==================================
//��������ui
//==================================

commonui.parseToppedTopic = function(o){
var w = window
o.style.display='none'
if(w.__SETTING.bit & (1024 | 8))//7inch embe
	o.innerHTML = '[collapse]'+o.innerHTML+'[/collapse]'
o.innerHTML = w.commonui.parseImgInToppedTopic(o.innerHTML).replace(/\s*<br\s*\/?>\s*\[size=\d+%\]\s*\[\/size\]/gi,'').replace(/\[quote\]|\[\/quote\]/gi,'').replace(/^(\s*<br\s*\/?>\s*)+|(\s*<br\s*\/?>\s*)+$/gi,'')
_$(o)._.on('click',function(e){
	var o = e.target ? e.target : e.srcElement
	if(o.name=='collapseSwitchButton' || o.name=='randomblockButton')this.style.height=this.style.maxHeight=''
	})._.css((o.innerHTML.match(/\[headline\]/i)) ? {height:'290px',display:'block',overflow:'auto'} : {maxHeight:'700px',display:'block',overflow:'auto'})
w.ubbcode.bbsCode({
	c:o,
	noImg:(w.__SETTING.bit & 64)? 1:0,
	//fId:fid,
	//tId:tid,
	//pId:pid,
	//authorId:aid,
	//rvrc:rvrc,
	isSig:0,
	//callBack: type & 4096 ? function(a){commonui.autoTranslate.main(a.c,a.fId)} : null,
	isLesser:true
	})
o.style.display='block'

}//fe


//�������� =============
commonui.imgInToppedTopic={}
commonui.parseImgInToppedTopic = function(txt){

var j=0

txt = txt.replace(/\[(iframe|img|flash|headline)=?([0-9,]+)?\](.+?)\[\/\1\]/ig , function($0,$1,$2,$3){
	j++
	if($1=='headline')return $0
	if( $1=='flash' && j==1)
		return '[flash]'+$3+'[/flash]'
	return '['+$1+' not load]'
	})

return txt
}//fe

//�Ӱ���tab==============
commonui.setforumtab = function (o,fid,recmd,admin,user)
{
var tab = o.getElementsByTagName('h2')
var i = 0
if (tab[i].className.indexOf('parentforum')!=-1)
	i++;
tab[i].className='a'
tab[i+1].className=tab[i+2].className='ia'
if (fid){
	if (user||admin)
		{
		tab[i].className='ia'
		if (admin)
			tab[i+1].className='a'
		else
			tab[i+2].className='a'
		}
	}
else
	tab[i+1].style.display=tab[i+2].style.display='none'
}


//��������==============
commonui.setThreadOrder = function (o,oo)
{
var x = window.location.href.toLowerCase()
x = x.replace(/(?:(\?)|&)order_by=\w*/,'$1')
if (o=='postdatedesc' || o=='lastpostdesc'){
	if (x.substr(x.length-1)=='?')
		x+='order_by='+o
	else
		x+='&order_by='+o
	}
oo.href=x;
oo.onclick=function(){};
return true;
}//fe

/*
*�����û���html
*uid uid
*name �û���
*l ��������(һ�����ַ�Ϊ��λ)
*/
commonui.htmlName = function(name,l){
var o = 0
if(name.charAt(0)=='#' && name.match(/^#anony_[a-f0-9]{32}$/))
	var n = this.anonyName(name)[0],o=o|1
else
	var n = name

if(l && n.length>l){
	var x = this.cutstrbylen(n,l)
	if(x != n){
		o = o|2
		n = x+"<span class='b silver'>��</span>"
		}
	}

if(o&1)
	n = n+"<span class='b silver'>?</span>"

if(!window.__GP || !__GP.admincheck){
	return o ? "<span title='"+( (o&2)?name+' ':''  )+(  (o&1)?'����һ�������û� ':'' )+"'>"+n+"</span>" : n
	}

var c=[],hex = Math.abs(DJBHash(name)).toString(16)
for(var i=0;i<6;i+=2)
	c.push( ('0x'+hex.substr(i,2))-0 )

c[0] = c[1]/255
c[1] = c[1]/255/2+0.25
c[2] = c[2]/255/2+0.25

c = this.hsvToRgb(c[0],c[1],c[2])

return "<b class='inlineblock' "+(o?"title='"+( (o&2)?name+' ':''  )+(  (o&1)?'����һ�������û� ':'' )+"'":'')+" style='width:1.5em;height:1.5em;line-height:1.5em;border-radius: 0.25em;text-align:center;background:#"+( ("0" + c[0].toString(16)).slice(-2) + ("0" + c[1].toString(16)).slice(-2) + ("0" + c[2].toString(16)).slice(-2))+";color:#ffffff'>"+n.substr(0,1)+"</b>"+n.substr(1)
}//fe

//���������Ϣ==============
commonui.topicArg = {
data:[],
add:function(
idReplies,idTopic,idAuthor,idPostTime,
idReplier,idReplyTime,idPagelinks,
fid,tid,pid,quoteTid,quoteFrom,postdate,lastpost,replies,
type,topicMisc,font,
avatar,admin,attath
){
idReplies = $(idReplies)
idTopic = $(idTopic)
idAuthor = $(idAuthor)
idPostTime = $(idPostTime)
idReplier = $(idReplier)
idReplyTime = $(idReplyTime)
idPagelinks = $(idPagelinks)
admin = admin|0
type = type|0
quoteTid = quoteTid|0
quoteFrom = quoteFrom|0
this.data.push(arguments)
},//fe
init:function(){
__NUKE.addCss('.topicrowsnone {display:none}')
},//fe
preLoad:function(){

},//fe
loadAll:function(){
for(var i=0;i<this.data.length;i++)
	commonui.loadThreadInfo.apply(commonui,this.data[i])
$('topicrows').className.replace('topicrowsnone', '')
}//fe
}//ce

commonui.loadThreadInfo = function(
o_replies,o_topic,o_author,o_ptime,
o_replier,o_rtime,o_pagelinks,
fid,tid,pid,quote_tid,quote_from,postdate,lastpost,replies,
type,topicMisc,font,
avatar,admin,ath
){

var self = this, w = window, __GP=w.__GP, document=w.document, lite = w.__SETTING.bit & 16, now = w.__NOW, selBox

type=parseInt(type,10)
//==================================
var x = this.htmlName(o_author.innerHTML,7), y=this.htmlName(o_replier.innerHTML,7)
if(x!=o_author.innerHTML)
	o_author.innerHTML = x
if(y!=o_replier.innerHTML)
	o_replier.innerHTML = y
//get replies number bg color =============================

var bgC = this.loadThreadInfo.getBgHsv(o_ptime.parentNode)

//hide ===================

//topicMisc
if(!topicMisc)
	topicMisc = {_BIT1:0}
else if(topicMisc.match(/~1?$/)){
	font = topicMisc;
	topicMisc = {_BIT1:0}
	}
else
	topicMisc = commonui.topicMiscVar.unpack(topicMisc)


//font ===================
if(topicMisc._BIT1){
	var x = '',tmp = commonui.topicMiscVar,i=topicMisc._BIT1
	if(i&tmp._FONT_RED)
		x+='red ';
	else if(i&tmp._FONT_BLUE)
		x+='blue ';
	else if(i&tmp._FONT_GREEN)
		x+='green ';
	else if(i&tmp._FONT_ORANGE)
		x+='orange ';
	else if(i&tmp._FONT_SILVER)
		x+='silver ';
	if(i&tmp._FONT_B)
		x+='b ';
	if(i&tmp._FONT_I)
		x+='italic ';
	if(x)
		o_topic.className+=' '+x;
	}
else if (font){
	font = font.split('~')
	if(font[1])font[0] += ' b'
	if(font[2])font[0] += ' italic'
	o_topic.className+=' '+font[0];
	}

//page===================
if (replies+1>20){//ÿҳ20
	var pn = Math.ceil((replies+1)/20), pb = '/read.php?tid='+(quote_from ? quote_from : tid) , ph = ''
	ph +=" <span class='pager'>&gt;&gt; [ ";
	for(var i=1; i<=pn; i++){
		if (i==6){
			i=pn
			ph +=" ... "
			}
		ph +=" <a style='color:gray' href='"+pb+"&page="+i+"'>"+i+"</a>"
		}
	ph +=' ]</span>'
	o_pagelinks.innerHTML = ph
	}

//add from forum ===================
var x = o_pagelinks.getElementsByTagName('a')
for (var i=0; i<x.length; i++)
	this.addFrom2Therad(x[i])
this.addFrom2Therad(o_topic)
this.addFrom2Therad(o_rtime)

//link tip ===================
this.topicLinkTipLoad(o_topic, fid, topicMisc._STID, w.__SELECTED_FORUM, w.__CURRENT_STID);


//union forum ===================
if (w.__CURRENT_FID && w.__SELECTED_FORUM && o_topic.parentNode.parentNode.className.indexOf('ufindex')!=-1){
	var tmp = o_topic.parentNode.getElementsByTagName('a')
	var x = null
	for (var k=0;k<tmp.length;k++){
		if (tmp[k].className.indexOf('nomatch')!=-1){
			x = tmp[k]
			break;
			}
		}
	if(x){
		tmp = x.href.match(/thread\.php\?fid=(\d+)/)
		if(tmp){
			this.genTip.add(x,"<a href='javascript:void(0)' class='red' onclick='commonui.unionforumSubscribe("+tmp[1]+",__CURRENT_FID,2)'>���������б�����ʾ�������</a>")
			x.parentNode.style.cssFloat='right'
			}
		}
	}

//topic tip ===================
var tmp = document.createElement('span');
if(quote_from)
	tmp.innerHTML+="<span class='gray nobr'>"+(admin&2?"[<a href='read.php?tid="+tid+"' class='gray'>����</a>]":'[����]')+"</span>";
//if (digest)
//	tmp.innerHTML+="<span class='blue nobr'>[�Ƽ�]</span>";
if (type & 1024)
	tmp.innerHTML+="<span class='red nobr'>[����]</span>";

if (topicMisc._BIT1 &&(topicMisc._BIT1 & 1048576))
	tmp.innerHTML+=" <span class='red nobr' title='�ϼ����޷��༭/�ظ�/��������'>[����*]</span>";

if (topicMisc._BIT1 &&(topicMisc._BIT1 & 65536))
	tmp.innerHTML+=" <span class='red nobr'>[ֱ��]</span>";

if ((type & 2) && (__GP.greater||__GP.admincheck))
	tmp.innerHTML+="<span class='red nobr'>[����]</span>";
if ((type & 131072) && (__GP.greater||__GP.admincheck))
	tmp.innerHTML+=" <span class='red nobr' title='�������ϰ�������ʾ'>[��������]</span>";
if((type & 16384) && (__GP.greater||__GP.admincheck))
	tmp.innerHTML+="  <span class='red nobr' title='�����б��в��ɼ�'>[����*]</span>";

if (now-lastpost<=3600)
	tmp.innerHTML+="<span class='orange nobr'>[����]</span>";
if (__GP.lesser && lastpost>postdate && (lastpost-postdate)<24*3600)
	tmp.innerHTML+="<span class='orange nobr' title='ƽ���ظ����ʱ��'>["+Math.floor((lastpost-postdate)/replies)+"]</span>";
if (type & 8192){
	tmp.innerHTML+="<b class='orange'>+</b>";
	if(ath){
		var athc=0,atho
		for(var k in ath){
			if(ath[k] && ath[k].type && ath[k].type=='img'){
				var athimgs = this.getAttachBase(ath[k].url)+'/'+ath[k].url, athimgm = athimgs
				ath[k].thumb = parseInt(ath[k].thumb,10)
				if(ath[k].thumb &&(ath[k].thumb<=2 || ath[k].thumb & 16))
					athimgs +='.thumb_s.jpg'
				if(ath[k].thumb &&(ath[k].thumb & 64))
					athimgm +='.medium.jpg'
				if(!atho)atho=_$('/div')
				atho._.add( ' ', 
							_$('/a').$0(
								'href','javascript:void(0)',
								'onclick',function(e){
									self.createadminwindow()
									self.adminwindow._.addContent(null)
									self.adminwindow._.addTitle('&emsp;')
									self.adminwindow._.addContent(_$('/img').$0('src',this._.gV('athimgm'),'style',{border:'0.2em solid #551200'}))
									self.adminwindow._.show(e);
									},
								_$('/img').$0('src',athimgs,'style',{border:'0.2em solid #551200'})
								)._.sV('athimgm',athimgm)
							)
				athc++
				if(athc>=2)
					break
				}
			}
		if(atho)o_topic.parentNode.appendChild(atho)
		}
	}
if((type & 8) && (admin&2))
	tmp.innerHTML+="<a href='/nuke.php?func=adminlog&about="+tid+"' class='silver titleadd' title='�鿴Ԥ����¼'>[��ʱ����]</a>";
if((type & 32) && (admin&2))
	tmp.innerHTML+="<a href='/nuke.php?func=logpost&tid="+tid+"' class='silver titleadd' title='�鿴���/�ٱ���¼'>[���]</a>";
//if((type & 512) && __GP.lesser)
//	tmp.innerHTML+="<span class='red nobr' title='�����'>[���]</span>";
if(type & 32768){
	tmp.innerHTML+="<span class='red nobr' title='���⼯��'>[�ϼ�]</span>";
	o_topic.href = '/thread.php?stid='+(quote_from ? quote_from : tid)
	if(!w.__CURRENT_STID)o_topic.parentNode.parentNode.className+=' set_topic'
	}
if(type & 65536){
	if(!w.__CURRENT_STID)o_topic.parentNode.parentNode.className+=' set_topic_elm'
	}
o_topic.parentNode.insertBefore(tmp,o_topic.nextSibling);

//o_replies.style.display=o_ptime.style.display=o_rtime.style.display='none'

if (admin&1)
	selBox = _$('/input').$0('type','checkbox','className','checkbox right','value',(pid? tid+'_'+pid: tid),'onclick',function(){self.massAdmin.check(this,this.value)})


if(lite){
	if(this.loadThreadInfo.removeTableHeader){
		this.loadThreadInfo.removeTableHeader()
		this.loadThreadInfo.removeTableHeader = null
		}
	var $ = w._$, 
	z = o_ptime.parentNode, 
	y = o_rtime.parentNode, 
	u= o_replies.parentNode,
	v=o_topic.parentNode,
	//c=this.hsvToRgb(bgC[0]*0.98,bgC[1]*1.1904,bgC[2])
	x = $('/div').$0(
		'className','posterInfoLine',
		'style',{marginBottom:'1em',/*backgroundColor:'rgb('+c[0]+','+c[1]+','+c[2]+')',*/textAlign:'right'},
		$(o_replies).$0('style',{marginLeft:'0.5em',cssFloat:'left',fontWeight:'900'}),
		$(o_author).$0('className','smoke nobr','style',{marginLeft:'1.5em'}),
		$(o_ptime).$0('className','smoke nobr','style',{marginLeft:'1em',display:'inline'}),
		$(o_replier).$0('className','smoke nobr','style',{marginLeft:'1.5em'}),
		$(o_rtime).$0('className','smoke nobr','style',{marginLeft:'1em',display:'inline'}),
		selBox ? $(selBox).$0('style',{marginLeft:'1.5em',cssFloat:'none'}) : null
		)

	//o_topic.style.fontSize='1.2em'
	v.insertBefore(x,v.firstChild)
	v.style.paddingBottom='1em'
	v=v.parentNode
	v.removeChild(z)
	v.removeChild(y)
	v.removeChild(u)
	}
else{
	if (selBox)
		o_replies.parentNode.insertBefore(selBox,o_replies)
	}

//format time ===================
o_ptime.innerHTML = this.time2dis(postdate)
o_rtime.innerHTML = this.time2dis(lastpost)
o_ptime.title = this.time2date(postdate,'y-m-d H:i')
o_rtime.title = this.time2date(lastpost,'y-m-d H:i')

//time font ===================
if (w.__SETTING.bit & 512)//�ź�11px
	o_rtime.style.fontSize=o_ptime.style.fontSize=o_author.style.fontSize=o_replier.style.fontSize='0.916em'
else{
	if (o_ptime.innerHTML.match(/^[0-9\-: ]+$/))
		o_ptime.style.fontSize='0.916em'
	if (o_rtime.innerHTML.match(/^[0-9\-: ]+$/))
		o_rtime.style.fontSize='0.916em'
	}

//replies font size ===================
if(lite){
	var s=1.167
	}
else{
	var s=1.667
	if(replies>99){
		if(replies>999){
			if(replies>9999)
				s=1.083
			else
				s=1.167
			}
		else
			s=1.333
		}
	}
o_replies.style.fontSize=s+'em'

//replies color ===================
if(replies>100)replies=100
if(bgC && (type & 1024)==0){
	if(this.genReplyColor)
		var x=this.genReplyColor(bgC,replies)
	else
		var x=this.genReplyColorDefault(bgC,replies)
	o_replies.style.color='rgb('+x[0]+','+x[1]+','+x[2]+')'
	}
else
	o_replies.style.color='#eee'

//avatar ===================
if (avatar && !(w.__UA[0]==1 && w.__UA[1]<=6) && !(w.__SETTING.bit & 64) && o_ptime.parentNode)
	this.loadThreadInfoAvatar(avatar,o_ptime.parentNode,{0:o_author,1:o_ptime},this.hsvToRgb(bgC[0],bgC[1],bgC[2]))


}//fe

commonui.loadThreadInfo.bgColor={}
commonui.loadThreadInfo.count=0
commonui.loadThreadInfo.p=commonui

commonui.loadThreadInfo.getBgHsv = function(o){
	var bgC , id = (o.nodeName=='TD' ? o.parentNode.className+' '+o.className : null)
	if(!id || typeof(this.bgColor[id])=='undefined'){
		bgC = this.p.getRGBFromStyle(this.p.getStyle(o,'background-color'))
		if(!bgC)bgC=[0,0,0]
		this.bgColor[id] = this.p.rgbToHsv(bgC[0], bgC[1], bgC[2])
		bgC = this.bgColor[id]
		}
	else
		bgC = this.bgColor[id]
	return bgC
	}

commonui.loadThreadInfo.removeTableHeader = function(){
	var x = $('topic_table_header'), y=x.getElementsByTagName('td');
	if(y[3]){
		x.removeChild(y[3])
		x.removeChild(y[2])
		x.removeChild(y[0])
		}
	}

//�ظ�����ɫ
commonui.genReplyColorDefault = function(bgC,replies){
if(replies>100)replies=100
var ma = 120,//���仯���� �ظ���Խ��仯����Խ��
mi = 20,//���ٱ仯����
Hs = (120/360)/ma,//ɫ���仯���� �ܺ�120��
Ss = (0.4-bgC[1])/ma,//���Ͷȱ仯���� ���0.4
h = Hs*(replies+mi), 
h = bgC[0]+h*(bgC[0]>0.25 ? 1 : -1),//��ɫһ�����ɫ�仯 ��ɫһ������ɫ�仯
s = bgC[1]+Ss*(replies+mi)
if(h<0)h+=1
if(h>1)h-=1
//console.log(bgC[0]+' '+bgC[1]+' '+bgC[2])
return this.hsvToRgb(h<=1?h:h-1, s, bgC[2]-0.15)
}

//�����Դ����
commonui.addFrom2Therad = function(o){
o.href+= (window.__CURRENT_FID && window.__UNION_FORUM? '&_ff='+__CURRENT_FID : '')  +  (window.__CURRENT_PAGE && __CURRENT_PAGE!=1? '&_fp='+__CURRENT_PAGE : '')  +  (window.__CURRENT_ORDER ? '&forder_by='+__CURRENT_ORDER : '')
}


commonui.topicMiscVar = {
_BIT1:1,
_STID:2,

_FONT_RED:1,
_FONT_BLUE:2,
_FONT_GREEN:4,
_FONT_ORANGE:8,
_FONT_SILVER:16,
_FONT_B:32,
_FONT_I:64,
_FONT_U:128,

unpack:function(x){
if(x.match(/~1?$/))
	return;
var z={},x = b642bin(x),i=0,y;
if(x==='')
	return z;
while(y = bin2UInt(x.substr(i,1))){
	if(y==this._BIT1){
		z._BIT1 = bin2UInt(x.substr(i+1,4));
		i+=5;
		}
	else if(y==this._STID){
		z._STID = bin2UInt(x.substr(i+1,4));
		i+=5;
		}
	}
return z;
}//fe
}//ce
/*
//˫��ʱ������ͷ========================
commonui.loadThreadHead = function (self,r,t,pt,rt){
if (window.__PARALLEL){
	r.style.display=rt.style.display='none'
	pt.style.width='23%'
	pt.style.paddingLeft=pt.style.paddingRight='0px'
	for (var i=0;i<rt.childNodes.length;i++){
		if(rt.childNodes[i]!==self)
			pt.appendChild(rt.childNodes[i].cloneNode(true))
		}
	}
self.parentNode.removeChild(self);
}//fe

//˫��ʱ����߶�========================
commonui.alignHeight = function (a,b,c){
if(this.loadThreadInfo.count<c){
	var self=this
	window.setTimeout(function (){
		self.alignHeight(a,b,c)
		},50)
	return
	}
var x = a.getElementsByTagName('tr'),y=b.getElementsByTagName('tr'),z = Math.max(x.length,y.length),e,f,g,h,j
for (var i=0;i<z;i++){
	if(x[i] && y[i]){
		var c = x[i].getElementsByTagName('td'),d= y[i].getElementsByTagName('td')
		if (c[1].offsetHeight>d[1].offsetHeight){
			e=d[1]
			f=c[1].offsetHeight
			}
		else if(c[1].offsetHeight<d[1].offsetHeight){
			e=c[1]
			f=d[1].offsetHeight
			}
		else
			continue
		g=parseInt(commonui.getStyle(e,'border-top-width'),10)
		if(!h){
			h=parseInt(commonui.getStyle(e,'padding-top'),10)
			j=parseInt(commonui.getStyle(e,'padding-bottom'),10)
			if(!h)h=0
			if(!j)j=0
			}
		e.style.height = (f-h-j-(g?g:0))+'px'
		}
	}
}//fe
*/

//��ʾ�����б��ͷ��========================



commonui.loadThreadInfoAvatar = function (a,td,shw,bgC){

a = commonui.selectUserPortrait(a)

var mask = document.createElement('div')
mask.style.margin = '-6px -1px -95px -1px'
mask.style.height='100px'
mask.style.backgroundImage = 'url("'+__IMG_STYLE+'/avatarmask'+( (td.parentNode.className.indexOf('row1')!=-1)? 1 : 2 )+'.png")'

var img = new Image()
img.onreadystatechange=img.onload=function(){
	if(this&&this.readyState&&this.readyState!='complete')
		return
	this.onreadystatechange = this.onload=null
	var x = Math.floor(this.width*(a.cX ? a.cX : 0.25)-17),y = Math.floor(this.height*(a.cX ? a.cX : 0.3)-17)
	td.style.backgroundPosition='-'+x+'px -'+y+'px'
	td.style.backgroundImage='url("'+a+'")'
	if((this.width-x)<110){//����mask���
		x = 110-(this.width-x)
		mask.style.backgroundPosition='-'+x+'px 0px'
		}
	if(x=parseInt(commonui.getStyle(td,'padding-left'),10))
		mask.style.marginLeft = '-'+x+'px'
	}
img.src = a
td.style.backgroundRepeat='repeat-y'
td.style.verticalAlign='top'
td.style.overflow='hidden'
td.insertBefore(mask,td.childNodes[0])
for (var k in shw){
	if(window.__UA && __UA[0]==1){
		shw[k].style.backgroundColor='#'+bgC[0].toString(16)+bgC[1].toString(16)+bgC[2].toString(16)
		shw[k].style.display='block'
		shw[k].style.zoom=1
		shw[k].style.filter='progid:DXImageTransform.Microsoft.Chroma(Color='+shw[k].style.backgroundColor+') progid:DXImageTransform.Microsoft.DropShadow(color=#ffffff, offX=1, offY=1);'
		}
	else
		shw[k].style.textShadow='1px 1px 0 #fff'
	}
}//fe


//��Ӱ�����Ϣ==============
commonui.genadminlist = function(t,fid)
{
if (t){
	t = t.split(',');
	var i = 0;
	var l ='';
	for (var k in t){
		if (t[k]){
			l= l+"<option value='"+t[k]+"'>"+t[k]+"</option>";
			i++;
			}
		}
	if (l){
		t="����: <select onchange='if(this.selectedIndex>0){window.location.href=\"nuke.php?func=ucp&username=\"+this.options[this.selectedIndex].value}'><option value=''>...</option>"+l+"</select>";
		}
	}
else t='';
if (fid) fid="<a href='nuke.php?func=view_privilege&fid="+fid+"'>[����Ȩ��]</a>"
else fid='';
put("<span class='moderator'>"+fid+' '+t+"</span>");
}//fe

//==================================
//����ui
//==================================

//rss==============
//rss==============
//commonui.rssLinkGen=function(needAuth,fid,n){
//this.addForumViewHis(n,fid)
//}
/*
commonui.rssLinkGen = function (needAuth,fid,n){

var u = window.location.search,i = __IMG_STYLE+"/rss1.gif",r='',a='RSS',g='��ӵ�Google',star=this.addForumViewHis(n,fid)


if (star)
	star ="<a href='javascript:void(0)' onclick='commonui.lockViewHis(\""+fid+"\",false);this.firstChild.src=this.firstChild.src.replace(\"/star.gif\",\"/stargray.gif\")' title='����̳��ҳ���ٵ������Ƴ�'><img src='"+__IMG_STYLE+"/star.gif' style='vertical-align: -1px'/></a> "
else
	star ="<a href='javascript:void(0)' onclick='commonui.lockViewHis(\""+fid+"\",true);this.firstChild.src=this.firstChild.src.replace(\"/stargray.gif\",\"/star.gif\")' title='��ӵ���̳��ҳ���ٵ�����'><img src='"+__IMG_STYLE+"/stargray.gif' style='vertical-align: -1px'/></a> "


u+='&rss=1'
if (needAuth){
	u+='&ngaPassportUid='+cookieFuncs.getCookie('ngaPassportUid')+'&ngaPassportCid='+cookieFuncs.getCookie('ngaPassportCid')
	a = '(��������֤ ��rss�����˳���¼��ʧЧ)'
	g+=' '+a
	i = __IMG_STYLE+"/rssgray1.gif"
	}

put( star+" <a href='"+u+"'  title='"+a+"'><img style='vertical-align: -1px' src='"+i+"'/></a> <a href='http://fusion.google.com/add?source=atgs&feedurl="+encodeURIComponent(u)+"&rss=1' title='"+g+"'><img style='vertical-align: -1px' src='"+__IMG_STYLE+"/gadd.gif'/></a>" );
}//fe
*/

function onloadforumlist(o){
commonui.onloadforumlist(o)
}//fe
//����ѡ������==============
commonui.onloadforumlist=function(o)
{
o.onclick=null
o.disabled=true
o.name='fid';
o.options.innerHTML='';
o.options.length=0;
var x = document.createElement('option');
x.value=''
x.innerHTML='������...'
o.appendChild(x)
var load_admin=1,load_lesser=1,load_his=0
	function tmp(sub,pf,bg)
	{
	for (var k in sub)
		{
		var x = document.createElement('option');
		x.value=sub[k].fid
		x.innerHTML=pf+sub[k].name
		if (bg) x.style.backgroundColor=bg
		o.appendChild(x)
		if (sub[k].sub)
			{
			tmp(sub[k].sub,pf+'&emsp;')
			}
		}
	}
	function tmp2(n,bg)
	{
	var x = document.createElement('option');
	x.value=''
	x.innerHTML=n
	x.style.backgroundColor=bg
	o.appendChild(x)
	}
	function tmp3(){
	o.options[0].innerHTML='...';
	o.disabled=false;
	}
var h =  commonui.userCache.get('ForumViewHis');
if (h)
	{
	var hh = {}
	tmp2('������ʹ��İ���','#aaa')
	for (var k in h)
		hh[k] = {'fid':h[k][0],'name':h[k][1]}
	tmp(hh,'','#ddd')
	}
if (load_admin && load_lesser)tmp3()
load_his=1
/*
if (__GP['lesser'])
	{
	httpDataGetter.script_muti_get("/nuke.php?func=loadforumselect",
		function(r){
		if (!r)
			{
			return false;
			}
		else
			{
			r = r.data;
			if (r)
				{
				tmp2('ȫ��','#aaa')
				for (var k in r)
					{
					if (r[k]['fup'] && r[r[k]['fup']])
						{
							if (!r[r[k]['fup']].sub)r[r[k]['fup']].sub={}
							if (!r[r[k]['fup']].sub[k])r[r[k]['fup']].sub[k] = r[k];
							delete r[k];
						}
					}
				tmp(r,'','')
				}
			if (load_admin && load_his)tmp3()
			load_lesser=1
			return true
			}
		},
		function(){
			if (load_admin && load_his)tmp3()
			load_lesser=1
		},
		'gbk'
		);
	}
else
	load_lesser=1

httpDataGetter.script_muti_get("/nuke.php?func=loadforumselectbyadimin",
	function(r){
	if (!r)
		{
		return false;
		}
	else
		{
		r = r.data;
		if (r)
			{
			tmp2('�ҹ���İ���','#aaa')
			for (var k in r)
				{
				if (r[k]['fup'] && r[r[k]['fup']])
					{
						if (!r[r[k]['fup']].sub)r[r[k]['fup']].sub={}
						if (!r[r[k]['fup']].sub[k])r[r[k]['fup']].sub[k] = r[k];
						delete r[k];
					}
				}
			tmp(r,'','#eee')
			}
		if (load_lesser && load_his)tmp3()
		load_admin=1
		return true
		}
	},
	function(){
		if (load_lesser && load_his)tmp3()
		load_admin=1
	},
	'gbk'
	);
	*/
}//fe

//PM��������==============
commonui.loadPmIconSub=function (o,r,iconnew,iconno,iconuser){
if (r.data.total>0){
	if((r.data.message>0 || r.data.announcement>0) && iconuser)
		o.src=iconuser
	else
		o.src=iconnew
	o.title='��������Ϣ ��Ϣ:'+r.data.message+' ϵͳ:'+r.data.system+' ����:'+r.data.announcement
	}
else{
	o.src=iconno
	o.title='����Ϣ'
	}
}//fe
commonui.loadPmIcon=function(o,iconnew,iconno,uid,iconuser){
o.onload=function(){}
var r = commonui.userCache.get('pmStatCache')
if (r)
	return this.loadPmIconSub(o,r,iconnew,iconno,iconuser)
httpDataGetter.script_muti_get("http://interface.i.178.com/?_app=sms&_controller=index&_action=check_new&rtype=2&uid="+uid+"&"+Math.floor(date.getTime()/100000),
	function(r){
	if (!r || !r.result)
		return false;
	else{
		commonui.userCache.set('pmStatCache',r,180)
		commonui.loadPmIconSub(o,r,iconnew,iconno,iconuser)
		}
	return true
	},
	function(){
	o.src=''
	o.title=o.alt='get error'
	},
	'gbk',
	'___json___'
	)
}//fe

//ͶƱ��ʾ==================
commonui.vote = function(o,tid,x){
if(!x)
	return this.voteOld(o,tid)
var sum = 0,vsum=0,usum=0,w=window,__NUKE=w.__NUKE,id='vote'+Math.random(),type='radio'

x = __NUKE.scDe(x);
x.type = __NUKE.toInt(x.type)
x.max_select = __NUKE.toInt(x.max_select)
x.min = __NUKE.toInt(x.min)
x.max = __NUKE.toInt(x.max)
x.end = __NUKE.toInt(x.end)
if(x.done)
	x.done = ','+x.done.toString()+','
if(x.max_select>1)
	type='checkbox'

for (var k in x){
	if(!parseInt(k,10))
		continue;
	var y = x['_'+k].split(',')
	x[k]=[x[k],parseInt(y[0],10),parseInt(y[1],10)]
	usum = parseInt(y[2],10)
	sum += x[k][1]
	if(y[1])
		vsum+=x[k][2]
	}

var name = x.type==1?'Ͷע':'ͶƱ', atv=!x.end || w.__NOW<=x.end, txt="<table id='"+id+"'><tbody>", info = "", btn='', i=0

for (var k in x){
	if(!parseInt(k,10))
		continue;
	i++
	txt += "<tr><td>"+x[k][0]+"</td>";
	if(atv && w.__CURRENT_UID){
		if(x.type==1)
			txt += "<td><input name='"+k+"' value='' title='��Ͷע�������ڴ�����Ͷע����' style='width:2em'/></td>"
		else
			txt += "<td><input type='"+type+"' name='vote"+tid+"' value='"+k+"'/></td>"
		}
	if(!atv && w.__GP.admincheck && x.type==1 && !x.done){
		txt += "<td><input type='"+type+"' name='vote"+tid+"' value='"+k+"'/></td>"
		}
	if(x.done){
		if(x.done.indexOf(','+k+',')!=-1)
			txt += "<td><b class='red'>ʤ��</b></td>"
		else
			txt += "<td></td>"
		}
	txt += "<td><b>"+x[k][1]+"��</b></td>"
	txt += "<td style='width:10em'><div style='background:#790000;height:1em;width:"+((sum)? x[k][1]/sum*100 : 0)+"%'></div></td>";
	if(x.type==1){
		txt += "<td><b>Ͷע"+x[k][2]+"</b></td>"
		txt += "<td style='width:10em'><div style='background:#790000;height:1em;width:"+((vsum)? x[k][2]/vsum*100 : 0)+"%'></div></td>";
		}
	txt+='</tr>'
	}

txt += "</tbody></table> "

if(x.type==1)
	info += "Ͷע<a href='javascript:void(0)' class='b' onclick='alert(\"10000ͭ��=100����=1���\")'>ͭ��</a> ����"+x.min+" ���"+x.max+" ���Ͷע"+x.max_select+"��"
else
	info += "���ѡ��"+x.max_select+"��"

if(usum)
	info += " ����"+usum+"��";

info += " ����"+sum+(x.type==1?"��Ͷע":"Ʊ");

if(x.type==1)
	info += " ����Ͷע"+vsum+"ͭ��";

if(x.end)
	info+=" ����ʱ�� "+this.time2date(x.end,'Y-m-d H:i')

if (atv && w.__CURRENT_UID)
	btn += "<br/><button type='button' onclick='commonui.vote.submit(this.parentNode.parentNode,"+tid+","+x.type+","+x.max_select+","+x.min+","+x.max+","+x.end+")'>"+name+"</button> "

if(!atv && w.__GP.admincheck && x.type==1 && !x.done)
	btn += "<br/><button type='button' onclick='commonui.vote.submitSettle(this.parentNode.parentNode,"+tid+")'>����</button> (��ѡ�ж�Ϊ\"Ӯ\"��ѡ��)"

o.innerHTML = "<div><h4 class='silver'>"+name+"</h4>"+(i>16 ? '<div>'+info+'</div>' : '')+txt+'<div>'+info+btn+'</div></div>'


}//fe

commonui.vote.submitSettle = function (o,tid){
if(!confirm("��ȷ��ѡ����ô"))
	return
var x = o.getElementsByTagName("input"),y=[]
for (var i = 0;i<x.length;i++){
	if(x[i].checked){
		y.push(x[i].value)
		}
	}
if (y.length)
	__NUKE.doRequest({u:__API.voteSettle(tid,y.join(',')),
		f:function(x){
			if (!__NUKE.doRequestIfData(x))
				return false;
			if(x.error)
				alert(x.error[0])
			else
				alert(x.data[0])
			return true
			}
		})
}//fe

commonui.vote.submit = function (o,tid,type,max_select,min,max,end){
var x = o.getElementsByTagName("input"),y=[],c=0
for (var i = 0;i<x.length;i++){
	if(type==1){
		if(x[i].value){
			c++
			if(c>max_select)
				return alert('����Ͷע����'+max_select+'��')
			var z =  __NUKE.toInt(x[i].value)
			if(z<min)
				return alert('������Сֵ')
			if(z>max)
				return alert('�������ֵ')
			y.push(x[i].name)
			y.push(x[i].value)
			}
		}
	else{
		if (x[i].checked){
			c++
			if(c>max_select)
				return alert('����Ͷע����'+max_select+'��')
			y.push(x[i].value)
			}
		}

	}
if (y.length)
	__NUKE.doRequest({u:__API.vote(tid,y.join(',')),
		f:function(x){
			if (!__NUKE.doRequestIfData(x))
				return false;
			if(x.error)
				alert(x.error[0])
			else
				alert(x.data[0])
			return true
			}
		})
}//fe
/*
commonui.voteOld = function(o,tid){
httpDataGetter.script_muti_get("/nuke.php?func=vote2&tid="+tid+"&"+Math.floor(date.getTime()/100),
	function(r){
	if (!r || !r.data)
		return false;
	var sum = 0,id='vote'+Math.random(),max=1,type='radio',txt="<table id='"+id+"'><tbody>"
	if (r.data.max_select){
		max = r.data.max_select
		delete r.data.max_select
		if(max>1)type='checkbox'
		}
	for (var k in r.data)
		sum+=r.data[k].count
	for (var k in r.data){
		txt += "<tr><td>"+r.data[k].info+"</td>";
		if ( r.checksum )
			{
			txt += "<td><input type='"+type+"' name='vote"+tid+"' value='"+k+"' onclick='commonui.voteOld.check(this,"+max+")'/></td>";
			}
		txt += "<td><b>"+r.data[k].count+"Ʊ</b><td style='width:200px'><div style='background:#790000;height:10px;width:"+((sum)? r.data[k].count/sum*100 : 0)+"%'></div></td></tr>";
		}
	if (r.checksum)
		txt += "<tr><td colspan=3><button type='button' onclick='commonui.voteOld.submit(this,"+tid+",\""+r.checksum+"\")'>ͶƱ</button><td></tr>"
	txt += "</tbody></table>"
	o.innerHTML = txt
	return true
	},
	function(){
	o.innerHTML='get error'
	},
	'gbk'
	)
}//fe

commonui.voteOld.check = function (o,max){
var x = o.parentNode.parentNode.parentNode.getElementsByTagName("input"),j=0;
for (var i = 0;i<x.length;i++){
	if (x[i].type=='checkbox' && x[i].checked){
		j++
		if(j>max){
			o.checked=false
			window.alert('�㲻��ѡ�񳬹�'+max+'��')
			return false
			}
		}
	}
}//fe

commonui.voteOld.submit = function (o,tid,checksum){
var x = o.parentNode.parentNode.parentNode.getElementsByTagName("input"),y=[]
for (var i = 0;i<x.length;i++){
	if (x[i].checked){
		y.push(x[i].value)
		}
	}
if (y.length)
	__NUKE.doRequest({
		u:{u:'/nuke.php',a:{func:'vote2',tid:tid,voteid:y.join(',')}},
		t:'_blank'
		})
}//fe

*/


//��ȡ�����б�==================
commonui.loadmostuserrecommendbyfid = function (x,fid,day,nocache){
commonui.loadtopic_js(x,Array(__CACHE_PATH+'/load_topic_cache/mostuserrecommend_'+fid+'_'+day+'.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&js=1&f=mostuserrecommend&fid='+fid+'&day='+day+'&timeout='+3600*2.1),3600*2.1);
}

commonui.loadhotbyfid = function (x,fid,nocache){
commonui.loadtopic_js(x,Array(__CACHE_PATH+'/load_topic_cache/hot_'+fid+'_.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&js=1&f=hot&fid='+fid+'&timeout='+3600*2.1),3600*2.1);
}

commonui.loadtodaydelbyfid = function (x,fid,nocache){
commonui.loadtopic_js(x,Array(__CACHE_PATH+'/load_topic_cache/todaydel_'+fid+'_.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&js=1&f=todaydel&fid='+fid+'&timeout='+3600*1.1),3600*1.1,false);
}

commonui.loadtopic_js = function (x,url,timeout,randomOrder,subjectLength)
{
if(typeof(x)=='string')x=$(x)
if (x.innerHTML!='')return
if (!subjectLength) subjectLength=21;
if (typeof(randomOrder)=='undefined') randomOrder=true;
this.loadtopic_js_v2({domObj:x,url:url,timeout:timeout,randomOrder:randomOrder,subjectLength:subjectLength,postPrePage:null,styleFunc:this.topicRender.style_2})
}

// ����x�����԰���
//domObj, �б�����
//url,ȡ���ݵĵ�ַ ������һ���ַ��� ��������url������(���httpDataGetter.script_muti_get)
//timeout,���ݳ�ʱʱ��
//randomOrder,�������
//subjectLength,���ⳤ������
//postPrePage,����ÿҳ��ʾ������
//styleFunc,��ʽ���� ��commonui.topicRender 
//onLoadFunc(domObj),���ؽ�����ִ�е�
//currentPage,��ǰҳ ��ֵ�����ӷ�ҳ����
//getPageUrlFunc(url,page)���뵱ǰ��url(�������url����) ����ָ��page��url
commonui.loadtopic_js_v2 = function (x)
{
var self=this;
if(typeof(x.url)=='string')x.url = Array(x.url)
if(!x.url[1])x.timeout=0;
x.domObj.style.visibility='hidden'
httpDataGetter.script_muti_get(
x.url,
function(data){
	if (!data)return false;
	if (x.timeout && (__NOW-data.time)>x.timeout)return false;
	var html=[],t,dk,d,nextPage;
	if (x.currentPage){
		//0 ���ûָ����÷�ҳurl�ĺ��� ��ʹ��Ĭ�ϵ�
		if (!x.getPageUrlFunc)
			x.getPageUrlFunc=function(url,newPage){
				var u,uu=[]
				if(typeof(url)=='string')u=[url]
				else u=url
				for(var i=0;i<u.length;i++){
					if(u[i].indexOf('page=')!=-1)
						uu[i]=u[i].replace(/page=([0-9]+)/,'page='+newPage)
					else
						uu[i]=url[i]+'&page='+newPage
					}
				return uu
				}//fe
		//0 --------------
		var mp = 0;
		if(!data.nextPage)mp = x.currentPage
		nextPage = self.topicRender.listPager(x.currentPage,mp,function(a){commonui.loadtopic_js_v2(a)},function (p){
			var a = __NUKE.inheritClone(x)
			a.currentPage = p
			a.url=x.getPageUrlFunc(a.url,p)
			return a
			})//calle
		}
	if (Object.prototype.toString.call(data.data) != '[object Array]'){
		d=[]
		for (var k in data.data) d.push(data.data[k])
		}
	else
		d=data.data
	if (x.randomOrder)
		d = d.sort(function(){return Math.random()-0.5});
	for (var k=0;k<d.length;k++){
		dk = d[k]
		if (!dk.tid && dk._id)dk.tid=dk._id;
		t={}
		t.i=k
		if(dk.hot)t.hot=dk.hot
		t.subject=self.topicRender.subject(dk.tid,dk.subject,x.subjectLength,dk.titlefont,dk.quote_from)
		if(typeof(dk.replies)!='undefined' && x.postPrePage) t.page=self.topicRender.pager(dk.tid,dk.replies,x.postPrePage)
		if(dk.fid){
			t.fid=dk.fid
			if(data.forumName)
				t.forum=self.topicRender.forum(dk.fid,data.forumName[dk.fid])
			else if(__SUBSCRIPTIONS)
				t.forum=self.topicRender.forum(dk.fid,__SUBSCRIPTIONS[dk.fid])
			}
		if(dk.authorid && dk.author) t.author=self.topicRender.author(dk.authorid,dk.author)
		if(dk.lastposter) t.replier=self.topicRender.author(null,dk.lastposter)
		if(dk.postdate) t.ptime=dk.postdate
		if(dk.lastpost) t.rtime=dk.lastpost
		html.push(x.styleFunc(t));
		}
	x.domObj.innerHTML='<ul>'+html.join('')+'</ul>';
	if(nextPage){
		x.domObj.appendChild(nextPage)
		x.domObj.insertBefore(nextPage.cloneNode(true),x.domObj.firstChild)
		}
	if(x.onLoadFunc)
		x.onLoadFunc(x.domObj)
	x.domObj.style.visibility='visible'
	return true;
	},
function(){
	x.domObj.innerHTML='��ȡ����';
	},
	{'charset':'gbk','noCache':true}
);

}




commonui.topicRender = {

style_1:function (t){
if (t.i&1==1)t.i='b2'
else t.i='b1'
var x= ''
if(__SUBSCRIPTIONS_COLOR && t.fid)x=" style='border-color:"+__SUBSCRIPTIONS_COLOR['_'+t.fid]+"'"
t.ptime = commonui.topicRender.date(t.ptime ,'m-d H:i')
t.rtime = commonui.topicRender.date(t.rtime ,'m-d H:i',1)
return "\
<li class='"+t.i+"'"+x+">\
<span class='right' title='���ظ�'>"+t.replier+" "+t.rtime+"</span>\
"+t.subject+" "+t.page+"\
<span class='subinfo block'>\
<span class='right' title='����ʱ��'>"+t.author+" "+t.ptime+"</span>\
"+t.forum+"\
</span>\
</li>";
},//fe

style_2:function (t){
if (t.i&1==1)t.i='b2'
else t.i='b1'
t.ptime = commonui.topicRender.date(t.ptime)
return "<li class='"+t.i+"'><span class='subinfo'>"+t.hot+" "+t.ptime+"</span>"+t.subject+"</li>"
},//fe

date:function (time,format,_2dis,cls){
if(!format)format='y-m-d H:i'
if(!cls)cls='date'
if(_2dis)
	return "<span class='"+cls+"'>"+commonui.time2dis(time,format)+"</span>"
else
	return "<span class='"+cls+"'>"+commonui.time2date(time,format)+"</span>"
},//fe

listPager:function(currentPage,maxPage,handler,getHandlerArgFunc){
if (maxPage){
	if (maxPage<=1) return _$('<span/>')._.cls('page_nav');
	uncertain=''
	}
else
	{
	maxPage = currentPage+1
	uncertain ='�����д�ҳ';
	}
var tmp = function(p,t,d,c){
	return _$('<a>'+t+'</a>')._.cls(c)._.attr('title',d)._.attr('href','javascript:void(0)')._.sV('pagerHandler',{handler:handler,arg:getHandlerArgFunc(p)})._.on('click',function (){
	var h = this._.gV('pagerHandler')
	h.handler(h.arg)
	})
	}

var pager = _$('<span/>')._.cls('page_nav');

pager._.aC(tmp(1,'&lt;&lt;','��һҳ','ls-4 first'))
if((currentPage-1)>0)pager._.aC(tmp(currentPage-1,'&lt;','��һҳ('+(currentPage-1)+')','prev'))
var j=0;
for(var i=currentPage-3;i<=currentPage-1;i++){
	if(i<1) continue;
	pager._.aC(tmp(i,i,'','pl'))
	}
pager._.aC(tmp(currentPage,currentPage,'','b current'))
if(currentPage<maxPage){
	for(var i=currentPage+1;i<=maxPage;i++){
		if (uncertain && i==maxPage)
			pager._.aC(tmp(i,i,uncertain,'pr'))
		else
			pager._.aC(tmp(i,i,'','pr'))
		j++;
		if(j==4) break;
		}
	i--;
	if (uncertain){
		pager._.aC(tmp(i,'&gt;',uncertain+'('+i+')','next'))
		pager._.aC(tmp(i,'','','end'))
		}
		else{
		pager._.aC(tmp(i,'&gt;','��һҳ('+i+')','next'))
		pager._.aC(tmp(i,'&gt;&gt;','���ҳ('+maxPage+')','last ls-4'))
		}

	}
pager._.aC( _$('<button>ˢ��</button>')._.attr('type','button')._.sV('pagerHandler',{handler:handler,arg:getHandlerArgFunc(currentPage)})._.on('click',function (){
	var h = this._.gV('pagerHandler')
	h.handler(h.arg)
	}) )
return pager
},

pager:function (tid,p,postPrePage,blank,cls){
if (p < postPrePage)return '';
var page='';
if(!cls)cls='gray'
blank= blank ? ' target="_blank"' : ''
if ((p+1)%postPrePage==0)
	var maxp=(p+1)/postPrePage;
else
	var maxp=Math.floor((p+1)/postPrePage)+1;
page+=" <span class='pager'>[ ";
for (var j=1; j<=maxp; j++)
	{
	if (j==6)
		{
		page+=" ... <a class="+cls+" href='/read.php?tid="+tid+"&page="+maxp+"'"+blank+">"+maxp+"</a>";
		break;
		}
	page+=" <a style='color:gray' href='/read.php?tid="+tid+"&page="+j+"'"+blank+">"+j+"</a>";
	}
page+=' ]</span>';
return page
},//fe

subject:function (tid,subject,lengthMax,titlefont,quoteFrom,blank,cls){
if(!cls)cls='topic'
blank= blank ? ' target="_blank"' : ''
var til=''
if(lengthMax && subject.length>lengthMax){
	til=' title="'+subject+'" '
	subject = subject.substr(0,lengthMax)+'...';
	}
if(titlefont){
	titlefont=titlefont.split("~");
	if(titlefont[0])subject="<span class='"+titlefont[0]+"'>"+subject+"</span>";
	if(titlefont[1])subject="<b>"+subject+"</b>";
	if(titlefont[2])subject="<i>"+subject+"</i>";
	if(titlefont[3])subject="<u>"+subject+"</u>";
	}
else if (quoteFrom)
	subject="<b>"+subject+"</b>";
return "<a class='"+cls+"' href='/read.php?tid="+tid+"'"+blank+til+" onclick='commonui.tempcountlog(1)'>"+subject+"</a>"
},//fe

author:function (uid,name,blank,cls){
if(!cls)cls='author'
if(uid)
	return "<a href='/nuke.php?func=ucp&uid="+uid+"' class='"+cls+"'"+blank+">"+name+"</a>"
else
	return "<span class='"+cls+"'>"+name+"</span>"
},//fe

forum:function (fid,name,blank,cls){
if(!cls)cls='forum'
blank= blank ? ' target="_blank"' : ''
return "<a href='/thread.php?fid="+fid+"' class='"+cls+"'"+blank+">[ "+name+" ]</a>"
}//fe
}//ce

//��̳��Ϣ==================
commonui.getBoardInfo = function (o,totalinbbs,userinbbs,unvalidateuser,guestinbbs){
httpDataGetter.script_muti_get(
'/nuke.php?func=custom_index&f=info',
function(data){
	if (!data)return false;
	o.innerHTML = "<table style='width:100%' cellpadding='0px' cellspacing='0px'><tr>\
	<td style='text-align:left;vertical-align:bottom;'>\
		<div class='nav'><strong>"+data['notice']+"</strong></div>\
	</td>\
	<td style='text-align:right;line-height:18px'>\
		�� <span class='numeric'>"+totalinbbs+"</span> ������,<span class='numeric'>"+userinbbs+" <span title='δ��֤'>("+unvalidateuser+")</span></span> λ��Ա,<span class='numeric'>"+guestinbbs+"</span> λ�ÿ�<br/>\
		��� <span class='numeric'>"+data['higholnum']+"</span> �� <span class='numeric'>("+time2date(data['higholtime'])+")</span><br/>\
		�� <span class='numeric'>"+data['threads']+"</span> ƪ����,<span class='numeric'>"+data['posts']+"</span>  ƪ����,<span class='numeric'>"+data['members']+"</span>  λ��Ա<br/>\
		<a href='thread.php?authorid="+__CURRENT_UID+"&date=all'>�ҵ�����</a> �� <a href='thread.php?recommend=1&date=all'>������</a> �� <a href='/thread.php?favor=1'>�ҵ��ղ�</a> �� ��ӭ�»�Ա <a href='profile.php?uid="+data['newmember']['uid']+"' class='green'>"+data['newmember']['username']+"</a>\
	</td>\
</tr></table>";
	return true;
	},
function(){
	o.innerHTML='��ȡ����';
	},
'gbk'
);
}//fe





//���Ӳ�����ť==================
commonui.buttonBase={
parent:commonui,

replaceUrl:function (u){
var e = encodeURIComponent;
return u.replace('_TOPIC',e(document.title)).replace('_URL',e(document.location.href)).replace(/_BBSURL/g,e(window.__BBSURL))
},

genU:function(a,u){
return u ? " href='"+u.replace(/\{(.+?)\}/g,function($0,$1){return a[$1]})+"' " : " href='javascript:void(0)' "
},//fe

genT:function(a,t){
return t ? " title='"+t+"' " : ' '
},//fe

genC:function(btn,c){
return btn ? " class='cell rep txtbtnx "+(c?c:'silver')+"' " : " class='b "+(c?c:'silver')+"' "
},

genA:function(a,id,nohis){
var d = this.d[id],tag='a',self=this
if(!d || (d.ck && !d.ck(a)) || (btn && !d.n1))return null
if(!d.on)d.on=function(){}
if(d.tag)tag=d.tag
var btn=_$("<"+tag+" "+this.genU(a,d.u)+this.genC(btn,d.c)+this.genT(a,d.n2)+"><nobr>"+(nohis ?  d.n1 : (d.n3 ? d.n3 : d.n1))+"</nobr></"+tag+">")
if(typeof d.on == 'function')
	btn._.on('click',function(e){d.on(e,a,this)})
else{
	for(var k in d.on)
		btn._.on(k,function(e){d.on[e.type](e,a,this)})
	}
if(!nohis)
	btn._.on('click',function(e){self.saveHis(id)})
if(d.target)btn.target=d.target
return btn
},

genB:function(argid){

var i=0,l=this.def,xx=null,b=_$("/div").$0('style',{position:'absolute'},'className','c2 postbtnsc'),max= __SETTING.bit & 8 ? 5 : 8,o = this.parent.stdBtns(),self=this
if(!this.his){
	this.his = this.parent.userCache.get(this.saveKey);
	if(!this.his)this.his=[]
	}
while(1){
	for (var k=0;k<l.length;k++){
		if(i++>=max)break
		if(xx=this.genA(this.argCache[argid],l[k],1))
			o._.__add(xx)
		}
	if(l==this.his)break
	l=this.his
	}
o._.__add(
	_$('/a').$0(
		'innerHTML','����',
		'href','javascript:void(0)',
		'className','uitxt1',
		'onclick',function(e){self.allBtn(e,argid)}
		)
	)

b._.add(o)
return b
},//fe

allBtn:function(e,arg,nohis){
var w=window,$=w._$,c = w.commonui,z=null,x= $('/span').$0('className','ltxt'),y=this.all,self=this,s = ' '+w.location.protocol+'//'+w.location.host

if(typeof(arg)!='object')
	arg = this.argCache[arg]

c.createadminwindow()
c.adminwindow._.addContent(null)

for (var k in y){
	var u=$('/span')
	for (var kk=0;kk<y[k].length;kk++){
		var z=this.genA(arg,y[k][kk],nohis)
		if(z)
			u._.add(' ',z)
		}
	if(u.childNodes.length)
		x.$0($('/h4').$0('className',"textTitle",'innerHTML',k),u)
	}


if(arg.tid)
	x._.add(
		$('/h4').$0('className',"textTitle",'innerHTML','�����ַ'),
		$('/span').$0('className',"xtxt",'innerHTML',s+'/read.php?tid=<span class=red>'+arg.tid+'</span> ')
		)

if (arg.pid!='tpc' && arg.pid>0){
	x._.add(
		$('/h4').$0('className',"textTitle",'innerHTML','�˻ظ���ַ'),
		$('/span').$0('className',"xtxt",'innerHTML',s+'/read.php?pid=<span class=blue>'+arg.pid+'</span> '),
		$('/h4').$0('className',"textTitle",'innerHTML','��λ�õ�ַ'),
		$('/span').$0('className',"xtxt",'innerHTML',s+c.genPidLink(arg.pid,arg.i)+' ')
		)
	}

if((arg.tid || arg.pid) && c.QRCode && w.__UA && (w.__UA[2]==1 || w.__UA[2]==3) && !(w.__UA[0]==1 && w.__UA[1]<8)){
	x._.add(
		$('/br'),
		$('/img').$0('src','about:blank', 
			'style',{display:'none'}, 
			'alt',w.location.protocol+'//'+w.location.hostname+'/?j='+
				(arg.tid ? 't'+arg.tid : '')+(arg.pid!='tpc' && arg.pid>0 ? 'p'+arg.pid : '')/*+(w.__CURRENT_UID ? 'h'+w.__CURRENT_UID : '')*/, 
			'onerror', function(){
				c.QRCode.loadDataUrl(this,this.alt,function(){this.style.display=''})
				}
			)
		)
	}

x._.aC( $('/br') , $('/br') , _$("<button type='button' onclick='commonui.hideAdminWindow()'>�ر�</button>") , _$("<button/>")._.attr({type:'button',innerHTML:'�����ʷ��¼'})._.on('click',function(){self.clearHis()}) )

c.adminwindow._.css('width','350px')._.addContent(x)

tTip.showdscp(e,c.adminwindow);
},//fe

saveHis:function(id){
if(!this.d[id] || !this.d[id].n1 || !this.his)return
for (var k=0;k<this.def.length;k++){
	if(this.def[k]==id)return
	}
var x=[],i=0
x.push(id)
for (var k=0;k<this.his.length;k++){
	if(this.d[this.his[k]] && this.d[this.his[k]].n1 && this.his[k]!=id){
		x.push(this.his[k])
		if(i++>=8)break
		}
	}
this.his=x
commonui.userCache.set(this.saveKey,this.his,86400*30);
for (var k in this.btnCache)
	this.btnCache[k]=null
},//fe

clearHis:function(){
commonui.userCache.del(this.saveKey)
this.his=[]
for (var k in this.btnCache)
	this.btnCache[k]=null
}//fe


}//ce

//==================================
//QR������
//==================================
commonui.QRCode = {
QR:null,
query:[],
loadDataUrl:function(imgo,str,f){//img obj / qr string / callback
if(!str)
	return
if(!this.QR){
	this.query.push([imgo,str])
	if(this.QR!==0){
		this.QR=0
		var self = this
		loader.script(__COMMONRES_PATH+'/js_qrcode.min.js',
			function(){
				for(var i=0;i<self.query.length;i++){
					self.query[i][0].src = self.QR.generatePNG(self.query[i][1],{ecclevel:'L'})
					if(f)f.call(self.query[i][0])
					}
				}
			);
		}
	return
	}
imgo.src = this.QR.generatePNG(imgo.alt,{ecclevel:'L'})
if(f)f.call(imgo)
}//fe
}//ce

//==================================
//���湦�ܰ�ť�б�
//==================================
commonui.forumBtns ={
parent:commonui,

d:{
1:{n1:'<span style="font-size:1.23em">������</span>',u:__API.digest('{fid}'),
	ck:function(a){if(a.fid)return 1} },

2:{n1:'<span style="font-size:1.23em">�ղذ���</span>',
	on:function(e,a){commonui.unionforumSubscribe(a.fid,0,1)},
	ck:function(a){if(a.fid && __GP.rvrc>=20)return 1} },

3:{n1:'Ȩ��/����',u:__API.viewFPg('{fid}')},

4:{n1:'�û�����',
	on:function(e,a){commonui.setUserRepu(e,a.fid)},
	ck:function(a){if(!a.stid && a.fid<0 && a.admin)return 1} },

5:{n1:'���湦��',on:function(e,a){commonui.forumBtn(e,a.fid)},
	ck:function(a){if(!a.stid && a.fid<0 && a.admin)return 1} },

6:{n1:'<span style="font-size:1.23em">��������</span>',c:'disable_tap_menu uitxt1',
	on:{
		mousedown:function(e,a,o){
			postfunc.btnStatOn(o)
			},
		click:function(e,a,o){
			var stat = postfunc.btnStatOff(o) || o.__t3,sfid = commonui.selectForum.getCurrent(a.fid),stid = a.stid ? a.stid : (window.__CURRENT_STID ?  window.__CURRENT_STID  : null)
			if(!sfid){
				commonui.selectForum.selectWindow(e,a.fid,
					function(sf,name){
						if(stat){
							commonui.openPostWindow(e,postfunc.__NEW,sf,null,null,stid,null,name)
							return false//cancel event
							}
						return true
						}
					)
				return commonui.cancelEvent(e)
				}
			if(stat){
				commonui.openPostWindow(e,postfunc.__NEW,a.fid,null,null,stid)
				return commonui.cancelEvent(e)
				}
			},
		touchstart:function(e,a,o){
			o.__t3 = true
			}

		
		},
	u:'/post.php?fid={fid}&stid={stid}&_newui',
	ck:function(a){if(a.fid && __CURRENT_UID)return 1} },

7:{n1:'���á�',
	on:function(e,a){commonui.massAdmin.unCheckAll($('m_threads'))},
	ck:function(a){if(a.admin)return 1} },

8:{n1:'������',
	on:function(e,a){commonui.setPost(e)},
	ck:function(a){if(a.admin)return 1} },

//9:{n1:'�ƶ���',
//	on:function(e,a){adminui.movemass(e)},
//	ck:function(a){if(a.admin)return 1} },

10:{n1:'�ƶ�/ɾ�� ѡ��',
	on:function(e,a){adminui.delmass(e)},
	ck:function(a){if(a.admin&2)return 1} },

11:{n1:'���湦��',
	on:function(e,a){commonui.forumBtn(e,a.fid)},
	ck:function(a){if(a.fid && a.admin)return 1} },

12:{n1:'����ѡ��',
	on:function(e,a){commonui.massAdmin.unCheckAll($('m_threads'))},
	ck:function(a){if(a.admin)return 1} },

13:{n1:'���ղ����Ƴ�ѡ�е�����',
	on:function(e,a){commonui.favordelmass(this)},
	ck:function(a){if(__CURRENT_UID)return 1} },

14:{n1:'ȫѡ',
	title:'ȫѡֻ��ѡ��ǰ15��',
	tag:'a id="selectallbtn"',
	on:function(e,a){commonui.massAdmin.checkAll($('m_threads'))},
	ck:function(a){if(a.admin)return 1} },

15:{n1:'���ϲ���',
	on:function(e,a){
		var aa = {fid:a.fid,tid:a.stid,admin:a.admin,anyAdmin:a.anyAdmin,minorAdmin:a.minorAdmin,pid:0,greater:window.__GP.greater}
		commonui.topicBtn.allBtn(e,aa)
		},
	ck:function(a){if(a.stid && a.admin){
						if(!commonui.topicBtn)
							loader.script(__SCRIPTS.read)//no sync
						return 1
						}
				} },

16:null
},

replaceUrl:commonui.buttonBase.replaceUrl,

def1 : [1,2,6],
def2 : [3,4,15,5,6],
def3 : [14,8,10,11],
def4 : [12,13],

genU:commonui.buttonBase.genU,

genT:commonui.buttonBase.genT,

genC:commonui.buttonBase.genC,

genA:commonui.buttonBase.genA,

load:function(o,type,fid,admin){
if(window.__CURRENT_FID)fid = window.__CURRENT_FID


var arg={fid:fid,
	admin:admin? admin : window.__GP.admincheck,
	stid:(window.__CURRENT_STID?window.__CURRENT_STID:'')
	}, xx=null,l, oo = commonui.stdBtns()
if(type==3)
	l = this.def3
else if(type==4)
	l = this.def4
else{
	if(!fid)return
	var l = this.def2, x= o.parentNode
	while(x.nodeName!='BODY'){
		x = x.parentNode
		if(x.id=='m_pbtntop'){
			l = this.def1
			break;
			}
		}
	}


for (var k=0;k<l.length;k++){
	if(xx=this.genA(arg,l[k],1))
		oo._.__add(xx)
	}
o.innerHTML=''

if(!oo._.__length)
	return

o.appendChild(oo)
if(oo._.__vml)
	oo._.__vml()

}//fe


}//ce


commonui.anonyName=function(aname,html){
var t1='���ұ����켺�����ɹ��ӳ���î������δ�����纥', t2='�����������������������������ֹ��θ���֣��л������˷뺫�������������ﶭԬ����Ҷ������κ����������Ҧ¬���ӽ���̷�η���½��ʯ����Τ���񷽺��������ذ׽���Ѧ��������ʷ���պع�ë�¹�����Ǯ����������Ī�������¿�ʩ��ţ�����ϰ���������������ׯ����³������ղ��ŷ����������������ף�����з�����¼�÷ͯ��ϵ������Ϳ�����ʢ����Ƚ����·�������ܲ��ɱ��������ѷ������Ľ�Ĳ������ʱ��ũ˾׿�ż��Ѽ�����«����¦���᯾������Ѳ�����ϯ���װ����Ĺ�ȫ١Ӧ��ɹ����߱弧ʦ�ͳ������̵�ɳ���׿�ɣ��������ݰ������ܳز���Է����',i=6,n=['']
for(var j=0;j<6;j++){
	if(j==0||j==3)
		n[0]+=t1.charAt( ('0x0'+aname.substr(i+1,1))-0 )
	else if(j<6)
		n[0]+=t2.charAt( ('0x'+aname.substr(i,2))-0 )
	i+=2
	}
n[1]= aname.substr(i,6)
i+=6
n[2]=aname.substr(i,6)
if(html)
	return "<span title='����һ���������Ե��û�' anonymous='"+aname+"'><span style='color:#"+n[1]+"'>&#9787;</span><span style='color:gray'>"+n[0]+"</span><span style='color:#"+n[2]+"'>&#9787;</span></span>"
return n;
}//fe



commonui.setUserRepu = function (e,fid,uid)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$, x,y,z
this.adminwindow._.addTitle('�����û��ڱ����������');

this.adminwindow._.addContent(
		x = $('/input').$0('type','text','size','10','value',uid?uid:''),' UID���û���',
		$('/br'),
		y = $('/input').$0('type','text','size','5'),' ����ֵ(-21000~21000)',
		$('/br'),$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
				__NUKE.doRequest({
					u:__API.set_user_reputation(fid,x.value,y.value),
					b:this
					})
				}
			)

	)
this.adminwindow._.show(e)

}
//fe
/*
//���������ť
*/
commonui.forumBtn = function(e,fid){
if(!fid || !window.__GP.admincheck)return;
var w = window, __GP = w.__GP , $ = w._$, __API = w.__API

this.createadminwindow()
this.adminwindow._.addTitle('���湦��')
this.adminwindow._.addContent(null)

var x = $('/span').$0('className','ltxt b',
	__GP.admincheck && fid<0 ? $('/a').$0('href','javascript:void(0)','onclick',function(e){commonui.setUserRepu(e,fid)},'innerHTML','�û���������') : null,
	__GP.admincheck && fid<0 ? $('/a').$0('href','javascript:void(0)','onclick',function(e){adminui.modifyUserForum(null,fid)},'innerHTML','�û���������') : null,
	__GP.admin ? $('/a').$0('className','red','href','javascript:void(0)','innerHTML','�޸İ���','onclick',function(e){adminui.modifyForum(null,fid)}) : null,
	__GP.admin ? $('/a').$0('className','red','href',__API.user_forum_nuke(fid),'innerHTML','�������') : null,
	__GP.greater ? $('/a').$0('href',__API.minor_moderator(fid),'innerHTML','������') : null,
	__GP.greater ? $('/a').$0('href',__API.forum_stat(fid),'innerHTML','����ͳ��') : null,
	__GP.admincheck ? $('/a').$0('href',__API.topic_key_set(fid),'innerHTML','�������') : null,
	__GP.admincheck ? $('/a').$0('href','javascript:void(0)','innerHTML','��������','onclick',function(e){adminui.reputationLevel(e,fid)}) : null,
	__GP.admincheck ? $('/a').$0('href',__API.auto_trans_set(fid),'innerHTML','���﷭��') : null,
	__GP.admincheck ? $('/a').$0('href',__API.keyword_watch_set(fid),'innerHTML','�ؼ��ʼ���') : null,
	__GP.admincheck ? $('/a').$0('href',__API.keyword_watch(fid),'innerHTML','�ؼ��ʼ��Ӽ�¼') : null,
	__GP.admincheck ? $('/a').$0('href','javascript:void(0)','innerHTML','���û�����','onclick',function(e){adminui.setNewUserPostLimit(e,fid)}) : null,
	//__GP.admincheck ? $('/a').$0('href','javascript:void(0)','innerHTML','���汳��ͼ','onclick',function(e){adminui.setForumPic(e)}) : null,
	null
	)

var a = x.getElementsByTagName('a')
for(var i=0;i<a.length;i++){
	a[i].className+=' nobr'
	x.insertBefore(document.createTextNode(' '),a[i])
	}

this.adminwindow._.addContent(x)
tTip.showdscp(e,this.adminwindow);
}//fe



//�û�ͷ��ѡ��==================
//{t:(int)type, l:(int)length, 0:{0:(str)avatar,cX:(int)centerX,cY:(int)centerY}, 1:(str)avatar  }
commonui.selectUserPortrait = function(a,buff){
if(buff){
	if(buff[99] || buff[102] || buff[107]){
		var y = new String(__PORTRAIT_PATH+'/'+(buff[102] ? 'a_sheep_b.png' : (buff[99] ? 'a_sheep.png' : 'a_sheep_c.png')))
		y.noborder=1
		return y
		}
	if(buff[111])
		return '';
	}
if(!a)return ''
var x,i=0
if (typeof(a)=='string'){
	if(a.substr(0,8)=='/*$js$*/' || a.substr(0,1)=='{'){
		var a = 'var a='+a
		eval(a)
		}
	else if(a.indexOf('|')!=-1)
		return '';
	else{
		if(a.substr(0,7)!='http://')
			return __PORTRAIT_PATH+'/'+a
		return a
		}
	}
if(typeof(a)=='object'){
	if (a.t==1 || !a.t)
		i=Math.floor(Math.random()*a.l)
	else if (a.t==2 && window.date){
		var tmp = (date.getHours()+8)/24
		if (tmp>1)tmp = tmp-1
		i=Math.floor(tmp*a.l)
		}
	x=a[i]

	if(typeof(x)=='object'){
		var y = new String(x[0])
		y.cX = x.cX
		y.cY = x.cY
		y.id = i
		x=y
		}
	else{
		x = new String(x)
		x.id = i
		}
	if(x.substr(0,7)!='http://')
		return __PORTRAIT_PATH+'/'+x
	return x
	}
else
	return ''

}

//��̳�˵���ǰ�û�ͷ��ѡ��========
commonui.loadCurUserPortrait = function(p){
if (p){
	p = this.selectUserPortrait(p)
		if (p.substr(0,4) != 'http')
			return (__PORTRAIT_PATH+'/'+p);
		else
			return (p);
	}
else
	return (__IMG_STYLE+'/nobody.gif');
}

//�û�ͷ������Ϣ==================
commonui.loadPostPortrait = function(a){
if (window.__SETTING.bit & 64){
	commonui.loadPostPortrait=function(){return ''}
	return ''
	}
else{
	commonui.loadPostPortrait=function(a){return "<img src='"+this.selectUserPortrait(a)+"'/>";}
	}
return "<img src='"+this.selectUserPortrait(a)+"'/>";
}


commonui.tempcountlog = function(x){
loader.script( '/nuke.php?func=temp&count_log_'+(x?1:2))
}

//�����û���������=========================

commonui.ucplink = function(e,uid){
if(!uid)return
if(!this.ucplinko){
	this.ucplinko = _$('/span').$0('className','urltip2 urltip3','style',{textAlign:'left',margin:'0'})
	document.body.appendChild(this.ucplinko)
	}
this.ucplinko.innerHTML = "<nobr><a href='http://i.178.com/?_app=index&_controller=index&_action=index&uid="+uid+"'>[178�û�����]</a> <a href='/nuke.php?func=ucp&uid="+uid+"'>[��̳����]</a> <a target='_blank' href='http://t.178.com/"+uid+"'>[t.178.com]</a></nobr>"
tTip.showdscp(e,this.ucplinko);
}

;(function(){
var x 
commonui.activeInfo = function(a,uid){
if( x===undefined )
	x =   (uid && uid == window.__CURRENT_UID ? 1 : 0) | 
			  (window.__GP && __GP.lesser ? 2 : 0) | 
			  (window.__GP && (__GP.userBit & 3096) ? 4 : 0)

var y
if(a==1)
	y = ['green','ACTIVED','�Ѽ���','','��ʹ�ü����뼤��']
else if(a==0)
	y = ['orange','UNACTIVED','δ����','�˺�δ����','��������û����İ��ֻ����� ���������û�/��������ʹ�ü����뼤��']
else if(a==4)
	y = ['seagreen','ACTIVED','�Ѽ���','','�Ѱ��ֻ�����']
else if(a==5)
	y = ['teal','ACTIVED','�Ѽ���','','�Ѱ�΢�ż���']
else if(a==-1)
	y = ['darkred','NUKED','NUKED','��Υ������������','����ʹ�ü�������']
else if(a==-5)
	y = ['gray','LOCKED','����','��Υ��ע��򷢲�Υ����������������','���ܽ���']
else if(a==-4)
	y = ['sienna','LOCKED','����','���˺Ű�ȫ���ⱻ����','�޸��������','https://account.178.com/?p=renew_pass']
else if(a==-3)
	y = ['deeppink','LOCKED','����','���˺Ű�ȫ���ⱻ����','ʹ�����������������','https://account.178.com/?p=reset_pass']
else if(a==-2)
	y = ['darkred','LOCKED','����','���˺ű����򷢲�Υ��������������','ֻ���˹����� ���İ��������˵��']
else if(a<0)
	y = ['gray','LOCKED','����','unknow','']
else if(a>0)
	y = ['gray','ACTIVED','�Ѽ���','unknow','']

if(x==0)
	y[4]=''
if((x&1)==0)
	y[5]=''

return y
}//fe
})();
/*
 * �û�����������tooltip
 * @param �û������ӵ�node(tip node���ڴ�node֮ǰ
 * @param �û�id
 * @param �Ƿ����i178��Ϣ
 */
/*
commonui.usernamelink = function(o,uid,loadi){
if(!o)return
if(window.__GP && __GP['admincheck']){
	var x = this.colorChar(o.innerHTML)
	if(x!=o.innerHTML){
		o.style.display='none'
		o.parentNode.appendChild(_$('<b>'+x+'</b>'))
		}
	}
o=o.parentNode
var w=window, y = document.createElement('span')
y.className='urltip2 urltip3'
y.style.textAlign='left'
y.innerHTML += "<nobr><a href='http://i.178.com/?_app=index&_controller=index&_action=index&uid="+uid+"'>[178�û�����]</a> <a href='/nuke.php?func=ucp&uid="+uid+"'>[��̳����]</a> <a target='_blank' href='http://t.178.com/"+uid+"' onclick='commonui.tempcountlog()'>[t.178.com]</a></nobr>"
o.parentNode.insertBefore(y,o)
if(!loadi)y._loadedt178info=true
_$(o)._.on('mouseover',function(){

	y._t178infotimeout = w.setTimeout(function(){
		y.style.display='block'
		y.style.marginTop='-'+y.offsetHeight+'px'
		if (!y._loadedt178info){
			if(typeof(y._loadedt178info)=='object')
				commonui.usernameLinkSub(y._loadedt178info,uid,y)
			else{
				y._loadedt178info=true
				httpDataGetter.script_muti_get("http://t.178.com/api/nga/get_nga_card?user_id="+uid,
					function(r){
						if(!r || !r.nickname)
							return
						y._loadedt178info = r
						commonui.usernameLinkSub(r,uid,y)
						},
					function(){}
					)
				}
			}
		},600)

	})
_$(o.parentNode)._.on('mouseout',function(e){
	if(w.__NUKE.ifMouseLeave(e,this)){
		if(y._t178infotimeout)
			w.clearTimeout(y._t178infotimeout)
		y.style.display='none'
		}
	})
if(w.__SETTING.bit & 4096)
	this.doubleclick.init(o)
}//fe


commonui.usernameLinkSub=function(r,uid,y){

if(!r.avatar)
	r.avatar = 'http://pic1.178.com/avatars/00/8e/5b/50_9329482.jpg'
else
	r.avatar=r.avatar.replace(/\/\d+_/,'/50_')
var b=''
if(r.buffs && r.buffs.length){
	var x = r.buffs.length>6 ? 6 :r.buffs.length
	for (var i=0; i<x; i++)
		b+="<img src='"+r.buffs[i].url+"' title='"+r.buffs[i].name+':'+r.buffs[i].caption+"' style='width:20px'/> "
	}
y.innerHTML = "<img src='"+r.avatar+"' style='height:35px;border-width:1px;border-style:solid;margin:0px 3px 0px 0px;float:left'/><nobr><a href='http://t.178.com/"+uid+"' class='author' target='_blank'><b>"+r.nickname+"</b></a>"
+(parseInt(r.vip_type,10) ? "<sup class='silver vip"+r.vip_type+"' style='line-height:0.5em'>v</sup>" :'')
+((r.tweet_count || r.fans_count) ? " <span title='����������Ϣ/��ע��������' class='silver'>("+r.tweet_count+"/"+r.fans_count+")</span>" :"")
+(r.fan_url ? " <a href='"+r.fan_url+"' target='_blank title='��ע��' class='blue'>β��</a>" : '')
+"</nobr>"
+(b ? '<br/><nobr>'+b+'</nobr>': '')
+"<div style='margin-bottom:3px;height:5px;line-height:0px;border-bottom:1px solid #F7E1A1;clear:both'></div>"
+y.innerHTML

y.style.marginTop='-'+y.offsetHeight+'px'

}//fe
*/
/*
 * �ı������ַ��ı���ɫ
 * @param y �ַ���
 */
commonui.colorChar = function (y){
z=''
for (var i=0; i<y.length; i++){
	var u=y.substr(i,1),x = y.charCodeAt(i)
	if(x>=0x00 && x<=0x7f)z+=u
	else if(x>=0x3400 && x<=0x4DB5)z+=u
	else if(x>=0x4E00 && x<=0x9FA5)z+=u
	else if(x>=0x9FA6 && x<=0x9FBB)z+=u
	else if(x>=0xF900 && x<=0xFA2D)z+=u
	else if(x>=0xFA30 && x<=0xFAD9)z+=u
	else if(x>=0xFA70 && x<=0xFAD9)z+=u
	else z+='<span style="color:limegreen;background:#fcc">'+u+'</span>';
	}
return z
}

//����==================
/**
 *@param ��ӻ�ȥ���İ���id
 *@param ������id
 *@param type ==1 add, ==2 del 
 */
commonui.unionforumSubscribe = function (o,ufid,type){
//if (!__CURRENT_UID)
//	return window.alert('�����¼')
if(typeof(o)=='string')
	o=o.replace(ufid,'').replace(/(^),|,($)|(,),+/,'$1$2$3')
if (!o && type)
	return window.alert('����ѡ��һ��')

if (!__CURRENT_UID){
	if (!window.__UNION_FORUM)
		return window.alert('��������')
	var s = cookieFuncs.getCookie('unionForumSelect');
	if(s)s=__NUKE.scDe(s)
	else s={}
	if (!s[ufid])
		s[ufid] = window.__UNION_FORUM_DEFAULT.split(',')
	else
		s[ufid] = s[ufid].split(',')

	if (type==1)
		s[ufid]=s[ufid].concat(o.split(','))
	else if (type==2){
		var x= new RegExp(o.replace(',','|'),'g')
		s[ufid] = s[ufid].join(',').replace(x,'').split(',')
		}
	else
		s[ufid]=o.split(',')

	s[ufid]=s[ufid].sort().join(',').replace(/(^),|,($)|(,),+/,'$1$2$3')

	if(s[ufid]!= window.__UNION_FORUM_DEFAULT.split(',').sort().join(',').replace(/(^),|,($)|(,),+/,'$1$2$3'))
		cookieFuncs.setCookieInSecond('unionForumSelect',__NUKE.scEn(s),3600*24*7);
	else
		cookieFuncs.setMiscCookieInSecond('unionForumSelect',null,0);
	return window.alert('�����ɹ���ˢ��ҳ�����ʾѡ�а��������')
	}

__NUKE.doRequest({u:__API.forumSubscription(ufid,o,type)})
}//fe


commonui.unionforum_subscribe = function (o,ufid,s){//�ɽӿڼ���
if(typeof(o)=='number')
	commonui.unionforumSubscribe(o,ufid,1)
else if(s){
	var i = o.getElementsByTagName('select')[0]
	if(i && i.options[i.selectedIndex].value)
		commonui.unionforumSubscribe(i.options[i.selectedIndex].value,ufid,1)
	else
		return
	}
else{
	var x = '';
	var i = o.getElementsByTagName('input')
	for (var k in i){
		if (i[k].checked && i[k].value)
			x+=','+i[k].value
		}
	commonui.unionforumSubscribe(x.substr(1),ufid)
	}
}//fe

//178ֱ��==================
commonui.loadLiveIframe = function(tid){
put("<iframe src='http://zhibo.178.com/comment/?tid="+tid+"&parent="+location.hostname+"' style='border:none;width:100%;overflow:hidden' scrolling='no' id='live_iframe' name='live_iframe' class='live_iframe'></iframe>")
var a = $('m_pbtntop').getElementsByTagName('a')
for(var i=0;i<a.length;i++)
	if(a[i].title=='����ظ�')
		a[i].parentNode.style.display='none'
}

//����==================

commonui.autoTranslate={
fid:null,
from:null,
to:null,
exp:null,
list:[],
running:null,
main:function(o,fid,callback){
if (this.from===false)
	return

this.list.push(o)

if(this.from===null){
	this.from=true
	var self = this
	__NUKE.doRequest({
		u:window.__API.auto_trans(fid),
		f:function(x){
			if (!__NUKE.doRequestIfData(x))
				return false;
			if(!x.data || x.error){
				self.from=false
				return true
				}
			self.fid=fid
			if(typeof x.data[0][1]=='object')
				x.data = x.data[0]
			var from = x.data[0]
			self.to = x.data[1]
			self.exp = ''
			for (var k in from){
				self.exp+='|'+k.replace(/[\$\(\)\*\+\.\[\]\?\^\{\}\\]/g,"\\$0")
				if(k.toUpperCase()!=k)from[k.toUpperCase()]=from[k]
				}
			self.exp = new RegExp(self.exp.substr(1),'ig')
			self.from = from
			if(callback)
				callback()
			else
				self.loopStart()
			return true
			},
		ff:function(){self.from=false}
		})
	}
else if(callback)
	callback()
else
	this.loopStart()
},//fe

test:function (txt){
if(!this.exp)return
this.exp.lastIndex = 0
var diff = this.exp.exec(txt)
while(diff){
	var p = diff.index>0 ? txt.substr(diff.index-1,1) : ' ',
	s= diff.index+diff[0].length<txt.length ? txt.substr(diff.index+diff[0].length,1) : ' '
	if (!(p+diff[0]+s).match(/^[a-zA-Z0-9_\-]{2}|[a-zA-Z0-9_\-]{2}$/))
		return true
	if(diff.lastIndex>=txt.length)
		break
	diff = this.exp.exec(txt)
	}
},//fe

loopStart:function(o){
if(this.running)
	return
this.running=true

if(!this.from || this.from===true)
	return this.running=false

while(o=this.list.shift())
	this.actNode(o)

this.running=false
},//fe

repeatCount:{},

actNode:function(o){

if(o._hasAutoTranslated)
	return
o._hasAutoTranslated=true

var self = this, txt = [], getTxt = function(n){
	var nc = n.childNodes, l =nc.length, nn
	for(var i=0;i<l;i++){
		if(nc[i].nodeType==3)
			txt.push(nc[i])
		else{
			nn = nc[i].nodeName.toLowerCase()
			if(nn!='script' && nn!='a' && !nc[i].className.match(/dice|textfield/))
				getTxt(nc[i])
			}
		}
	}

getTxt(o)
this.repeatCount={}
for(var i=0;i<txt.length;i++){
	var diff=false, ntxt = txt[i].nodeValue.replace(
		this.exp,
		function($0,$i){
			if (txt[i].nodeValue.substr($i-1,$0.length+2).match(/^[a-zA-Z0-9_\-]{2}|[a-zA-Z0-9_\-]{2}$/))
				return $0
			diff=true
			var u = $0.toUpperCase()
			if(!self.repeatCount[u] || self.repeatCount[u]==4)
				self.repeatCount[u]=1
			else 
				self.repeatCount[u]++
			if(self.repeatCount[u]==1)
				return '<span class="auto_trans" title="'+self.to[self.from[$0.toUpperCase()]]+'">'+$0+'</span>'
			else
				return $0
			}
		)//replace
	if(diff){
		diff = document.createElement('span')
		diff.innerHTML = ntxt
		txt[i].parentNode.replaceChild(diff,txt[i])
		}
	}
}//fe


}//ce

//�����ѡ�� ==================

commonui.selectForum = {

get:function(def){
var x = '',w = window, y = {f:{},i:0}, z = w.__ALL_FORUM_DATA
if(!z)
	return y
if (w.__SELECTED_FORUM)//�û�ѡ��İ���
	x+= w.__SELECTED_FORUM+','
if (def==1 && w.__UNION_FORUM_DEFAULT)//Ĭ��ѡ��İ���
	x+= w.__UNION_FORUM_DEFAULT+','
if (def==2 && w.__UNION_FORUM)//Ĭ�ϵİ���
	x+= w.__UNION_FORUM+','
x = x.split(',')
for (var i=0;i<x.length;i++){
	if(x[i]){
		y.f[x[i]]=z[x[i]]
		y.i++
		}
	}
return y
},

getSelect : function (def){
var x = '',w = window,z = w.__ALL_FORUM_DATA
if (w.__SELECTED_FORUM)//�û�ѡ��İ���
	x+= w.__SELECTED_FORUM+','
if (def==1 && w.__UNION_FORUM_DEFAULT)//Ĭ��ѡ��İ���
	x+= w.__UNION_FORUM_DEFAULT
if (def==2 && w.__UNION_FORUM)//Ĭ�ϵİ���
	x+= w.__UNION_FORUM
if (!x)return {forums:{},length:0}

var x = x.split(',')
var y = {},j=0
for (var i=0;i<x.length;i++){
	if(x[i] && !y[x[i]]){
		y[x[i]]=z[x[i]][1]
		j++
		}
	}
return {forums:y,length:j}
},//fe

genHint : function (){
if (!window.__CURRENT_FID || !window.__UNION_FORUM)return false
var y = this.getSelect(),x=''
for (var i in y.forums)
	x +="/ <a href='/thread.php?fid="+i+"' class='silver'>"+y.forums[i]+'</a> ';

if(y.length==1)
	return "<div class='module_wrap_sub b ltxt'>������Ժϲ���ʾ������������� ����� <a href='javascript:void(0)' onclick='commonui.selectForum.genSelect(event)'>������ʾ���뿴���İ���</a></div>"
else
	return "<div class='module_wrap_sub b ltxt'>������ϲ���ʾ��"+x.substr(1)+"������ ����� <a href='javascript:void(0)' onclick='commonui.selectForum.genSelect(event)'>����Ϊֻ��ʾ���뿴���İ���</a></div>"
},//fe

genSelect : function (event){
if (!window.__CURRENT_FID || !window.__UNION_FORUM)return false
var y = this.getSelect(2),z = this.getSelect(),x='',a=''
for (var i in y.forums){
	if(z.forums[i]){
		a = "checked='true'"
		if(window.__CURRENT_FID ==i )
			a=" checked='true' disabled='true'"
		}
	else
		a=''
	x +="<input type='checkbox' value='"+i+"' "+a+"> "+y.forums[i]+'<br/>';
	}
commonui.createadminwindow()
var a = commonui.adminwindow
a._.addContent(null)
a._.addContent( 
	_$("<span/>")._.css({fontSize:'120%',fontWeight:'bold'})._.attr('innerHTML',x,1)
	)
a._.addContent( 
	_$("<button/>")._.attr({type:'button'})._.attr('innerHTML','�ύ',1)._.on('click',function (){
		var tmp = this.parentNode.getElementsByTagName('input'),v=[]
		for (var i=0;i<tmp.length;i++){
			if (tmp[i].checked && !tmp[i].disabled)
				v.push(tmp[i].value)
			}
		commonui.unionforumSubscribe(v.join(','),window.__CURRENT_FID)
		})
	)
a._.addContent( 
	_$("<button/>")._.attr({type:'button'})._.attr('innerHTML','�ر�',1)._.on('click',function (){commonui.hideAdminWindow()})
	)
tTip.showdscp(event,a);

},//fe

genSubForum:function(){
var w,
bg, 
ww=window, 
bit=__SETTING.bit, 
iw=$('mc').offsetWidth, 
sub=__SUB_AND_UNION_FORUM ? __SUB_AND_UNION_FORUM.split(',') : null,//�����Ӱ��� ���ϰ��� �û����м�������ϰ��� id
subt=__SUB_SET ? __SUB_SET.split(',') : null,//���кϼ�����
length = sub?sub.length:0+subt?subt.length:0

if(!length)
	return '';

var c = _$('/div').$0('className','catenew',
	'id','sub_forums',
	'style',{margin:'0px',border:'none',overflow:'hidden'}
	)

if(bit & 8 || iw<500)//7��/500���� ����
	w = 1
else if(bit & 4 || iw<800)//10��/800���� 2��
	w = 2
else if(iw>1600 )//���ڿ�1600+ 6��
	w = 6
else if(iw>1280 )//���ڿ�1280+ 5��
	w = 5
else if(iw>1024 )//���ڿ�1024+ 4��
	w = 4
else//3��
	w = 3

while(w>1 && Math.ceil(length / w)==Math.ceil(length / w-1))//�����Ҫ��������ͬ������-1
	w-=1

if(length<w)//���������������Ҫ��
	w= length

switch(w){
	case 1:
		bg = '232323', w = '100%'
		break;
	case 2:
		bg = '23322332', w = '49.9%'
		break;
	case 3:
		bg = '232323', w = '33.3%'	
		break;
	case 4:
		bg = '23233232', w = '24.9%'
		break;
	case 5:
		bg = '232323', w = '19.9%'
		break;
	case 6:
		bg = '232323323232', w = '16.66%'
		break;
	}


var x=[], ff=ww.__CURRENT_FID, all=ww.__UNION_FORUM, checked=ww.__SELECTED_FORUM
if(sub){
	var data=__ALL_FORUM_DATA
	for(var i=0;i<sub.length;i++){
		var f = data[sub[i]], p=new RegExp('(?:,|^)'+f[0]+'(?:$|,)')
		if(checked && checked.match(p))
			f[3]=2
		else if(all && all.match(p))
			f[3]=1
		if(!bg[i])bg += bg
		x.push(
			 "<div class='c b"+bg[i]+"' style='width:"+w+";background-image:url("+commonui.forumIcon.get(f[0])+")'><div class='a'><div class='b'><a href='/thread.php?fid="+f[0]+"&ff="+ff+"'>"+f[1]+"</a><br/><p>"+(f[3] ? "<input type='checkbox' "+(f[3]==2?"checked='checked'":'')+" value='"+f[0]+"' title='��ʾ/����ʾ�˰�������' onclick='commonui.unionforumSubscribe("+f[0]+","+ff+",this.checked?1:2)'/>" : '')+f[2]+"</p></div class='b'></div class='a'></div class='c'>"
			)
		}
	}

if(subt){
	var data=__ALL_SET_DATA
	for(var i=0;i<subt.length;i++){
		var f = data[subt[i]]
		if(!bg[i])bg += bg
		x.push(
			 "<div class='c b"+bg[i]+"' style='width:"+w+";background-image:url("+commonui.forumIcon.get(0)+")'><div class='a'><div class='b'><a href='/thread.php?stid="+f[0]+"' style='white-space:normal'>"+f[1]+"</a></div class='b'></div class='a'></div class='c'>"
			)
		}
	}

if(bit & (1024 | 8)){//7inch embe
	x.unshift("<div class='collapse_btn'><button onclick='this.parentNode.style.display=\"none\";this.parentNode.nextSibling.style.display=\"block\";' type='button' name='collapseButton'>+</button> �����ʾ���صİ���</div><span style='display:none'>")
	x.push('</span>')
	}
c.innerHTML = x.join('')
return c
}//fe

}//ce

/**
 *canvas��ͼ
 */
commonui.resizeImg = function(img,mw,mh){
var c = document.createElement("canvas"), x = c.getContext("2d");
//x.drawImage(img, 0, 0);
var w = img.width, h = img.height;
if (w > h) {
  if (w > mw) {
	h *= mw / w;
	w = mw;
  }
} else {
  if (h > mh) {
	w *= mh / h;
	h = mh;
  }
}
c.width = w;
c.height = h;

x.drawImage(img, 0, 0, w, h);
img.src = c.toDataURL("image/png");
}

//document.write����==============
if(window.__filterWrite)
	commonui.filterWrite = window.__filterWrite
else
	commonui.filterWrite={load:function(){}, unload:function(){} }
//��ҳ�Ȱ�ť�л� ==================
commonui.readFuncSwitch=function(o){
if(o.className.indexOf('page_margin')==-1)return
if(o.firstChild && o.firstChild.className.indexOf('page_nav')==-1)return//�޷�ҳʱ���˳�
var y = o.getElementsByTagName('span'),z = []
for(var k=0;k<y.length;k++){
	if(y[k].className.match(/max_page|to_page|to_level|topic_count|perpage/))
		z.push(y[k])
	}
var y=o.offsetHeight, 
	u=_$('<span style="font-family:serif;'+((window.__UA &&__UA[0]==1 && __UA[1]<=6)?'font-size:'+Math.floor(y/3*2)+'px':'')+'">&nbsp;</span>'),//ie6�и���Ч���� 
	x = _$('</div>')._.cls('urltip urltip2 page_nav')._.css({height:(y-2)+'px',margin:'0 -100% -100% 0',position:'absolute',padding:'0',lineHeight:(y-2)+'px'})
while(y=z.shift())
	x.appendChild(y)
x._.aC(u.cloneNode(true))
if(o.childNodes[1])
	o.insertBefore(x,o.childNodes[1])
else
	o.appendChild(x)
o.className = o.className.replace('page_short','')
commonui.aE(o.firstChild,'mouseover',function(e){
	var x = this.parentNode.childNodes[1];
	x.style.display='inline'
	commonui.cancelBubble(e)
	})
commonui.aE(o,'mouseout',function(e){
	if (!e) var e = window.event;
	var to = e.relatedTarget || e.toElement;
	for (var i=0;i<7;i++){
		if(to){
			if (to==this)
				return
			to=to.parentNode
			}
		}
	to=this.childNodes[1]
	x.style.display='none'
	})
}

//���ε��============================
commonui.doubleclick = {

currentFocus : null,
allElmCount:0,


focus : function(e,o){
if(!o)o=this
var x = commonui.doubleclick
if(x.currentFocus && x.currentFocus!=o)
	x.blur(null,x.currentFocus)
x.currentFocus=o
o._touchSelected=true
o.style.backgroundColor='#faa'
o.style.MozBoxShadow='inset 0 0 3px #f00,0 0 3px #f00';
o.style.WebkitBoxShadow='inset 0 0 3px #f00,0 0 3px #f00';
o.style.boxShadow='inset 0 0 3px #f00,0 0 3px #f00';
},

blur : function (e,o){
if(!o)o=this
o.style.backgroundColor=''
o.style.MozBoxShadow='';
o.style.WebkitBoxShadow='';
o.style.boxShadow='';
o._touchSelected=false
},

ontouchstart : function (e){
var o = this
if(!o._touchSelected){
	o._previousEventTime = e.timeStamp.valueOf()
	commonui.doubleclick.focus(e,this)
	}
},

onclick : function(e){
if (!(window.__SETTING.bit & 4096))
	return
var o = this,et = e.timeStamp.valueOf()
if (o._previousEventTime && (et-o._previousEventTime)<1000){
	try{e.stopPropagation();e.preventDefault()}catch(er){}
	e.cancelBubble =true,e.returnValue = false
	return
	}
if(o._touchSelected){
	commonui.doubleclick.blur(e,o)
	}
else{
	commonui.doubleclick.focus(e,o)
	try{e.stopPropagation();e.preventDefault()}catch(er){}
	e.cancelBubble =true,e.returnValue = false
	}
},

init:function(a){
if(a._haveSetTouchHandler)return
_$(a)._.on('click',commonui.doubleclick.onclick)._.on('touchstart',commonui.doubleclick.ontouchstart)
a._haveSetTouchHandler = true
},

onTouchStartInitAll:function(){
var a = document.getElementsByTagName('*')
if(a.length != commonui.doubleclick.allElmCount){
	commonui.doubleclick.allElmCount = a.length
	a = document.getElementsByTagName('a')
	for (var i=0; i<a.length; i++)
		commonui.doubleclick.init(a[i])
	}
}
}//ce

//��׼block============================
/*
* @param id node id
* @param name ����
* @param info ���ӽ���
* @param node/ o ����
*/
commonui.genStdBlock_a =function(id,name,info,o){
var $ = window._$
return $('/span').$0('id',id,
	$('/h2').$0('className','catetitle','innerHTML',':: '+name+' ::',
		__NUKE.trigger(function(){
			if(commonui.customBackgroundCheckHeight && commonui.customBackgroundCheckHeight(this.parentNode))
				this.parentNode.className+=" invertThis"
			})
		),
	$('/div').$0('style',{textAlign:'left',lineHeight:'1.8em'}, 'className','cateblock', 'id',id+'Content',
		$('/div').$0('style',{padding:'5px 10px'},
			info ? $('/div').$0('className','gray', 'innerHTML',info) : null,
			o,
			$('/div').$0('className','clear')
			)
		)
	)
}

//nouse ==================

//��������֤ ==================
commonui.additional_check=function(code){
var z = "������� ��֤��Ϣ����COOKIE�б���30�� ����Ч����һ�η���������";
loader.script(__COMMONRES_PATH+'/js_md5.js',
	(code ?
	function(){
		cookieFuncs.setCookieInSecond("additional_check",hex_md5(code.substr(0,3)+__CURRENT_UID+code.substr(3,3)+__CURRENT_UID+code.substr(6)),86400*30);
		alert(z);
		}
	: function(){
		commonui.createadminwindow()
		var x = commonui.adminwindow,id='grefsar'+Math.random()
		x._.addContent(null)
		x._.addTitle('������֤(Beta)')
		x._.addContent( _$('<span/>')._.aC(
			"<span>���븽����<br/><input id='"+id+"' type='text'><br/><button onclick='var tmp = $(\""+id+"\").value;cookieFuncs.setCookieInSecond(\"additional_check\",hex_md5(tmp.substr(0,3)+\""+__CURRENT_UID+"\"+tmp.substr(3,3)+\""+__CURRENT_UID+"\"+tmp.substr(6)),86400*30);alert(\""+z+"\")' type='button'>ȷ��</button><button onclick='cookieFuncs.setCookieInSecond(\"additional_check\",null,0);alert(\"��֤��Ϣ���\")' type='button'>���COOKIE</button><button onclick='commonui.hideAdminWindow()' type='button'>�ر�</button></span>")  )
		var s = commonui.getScroll();
		tTip.showdscp({clientX:s.x,u:s.y,pageX:s.x,pageY:s.y},x);
		})
	)
}

/*
 * replace url
 * @param str) s location.search
 * @param str) m arg name, e.g.'page'
 * @param str/int) n val, e.g. '1' -> set to 1, 1 -> add 1
 * @returns str)
 */
commonui.urlReplace = function(s,m,n){
var p = new RegExp("^(\\?)?(?:((?:.*&)?"+m+")(?:=(\\d*))?(&|$|#))?",'i')
return s.replace(p,function($0,$1,$2,$3,$4){
	return $2 ? $1+$2+'='+( n.constructor==String ? n : (($3=$3|0)+($3?0:1)+n) )+$4 
	: '?'+m+'='+( n.constructor==String ? n : (n+1) )+($4?$4:'&')
	})
}//fe

/**
 * ��¼���˵�
 * @param int opt  &1 reset to 0, &2 add 1,  add 1 at read topic page, reset at forum page
 * @returns {undefined}
 */
commonui.saveBackPos = function(go){

}//fe

commonui.dragMenuInit = function(){
if(!commonui.touchMoveAE)return
console.log('drag menu init')
var $=_$,
ur=this.urlReplace, 
lo = location,
/*
ex = function(s){
var s = s.split('&'),t={}
if(s[0].chatAt(0)=='?')s[0] = s[0].substr(1)
for(var i=0;i<s.length;i++){
	s[i] = s[i].split('=')
	if(s[i][0])
		t[s[i][0]] = s[i][1]
	}
return t
},
jo = function(s){
var t = ''
for(var k in s)
	t+=(t.length==0?'/':'&')+k+'='+s[k]
return lo.protocol+'//'+lo.host+lo.pathname+t+lo.hash
},
*/
page = function(v){return lo.protocol+'//'+lo.host+lo.pathname+ur(lo.search,'page',v)+lo.hash},
pos = __NUKE.position,
pp=null,
ppf=null,
m=[],
em = parseInt(this.getStyle(document.body,'font-size')),
cover = $('/div').$0('style','position:fixed;top:0px;left:0px;right:0px;bottom:0px;background:#000;zIndex:7;display:none;opacity:0.50;transform:translate3d(0, 0, 0)'),
top = $('/div').$0('style','position:fixed;top:0px;left:0px;width:100%;overflow:hidden;height:0px;color:#fff;background:#551200;lineHeight:'+(3*em)+'px;fontSize:'+(2*em)+'px;textAlign:center;verticalAlign:middle;zIndex:8;transform:translate3d(0, 0, 0)'),
st = 0,// state 1:leftmenu 2:rightmenu 4: 8: 16:cover
dr = 0,//direct ... 2bit | 2bit | 2dragleft 1dragright
id = -1,//current menuid
pi = -1,//prev menuid
s=0,//current menu size
dt=0,//
v=__NUKE.cpblName(document.body.style,'transition',1),

evTouchMove = function(e){

if(st==0){
	console.log('cancel')
	return
	}

var p = pos.get(e)

if(pp===null){
	ppf = p.yf
	pp = p.y
	}

dt = Math.abs(pp - p.y)
if(dt<5){
	return 1
	}

if(p.y>pp && (st&16)==16)
	dr = (dr << 2)|1
else if(p.y<pp && (st&16)==16)
	dr = (dr << 2)|2
else
	dr = dr << 2

ppf = p.yf
pp = p.y
if((dr & 341)==341){//drag right*5
	if((st&1)==0)
		show(1)
	size(dt)
	}
else if((dr & 682)==682){//drag left*5
	if((st&2)==0)
		show(2)
	size(dt)
	}
else if(st&15){
	hide(1)
	}
return 1
},//fe

size = function(x){
	if(st!=0){
		s+=x
		top.style.height = top.style.lineHeight = s+'px'
		id = Math.floor(s / em / 3.5)*2
		if(id != pi){
			if(id>=m[st].length-1)id = m[st].length-2
			top.innerHTML = m[st][id]
			}
		pi = id
		}
	},//fe

hide = function(no){
	if(st!=0){
		if(v)
			top.style[v[0]]='height 0.25s linear 0s,0.25s'
		top.style.height = top.style.lineHeight = '0px'
		var tmp =(!no && m[st]) ? m[st][id+1] : null
		st = dr = s = 0
		pi = id = -1
		pp = ppf = null
		if(!no && tmp)
			tmp()
		else
			cover.style.display='none'
		}
	},//fe

show = function(d){
	if((st&15)==0){
		if(v)
			top.style[v[0]]=''
		if(d==1){
			top.style.top='0px'
			top.style.bottom=''
			}
		else{
			top.style.top=''
			top.style.bottom='0px'
			}
		top.style.height = top.style.lineHeight = '0px'
		cover.style.display=''
		s=0
		id=pi=-1
		st &= ~(1|2|4|8)
		st |= (d|16)
		}
	}//fe

m[17] = []
m[17].push('�����϶��򿪲˵�',null)
m[17].push('����',function(){history.back(-1)})
m[17].push('����',function(){history.back(-1)})
m[17].push('����(��)', function(){
	if(commonui.checkIfInIframe()){
		try{
			var s = window.parent.iframeRead
			s.hide()
			}
		catch(err){}
		}
	else{
		__COOKIE.setCookieInSecond('continueBack','20'+location.pathname)
		history.back(-1)
		}
	})


m[18] = []
m[18].push('�����϶��򿪲˵�',null)
m[18].push('��һҳ',function(){lo.assign(page(1))})
m[18].push('��һҳ',function(){lo.assign(page(1))})
m[18].push('ˢ��',function(){lo.reload()})

//init
var tp
document.body.appendChild(cover)
document.body.appendChild(top)
commonui.aE(document,'contextmenu',function(){
	if(tp)clearTimeout(tp)
	hide()
	})
commonui.touchMoveAE('touchstart',function(e,se){
	if(tp)clearTimeout(tp)
	tp = setTimeout(
		function(){
			cover.style.display=''
			st|=16
			},
		500
		)
	})
commonui.touchMoveAE('touchmove',function(e,se){
	if(tp)clearTimeout(tp)
	return evTouchMove(e)
	})
commonui.touchMoveAE('touchend',function(e,se){
	if(tp)clearTimeout(tp)
	hide()
	})
}//fe






/**
 * global long touch and touchmove event
 */
commonui.touchMoveAE = false
commonui.touchMoveInit = function(){
if ('ontouchstart' in document.documentElement || window.navigator.msMaxTouchPoints){}
else
	return

var p = __NUKE.position.get, ts={}, eE=[], eM=[], eS=[]

commonui.aE(document,'touchstart',function(e){
	if(!ts || (!eE.length && !eM.length && !eS.length))return
	if(!e.changedTouches)
		return ts = null
	if(e.changedTouches[1])
		return
	var t= e.changedTouches[0],r=0
	ts[t.identifier] = {x:t.clientX,y:t.clientY,mx:t.clientX,my:t.clientY,now:(new Date).getTime()}
	if(eS.length){
		for(var j=0;j<eS.length;j++){
			if(eS[j])
				r |= eS[j](t,ts[t.identifier])
			}
		if(r&1)
			return commonui.cancelEvent(e)
		}
	})

commonui.aE(document,'touchmove',function(e){
	if(!ts || !eM.length)return
	for(var k=0;k<e.changedTouches.length;k++){
		var t= e.changedTouches[k],r=0
		if(ts[t.identifier]){
			for(var j=0;j<eM.length;j++){
				if(eM[j])
					r |= eM[j](t,ts[t.identifier])
				}
			if(r&1)
				return commonui.cancelEvent(e)
			}
		}
	})

commonui.aE(document,'touchend',function(e){
	if(!ts || !eE.length)return
	for(var k=0;k<e.changedTouches.length;k++){
		var t= e.changedTouches[k],r=0
		if(ts[t.identifier]){
			for(var j=0;j<eE.length;j++){
				if(eE[j])
					r |= eE[j](t,ts[t.identifier])
				}
			delete ts[t.identifier]
			if(r&1)
				return commonui.cancelEvent(e)
			}
		}
	})

/**
 * 
 * @param {type} e
 * @param {type} f function(ev,savedEv){ return 1 will cancel event}
 * @returns {Number}
 */
commonui.touchMoveAE = function(e,f){
	if(e=='touchmove')
		return eM.push(f)-1
	else if(e=='touchend')
		return eE.push(f)-1
	else if(e=='touchstart')
		return eS.push(f)-1
	}//fe
}//init fe


/*
commonui.dispReadReputation = function(o,uid,fid)
{
if (isNaN(parseInt(uid,10)))return;
if (typeof(fid)=='number' && fid<0) fid='&rid='+fid;
else fid=''
httpDataGetter.script_muti_get("/nuke.php?func=load_user_reputation&uid="+uid+fid,
	function(r){
	if (!r)
		{
		o.innerHTML = 'data error';
		return false;
		}
	else
		{
		var l='';
		var x = '';
		r = r.data;
		for (var k in r)
			{
			l=commonui._r_f.format(r[k]['r'])
			x+='<tr><td>'+r[k]['n']+' <span class=numeric>('+l.value+')</span><div class=r_container><div style=\"width:'+(l.rate*100)+'%\" class=r_bar></div></div><span class=silver>'+l.name+' <span class=numeric>('+l.valueDisp+'/'+l.range+')</span></span></td></tr>';
			}
		if (x)
			x = '<table class=reputation_table cellspacing=0><tbody>'+x+'</tbody></table>';
		else
			x = 'no reputation';
		o.innerHTML = x;
		return true
		}
	},
	function(){
	o.innerHTML = 'get error';
	},
	'gbk'
	)
}//fe
*/