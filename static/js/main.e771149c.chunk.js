(this["webpackJsonpreact-chat-room"]=this["webpackJsonpreact-chat-room"]||[]).push([[0],{23:function(e,t,n){},25:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var r=n(3),c=n.n(r),a=n(14),i=n.n(a),s=(n(23),n(13)),o=n.n(s),u=n(15),j=n(10),d=(n(25),n(9));d.a.apps.length?d.a.app():d.a.initializeApp({apiKey:"AIzaSyDgFG6npILcyixEjb-MUjuf5tBrw2dUTzg",authDomain:"react-firebase-chat-a7221.firebaseapp.com",projectId:"react-firebase-chat-a7221",storageBucket:"react-firebase-chat-a7221.appspot.com",messagingSenderId:"356316568421",appId:"1:356316568421:web:d41e35bf3ff96b8cdcdf8c",measurementId:"G-M860FG15VC"});var b=d.a,h=(n(26),n(31),n(17)),p=n(18),l=n(4),f=b.auth(),m=b.firestore();function O(){return Object(l.jsx)("button",{className:"sign-in",onClick:function(){var e=new b.auth.GoogleAuthProvider;f.signInWithPopup(e)},children:"Sign in"})}function x(){return f.currentUser&&Object(l.jsx)("button",{onClick:function(){return f.signOut()},children:"sign out"})}function g(){var e=m.collection("chat_messages"),t=e.orderBy("createdAt"),n=Object(p.a)(t,{idField:"id"}),c=Object(j.a)(n,1)[0],a=Object(r.useState)(""),i=Object(j.a)(a,2),s=i[0],d=i[1],h=Object(r.useRef)(),O=function(){var t=Object(u.a)(o.a.mark((function t(n){var r,c,a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),r=f.currentUser,c=r.uid,a=r.photoURL,""!==s){t.next=4;break}return t.abrupt("return");case 4:return t.next=6,e.add({text:s,uid:c,photoURL:a,createdAt:b.firestore.FieldValue.serverTimestamp()});case 6:d(""),h.current.scrollIntoView({behavior:"smooth"});case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)("main",{children:[void 0!==c&&c.map((function(e){return Object(l.jsx)(v,{message:e},e.id)})),Object(l.jsx)("div",{ref:h})]}),Object(l.jsxs)("form",{onSubmit:O,className:"form",children:[Object(l.jsx)("input",{value:s,onChange:function(e){return d(e.target.value)}}),Object(l.jsx)("button",{type:"submit",children:Object(l.jsx)("i",{className:"material-icons",children:"send"})})]})]})}function v(e){var t=e.message,n=t.text,r=t.uid,c=t.photoURL,a=r===f.currentUser.uid?"sent":"received";return Object(l.jsxs)("div",{className:"message ".concat(a),children:[Object(l.jsx)("img",{src:c,alt:"user-pic"}),Object(l.jsx)("p",{children:n})]})}var I=function(){var e=Object(h.a)(f),t=Object(j.a)(e,1)[0];return Object(l.jsxs)("div",{className:"App",children:[Object(l.jsxs)("header",{children:[Object(l.jsx)("h1",{children:"\ud83d\udcac"}),Object(l.jsx)(x,{})]}),Object(l.jsx)("section",{children:t?Object(l.jsx)(g,{}):Object(l.jsx)(O,{})})]})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,32)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),r(e),c(e),a(e),i(e)}))};i.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(I,{})}),document.getElementById("root")),F()}},[[30,1,2]]]);
//# sourceMappingURL=main.e771149c.chunk.js.map