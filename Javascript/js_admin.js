if(!window.adminui)
	adminui = {};



adminui.getValue = function(f,n){
var x = f.elements.namedItem(n)
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

adminui.txt = function(x){
return document.createTextNode(x)
}


adminui.deltopic = function(e,tid)
{
return this.movetopic(e,tid,1)
var d = "<option value=''>立刻</option>"
for (var i=0.5;i<24;i+=0.5)
	d+="<option value='"+(i*3600)+"'>"+i+"小时后</option>"

this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent( "\
	<form action='' method='post' target = 'adminwindowiframe'>\
	<b>在“已删除主题”中显示</b><br/>\
	<input type='radio' name='logdel' value='1'>是 <input type='radio' name='logdel' value='0' checked='checked'>否<br/>\
	<br/>\
	<b>延时删除</b> <select name='delay'>"+d+"</select>删除<br/>\
	<br/>\
	<b>PM</b><br/>\
	<input type='radio' name='pm' value='1'>是 <input type='radio' name='pm' value='0' checked='checked'>否<br/>\
	<textarea name='info' rows='3' cols='20'></textarea><br/>\
	<br/>\
	</form>\
	<button type='button' onclick='var tmp = this.parentNode.getElementsByTagName(\"form\")[0];tmp.action = \"nuke.php?func=deltopic&tid="+tid+"\";tmp.submit()'>删除主题</button> <button type='button' onclick='adminui.hide()'>取消</button><br/>\
	<button type='button' onclick='var tmp = this.parentNode.getElementsByTagName(\"form\")[0];tmp.action = \"nuke.php?func=deltopicquote&tid="+tid+"\";tmp.submit()'>删除镜像</button>\
	<iframe name='adminwindowiframe' id='adminwindowiframe' scrolling='no' allowtransparency='true' frameBorder=0 src='about:blank' style='height:50px;width:200px;border:none;overflow:hidden'></iframe>\
")
tTip.showdscp(e,this.w);
}
//fe

adminui.pushtopic = function(e,tid)
{
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('提前主题');
this.w._.addContent(		
	_$('/button').$0('innerHTML','提前主题','type','button','onclick',function(){
			__NUKE.doRequest({
				u:__API.topicPush(tid),
				b:this
				})
			}
		)
	)
tTip.showdscp(e,this.w);
}
//fe

adminui.addpoint = function (e,tid,pid,fid)
{
this.createadminwindow()

if (__GP['super'] || fid<0)
	var apinput = "<input type='text' size='10' name='rcvc' value=''>(-1500~1500)";
else
	var apinput = "只需判断好坏，不要考虑具体分数<br/><select name='rcvc'><option value='lv01'>悲剧奖</option><option value='lv02'>安慰奖</option><option value='lv0'>鼓励奖</option><option value='lv1'>好</option><option value='lv2'>很好</option><option value='lv3'>巨好</option><option value='lv-1' style='background:#fdd'>不好</option><option value='lv-2' style='background:#fdd'>很不好</option><option value='lv-3' style='background:#fdd'>巨不好</option></select>";
this.w._.addContent(null)
this.w._.addContent( "\
	<form action='' target='_blank' method='post'>\
	<table>\
		<tr>\
			<td>\
				声望\
			</td>\
			<td>\
				"+apinput+"\
			</td>\
		</tr>\
		<tr>\
			<td>\
				理由\
			</td>\
			<td>\
				<input type='text' size='10' name='info' value=''>\
			</td>\
		</tr>\
		<tr>\
			<td>\
				PM\
			</td>\
			<td>\
				<input type='radio' name='pm' value='1' checked='checked'>是\
				<input type='radio' name='pm' value=''>否\
			</td>\
		</tr>\
		<tr>\
			<td>\
				增加金钱\
			</td>\
			<td>\
				<input type='radio' name='addmoney' value='1' checked='checked'>是\
				<input type='radio' name='addmoney' value=''>否\
			</td>\
		</tr>\
		<tr>\
			<td>\
				增加威望\
			</td>\
			<td>\
				<input type='radio' name='norvrc' value='' checked='checked'>是\
				<input type='radio' name='norvrc' value='1'>否\
			</td>\
		</tr>\
		<tr>\
			<td colspan=2>\
				<input name='submit' value='提交' type='submit'> <input value='取消' type='button' onclick='adminui.hide()'><br/>\
				请勿连续对一个帖子加分或扣分，如需超标准加分或扣分请使用举报或直接联络超版\
			</td>\
		</tr>\
	</table>\
	</form>\
	<iframe name='adminwindowiframe' id='adminwindowiframe' scrolling='no' frameBorder=0 allowtransparency='true' src='./nuke.php?func=addpoint&f=show_add_point_left&fid="+fid+"' style='height:150px;width:330px;border:none;overflow:hidden'></iframe>\
")
this.w.getElementsByTagName('form')[0].action = 'nuke.php?func=addpoint&tid='+tid+'&pid='+pid;
this.w.getElementsByTagName('form')[0].target = 'adminwindowiframe';
tTip.showdscp(e,this.w);
	
}
//fe

adminui.createadminwindow = function(id)
{
if(this.w)return
this.w = commonui.createCommmonWindow()
if(!id)
	this.w.id = 'adminwindow';
else
	this.w.id = id;
if($('massAdminForm')) $('massAdminForm').appendChild(this.w);
else document.body.appendChild(this.w);
}
//fe

adminui.hide=function (){
this.w.style.display='none'
}//fe

adminui.toptopic = function (e,tid)
{

this.createadminwindow()
this.w._.addContent(null)
var $ = _$, t = this.txt, v=this.getValue, de=null,tid = tid
this.w._.addTitle('主题置顶');

this.w._.addContent(
	$('/form').$0(
		$('/input').$0('type','radio','name','level','value','0'),t(' 解除'),
		$('/br'),
		$('/br'),
		$('/input').$0('type','radio','name','level','value','9'),t(' 版面内直接显示'),
		$('/br'),
		t('将 主题内容 显示在版头'),
		$('/br'),
		$('/br'),
		$('/input').$0('type','radio','name','level','value','1'),t(' 普通置顶'),
		$('/br'),
		t('将主题的标题显示在版头下部'),
		$('/br'),
		t('修改时间最近的一个普通置顶会持续一周显示在版面第一页'),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				var f = this.parentNode.getElementsByTagName('input'),level=0
				for(var i=0;i<f.length;i++){
					if(f[i].checked)
						level= f[i].value
					}
				__NUKE.doRequest({
					u:__API.topicTop(tid,level),
					b:this
					})
				}
			)
		)
	)
this.w._.show(e)
}
//fe

adminui.colortopic = function (e,tid)
{
this.createadminwindow()
this.w._.addContent(null)
var $ = _$, t = this.txt, v=this.getValue, de=null,tid = tid
this.w._.addTitle('改变标题字体');

this.w._.addContent(
	$('/form').$0(
		$('/input').$0('type','checkbox','name','fontB','value','B'),t(' 粗体'),
		$('/br'),
		$('/input').$0('type','checkbox','name','fontI','value','I'),t(' 斜体'),
		$('/br'),
		$('/input').$0('type','checkbox','name','fontU','value','U'),t('下划线'),
		$('/br'),$('/br'),
		$('/input').$0('type','radio','name','color','value','red'),$('/span').$0('class','red','innerHTML',' 红色'),
		$('/br'),
		$('/input').$0('type','radio','name','color','value','blue'),$('/span').$0('class','blue','innerHTML',' 蓝色'),
		$('/br'),
		$('/input').$0('type','radio','name','color','value','green'),$('/span').$0('class','green','innerHTML',' 绿色'),
		$('/br'),
		$('/input').$0('type','radio','name','color','value','orange'),$('/span').$0('class','orange','innerHTML',' 橙色'),
		$('/br'),
		$('/input').$0('type','radio','name','color','value','silver'),$('/span').$0('class','silver','innerHTML',' 银色'),
		$('/br'),
		$('/input').$0('type','radio','name','color','value',''),t(' 无'),
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				var f = this.parentNode.getElementsByTagName('input'),set=''
				for(var i=0;i<f.length;i++){
					if(f[i].checked)
						set+=','+f[i].value
					}
				__NUKE.doRequest({
					u:__API.topicColor(tid,set),
					b:this
					})
				}
			)
		)
	)
this.w._.show(e)

}
//fe
/*
adminui.locktopic = function (e,tid)
{
this.createadminwindow()
this.w._.addContent(null)
var $ = _$, t = this.txt, v=this.getValue, de=null,tid = tid
this.w._.addTitle('锁定'+(tid?'':'选中的')+'主题');

if(tid){
	de = $('/select').$0('name','delay')
	de.$0($('/option').$0('value','','innerHTML','立刻'))
	for (var i=0.5;i<24;i+=0.5)
		de.$0($('/option').$0('value',i*3600,'innerHTML',i+"小时后"))
	
	var de = $('/span').$0(
		de,t(' 锁定'),$('/br'),$('/br')
		)
	}

this.w._.addContent(
	$('/form').$0(
		de,
		$('/select').$0('name','lock',
			$('/option').$0('value','0','innerHTML','解除锁定'),
			$('/option').$0('value','-1','innerHTML','解除锁定和隐藏'),
			$('/option').$0('value','1','innerHTML','锁定'),
			$('/option').$0('value','2','innerHTML','锁定并隐藏内容'),
			__GP.admin ? $('/option').$0('value','3','innerHTML','孤立') : null,
			$('/option').$0('value','4','innerHTML','不在联合版面中显示'),
			$('/option').$0('value','5','innerHTML','合集锁定'),
			$('/option').$0('value','-2','innerHTML','回复不受注册时间限制'),
			window.__GP['super'] ? $('/option').$0('value','-3','innerHTML','未激活用户可以回复') :null,
			window.__GP['super'] ? $('/option').$0('value','-4','innerHTML','禁言用户可以回复') :null
			),
		$('/br'),$('/br'),
		$('/input').$0('type','checkbox','name','pm'),t(' 给用户发送短消息'),
		$('/br'),
		$('/textarea').$0('name','info','rows','3','cols','20'),
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				var f = this.parentNode
				if(!tid){
					var tids = commonui.massAdmin.getChecked()
					if(!tids)return
					}
				__NUKE.doRequest({
					u:__API.topicLock(tid ? tid : tids, v(f,'lock'),  v(f,'pm'), v(f,'info'), tid?v(f,'delay'):'', window.__CURRENT_FID?__CURRENT_FID:''),
					b:this
					})
				}
			)
		)
	)
this.w._.show(e)
}
*/
//fe


adminui.reputationLevel = function (e,fid)
{
this.createadminwindow()
this.w._.addContent(null)
var $ = _$, level;
this.w._.addTitle('声望级别');
this.w._.addContent(
	'用户根据声望不同显示为不同的等级',
	$('/br'),
	'依次填入等级名称和此等级所需的声望下限(用户声望在-21000~21000之间)',
	$('/br'),
	'等级名最长16 byte(8个汉字) 宽度超过4个汉字可能在较小的显示器上无法完全显示',
	$('/br'),
	'每行一个 总数不能超过30个 修改后可能不会马上生效(缓存)',
	$('/br'),
	'例如:',
	$('/br'),
	$('/span').$0('className','gray')._.add(
		'渣滓 -21000',
		$('/br'),
		'废柴 0',
		$('/br'),
		'强者 10000',
		$('/br'),
		'逆天强者 20000'
		),
	$('/br'),
	'意为 声望-21000~-1为渣滓 0~9999为废柴 10000~19999为强者 20000以上为逆天强者',
	$('/br'),
	$('/br'),
	level = $('/textarea').$0('name','level','rows','10','cols','30'),
	$('/br'),
	$('/button').$0('innerHTML','确定','type','button','onclick',function(){
			var t = level.value.replace(/^\s+|\s+$/,'')
			__NUKE.doRequest({
				u:__API.reputationLevelSet(fid,t),
				b:this
				})
			}
		)

	)
__NUKE.doRequest({
	u:__API.reputationLevel(fid),
	f:function(d){
		if(d.error)
			return alert(d.error[0])
		if(d.data && d.data[0]){
			var x = d.data[0].substr(0,1)
			if(x=='[' || x=='{'){
				eval('var x='+d.data[0])
				var y=''
				for (var i=0;i<x.length;i++)
					y+=x[i].n+' '+x[i].r+"\n"
				level.value=y
				}
			}

		}//fe
	})
this.w._.show(e)
}
//fe

adminui.digesttopic = function (e,tid)
{
this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent("\
<div><div><div>\
	<form action='' target='_blank' method='post'>\
	<table>\
		<tr>\
			<td>\
				精华\
			</td>\
			<td>\
				<input type='radio' name='digest' value='0' checked>取消\
				<input type='radio' name='digest' value='1' >精华1\
				<input type='radio' name='digest' value='2' >精华2\
			</td>\
		</tr>\
		<tr>\
			<td>\
				PM\
			</td>\
			<td>\
				<input type='radio' name='pm' value='1'>是\
				<input type='radio' name='pm' value='0' checked='checked'>否\
			</td>\
		</tr>\
		<tr>\
			<td colspan=2>\
				<input name='submit' value='提交' type='submit'> <input value='取消' type='button' onclick='adminui.hide()'>\
			</td>\
		</tr>\
	</table>\
	</form>\
	<iframe name='adminwindowiframe' id='adminwindowiframe' frameBorder=0 scrolling='no' allowtransparency='true' src='about:blank' style='height:50px;width:200px;border:none;overflow:hidden'></iframe>\
</div></div></div>\
")
this.w.getElementsByTagName('form')[0].action = 'nuke.php?func=digesttopic&tid='+tid;
this.w.getElementsByTagName('form')[0].target = 'adminwindowiframe';
tTip.showdscp(e,this.w);

}
//fe


adminui.movetopic = function (e,tid,op)
{
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('删除/移动/镜像 '+(tid?'':'选中的')+'主题');

var $ = _$, fid='', stid='', info, pm, de, sl, am, aq, af, ad, ao, cl = function(e,h){
	fid = h[0]
	if(h[5]){
		stid = h[5]
		sl.innerHTML = '到 > '+h[6]
		}
	else{
		stid = ''
		sl.innerHTML = '到 > '+h[1]
		}
	commonui.adminwindow._.hide(e)
	commonui.cancelEvent(e)
	return false
	}, icl = function(f,s){
	if(f){
		stid=''
		fid = f
		sl.innerHTML = '到 > FID:'+f
		}
	else if(s){
		fid=''
		stid=s
		sl.innerHTML = '到 > STID:'+s
		}
	}, oc = function(){
	if(this.checked){
		if(this.value=='ad' || this.value=='ao')
			sl.disabled=1
		else
			sl.disabled=0
		}
	}

this.w._.addContent(
	$('/span')._.add(
		de = $('/select').$0($('/option').$0('value','','innerHTML','立刻'),$('/option').$0('value',30,'innerHTML','30秒后')),
		$('/br'),$('/br'),
		am = $('/input').$0('type','radio','name','action','onchange',oc),'移动 ',
		ad = $('/input').$0('type','radio','name','action','value','ad','onchange',oc),'删除 ',
		ao = $('/input').$0('type','radio','name','action','value','ao','onchange',oc),'移出集合 ',
		$('/br'),
		aq = $('/input').$0('type','radio','name','action','title','在另一版面新建镜像主题 与本主题保持同步','onchange',oc),'镜像 ',
		af = $('/input').$0('type','radio','name','action','title','将主题移动到另一版面 在本版新建镜像','onchange',oc),'反向镜像',
		$('/br'),$('/br'),
		sl = $('/button').$0('innerHTML','到...','onclick',function(e){
			var c = commonui
			c.createadminwindow()
			c.adminwindow._.addContent(null)
			c.adminwindow._.addContent(
				$('/input').$0('value','版面ID','name','no','maxlength','20','onfocus',function(){if(!this.name)return;this.name='',this.value=''},'onchange',function(){icl(this.value)}),$('/br'),
				$('/input').$0('value','或主题集合ID','name','no','maxlength','20','onfocus',function(){if(!this.name)return;this.name='',this.value=''},'onchange',function(){icl(0,this.value)}),$('/br'),
				c.genHisLink(c.userCache.get('ForumViewHis'),cl) 
				)
			c.adminwindow._.show(e)
			}),
		//$('/br'),$('/br'),
		//$('/input').$0('type','checkbox','name','tag'),t(' 在原版保留一个链接'),
		$('/br'),$('/br'),
		info = $('/input').$0('value','操作说明','style',{color:'silver'},'name','no','maxlength','20','onfocus',function(){if(!this.name)return;this.name='',this.value='',this.style.color=''}),
		$('/br'),$('/br'),
		pm = $('/input').$0('type','checkbox'),' 同时将说明发送给用户',
		$('/br'),$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				if(!tid){
					var tids = commonui.massAdmin.getChecked()
					if(!tids)return
					}
				var op = ''
				if(ad.checked)
					op = 1
				else if(ao.checked)
					op = 2
				else if(aq.checked)
					op = 4
				else if(af.checked)
					op = 8
				__NUKE.doRequest({
					u:__API.topicMove2(
						tid ? tid : tids, 
						fid, 
						pm.checked ? 1 : '', 
						info.name=='no' ? '' : info.value, 
						op, 
						de.value, stid
						),
					b:this
					})
				}
			)
		)
	)
		
for (var i=0.5;i<24;i+=0.5)
	de.$0($('/option').$0('value',i*3600,'innerHTML',i+"小时后"))

if(op==1)
	ad.checked=1, sl.disabled=1
else if(op==2)
	aq.checked=1
else
	am.checked=1

this.w._.show(e)
}
//fe

/*
adminui.movetopic = function (e,tid)
{
this.createadminwindow()
this.w._.addContent(null)
var $ = _$, t = this.txt, v=this.getValue, de=null,tid = tid
this.w._.addTitle('移动'+(tid?'':'选中的')+'主题');

if(tid){
	de = $('/select').$0('name','delay')
	de.$0($('/option').$0('value','','innerHTML','立刻'),$('/option').$0('value',30,'innerHTML','30秒后'))
	for (var i=0.5;i<24;i+=0.5)
		de.$0($('/option').$0('value',i*3600,'innerHTML',i+"小时后"))
	
	var de = $('/span').$0(
		de,t(' 移动到'),$('/br'),$('/br')
		)
	}

this.w._.addContent(
	$('/form').$0(
		de,
		$('/input').$0('style','display:none'),
		$('/select').$0('style','display:none'),
		$('/span').$0(
			$('/a').$0('innerHTML','选择版面','href','javascript:void(0)','onclick',function(){
				var tmp=this.parentNode.previousSibling;
				commonui.onloadforumlist(tmp);
				tmp.style.display="";
				tmp.name="fid";
				this.parentNode.style.display="none"}),
			t(' 或 '),
			$('/a').$0('innerHTML','指定版面ID','href','javascript:void(0)','onclick',function(){
				var tmp=this.parentNode.previousSibling.previousSibling;
				tmp.style.display="";
				tmp.name="fid";
				this.parentNode.style.display="none"}),
			t(' 或 '),
			$('/a').$0('innerHTML','指定主题集合ID','href','javascript:void(0)','onclick',function(){
				var tmp=this.parentNode.previousSibling.previousSibling;
				tmp.style.display="";
				tmp.name="stid";
				this.parentNode.style.display="none"}),
			t(' 或 '),
			$('/a').$0('innerHTML','移出主题集合','href','javascript:void(0)','onclick',function(){
				var tmp=this.parentNode.previousSibling;
				tmp.name="stid";
				tmp.options.innerHTML='';
				tmp.options.length=0;
				var x = document.createElement('option');
				x.value='-1'
				x.innerHTML='移出主题集合'
				tmp.appendChild(x)
				tmp.style.display="";
				this.parentNode.style.display="none"})
			),
		$('/br'),$('/br'),
		$('/input').$0('type','checkbox','name','tag'),t(' 在原版保留一个链接'),
		$('/br'),$('/br'),
		$('/input').$0('type','checkbox','name','pm'),t(' 给用户发送短消息'),
		$('/br'),
		$('/textarea').$0('name','info','rows','3','cols','20'),
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				var f = this.parentNode
				if(!tid){
					var tids = commonui.massAdmin.getChecked()
					if(!tids)return
					}
				__NUKE.doRequest({
					u:__API.topicMove(tid ? tid : tids, v(f,'fid'), v(f,'pm'), v(f,'info'), v(f,'tag')?'':1, tid?v(f,'delay'):''),
					b:this
					})
				}
			)
		)
	)
this.w._.show(e)
}
//fe
*/
adminui.muteuser = function (e,uid)
{
this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent("\
<div><div><div>\
	<form action='' target='_blank' method='post'>\
	<table>\
		<tr>\
			<td colspan=2>\
				禁言/解除禁言\
			</td>\
		</tr>\
		<tr>\
			<td>\
				天数\
			</td>\
			<td>\
				<input type='text' name='days' value=''/><br/>留空提交即可解除禁言\
				<input type='hidden' name='uid' value='"+uid+"'/>\
			</td>\
		</tr>\
		<tr>\
			<td>\
				理由\
			</td>\
			<td>\
				<input type='text' name='dscp' value=''/>\
			</td>\
		</tr>\
		<tr>\
			<td colspan=2>\
				<input name='submit' value='提交' type='submit'> <input value='取消' type='button' onclick='adminui.hide()'>\
			</td>\
		</tr>\
	</table>\
	</form>\
	<iframe name='adminwindowiframe' id='adminwindowiframe' frameBorder=0 scrolling='no' allowtransparency='true' src='about:blank' style='height:50px;width:200px;border:none;overflow:hidden'></iframe>\
</div></div></div>\
")
this.w.getElementsByTagName('form')[0].action = 'nuke.php?func=muteuser';
this.w.getElementsByTagName('form')[0].target = 'adminwindowiframe';
tTip.showdscp(e,this.w);

}
//fe

adminui.quotetopic = function (e,tid)
{
return this.movetopic(e,tid,2)
this.createadminwindow()
this.w._.addContent(null)
var $ = _$, t = this.txt, v=this.getValue, tid = tid
this.w._.addTitle('镜像主题');

this.w._.addContent(
	$('/form').$0(
		$('/input').$0('style','display:none'),
		$('/select').$0('style','display:none'),
		$('/span').$0(
			$('/a').$0('innerHTML','选择版面','href','javascript:void(0)','onclick',function(){
				var tmp=this.parentNode.previousSibling;
				commonui.onloadforumlist(tmp);
				tmp.style.display="";
				tmp.name="fid";
				this.parentNode.style.display="none"}),
			t(' 或 '),
			$('/a').$0('innerHTML','指定版面ID','href','javascript:void(0)','onclick',function(){
				var tmp=this.parentNode.previousSibling.previousSibling;
				tmp.style.display="";
				tmp.name="fid";
				this.parentNode.style.display="none"})
			),
		$('/br'),$('/br'),
		$('/input').$0('type','checkbox','name','mode'),t(' 主题移至所选版面并在原版面创建镜像'),
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				var f = this.parentNode
				__NUKE.doRequest({
					u:__API.topicQuote(tid , v(f,'fid'), v(f,'mode')),
					b:this
					})
				}
			)
		)
	)
this.w._.show(e)

}
//fe

adminui.delmass = function (e)
{
return this.movetopic(e,null,1)
this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent("\
<div><div><div>\
	<form action='nuke.php?func=massdeltopic' target='adminwindowiframe' method='post'><table>\
		<tr>\
			<td>\
				在“已删除主题”中显示<br/>\
				<input type='radio' name='logdel' value='1'>是\
				<input type='radio' name='logdel' value='0' checked='checked'>否\
			</td>\
		</tr>\
		<tr>\
			<td>\
				PM<br/>\
				<input type='radio' name='pm' value='1'>是\
				<input type='radio' name='pm' value='0' checked='checked'>否\
			</td>\
		</tr>\
		<tr>\
			<td>\
				<textarea name='info' rows='3' cols='20'></textarea>\
			</td>\
		</tr>\
		<tr>\
			<td>\
				<input value='' type='hidden' name='tidarray'><button type='button' onclick='if(this.previousSibling.value=commonui.massAdmin.getChecked())this.previousSibling.form.submit()'>删除</button> <button type='button' onclick='adminui.hide()'>关闭</button>\
			</td>\
		</tr>\
	</table></form>\
	<iframe name='adminwindowiframe' id='adminwindowiframe' frameBorder=0 scrolling='no' allowtransparency='true' src='about:blank' style='height:50px;width:200px;border:none;overflow:hidden'></iframe>\
</div></div></div>\
")

tTip.showdscp(e,this.w);

}

adminui.unselectCheckBox = function(){commonui.unselectCheckBox()}

adminui.movemass = function (e){
this.movetopic(e)
}

adminui.setNewUserPostLimit = function(e,fid){
var y
this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent(
	"新注册用户在注册",
	y = _$('/select').$0(
		_$('/option').$0('value','','innerHTML','全局默认'),
		_$('/option').$0('value','48','innerHTML','48小时'),
		_$('/option').$0('value','24','innerHTML','24小时'),
		_$('/option').$0('value','12','innerHTML','12小时'),
		_$('/option').$0('value','6','innerHTML','6小时'),
		_$('/option').$0('value','1','innerHTML','1小时'),
		_$('/option').$0('value','0.01','innerHTML','半分钟')
		),
	"后可以在本版发帖",
	_$('/br'),
	_$('/button')._.attr({innerHTML:'确定',type:'button'})._.on('click',function(){
			var x = y.options[y.selectedIndex].value
			__NUKE.doRequest({
				u:{u:__API._base+'__lib=modify_forum&__act=set_post_limit&raw=3',
					a:{hour:x,fid:fid}
					},
				b:this,
				f:function(d){
					if(d.error)
						return alert(d.error[0])
					alert(d.data[0])
					}
				})
			}
		)
	)
this.w._.show(e)
}//fe

adminui.setForumPic = function(e){
this.createadminwindow()
this.w._.addContent(null)
if(!window.__GP.admin){
	this.w._.addContent("设置版面的背景图",
		_$('/br'),
		'发帖将图片上传为附件(不要加水印)注明版面ID 并召唤管理员审核',
		_$('/br'),
		'图片高度190像素 宽度1600像素或以上 主体在左侧 图片大小不超过85k',
		_$('/br'),
		'或图片宽度190像素 高度1600像素或以上',
		_$('/br'),
		'或同时提供两种(屏幕宽度超过1440像素时使用纵向图 其他情况使用横向图)'
		)
	tTip.showdscp(e,this.w);
	return
	}
this.w._.addContent(
	'设置版面的背景图',
	_$('/br'),
	_$('/input')._.attr('size',20),
	_$('/span').$0('innerHTML','版面ID'),
	_$('/br'),
	_$('/input')._.attr('size',20),
	_$('/span').$0('innerHTML','图片地址(只限附件)'),
	_$('/br'),
	_$('/button')._.attr({innerHTML:'确定',type:'button'})._.on('click',function(){
			var fid = this.parentNode.getElementsByTagName('input'), p = fid[1].value.replace(/^http:\/\/.+?\//,'/'), fid=fid[0].value, o = this
			__NUKE.doRequest({
				u:'/nuke.php?raw=1&__lib=forum_pic&__act=forum_pic&fid='+fid+'&file='+encodeURIComponent(p),
				b:this,
				f:function(d){
					if(d.error)
						return alert(d.error[0])
					alert('done')
					}
				})
			}
		)
	)
tTip.showdscp(e,this.w);
}

adminui.nukeUi = function(e,uid,tid,pid){
var _MODE_NUKE =1 //nuke to -1
,_MODE_UNACTIVE = 2 //nuke to 0
, _MODE_LOCK = 4//nuke to -2
,  _MODE_MUTE = 8 //禁言
,  _MODE_DELPOST = 16 //删帖
,  _MODE_ANONC = 32 //发帖公告
, _MODE_BLOCK_IP_M0 = 64
, _MODE_BLOCK_IP_M3 = 128
, _MODE_BLOCK_IP_M4 = 192
, _MODE_BLOCK_IP_M5 = 256
, _MODE_BLOCK_IP_M6 = 320
, _MODE_BLOCK_IP_M7 = 384
, _MODE_BLOCK_IP_M8 = 448
, _MODE_BLOCK_IP_M9 = 512
, _MODE_BLOCK_IP_M10 = 576
, _MODE_BLOCK_IP_M11 = 640
, _MODE_BLOCK_IP_M12 = 704
, _MODE_BLOCK_IP_M13 = 768
, _MODE_BLOCK_IP_M14 = 832
, _MODE_BLOCK_IP_M15 = 896
, _MODE_BLOCK_IP_M16 = 960
, _MODE_BLOCK_IP_DAY2 = 1024
, _MODE_BLOCK_IP_DAY4 = 2048
, _MODE_BLOCK_IP_DAY6 = 3072
, _MODE_BLOCK_IP_DAY8 = 4096
, _MODE_BLOCK_IP_DAY10 = 5120
, _MODE_BLOCK_IP_DAY12 = 6144
, _MODE_BLOCK_IP_DAY14 = 7168
, _MODE_BLOCK_IP_DAY16 = 8192
, _MODE_BLOCK_IP = 9152
, _MODE_BLOCK_IP_ANY = 16384
, _MODE_LOCK_3 = 32768
, _MODE_LOCK_4 = 65536
, _MODE_LOCK_5 = 131072
,$ = _$
,a = function(x,target,count,opt){

	var o = $('/span'),t = target
	if(!opt)
		opt = 0
	if(opt & 1)
		var name = 'ckname'+Math.random()
	for(var i = 0;i<x.length;i++){
		if(!x[i])
			continue
		x[i] = x[i].split('|')
		if(!x[i][1])
			x[i][1]=''
		if(i!=0)
			o._.add(i%count ? ' ' : $('/br'))
		if(opt&1)
			o._.add(
				$('/input').$0('type','radio','name',name,'checked',x[i][2]?1:0,'onclick',function(){t.value=this.title;t.name=''},'title',x[i][1]),
				$('/span').$0('innerHTML',x[i][0])
				)
		else
			o._.add(
				$('/a').$0('href','javascript:void(0)','innerHTML',x[i][0],'onclick',function(){t.value=this.title?this.title:this.innerHTML;t.name=''},'title',x[i][1])
				)
		}
	return o
	}
,info,range,type,ip={},ip1={},ip2={},ip3={},mute,anonc,mass
this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent($('/span')._.add(

$('/span')._.add(
	'UID 换行 空格 逗号分隔',$('/br'),
	mass = $('/textarea').$0('value',uid,'disabled',__GP.admin?0:1),$('/br'),$('/br')
	),

info = $('/input').$0('placeholder','操作说明','size',30),$('/br'),
a(['违反版规','多次违反版规','攻击性发言','真实货币交易','违规广告','违规激活','账号被盗'],info,3),$('/br'),
$('/br'),

'此时间后发布的主题与回复将被删除(回复最多删除200条)',range = $('/input').$0('value','24','type','hidden'),$('/br'),
a(['不删除|0','1小时前|1','3小时前|3','6小时前|6','12小时前|12','24小时前|24|1','72小时前|72','1周前|168',(__GP.admin ? '删除1000条|1000' : null)],range,3,1),$('/br'),
$('/br'),

'NUKE种类',type = $('/input').$0('value',_MODE_NUKE,'type','hidden'),$('/br'),
a(['普通NUKE|'+_MODE_NUKE+'|1',
	'锁定账号(被盗/广告/只能人工解锁)|'+_MODE_LOCK,
	'无操作|0',
	'锁定账号(被盗/邮箱重置密码可解锁)|'+_MODE_LOCK_3,
	'取消激活|'+_MODE_UNACTIVE,
//	'禁言1000天|'+_MODE_MUTE,
	'无操作|0',
	'锁定账号(可能被盗/修改密码可解锁)|'+_MODE_LOCK_4,
	'无操作|0',
	'无操作|0',
	'锁定账号(未被盗/机器人/广告/不能解锁)|'+_MODE_LOCK_5],type,3,1),$('/br'),
$('/br'),

(__GP.admin ? $('/span')._.add(
	'封禁ip',$('/br'),
	ip = $('/input').$0('size',20),$('/br'),
	
	'过滤ip类型',ip1 = $('/input').$0('type','hidden','value',0),$('/br'),
	a(['单ip|'+_MODE_BLOCK_IP_M0,
		'mask 8 bit|'+_MODE_BLOCK_IP_M8,
		'mask 11 bit|'+_MODE_BLOCK_IP_M11], ip1, 4, 1),$('/br'),

	'封禁ip时长',ip2 = $('/input').$0('type','hidden','value',0),$('/br'),
	a(['2天|'+_MODE_BLOCK_IP_DAY2,
		'4天|'+_MODE_BLOCK_IP_DAY4,
		'6天|'+_MODE_BLOCK_IP_DAY6,
		'8天|'+_MODE_BLOCK_IP_DAY8], ip2, 4, 1),$('/br'),

	'封禁ip类型',ip3 = $('/input').$0('type','hidden','value',0),$('/br'),
	a(['数目|0',	'任意|'+_MODE_BLOCK_IP_ANY], ip3, 3, 1),$('/br'),$('/br')
	
	) : ''),
	
mute = $('/input').$0('type','checkbox','checked',1),'附带禁言30天',$('/br'),
//anonc = $('/input').$0('type','checkbox'),'发贴公告',$('/br'),
$('/br'),

$('/button').$0('innerHTML','NUKE','onclick',function(){
	var m = 0,limit=''
	if(info.name=='x')
		info.value=''
	if(range.value==1000){
		limit = 1000
		range.value=''
		}
	if(type.value)
		m |= __NUKE.toInt(type.value)
	if(ip1.value)
		m |= __NUKE.toInt(ip1.value)
	if(ip2.value)
		m |= __NUKE.toInt(ip2.value)
	if(ip3.value)
		m |= __NUKE.toInt(ip3.value)
	if(mute.checked)
		m |= _MODE_MUTE
	//if(anonc.checked)
	//	m |= _MODE_ANONC
	//console.log([uid,tid,pid,info.value,'',range.value,limit,m,ip.value])

	var nr = mass.value.match(/\d+/g)
	if(!nr)return
	adminui.nukeQueue = nr
	adminui.nukeArg = [0,tid,pid,info.value,'',range.value,limit,m,ip.value?ip.value:'']
	var nu = function(){
		var uu = adminui.nukeQueue.shift();
		if(!parseInt(uu,10))
			return alert('all done')
		var a = adminui.nukeArg
		__NUKE.doRequest({
			u:__API.nuke(
				uu,
				a[1],
				a[2],
				a[3],
				a[4],
				a[5],
				a[6],
				a[7],
				a[8]
				),
			b:this,
			f:function(d){//如有.error则显示.error 否则显示.data
				if(!d)
					return
				var x,y='';
				if(d.error)
					x= d.error
				else if(d.data)
					x=d.data
				if(!x)
					x={0:'ERROR NO DATA'}
				if(typeof x=='string')
					y=x
				else{
					for(var k in x)
						y+=x[k]+'\n'
					}
				console.log('uid:'+uu+' '+y)
				window.setTimeout(nu,100)
				return true
				}
			})
		}//fe
	nu()
		
	//else{
	//	__NUKE.doRequest({
	//		u:__API.nuke(uid,tid,pid,info.value,'',range.value,limit,m,ip.value?ip.value:''),
	//		b:this
	//		})
	//	}
	}),

(uid && (__GP.userBit & 1024) ? $('/span')._.add(
	$('/br'),
	$('/br'),
	$('/button').$0('innerHTML','解除锁定','onclick',function(){
		__NUKE.doRequest({
			u:{u:__API._base+'__lib=nuke&__act=reactive&raw=3',
				a:{uid:uid,clear:(0 | (this.nextSibling.checked?1:0) | (this.nextSibling.nextSibling.nextSibling.checked?2:0))}
				},
			b:this
			})
		}), 
	$('/input').$0('type','checkbox'),
	$('/span')._.add('金钱清0 '),
	$('/input').$0('type','checkbox'),
	'威望清0'
	) : ''),
(uid && (__GP.userBit & 1024) ? $('/span')._.add(
	$('/br'),
	$('/br'),
	$('/button').$0('innerHTML','发送建议修改密码的PM','onclick',function(){
		__NUKE.doRequest({
			u:{u:__API._base+'__lib=nuke&__act=send_pm&raw=3',
				a:{uid:uid}
				},
			b:this
			})
		})
	) : '')
))//add



this.w._.show(e)

}
//fe

adminui.setLogword = function(e,fid){
if(!fid && !__GP.ubStaff)
	return
var keys,$=_$
this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent(
	$('/span')._.add(
		'填入关键词(2~20字节) 空格或换行分隔',
		$('/br'),
		fid ? '最多50个 有关键词出现的帖子将有标记 并出现在监视记录中' : '最多10个 有全局关键词出现的帖子会发送提醒至全部staff权限组',
		$('/br'),
		keys = $('/textarea'),
		$('/br'),
		$('/button').$0('innerHTML','提交','onclick',function(){
			var k = keys.value.replace(/^\s+|\s+$/g,'')
			if(k==='')
				return
			__NUKE.doRequest({
				u:{u:__API._base+'__lib=log_post&__act=set&fid='+fid,
					a:{key:k,raw:3}
					},
				b:this
				})
			})
		//__GP.staff ? $('/a').$0('innerHTML','[设置全局监视关键词]','href','javascript:void(0)','className','b','onclick',function(){adminui.setLogword(e,0)}) : null
		)
	)
__NUKE.doRequest({
	u:__API._base+'__lib=log_post&__act=get&raw=1&fid='+fid,
	b:this,
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		d = (typeof d.data[0]=='object') ? d.data[0] : d.data
		for(var k in d)
			keys.value += d[k]+' '
		}
	})
this.w._.show(e)
}//fe


adminui.serverDebug = function(e){


var libs,acts,query,$=_$

this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent(
	$('/span')._.add(
		query = $('/textarea'),
		$('/br'),
		$('/button').$0('innerHTML','POST','onclick',function(){
			var q = query.value.replace(/\n/g,' ').replace(/^\s+|\s+$/g,'')
			if(q==='')
				return
			__NUKE.doRequest({
				u:{u:__API._base+q,
					a:{raw:3}
					},
				b:this,
				f:function(d){console.log(d)}
				})
			}),
		' 换行会替换为空格',
		$('/br'),
		$('/table')._.add(
			$('/tr')._.add(
				libs=$('/td').$0('style',{height:'20em',overflow:'scroll',verticalAlign:'top'}),
				acts=$('/td').$0('style',{height:'20em',overflow:'scroll',verticalAlign:'top'})
				)
			)
		)
	)
this.w._.show(e)

__NUKE.doRequest({
	u:__API._base+'__lib=temp&__act=list_lib&raw=1',
	f:function(d){//如有.error则显示.error 否则显示.data

		if(!d)
			return

		if(d.error)
			return alert(d.error[0])

		try{
			var x=d.data[0]
		}catch(e){
			return alert('ERROR NO DATA')
			}
		
		for(var i in x){

			libs._.add(
				$('/a').$0('href','javascript:void(0)','innerHTML',x[i],'onclick',function(){
					var lib = this.innerHTML
					acts.innerHTML='';
					__NUKE.doRequest({
						u:__API._base+'__lib=temp&__act=list_lib&lib='+lib+'&raw=1',
						f:function(d){//如有.error则显示.error 否则显示.data
							if(!d)
								return

							if(d.error)
								return alert(d.error)

							try{
								var y=d.data[0]
							}catch(e){
								return alert('ERROR NO DATA')
								}

							for(var j in y){

								acts._.add(
									$('/a').$0('href','javascript:void(0)','innerHTML',y[j],'onclick',function(){
										query.value='__lib='+lib+'&__act='+this.innerHTML+'&'
										}),
									$('/br')
									)
								}

							return true
							}
						})

					}),//a
				$('/br')
				)//libs add

			}//for
		
		return true
		}
	})


}//fe

adminui.modifyForum = function(e,fid){


var fc,rpu,grp,tre

this.createadminwindow()
this.w._.addContent(null)

this.w._.addContent(
	_$('/span')._.add(
		_$('/table')._.add(
			_$('/tr')._.add(
				fc=_$('/td').$0('style',{verticalAlign:'top',paddingRight:'1em'}),
				grp=_$('/td').$0('style',{verticalAlign:'top',paddingRight:'1em'}),
				rpu=_$('/td').$0('style',{verticalAlign:'top',paddingRight:'1em'}),
				tre=_$('/td').$0('style',{verticalAlign:'top',paddingRight:'1em'})
				)
			)
		)
	)
this.w._.show(e)

var _fid,t={71:{}},_NAME = 70,
_BIT = 71,
_ADMIN = 72,
_PARENT_FID = 73,
_SUB_ORDER = 74,
_REPU = 75,
_UNION = 76,
_ALLOW_VISIT = 77,
_ALLOW_POST = 78,
_ALLOW_REPLY = 79,
_DSCP = 80,
_JUMP = 81,
_E_AUTO_TRANS = 1,
_E_LATEST_SET = 2,
_E_FILTER_WORD = 3,
_E_MINOR_ADMIN = 4,
_E_KEY_COLOR = 5,
_E_FORCE_KEY = 6,
_E_OWNER_UID = 7,
_E_UF_ALLOW_VISIT = 8,
_E_UF_ALLOW_POST = 9,
_E_UF_ALLOW_REPLY = 10,
_E_HTML_KEY = 11,
_E_HTML_DSCP = 12,
_E_CUSTOM_LEVEL = 13,
_E_UF_ADMIN = 14,

_B_FREE_EDIT = 16,
_B_DISPLAY_ATTACH = 1024,
_B_SHOW_SUB = 2048,
_B_IF_CAT = 4096


__NUKE.doRequest({
	u:__API._base+'__lib=modify_forum&__act=get&raw=1&fid='+fid,
	f:function(d){//如有.error则显示.error 否则显示.data

		if(!d)
			return

		if(d.error)
			return alert(d.error[0])

		try{
			var x=d.data[0]
		}catch(e){
			return alert('ERROR NO DATA')
			}
		
		for(var k in x.allGroup){
			grp._.add(_$('/a').$0('style',{display:'block'},'href','/nuke.php?func=modifygroup&id='+x.allGroup[k].id,'target','_blank','innerHTML',x.allGroup[k].id+' : '+x.allGroup[k].name))
			}

		for(var k in x.allReputation){
			rpu._.add(_$('/a').$0('style',{display:'block'},'href','/nuke.php?func=modifyreputation&id='+x.allReputation[k].id,'target','_blank','innerHTML',x.allReputation[k].id+' : '+x.allReputation[k].name))
			}

		var y ={}
		
		for(var k in x.allForumTree){
			var z = x.allForumTree[k]
			y[z.fid] = _$('/div').$0(
				'title',z.fup?z.fup:'',
				'style',{marginLeft:'1em'},
				_$('/a').$0('title',z.fid,'href','/thread.php?fid='+z.fid,'innerHTML',z.fid+' : '+z.name,'onclick',function(e){adminui.modifyForum(null,this.title);commonui.cancelEvent(e)})
				)
			}
		for(var k in y){
			if(y[k].title){
				if(!y[y[k].title])
					y[y[k].title] = _$('/div').$0(
						'style',{marginLeft:'1em'},
						_$('/a').$0('title',y[k].title,'href','/thread.php?fid='+y[k].title,'innerHTML',y[k].title+' : ','onclick',function(){adminui.modifyForum(null,this.title)})
						)
				y[y[k].title]._.add(y[k])
				}
			}
		for(var k in y){
			var z = 'purple'
			if(y[k].parentNode){
				z= 'royalblue'
				if(y[k].parentNode.parentNode){
					z= 'teal'
					if(y[k].parentNode.parentNode.parentNode){
						z= 'sienna'
						if(y[k].parentNode.parentNode.parentNode.parentNode)
							z= 'gray'
						}
					}
				}
			y[k].firstChild._.cls(z)
			}
		for(var k in y){
			if(!y[k].title)
				tre._.add(y[k].$0(
						'style',{marginLeft:'0'}))
			}

		var y=function(k){return (x.forumData[k]===undefined)?'':x.forumData[k].toString()}
		fc._.add(
			'版面FID(留空为添加新版面',_$('/br'),
			_fid = _$('/input').$0('value',fid),_$('/br'),
			_$('/br'),
			
			'版面名',_$('/br'),
			t[_NAME] = _$('/input').$0('value',y(_NAME)),_$('/br'),
			_$('/br'),
			
			'版面说明(显示用',_$('/br'),
			t[_DSCP] = _$('/textarea').$0('value',y(_DSCP),'style',{width:'25em',height:'5em'}),_$('/br'),
			_$('/br'),
			
			'版面说明(SOE',_$('/br'),
			t[_E_HTML_DSCP] = _$('/textarea').$0('value',y(_E_HTML_DSCP),'style',{width:'25em',height:'5em'}),_$('/br'),
			_$('/br'),
			
			'版面关键字(SOE',_$('/br'),
			t[_E_HTML_KEY] = _$('/textarea').$0('value',y(_E_HTML_KEY),'style',{width:'25em',height:'5em'}),_$('/br'),
			_$('/br'),

			'版面跳转地址',_$('/br'),
			t[_JUMP] = _$('/input').$0('value',y(_JUMP)),_$('/br'),
			_$('/br'),
			
			'排序权重(INT 小的在前',_$('/br'),
			t[_SUB_ORDER] = _$('/input').$0('value',y(_SUB_ORDER)),_$('/br'),
			_$('/br'),
			
			'父版面FID',_$('/br'),
			t[_PARENT_FID] = _$('/input').$0('value',y(_PARENT_FID)),_$('/br'),
			_$('/br'),

			'版面声望ID(多个用逗号分隔',_$('/br'),
			t[_REPU] = _$('/input').$0('value',y(_REPU)),_$('/br'),
			_$('/br'),
			
			'合并显示的版面FID(多个用逗号分隔 前加x默认不显示',_$('/br'),
			t[_UNION] = _$('/input').$0('value',y(_UNION)),_$('/br'),
			_$('/br'),
			
			'所有者UID(是所有者且在版主列表中方可打开用户版面设置功能',_$('/br'),
			t[_E_OWNER_UID] = _$('/input').$0('value',y(_E_OWNER_UID)),_$('/br'),
			_$('/br'),
			
			'版主UID*(每行一个',_$('/br'),
			t[_ADMIN] = _$('/textarea').$0('value',y(_ADMIN).replace(/,/g,'\n'),'style',{width:'25em',height:'20em'}),_$('/br'),
			_$('/textarea').$0(
				'style',{width:'25em',height:'20em'},
				'disabled','disabled',
				'value',(function(){var y='';for(var k in x.adminName)y+=k+' '+x.adminName[k]+'\n';return y})()
				),_$('/br'),
			_$('/br'),
			
			'访问权限*(i 为继承上层版面设置',_$('/br'),
			'其他参考lib_privilege::format_str_to_ary',_$('/br'),
			t[_ALLOW_VISIT] = _$('/input').$0('value',y(_ALLOW_VISIT)),_$('/br'),
			_$('/br'),
			
			'发帖权限*(同上',_$('/br'),
			'+w,+u1,',t[_ALLOW_POST] = _$('/input').$0('value',y(_ALLOW_POST)),_$('/br'),
			_$('/br'),
			
			'回复权限*(同上',_$('/br'),
			'+w,+u1,',t[_ALLOW_REPLY] = _$('/input').$0('value',y(_ALLOW_REPLY)),_$('/br'),
			_$('/br'),
			
			'显示子版面',_$('/br'),
			t[_BIT][_B_SHOW_SUB] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_SHOW_SUB?1:null),_$('/br'),
			_$('/br'),

			'是一个归类版(仅作父版面使用 不能显示 不能发帖',_$('/br'),
			t[_BIT][_B_IF_CAT] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_IF_CAT?1:null),_$('/br'),
			_$('/br'),
			
			'编辑主题不受时限限制',_$('/br'),
			t[_BIT][_B_FREE_EDIT] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_FREE_EDIT?1:null),_$('/br'),
			_$('/br'),
			
			'在列表中显示附件图',_$('/br'),
			t[_BIT][_B_DISPLAY_ATTACH] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_DISPLAY_ATTACH?1:null),_$('/br'),
			_$('/br'),
			
			_$('/button').$0('innerHTML','提交','onclick',function(){
				if(!_fid.value && !confirm('未设置FID将会创建新版面'))
					return
				var a = {}
				for(var k in t){
					if(t[k].nodeName)
						a[k] = t[k].value.replace(/^\s+|\s+$/,'')
					}
				a[_BIT] = [0,0]
				for(var k in t[_BIT]){
					if(t[_BIT][k].checked)
						a[_BIT][0] |= k
					else
						a[_BIT][1] |= k
					}
				a[_BIT] = a[_BIT].join(',')
				__NUKE.doRequest({
					u:{u:__API._base+'__lib=modify_forum&__act=set&raw=3&fid='+(_fid.value?_fid.value:''),
						a:a
						},
					b:this
					})
				}), 
			null
			
			)
		
		return true
		}
	})


}//fe

adminui.setFilter = function(e,fid,opt){

if(!fid)fid=0;
if(!opt)opt=1;

var $=_$,w = $('/span'),f,s
this.createadminwindow()
this.w._.addTitle('关键词监视设置')
this.w._.addContent(null)
this.w._.addContent(w)

__NUKE.doRequest({
	u:__API._base+'__lib=filter&__act=get&opt='+opt+'&raw=1&fid='+fid,
	f:function(d){//如有.error则显示.error 否则显示.data

		if(!d)
			return

		if(d.error)
			return alert(d.error[0])

		if(d.data[0].constructor==Object)
			var x = d.data[0][0],y = d.data[0][1]
		else
			var x = {3:{}},y = {}
		if(!x[4])
			x[4] = {3:{},4:{}}

		w._.add('版面ID ',f=$('/input').$0('size',10,'value',fid),$('/br'),$('/br'))
		w._.add('类型 ',
					s=$('/select').$0(
					$('/option').$0('value','1','innerHTML','提交至审核人员的(管理员设置)','checked',opt==1?1:0),
					$('/option').$0('value','2','innerHTML','提交至版主的(版主设置)','checked',opt==2?1:0),
					$('/option').$0('value','4','innerHTML','自动隐藏的(管理员设置)','checked',opt==4?1:0)
					),
				$('/br'),$('/br'))

		w._.add('以下关键字中命中一个',$('/br'))
		var tmp=''
		for(var k=3;k<1000;k++){
			if(x[3][k]===undefined)
				break
			tmp += y[x[3][k]]+' '
			}
		w._.add($('/textarea').$0('value',tmp))

		for(var i=4; i<1000;i++){
			if(!x[i])
				break
			var m = $('/span')._.add($('/br'),$('/br'),'以下多组关键字中各命中一个',   $('/br'))
			for(var j=3;j<1000;j++){
				if(!x[i][j])
					break
				var tmp=''
				for(var k=3;k<1000;k++){
					if(x[i][j][k]===undefined)
						break
					tmp += y[x[i][j][k]]+' '
					}
				m._.add($('/textarea').$0('value',tmp))
				}
			w._.add(m)
			}
		w._.add(	$('/br'),	$('/br'),  $('/button').$0('innerHTML','增加一列','onclick',function(){this.parentNode.insertBefore(this.previousSibling.previousSibling.previousSibling.cloneNode(1),this.previousSibling.previousSibling)}))
		
		w._.add(	$('/br'),	$('/br'),  $('/button').$0('innerHTML','提交','onclick',function(){
				var x = this.parentNode.getElementsByTagName('textarea'),a={}
				a.key_single = x[0].value
				for(var i=1;i<x.length;i++){
					a['key_double_'+(i-1)] = x[i].value
					}
				__NUKE.doRequest({
					u:{u:__API._base+'__lib=filter&__act=set&opt='+s.options[s.selectedIndex].value+'&raw=3&fid='+f.value,
						a:a
						},
					b:this
					})
				})	)
		
		return true
		}
	})
this.w._.show()
}//fe


adminui.modifyUserForum = function(e,fid){


var fc,jr

this.createadminwindow()
this.w._.addContent(null)

this.w._.addContent(
	_$('/span')._.add(
		_$('/table')._.add(
			_$('/tr')._.add(
				fc=_$('/td').$0('style',{verticalAlign:'top',paddingRight:'1em'})
				)
			)
		)
	)
this.w._.show(e)

var _fid,show,t={71:{},8:{},9:{},10:{}},_NAME = 70,
_BIT = 71,
_ADMIN = 72,
_PARENT_FID = 73,
_SUB_ORDER = 74,
_REPU = 75,
_UNION = 76,
_ALLOW_VISIT = 77,
_ALLOW_POST = 78,
_ALLOW_REPLY = 79,
_DSCP = 80,
_JUMP = 81,
_E_AUTO_TRANS = 1,
_E_LATEST_SET = 2,
_E_FILTER_WORD = 3,
_E_MINOR_ADMIN = 4,
_E_KEY_COLOR = 5,
_E_FORCE_KEY = 6,
_E_OWNER_UID = 7,
_E_UF_ALLOW_VISIT = 8,
_E_UF_ALLOW_POST = 9,
_E_UF_ALLOW_REPLY = 10,
_E_HTML_KEY = 11,
_E_HTML_DSCP = 12,
_E_CUSTOM_LEVEL = 13,
_E_UF_ADMIN = 14,
_E_UF_DSCP = 16,
_E_UF_NAME = 17,

_B_FREE_EDIT = 16,
_B_DISPLAY_ATTACH = 1024,
_B_SHOW_SUB = 2048,
_B_IF_CAT = 4096

__NUKE.doRequest({
	u:__API._base+'__lib=modify_forum&__act=get&uf=1&raw=1&fid='+fid,
	f:function(d){//如有.error则显示.error 否则显示.data

		if(!d)
			return

		if(d.error)
			return alert(d.error[0])

		try{
			var x=d.data[0]
		}catch(e){
			return alert('ERROR NO DATA')
			}

		var y=function(k){return (x.forumData[k]===undefined)?'':x.forumData[k].toString()}, 
		z=function(k){
			var y = (x.forumData[k]===undefined)?'':x.forumData[k].toString()
			var y = y.match(/_(\d+)/);
			if(y)
				return y[1]
			else
				return 1
			}
		fc._.add(
			'版面FID',_$('/br'),
			_fid = _$('/input').$0('value',fid,'disabled',1),_$('/br'),
			_$('/br'),
			
			'版面名',_$('/br'),
			t[_NAME] = _$('/input').$0('value',y(_NAME)),_$('/br'),
			_$('/br'),
			
			'版面说明(显示用',_$('/br'),
			t[_DSCP] = _$('/input').$0('value',y(_DSCP)),_$('/br'),
			_$('/br'),
			
			'在版面所有者的发帖信息中显示链接',_$('/br'),
			show = _$('/input').$0('type','checkbox','checked',x.showlink?1:''),_$('/br'),
			_$('/br'),

			'版主UID或用户名(每行一个',_$('/br'),
			t[_ADMIN] = _$('/textarea').$0('value',y(_ADMIN).replace(/,/g,'\n'),'style',{width:'25em',height:'20em'}),_$('/br'),
			_$('/textarea').$0(
				'style',{width:'25em',height:'20em'},
				'disabled','disabled',
				'value',(function(){var y='';for(var k in x.adminName)y+=k+' '+x.adminName[k]+'\n';return y})()
				),_$('/br'),
			_$('/br'),
			
			'访问权限',_$('/br'),
			t[_E_UF_ALLOW_VISIT][0]=_$('/input').$0('type','radio','name','uf5833'),'允许未注册用户访问 (需要版主前一日访问/操作5次以上 否则只允许注册用户访问',_$('/br'),
			t[_E_UF_ALLOW_VISIT][1]=_$('/input').$0('type','radio','name','uf5833'),'只允许注册用户访问',_$('/br'),
			t[_E_UF_ALLOW_VISIT][2]=_$('/input').$0('type','radio','name','uf5833'),'只允许本版声望在',
			t[_E_UF_ALLOW_VISIT][3]= _$('/input').$0('value',''),'及以上的注册用户访问',_$('/br'),
			_$('/br'),
			
			'发帖权限',_$('/br'),
			t[_E_UF_ALLOW_POST][0]=_$('/input').$0('type','radio','name','uf5834'),'允许本版声望在0及以上的用户发帖 (需要版主前一日访问/操作5次以上 否则只允许声望1及以上用户发帖',_$('/br'),
			//t[_E_UF_ALLOW_POST][1]=_$('/input').$0('type','radio','name','uf5834'),'只',x.forumData.defaultPost,_$('/br'),
			t[_E_UF_ALLOW_POST][2]=_$('/input').$0('type','radio','name','uf5834'),'只允许本版声望在',
			t[_E_UF_ALLOW_POST][3] = _$('/input').$0('value','','onchange',function(){if(parseInt(this.value,10)<1)this.value=1}),'及以上的注册用户发帖',_$('/br'),
			_$('/br'),
			
			'回复权限',_$('/br'),
			t[_E_UF_ALLOW_REPLY][0]=_$('/input').$0('type','radio','name','uf5835'),'允许本版声望在0及以上的用户回复 (需要版主前一日访问/操作5次以上 否则只允许声望1及以上用户回复',_$('/br'),
			//t[_E_UF_ALLOW_REPLY][1]=_$('/input').$0('type','radio','name','uf5835'),'只',x.forumData.defaultPost,_$('/br'),
			t[_E_UF_ALLOW_REPLY][2]=_$('/input').$0('type','radio','name','uf5835'),'只允许本版声望在',
			t[_E_UF_ALLOW_REPLY][3] = _$('/input').$0('value','','onchange',function(){if(parseInt(this.value,10)<1)this.value=1}),'及以上的注册用户回复',_$('/br'),
			_$('/br'),
			
			_$('/button').$0('innerHTML','提交','onclick',function(){
				var a = {}
					a[_NAME]= t[_NAME].value.replace(/^\s+|\s+$/g,''),
					a[_DSCP]= t[_DSCP].value.replace(/^\s+|\s+$/g,''),
					a[_ADMIN ]= t[_ADMIN].value,
					a[_E_UF_ALLOW_VISIT ]= t[_E_UF_ALLOW_VISIT][0].checked ? 'a' : ( t[_E_UF_ALLOW_VISIT][1].checked ? 'c' : 'b'+t[_E_UF_ALLOW_VISIT][3].value),
					a[_E_UF_ALLOW_POST ]=  t[_E_UF_ALLOW_POST][0].checked ? 'a' : 'b'+t[_E_UF_ALLOW_POST][3].value,
					a[_E_UF_ALLOW_REPLY ]=  t[_E_UF_ALLOW_REPLY][0].checked ? 'a' : 'b'+t[_E_UF_ALLOW_REPLY][3].value
				if(show.checked)
					a.showlink = 1
				if(!a[_NAME] || a[_NAME].length>20)
					return alert('版面名过短或过长')
				if(a[_DSCP].length>20)
					return alert('版面说明过长')
				__NUKE.doRequest({
					u:{u:__API._base+'__lib=modify_forum&__act=uf_set&raw=3&fid='+fid,
						a:a
						},
					b:this
					})
				}),
			
			jr=_$('/div'),
			null
			
			)//add


		if(x.joinRequest){
			jr._.add(_$('/br'))
			for(var i in x.joinRequest){
				jr._.add(
					_$('/a').$0('className','b','href','/nuke.php?func=ucp&uid='+x.joinRequest[i][0],'innerHTML',x.joinRequest[i][1]),
					' 申请 ',
					_$('/a').$0('className','b','href','javascript:void(0)','name',x.joinRequest[i][0],'innerHTML','提高声望','onclick',function(e){commonui.setUserRepu(e,fid,this.name)}),
					_$('/br')
					)
				}
			}
		if(x.forumData[_E_UF_ALLOW_VISIT].match(/^xa_f/))
			t[_E_UF_ALLOW_VISIT][0].checked = 'checked'
		else if(x.forumData[_E_UF_ALLOW_VISIT].match(/^u/))
			t[_E_UF_ALLOW_VISIT][1].checked = 'checked'
		else{
			var m = x.forumData[_E_UF_ALLOW_VISIT].match(/r-?\d+_(\d+)/)
			if(!m)m=[1,1]
			t[_E_UF_ALLOW_VISIT][2].checked = 'checked'
			t[_E_UF_ALLOW_VISIT][3].value = m[1]
			}

		if(x.forumData[_E_UF_ALLOW_POST].match(/^xa_r-?\d+_\d+/))
			t[_E_UF_ALLOW_POST][0].checked = 'checked'
		else{
			var m = x.forumData[_E_UF_ALLOW_POST].match(/^r-?\d+_(\d+)/)
			if(!m)m=[1,1]
			t[_E_UF_ALLOW_POST][2].checked = 'checked'
			t[_E_UF_ALLOW_POST][3].value = m[1]
			}
		if(x.forumData[_E_UF_ALLOW_REPLY].match(/^xa_r-?\d+_\d+/))
			t[_E_UF_ALLOW_REPLY][0].checked = 'checked'
		else{
			var m = x.forumData[_E_UF_ALLOW_REPLY].match(/^r-?\d+_(\d+)/)
			if(!m)m=[1,1]
			t[_E_UF_ALLOW_REPLY][2].checked = 'checked'
			t[_E_UF_ALLOW_REPLY][3].value = m[1]
			}
		return true
		}
	})


}//fe