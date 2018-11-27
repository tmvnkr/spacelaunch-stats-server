"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.paginateResults=void 0;const paginateResults=({after:a,pageSize:c=20,results:b,// can pass in a function to calculate an item's cursor
getCursor:d=()=>null})=>{if(1>c)return[];if(!a)return b.slice(0,c);const e=b.findIndex(b=>{// if an item has a `cursor` on it, use that, otherwise try to generate one
let c=b.cursor?b.cursor:d(b);// if there's still not a cursor, return false by default
return!!c&&a===c});return 0<=e?e===b.length-1// don't let us overflow
?[]:b.slice(e+1,Math.min(b.length,e+1+c)):b.slice(0,c)};exports.paginateResults=paginateResults;