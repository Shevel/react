(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[3],{297:function(e,a,t){e.exports={img:"Profile_img__3EK6p",descriptionBlock:"Profile_descriptionBlock__9OwsV",profile:"Profile_profile__15vWC",avatar:"Profile_avatar__3MgzR",info:"Profile_info__2nWzm",full_name:"Profile_full_name__SJgvK",about_me:"Profile_about_me__r-Ivn",status:"Profile_status__2IMFW",ava_block:"Profile_ava_block__6x96c",upload_ava:"Profile_upload_ava__2aVps",ava_uploader:"Profile_ava_uploader__20wJv",ava_label:"Profile_ava_label__G3ixd",contact_title:"Profile_contact_title__2x6DQ",contact_value:"Profile_contact_value__26e0_",ava_image:"Profile_ava_image__1b_Kc",profile_data:"Profile_profile_data__CWIB-",activate_edit_btn:"Profile_activate_edit_btn__1a1_p",contact:"Profile_contact__3NFcS"}},298:function(e,a,t){e.exports={posts:"MyPosts_posts__1vJq3",newMessageForm:"MyPosts_newMessageForm__XA5x9",header:"MyPosts_header__1KgIO",btn:"MyPosts_btn__1f10X"}},299:function(e,a,t){e.exports={post:"Post_post__2tBK-"}},300:function(e,a,t){e.exports=t.p+"static/media/add.4cf308a4.png"},301:function(e,a,t){e.exports=t.p+"static/media/edit.70454fa7.svg"},302:function(e,a,t){"use strict";t.r(a);var n=t(30),l=t(31),r=t(33),o=t(32),s=t(0),c=t.n(s),i=t(298),u=t.n(i),m=(t(43),t(299)),p=t.n(m),f=function(e){return c.a.createElement("div",{className:p.a.post},c.a.createElement("img",{src:"https://avatars.mds.yandex.net/get-pdb/1352825/a5f8fbd7-515e-49f8-81d6-be55a2daac92/s600",alt:"post"}),e.message,c.a.createElement("br",null),c.a.createElement("span",null,"Like ",e.likesCount))},_=t(93),d=t(134),v=t(69),b=t(27),E=Object(v.a)(300),h=c.a.memo((function(e){var a=e.postsData.map((function(a){return c.a.createElement(f,{key:e.postsData.length-a.id,message:a.string,likesCount:a.likesCount})}));return c.a.createElement("div",{className:u.a.posts},c.a.createElement("h3",{className:u.a.header},"My Posts"),c.a.createElement(g,{onSubmit:function(a){e.addPost(a.newPost)}}),a)})),g=function(e){var a=e.handleSubmit;return c.a.createElement("form",{className:u.a.newMessageForm,onSubmit:a},c.a.createElement(_.a,{name:"newPost",component:b.b,type:"text",placeholder:"Enter new post text..",validate:[E]}),c.a.createElement("button",{className:"btn"},"Add post"))};g=Object(d.a)({form:"posts"})(g);var P=t(101),k=t(14),O=Object(k.b)((function(e){return{postsData:e.profilePage.postsData}}),(function(e){return{addPost:function(a){e(P.a.newPost(a))}}}))(h),N=t(100),y=t(123),j=t.n(y),M=t(297),S=t.n(M),w=t(46),F=function(e){var a=Object(s.useState)(!1),t=Object(N.a)(a,2),n=t[0],l=t[1],r=Object(s.useState)(e.status),o=Object(N.a)(r,2),i=o[0],u=o[1];Object(s.useEffect)((function(){u(e.status)}),[e.status]);return c.a.createElement(c.a.Fragment,null,!n&&c.a.createElement("div",null,c.a.createElement("span",{className:S.a.status,onClick:function(){e.isOwner&&l(!0)}},e.status||"Set status..")),n&&c.a.createElement("div",null,c.a.createElement("input",{autoFocus:!0,value:i,onChange:function(e){u(e.currentTarget.value)},onBlur:function(){l(!1),e.updateStatus(i)}})))},A=function(e){var a=e.handleSubmit,t=e.profile,n=e.error;return c.a.createElement("form",{onSubmit:a},c.a.createElement("div",null,c.a.createElement("b",null,"Full Name:"),Object(b.c)("Full Name","fullName",[],b.a)),c.a.createElement("div",null,c.a.createElement("b",null,"Looking for a job:"),Object(b.c)("","lookingForAJob",[],b.a,{type:"checkbox"})),c.a.createElement("div",null,c.a.createElement("b",null,"My skills:"),Object(b.c)("My skills","lookingForAJobDescription",[],b.b)),c.a.createElement("div",null,c.a.createElement("b",null,"About me:"),Object(b.c)("About me","aboutMe",[],b.b)),n&&c.a.createElement("div",null,c.a.createElement("span",null,n)),Object.keys(t.contacts).map((function(e){return c.a.createElement("div",{key:e},c.a.createElement("b",null,e),Object(b.c)(e,"contacts."+e,[],b.a))})),c.a.createElement("div",null,c.a.createElement("button",{className:"btn"},"Save")))},x=A=Object(d.a)({form:"profile"})(A),C=t(300),I=t.n(C),J=t(301),D=t.n(J),B=function(e){var a=e.profile,t=e.status,n=e.updateStatus,l=e.isOwner,r=e.saveMainAvatar,o=e.saveProfile,i=Object(s.useState)(!1),u=Object(N.a)(i,2),m=u[0],p=u[1];return a?c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:S.a.profile},c.a.createElement("div",{className:S.a.ava_block},c.a.createElement("div",{className:S.a.ava_image},c.a.createElement("img",{className:S.a.avatar,src:a.photos.large||a.photos.small||j.a,alt:"ava"}),l&&c.a.createElement("div",{className:S.a.ava_uploader},c.a.createElement("input",{className:S.a.upload_ava,onChange:function(e){e.target.files.length&&r(e.target.files[0])},type:"file",id:"file"}),c.a.createElement("label",{className:S.a.ava_label,title:"Change and upload avatar",htmlFor:"file"},"Change avatar ",c.a.createElement("img",{src:I.a,alt:"addIcon",height:"20"}))))),c.a.createElement("div",{className:S.a.info},c.a.createElement("div",{className:S.a.full_name},a.fullName),c.a.createElement(F,{status:t,updateStatus:n,isOwner:l}),m?c.a.createElement(x,{onSubmit:function(e){o(e).then((function(){p(!1)}))},initialValues:a,profile:a}):c.a.createElement(K,{activateEditMode:function(){p(!0)},profile:a,isOwner:l})))):c.a.createElement(w.a,null)},K=function(e){var a=e.profile,t=e.isOwner,n=e.activateEditMode;return c.a.createElement("div",{className:S.a.profile_data},t&&c.a.createElement("button",{className:"".concat(S.a.activate_edit_btn," btn"),onClick:n},c.a.createElement("img",{width:20,src:D.a,alt:"editIcon"})),c.a.createElement("div",{className:S.a.about_me},c.a.createElement("b",null,"About me:")," ".concat(a.aboutMe)),c.a.createElement("div",{className:S.a.about_me},c.a.createElement("b",null,"My skills:")," ".concat(a.lookingForAJobDescription)),c.a.createElement("label",{className:S.a.about_me,htmlFor:"lookingForaJob"},c.a.createElement("b",null,"Looking for a Job")),c.a.createElement("input",{id:"lookingForaJob",type:"checkbox",readOnly:!0,checked:a.lookingForAJob}),Object.keys(a.contacts).map((function(e){return c.a.createElement(U,{key:e,contactTitle:e,contactValue:a.contacts[e]})})))},U=function(e){var a=e.contactTitle,t=e.contactValue;return c.a.createElement("div",{className:S.a.contact},c.a.createElement("div",{className:S.a.contact_title},"My ".concat(a,":")),c.a.createElement("div",{className:S.a.contact_value}," ".concat(t||"")))},V=function(e){var a=e.profile,t=e.status,n=e.updateStatus,l=e.isOwner,r=e.saveMainAvatar,o=e.saveProfile;return c.a.createElement("div",null,c.a.createElement(B,{isOwner:l,profile:a,status:t,updateStatus:n,saveMainAvatar:r,saveProfile:o}),c.a.createElement(O,null))},z=t(11),W=t(99),L=t(8),T=function(e){Object(r.a)(t,e);var a=Object(o.a)(t);function t(){return Object(n.a)(this,t),a.apply(this,arguments)}return Object(l.a)(t,[{key:"refreshProfile",value:function(){var e=this.props.match.params.userId;e||(e=this.props.authorizedUserId),this.props.getUserProfile(e),this.props.getStatus(e)}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(e,a,t){this.props.match.params.userId!==e.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return c.a.createElement(V,Object.assign({},this.props,{isOwner:!this.props.match.params.userId,profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,saveMainAvatar:this.props.saveMainAvatar}))}}]),t}(c.a.Component);a.default=Object(L.d)(Object(k.b)((function(e){return{authorizedUserId:e.auth.id,profile:e.profilePage.profile,status:e.profilePage.status,isAuth:e.auth.isAuth}}),{getUserProfile:P.c,getStatus:P.b,updateStatus:P.g,saveMainAvatar:P.e,saveProfile:P.f}),z.g,W.a)(T)}}]);
//# sourceMappingURL=3.e0068b18.chunk.js.map