(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{JAxp:function(e,t,a){e.exports={login:"antd-pro-components-login-index-login",getCaptcha:"antd-pro-components-login-index-getCaptcha",icon:"antd-pro-components-login-index-icon",other:"antd-pro-components-login-index-other",register:"antd-pro-components-login-index-register",prefixIcon:"antd-pro-components-login-index-prefixIcon",submit:"antd-pro-components-login-index-submit"}},Y5yc:function(e,t,a){"use strict";a.r(t);a("IzEo");var n=a("bx4M"),r=(a("Pwec"),a("CtXQ")),o=(a("sRBo"),a("kaz8")),i=(a("fOrg"),a("+KLJ")),s=a("MVZn"),c=a.n(s),l=a("lwsE"),p=a.n(l),u=a("W8MJ"),m=a.n(u),d=a("a1gu"),g=a.n(d),h=a("Nsbk"),f=a.n(h),b=a("7W2i"),v=a.n(b),y=a("q1tI"),E=a.n(y),C=a("MuoO"),w=a("LLXN"),x=a("mOP9"),M=(a("y8nQ"),a("Vl3Y")),N=(a("Znn+"),a("ZTPi")),S=a("RIqP"),O=a.n(S),T=(a("17x9"),a("TSYQ")),j=a.n(T),k=(a("14J3"),a("BMrR")),q=(a("+L6B"),a("2/Rp")),I=(a("jCWc"),a("kPKH")),P=(a("5NDa"),a("5rEg")),F=a("pVnL"),A=a.n(F),D=a("QILm"),L=a.n(D),G=a("BGR+"),B=a("JAxp"),z=a.n(B),U={UserName:{props:{size:"large",id:"userName",prefix:E.a.createElement(r["a"],{type:"user",className:z.a.prefixIcon}),placeholder:"admin"},rules:[{required:!0,message:"Please enter username!"}]},Password:{props:{size:"large",prefix:E.a.createElement(r["a"],{type:"lock",className:z.a.prefixIcon}),type:"password",id:"password",placeholder:"888888"},rules:[{required:!0,message:"Please enter password!"}]},Mobile:{props:{size:"large",prefix:E.a.createElement(r["a"],{type:"mobile",className:z.a.prefixIcon}),placeholder:"mobile number"},rules:[{required:!0,message:"Please enter mobile number!"},{pattern:/^1\d{10}$/,message:"Wrong mobile number format!"}]},Captcha:{props:{size:"large",prefix:E.a.createElement(r["a"],{type:"mail",className:z.a.prefixIcon}),placeholder:"captcha"},rules:[{required:!0,message:"Please enter Captcha!"}]}},J=Object(y["createContext"])(),V=J,K=M["a"].Item,W=function(e){function t(e){var a;return p()(this,t),a=g()(this,f()(t).call(this,e)),a.onGetCaptcha=function(){var e=a.props.onGetCaptcha,t=e?e():null;!1!==t&&(t instanceof Promise?t.then(a.runGetCaptchaCountDown):a.runGetCaptchaCountDown())},a.getFormItemOptions=function(e){var t=e.onChange,a=e.defaultValue,n=e.customprops,r=e.rules,o={rules:r||n.rules};return t&&(o.onChange=t),a&&(o.initialValue=a),o},a.runGetCaptchaCountDown=function(){var e=a.props.countDown,t=e||59;a.setState({count:t}),a.interval=setInterval(function(){t-=1,a.setState({count:t}),0===t&&clearInterval(a.interval)},1e3)},a.state={count:0},a}return v()(t,e),m()(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.updateActive,a=e.name;t&&t(a)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=this.state.count,t=this.props.form.getFieldDecorator,a=this.props,n=(a.onChange,a.customprops),r=(a.defaultValue,a.rules,a.name),o=a.getCaptchaButtonText,i=a.getCaptchaSecondText,s=(a.updateActive,a.type),c=L()(a,["onChange","customprops","defaultValue","rules","name","getCaptchaButtonText","getCaptchaSecondText","updateActive","type"]),l=this.getFormItemOptions(this.props),p=c||{};if("Captcha"===s){var u=Object(G["a"])(p,["onGetCaptcha","countDown"]);return E.a.createElement(K,null,E.a.createElement(k["a"],{gutter:8},E.a.createElement(I["a"],{span:16},t(r,l)(E.a.createElement(P["a"],A()({},n,u)))),E.a.createElement(I["a"],{span:8},E.a.createElement(q["a"],{disabled:e,className:z.a.getCaptcha,size:"large",onClick:this.onGetCaptcha},e?"".concat(e," ").concat(i):o))))}return E.a.createElement(K,null,t(r,l)(E.a.createElement(P["a"],A()({},n,p))))}}]),t}(y["Component"]);W.defaultProps={getCaptchaButtonText:"captcha",getCaptchaSecondText:"second"};var R={};Object.keys(U).forEach(function(e){var t=U[e];R[e]=function(a){return E.a.createElement(V.Consumer,null,function(n){return E.a.createElement(W,A()({customprops:t.props,rules:t.rules},a,{type:e,updateActive:n.updateActive,form:n.form}))})}});var Q=R,Y=N["a"].TabPane,Z=function(){var e=0;return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e+=1,"".concat(t).concat(e)}}(),X=function(e){function t(e){var a;return p()(this,t),a=g()(this,f()(t).call(this,e)),a.uniqueId=Z("login-tab-"),a}return v()(t,e),m()(t,[{key:"componentDidMount",value:function(){var e=this.props.tabUtil;e.addTab(this.uniqueId)}},{key:"render",value:function(){var e=this.props.children;return E.a.createElement(Y,this.props,e)}}]),t}(y["Component"]),$=function(e){return E.a.createElement(V.Consumer,null,function(t){return E.a.createElement(X,A()({tabUtil:t.tabUtil},e))})};$.typeName="LoginTab";var H=$,_=M["a"].Item,ee=function(e){var t=e.className,a=L()(e,["className"]),n=j()(z.a.submit,t);return E.a.createElement(_,null,E.a.createElement(q["a"],A()({size:"large",className:n,type:"primary",htmlType:"submit"},a)))},te=ee,ae=function(e){function t(e){var a;return p()(this,t),a=g()(this,f()(t).call(this,e)),a.onSwitch=function(e){a.setState({type:e});var t=a.props.onTabChange;t(e)},a.getContext=function(){var e=a.state.tabs,t=a.props.form;return{tabUtil:{addTab:function(t){a.setState({tabs:[].concat(O()(e),[t])})},removeTab:function(t){a.setState({tabs:e.filter(function(e){return e!==t})})}},form:t,updateActive:function(e){var t=a.state,n=t.type,r=t.active;r[n]?r[n].push(e):r[n]=[e],a.setState({active:r})}}},a.handleSubmit=function(e){e.preventDefault();var t=a.state,n=t.active,r=t.type,o=a.props,i=o.form,s=o.onSubmit,c=n[r];i.validateFields(c,{force:!0},function(e,t){s(e,t)})},a.state={type:e.defaultActiveKey,tabs:[],active:{}},a}return v()(t,e),m()(t,[{key:"render",value:function(){var e=this.props,t=e.className,a=e.children,n=this.state,r=n.type,o=n.tabs,i=[],s=[];return E.a.Children.forEach(a,function(e){e&&("LoginTab"===e.type.typeName?i.push(e):s.push(e))}),E.a.createElement(V.Provider,{value:this.getContext()},E.a.createElement("div",{className:j()(t,z.a.login)},E.a.createElement(M["a"],{onSubmit:this.handleSubmit},o.length?E.a.createElement(E.a.Fragment,null,E.a.createElement(N["a"],{animated:!1,className:z.a.tabs,activeKey:r,onChange:this.onSwitch},i),s):a)))}}]),t}(y["Component"]);ae.defaultProps={className:"",defaultActiveKey:"",onTabChange:function(){},onSubmit:function(){}},ae.Tab=H,ae.Submit=te,Object.keys(Q).forEach(function(e){ae[e]=Q[e]});var ne,re,oe,ie=M["a"].create()(ae),se=a("w2qy"),ce=a.n(se),le=ie.Tab,pe=ie.UserName,ue=ie.Password,me=ie.Mobile,de=ie.Captcha,ge=ie.Submit,he=(ne=Object(C["connect"])(function(e){var t=e.login,a=e.loading;return{login:t,submitting:a.effects["login/login"]}}),ne((oe=function(e){function t(){var e,a;p()(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return a=g()(this,(e=f()(t)).call.apply(e,[this].concat(r))),a.state={type:"account",autoLogin:!0,visible:!1},a.onTabChange=function(e){a.setState({type:e})},a.onGetCaptcha=function(){return new Promise(function(e,t){a.loginForm.validateFields(["mobile"],{},function(n,r){if(n)t(n);else{var o=a.props.dispatch;o({type:"login/getCaptcha",payload:r.mobile}).then(e).catch(t)}})})},a.handleSubmit=function(e,t){var n=a.state.type;if(!e){var r=a.props.dispatch;r({type:"login/login",payload:c()({},t,{type:n})})}},a.changeAutoLogin=function(e){a.setState({autoLogin:e.target.checked})},a.renderMessage=function(e){return E.a.createElement(i["a"],{style:{marginBottom:24},message:e,type:"error",showIcon:!0})},a.handleOk=function(e){console.log(e),a.setState({visible:!1})},a.handleCancel=function(e){console.log(e),a.setState({visible:!1})},a}return v()(t,e),m()(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.login,i=t.submitting,s=this.state,c=s.type,l=s.autoLogin;return E.a.createElement("div",{className:ce.a.main},E.a.createElement(n["a"],null,E.a.createElement(ie,{defaultActiveKey:c,onTabChange:this.onTabChange,onSubmit:this.handleSubmit,ref:function(t){e.loginForm=t}},E.a.createElement(le,{key:"qrcoda",tab:Object(w["formatMessage"])({id:"app.login.qrcode"})},E.a.createElement("img",{className:ce.a.img,src:"https://github.com/CloserWU/Interstellar_Document/raw/master/image/qrcode.png",width:"150px"})),E.a.createElement(le,{key:"account",tab:Object(w["formatMessage"])({id:"app.login.tab-login-credentials"})},"error"===a.status&&"account"===a.type&&!i&&this.renderMessage(Object(w["formatMessage"])({id:"app.login.message-invalid-credentials"})),E.a.createElement(pe,{name:"userName",placeholder:"".concat(Object(w["formatMessage"])({id:"app.login.userName"}),": admin or user"),rules:[{required:!0,message:Object(w["formatMessage"])({id:"validation.userName.required"})}]}),E.a.createElement(ue,{name:"password",placeholder:"".concat(Object(w["formatMessage"])({id:"app.login.password"}),": ant.design"),rules:[{required:!0,message:Object(w["formatMessage"])({id:"validation.password.required"})}],onPressEnter:function(){return e.loginForm.validateFields(e.handleSubmit)}})),E.a.createElement(le,{key:"mobile",tab:Object(w["formatMessage"])({id:"app.login.tab-login-mobile"})},"error"===a.status&&"mobile"===a.type&&!i&&this.renderMessage(Object(w["formatMessage"])({id:"app.login.message-invalid-verification-code"})),E.a.createElement(me,{name:"mobile",placeholder:Object(w["formatMessage"])({id:"form.phone-number.placeholder"}),rules:[{required:!0,message:Object(w["formatMessage"])({id:"validation.phone-number.required"})},{pattern:/^1\d{10}$/,message:Object(w["formatMessage"])({id:"validation.phone-number.wrong-format"})}]}),E.a.createElement(de,{name:"captcha",placeholder:Object(w["formatMessage"])({id:"form.verification-code.placeholder"}),countDown:120,onGetCaptcha:this.onGetCaptcha,getCaptchaButtonText:Object(w["formatMessage"])({id:"form.get-captcha"}),getCaptchaSecondText:Object(w["formatMessage"])({id:"form.captcha.second"}),rules:[{required:!0,message:Object(w["formatMessage"])({id:"validation.verification-code.required"})}]})),E.a.createElement("div",null,E.a.createElement(o["a"],{checked:l,onChange:this.changeAutoLogin},E.a.createElement(w["FormattedMessage"],{id:"app.login.remember-me"})),E.a.createElement("a",{style:{float:"right"},href:""},E.a.createElement(w["FormattedMessage"],{id:"app.login.forgot-password"}))),E.a.createElement(ge,{loading:i},E.a.createElement(w["FormattedMessage"],{id:"app.login.login"})),E.a.createElement("div",{className:ce.a.other},E.a.createElement(w["FormattedMessage"],{id:"app.login.sign-in-with"}),E.a.createElement(r["a"],{type:"qrcode",className:ce.a.icon,theme:"outlined"}),E.a.createElement(r["a"],{type:"taobao-circle",className:ce.a.icon,theme:"outlined"}),E.a.createElement(r["a"],{type:"weibo-circle",className:ce.a.icon,theme:"outlined"}),E.a.createElement(x["a"],{className:ce.a.register,to:"/user/register"},E.a.createElement(w["FormattedMessage"],{id:"app.login.signup"}))))))}}]),t}(y["Component"]),re=oe))||re);t["default"]=he},w2qy:function(e,t,a){e.exports={main:"antd-pro-pages-user-login-main",twoD:"antd-pro-pages-user-login-twoD",img:"antd-pro-pages-user-login-img",icon:"antd-pro-pages-user-login-icon",other:"antd-pro-pages-user-login-other",register:"antd-pro-pages-user-login-register"}}}]);