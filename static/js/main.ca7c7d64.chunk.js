(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{10:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r}));var a,r,c=n(137),o=n.n(c).a.create({withCredentials:!0,baseURL:"https://social-network.samuraijs.com/api/1.0/",headers:{"API-KEY":"7f9a3742-7516-4838-bf63-24f67efb7b5e"}});!function(e){e[e.Success=0]="Success",e[e.Error=1]="Error"}(a||(a={})),function(e){e[e.CaptchaIsRequired=10]="CaptchaIsRequired"}(r||(r={}))},101:function(e,t,n){"use strict";n.d(t,"d",(function(){return h})),n.d(t,"a",(function(){return _})),n.d(t,"c",(function(){return b})),n.d(t,"b",(function(){return E})),n.d(t,"g",(function(){return v})),n.d(t,"e",(function(){return O})),n.d(t,"f",(function(){return S}));var a=n(7),r=n.n(a),c=n(13),o=n(41),s=n(4),u=n(37),i=n(10),l=function(e){return i.c.get("profile/".concat(e)).then((function(e){return e.data}))},f=function(e){return i.c.get("profile/status/".concat(e)).then((function(e){return e.data}))},p=function(e){return i.c.put("profile/status",{status:e}).then((function(e){return e.data}))},m=function(e){var t=new FormData;return t.append("image",e),i.c.put("profile/photo",t,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){return e.data}))},g=function(e){return i.c.put("profile",e).then((function(e){return e.data}))},d={postsData:[{id:1,string:"Ho-ho-ho!",likesCount:5},{id:2,string:"Cool! What's up?",likesCount:7},{id:3,string:"Yo!!",likesCount:9}],profile:null,status:""},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_POST":return Object(s.a)(Object(s.a)({},e),{},{postsData:[{id:e.postsData.length+1,string:t.postMessage,likesCount:0}].concat(Object(o.a)(e.postsData))});case"SET_USER_PROFILE":return Object(s.a)(Object(s.a)({},e),{},{profile:t.profile});case"DELETE_POST":return Object(s.a)(Object(s.a)({},e),{},{postsData:e.postsData.filter((function(e){return e.id!==t.id}))});case"SAVE_PHOTO_SUCCESS":return Object(s.a)(Object(s.a)({},e),{},{profile:Object(s.a)(Object(s.a)({},e.profile),{},{photos:t.photos})});case"SET_STATUS":return Object(s.a)(Object(s.a)({},e),{},{status:t.status});default:return e}},_={newPost:function(e){return{type:"ADD_POST",postMessage:e}},deletePost:function(e){return{type:"DELETE_POST",id:e}},setStatus:function(e){return{type:"SET_STATUS",status:e}},setUserProfile:function(e){return{type:"SET_USER_PROFILE",profile:e}},saveMainAvatarSuccess:function(e){return{type:"SAVE_PHOTO_SUCCESS",photos:e}}},b=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(n){var a;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l(e);case 2:a=t.sent,n(_.setUserProfile(a));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},E=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(n){var a;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f(e);case 2:a=t.sent,n(_.setStatus(a));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},v=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(n){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,p(e);case 3:t.sent.resultCode===i.a.Success&&n(_.setStatus(e)),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),alert(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},O=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(n){var a;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m(e);case 2:(a=t.sent).resultCode===i.a.Success&&n(_.saveMainAvatarSuccess(a.data));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},S=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(n,a){var c,o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g(e);case 2:if((c=t.sent).resultCode!==i.a.Success){t.next=8;break}o=a().auth.id,n(b(o)),t.next=10;break;case 8:return n(Object(u.a)("profile",{_error:c.messages[0]})),t.abrupt("return",Promise.reject(c.messages[0]));case 10:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()}},112:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return s}));var a=n(41),r=n(4),c={messagesData:[{id:1,string:"Hi!"},{id:2,string:"How are you?!"},{id:3,string:"Yo!!"},{id:4,string:"LOL"},{id:5,string:"KEKIS! =^_^= "}],dialogsData:[{id:1,name:"Dymych"},{id:2,name:"Alexander"},{id:3,name:"Vika"},{id:4,name:"Vasya"},{id:5,name:"Kotik"},{id:6,name:"Valeron"}]},o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SEND_MESSAGE":return Object(r.a)(Object(r.a)({},e),{},{messagesData:[].concat(Object(a.a)(e.messagesData),[{id:e.messagesData.length+1,string:t.textMessage}])});default:return e}},s={sendMessageActionCreator:function(e){return{type:"SEND_MESSAGE",textMessage:e}}}},123:function(e,t,n){e.exports=n.p+"static/media/noavatar.88962eb7.jpg"},140:function(e,t,n){e.exports=n.p+"static/media/Spin.4217e8ee.svg"},142:function(e,t,n){e.exports=n.p+"static/media/logo.b4663671.png"},168:function(e,t,n){e.exports=n(295)},17:function(e,t,n){e.exports={nav:"Navbar_nav__2Vag6",active:"Navbar_active__2uFoh",item:"Navbar_item__1LS5H"}},173:function(e,t,n){},174:function(e,t,n){},21:function(e,t,n){e.exports={avatar:"Users_avatar__2PPJh",users:"Users_users__MhE-w",user:"Users_user__3QdBv",user_info:"Users_user_info__38qMv",user_avaBlock:"Users_user_avaBlock__Dgro7",location:"Users_location__uqkFY",person:"Users_person__26Vm0",follow:"Users_follow__2XwVR",unfollow:"Users_unfollow__ULXVF",name:"Users_name__206ck",status:"Users_status__3kX37"}},24:function(e,t,n){e.exports={login_form:"Login_login_form__s-ZuX",summaryErrorBlock:"Login_summaryErrorBlock__31waN",summaryErrorBlock__message:"Login_summaryErrorBlock__message__1tpxQ",remember_me:"Login_remember_me__biM8P",login:"Login_login__3iGkt",login_page:"Login_login_page__1z2ei",captcha:"Login_captcha__2xf3C"}},256:function(e,t,n){},27:function(e,t,n){"use strict";n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return f})),n.d(t,"c",(function(){return p}));var a=n(59),r=n(0),c=n.n(r),o=n(75),s=n.n(o),u=n(93),i=function(e){var t=e.meta,n=t.touched,a=t.error,r=e.children,o=n&&a;return c.a.createElement("div",{className:"".concat(s.a.textareaContainer," ").concat(s.a.formControl," ").concat(o?s.a.error:"")},r,c.a.createElement("div",null,o&&c.a.createElement("span",null,a)))},l=function(e){var t=e.input,n=(e.meta,Object(a.a)(e,["input","meta"]));return c.a.createElement(i,e,c.a.createElement("textarea",Object.assign({},t,n)))},f=function(e){var t=e.input,n=(e.meta,Object(a.a)(e,["input","meta"]));return c.a.createElement(i,e,c.a.createElement("input",Object.assign({},t,n)))};function p(e,t,n,a,r){var o=Object.assign({},r);return c.a.createElement(u.a,Object.assign({name:t,placeholder:e,component:a,validate:n},o))}},295:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(68),o=n.n(c),s=(n(173),n(30)),u=n(31),i=n(33),l=n(32),f=(n(174),n(14)),p=n(8),m=n(101),g=n(112),d={},h=n(7),_=n.n(h),b=n(13),E=n(41),v=n(4),O=n(10),S=function(e,t){return O.c.get("users?page=".concat(e,"&count=").concat(t)).then((function(e){return e.data}))},w=function(e){return O.c.post("follow/".concat(e)).then((function(e){return e.data}))},j=function(e){return O.c.delete("follow/".concat(e)).then((function(e){return e.data}))},C=function(e,t,n,a){return e.map((function(e){return e[n]===t?Object(v.a)(Object(v.a)({},e),a):e}))},N={users:[],totalUsersCount:null,pageSize:7,currentPage:1,isFetching:!1,followingInProgress:[]},y=function(){var e=Object(b.a)(_.a.mark((function e(t,n,a,r){return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(P.toggleIsFollowing(!0,n)),e.next=3,a(n);case 3:e.sent.resultCode===O.a.Success&&t(r(n)),t(P.toggleIsFollowing(!1,n));case 6:case"end":return e.stop()}}),e)})));return function(t,n,a,r){return e.apply(this,arguments)}}(),P={followSuccess:function(e){return{type:"FOLLOW",userID:e}},unfollowSuccess:function(e){return{type:"UNFOLLOW",userID:e}},setUsers:function(e){return{type:"SET_USERS",users:e}},setCurrentPage:function(e){return{type:"SET_CURRENT_PAGE",currentPage:e}},setUsersTotalCount:function(e){return{type:"SET_USERS_TOTAL_COUNT",totalUsersCount:e}},toggleIsFetching:function(e){return{type:"TOGGLE_IS_FETCHING",isFetching:e}},toggleIsFollowing:function(e,t){return{type:"TOGGLE_IS_FOLLOWING_PROGRESS",isFetching:e,userId:t}}},U=function(){return O.c.get("auth/me").then((function(e){return e.data}))},k=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return O.c.post("auth/login",{email:e,password:t,rememberMe:n,captcha:a}).then((function(e){return e.data}))},T=function(){return O.c.delete("auth/login").then((function(e){return e.data}))},I=n(37),x=function(){return O.c.get("security/get-captcha-url").then((function(e){return e.data.url}))},L={id:null,email:null,login:null,isFetching:!1,isAuth:!1,captchaURL:null},A=function(e,t,n,a){return{type:"SET_USER_DATA",payload:{id:e,email:t,login:n,isAuth:a}}},F=function(e){return{type:"SET_CAPTCHA",payload:{captchaURL:e}}},D=function(){return function(){var e=Object(b.a)(_.a.mark((function e(t){var n,a,r,c,o;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U();case 2:(n=e.sent).resultCode===O.a.Success&&(a=n.data,r=a.id,c=a.email,o=a.login,t(A(r,c,o,!0)));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},R=function(){return function(){var e=Object(b.a)(_.a.mark((function e(t){var n;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x();case 2:n=e.sent,t(F(n));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},M={initialized:!1},z=function(){return{type:"INITIALIZED_SUCCESS"}},G=n(135),H=n(138),B=Object(p.c)({profilePage:m.d,dialogsPage:g.b,sidebar:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d;return e},usersPage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FOLLOW":return Object(v.a)(Object(v.a)({},e),{},{users:C(e.users,t.userID,"id",{followed:!0})});case"UNFOLLOW":return Object(v.a)(Object(v.a)({},e),{},{users:C(e.users,t.userID,"id",{followed:!1})});case"SET_CURRENT_PAGE":return Object(v.a)(Object(v.a)({},e),{},{currentPage:t.currentPage});case"TOGGLE_IS_FETCHING":return Object(v.a)(Object(v.a)({},e),{},{isFetching:t.isFetching});case"TOGGLE_IS_FOLLOWING_PROGRESS":return Object(v.a)(Object(v.a)({},e),{},{followingInProgress:t.isFetching?[].concat(Object(E.a)(e.followingInProgress),[t.userId]):e.followingInProgress.filter((function(e){return e!==t.userId}))});case"SET_USERS":return Object(v.a)(Object(v.a)({},e),{},{users:Object(E.a)(t.users)});case"SET_USERS_TOTAL_COUNT":return Object(v.a)(Object(v.a)({},e),{},{totalUsersCount:t.totalUsersCount});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_USER_DATA":case"SET_CAPTCHA":return Object(v.a)(Object(v.a)({},e),t.payload);default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INITIALIZED_SUCCESS":return Object(v.a)(Object(v.a)({},e),{},{initialized:!0});default:return e}},form:G.a}),V=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||p.d,W=Object(p.e)(B,V(Object(p.a)(H.a))),q=n(46),X=n(59),Y=n(15),K=n(21),J=n.n(K),Q=(n(43),n(123)),Z=n.n(Q),$=function(e){var t=e.user,n=e.unfollow,a=e.follow,c=e.followingInProgress;return r.a.createElement("div",{className:J.a.user},r.a.createElement("span",{className:J.a.user_avaBlock},r.a.createElement("div",null,r.a.createElement(Y.b,{to:"/profile/".concat(t.id)},r.a.createElement("img",{className:J.a.avatar,src:t.photos.small?t.photos.small:Z.a,alt:"avatar"}))),r.a.createElement("div",null,t.followed?r.a.createElement("button",{disabled:c.some((function(e){return e===t.id})),className:"".concat(J.a.unfollow," btn"),onClick:function(){n(t.id)}},"UnFollow"):r.a.createElement("button",{disabled:c.some((function(e){return e===t.id})),className:"".concat(J.a.follow," btn"),onClick:function(){a(t.id)}},"Follow"))),r.a.createElement("span",{className:J.a.user_info},r.a.createElement("span",{className:J.a.person},r.a.createElement("div",{className:J.a.name},t.name),r.a.createElement("div",{className:J.a.status},t.status)),r.a.createElement("span",{className:J.a.location},r.a.createElement("div",null,"Default_City"),r.a.createElement(r.a.Fragment,null,"Default_Country"))))},ee=n(72),te=n(100),ne=n(42),ae=n.n(ne),re=n(74),ce=n.n(re),oe=function(e){for(var t=e.totalItemsCount,n=e.pageSize,c=e.onPageChanged,o=e.currentPage,s=e.portionSize,u=void 0===s?7:s,i=Math.ceil(t/n),l=[],f=1;f<i;f++)l.push(f);var p=Math.ceil(i/u),m=Object(a.useState)(1),g=Object(te.a)(m,2),d=g[0],h=g[1],_=(d-1)*u+1,b=d*u;return r.a.createElement("div",{className:ae.a.pages},d>1&&r.a.createElement("button",{className:ce()(ae.a.paginator_btn,"btn"),onClick:function(){h(d-1)}},"prev"),l.filter((function(e){return e>=_&&e<=b})).map((function(e){return r.a.createElement("div",{className:ae.a.page_container},r.a.createElement("p",{key:e,className:ce()(Object(ee.a)({},ae.a.selected,o===e),ae.a.pagination_item),onClick:function(){c(e)}},e))})),p>d&&r.a.createElement("button",{className:ce()(ae.a.paginator_btn,"btn"),onClick:function(){h(d+1)}},"next"))},se=function(e){var t=e.currentPage,n=e.onPageChanged,a=e.totalUsersCount,c=e.pageSize,o=e.users,s=Object(X.a)(e,["currentPage","onPageChanged","totalUsersCount","pageSize","users"]);return r.a.createElement("div",{className:J.a.users},r.a.createElement(oe,{currentPage:t,onPageChanged:n,totalItemsCount:a,pageSize:c}),o.map((function(e){return r.a.createElement($,{key:e.id,user:e,follow:s.follow,unfollow:s.unfollow,followingInProgress:s.followingInProgress})})))},ue=n(99),ie=n(141),le=Object(ie.a)((function(e){return e.usersPage.users}),(function(e){return e.filter((function(e){return!0}))})),fe=function(e){return e.usersPage.pageSize},pe=function(e){return e.usersPage.totalUsersCount},me=function(e){return e.usersPage.currentPage},ge=function(e){return e.usersPage.isFetching},de=function(e){return e.usersPage.followingInProgress},he=function(e){Object(i.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).onPageChanged=function(t){var n=e.props.pageSize;e.props.getUsersThunk(t,n)},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this.props,t=e.currentPage,n=e.pageSize;this.props.getUsersThunk(t,n)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.props.isFetching?r.a.createElement(q.a,null):null,r.a.createElement(se,{pageSize:this.props.pageSize,currentPage:this.props.currentPage,onPageChanged:this.onPageChanged,users:this.props.users,totalUsersCount:this.props.totalUsersCount,followingInProgress:this.props.followingInProgress,follow:this.props.follow,unfollow:this.props.unfollow}))}}]),n}(r.a.Component),_e=Object(p.d)(Object(f.b)((function(e){return{users:le(e),pageSize:fe(e),totalUsersCount:pe(e),currentPage:me(e),isFetching:ge(e),followingInProgress:de(e)}}),{follow:function(e){return function(){var t=Object(b.a)(_.a.mark((function t(n){return _.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:y(n,e,w,P.followSuccess);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},unfollow:function(e){return function(){var t=Object(b.a)(_.a.mark((function t(n){return _.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:y(n,e,j,P.unfollowSuccess);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},getUsersThunk:function(e,t){return function(){var n=Object(b.a)(_.a.mark((function n(a){var r;return _.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a(P.toggleIsFetching(!0)),n.next=3,S(e,t);case 3:r=n.sent,a(P.toggleIsFetching(!1)),a(P.setUsers(r.items)),a(P.setCurrentPage(e)),a(P.setUsersTotalCount(r.totalCount));case 8:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()}}),ue.a)(he),be=n(142),Ee=n.n(be),ve=n(36),Oe=n.n(ve),Se=function(e){return r.a.createElement("header",{className:Oe.a.header},r.a.createElement("img",{className:Oe.a.logo,src:Ee.a,alt:"logo"}),r.a.createElement("div",null,e.isAuth?r.a.createElement("div",{className:Oe.a.login_block},r.a.createElement("div",{className:Oe.a.login_info},r.a.createElement("p",{className:Oe.a.login_name},"Login: ".concat(e.login)),r.a.createElement("span",{className:Oe.a.login_email},"Email: ".concat(e.email))),r.a.createElement("button",{className:"btn",onClick:e.logout},"Logout")):r.a.createElement(Y.b,{className:Oe.a.login,to:"/login"},r.a.createElement("button",{className:"btn"},"Login"))))},we=function(e){Object(i.a)(n,e);var t=Object(l.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement(Se,this.props)}}]),n}(r.a.Component),je=Object(p.d)(Object(f.b)((function(e){return{isAuth:e.auth.isAuth,login:e.auth.login,email:e.auth.email}}),{logout:function(){return function(){var e=Object(b.a)(_.a.mark((function e(t){return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T();case 2:e.sent.resultCode===O.a.Success&&t(A(null,null,null,!1));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}}))(we),Ce=n(11),Ne=n(17),ye=n.n(Ne),Pe=function(){return r.a.createElement("nav",{className:ye.a.nav},r.a.createElement("div",{className:ye.a.item},r.a.createElement(Y.b,{to:"/profile",activeClassName:ye.a.active},"My Profile ")),r.a.createElement("div",{className:ye.a.item},r.a.createElement(Y.b,{to:"/dialogs",activeClassName:ye.a.active}," Messages ")),r.a.createElement("div",{className:ye.a.item},r.a.createElement(Y.b,{to:"/news",activeClassName:ye.a.active}," News ")),r.a.createElement("div",{className:ye.a.item},r.a.createElement(Y.b,{to:"/music",activeClassName:ye.a.active}," Music ")),r.a.createElement("div",{className:ye.a.item},r.a.createElement(Y.b,{to:"/users",activeClassName:ye.a.active}," Users ")),r.a.createElement("div",{className:ye.a.item},r.a.createElement(Y.b,{to:"/settings",activeClassName:ye.a.active}," Settings ")))},Ue=n(24),ke=n.n(Ue),Te=n(134),Ie=n(27),xe=n(69),Le=Object(Te.a)({form:"login"})((function(e){var t=e.handleSubmit,n=e.error,a=e.captchaURL;return r.a.createElement("form",{className:ke.a.login_form,onSubmit:t},r.a.createElement("div",{className:ke.a.login_input},Object(Ie.c)("Email","email",[xe.b],Ie.a,{type:"text"})),r.a.createElement("div",{className:ke.a.login_input},Object(Ie.c)("Password","password",[xe.b],Ie.a,{type:"password"})),r.a.createElement("div",{className:ke.a.remember_me},r.a.createElement("span",null,"Remember me"),Object(Ie.c)(void 0,"rememberMe",[],Ie.a,{type:"checkbox"})),a&&r.a.createElement("img",{className:ke.a.captcha,src:a,alt:"captcha"}),a&&Object(Ie.c)("Symbols from captcha","captcha",[xe.b],Ie.a,{type:"text"}),r.a.createElement("div",{className:ke.a.btn},r.a.createElement("button",{className:"btn",type:"submit"},"Sign In")),n&&r.a.createElement("div",{className:ke.a.summaryErrorBlock},r.a.createElement("span",{className:ke.a.summaryErrorBlock__message},n)))})),Ae=Object(f.b)((function(e){return{captchaURL:e.auth.captchaURL,isAuth:e.auth.isAuth}}),{login:function(e,t,n,a){return function(){var r=Object(b.a)(_.a.mark((function r(c){var o,s;return _.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,k(e,t,n,a);case 2:(o=r.sent).resultCode===O.a.Success?(c(D()),c(F(null))):(o.resultCode===O.b.CaptchaIsRequired&&c(R()),s=o.messages.length>0?o.messages[0]:"some error",c(Object(I.a)("login",{_error:s})));case 4:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()}})((function(e){return e.isAuth?r.a.createElement(Ce.a,{to:"/profile"}):r.a.createElement("div",{className:ke.a.login_page},r.a.createElement("p",{className:ke.a.login},"Login Form"),r.a.createElement(Le,{onSubmit:function(t){e.login(t.email,t.password,t.rememberMe,t.captcha)},captchaURL:e.captchaURL}))})),Fe=function(){return r.a.createElement("h2",null,"News")},De=function(){return r.a.createElement("h2",null,"Music")},Re=function(){return r.a.createElement("h2",null,"Settings")},Me=function(e){return function(t){return r.a.createElement(a.Suspense,{fallback:r.a.createElement(q.a,null)},r.a.createElement(e,t))}},ze=r.a.lazy((function(){return n.e(4).then(n.bind(null,303))})),Ge=r.a.lazy((function(){return n.e(3).then(n.bind(null,302))})),He=function(e){Object(i.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).catchAllUnhandledErrors=function(e){e.preventDefault();var t=e.reason||e.detail.reason;console.log(t)},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.props.initApp(),window.addEventListener("unhandledrejection",this.catchAllUnhandledErrors)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("unhandledrejection",this.catchAllUnhandledErrors)}},{key:"render",value:function(){return this.props.initialized?r.a.createElement("div",{className:"app-wrapper"},r.a.createElement(je,null),r.a.createElement(Pe,null),r.a.createElement("div",{className:"app-wrapper-content"},r.a.createElement(Ce.d,null,r.a.createElement(Ce.b,{exact:!0,path:"/",render:function(){return r.a.createElement(Ce.a,{to:"/profile"})}}),r.a.createElement(Ce.b,{path:"/dialogs",render:Me(ze)}),r.a.createElement(Ce.b,{path:"/profile/:userId?",render:Me(Ge)}),r.a.createElement(Ce.b,{path:"/users",render:function(){return r.a.createElement(_e,{title:"Samurais:"})}}),r.a.createElement(Ce.b,{path:"/login",render:function(){return r.a.createElement(Ae,null)}}),r.a.createElement(Ce.b,{path:"/news",component:Fe}),r.a.createElement(Ce.b,{path:"/music",component:De}),r.a.createElement(Ce.b,{path:"/settings",component:Re}),r.a.createElement(Ce.b,{path:"*",render:function(){return r.a.createElement("div",null,"404 NOT FOUND")}})))):r.a.createElement(q.a,null)}}]),n}(r.a.Component),Be=Object(p.d)(Object(f.b)((function(e){return{initialized:e.app.initialized}}),{initApp:function(){return function(e){e(D()).then((function(){e(z())}))}}}))(He),Ve=function(e){return r.a.createElement(Y.a,null,r.a.createElement(f.a,{store:W},r.a.createElement(Be,null)))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Ve,null)),document.getElementById("root"))},36:function(e,t,n){e.exports={header:"Header_header__x8MWp",logo:"Header_logo__2wgrv",login:"Header_login__3v1B5",login_block:"Header_login_block__3NOfN",login_info:"Header_login_info__3WNEs",login_name:"Header_login_name__1tVhY",login_email:"Header_login_email__32mzB"}},42:function(e,t,n){e.exports={pages:"Paginator_pages__WT5lm",pagination_item:"Paginator_pagination_item__28fHr",selected:"Paginator_selected__1XnlH",paginator_btn:"Paginator_paginator_btn__3oQMh",page_container:"Paginator_page_container__1mpFq"}},43:function(e,t,n){},46:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(0),r=n.n(a),c=n(140),o=n.n(c),s=(n(256),function(){return r.a.createElement("img",{className:"spin",src:o.a,alt:"spin-loader"})})},69:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return r}));var a=function(e){if(!e)return"Field is required"},r=function(e){return function(t){if(t&&t.length>e)return"Max length is ".concat(e," symbols")}}},75:function(e,t,n){e.exports={textareaContainer:"FormControls_textareaContainer__3hh3Y",formControl:"FormControls_formControl__2iUtI",error:"FormControls_error__21R_3"}},99:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var a=n(30),r=n(31),c=n(33),o=n(32),s=n(0),u=n.n(s),i=n(14),l=n(11),f=function(e){return{isAuth:e.auth.isAuth}},p=function(e){var t=function(t){Object(c.a)(s,t);var n=Object(o.a)(s);function s(){return Object(a.a)(this,s),n.apply(this,arguments)}return Object(r.a)(s,[{key:"render",value:function(){return this.props.isAuth?u.a.createElement(e,this.props):u.a.createElement(l.a,{to:"/login"})}}]),s}(u.a.Component);return Object(i.b)(f)(t)}}},[[168,1,2]]]);
//# sourceMappingURL=main.ca7c7d64.chunk.js.map