(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(41)},39:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),r=t(11),o=t.n(r),c=t(13),l=t(12),i=t(2),m=function(e){return u.a.createElement("li",null,e.name.name," ",e.name.number,u.a.createElement("button",{onClick:function(){return e.deletePerson(e.name)}},"poista"))},s=function(e){return u.a.createElement("form",{onSubmit:e.addName},u.a.createElement("div",null,"nimi: ",u.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),u.a.createElement("div",null,"puhelinnumero: ",u.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},f=function(e){return u.a.createElement("div",null,u.a.createElement("form",null,u.a.createElement("input",{value:e.newLookFor,onChange:e.handleLookForChange})))},d=t(3),h=t.n(d),b=function(){return h.a.get("/api/persons").then(function(e){return e.data})},p=function(e){return h.a.post("/api/persons",e).then(function(e){return e.data})},E=function(e){return h.a.delete("/api/persons/".concat(e)).then(function(e){return e.data})},g=function(e){return h.a.put("".concat("/api/persons","/").concat(e.id),e).then(function(e){return e.data})},v=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],o=Object(a.useState)(""),d=Object(i.a)(o,2),h=d[0],v=d[1],w=Object(a.useState)(""),O=Object(i.a)(w,2),j=O[0],C=O[1],N=Object(a.useState)(""),x=Object(i.a)(N,2),k=x[0],y=x[1],S=Object(a.useState)({text:null}),L=Object(i.a)(S,2),F=L[0],P=L[1];Object(a.useEffect)(function(){b().then(function(e){r(e)})},[]);var T=function(e){window.confirm("Olet poistamassa ".concat(e.name))&&E(e.id).then(function(){r(t.filter(function(n){return n.id!==e.id}))})};return u.a.createElement("div",null,u.a.createElement("h2",null,"Etsi nimell\xe4"),u.a.createElement(f,{newLookFor:k,handleLookForChange:function(e){y(e.target.value)}}),u.a.createElement("h2",null,"Puhelinluettelo"),u.a.createElement(function(e){return null===e.message.text?null:u.a.createElement("div",{className:e.message.style},e.message.text)},{message:F}),u.a.createElement(s,{addName:function(e){e.preventDefault();var n={id:t.length?Object(l.a)(t).sort(function(e,n){return n.id-e.id})[0].id+1:1,name:h,number:j,date:(new Date).toISOString()},a=!0;if(t.forEach(function(e){h===e.name&&(a=!1)}),!0===a)p(n).then(function(e){r(t.concat(e)),v(""),C(""),P({text:"Henkil\xf6 ".concat(h," lis\xe4tty luetteloon"),style:"success"}),setTimeout(function(){P({text:null})},5e3)}).catch(function(e){P({text:"".concat(e.response.data.error," "),style:"fail"}),setTimeout(function(){P({text:null})},5e3)});else{var u=t.find(function(e){return e.name===h}),o=Object(c.a)({},u,{number:j});g(o).then(function(e){r(t.map(function(n){return n.id!==u.id?n:e}))}).catch(function(e){console.log(e),P({text:"".concat(e.response.data.error),style:"fail"}),setTimeout(function(){P({text:null})},5e3)})}},newName:h,handleNameChange:function(e){v(e.target.value)},newNumber:j,handleNumberChange:function(e){C(e.target.value)}}),u.a.createElement("h2",null,"Numerot"),t.filter(function(e){return!k.length||e.name.toLowerCase().includes(k.toLowerCase())}).map(function(e){return u.a.createElement(m,{key:e.id,name:e,number:e.number,deletePerson:T})}))};t(39);o.a.render(u.a.createElement(v,null),document.getElementById("root"))}},[[14,2,1]]]);
//# sourceMappingURL=main.91a0c2d3.chunk.js.map