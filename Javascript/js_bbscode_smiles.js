//�����б�
if (!window.ubbcode)var ubbcode={}
if (window.location.href.indexOf('noBBCode')!=-1)ubbcode.noBBCode = true
ubbcode.forum_id = 0;

//bbcodeת��
ubbcode.bbscode=function(o,noimg,gp_lesser,rvrc,is_signature,tid,pid,aid,callBack)
{
if(this.noBBCode)
	return
var arg = {
	c:o,
	noImg:noimg,
	tId:tid,
	pId:pid,
	authorId:aid,
	rvrc:rvrc,
	isSig:is_signature,
	callBack:callBack,
	isLesser:gp_lesser
	}
this.bbsCode(arg)
}
//fe
ubbcode.bbscode_core=function(arg)
{

var c = arg.txt ? arg.txt : arg.c.innerHTML,noimg=arg.noImg,gp_lesser=arg.isLesser,rvrc=arg,rvrc,is_signature=arg.isSig,argsId=arg.argsId

c = c.replace(/joyme\.com|duowan\.com|daxuanwo\.info|woweyes\.net|loyogou\.com|52djq\.com|ngasave\.us|tuwan\.com|laimaika\.com/gi,'');

//if (c.match(/document\.cookie/))
//	httpDataGetter.script_muti_get('/nuke.php?func=count&data='+encodeURIComponent (window.location.href),function(){},function(){});
if(arg.isNukePost)
	c = "[lessernuke]"+c+"[/lessernuke]";//[lessernuke]

if (c.match(/[\[=&]/)==null)
	return c

var self = this

c = c.replace(/\n/g,' ');
c = this.secure_text(c)

c = this.codeTag.parse(c)

c = this.collapse.parse(c,arg.argsId)

c = c.replace(/\[codeblock\](.+?),(.+?)\[\/codeblock\]/gi,"<div><span class='orange'>Code <span class='gray'>($1)</span>:</span><br><div class='textfield' id='$2'></div><img src='about:blank' onerror='ubbcode.codeTag.loadCode(this.previousSibling,this.previousSibling.id)' class='x'/></div>");

c = c.replace(/&amp;#(\d{2,6});/g,function($0,$1){
    if($1>127)
        return  String.fromCharCode($1)
    else
        return  $0
    })
    

var customachievecount = 0
c = c.replace(/\[customachieve\](.+?)\[\/customachieve\]/gi,
function($0,$1)
	{
	if (is_signature && customachievecount)
		return $0;
	customachievecount++;
	var i = $1.match(/\[img\](http:\/\/.+?\.[a-zA-Z]{1,4})\[\/img\]/i);
	var t = $1.match(/\[title\](.{1,40}?)\[\/title\]/i);
	var x = $1.match(/\[txt\](.{1,100}?)\[\/txt\]/i);
	if (!i)
		i={0:0,1:__IMG_STYLE+'/achieve_default.jpg'};
	else
		i[1]=i[1].replace(/^http:\/\/db1?\.178\.com\//i,'http://img.db.178.com/')
	if (t && x){
		return "<div style='width:512px;height:74px'>\
<div style='width:76px;height:74px;margin:0px 0px -74px 3px;background:#000 url("+i[1]+") 50% 50%'></div>\
<div style='width:512px;height:74px;background:url("+__IMG_STYLE+"/achieve_bg.png);font-size:12px;font-family:Microsoft Yahei, Verdana, Tahoma, Arial, sans-serif;text-align:center;overflow:hidden;color:#000'><div style='width:362px;margin:auto'>\
<h2 style='display:block;font-size:14px;line-height:22px;height:22px;color:#000;margin:0px 0px -23px 0px;padding:1px 1px 0px 0px'>"+t[1]+"</h2>\
<h2 style='display:block;font-size:14px;line-height:22px;height:22px;color:#fff;margin:0px 0px 5px 0px'>"+t[1]+"</h2>"+x[1]+"\
</div></div>\
</div>";
		}
	else
		return $0;
	}
);




c = c.replace(/\[(item|spell|quest|npc|achieve)(=[^\]]{1,20})?\](.{1,100}?)\[\/(item|spell|quest|npc|achieve)\]/gi,function($0,$1,$2,$3,$4){
if ($1!=$4)return $0
if($2)$2 = $2.substr(1)
return commonui.dbLinkGen.linkGen('[wow,'+$1+($2 ? ','+$2 : '')+'['+$3+']]')
});//[db]


c = c.replace(/\[hsdeck\](.+?)\[\/hsdeck\]/i,function($0,$1){
	var x = $1.split(/\s*<br\s*\/?\s*>\s*|\s*\n\s*/ig),y = [],z='',v={},w='',l=[],h=0
	for(var i=0;i<x.length;i++){
		var m=x[i].match(/(\d+),(.+?),(.+?),(\d+),(\d+),(\d+)/)
		if(!m)continue
		m[6] = parseInt(m[6],10)
		m[4] = parseInt(m[4],10)
		y.push("<span class='cost'><span class='icon'>&nbsp;</span>"+m[4]+"</span> <span class='img' style='background:url(http://img.db.178.com/wow/icons/hs/cardimage_en_m/"+m[3]+".jpg) -65px -100px'>&emsp;&emsp;&emsp;&emsp;&emsp;</span> <span class='q"+m[5]+"'>[wow,hscard,"+m[1]+",cn["+m[2]+"]]</span> <span class='count'>x"+m[6]+"</span>")
		if(!v[m[4]])v[m[4]]=0
		v[m[4]]+=m[6]
		l.push(m[1]+':'+m[6])
		}
	if(!y.length)return $1
	var x =Math.ceil(y.length/3),u=x
	for(var i=0;i<y.length;i++){
		if(i==x){
			z+="</td><td class='np'>"
			if((u&1)==0)
				h = h^1
			x+=u
			}
		h = h^1
		z+="<div class='hsdeckcard bg"+h+"'>"+y[i]+"</div>"
		}
	for(var k in v){
		w+="<td class='bar'><div style='height:"+(v[k]*0.2)+"em;width:2em'></div>"+k+" x "+v[k]+"</td>"
		}
	return "<div class='hsdeck'><table><tbody><tr><td class='np'>"+z+"</td></tr><tr><td colspan=4><table><tbody><tr>"+w+"<td class='link'><a class='b gray' href='http://db.178.com/hs/deck/#1^"+l.join(',')+"'>[����ģ��]</a></td></tr></tbody></table></td></tr></tbody></table></div>"
	});//[hsdeck][Gamute de kotei (Ohmi Takeshi)] Fatestay night Rider-san to Syounen no nichijou


c = c.replace(/\[wowdb\[([^\]]{2,20})\]\]/gi,function($0,$1){$1=$1.replace(/^ | $/,'');
return commonui.dbLinkGen.linkGen('wow','cn',$1)});//[db]

c = c.replace(/\[(item|spell|quest|npc|achieve)(=[^\[]{1,20})?\[([^\]]{2,20})\]\]/gi,function($0,$1,$2,$3){
if($2)$2 = $2.substr(1)
return commonui.dbLinkGen.linkGen('[wow,'+$1+($2 ? ','+$2 : '')+'['+$3+']]')
});//[db]

c = c.replace(/\[(?:wow|lol|hscard|d3db)(?:,[a-z0-9,]+)?\[[^\]]{2,20}\]\]/gi,function($0){
return commonui.dbLinkGen.linkGen($0)
});//[db]






if(c.indexOf('armory')!=-1){

var armory_limit = 5
var armory_count = 0
if (is_signature)
	armory_limit = 1

var d3arm = function($0,$1,$2,$3){
	var w = __SETTING.width ? Math.floor(__SETTING.width*0.9) : 720;
	++armory_count
	$2=decodeURIComponent($2).replace("'",'&#39;')
	var v = '{battleTag:"'+$2+'",nameOrId:"'+$3+'",o:this.previousSibling,host:"'+$1.toLowerCase()+'"}'
	if (armory_count>armory_limit)
		return "<span><b>["+$2+" "+$3+"]</b></span><img src='about:blank' style='display:none' onerror='d3armory.get("+v+",-1)'/>"
	else
		return "<div style='width:"+w+"px'></div><img src='about:blank' style='display:none' onerror='d3armory.get("+v+",0)'/>"
	}
		  
c = c.replace(/(?:<br\s*\/?>)?\s*\[url\]http:\/\/www\.diablo3\.com\.(cn)\/profile\/([^\-]+-\d+)\/(\d+?)#armory\[\/url\]\s*(?:<br\s*\/?>)?/gi,d3arm);

c = c.replace(/(?:<br\s*\/?>)?\s*\[url\]http:\/\/(tw|eu|us|cn)\.battle\.net\/d3\/[^\/]+\/profile\/([^\-]+-\d+)\/hero\/(\d+?)#armory\[\/url\]\s*(?:<br\s*\/?>)?/gi,d3arm);
	//[diablo3]

c = c.replace(/(?:<br\s*\/?>)?\s*\[(us|cn|tw|eu)armory (.{1,50}?) ([^ ]{1,50}?)\s*\]\s*(?:<br\s*\/?>)?/gi,function($0,$1,$2,$3){
	var w = __SETTING.width ? Math.floor(__SETTING.width*0.9) : 720;
	++armory_count
	$2=$2.replace("'",'&#39;')
	$3=$3.replace("'",'&#39;')
	if (armory_count>armory_limit)
		return "<span><b>["+$2+" "+$3+"]</b></span><img src='about:blank' style='display:none' onerror='armory.get(\""+$2+"\",\""+$3+"\",this.previousSibling,\""+$1.toLowerCase()+"\",-1)'/>"
	else
		return "<div style='width:"+w+"px'></div><img src='about:blank' style='display:none' onerror='armory.get(\""+$2+"\",\""+$3+"\",this.previousSibling,\""+$1.toLowerCase()+"\",0)'/>"
	});
	//[armory]

c = c.replace(/(?:<br\s*\/?>)?\s*\[(us|cn|tw|eu)d3armory (.{1,50}?)\s*\]\s*(?:<br\s*\/?>)?/gi,function($0,$1,$2){
	++armory_count
	$2 = $2.split(' ')
	if(!$2[1])$2[1]=''
	$2[0]=$2[0].replace("'",'&#39;')
	$2[1]=$2[1].replace("'",'&#39;')
	var w = __SETTING.width ? Math.floor(__SETTING.width*0.9) : 720, v = '{battleTag:"'+$2[0]+'",nameOrId:"'+$2[1]+'",o:this.previousSibling,host:"'+$1.toLowerCase()+'"}'
	if (armory_count>armory_limit)
		return "<span><b>["+$2[0]+" "+$2[1]+"]</b></span><img src='about:blank' style='display:none' onerror='d3armory.get("+v+",-1)'/>"
	else
		return "<div style='width:"+w+"px'></div><img src='about:blank' style='display:none' onerror='d3armory.get("+v+",0)'/>"
	});
	//[d3armory]

c = c.replace(/(?:<br\s*\/?>)?\s*\[(cn)wotarmory (.{1,50}?) (.{1,50}?)\]\s*(?:<br\s*\/?>)?/gi,function($0,$1,$2,$3){
	var w = __SETTING.width ? Math.floor(__SETTING.width*0.9) : 720;
	++armory_count
	$2=$2.replace(/^\s+|\s+$/g,'').replace("'",'&#39;')
	$3=$3.replace(/^\s+|\s+$/g,'').replace("'",'&#39;')
	if (armory_count>armory_limit)
		return "<span><b>["+$2+" "+$3+"]</b></span><img src='about:blank' style='display:none' onerror='wotArmory.get({host:\""+$1+"\",realm:\""+$2+"\",name:\""+$3+"\",o:this.previousSibling},-1)'/>"
	else
		return "<div style='width:"+w+"px'></div><img src='about:blank' style='display:none' onerror='wotArmory.get({host:\""+$1+"\",realm:\""+$2+"\",name:\""+$3+"\",o:this.previousSibling},0)'/>"
	});

c = c.replace(/(?:<br\s*\/?>)?\s*\[(cn)?jnarmory (.{1,50}?) (.{1,50}?)\]\s*(?:<br\s*\/?>)?/gi,function($0,$1,$2,$3){
	var w = __SETTING.width ? Math.floor(__SETTING.width*0.9) : 720;
	++armory_count
	if(!$1)$1 = 'cn'
	$2=$2.replace(/^\s+|\s+$/g,'').replace("'",'&#39;')
	$3=$3.replace(/^\s+|\s+$/g,'').replace("'",'&#39;')
	if (armory_count>armory_limit)
		return "<span><b>["+$2+" "+$3+"]</b></span><img src='about:blank' style='display:none' onerror='jnArmory.get({host:\""+$1+"\",realm:\""+$2+"\",name:\""+$3+"\",o:this.previousSibling},-1)'/>"
	else
		return "<div style='width:"+w+"px'></div><img src='about:blank' style='display:none' onerror='jnArmory.get({host:\""+$1+"\",realm:\""+$2+"\",name:\""+$3+"\",o:this.previousSibling},0)'/>"
	});

}//if

if(arg.fId && (arg.fId==400 || arg.fId==318 || arg.fId==395 || arg.fId==396 || arg.fId==446 || arg.fId==397 || arg.fId==398 || arg.fId==399)){
c = c.replace(/(?:<br\s*\/?>)?\s*\[diablo3charsim\]([^\x00]+?)\[\/diablo3charsim\]\s*(?:<br\s*\/?>)?/gi,function($0,$1){

	var a = 'd3sim_'+Math.random()
	if(!self.cache)self.cache={
		d3sim_24456 : function(o,id){
			o.contentDocument.getElementById('sharelink').value = this[id]
			o.contentWindow.createdBtn()
			o.contentWindow.proStart()
			}
		}
	self.cache[a] = self.unSecureText($1)
	return "<div><iframe style='width:100%;height:1500px;border:none' frameborder=0 allowtransparency='true' src='/misc/d3selector.html' onload='ubbcode.cache.d3sim_24456(this,\""+a+"\")'></iframe></div>"
	});
}//if



c = this.bbscode_common(c,arg)

//c = c.replace(/<br\s*\/?>\s*<br\s*\/?>/i,'<br/><img alt="[::������˹���ҵ��� BBS.NGACN.CC::]"/><br/>');

//c = c.replace(/\[reqpg=\d{1,2}\]/i,'');//[reqpg]

//c = c.replace(/\[qfw\](.+?)\[\/qfw\]/gi,function($0,$1){var id = 'qfw'+Math.floor(Math.random()*10000);window.setTimeout("quotefromwiki_double_get('"+id+"','"+$1+"')",500);if(document.createStyleSheet){document.createStyleSheet('/image/nga_classic/css_wiki.css');var css=''}else{var css="<style type='text/css'>@import '/image/nga_classic/css_wiki.css';</style>"}
//return(css+"<div id='"+id+"' class='qfw'></div>")});

//c = c.replace(/\[wiki\](.+?)\[\/wiki\]/gi,function($0,$1){return(self.writelink("http://wiki.ngacn.cc/index.php?title="+encodeURI($1),$1,'NGA Encyclopedia'))});//[wiki]
//c = c.replace(/\[qfw\](.+?)\[\/qfw\]/gi,function($0,$1){return(self.writelink("http://wiki.ngacn.cc/index.php?title="+encodeURI($1),$1,'NGA Encyclopedia'))});//[wiki]

c = c.replace(/\[MURtopic (\d{1,11}) ?(\d{0,11})\]/i,function($0,$1,$2)
	{
	if(!$2)$2=0;
	var id=Math.random()*1000;
	window.setTimeout(function(){commonui.loadtopic_js($('topiclist'+id),Array('data/bbscache/load_topic_cache/mostuserrecommend_'+$1+'_'+$2+'.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&f=mostuserrecommend&js=1&fid='+$1+'&day='+$2+'&timeout='+3600*1.1),3600*1.1)});
	return "<div class='topiclist' id='topiclist"+id+"' name='topiclist'></div>"
	});//[MURtopic]

c = c.replace(/p_w_upload/gi,"attachment");//[img]

//if(arg.isNukePost)
//	c = "<div class='lessernuke'>"+c+"</div>";//[lessernuke]

return c;
}
//fe

//�������ݴ��� ����󷵻�false
ubbcode.postContentChk = function (c){
c = c.replace(/\r?\n\[::������˹���ҵ��� BBS.NGACN.CC::\]\r?\n/g,'');
return c
}//fe

ubbcode.codeHelpSpecial = [
{
	0:'<b>[customachieve]</b><br/><nobr>�Զ���ɾ�</nobr>',
	1:"<b>����һ���Լ��������ݵĳɾ�</b>\n\
\n\
[customachieve]\n\
[title]�ɾ͵�����(����������)[/title]\n\
[txt]�ɾ͵�˵������(����������)[/txt]\n\
[/customachieve]\n\
\n\
[customachieve]\n\
[title]�ɾ͵�����(����������)[/title]\n\
[txt]�ɾ͵�˵������(����������)[/txt]\n\
[img]�ɾ͵�ͼ��(���Ե�ַ)[/img]\n\
[/customachieve]\n\
",
	2:{
		0:{'hint':'�ɾ͵�����(����������)'},
		1:{'hint':'�ɾ͵�˵������(����������)'},
		2:{'hint':'�ɾ͵�ͼ��(���Ե�ַ)'},
		3:function(v){
			v[0]='[title]'+v[0]+'[/title]'
			v[1]='[txt]'+v[1]+'[/txt]'
			v[2]='[img]'+v[2]+'[/img]'
			return '[customachieve]'+v.join('\n')+'[/customachieve]'
		}
	}
},
{
	0:'<b>[[������Ϸ���ݿ�]]</b><br/><nobr>��Ϸ���ݿ�</nobr>',
	1:"<b>������Ϸ���ݿ��е���Ŀ</b>\n\
\n\
	[wow,(item/npc/quest/achieve/spell/petspell),id,(cn/tw/en)[����]] ħ������(��Ʒ/����/����/�ɾ�/����/���＼��)\n\
\n\
	[lol,(item/spell/rune/skin/hero),id[����]] Ӣ������(��Ʒ/����/����/Ƥ��/Ӣ��)\n\
\n\
	������ݿ���������ж�� ��������ʾѡ���\n\
\n\
	[wow[�ؼ���]] ħ���������ݿ��� �ؼ��� ���������\n\
\n\
	[lol[�ؼ���]] Ӣ���������ݿ��� �ؼ��� ���������\n\
\n\
	[hscard[�ؼ���]] ¯ʯ��˵���ݿ��� �ؼ��� ���������\n\
\n\
	[wow,item[�ؼ���]] ħ���������ݿ��� �ؼ��� ����������е���Ʒ\n\
\n\
	[wow,item,1234,tw[��������]] ����ħ���������ݿ���id��1234����Ʒ\n\
\n\
	[wow,quest,1234[��������]] ħ���������ݿ���id��1234������\n\
\n\
	[wow,petspell,1234[��������]] ħ���������ݿ���id��1234�ĳ��＼��\n\
\n\
	[lol,item,1234[��������]] Ӣ���������ݿ���id��1234����Ʒ\n\
\n\
	[lol,spell,1234[��������]] Ӣ���������ݿ���id��1234�ķ���\n\
\n\
	[d3db[�ؼ���]] �����ƻ���3���ݿ��� �ؼ��� ���������\n\
",
	2:{
		0:{
			'hint':'��Ϸ',
			'opts':{
				0:{0:'ħ������',1:'wow'},
				1:{0:'Ӣ������',1:'lol'},
				2:{0:'¯ʯ��˵',1:'hscard'},
				3:{0:'�����ƻ���3',1:'d3db'}
				}
			},
		1:{
			'hint':'���(���Բ���)',
			'opts':{
				0:{0:'',1:''},
				1:{0:'ħ��������Ʒ',1:'item'},
				2:{0:'ħ����������',1:'npc'},
				3:{0:'ħ����������',1:'quest'},
				4:{0:'ħ������ɾ�',1:'achieve'},
				5:{0:'ħ�����編��',1:'spell'},
				6:{0:'�����ƻ���3��Ʒ',1:'item'},
				7:{0:'�����ƻ���3����',1:'spell'},
				8:{0:'�����ƻ���3����',1:'rune'},
				9:{0:'�����ƻ���3��ʯ',1:'gem'},
				10:{0:'Ӣ��������Ʒ',1:'item'},
				11:{0:'Ӣ�����˷���',1:'spell'},
				12:{0:'Ӣ�����˷���',1:'rune'},
				13:{0:'Ӣ������Ƥ��',1:'skin'},
				14:{0:'Ӣ������Ӣ��',1:'hero'}
				}
			},
		2:{'hint':'����ID(���Բ���)'},
		3:{'hint':'��������(û��ID�����ʱΪ�����ؼ���)'},
		4:{
			'hint':'����ѡ��(Ĭ�ϼ��� Ӣ�����˺���)',
			'opts':{
				0:{0:'����(����)',1:'cn'},
				1:{0:'����(̨��)',1:'tw'}
				}
			},
		5:function(v){
			if(!v[0] || !v[3])return ''
			var tmp = '['+v[0]+','+v[1]+','+v[2]+','+v[4]+'['+v[3]+']]'
			return tmp.replace(/,+/g,',').replace(/,\[/,'[')
			}
		}
},
/*
{
	0:'<b>[item]</b><br/><nobr>ħ������װ��</nobr>',
	1:"<b>����ħ�������е���Ʒ</b>\n\
\n\
	[item[��Ʒ����]]\n\
\n\
	[item=����[��Ʒ����]]\n\
\n\
	[item=��ƷID[��������]]\n\
\n\
	[item=��ƷID,����[��������]]\n\
\n\
	[item[��ƷID]]\n\
\n\
	[item=����[��ƷID]]\n\
\n\
\n\
	[item]��Ʒ����[/item]\n\
\n\
	[item=����]��Ʒ����[/item]\n\
\n\
	[item=��ƷID]��������[/item]\n\
\n\
	[item=��ƷID,����]��������[/item]\n\
\n\
	[item]��ƷID[/item]\n\
\n\
	[item=����]��ƷID[/item]\n\
\n\
����Ϊ cn/tw/en (����/̨��/����) ֮һ Ĭ��Ϊcn\n\
",
	2:{
		0:{'hint':'��Ʒ���ƻ�ID'},
		1:{'hint':'��������(���Բ���)'},
		2:{
			'hint':'����ѡ��',
			'opts':{
				0:{0:'����(����)',1:'cn'},
				1:{0:'����(̨��)',1:'tw'}
				}
			},
		3:function(v){
			if(v[0]=='')return false
			if (!isNaN(parseInt(v[0],10)))
				{
				if (v[1])
					return '[item='+v[0]+','+v[2]+'['+v[1]+']]'
				else
					return '[item='+v[2]+'['+v[0]+']]'
				}
			else
				return '[item='+v[2]+'['+v[0]+']]'
			}
		}
},
{
	0:'<b>[achieve]</b><br/><nobr>ħ������ɾ�</nobr>',
	1:"<b>����ħ�������еĳɾ�</b>\n\
\n\
	[achieve[�ɾ�����]]\n\
\n\
	[achieve=����[�ɾ�����]]\n\
\n\
	[achieve=�ɾ�ID[��������]]\n\
\n\
	[achieve=�ɾ�ID,����[��������]]\n\
\n\
	[achieve[�ɾ�ID]]\n\
\n\
	[achieve=����[�ɾ�ID]]\n\
\n\
\n\
	[achieve]�ɾ�����[/achieve]\n\
\n\
	[achieve=����]�ɾ�����[/achieve]\n\
\n\
	[achieve=�ɾ�ID]��������[/achieve]\n\
\n\
	[achieve=�ɾ�ID,����]��������[/achieve]\n\
\n\
	[achieve]�ɾ�ID[/achieve]\n\
\n\
	[achieve=����]�ɾ�ID[/achieve]\n\
\n\
����Ϊ cn/tw/en (����/̨��/����) ֮һ Ĭ��Ϊcn\n\
",
	2:{
		0:{'hint':'�ɾ����ƻ�ID'},
		1:{'hint':'��������(���Բ���)'},
		2:{
			'hint':'����ѡ��',
			'opts':{
				0:{0:'����(����)',1:'cn'},
				1:{0:'����(̨��)',1:'tw'}
				}
			},
		3:function(v){
			if(v[0]=='')return false
			if (!isNaN(parseInt(v[0],10)))
				{
				if (v[1])
					return '[achieve='+v[0]+','+v[2]+'['+v[1]+']]'
				else
					return '[achieve='+v[2]+'['+v[0]+']]'
				}
			else
				return '[achieve='+v[2]+'['+v[0]+']]'
			}
		}
},
{
	0:'<b>[spell]</b><br/><nobr>ħ�����編��</nobr>',
	1:"<b>����ħ�������еķ���</b>\n\
\n\
	[spell=����ID[��������]]\n\
\n\
	[spell=����ID,����[��������]]\n\
\n\
	[spell[����ID]]\n\
\n\
	[spell=����[����ID]]\n\
\n\
\n\
	[spell=����ID]��������[/spell]\n\
\n\
	[spell=����ID,����]��������[/spell]\n\
\n\
	[spell]����ID[/spell]\n\
\n\
	[spell=����]����ID[/spell]\n\
\n\
����Ϊ cn/tw/en (����/̨��/����) ֮һ Ĭ��Ϊcn\n\
",
	2:{
		0:{'hint':'����ID'},
		1:{'hint':'��������(���Բ���)'},
		2:{
			'hint':'����ѡ��',
			'opts':{
				0:{0:'����(����)',1:'cn'},
				1:{0:'����(̨��)',1:'tw'}
				}
			},
		3:function(v){
			if (!isNaN(parseInt(v[0],10)))
				{
				if (v[1])
					return '[spell='+v[0]+','+v[2]+'['+v[1]+']]'
				else
					return '[spell='+v[2]+'['+v[0]+']]'
				}
			else
				return false
			}
		}
},
{
	0:'<b>[wiki]</b><br/><nobr>����wiki����</nobr>',
	1:"<b>���뵽wiki.ngacn.cc����������</b>\n\
\n\
	[wiki]���±���[/wiki]\n\
"
},
*/
{
	0:'<b>[armory]</b><br/><nobr>ħ������������Ϣ</nobr>',
	1:"<b>����ħ������armory��������Ϣ(����벻ͬ���ܰ����ض����ֵ�ID�޷���ȡ)</b>\n\
\n\
	[cnarmory �������� �����] ����cn.wowarmory.com��������Ϣ\n\
\n\
	[usarmory �������� �����] ����www.wowarmory.com��������Ϣ\n\
\n\
	[twarmory �������� �����] ����tw.wowarmory.com��������Ϣ\n\
\n\
	[euarmory �������� �����] ����eu.wowarmory.com��������Ϣ\n\
",
	2:{
		0:{'hint':'��������'},
		1:{'hint':'�����'},
		2:{
			'hint':'����ѡ��',
			'opts':{
				0:{0:'����',1:'cn'},
				1:{0:'̨��',1:'tw'},
				2:{0:'����',1:'us'},
				3:{0:'ŷ��',1:'eu'}
				}
			},
		3:function(v){
			return '['+v[2]+'armory '+v[0]+' '+v[1]+']'
		}
	}
},
{
	0:'<b>[d3armory]</b><br/><nobr>Diablo3������Ϣ</nobr>',
	1:"<b>����Diablo3��������Ϣ</b>\n\
\n\
	[url]battle net��������Ϣҳ��ĵ�ַ��� `#armory` [/url]\n\
\n\
	����\n\
\n\
	[url]http://tw.battle.net/d3/zh/profile/Yuee-3131/hero/344816#armory[/url]\n\
"
},
{
	0:'<b>[wotarmory]</b><br/><nobr>WOT�ʺ���Ϣ</nobr>',
	1:"<b>����̹������������ʺ���Ϣ</b>\n\
\n\
	[cnwotarmory ��������(����n/����s) �����]\n\
\n\
	����\n\
\n\
	[cnwotarmory s ����˹֮��]\n\
"
}

];//ae


ubbcode.getForumid=function()
{
if (!this.forum_id) this.forum_id = id2e('forum_id').value
return (this.forum_id);
}
//fe
var bbscodesmiles = ubbcode.smiles;
function bbscode(id,noimg,gp_lesser,rvrc,is_signature,tid,pid,aid){
ubbcode.bbscode(id,noimg,gp_lesser,rvrc,is_signature,tid,pid,aid)
}//fe
function getForumid(){
return ubbcode.getForumid()
}//fe
function checklink(u,nocookie,tbl){
return ubbcode.checklink(u,nocookie,tbl)
}//fe
writelink = null

//----------------------------------------
//
//
//
//
//
//----------------------------------------
/*
commonui.load_post_s = function(c,noimg,gp_lesser,rvrc,is_signature){
if (!cookieFuncs.getMiscCookie('simplemode'))
	{
	 bbscode_core(c,noimg,gp_lesser,rvrc,is_signature)
	}
}
//fe

commonui.load_post_p = function(p,o){
if (!cookieFuncs.getMiscCookie('simplemode'))
	{
	w_i(p,o)
	}
}
//fe
*/

commonui.getquest = function(id)
{
document.domain = __AJAX_DOMAIN;
return("<span id='questget"+id+"'>loading...</span>")
}
//fe

//----------------------------------------
//
//
//
//
//
//----------------------------------------
wowdb_tooltip={linkGen:function(t1,name,arg){return commonui.dbLinkGen.linkGen('[wow,'+t1+','+arg+'['+name+']')}}


commonui.dbLinkGen = {
data:{},
lastDid:null,
tip:null,
db_wow:'wow',
db_lol:'lol',
db_hs:'hscard',
db_d3:'d3db',
db_d3_css:null,
db_lol_css:null,
/** �������ݿ�����
 * @param string str �ؼ��� 
 * [wow,item,1234,cn[ĳ��Ʒ]] ��ʾwow/cn���ݿ�idΪ1234����Ʒ
 * [wow,cn[Ӱ��]] ��ʾwow/cn���ݿ���Ӱ����������
 * [wow,spell,tw,1234[ĳ����]] ��ʾwow/tw���ݿ�idΪ1234�ļ���
 * [lol,item,1234[ĳ��Ʒ]] ��ʾlol���ݿ�idΪ1234����Ʒ
 * [lol[Ӱ��]] ��ʾlol���ݿ���Ӱ����������
 * 
 * �����ѡ�� wow lol d3db hscard
 * �����ѡ�� item spell npc quest achieve(wow)  item spell rune skin hero(lol)
 * ��������ڵ�һ�� �ؼ��ֱ��������һ��
 * 
 * ���������Ϊ������������ �� linkgen(lol,item,1234,'ĳ��Ʒ')
 */
linkGen : function(arg)
{
if(arguments.length>1)
	var str = arguments
else{
	var p = arg.indexOf('[',1), str = arg.substr(1,p-1).replace(/^[,\s]*|[,\s]*$/g,'').split(/\s*,\s*/g)
	str.push(arg.substr(p+1,arg.length-p-1-2).replace(/^\s*|\s*$/g,''))
	}

var t0 = str[0], name=new String(str[str.length-1]) , t1='', id=0, lang='cn', x='', u='', h='', key='', std='', raw
str[0] = str[str.length-1] = null
for(var i=0; i<str.length; i++){
	switch(str[i]){
		case 'achieve':
			t1 = str[i] = 'achievement';
			std +=','+t1;
			break;
		case 'petspell':
			t1 = str[i] = 'battlepetability';
			std +=','+t1;
			break;
		case 'achievement':
		case 'item':
		case 'spell':
		case 'quest':
		case 'npc':
		case 'gem':
		case 'hscard':
		case 'rune':
		case 'skin':
		case 'building':
		case 'hero':
			t1 = str[i];
			std +=','+t1;
			break;
		case 'cn':
		case 'tw':
		case 'en':
		case 'us':
			lang = str[i];
			std +=','+lang;
			break;
		case 'raw':
			raw=1
			break;
		default:
			if(str[i] && str[i].toString().match(/^\d+$/)){
				id = new Number(str[i]);
				std +=','+id;
				}
		}
	}
	
std = '&#91;'+t0+std+'&#91;'+name.replace(/[\x00-\x7f]/g,function($0){return '&#'+$0.charCodeAt(0)+';'})+'&#93;&#93;'

if(!t0)
	t0=this.db_wow


if(name.match(/^\d+$/))
	id = parseInt(name,10)

if(!id)
	key = encodeURIComponent(name)

var i = name.match(/\[img\](.+?)\[\/img\]/i);
if(i){
	key = null
	name = "<img src='"+i[1]+"'/>"
	}
var i = function(y){var y = y.match(/^[^\/]+\/[^\/]+/);return hex_md5(y[0])}

if(t0==this.db_wow || t0==this.db_hs){
	if(t0==this.db_hs){//¯ʯ��˵��wow��hscard��
		t0=this.db_wow
		t1='hscard'
		}
	if (t1=='achieve')
		t1='achievement'
	if (id && t1){
		h = 'http://db.178.com/wow/'+lang+'/'+t1+'/'+id+'.html'
		x = 'http://db.178.com/wow/'+lang+'/a/'+t1+'/'+id+'.js'
		}
	else if (key){
		h = 'http://db.178.com/wow/'+lang+'/search.html?name='+key
		u = 'wow/'+lang+'/search.html?name='+key
		x = hex_md5(u)
		x = ['http://img4.ngacn.cc/proxy/cache_db178com/'+i(u)+'/'+x.substr(0,2)+'/'+x.substr(2,2)+'/'+x+'.js','http://img4.ngacn.cc/proxy/proxy.php?host=db.178.com&url='+encodeURIComponent(u)]
		}
	}
else if(t0==this.db_lol){
	if(id && t1){
		h = 'http://db.178.com/lol/'+t1+'-'+id
		if(t1=='item' || t1=='spell' || t1=='rune')
			x = 'http://db.178.com/lol/'+t1+'-ajax/'+id
		}
	else if(key){

		h = 'http://db.178.com/lol/search/s/na:'+key+'&item:on&rune:on&spell:on&hero:on&skin:on'
		u = 'lol/search/s/na:'+key+'%26item:on%26rune:on%26spell:on%26hero:on%26skin:on%26jsonp:1%26callback:%26lite:1'
		x = hex_md5(u)
		x = ['http://img4.ngacn.cc/proxy/cache_db178com/'+i(u)+'/'+x.substr(0,2)+'/'+x.substr(2,2)+'/'+x+'.js','http://img4.ngacn.cc/proxy/proxy.php?host=db.178.com&url='+encodeURIComponent(u)]
			
		}
	}
else if(t0==this.db_d3){
	if(id && t1){
		h = 'http://db.178.com/d3/'+lang+'/'+t1+'-'+id
		x = 'http://db.178.com/d3/'+lang+'/'+t1+'-ajax/'+id
		}
	else if(key){
		h = 'http://db.178.com/d3/'+lang+'/search/s/na:'+key+'&item:on&spell:on&rune:on'
		u = 'd3/'+lang+'/search/s/na:'+key+'%26item:on%26spell:on%26rune:on%26jsonp:1%26callback:%26lite:1'
		x = hex_md5(u)
		
		x = ['http://img4.ngacn.cc/proxy/cache_db178com/'+i(u)+'/'+x.substr(0,2)+'/'+x.substr(2,2)+'/'+x+'.js','http://img4.ngacn.cc/proxy/proxy.php?host=db.178.com&url='+encodeURIComponent(u)]
		}
	}
	
if(!h)
	return typeof(arg)=='string' ? arg : std

var did = (id ? 'search_data_cache_id_' : 'search_data_cache_noid_')+Math.random()//��ID��(׼ȷ��һ������)����ID��(ģ������)ʹ�ò�ͬ��did (��this.open
this.data[did] = {h:h,x:x,t0:t0,t1:t1,lang:lang,id:id}
this.lastDid = did

if(raw)
	return "<a class='b' href='"+h+"' onclick='commonui.dbLinkGen.open(event,\""+did+"\");' title='�����ʾ��ϸ��Ϣ "+std+"'>"+name+"</a>";
return "<span class='silver b'>[</span><a class='b' href='"+h+"' onclick='commonui.dbLinkGen.open(event,\""+did+"\");' title='�����ʾ��ϸ��Ϣ "+std+"'>"+name+"</a><span class='silver b'>]</span>";
},

open:function(e,did){
if(!this.data[did].x)
	return true

var d = this.data[did], self = this, varName = null;


if(d.t0==this.db_wow){
	if (!window.$178DB){
		window.$178DB = {};
		$178DB.regstPetAbility = $178DB.regstHscard = $178DB.regstItem=$178DB.regstQuest=$178DB.regstSpell=$178DB.regstAchievement=$178DB.regstNpc=$178DB.regstBuilding=$178DB.regstAbility=function(v){this.data=v};
		}
	varName = null
	}
else if(d.t0==this.db_lol && d.id){
	varName = d.t1+'_'+d.id
	if(!this.db_lol_css){
		this.db_lol_css = 1
		loader.css('http://db.178.com/lol/css/d3db_tooltip.css')
		}
	}
else if(d.t0==this.db_d3 && d.id){
	varName = d.t1+'_'+d.id
	if(!this.db_d3_css){
		this.db_d3_css = 1
		loader.css('http://db.178.com/d3/css/d3db_tooltip.css')
		}
	}

commonui.createadminwindow()
commonui.adminwindow._.addContent(null)

httpDataGetter.script_muti_get(this.data[did].x,
	function(x){
		if (!x && window.$178DB)
			x = window.$178DB.data
		if (!x)
			return false
		var html = ''
		if(window.$178DB)
			delete window.$178DB.data;
		self.countAll = self.countHaveId = 0
		if(d.t0==self.db_wow){
			if (!d.id){//search
				if(window.__NOW - x.time>86400*7)
					return false
				html += self.parseWowSearch(x.data,d.lang,d.t1)
				}
			else if (x=='not exists' || (typeof(x.icon)=='number' && x.icon==0))
				html = '�޴���Ŀ'
			else if(x.tip){//wow tip
				html+='<div id="atlasoline_iTTc" style="background:#000;border:4px solid #000;border-radius: 5px">'+
					(x.icon ? '<img src="http://img.db.178.com/wow/icons/m/'+x.icon.toLowerCase()+'.jpg"/>' : '') +
					x.tip+'</div>';
				}
			else
				html = '�޴���Ŀ'
			}
		else if(d.t0==self.db_lol){
			if (!d.id){//search
				if(window.__NOW - x.time>86400*7)
					return false
				html += self.parseLolSearch(x.data,d.lang,d.t1)
				}
			else if(x){//lol tip
				html+='<div id="loldb_tooltip_c" style="background:#000;border:4px solid #000;border-radius: 5px">'+x+'<div class="clear"></div></div>'
				commonui.adminwindow.$0('style','width:auto;minWidth:270px')
				}
			else
				html = '�޴���Ŀ'
			}
		else if(d.t0==self.db_d3){
			if (!d.id){//search
				if(window.__NOW - x.time>86400*7)
					return false
				html += self.parseD3Search(x.data,d.lang,d.t1)
				}
			else if(x){//lol tip
				html+='<div id="loldb_tooltip_c" style="background:#000;border:4px solid #000;border-radius: 5px">'+x+'<div class="clear"></div></div>'
				commonui.adminwindow.$0('style','width:auto;minWidth:270px')
				}
			else
				html = '�޴���Ŀ'
			}
		var m = html.match(/search_data_cache_(?:no)?id_[\d\.]+/g)//���ֻ��һ��
		console.log(m)
		if(m && !m[1] && m[0].match(/^search_data_cache_id_/)){//��������ID��
			self.open(e,m[0])//���Զ������
			return true
			}
		commonui.adminwindow._.addContent(html)
		tTip.showdscp(e,commonui.adminwindow);
		return true
		},
	function(){
		commonui.adminwindow._.addContent('�޴���Ŀ')
		tTip.showdscp(e,commonui.adminwindow);
		},
	'utf-8',
	varName
	)
if(!e)e = window.event
try{e.stopPropagation();e.preventDefault()}catch(er){}
e.cancelBubble =true,e.returnValue = false
return
},//fe


parseD3Search :function(x,lang,t1){
var i,html=[]

for(var k in x){//k in item spell rune
	for(var j in x[k]){//j is int
		if(x[k][j].id){
			if(k=='item')i='��Ʒ'
			else if(k=='spell')i='����'
			else if(k=='rune')i='����'
			else if(k=='gem')i='��ʯ'
			else i='����'
			html[i] += this.linkGen(this.db_d3, k, x[k][j].id, lang, x[k][j].name)+' ';
			}
		}
	}
var tmp = ''
for(var k in html)
	tmp+="<h4 class='silver'>"+k+"</h4>"+html[k].replace(/^undefined/,'')
return tmp
},//fe

parseLolSearch:function(x,lang,t1){
var i,html=[]

for(var k in x){//k in item spell rune
	for(var j in x[k]){//j is int
		if(x[k][j].id){
			if(k=='item')i='��Ʒ'
			else if(k=='spell')i='����'
			else if(k=='rune')i='����'
			else if(k=='skin')i='Ƥ��'
			else if(k=='hero')i='Ӣ��'
			else i='����'
			html[i] += this.linkGen(this.db_lol, k, x[k][j].id, lang, x[k][j].name)+' ';
			}
		}
	}
var tmp = ''
for(var k in html)
	tmp+="<h4 class='silver'>"+k+"</h4>"+html[k].replace(/^undefined/,'')
return tmp
},//fe

parseWowSearch:function(str,lang,t1){
var $ = function(){return {append:function(){},attr:function(){}}} , Table={create:function(){}} , spells_data , quests_data , items_data , npcs_data , achievements_data , quests_data, hscards_data , buildings_data, getItem =[],  getSpell =[], getAchievement =[], getNpc =[], getQuest =[],getPetAbility =[],getBuilding=[], getAbility=[]

eval(str)
	
var html = '',x = {}

if(items_data && (!t1 || t1=='item'))
	x['item'] = items_data
if(npcs_data && (!t1 || t1=='npc'))
	x['npc'] = npcs_data
if(quests_data && (!t1 || t1=='quest'))
	x['quest'] = quests_data
if(achievements_data && (!t1 || t1=='achievement'))
	x['achievement'] = achievements_data
if(spells_data && (!t1 || t1=='spell'))
	x['spell'] = spells_data
if(hscards_data && (!t1 || t1=='hscard'))
	x['hscard'] = hscards_data
if(buildings_data && (!t1 || t1=='building'))
	x['building'] = buildings_data

for(var k in x){
	html += "<h4 class='silver'>"+(
		k=='item' ? '��Ʒ' : (k=='npc' ? 'NPC' : (k=='quest' ? '����' : (k=='achievement' ? '�ɾ�' : (k=='spell' ? '����' : (k=='hscard' ? '¯ʯ��˵����' : (k=='building' ? '����' : '����'))))))
		)+"</h4>"

	for(var i=0; i<x[k].length;i++)
		html += this.linkGen('wow',k,x[k][i][0],lang,x[k][i][1])+' ';
	}
	
if(html=='')
	html = '������'
	
return html
}
	
}//ce
//----------------------------------------
//
//
//
//
//
//----------------------------------------

commonui.loadmostuserrecommendbyfid = function (x,fid,day,nocache){
commonui.loadtopic_js(x,Array('data/bbscache/load_topic_cache/mostuserrecommend_'+fid+'_'+day+'.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&js=1&f=mostuserrecommend&fid='+fid+'&day='+day+'&timeout='+3600*2.1),3600*2.1);
}

commonui.loadhotbyfid = function (x,fid,nocache){
commonui.loadtopic_js(x,Array('data/bbscache/load_topic_cache/hot_'+fid+'_.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&js=1&f=hot&fid='+fid+'&timeout='+3600*2.1),3600*2.1);
}

commonui.loadtodaydelbyfid = function (x,fid,nocache){
commonui.loadtopic_js(x,Array('data/bbscache/load_topic_cache/todaydel_'+fid+'_.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&js=1&f=todaydel&fid='+fid+'&timeout='+3600*1.1),3600*1.1,false);
}

commonui.loadtopic = function (x,cacheurl,url,nocache,timeout)
{
var self=this;
if(typeof(x)=='string')x=$(x)
if (x.innerHTML=='')
	{
	var onstart = function(){x.innerHTML=='Loading ...'}
	var onsucc = function(y,h){
		if (h)
			{
			h = h.match(/Last-Modified: (.+)/i)
			if (h && h[1])
				{
				if ((date.getTime()-Date.parse(h[1]))>timeout*1000 && !nocache)
					{
					commonui.loadtopicbyfid(x,cacheurl,url,1,timeout)
					return
					}
				}
			}
		y=y.replace(/^<\?php\s*\$write='(.+?)';\s*\?>$/i,'$1').replace(/\\'/g,"'");
		y = y.match(/(<li.+?<\/li>)/g);
		y = y.sort(function(){return Math.random()-0.5});
		var liclass = "class='b1'";
		for (var i=0; i<y.length; i++)
			{
				if (liclass=="class='b1'") liclass = "class='b2'";
				else liclass = "class='b1'";
				y[i] = y[i].replace(/class='b\d'/,liclass)
			}
		y = '<ul>'+y.join('')+'</ul>';
		x.innerHTML=y;
		}
	var onfail = function(){x.innerHTML=='Load error ...'}
	var q = new Array;
	if (!nocache)
		{
		q.push(cacheurl);
		}
	q.push(url);
	httpDataGetter.muti_get(q,onstart,onsucc,onfail);
	}
}

commonui.loadtopic_js = function (x,url,timeout,randomorder,subjectlimit)
{
if (typeof(randomorder)=='undefined') randomorder=true;
if (!subjectlimit) subjectlimit=21;
var self=this;
if(typeof(x)=='string')x=$(x)
if (x.innerHTML=='')
	{
	var date = new Date;
	if(typeof(url)=='string')url = Array(url)
	if(!url[1])timeout=0;
	httpDataGetter.script_muti_get(
		url,
		function(data)
			{
			if (!data)
				{
				return false;
				}
			if (timeout && (__NOW-data.time)>timeout)
				{
				return false;
				}
			var html=new Array;
			var liclass = "class='b1'";
			var hot='';
			var tid=0;
			var title='';
			var d=new Array;
			for (var k in data.data) d.push(data.data[k])
			if (randomorder) d = d.sort(function(){return Math.random()-0.5});
			for (var k=0;k<d.length;k++)
				{
				if (!d[k]) continue;
				if (liclass=="class='b1'") liclass = "class='b2'";
				else liclass = "class='b1'";
				if(d[k].hot)hot=d[k].hot;
				if(d[k].quote_from)tid=d[k].quote_from; else tid=d[k].tid;
				if(d[k].subject.length>21)
					{
					title=d[k].subject;
					d[k].subject=d[k].subject.substr(0,subjectlimit)+'...';
					}
				else title='';
				html.push("<li "+liclass+"><span class='subinfo'>"+hot+" "+commonui.time2shortdate(d[k].postdate)+"</span><a href='/read.php?tid="+tid+"' title='"+title+"'>"+d[k].subject+"</a></li>");
				}
			x.innerHTML='<ul>'+html.join('')+'</ul>';
			return true;
			},
		function()
			{
			x.innerHTML='��ȡ����';
			},
		'gbk'
		);
	}
}