(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"6bXN":function(e,n,t){"use strict";t.r(n);var a=t("MVZn"),r=t.n(a),c=t("o0o1"),o=t.n(c),i=t("KE/+");n["default"]={namespace:"geographic",state:{province:[],city:[],isLoading:!1},effects:{fetchProvince:o.a.mark(function e(n,t){var a,r,c;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.call,r=t.put,e.next=3,r({type:"changeLoading",payload:!0});case 3:return e.next=5,a(i["b"]);case 5:return c=e.sent,e.next=8,r({type:"setProvince",payload:c});case 8:return e.next=10,r({type:"changeLoading",payload:!1});case 10:case"end":return e.stop()}},e,this)}),fetchCity:o.a.mark(function e(n,t){var a,r,c,s;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=n.payload,r=t.call,c=t.put,e.next=4,c({type:"changeLoading",payload:!0});case 4:return e.next=6,r(i["a"],a);case 6:return s=e.sent,e.next=9,c({type:"setCity",payload:s});case 9:return e.next=11,c({type:"changeLoading",payload:!1});case 11:case"end":return e.stop()}},e,this)})},reducers:{setProvince:function(e,n){return r()({},e,{province:n.payload})},setCity:function(e,n){return r()({},e,{city:n.payload})},changeLoading:function(e,n){return r()({},e,{isLoading:n.payload})}}}}}]);