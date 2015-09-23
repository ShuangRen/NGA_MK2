/*
========================
commonlib.20131012 for nga
------------
(c) Zeg All Rights Reserved
========================
*/

//==================================

//��������

//==================================
var __NUKE = {
	
_w : window,
_d : window.document,

/**
 *�򵥵ĸ���һ��ocject
 */
simpleClone : function (o){
if(o == null || typeof(o) != 'object')
	return o;
var oo = new o.constructor(); // changed (twice)
for(var k in o)
	oo[k] = this.simpleClone(o[k]);
return oo;
},//fe

/**
 *����һ����object �̳��ڲ���object
 */
inheritClone : function (o){
if(o == null || typeof(o) != 'object')
	return o;
var oo =function(){};
oo.prototype=o
return new oo;
},//fe


/**
 *һ�ּ򵥵ı��� ���������������
 */
scEn:function (v,no){
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
},//fe

/**
 *һ�ּ򵥵ı���Ľ���
 */
scDe:function (s){
s = s.split('~')
if(s.length==1)return s
var v={}
for (var i=0;i<s.length;i+=2)
	v[s[i]]=s[i+1]
return v
},//fe

/*
 *��ȡcss/event����������������� �õ�һ�����Լ�� ���ɺ���һϵ�еļ�������
 *��һ������ ���ڼ���obj
 *��i������ ������(����ĸСд ֮��ÿ������ĸ��д)
 *��i+1������ ������������ 1 style 2 event 3 css (event���͵ļ����ff��������
 */
cpblName : function(){
var a = arguments, x=[], w,
l=function(x){return x.replace(/[A-Z]/g,function($0){return '-'+$0.toLowerCase()})},
u = function(x){return x.substr(0,1).toUpperCase()+x.substr(1)},
c={0:'moz',1:'webkit',2:'ms',3:'o',4:'khtml'}
if(a[2]==1){
	if(a[1] in a[0])
		x[0] = a[1]
	else{
		a[1] = u(a[1])
		for(var i=0;i<5;i++){
			if(c[i]+a[1] in a[0]){
				x[0] = c[i]+a[1]
				break
				}
			}
		}
	}
else if(a[2]==2){
	w = a[1].toLowerCase()
	if('on'+l in a[0])
		x[0] = w
	else{
		for(var i=0;i<5;i++){
			if('on'+c[i]+w in a[0]){
				x[0] = c[i]+u(a[1])
				break
				}
			}
		}
	}
else{
	if(a[1] in a[0])
		x[0] = l(a[1])
	else{
		w = u(a[1])
		for(var i=0;i<5;i++){
			if(c[i]+w in a[0]){
				x[0] = '-'+c[i]+'-'+l(a[1])
				break
				}
			}
		}
	}
if(x[0]===undefined)
	return
for(var j=3;j<a.length;j+=2){
	if(a[j+1]==1)
		x.push( i ? c[i]+u(a[j]) : a[j] )
	else if(a[j+1]==2)
		x.push( i ? c[i]+u(a[j]) : a[j].toLowerCase() )
	else
		x.push( i ? '-'+c[i]+'-'+l(a[j]) : l(a[j]) )
	}
return x
},//fe

/**
 *ҳ��ߴ��Լ�����¼�λ����ع���
 */
position : {
b:null,
mr:null,//�Ҳ�����������

/**
 *����һ������������������ļٵ�event object
 *��̳һЩ����ֱ��ʹ��event object���������õ����λ��
 *��ĳЩ��Ҫ��ʱ���е����event object�����޷�����
 *�����ô˺�������һ����event
 */
dummyEvent:function(e){
if (e.targetTouches){
	if(e.targetTouches[0])
		e = e.targetTouches[0];
	else if(e.changedTouches[0])
		e = e.changedTouches[0];
	}
return {clientX:e.clientX,clientY:e.clientY,pageX:e.pageX,pageY:e.pageY}
},//fe
getOffset:null,

/*
 *��ȡҳ��ߴ��Լ�����¼�λ�� 
 *@param e �¼�object �޴˲����򷵻�������û��x, y, px, py����
 *@return ����һ������object �ṹ����
 *p = {
 *x , y, �¼���Դ��ڵ�λ��(�������˹�������λ��)
 *px , py, �¼����ҳ���λ��(�����˹�����֮���)
 *xf, yf, ҳ������� 
 *pw , ph, ҳ��ߴ� ��/��
 *cw , ch ���ڳߴ� ��/��
 *}
 */
get:function(e){

if (!this.b)
	this.b=(!document.compatMode || document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;

if (!this.getOffset){
	if (typeof window.pageYOffset != 'undefined')
		this.getOffset = function(){
			var b = this.b;
			return {xf:window.pageXOffset, yf:window.pageYOffset, pw:b.scrollWidth, ph:b.scrollHeight, cw:b.clientWidth, ch:b.clientHeight} 
			}
	else
		this.getOffset = function(e){
			var b = this.b;
			return {xf:b.scrollLeft,yf:b.scrollTop, pw:b.scrollWidth, ph:b.scrollHeight, cw:b.clientWidth, ch:b.clientHeight}
			}
	}
	
var p = this.getOffset()

if(e){
	if (e.targetTouches){
		if(e.targetTouches[0])
			e = e.targetTouches[0];
		else if(e.changedTouches[0])
			e = e.changedTouches[0];
		}

	if(e.pageX===undefined){
		p.x = e.clientX
		p.y = e.clientY
		p.px = p.x+p.xf
		p.py = p.y+p.yf
		}
	else if(p.yf && e.pageY==e.clientY){//mobile safari
		p.x = e.pageX - p.xf
		p.y = e.pageY - p.yf
		p.px = e.pageX
		p.py = e.pageY
		}	
	else{
		p.x = e.clientX
		p.y = e.clientY
		p.px = e.pageX
		p.py = e.pageY		
		}
	}

return p	
	
},//fe

/**
 *���ض�λ����ʾobj
 *@param o dom object
 *@param x x�����event
 *@param y y����
 *@param z 1 ����o�����  2 ����o�Ŀ��Ϊ����� 4����Ϊ100%��Ⱥ͸߶�(�����ռ�) 8����4px���ָ��ƫ�� 16�Զ����
 */
setPos : function(o,x,y,z){
if(typeof x=='number' && typeof y=='number'){
	o.style.left = x+'px'
	o.style.top = y+'px'
	o.style.display='block';
	return
	}

var p = this.get(x)
if(this.mr){
	p.pw -= this.mr
	p.cw -= this.mr
	}
	
if(z&1)
	o.style.maxWidth = p.cw-26+'px'
if(z&2)
	o.style.width = p.cw-26+'px'
if(z&16){
	if(!this.em){
		if(commonui && commonui.getBaseFontPx)
			this.em = commonui.getBaseFontPx()
		else{
			this.em = _$('/span').$0('innerHTML','&emsp;')
			document.body.appendChild(this.em)
			var t = this.em.offsetWidth
			document.body.removeChild(this.em)
			this.em = t
			}
		}
	o.style.width = (this.em*50<(p.cw-26) ? this.em*50 : (p.cw-26)*0.75)+'px'
	}
if(z&4){
	o.style.height ='100%'
	o.style.width ='100%'
	}
o.style.visibility='hidden';
o.style.display = 'block';
var xf , yf , ow =(o.offsetWidth?o.offsetWidth:0) , oh = (o.offsetHeight?o.offsetHeight:0), sp = (z&(4|8)) ? 0 : 5

if(x===undefined || x===null){
	xf = Math.floor((p.cw-ow)/2)
	yf = Math.floor((p.ch-oh)/2)
	p.x = p.y = 0
	if(xf<0)xf = sp;
	if(yf<0)yf = sp;
	}
else{
	if(p.cw-p.x-ow>sp*2)xf=sp;//right
	else xf = p.cw-p.x-ow-sp;//left

	if(p.ch-p.y-oh>sp*2) yf=sp;//down
	else yf = p.ch-p.y-oh-sp;//up
	}

xf = p.x + p.xf + xf
yf = p.y + p.yf + yf
if(xf<0)xf = sp;
if(yf<0)yf = sp;

o.style.left = xf+'px';
o.style.top = yf+'px';
o.style.visibility='visible';
}//fe

},//ce position

/**
 *ͬ�� �ϸ�ʽ���� �����������
 */
getDocSize:function(){
var p = this.position.get()
p.sW = p.pw
p.sH = p.ph
p.cW = p.cw
p.cH = p.ch
p.sL = p.xf
p.sT = p.yf
return p
},//fe

/**
 *�ж�һ��mouseout�¼� �Ƿ�������Ƶ�Ԫ��֮��
 *@param e event mouseout�¼�
 *@param o Ԫ��node
 */
ifMouseLeave:function(e,o){
if (!e) var e = window.event;
var r = e.relatedTarget ? e.relatedTarget : e.toElement,t=r
while (r && r != o && r.nodeName != 'BODY')
	r= r.parentNode
if (r==o) return false;
return t
},//fe

/**
 *��Ҫ������������ʽ���ַ���ת��������(int)����
 */
toInt:function(n){
var n = parseInt(n,10)
if(!n)n=0
return n
},//fe

/**
 *����һ����ͼƬnode ͼƬ��Ⱦ֮�������ָ����callback����
 *@param f callback���� �����е�this��ͼƬnode����
 */
trigger:function(f){
return _$('<img/>')._.attr('src','about:blank')._.css('display','none')._.on('error',f)
},//fe

/**
 *���css��ʽ
 *@param css css��ʽ���ı�
 */
addCss:function(css){
var h = document.getElementsByTagName('head')[0],s = document.createElement('style');
s.type = 'text/css';
if (s.styleSheet){
	h.appendChild(s);
	s.styleSheet.cssText = css;
	}
else {
	s.appendChild(document.createTextNode(css));
	h.appendChild(s);
	}
},//fe

fireEvent:function(o,n){
var e={}; // The custom event that will be created

if (document.createEvent) {
	e = document.createEvent("HTMLEvents");
	e.initEvent(n, true, true);
	}
else {
	e = document.createEventObject();
	e.eventType = n;
	}
e.eventName = n;

if (document.createEvent)
	o.dispatchEvent(e);
else
	o.fireEvent("on" + e.eventType, e);
},//fe

/**
* HTTP REQUEST
* @param a ���������һ��object �ṹ����
* a._id ��Ҫ�����
* a._noLock ��Ҫ�����
* a.u �����ַ Ϊstringʱʹ��get����;  Ϊ{u:url,a:{k1:v1,k2:v2....}}ʱʹ��postpost����;  ��Ҫʹ�á������ַ��ʱ[u0,u1 ...]
* a.c ������Ϣ���ַ��� ����Ĭ��Ϊ�գ���ҳ����ͬ����
* a.b �ύ��ť/������ (���Ժ���
* a.f �ɹ�ʱcallback���� ��˺�������true��Ϊ�ɹ� ����false��Ϊʧ�� ʧ�ܲ����С������ַ��ʱ�����������һ��
* a.ff ʧ��ʱʱcallback���� �������ȫ��ʧ�ܻ� a.fȫ������falseʱִ��
* a.t ����target(����postʱ��) ��Ϊdom node���Ŀ��iframe���������� �粻��ʹ������iframe
* a.n ���ݱ��������� ����Ĭ��Ϊscript_muti_get_var_store (����������ݱ�������Ϊcallback a.f�ĵ�һ������ 
* a.ca �Ƿ񻺴��� (����a.u��stringʱ
*/
doRequest:function(a){

if(!this.doRequest.form){
	this.doRequest.form = this._w._$('<form/>')._.attr('method','post')._.css('display','none')
	this._d.body.insertBefore(this.doRequest.form,this._d.body.firstChild)

	this.doRequest.target = this._w._$('/span').$0('style',{display:'none'})
	this._d.body.insertBefore(this.doRequest.target,this._d.body.firstChild)
	
	this.doRequest.args=[]
	}

//if(window.__CURRENT_UID && window.__GP && __GP.userBit && (__GP.userBit & 128)){
//	var esalt = commonui.userCache.get('extraAuthSalt'),date = Math.floor((new Date()).getTime()/1000)
//	if(esalt)
//		__COOKIE.setCookieInSecond('extra_auth',hex_md5(esalt+date+__CURRENT_UID)+s,3600*24);
//	}

if(!a._id)
	a._id = 'doHttpRequest'+Math.floor(Math.random()*10000)
if(!a.n)
	a.n = 'script_muti_get_var_store'
if(!a.t)
	a.t = this.doRequest.target

var f = this._doRequestLock(a)
if(f)return alert(f)

if(!a.f){
	a.f = function(d){//����.error����ʾ.error ������ʾ.data
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
		alert(y)
		return true
		}
	a.ff = function(){
		alert('ERROR REQUEST')
		}
	}

if(a.ca && typeof a.u=='string'){
	if(this._doRequestCache[a.u])
		return a.f.call(window,this._doRequestCache[a.u])
	}
	
this.doRequest.args.push(a)

if(!this.doRequest.run){
	this.doRequest.run=true
	return window.setTimeout(function(){__NUKE._doRequest()},50)
	}
},//fe

_doRequest:function(){
	
var a = this.doRequest.args[0]

if(!a){
	//console.log('query 0 exit')
	return __NUKE.doRequest.run = false
	}

if(!a.u){
	this._doRequestLock(a,true)
	this.doRequest.args.shift()
	//console.log('query '+this.doRequest.args.length+' continue')
	return window.setTimeout(function(){__NUKE._doRequest()},50)
	}
//console.log('query '+this.doRequest.args.length+' do')
var u = typeof(a.u)=='string' || a.u.u ? a.u : a.u[0]

if(typeof(u)=='string'){
	if(this.doRequest.script)this.doRequest.script.parentNode.removeChild(this.doRequest.script)
	//delete this._w[a.n]
	this._w[a.n] = null
	f = this._w._$('/script')._.attr({id:a._id, src:u, charset:a.c?a.c:'', type:'text/javascript'})._.on('readystatechange',this._doRequestCallback)._.on('load',this._doRequestCallback)._.on('error',this._doRequestCallback)
	this.doRequest.script = f
	this._d.getElementsByTagName('head')[0].appendChild(f)
	return
	}

var f = this.doRequest.form
f.innerHTML=''
f.action = u.u
for(var k in u.a)
	f._.aC(_$('<input/>')._.attr({type:'hidden',value:u.a[k],name:k}))

if(typeof(a.t)=='object' && a.t.nodeType==1){
	f.target = a._id
	a.t.innerHTML = ''
	a.t.appendChild(this._w._$('<iframe name="'+a._id+'"></iframe>')._.attr({name:a._id, id:a._id, scrolling:'no', allowtransparency:'true', src:'about:blank', frameBorder:'0'})._.css({width:(a.t.offsetWidth ? a.t.offsetWidth+'px' : '200px'),height:(a.t.offsetHeight ? a.t.offsetHeight+'px' : '50px'),border:'none',overflow:'hidden'}))._.on('readystatechange',this._doRequestCallback)._.on('load',this._doRequestCallback)._.on('error',this._doRequestCallback)
	}
else if(typeof(a.t)=='string')
	f.target = a.t

f.submit()
},
_doRequestCache:{},
_doRequestLock:function(a,clear){
if(clear){
	if(a.b){
		a.b.disabled = a.b.__submiting = false
		if(a.b.style)
			a.b.style.crusor = ''
		}
	return
	}

if(a.b){
	if(a.b.disabled || a.b.__submiting)
		return '�ύ�� ���Ժ�����'
	a.b.disabled = a.b.__submiting = true
	if(a.b.style)
		a.b.style.crusor = 'wait'
	}
},//fe

_doRequestCallback:function(){
var o = this
if((o.readyState && o.readyState!='complete' && o.readyState!='loaded')||o.__loadRunned)
	return
o.__loadRunned = true
var w = window, r = true, a = w.__NUKE.doRequest.args[0]
if(a.f){
	try{
		var d = o.nodeName == 'IFRAME' ? o.contentWindow[a.n] : w[a.n]
		}
	catch(e){
		console.log('__NUKE._doRequestCallback')
		console.log(e)
		var d = null
		}
	if(d && d.debug)
		console.log(d.debug)
	if(a.ca && typeof(a.u)=='string')
		__NUKE._doRequestCache[a.u] = d
	r = a.f.call(w, d)
	}
if(r || typeof(a.u)=='string' || a.u.u || a.u.length==1){//��ɹ� �� ��get �� ��post �� ����get��post���Ҷ�����û����һ���� ��ʱ�� ��������
	if(!r && a.ff)
		a.ff.call(w)
	a.u=null
	}
else
	a.u.shift()
window.setTimeout(function(){__NUKE._doRequest()},50)
},//fe

/**
* http post
* ͬdoRequest
*/
doPost : function(a){
if(a.a){
	a.u={u:a.u,a:a.a}
	delete a.a
	}
else if(typeof(a.u)=='string'){
	a.u={u:a.u,a:{nouse:'post'}}
	}
return this.doRequest(a)
},

/**
*���doRequest���صı�׼�����Ƿ���ȷ(��̳��API��ڷ������ݴ󲿷���ͬ����ʽ�ġ���) ���ش�����Ϣ �緵��true��Ϊ��ʱ
*/
doRequestIfErr:function(x,timeout){
if(!x)
	return 'no data'
if(x.error)
	return x.error[0]
if(!x.data)
	return 'no data'
if(x.data.constructor === Array){
	if(!x.data.length)
		return 'no data'
	}
else{
	var k=null;
	for(var k in x.data){
		break
		}
	if(k===null)
		return 'no data'
	}
if(x.time && (timeout || x.timeout)){
	var t = window.__NOW
	if(!t)
		t = Math.floor((new Date).getTime()/1000)
	
	if(t-x.time > (timeout ? timeout : x.timeout))
		return true
	}
},

/**
 *�Ͻӿڼ��� �����������
 */
doRequestIfData:function(x,timeout){
if(!x)
	return
if(typeof(x.data)=='undefined' && typeof(x.error)=='undefined')
	return
if(x.time && (timeout || x.timeout)){
	var t = window.__NOW
	if(!t)
		t = Math.floor((new Date).getTime()/1000)
	
	if(t-x.time > (timeout ? timeout : x.timeout))
		return
	}
return true
}


}//ce

//==================================

//DOM

//==================================

window.$ = function(id){return document.getElementById(id)}

window.put = function(txt){document.write(txt)}

/*
*Element ԭ����չ
*ʵ��ʹ�÷�ʽ�������window._$
*/
var domExtPrototype={ 
/*
 *������ʽclass
 */
cls:function(cn){
	this.self.className += ' '+cn
	return this.self 
	},
/*
 *�趨css��ʽ
 *@param name , value , name , value , name , value ...
 *@param (obj)o/{name:value,name:value,name:value...}
 */
css:function(){
	if(arguments.length==1){
		var o = arguments[0]
		for (var k in o)
			this.self.style[k]=o[k]
		}
	else
		for(var i=0;i<arguments.length;i+=2)
			this.self.style[arguments[i]]=arguments[i+1]
	return this.self
	},
/*
 *���¼�
 *@param �¼���(��on) , callback(��һ��������event)
 */
on:function(type, fn){
	if (window.addEventListener)
		this.self.addEventListener(type, fn, false); 
	else if (window.attachEvent){
		var o = this.self
		o.attachEvent('on'+type, function(){fn.call(o, window.event)} ) 
		}
	return this.self; 
	},

/*
 *�����ӽڵ�
 *@param node , node , node , node , node , node ...
 *nodeΪnullʱ����
 *nodeΪstringʱnode=$(node)
 *nodeΪarrayʱ insertBefore(node.0,node.1)
 */
aC:function(){
	var o = this.self, i=0, a=arguments
	for (;i<a.length;i++){
		if(a[i]===null)continue
		if(a[i].constructor==Array){
			if(typeof(a[i][0])=='string')a[i][0]=$(a[i][0])
			o.insertBefore(a[i][0],a[i][1])
			}
		else{
			if(typeof(a[i])=='string')a[i]=$(a[i])
			o.appendChild(a[i])
			}
		}
	return o;
	},
/*
 *��������
 *@param name , value
 */
sV:function (o,v){
	if(!this.anyVar)this.anyVar={}
	if (v!==undefined) 
		this.anyVar[o]=v
	else 
		for (var k in o)  
			this.sV(k, o[k]) 
	return this.self
	},
/*
 *ȡ������
 *@param name
 */
gV:function (k){
	if(!this.anyVar)this.anyVar={}
	return this.anyVar[k] 
	},
/*
 *�����ӽڵ�
 *@param node , node , node , node , node , node ...
 *nodeΪnullʱ����
 *nodeΪstringʱnode=document.createTextNode(node)
 *nodeΪarrayʱinsertBefore(node.0,node.1)
 */
add:function(){
	var o = this.self, i=0, a=arguments
	for (;i<a.length;i++){
		if(a[i]===null)
			continue
		else if(typeof a[i] =='object'){
			if(a[i].constructor==Array){
				o._.add.apply(o._,a[i])
				}
			else
				o.appendChild(a[i])
			}
		else
			o.appendChild(document.createTextNode(a[i].toString()))
		}
	return o
	},
/*
 *�ۺϵ���
 *@param attrName , attrValue , attrName , attrValue ... �������� ����ο�attr����
 *@param {name: value, name: value ...} ������������
 *@param event , callback , event , callback ... ע���¼� ����ο�on����
 *@param domNode , domNode ...  �����ӽڵ� (��nodeType���Ե�object��ΪdomNode) null�����ᱻ���� ����ο�add����
 *���ϲ����ɻ���
 *�趨className����ʱ��valueΪnull�����
 *�趨style����ʱvalueΪ{cssName: value, cssName: value ...}
 */
call:function(){
	for(var i=0;i<arguments.length;++i){
		var a = arguments[i]
		if(a===null)
			continue
		else if(typeof a == 'object'){
			if(a.constructor==Array)
				this.add.apply(a)
			if(a.nodeType)
				this.self.appendChild(a)
			else
				for(var k in a)
					this.attr(k,a[k])
			}
		else
			this.attr(a,arguments[++i])
		}
	return this.self
	},
/*
 *�趨���Ի���ʽ���¼�ע��
 *@param name , value 
 *@param event , callback 
 *@param {name: value, name: value ...}
 *�趨classNameʱ��valueΪnull����� ����Ϊ��ӵ�ԭclassName��β
 *�趨styleʱvalueΪ{cssName: value, cssName: value ...}
 */
attr:function(k,v){
	if(typeof v == 'function' && k.substr(0,2)=='on')
		return this.on(k.substr(2),v)
	if(arguments.length==1 && typeof k =='object'){
		for(var i in k)
			this.attr(i,k[i])
		return this.self
		}
	var o = this.self
	switch(k){
		case 'className':
			if(v===null)
				o.className=null
			else if(v)
				o.className+=' '+v
			break
		case 'style':
			if(typeof v=='string'){
				v = v.split(/:|;/)
				for(var s=0;s<v.length;++s)
					o.style[v[s]]=v[++s]
				}
			else
				for(var s in v)
					o.style[s]=v[s]
			break
		case 'id':
		case 'innerHTML':
		case 'title':
		case 'checked':
		case 'accessKey':
		case 'dir':
		case 'disabled':
		case 'lang':
		case 'tabIndex':
		case 'width':
		case 'value':
		case 'height':
			o[k]=v
			break
		default:
			o.setAttribute(k,v)
		}
	return o
	}
}//oe

/*
 *NGA��$ ȡԪ�ػ��½�Ԫ��

//�½�Ԫ�� 
var x = $('<span>')
var x = $('<span/>')
var x = $('/span')
var x = $('<span>abcd</span>')

//��idȡԪ�� 
var x = $('xxoo')

//����
$('xxoo')._.cls('xxxxoooo')._.attr('title','abcd')._.add($('<span/>'),$('<div/>'))//��ʽ���� ����������ʹ�òο�domExtPrototype

$('xxoo').$0('className','xxoo','style',{width:'100%'},$('/span'),'onclick',function(e){alert(123)})//�ۺϵ���(�����ȽϺ���) $0�Ĳ����ο�domExtPrototype.call
		
$('xxoo').$0('className','xxoo').$0('style',{width:'100%'},$('/span'),'onclick',function(e){alert(123)})//��ʽ�ۺϵ���

*/
window._$ = function (o){//fs
if(typeof o == 'string'){
	var x = o.substr(0,1)
	if(x=='/' || x=='<'){
		if(x = o.match(/^<?\/?([a-zA-Z0-9]+)\/?>?$/))
			o = document.createElement(x[1])
		else{
			x = document.createElement('span')
			x.innerHTML = o
			o = x.firstChild
			}
		}
	else
		o = document.getElementById(o)
	}
if(o!==null && o._==null){
	o._=function(){}
	o._.prototype=domExtPrototype
	o._ = new o._
	o._.self = o
	if(!('$0' in o))//ie6 ie7
		o.$0=function(){return this._.call.apply(this._,arguments)}
	}
return o
}//fe


/*
*Ϊelementԭ�������ۺϵ��ú���$0 ie6 ie7֮��
*/
if (window.Element)
    window.Element.prototype.$0=function(){return this._.call.apply(this._,arguments)}


//==================================

//cookieAndSerialize
//cookie ��ع���
//==================================

var __COOKIE = {
cookieCache:{},
domain:'',
path:'/',
date:null,
now:0,
misccookiename:'',

init:function (domain,path,misccookiename){
if (domain)
	this.domain = domain;
else
	this.domain = window.location.href.toLowerCase().replace(/^http:\/\//,'').replace(/(\/|:).*/,'')/*.replace(/^[^\.]+\.([^\.]+\.)/,'$1');*/
//this.path = path;
this.date = new Date;
this.now = this.date.getTime();
if(misccookiename)
	this.misccookiename = misccookiename
},//fe

setCookieInSecond:function (name,value,sec){
if(!this.domain)
	this.init()
if(sec == 0){
	var sec = (__SETTING && __SETTING.uA[0]==1) ? '' : 'expires=0'//session cookie
	}
else{
	this.date.setTime(0)
	this.date.setTime(this.now + sec*1000)
	var sec = 'expires=' + this.date.toUTCString()
	}
document.cookie = name + "="+ escape (value) + ";domain="+this.domain+";path="+this.path+";" + sec;
},//fe

deleteCookie:function(name){
this.setCookieInSecond(name,'',-1000)
},//fe

setMiscCookieInSecond:function (name,value,sec)
{
if(!this.misccookiename)
	return
this.extractMiscCookie()
var c = this.cookieCache[this.misccookiename]
if(sec===undefined && c[name]){
	c[name][0] = value	
	}
else if (sec>0){
	this.date.setTime(this.now + sec*1000);
	c[name] = {
		0:value,
		1:Math.floor(this.date.getTime()/1000)
		};
	}
else
	delete c[name];
this.setCookieInSecond(this.misccookiename,this.json_encode(c),31536000);
},//fe

extractMiscCookie:function(){
var c = this.cookieCache, n = this.misccookiename
if (typeof c[n] != 'object'){
	this.getCookie(n);
	if (typeof(c[n])=='string'){
		if(c[n].charAt(0)=='{'){
			var tmp = {},reset=false
			try{eval('var tmp='+c[n]+';');}catch(e){}
			
			for(var k in tmp){
				//old comparative
				if(tmp[k].t){
					tmp[k][1] = tmp[k].t
					delete(tmp[k].t)
					reset=true
					}
				if(tmp[k].v){
					tmp[k][0] = tmp[k].v
					delete(tmp[k].v)
					reset=true
					}
				if(typeof tmp[k][1]=='string'){
					tmp[k][1] = Math.floor(Date.parse(tmp[k].t)/1000)
					reset=true
					}
				//----------------	
					
				if(tmp[k][1]*1000<this.now){
					delete tmp[k]
					reset=true
					}
				}

			if(reset)
				this.setCookieInSecond(n,this.json_encode(tmp),31536000);

			c[n] = tmp;
			}
		else
			c[n]={}
		}
	else
		c[n]={}
	}
},//fe

getMiscCookie:function (name)
{
if(!this.misccookiename)
	return
this.extractMiscCookie()
var c = this.cookieCache[this.misccookiename]
if (c[name]){
	if(c[name][1]*1000>=this.now)
		return c[name][0]
	else{
		delete c[name]
		this.setCookieInSecond(this.misccookiename,this.json_encode(c),31536000);
		}
	}
return null
},//fe

getCookie:function (name){
if (typeof(this.cookieCache[name])=='undefined')
	{
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if (arr)
			{
				this.cookieCache[name] = unescape(arr[2]);
			}
		else
			{
				this.cookieCache[name] = null;
			}
	}
return this.cookieCache[name];
},//fe

ifMiscCookie:function (){
if(!this.misccookiename)
	return
if (typeof(this._ifMiscCookie)=='boolean') return this._ifMiscCookie;
else if (document.cookie.match(new RegExp("(?:^| )"+this.misccookiename+"="))) this._ifMiscCookie = true;
else this._ifMiscCookie = false;
return this._ifMiscCookie;
},//fe

/**
 *�򵥵�json����
 *�����ϸ�json���� ֻ��javascipt������ȷʶ��ĸ�ʽ
 */
json_encode:function(v) { 
switch (typeof(v)) { 
	case 'string':
		return '"' + v.replace(/"|\n|\\/g,function($0){return $0=='"' ? '\\"' : $0=='\n' ? '\\n' : '\\\\'}) + '"';
	case 'number':
		return v.toString(10);
	case 'boolean':
		return v.toString();
	case 'object':
		if(v==null)return 'null'
		var buf = []
		if (v.constructor==Array){
			for (var i=0;i<v.length;i++)
				buf.push(this.json_encode(v[i]));
			return '[' + buf.join(',') + ']';
			}
		else{
			for (var k in v){
				if (isNaN(parseInt(k,10)))
					buf.push('"'+k.replace('"','\\"') + '":' + this.json_encode(v[k]));
				else
					buf.push(k + ':' + this.json_encode(v[k]));
				}
			return '{' + buf.join(',') + '}';
			}
	default: 
		return 'null';
	}
},//fe

/**
 *�򵥵�json����
 *ʵ��ֻ��evalһ�� ע�ⰲȫ��
 */
json_decode:function(txt){
try{
	eval('var x = '+txt)
	}
catch (e){
	var x = null
	}
return x;
}//fe
}//ce

//==================================

//�ű�/��ʽ���ļ�������

//==================================

var loader = {

/**
 *������ʽ���ļ�
 *@param src ��ַ
 *@param sync �Ƿ���ͬ��ģʽ (ֱ��document.write
 */
css:function (src,sync){
if(sync){
	sync = "<link rel='stylesheet' href='"+src+"' type='text/css'/>"
	if(document._documentWirteBak)document._documentWirteBak(sync)
	else document.write(sync)
	return
	}
var x = document.createElement('link')
x.href = src
x.rel = 'stylesheet'
x.type = 'text/css'
var h = document.getElementsByTagName('head')[0]
h.insertBefore(x,h.firstChild)
},//fe

scriptTpl:null,

/**
 *���ؽű�
 *@param src ��ַ
 *@param callback �ص����� �����е�thisΪscript node����
 *@param charset ָ���ű��ı��� һ�㲻���� ��������Զ�ʶ��
 *@param sync �Ƿ���ͬ��ģʽ (ֱ��document.write
 */
script:function (src,callback,charset,sync){
if(typeof(src)=='object'){
	callback = src[1]
	charset = src[2]
	sync = src[3]
	src = src[0]
	}	
if(!this.scriptTpl)this.scriptTpl = document.createElement('script')
if(sync){
	if(callback){
		var k='call'+Math.random().toString().substr(2)
		this.callback[k]=callback
		if(this.scriptTpl.readyState)
			var c=" onreadystatechange='if(this.readyState && this.readyState != \"loaded\" && this.readyState != \"complete\")return;window.loader.callback."+k+".call(this)' "
		else
			var c=" onload='window.loader.callback."+k+".call(this)' "
		}
	else
		c=''
	sync = "<scr"+"ipt src='"+src+"' "+(charset ? "charset='"+charset+"'" : '')+" "+c+" type='text/javasc"+"ript'></scr"+"ipt>"
	if(document._documentWirteBak)document._documentWirteBak(sync)
	else document.write(sync)
	return
	}
var x = this.scriptTpl.cloneNode(0)
x.src=src
if(charset)x.charset = charset
if (callback) {
	if(x.readyState){
		x.onreadystatechange = function() {
			if (this.readyState && this.readyState != 'loaded' && this.readyState != 'complete')return;
			callback.call(this);
			}
		}
	else{
		x.onload = function() {callback.call(this)}
		}
	}

var h = document.getElementsByTagName('head')[0]
h.insertBefore(x,h.firstChild)
//commonui._debug.push('start '+src)
},

callback:{},

/**
*�Ͻӿڼ��� ��Ҫ���������
*/
ver:4,
w_i: function(s,o){
o.onload = null;
window.setTimeout(function(){o.src=s},100);
},//fe
/**
*�Ͻӿڼ��� ��Ҫ���������
*/
w_s:function(s,o,writeSelf){
if (!writeSelf)
	o = o.parentNode;
if (s.indexOf(':')==-1){
	if (s.charAt(0)==' ')
		window.setTimeout(function(){o.className=o.className+s},100);
	else
		window.setTimeout(function(){o.className=s},100);
	}
else{
	if (s.charAt(0)==';')
		window.setTimeout(function(){o.style.cssText=o.style.cssText+s},100);
	else
		window.setTimeout(function(){o.style.cssText=s},100);
	}
}//fe
}//ce


//==================================

//DOM STORE
//��������ش��� ����ʹ��commonui.userCache ��Ҫֱ�������
//==================================

if (window.ActiveXObject || window.globalStorage || window.localStorage)
{
var domStorageFuncs = {
now:null,
domain:null,
o:null,
type:null,
init : function(v){
var w = window,err=0

this.domain = w.location.hostname

try{
	if(w.localStorage){
		this.type=1
		this.o=w.localStorage
		}
	}
catch(e){
	// some time localStorage cant access in IE8 IE9 IE10
	err=1
	}

if(!this.o){
	try{
		if(w.globalStorage){
			this.type=1
			this.o=w.globalStorage[this.domain]
			}
		}
	catch(e){
		// some time globalStorage cant access in  FIREFOX
		err=2
		}
	}

if(!this.o){
	try{
		if(w.ActiveXObject){
			w.document.documentElement.addBehavior("#default#userdata")
			this.o=w.document.documentElement
			}
		}
	catch(e){
		err=3
		}
	}
/*
if(!this.o || err){//all error return null
		var x = w.document.createElement('script'), y=w.document.getElementsByTagName('head')[0], z=0
		x.src = '/nuke.php?func=temp&rand='+Math.random()+'&xxxooxx='+encodeURIComponent((this.o ? 1 : 0)+' / '+this.domain+' / '+err+' / '+e+' / '+w.navigator.userAgent)
		y.insertBefore(x,y.firstChild)
	
	}
*/	
if(!this.o)//all error return null
	return

if (w.__NOW)
	this.now=parseInt(w.__NOW,10)
else{
	this.now=new Date
	this.now=Math.floor(this.now.getTime()/1000)
	}
return true
},
set : function(key, value, timeout) {
if (!this.o && !this.init())return
if(!timeout)timeout = 86400*30
if(this.type==1){
	if(Math.random()<0.1)this.checkTimeout(this.o)
	this.o.setItem(key, (this.now+timeout)+''+value);
	}
else{
	with(this.o){
		try{
			load(key);
			}
		catch (ex){}
		setAttribute("js", value);
		expires = new Date((this.now+timeout)*1000).toUTCString();
		save(key);
		}
	}
},
checkTimeout:function (x){
for (var i=0;i<x.length;x++){
	var y = parseInt(x.getItem(x.key(i)).substr(0,10),10)
	if (!y || (y && y<this.now))
		x.removeItem(x.key(i))
	}
},//fe
get : function(key) {
if (!this.o && !this.init())return
if (this.type==1){
	try{
		var x =this.o.getItem(key)
		}
	catch(ex){
		return null
		}
	if(x){
		var y = parseInt(x.substr(0,10),10)
		if(y){
			if (y>this.now)
				return x.substr(10)
			else{
				this.o.removeItem(key)
				return null
				}
			}
		else
			return x
		}
	}
else{
	with(this.o){
		try{
				load(key);
				return getAttribute("js");
			}
		catch (ex){
				return null;
			}
		}
	}
return null;
},
remove : function(key) {
if (!this.o && !this.init())return
if (this.type==1){
	return this.o.removeItem(key);
	}
else {
	with(this.o){
		try{
			load(key);
			expires = new Date(315532799000).toUTCString();
			save(key);
			}
		catch (ex){};
		}
	}
}
}//end domStorage

}//end if

//==================================

//Forward compatible for nga
//�Ͻӿڼ���
//==================================
var httpDataGetter={script_muti_get:function(u,h,hf,c,cN){
var a = {
	u:u,
	f:h,
	ff:hf,
	c:(typeof(c)=='object' ? c.charset : c),
	n:(cN ? cN : typeof(c)=='object' ? c.varName : null) 
	}
return __NUKE.doRequest(a)
}
}


if (!__IMG_BASE)
{
var __AJAX_DOMAIN = window.location.href.toLowerCase().replace(/^http:\/\//,'').replace(/(\/|:).*/,'').replace(/^[^\.]+\.([^\.]+\.)/,'$1');
var __IMG_BASE = 'http://img.'+__AJAX_DOMAIN;
var __CKDOMAIN = '.'+__AJAX_DOMAIN;
}

var w_i = loader.w_i, w_s = loader.w_s, id2e = $, cookieFuncs = __COOKIE, tTip={showdscp:function(e,o){return __NUKE.position.setPos(o,e)}};

//==================================

//XMLHttpRequest

//==================================
/*
var HTTP = (function()
{
var xmlhttp = false,e1,e2,e3;
try{
	xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
catch(e1)
	{
	try{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	catch(e2){
		xmlhttp = false;
		}
	}
if(!xmlhttp && typeof XMLHttpRequest!="undefined")
	{
		try{
			xmlhttp = new XMLHttpRequest();
			}
		catch (e3){
			xmlhttp = false;
			}
	}
//if (!xmlhttp)window.alert(e1 + e2 + e3);
return xmlhttp;
})();
*/

/*
var script_muti_get_var_store = null
var httpDataGetter = {

script_muti_syncget : function(url,f){
if (typeof(url)=='string')
	url=[url]
var u
while (u = url.shift()){
	HTTP.abort();
	HTTP.open('GET', u, false)
	HTTP.send('');
	if (HTTP.status==404)continue;
	u = HTTP.responseText
	if(u.indexOf('window.script_muti_get_var_store')!=-1){
		u = u.replace('window.script_muti_get_var_store','var u')
		eval(u)
		}
	u = f(u)
	if(u===false)continue;
	return u
	}
return undefined
},
//fe

script_muti_get_set_costom_value:function(v){
this._SMG.setCustomVar(v)
},//

script_muti_get:function(u,h,hf,c,cN)
{
this._SMG.get(u,h,hf,c,cN)
},//



_SMG:{
	getting:false,
	waiting:false,
	queue:[],
	cache:{},
	script:null,

	clone:function(o){ return __NUKE.simpleClone(o) },//fe

	setCustomVar:function (v){window.script_muti_get_var_store = v;},//fe

	//u: url array
	//h: success handler, return bool true to exit, return bool false to try next url
	//hf: all fail(no url) handler
	//c: script charset
	get:function(u,h,hf,c,cN){
		if (typeof(u)=='string')  u = [u];
		if (!c)c={}
		else if (typeof(c)=='string') c={'charset':c};
		if (cN)c.varName=cN
		this.queue.push({u:u,h:h,hf:hf,c:c})
		var self = this;
		window.setTimeout(function(){self.loop()},0)
		},//fe

	loop:function (noCheck){
		if(!noCheck){
			if (this.getting)
				return;
			}
		if(!this.queue.length){
			this.getting = false
			return;
			}
		else
			this.getting=true
		var u= this.queue.shift()
		this.act(u)
		},//fe

	act:function(u){
		var self=this
		var handler = function(){
			if (this.readyState && this.readyState != 'loaded' && this.readyState != 'complete')
				return
			if (u.c.varName)
				window.script_muti_get_var_store = window[u.c.varName];
			if (u.h(window.script_muti_get_var_store)){
				//if(!u.c.noCache)self.cache[this.src.toLowerCase()]=self.clone(window.script_muti_get_var_store)
				self.waiting = window.setTimeout(function(){self.loop(1)},0)
				return true
				}
			u.u.shift();
			if (u.u.length)
				self.waiting = window.setTimeout(function(){self.act(u)},0)
			else{
				u.hf();
				this.waiting = window.setTimeout(function(){self.loop(1)},0)
				}
			}
		//if(!u.c.noCache){
		//	if (u.u[0].indexOf('http://')==-1) var k = window.location.href.replace(/(http:\/\/.+?)(\/|$).* /,'$1')+u.u[0];
		//	else var k = u.u[0];
		//	if (this.cache[k.toLowerCase()]){
		//		u.h(this.cache[k.toLowerCase()]);
		//		this.waiting = window.setTimeout(function(){self.loop(1)},0)
		//		return;
		//		}
		//	}
		var h = document.getElementsByTagName('head')[0]
		if (this.script)
			h.removeChild(this.script)
		var s = document.createElement('script');
		if (u.c.charset) s.charset = u.c.charset;
		s.type = 'text/javascript'
		if(s.readyState)
			s.onerror = s.onreadystatechange = handler
		else
			s.onerror = s.onload = handler
		window.script_muti_get_var_store = null;
		if(u.c.varName)window[u.c.varName]=null
		s.src= u.u[0];
		this.script=s
		h.insertBefore(s,h.firstChild)
		}//fe
	}//ce




}//ce
*/
