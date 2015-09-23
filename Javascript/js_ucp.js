if(!window.commonui)
	commonui={}


commonui.ucp = {
_get_lock:null,
_get_debug:null,
_if_forum_admin:4,
_currentUid : 0,

load:function(uid,currentUid,o){
if(this._get_lock)return
uid = __NUKE.toInt(uid)
if(uid<1)
	return alert('未指定用户')
this._currentUid = currentUid
var self = this;
httpDataGetter.script_muti_get(__API.userInfo(uid) ,
	function(r){
		if (!r)
			return self._echo('数据错误')
		
		if(r.debug)
			self._get_debug = r.debug
		
		self._get_lock=false;
		
		if(r.error)
			var data = r.error[0]
		else
			var data = r.data[0]
		
		self._echo(data,o)
		return true
		},
	function(){self._get_lock=false;return self._echo('未收到结果')},
	__CHARSET
	);

},//fe


_title:function(_U){
if(!_U.honor)return '';
var h = _U.honor
if (h.substr(0,1)==' '){
	h = h.split(' ');
	h[1] = __NUKE.toInt(h[1]);
	if(h[1] && h[1]>window.__NOW)
		h = h[2]
	else if(h[3])
		h=h[3]
	else
		h=''
	}
return h
},//fe

_stat:function(_U){
var r
if(_U.verified===undefined)
	return null

	r = commonui.activeInfo(_U.verified,_U.uid)
	console.log(_U.verified)
	var r= _$('<a/>').$0('className', r[0]+' b', 'innerHTML', r[2], 'href', r[5] ? r[5] : 'javascript:void(0)', 'onclick', function(){alert(this.title)}, 'title', r[3]+' '+r[4])



return r
},//fe

_echo:function(_U,o){
	
if(typeof(_U)=='string'){
	return o.appendChild( _$('<span/>')._.aC(this._genBlock('user_info_info_block','信息','',document.createTextNode(_U))))
	}

var _SELF = _U.uid==this._currentUid ? true : false,
_ADMIN = __GP.admin,
_SUPER = __GP['super'],
_GREATER = __GP.greater,
_LESSER = __GP.lesser,
_SUPERLESSER = __GP.superlesser,
//_STAFF = __GP.staff,
all = _$('<span/>'),
sst = (_LESSER || _U.verified<0 || _U.uid==this._currentUid)?true:false,
stp = (_LESSER || _U.uid==this._currentUid)?true:false,

//_ACT_UNNUKE = _STAFF,
_ACT_UNNUKE = (_LESSER && (__GP.userBit&1024) && (__GP.userBit&256)),
_ACT_NUKE = _SUPERLESSER || (__GP.userBit&1024) || _ACT_UNNUKE,
_VIEW_NUKE = (_LESSER && (__GP.userBit&8) && (__GP.userBit&256))
//_VIEW_NUKE = _STAFF||_SUPER
//---------------------------------------

//---------------------------------------------------
var buffs,self=this
if(_U.buffs){
	_U.maxBuffMute = 0
	var buffs= _$('<span/>'), tmp = function(b){
		var now = __NOW,
		n = _$('/span')._.add(
				_$('/b')._.add(_U.buffName[b[2]])
				)
		if(b[2]==105){
			n._.add(
					b[4] ? _$('/span')._.add(
								'在主题或合集',_$('/a').$0('href',"/read.php?tid="+b[4],'innerHTML','[TID:'+b[4]+']')
								) :
					(b[3] ? _$('/span')._.add(
								'在版面',_$('/a').$0('href',"/thread.php?fid="+b[3],'innerHTML','[FID:'+b[3]+']')
								) : '')
				)
			if(b[1]>now && b[1]>_U.maxBuffMute)
				_U.maxBuffMute = b[1]
			}
		if(b[1]>now)
			n._.add(' 持续至 ' , commonui.time2date(b[1], 'Y-m-d H:i') , _$('/br'));
		else
			n._.add(
				_$('/span')._.cls('silver')._.add(' 已于 ' , commonui.time2date(b[1], 'Y-m-d H:i') , ' 结束') , _$('/br')
				)
		return n
		}//fe
	
	for(var k in _U.buffs){
		buffs._.add(tmp(_U.buffs[k]))
		}

	}

//---------------------------------------

var info = this._span(
	
	this._ul(
		this._a(true, '搜索用户','/nuke.php?func=ucp'),
		this._a(_GREATER, '被操作记录',null,function(){self.log(_U.uid,null)}),
		this._a(_GREATER, '操作记录',null,function(){self.log(null,_U.uid)}),
		this._a((_GREATER && _SELF) || _ADMIN , '访问记录','/nuke.php?func=adminlog&f=access_log&uid='+_U.uid),
		this._a(_ADMIN, '强制登出','/nuke.php?func=logout&to_uid='+_U.uid),
		this._a(_ADMIN, '更改头衔','/nuke.php?func=settitle&uid='+_U.uid),
		this._a(_ADMIN, 'buff',null, function(e){adminui.addBuff(e,_U.uid)}),
		this._a(_SELF, '<span class="teal">更改密码</span>', 'https://account.178.com/?p=renew_pass'),
		this._a(_SELF, '<span class="teal">邮箱重置密码</span>', 'https://account.178.com/?p=reset_pass'),
		window.reM_54354 ? reM_54354(_U.uid) : null,
		window.reL_76376 ? reL_76376(_U.uid) : null
		)._.cls('actions'),
			
	this._ul2(
		'用户ID&emsp;',_U.uid,
		'用户名&emsp;',_U.username,
		'邮箱&emsp;&emsp;',_U.email,
		'用户组&emsp;',this._span(_U.group+' ('+_U.gid+')', this._a(_ADMIN, '更改','/nuke.php?func=setgroup&uid='+_U.uid)),
		
		'激活&emsp;&emsp;' , sst ? this._span(this._stat(_U), (_ACT_NUKE ? _$('<a/>').$0('innerHTML','[NUKE]','href','javascript:void(0)','onclick',function(e){adminui.nukeUi(e,_U.uid)}) : null) ) : null,
		
		'禁言&emsp;&emsp;' ,
		(_U.muteTime || _ACT_NUKE) ? _$('<span/>')._.add(
			_U.muteTime ? 
				_$('/span')._.cls('orangered b')._.add(' 至'+commonui.time2date(_U.muteTime,'Y-m-d H:i')) 
				:(
					_U.maxBuffMute ? _$('<span/>').$0('className','gray b','title','在某些区域禁言')._.add(' 至'+commonui.time2date(_U.maxBuffMute,'Y-m-d H:i')) : null
				),

			this._a(_ACT_NUKE, '禁言','nuke.php?func=muteuser&uid='+_U.uid)
			) : null ,
				
		'头衔&emsp;&emsp;',this._span(this._title(_U), this._a(_ADMIN, '更改','/nuke.php?func=settitle&uid='+_U.uid)),
		'发帖数&emsp;',_U.posts,
		'金钱&emsp;&emsp;',_$('<span>'+commonui.calc_money(_U.money)+'</span>'),
		'注册日期',this._span(commonui.time2date(_U.regdate) , this._a(_ADMIN, '更改','/nuke.php?func=setregtime&uid='+_U.uid)),
		'最近访问', _U.thisvisit ? commonui.time2date(_U.thisvisit) : null,
		'前次访问' , _U.lastvisit ? commonui.time2date(_U.lastvisit) : null,
		'最近发帖' , _U.lastpost  ? commonui.time2date(_U.lastpost) : null
		)._.cls('info')
	
	)

all._.aC(this._genBlock('user_info_block',_U.username+' 的基础信息','',info))

//----------------------------------------------
if(buffs)
	all._.aC(this._genBlock('user_buff_block',_U.username+' 的状态','',buffs))
//----------------------------------------------

if(_U.ipLog && _U.ipLog[0]){
	all._.aC(this._genBlock('user_ip_block',_U.username+' 的IP','',this._genIp(_U,_VIEW_NUKE)))
	}

//---------------------------------------


var avatar = this._span(
	
	this._ul(
		this._a(_SELF || _GREATER, '更改头像','',function(e){commonui.setAvatar(e,_U.uid,_GREATER)})
		)._.cls('actions'),
			
	_$('<img/>')._.css('border','5px solid #ccc')._.attr('src','about:blank')._.on('error',function(){
		if(this._srcLoaded)return
		this.tmp = commonui.selectUserPortrait(_U.avatar,_U.buffs)
		if(this.tmp){
			this.src=this.tmp
			this._srcLoaded=true
			}
		else
			this.style.display="none"
		})
	
	)

all._.aC(this._genBlock('user_avatar_block',_U.username+' 的头像','',avatar))

//-------------------------------------------------------------------
		
var sign = this._span(
	
	this._ul(
		this._a(_SELF || _GREATER, '更改签名','',function(e){commonui.setSign(e,_U.uid,_GREATER)})
		)._.cls('actions'),
			
	_U.sign ? _$('<div/>')._.attr({id:'userSignC'})._.css({padding:'5px',border:'5px solid #ccc',width:'90%',maxWidth:'740px'})._.cls('sign ubbcode') : null,
	
	_U.sign ? _$('<img/>')._.css({display:'none'})._.attr('src','about:blank')._.on('error',function(){
		ubbcode.bbsCode({
					c:$('userSignC'),
					fId:1,
					tId:1,
					pId:1,
					authorId:_U.uid,
					rvrc:_U.fame/10,
					isSig:true,
					txt:_U.sign,
					isLesser:_U._lesser
					})
		}) : null
	
	)

all._.aC(this._genBlock('user_sign_block',_U.username+' 的签名','',sign))

//-------------------------------------------------------------------


if( _U.bit & this._if_forum_admin || _U._admin || _U._super || _U._greater || _U._lesser || _U._superlesser || typeof(_U.userForum)=='object'){
	
	if(_U.adminForums){
		var u = this._ul()._.cls('actions')
		for(var k in _U.adminForums)
			this._ul(u, _$('<li/>')._.aC( this._a(true, _U.adminForums[k],'/thread.php?fid='+k) ))
		}
	else
		var u=null
	
		
	
	var adminStat = this._span(
		
		_U.username,
		
		_U._admin ? '拥有管理员权限' : _U._super ? '拥有超级版主权限 任意用户管理权限' : _U._greater ? '拥有版主权限 所属版面的用户管理权限' : _U._lesser ? '拥有次级版主权限' : null,
		
		_U._superlesser ? '任意主题管理权限' : _U._lesser ? '所属版面的主题管理权限' : null,

		_U.adminForums ? '在以下版面担任版主' : null,

		u

		)
			
	all._.aC(this._genBlock('user_admin_block',_U.username+' 的管理权限','',adminStat))
	}

//---------------------------------------------------

var u = this._ul2( '威望' , _U.fame/10 )._.cls('info')

for(var k in _U.reputation){
	var r  = _U.reputation[k]
	this._ul2(u, _$('<span/>')._.attr({title:r[2],innerHTML:r[0]}), r[1] )
	}
	
var repu = this._span(
	u,
	
	_$('<span><form action="nuke.php?func=user_reputation&uid='+_U.uid+'" method="post" target="_blank"><b>用户声望查询</b> 用户<select name="nameselect"><option value="username">用户名</option><option value="uid">用户ID</option></select><input type="text" name="name" size="15" value=""> 对 '+_U.username+' 的声望 <input type="submit" value="确认"></form></span>')
	)
		
all._.aC(this._genBlock('user_fame_block',_U.username+' 的声望','表示 论坛/某版面/某用户 对 '+_U.username+' 的关系',repu))


//---------------------------------------------------
if(_U.items){
	
	var item = _$('<span/>')
	all._.aC(this._genBlock('user_fame_block',_U.username+' 的物品/道具','',item))

	if(commonui.userItem){
		commonui.userItem.manualInit(item, this._currentUid )
		commonui.userItem.open()
		if(_U.items==2)commonui.userItem.list(null,null,null,_U.uid)
		}
	else
		loader.script(__SCRIPTS.userItem,function(){
			commonui.userItem.manualInit(item, this._currentUid)
			commonui.userItem.open()
			if(_U.items==2)commonui.userItem.list(null,null,null,_U.uid)
			} )

	
	}

//---------------------------------------------------

if(typeof(_U.userForum)=='object'){
	
	all._.aC(this._genBlock('user_forum_block',_U.username+' 的个人版面','个人版面是由用户自己管理的版面 以用户声望限制访问权限',
		this._span(

			this._ul(
				this._a(_SELF, '用户版面设置', '/nuke.php?func=userforum&act=manage&fid='+_U.userForum[0]),
				this._a(typeof(_U.userForum)=='object', _U.userForum[1], '/thread.php?fid='+_U.userForum[0])
				)._.cls('actions')

			)

		))
	
	}
else if(_U.userForum && _SELF){
	
	all._.aC(this._genBlock('user_forum_block','创建个人版面','个人版面是由用户自己管理的版面 以用户声望限制访问权限',
		this._span(

			this._ul(
				this._a(typeof(_U.userForum)!='object' , '创建个人版面', '/nuke.php?func=userforum&act=create')
				)._.cls('actions')

			)

		))	
	}

//---------------------------------------------------

	all._.aC(this._genBlock('user_post_block', _U.username+' 发布的贴子','',
		this._span(

			this._ul(
				this._a(true , '搜索 '+_U.username+' 发布的主题', '/thread.php?authorid='+_U.uid),
				this._a(true , '搜索 '+_U.username+' 发布的回复', '/thread.php?searchpost=1&authorid='+_U.uid)
				)._.cls('actions'),
					
			_$('<div/>')._.attr('id','vftrwegvbytrjnuh'),

			stp ? __NUKE.trigger(function(){
				httpDataGetter.script_muti_get(
					'/nuke.php?__lib=load_topic&__act=load_topic_by_uid&uid='+_U.uid+'&raw=1',
					function(d){
						if (!d)return false;
						var o = $('vftrwegvbytrjnuh'),i=0
						if (d.error){
							o.innerHTML = d.error;
							return true;
							}
						for(var k in d.data[0]){
							var x = d.data[0][k]
							if(x.tid)
								o.innerHTML+="<span class='gray'>"+commonui.time2date(x.postdate,'y-m-d H:i')+"</span> <a href='/read.php?tid="+(x.quote_from ? x.quote_from : x.tid)+"' target='_blank'>"+x.subject+"</a><br/>"
							else
								o.innerHTML+="<span class='gray'>"+x.subject+"</span><br/>"
							if(i++>10)break;
							}
						return true;
						},
					function(){
						$('vftrwegvbytrjnuh').innerHTML='读取错误';
						},
					'gbk'
					);
				}) : null
			)

		))
	

//---------------------------------------------------
/*
if(_SELF){
	all._.aC(this._genBlock('user_script_block','用户脚本','用javascript制作论坛插件',
		this._span(

			this._ul(
				this._a(true , '编辑用户脚本', '/nuke.php?func=user_script')
				)._.cls('actions')

			)

		))	
	}
*/

//---------------------------------------------------

if(_LESSER){
	
	var u = _$('<span/>');
	if(typeof(_U.remark)=='object'){
		for(var k in _U.remark)
			u.innerHTML+="<span class='gray'>"+commonui.time2date(_U.remark[k][3])+"</span> <a href='nuke.php?func=ucp&uid="+_U.remark[k][1]+"' target='_blank'>["+_U.remark[k][1]+"]</a> "+_U.remark[k][2]+" <a href='javascript:void(0)' onclick='__NUKE.doRequest({u:__API.remarkDel("+_U.uid+","+_U.remark[k][0]+"),b:this})'>[删除]</a><br/>";
		}
	all._.aC(this._genBlock('user_remark_block','用户备注','版主可见,用户信息备忘,添加/删除备注可能在一天后方能生效',
		this._span(

			u,
			_SELF ? null : _$('/div')._.add(
				_$('/input'),
				_$('/button').$0('innerHTML','提交一条备注','onclick',function(){
					var v = this.previousSibling.value
					var w = this.nextSibling.checked?1:0
					if(!v)
						return
					__NUKE.doRequest({
						u:__API.remarkAdd(_U.uid,v,w),
						b:this
						})
					}),
				_$('/input').$0('type','checkbox'),
				'所有用户可见',
				_$('/b').$0('className','red','innerHTML','&emsp;严禁添加无用备注')
				)


			)

		))	
	}

//---------------------------------------------------


o.appendChild(all)
},//fe
_long2ip : function (ip) {
if(typeof ip =='string' && ip.indexOf('.')!=-1)
	return ip
ip = __NUKE.toInt(ip)
return [ip >>> 24, ip >>> 16 & 0xFF, ip >>> 8 & 0xFF, ip & 0xFF].join('.');
},//fe
_genIpSub : function(o,data,ifS){
if(typeof data !='object')
	return
var $ = _$
for(var k in data){
	var x = data[k]
	o._.add(commonui.time2date(x[1],'Y-m-d'),
		'  ',
		$('/b')._.add(x[0] ? this._long2ip(x[0]) : (x[2]?x[2]:'n/a')),
		'  ',
		x[3]? x[3]+' ' : null,
		x[0] ? 
			$('/a').$0('href','javascript:void(0)','name',this._long2ip(x[0]),'innerHTML','[地区]','onclick',function(e){commonui.ipArea(e,this.name)})
			: null)

	if(ifS && x[0] && this.genIp_5649)
		this.genIp_5649(o,x,ifS)

	o._.add($('/br'))
	}
},//fe
day2date:function(d){
d = d*86400-28800+1;
return commonui.time2date(d, 'Y/m/d')
},
_genIp :function(_U,ifS){
	
	if(!this.genIp_5649 && window.genIp_5649)
		this.genIp_5649 = window.genIp_5649

	var $=_$, ip = $('/span')

	if(_U.ipLog)
		this._genIpSub(ip, _U.ipLog, ifS)
		
	if(_U.passLog)
		this._genIpSub(ip, _U.passLog, ifS)
	
	if(!ifS)
		return ip

	var self=this, sel1, sel2, sel3, uid = _U.uid

	if(_U.ipTbl){
		var x,z
		for(var k in _U.ipTbl){
			if(!x)x=k
			_U.ipTbl[k].next = z
			z = _U.ipTbl[k]
			}
		_U.ipTbl[x].next = z
		}

	return $('/span')._.add(
		ip,
		sel1 = $('/button').$0('innerHTML','更多ip记录','value','iplog','onclick',function(){
			if(this.value=='iplog'){
				this.value='topic'
				this.innerHTML = '主题ip记录'
				sel3.style.display = 'none'
				}
			else if(this.value=='topic'){
				this.value='reply'
				this.innerHTML = '回复ip记录'
				sel3.style.display = 'none'
				}
			else if(this.value=='reply'){
				this.value='iplog'
				this.innerHTML = '更多ip记录'
				sel3.style.display = ''
				}
			}),
		sel3 = $('/button').$0('innerHTML',self.day2date(z.min)+' - '+self.day2date(z.max),'value',z.min,'onclick',function(){
			z = z.next
			this.value = z.min
			this.innerHTML = self.day2date(z.min)+' - '+self.day2date(z.max)
			}),
		sel2 = $('/button').$0('innerHTML','&#9664; 第1页 &#9654;','value',1,
			'onclick',function(e){
				var p = __NUKE.position.get(e)
				var q = this.getClientRects()[0]
				if(p.px-q.left > q.right-p.px)
					this.value++
				else if(this.value>1)
					this.value--
				this.innerHTML = '&#9664; 第'+this.value+'页 &#9654;'
				}),
		$('/button').$0('innerHTML','查看','onclick',function(e){
				__NUKE.doRequest({
					u:{u:'/nuke.php?',
						a:{__lib:"ucp",
							__act:"more_iplog",
							opt:sel1.value,
							page:sel2.value,
							min_day:sel3.value,
							uid:uid,
							raw:3}
						},
					f:function(d){
						var e = __NUKE.doRequestIfErr(d)
						if(e)
							return alert(e)
						d = d.data[0]
						if(!d || !d[0] )
							return alert('error')
						ip.innerHTML = ''
						self._genIpSub(ip,d,ifS)
						}
					})
			})

		)

},//fe
log:function(tou,fromu){

var $=_$,self=this,vtype,vfrom,vto,vabout,y,vp,vpb
commonui.createadminwindow()
commonui.adminwindow._.addContent(null)
commonui.adminwindow._.addContent(
	$('/span')._.add(
		'类型',vtype = $('/select'),
		' 操作人',vfrom = $('/input').$0('size',15),
		' 被操作人',vto = $('/input').$0('size',15),
		' 相关ID',vabout = $('/input').$0('size',15),'(主题ID/回复ID/版面ID……依类型不同) ',
		 $('/br'),
		vp = $('/button').$0('innerHTML','&#9664; 第1页 &#9654;','value',1,
			'onclick',function(e){z(this,e)}),
		$('/button').$0('innerHTML','提交','onclick',function(){
			x(vtype.value,vfrom.value,vto.value,vabout.value,vp.value)
			}),
		 $('/br'),
		 '版主可以撤销自己或副版主的操作 超级版主可以撤销其他版主的操作',
		y = $('/div'),
		vpb = $(vp.cloneNode(1)).$0('onclick',function(e){z(this,e)}),
		$('/button').$0('innerHTML','提交','onclick',function(){
			x(vtype.options[vtype.selectedIndex].value,vfrom.value,vto.value,vabout.value,vp.value)
			})
		)
	)
var z = function(o,e){
	var p = __NUKE.position.get(e)
	var q = o.getClientRects()[0]
	if(p.px-q.left > q.right-p.px)
		o.value++
	else if(o.value>1)
		o.value--
	vp.value = vpb.value =o.value
	vp.innerHTML = vpb.innerHTML = '&#9664; 第'+o.value+'页 &#9654;'
	}
var x = function(type,from,to,about,page,o){
	__NUKE.doRequest({
		u:{u:__API._base+'__lib=admin_log_search&__act=search&from='+(from?from:'')+'&to='+(to?to:''),
			a:{type:type?type:'',about:about?about:'',page:page?page:'',raw:3}
			},
		f:function(d){
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return alert(e)
			var u = d.data[1], s = d.data[2], d = d.data[0], t= $('/table').$0('className','forumbox')
			for(var k in d)
				t._.add($('/tr').$0('className','row'+(1+(k&1)))._.add(
					$('/td').$0('className','c1','style','padding:0.25em')._.add(
						$('/span').$0('innerHTML',	s[d[k][1]],'title',d[k][0])
						),
					$('/td').$0('className','c2','style','padding:0.25em')._.add(
						$('/a').$0('href','/nuke.php?func=ucp&uid='+d[k][2],'title',u[d[k][2]],'innerHTML',commonui.cutstrbylen(u[d[k][2]],7,6,'…')),
						$('/span').$0('className','silver xtxt','innerHTML',' ('+d[k][2]),
						d[k][7] ? $('/br') : '',
						d[k][7] ? $('/span').$0('className','silver xtxt','innerHTML',self._long2ip(d[k][7])) : ''
						),
					$('/td').$0('className','c3','style','padding:0.25em')._.add(
						d[k][3] ? $('/a').$0('href','/nuke.php?func=ucp&uid='+d[k][3],'title',u[d[k][3]],'innerHTML',commonui.cutstrbylen(u[d[k][3]],7,6,'…')) : null,
						d[k][3] ? $('/span').$0('className','silver xtxt','innerHTML',' ('+d[k][3]) : null
						),
					$('/td').$0('className','c1','style','padding:0.25em').$0('innerHTML',self._formatLog(d[k][5])	),
					$('/td').$0('className','c2','style','padding:0.25em')._.add(
						$('/span').$0('className','xtxt','innerHTML',commonui.time2date(d[k][6], 'Y-m-d H:i:s')),
						(d[k][1]==2 || d[k][1]==14 || d[k][1]==31)?$('/a').$0('href','javascript:void(0)','onclick',function(){self._undo(this,this.title)},'title',d[k][0],'innerHTML','[撤销]'):null
						)
					))
			y.innerHTML = ''
			y._.add(t)
			if(!vtype.firstChild){
				vtype._.add($('/option').$0('innerHTML','所有','value',''))
				for(var k in s)
					vtype._.add($('/option').$0('innerHTML',s[k],'value',k))
				}
			},
		b:o
		})
	}
if(tou){
	x(0,0,tou,0,null)
	vto.value=tou
	}
else if(fromu){
	x(0,fromu,0,0,null)
	vfrom.value = fromu
	}
commonui.adminwindow._.show()
},//fe

_undo : function (o,id){
o.style.color='darkred'
if(window.confirm('是否要取消此操作'))
	__NUKE.doPost({u: '/nuke.php?__lib=undo&__act=undo&raw=3&logid='+id})
o.style.color=''
},//fe

_formatLog : function(x){
if(!x)
	return ''
x+=''
x = x.replace(
	/(?:\[|\()TID:(\d+)(?:\]|\))/g,
	function($0,$1){
		if($1==0)
			return $0;
		else 
			return "<a href='/read.php?tid="+$1+"' target='_blank' title='主题'>[T:"+$1+"]</a>";
		})

x = x.replace(
	/(?:\[|\()PID:(\d+)(?:\]|\))/g,
	function($0,$1){
		if($1==0)
			return $0; 
		else 
			return "<a href='/read.php?pid="+$1+"' target='_blank' title='回复'>[P:"+$1+"]</a>";
		})

x = x.replace(
	/\[UID:(\d+)\]/g,
	function($0,$1){
		if($1==0)
			return $0; 
		else 
			return "<a href='/nuke.php?func=ucp&uid="+$1+"' target='_blank' title='用户'>[U:"+$1+"]</a>";
		})

x = x.replace(
	/\[(STID|FID):(\d+)\]/g,
	function($0,$1,$2){
		if($2==0)
			return $0; 
		else 
			return "<a href='/thread.php?"+$1.toLowerCase()+"="+$2+"' target='_blank'>"+$0+"</a>";
		})

x = x.replace(
	/\[LOG:(\d+)\]/g,
	function($0,$1,$2){ 
		return "<a href='/nuke.php?func=adminlog&id="+$1+"' target='_blank'>"+$0+"</a>";
	})

x = x.replace(
	/\[ITEM:(\d+),(\d+)\]/g,
	function($0,$1,$2){
		if($1==0)
			return $0; 
		else 
			return "<a href='javascript:void(0)' title='物品 类别"+$1+" 子类"+$2+"'>[I:"+$1+","+$2+"]</a>";
		})

x = x.replace(
	/\[L:(\d+),(-?\d+),(\d+),(-?\d+),([\d\/]*)\]/g,
	function($0,$1,$2,$3,$4,$5,$6){
		var z=''
		if($1!='0'){
			z+=(
				$3!='0' ? "在主题<a href='/read.php?tid="+$3+"&to' target='_blank'>[TID:"+$3+"]</a>"
				: (
					$2!='0' ? "在版面<a href='/thread.php?fid="+$2+"' target='_blank'>[FID:"+$2+"]</a>"
					: ''
					)
				)+
				'禁言'+$1+'天 '
			}

		if($4!='0'){
			$5 = $5.split('/')
			z+='扣除声望'+$4
			var y = '';
			for(var i=0;i<$5.length;i++){
				if($5[i]=='0')
					y=' 扣除威望'+($4/150)
				else
					z+='/[RID:'+$5[i]+']'
				}
			z+=y
			}
		if(!z)
			return '无操作';
		return z
		})

return x
},//fe



_span : function(){
if(!arguments[0])return
var u = _$('<span/>')
for(var i=0;i<arguments.length;i++){
	var v = arguments[i]
	if(!v)continue
	if(typeof(v)=='string')
		v = u._.aC(document.createTextNode(v+' '))
	else
		v = u._.aC(v,document.createTextNode(' '))
	}
return u
},//fe

_a : function(x,n,h,f,t){
if(!x)return null
var a = _$('<a/>')._.attr('innerHTML','['+n+']')
if(f)
	a._.on('click',f)._.attr('href','javascript:void(0)')
else{
	a._.attr('href',h)
	if(h.substr(0,7)=='http://')
		a._.attr('target','_blank')
	}
if(t)
	a._.attr('title',t)
return a
},//fe

_ul:function(){

if(arguments[0] && arguments[0].nodeName=='UL')
	var u = arguments[0],i=1
else
	var u = _$('<ul/>')._.css({padding:'0',margin:'0'})._.aC(_$('<div/>')._.cls('clear')) , i=0

for(;i<arguments.length;i++){
	var v = arguments[i]
	if(!v)continue
	if(typeof(v)=='string')
		v = _$('<span/>')._.attr('innerHTML',v) 
	else
		v = _$('<span/>')._.aC(v)
	u._.aC([_$('<li/>')._.css({paddingRight:'5px'})._.aC(v),u.lastChild])
	}

return u
},//fe

_txtWidth:function(s){
var j = 0,c
for (var i=0;i<s.length;i++){
	c = s.charCodeAt(i);
	if (c > 127)
		j = j+1;
	else if ( (c<=122 && c>=97)||(c<=90 && c>=65) )
		j = j+0.65;
	else
		j = j+0.35;
	}
return j
},//fe

_ul2:function(){

if(arguments[0] && arguments[0].nodeName=='UL')
	var u = arguments[0],i=1
else{
	var i=0,u = _$('/ul')._.css({padding:'0',margin:'0',minWidth:'0'})._.aC(
		_$('/div')._.cls('clear')._.add(
			__NUKE.trigger(function(){

				var x=this.parentNode.parentNode.getElementsByTagName('li'),y=Math.floor(this.parentNode.parentNode.offsetWidth/5)
				for(var i=0;i<x.length;i++)
					if(x[i].offsetWidth>y)y=x[i].offsetWidth
				if(!y)return
				if(y>250)y=250
				for(var i=0;i<x.length;i++)
					x[i].style.width=y+'px'
					
				})
			)
		)
	}
for(;i<arguments.length;i+=2){
	if(!arguments[i] || !arguments[i+1])continue
	var k = arguments[i],v = arguments[i+1]
	u.insertBefore(
		_$('/li')._.css('width','auto')._.add(
			(k.constructor==String)?_$('/label').$0('innerHTML',k):_$('/label')._.add(k),
			_$('/span')._.add(' : ',v)._.css('color','gray')
			),
		u.lastChild
		)
	}

return u
},//fe

_genBlock :function(id,name,info,o){
return commonui.genStdBlock_a ('ucp'+id,name,info,o)
}//fe

}//ce
