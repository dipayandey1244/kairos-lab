var ke=Object.defineProperty;var ee=o=>{throw TypeError(o)};var xe=(o,e,t)=>e in o?ke(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var w=(o,e,t)=>xe(o,typeof e!="symbol"?e+"":e,t),ye=(o,e,t)=>e.has(o)||ee("Cannot "+t);var te=(o,e,t)=>e.has(o)?ee("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t);var D=(o,e,t)=>(ye(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();function G(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let $=G();function le(o){$=o}const ce=/[&<>"']/,Te=new RegExp(ce.source,"g"),de=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,Se=new RegExp(de.source,"g"),Pe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ie=o=>Pe[o];function y(o,e){if(e){if(ce.test(o))return o.replace(Te,ie)}else if(de.test(o))return o.replace(Se,ie);return o}const Re=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function Ae(o){return o.replace(Re,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const Ie=/(^|[^\[])\^/g;function b(o,e){let t=typeof o=="string"?o:o.source;e=e||"";const i={replace:(n,a)=>{let s=typeof a=="string"?a:a.source;return s=s.replace(Ie,"$1"),t=t.replace(n,s),i},getRegex:()=>new RegExp(t,e)};return i}function se(o){try{o=encodeURI(o).replace(/%25/g,"%")}catch{return null}return o}const L={exec:()=>null};function ne(o,e){const t=o.replace(/\|/g,(a,s,l)=>{let r=!1,h=s;for(;--h>=0&&l[h]==="\\";)r=!r;return r?"|":" |"}),i=t.split(/ \|/);let n=0;if(i[0].trim()||i.shift(),i.length>0&&!i[i.length-1].trim()&&i.pop(),e)if(i.length>e)i.splice(e);else for(;i.length<e;)i.push("");for(;n<i.length;n++)i[n]=i[n].trim().replace(/\\\|/g,"|");return i}function B(o,e,t){const i=o.length;if(i===0)return"";let n=0;for(;n<i&&o.charAt(i-n-1)===e;)n++;return o.slice(0,i-n)}function ze(o,e){if(o.indexOf(e[1])===-1)return-1;let t=0;for(let i=0;i<o.length;i++)if(o[i]==="\\")i++;else if(o[i]===e[0])t++;else if(o[i]===e[1]&&(t--,t<0))return i;return-1}function ae(o,e,t,i){const n=e.href,a=e.title?y(e.title):null,s=o[1].replace(/\\([\[\]])/g,"$1");if(o[0].charAt(0)!=="!"){i.state.inLink=!0;const l={type:"link",raw:t,href:n,title:a,text:s,tokens:i.inlineTokens(s)};return i.state.inLink=!1,l}return{type:"image",raw:t,href:n,title:a,text:y(s)}}function Ee(o,e){const t=o.match(/^(\s+)(?:```)/);if(t===null)return e;const i=t[1];return e.split(`
`).map(n=>{const a=n.match(/^\s+/);if(a===null)return n;const[s]=a;return s.length>=i.length?n.slice(i.length):n}).join(`
`)}class H{constructor(e){w(this,"options");w(this,"rules");w(this,"lexer");this.options=e||$}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const i=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?i:B(i,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const i=t[0],n=Ee(i,t[3]||"");return{type:"code",raw:i,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let i=t[2].trim();if(/#$/.test(i)){const n=B(i,"#");(this.options.pedantic||!n||/ $/.test(n))&&(i=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:i,tokens:this.lexer.inline(i)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let i=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);i=B(i.replace(/^ *>[ \t]?/gm,""),`
`);const n=this.lexer.state.top;this.lexer.state.top=!0;const a=this.lexer.blockTokens(i);return this.lexer.state.top=n,{type:"blockquote",raw:t[0],tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let i=t[1].trim();const n=i.length>1,a={type:"list",raw:"",ordered:n,start:n?+i.slice(0,-1):"",loose:!1,items:[]};i=n?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=n?i:"[*+-]");const s=new RegExp(`^( {0,3}${i})((?:[	 ][^\\n]*)?(?:\\n|$))`);let l="",r="",h=!1;for(;e;){let c=!1;if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let u=t[2].split(`
`,1)[0].replace(/^\t+/,k=>" ".repeat(3*k.length)),d=e.split(`
`,1)[0],g=0;this.options.pedantic?(g=2,r=u.trimStart()):(g=t[2].search(/[^ ]/),g=g>4?1:g,r=u.slice(g),g+=t[1].length);let T=!1;if(!u&&/^ *$/.test(d)&&(l+=d+`
`,e=e.substring(d.length+1),c=!0),!c){const k=new RegExp(`^ {0,${Math.min(3,g-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),S=new RegExp(`^ {0,${Math.min(3,g-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),x=new RegExp(`^ {0,${Math.min(3,g-1)}}(?:\`\`\`|~~~)`),I=new RegExp(`^ {0,${Math.min(3,g-1)}}#`);for(;e;){const V=e.split(`
`,1)[0];if(d=V,this.options.pedantic&&(d=d.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),x.test(d)||I.test(d)||k.test(d)||S.test(e))break;if(d.search(/[^ ]/)>=g||!d.trim())r+=`
`+d.slice(g);else{if(T||u.search(/[^ ]/)>=4||x.test(u)||I.test(u)||S.test(u))break;r+=`
`+d}!T&&!d.trim()&&(T=!0),l+=V+`
`,e=e.substring(V.length+1),u=d.slice(g)}}a.loose||(h?a.loose=!0:/\n *\n *$/.test(l)&&(h=!0));let p=null,f;this.options.gfm&&(p=/^\[[ xX]\] /.exec(r),p&&(f=p[0]!=="[ ] ",r=r.replace(/^\[[ xX]\] +/,""))),a.items.push({type:"list_item",raw:l,task:!!p,checked:f,loose:!1,text:r,tokens:[]}),a.raw+=l}a.items[a.items.length-1].raw=l.trimEnd(),a.items[a.items.length-1].text=r.trimEnd(),a.raw=a.raw.trimEnd();for(let c=0;c<a.items.length;c++)if(this.lexer.state.top=!1,a.items[c].tokens=this.lexer.blockTokens(a.items[c].text,[]),!a.loose){const u=a.items[c].tokens.filter(g=>g.type==="space"),d=u.length>0&&u.some(g=>/\n.*\n/.test(g.raw));a.loose=d}if(a.loose)for(let c=0;c<a.items.length;c++)a.items[c].loose=!0;return a}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const i=t[1].toLowerCase().replace(/\s+/g," "),n=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",a=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:i,raw:t[0],href:n,title:a}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const i=ne(t[1]),n=t[2].replace(/^\||\| *$/g,"").split("|"),a=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(i.length===n.length){for(const l of n)/^ *-+: *$/.test(l)?s.align.push("right"):/^ *:-+: *$/.test(l)?s.align.push("center"):/^ *:-+ *$/.test(l)?s.align.push("left"):s.align.push(null);for(const l of i)s.header.push({text:l,tokens:this.lexer.inline(l)});for(const l of a)s.rows.push(ne(l,s.header.length).map(r=>({text:r,tokens:this.lexer.inline(r)})));return s}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const i=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:i,tokens:this.lexer.inline(i)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:y(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const i=t[2].trim();if(!this.options.pedantic&&/^</.test(i)){if(!/>$/.test(i))return;const s=B(i.slice(0,-1),"\\");if((i.length-s.length)%2===0)return}else{const s=ze(t[2],"()");if(s>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let n=t[2],a="";if(this.options.pedantic){const s=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);s&&(n=s[1],a=s[3])}else a=t[3]?t[3].slice(1,-1):"";return n=n.trim(),/^</.test(n)&&(this.options.pedantic&&!/>$/.test(i)?n=n.slice(1):n=n.slice(1,-1)),ae(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){const n=(i[2]||i[1]).replace(/\s+/g," "),a=t[n.toLowerCase()];if(!a){const s=i[0].charAt(0);return{type:"text",raw:s,text:s}}return ae(i,a,i[0],this.lexer)}}emStrong(e,t,i=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!n||n[3]&&i.match(/[\p{L}\p{N}]/u))return;if(!(n[1]||n[2]||"")||!i||this.rules.inline.punctuation.exec(i)){const s=[...n[0]].length-1;let l,r,h=s,c=0;const u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(l=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!l)continue;if(r=[...l].length,n[3]||n[4]){h+=r;continue}else if((n[5]||n[6])&&s%3&&!((s+r)%3)){c+=r;continue}if(h-=r,h>0)continue;r=Math.min(r,r+h+c);const d=[...n[0]][0].length,g=e.slice(0,s+n.index+d+r);if(Math.min(s,r)%2){const p=g.slice(1,-1);return{type:"em",raw:g,text:p,tokens:this.lexer.inlineTokens(p)}}const T=g.slice(2,-2);return{type:"strong",raw:g,text:T,tokens:this.lexer.inlineTokens(T)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let i=t[2].replace(/\n/g," ");const n=/[^ ]/.test(i),a=/^ /.test(i)&&/ $/.test(i);return n&&a&&(i=i.substring(1,i.length-1)),i=y(i,!0),{type:"codespan",raw:t[0],text:i}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let i,n;return t[2]==="@"?(i=y(t[1]),n="mailto:"+i):(i=y(t[1]),n=i),{type:"link",raw:t[0],text:i,href:n,tokens:[{type:"text",raw:i,text:i}]}}}url(e){var i;let t;if(t=this.rules.inline.url.exec(e)){let n,a;if(t[2]==="@")n=y(t[0]),a="mailto:"+n;else{let s;do s=t[0],t[0]=((i=this.rules.inline._backpedal.exec(t[0]))==null?void 0:i[0])??"";while(s!==t[0]);n=y(t[0]),t[1]==="www."?a="http://"+t[0]:a=t[0]}return{type:"link",raw:t[0],text:n,href:a,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let i;return this.lexer.state.inRawBlock?i=t[0]:i=y(t[0]),{type:"text",raw:t[0],text:i}}}}const $e=/^(?: *(?:\n|$))+/,Me=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,Le=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,_=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ce=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,pe=/(?:[*+-]|\d{1,9}[.)])/,he=b(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,pe).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),U=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,_e=/^[^\n]+/,Q=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Fe=b(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",Q).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),De=b(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,pe).getRegex(),W="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",K=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Be=b("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",K).replace("tag",W).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ue=b(U).replace("hr",_).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",W).getRegex(),Oe=b(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ue).getRegex(),X={blockquote:Oe,code:Me,def:Fe,fences:Le,heading:Ce,hr:_,html:Be,lheading:he,list:De,newline:$e,paragraph:ue,table:L,text:_e},oe=b("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",_).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",W).getRegex(),He={...X,table:oe,paragraph:b(U).replace("hr",_).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",oe).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",W).getRegex()},Ne={...X,html:b(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",K).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:L,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:b(U).replace("hr",_).replace("heading",` *#{1,6} *[^
]`).replace("lheading",he).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ge=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,qe=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ve=/^( {2,}|\\)\n(?!\s*$)/,We=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,F="\\p{P}\\p{S}",Ve=b(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,F).getRegex(),Ze=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,je=b(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,F).getRegex(),Ge=b("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,F).getRegex(),Ue=b("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,F).getRegex(),Qe=b(/\\([punct])/,"gu").replace(/punct/g,F).getRegex(),Ke=b(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Xe=b(K).replace("(?:-->|$)","-->").getRegex(),Ye=b("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Xe).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),N=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Je=b(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",N).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),fe=b(/^!?\[(label)\]\[(ref)\]/).replace("label",N).replace("ref",Q).getRegex(),me=b(/^!?\[(ref)\](?:\[\])?/).replace("ref",Q).getRegex(),et=b("reflink|nolink(?!\\()","g").replace("reflink",fe).replace("nolink",me).getRegex(),Y={_backpedal:L,anyPunctuation:Qe,autolink:Ke,blockSkip:Ze,br:ve,code:qe,del:L,emStrongLDelim:je,emStrongRDelimAst:Ge,emStrongRDelimUnd:Ue,escape:ge,link:Je,nolink:me,punctuation:Ve,reflink:fe,reflinkSearch:et,tag:Ye,text:We,url:L},tt={...Y,link:b(/^!?\[(label)\]\((.*?)\)/).replace("label",N).getRegex(),reflink:b(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",N).getRegex()},Z={...Y,escape:b(ge).replace("])","~|])").getRegex(),url:b(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},it={...Z,br:b(ve).replace("{2,}","*").getRegex(),text:b(Z.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},O={normal:X,gfm:He,pedantic:Ne},M={normal:Y,gfm:Z,breaks:it,pedantic:tt};class P{constructor(e){w(this,"tokens");w(this,"options");w(this,"state");w(this,"tokenizer");w(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||$,this.options.tokenizer=this.options.tokenizer||new H,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:O.normal,inline:M.normal};this.options.pedantic?(t.block=O.pedantic,t.inline=M.pedantic):this.options.gfm&&(t.block=O.gfm,this.options.breaks?t.inline=M.breaks:t.inline=M.gfm),this.tokenizer.rules=t}static get rules(){return{block:O,inline:M}}static lex(e,t){return new P(t).lex(e)}static lexInline(e,t){return new P(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const i=this.inlineQueue[t];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(l,r,h)=>r+"    ".repeat(h.length));let i,n,a,s;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>(i=l.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))){if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length),i.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length),n=t[t.length-1],n&&(n.type==="paragraph"||n.type==="text")?(n.raw+=`
`+i.raw,n.text+=`
`+i.text,this.inlineQueue[this.inlineQueue.length-1].src=n.text):t.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length),n=t[t.length-1],n&&(n.type==="paragraph"||n.type==="text")?(n.raw+=`
`+i.raw,n.text+=`
`+i.raw,this.inlineQueue[this.inlineQueue.length-1].src=n.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title});continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(a=e,this.options.extensions&&this.options.extensions.startBlock){let l=1/0;const r=e.slice(1);let h;this.options.extensions.startBlock.forEach(c=>{h=c.call({lexer:this},r),typeof h=="number"&&h>=0&&(l=Math.min(l,h))}),l<1/0&&l>=0&&(a=e.substring(0,l+1))}if(this.state.top&&(i=this.tokenizer.paragraph(a))){n=t[t.length-1],s&&n.type==="paragraph"?(n.raw+=`
`+i.raw,n.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=n.text):t.push(i),s=a.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length),n=t[t.length-1],n&&n.type==="text"?(n.raw+=`
`+i.raw,n.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=n.text):t.push(i);continue}if(e){const l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let i,n,a,s=e,l,r,h;if(this.tokens.links){const c=Object.keys(this.tokens.links);if(c.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)c.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,l.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(r||(h=""),r=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(c=>(i=c.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))){if(i=this.tokenizer.escape(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.tag(e)){e=e.substring(i.raw.length),n=t[t.length-1],n&&i.type==="text"&&n.type==="text"?(n.raw+=i.raw,n.text+=i.text):t.push(i);continue}if(i=this.tokenizer.link(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length),n=t[t.length-1],n&&i.type==="text"&&n.type==="text"?(n.raw+=i.raw,n.text+=i.text):t.push(i);continue}if(i=this.tokenizer.emStrong(e,s,h)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.codespan(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.br(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.del(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.autolink(e)){e=e.substring(i.raw.length),t.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),t.push(i);continue}if(a=e,this.options.extensions&&this.options.extensions.startInline){let c=1/0;const u=e.slice(1);let d;this.options.extensions.startInline.forEach(g=>{d=g.call({lexer:this},u),typeof d=="number"&&d>=0&&(c=Math.min(c,d))}),c<1/0&&c>=0&&(a=e.substring(0,c+1))}if(i=this.tokenizer.inlineText(a)){e=e.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(h=i.raw.slice(-1)),r=!0,n=t[t.length-1],n&&n.type==="text"?(n.raw+=i.raw,n.text+=i.text):t.push(i);continue}if(e){const c="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return t}}class q{constructor(e){w(this,"options");this.options=e||$}code(e,t,i){var a;const n=(a=(t||"").match(/^\S*/))==null?void 0:a[0];return e=e.replace(/\n$/,"")+`
`,n?'<pre><code class="language-'+y(n)+'">'+(i?e:y(e,!0))+`</code></pre>
`:"<pre><code>"+(i?e:y(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,t){return e}heading(e,t,i){return`<h${t}>${e}</h${t}>
`}hr(){return`<hr>
`}list(e,t,i){const n=t?"ol":"ul",a=t&&i!==1?' start="'+i+'"':"";return"<"+n+a+`>
`+e+"</"+n+`>
`}listitem(e,t,i){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(e){return`<p>${e}</p>
`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+t+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,t){const i=t.header?"th":"td";return(t.align?`<${i} align="${t.align}">`:`<${i}>`)+e+`</${i}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,i){const n=se(e);if(n===null)return i;e=n;let a='<a href="'+e+'"';return t&&(a+=' title="'+t+'"'),a+=">"+i+"</a>",a}image(e,t,i){const n=se(e);if(n===null)return i;e=n;let a=`<img src="${e}" alt="${i}"`;return t&&(a+=` title="${t}"`),a+=">",a}text(e){return e}}class J{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,i){return""+i}image(e,t,i){return""+i}br(){return""}}class R{constructor(e){w(this,"options");w(this,"renderer");w(this,"textRenderer");this.options=e||$,this.options.renderer=this.options.renderer||new q,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new J}static parse(e,t){return new R(t).parse(e)}static parseInline(e,t){return new R(t).parseInline(e)}parse(e,t=!0){let i="";for(let n=0;n<e.length;n++){const a=e[n];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){const s=a,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(s.type)){i+=l||"";continue}}switch(a.type){case"space":continue;case"hr":{i+=this.renderer.hr();continue}case"heading":{const s=a;i+=this.renderer.heading(this.parseInline(s.tokens),s.depth,Ae(this.parseInline(s.tokens,this.textRenderer)));continue}case"code":{const s=a;i+=this.renderer.code(s.text,s.lang,!!s.escaped);continue}case"table":{const s=a;let l="",r="";for(let c=0;c<s.header.length;c++)r+=this.renderer.tablecell(this.parseInline(s.header[c].tokens),{header:!0,align:s.align[c]});l+=this.renderer.tablerow(r);let h="";for(let c=0;c<s.rows.length;c++){const u=s.rows[c];r="";for(let d=0;d<u.length;d++)r+=this.renderer.tablecell(this.parseInline(u[d].tokens),{header:!1,align:s.align[d]});h+=this.renderer.tablerow(r)}i+=this.renderer.table(l,h);continue}case"blockquote":{const s=a,l=this.parse(s.tokens);i+=this.renderer.blockquote(l);continue}case"list":{const s=a,l=s.ordered,r=s.start,h=s.loose;let c="";for(let u=0;u<s.items.length;u++){const d=s.items[u],g=d.checked,T=d.task;let p="";if(d.task){const f=this.renderer.checkbox(!!g);h?d.tokens.length>0&&d.tokens[0].type==="paragraph"?(d.tokens[0].text=f+" "+d.tokens[0].text,d.tokens[0].tokens&&d.tokens[0].tokens.length>0&&d.tokens[0].tokens[0].type==="text"&&(d.tokens[0].tokens[0].text=f+" "+d.tokens[0].tokens[0].text)):d.tokens.unshift({type:"text",text:f+" "}):p+=f+" "}p+=this.parse(d.tokens,h),c+=this.renderer.listitem(p,T,!!g)}i+=this.renderer.list(c,l,r);continue}case"html":{const s=a;i+=this.renderer.html(s.text,s.block);continue}case"paragraph":{const s=a;i+=this.renderer.paragraph(this.parseInline(s.tokens));continue}case"text":{let s=a,l=s.tokens?this.parseInline(s.tokens):s.text;for(;n+1<e.length&&e[n+1].type==="text";)s=e[++n],l+=`
`+(s.tokens?this.parseInline(s.tokens):s.text);i+=t?this.renderer.paragraph(l):l;continue}default:{const s='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return i}parseInline(e,t){t=t||this.renderer;let i="";for(let n=0;n<e.length;n++){const a=e[n];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){const s=this.options.extensions.renderers[a.type].call({parser:this},a);if(s!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){i+=s||"";continue}}switch(a.type){case"escape":{const s=a;i+=t.text(s.text);break}case"html":{const s=a;i+=t.html(s.text);break}case"link":{const s=a;i+=t.link(s.href,s.title,this.parseInline(s.tokens,t));break}case"image":{const s=a;i+=t.image(s.href,s.title,s.text);break}case"strong":{const s=a;i+=t.strong(this.parseInline(s.tokens,t));break}case"em":{const s=a;i+=t.em(this.parseInline(s.tokens,t));break}case"codespan":{const s=a;i+=t.codespan(s.text);break}case"br":{i+=t.br();break}case"del":{const s=a;i+=t.del(this.parseInline(s.tokens,t));break}case"text":{const s=a;i+=t.text(s.text);break}default:{const s='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return i}}class C{constructor(e){w(this,"options");this.options=e||$}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}w(C,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var E,j,be;class st{constructor(...e){te(this,E);w(this,"defaults",G());w(this,"options",this.setOptions);w(this,"parse",D(this,E,j).call(this,P.lex,R.parse));w(this,"parseInline",D(this,E,j).call(this,P.lexInline,R.parseInline));w(this,"Parser",R);w(this,"Renderer",q);w(this,"TextRenderer",J);w(this,"Lexer",P);w(this,"Tokenizer",H);w(this,"Hooks",C);this.use(...e)}walkTokens(e,t){var n,a;let i=[];for(const s of e)switch(i=i.concat(t.call(this,s)),s.type){case"table":{const l=s;for(const r of l.header)i=i.concat(this.walkTokens(r.tokens,t));for(const r of l.rows)for(const h of r)i=i.concat(this.walkTokens(h.tokens,t));break}case"list":{const l=s;i=i.concat(this.walkTokens(l.items,t));break}default:{const l=s;(a=(n=this.defaults.extensions)==null?void 0:n.childTokens)!=null&&a[l.type]?this.defaults.extensions.childTokens[l.type].forEach(r=>{const h=l[r].flat(1/0);i=i.concat(this.walkTokens(h,t))}):l.tokens&&(i=i.concat(this.walkTokens(l.tokens,t)))}}return i}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(i=>{const n={...i};if(n.async=this.defaults.async||n.async||!1,i.extensions&&(i.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if("renderer"in a){const s=t.renderers[a.name];s?t.renderers[a.name]=function(...l){let r=a.renderer.apply(this,l);return r===!1&&(r=s.apply(this,l)),r}:t.renderers[a.name]=a.renderer}if("tokenizer"in a){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const s=t[a.level];s?s.unshift(a.tokenizer):t[a.level]=[a.tokenizer],a.start&&(a.level==="block"?t.startBlock?t.startBlock.push(a.start):t.startBlock=[a.start]:a.level==="inline"&&(t.startInline?t.startInline.push(a.start):t.startInline=[a.start]))}"childTokens"in a&&a.childTokens&&(t.childTokens[a.name]=a.childTokens)}),n.extensions=t),i.renderer){const a=this.defaults.renderer||new q(this.defaults);for(const s in i.renderer){if(!(s in a))throw new Error(`renderer '${s}' does not exist`);if(s==="options")continue;const l=s,r=i.renderer[l],h=a[l];a[l]=(...c)=>{let u=r.apply(a,c);return u===!1&&(u=h.apply(a,c)),u||""}}n.renderer=a}if(i.tokenizer){const a=this.defaults.tokenizer||new H(this.defaults);for(const s in i.tokenizer){if(!(s in a))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;const l=s,r=i.tokenizer[l],h=a[l];a[l]=(...c)=>{let u=r.apply(a,c);return u===!1&&(u=h.apply(a,c)),u}}n.tokenizer=a}if(i.hooks){const a=this.defaults.hooks||new C;for(const s in i.hooks){if(!(s in a))throw new Error(`hook '${s}' does not exist`);if(s==="options")continue;const l=s,r=i.hooks[l],h=a[l];C.passThroughHooks.has(s)?a[l]=c=>{if(this.defaults.async)return Promise.resolve(r.call(a,c)).then(d=>h.call(a,d));const u=r.call(a,c);return h.call(a,u)}:a[l]=(...c)=>{let u=r.apply(a,c);return u===!1&&(u=h.apply(a,c)),u}}n.hooks=a}if(i.walkTokens){const a=this.defaults.walkTokens,s=i.walkTokens;n.walkTokens=function(l){let r=[];return r.push(s.call(this,l)),a&&(r=r.concat(a.call(this,l))),r}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return P.lex(e,t??this.defaults)}parser(e,t){return R.parse(e,t??this.defaults)}}E=new WeakSet,j=function(e,t){return(i,n)=>{const a={...n},s={...this.defaults,...a};this.defaults.async===!0&&a.async===!1&&(s.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),s.async=!0);const l=D(this,E,be).call(this,!!s.silent,!!s.async);if(typeof i>"u"||i===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof i!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(i)+", string expected"));if(s.hooks&&(s.hooks.options=s),s.async)return Promise.resolve(s.hooks?s.hooks.preprocess(i):i).then(r=>e(r,s)).then(r=>s.hooks?s.hooks.processAllTokens(r):r).then(r=>s.walkTokens?Promise.all(this.walkTokens(r,s.walkTokens)).then(()=>r):r).then(r=>t(r,s)).then(r=>s.hooks?s.hooks.postprocess(r):r).catch(l);try{s.hooks&&(i=s.hooks.preprocess(i));let r=e(i,s);s.hooks&&(r=s.hooks.processAllTokens(r)),s.walkTokens&&this.walkTokens(r,s.walkTokens);let h=t(r,s);return s.hooks&&(h=s.hooks.postprocess(h)),h}catch(r){return l(r)}}},be=function(e,t){return i=>{if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const n="<p>An error occurred:</p><pre>"+y(i.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(i);throw i}};const z=new st;function m(o,e){return z.parse(o,e)}m.options=m.setOptions=function(o){return z.setOptions(o),m.defaults=z.defaults,le(m.defaults),m};m.getDefaults=G;m.defaults=$;m.use=function(...o){return z.use(...o),m.defaults=z.defaults,le(m.defaults),m};m.walkTokens=function(o,e){return z.walkTokens(o,e)};m.parseInline=z.parseInline;m.Parser=R;m.parser=R.parse;m.Renderer=q;m.TextRenderer=J;m.Lexer=P;m.lexer=P.lex;m.Tokenizer=H;m.Hooks=C;m.parse=m;m.options;m.setOptions;m.use;m.walkTokens;m.parseInline;R.parse;P.lex;m.setOptions({gfm:!0,breaks:!0});let v={currentPath:window.location.pathname||"/",isDocsOpen:!1,activeDocTab:"WEBSITE_DESIGN_SPEC"};const nt=document.getElementById("app");function at(){window.addEventListener("popstate",ot),A()}function ot(){v.currentPath=window.location.pathname||"/",A()}function rt(o){window.history.pushState({},"",o),v.currentPath=o,window.scrollTo({top:0,behavior:"smooth"}),A()}function A(){nt.innerHTML=`
    ${lt()}
    <main>
      ${ct()}
    </main>
    ${vt()}
    ${renderDocsModal()}
  `,v.currentPath==="/research/time-series"&&setTimeout(Tt,50)}function lt(){return`
    <header class="site-header">
      <div class="container header-inner">
        <div class="brand-block">
          <div class="logo-main" onclick="window.navigateTo('/')">
            <span class="logo-title">Kairos</span>
            <span class="logo-sub">RESEARCH LAB</span>
          </div>
          <div class="brand-separator"></div>
          <div class="brand-tagline">Models. Embodiment. Real-World Impact.</div>
        </div>

        <ul class="nav-menu">
          <li class="nav-link ${v.currentPath==="/"?"active":""}" onclick="window.navigateTo('/')">Home</li>
          <li class="nav-link ${v.currentPath.startsWith("/research")?"active":""}" onclick="window.navigateTo('/research')">Research</li>
          <li class="nav-link ${v.currentPath==="/people"?"active":""}" onclick="window.navigateTo('/people')">People</li>
          <li class="nav-link ${v.currentPath==="/publications"?"active":""}" onclick="window.navigateTo('/publications')">Publications</li>
          <li class="nav-link ${v.currentPath==="/projects"?"active":""}" onclick="window.navigateTo('/projects')">Projects</li>
          <li class="nav-link ${v.currentPath==="/news"?"active":""}" onclick="window.navigateTo('/news')">News</li>
          <li class="nav-link ${v.currentPath==="/contact"?"active":""}" onclick="window.navigateTo('/contact')">Contact</li>
        </ul>

        <div class="header-right">
          <button class="btn-icon-search" title="Search" onclick="window.openDocsModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <button class="btn-join-red" onclick="alert('Join Kairos Research Lab: Applications open for PhD, Interns &amp; Engineers.')">Join Us</button>
        </div>
      </div>
    </header>
  `}function ct(){const o=v.currentPath;return o==="/"||o==="/home"?re():o==="/research/time-series"?yt():o.startsWith("/research")?ft():o.startsWith("/projects")?mt():o==="/publications"?bt():o==="/people"?wt():o==="/news"?kt():o==="/contact"?xt():re()}function re(){return`
    ${dt()}
    ${we()}
    ${pt()}
    ${ht()}
    ${ut()}
    ${gt()}
  `}function dt(){return`
    <section class="hero-wrapper">
      <div class="container hero-grid">
        <div>
          <div class="dash-eyebrow">RESEARCH AT THE FRONTIER</div>
          <h1 class="hero-h1">Towards Intelligent Agents for the <span class="text-red-highlight">Real World.</span></h1>
          <p class="hero-p">
            We build models, systems and understanding for embodied intelligence — connecting perception, reasoning and action.
          </p>

          <div class="hero-actions">
            <button class="btn-action-red" onclick="window.scrollToSection('pillars')">Our Research →</button>
            <button class="btn-action-outline" onclick="window.scrollToSection('positions')">Join the Lab</button>
          </div>

          <div class="hero-metrics-row">
            <div>
              <div class="metric-num">3</div>
              <div class="metric-lbl">Research Themes</div>
            </div>
            <div>
              <div class="metric-num">12+</div>
              <div class="metric-lbl">Research Projects</div>
            </div>
            <div>
              <div class="metric-num">25+</div>
              <div class="metric-lbl">Publications</div>
            </div>
            <div>
              <div class="metric-num">10+</div>
              <div class="metric-lbl">Collaborators</div>
            </div>
          </div>
        </div>

        <div class="hero-right-container">
          <img class="hero-right-img" src="/images/robotic-arm-hero.jpg" alt="Robotic Arm Embodied Intelligence" />
          <div class="hero-overlay-topright">
            PERCEPTION<br/>
            REASONING<br/>
            ACTION<br/>
            FOR A MORE<br/>
            CAPABLE WORLD
          </div>
          <div class="hero-overlay-caption">
            Foundation models for embodied intelligence.
          </div>
        </div>
      </div>
    </section>
  `}function we(){return`
    <section class="container" id="pillars" style="padding: 64px 0;">
      <div class="section-header-flex">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 20px; height: 2px; background: var(--accent-red);"></div>
          <h2 class="section-title-text">Our Research Pillars</h2>
        </div>
        <span class="link-red-arrow" onclick="window.navigateTo('/research')">Explore all research →</span>
      </div>

      <div class="pillars-section-grid">
        <!-- Pillar 01: Time Series Models (Deep Dive) -->
        <div class="pillar-item-card pillar-featured-ts" onclick="window.navigateTo('/research/time-series')">
          <div class="pillar-svg-wrap">
            <span class="pillar-corner-num">01</span>
            <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
              <path d="M10 45 Q 35 10, 60 45 T 110 45 T 160 45 T 210 45" stroke="#B52E32" stroke-width="1.5" opacity="0.8"/>
              <path d="M10 45 Q 35 25, 60 45 T 110 45 T 160 45 T 210 45" stroke="#B52E32" stroke-width="1" opacity="0.5"/>
              <path d="M10 45 Q 35 60, 60 45 T 110 45 T 160 45 T 210 45" stroke="#B52E32" stroke-width="1" opacity="0.3"/>
            </svg>
          </div>
          <div>
            <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent-red); margin-bottom: 4px;">FEATURED DEEP DIVE</div>
            <h3 class="pillar-item-title">Time Series Models</h3>
            <p class="pillar-item-desc">Modeling, learning and forecasting dynamic systems across scales.</p>
          </div>
          <div style="text-align: right; color: var(--accent-red); font-weight: 700;">Explore Deep Dive →</div>
        </div>

        <!-- Pillar 02 -->
        <div class="pillar-item-card" onclick="window.navigateTo('/research')">
          <div class="pillar-svg-wrap">
            <span class="pillar-corner-num">02</span>
            <svg width="120" height="90" viewBox="0 0 120 90" fill="none">
              <circle cx="60" cy="45" r="35" stroke="#17191C" stroke-width="1" stroke-dasharray="2 3"/>
              <circle cx="60" cy="45" r="24" stroke="#B52E32" stroke-width="1.5"/>
              <circle cx="60" cy="45" r="4" fill="#B52E32"/>
            </svg>
          </div>
          <div>
            <h3 class="pillar-item-title">World Models</h3>
            <p class="pillar-item-desc">Learning structured representations of the world.</p>
          </div>
          <div style="text-align: right; color: var(--accent-red); font-weight: 700;">→</div>
        </div>

        <!-- Pillar 03 -->
        <div class="pillar-item-card" onclick="window.navigateTo('/research')">
          <div class="pillar-svg-wrap">
            <span class="pillar-corner-num">03</span>
            <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
              <path d="M50 15 L85 32 L50 49 L15 32 Z" fill="#F3D9D7" stroke="#B52E32" stroke-width="1.2"/>
              <path d="M15 32 L50 49 L50 82 L15 65 Z" fill="#B52E32" opacity="0.8"/>
              <path d="M85 32 L50 49 L50 82 L85 65 Z" fill="#982226" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <h3 class="pillar-item-title">Vision-Language-Action</h3>
            <p class="pillar-item-desc">Bridging perception, language and action for embodied AI.</p>
          </div>
          <div style="text-align: right; color: var(--accent-red); font-weight: 700;">→</div>
        </div>

        <!-- Our Mission Container -->
        <div class="mission-card">
          <div>
            <h3 class="mission-title">Our Mission</h3>
            <p class="mission-body">
              We advance the science and engineering of intelligent agents that can perceive, understand, and act in the real world, with the goal of creating useful, safe and human-aligned AI.
            </p>
          </div>
          <div class="link-red-arrow" onclick="window.navigateTo('/people')">Learn more about our lab →</div>
        </div>
      </div>
    </section>
  `}function pt(){return`
    <section class="container">
      <div class="split-work-news-grid">
        <!-- Featured Work -->
        <div>
          <div class="section-header-flex">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 20px; height: 2px; background: var(--accent-red);"></div>
              <h2 class="section-title-text">Featured Work</h2>
            </div>
          </div>

          <div class="spotlight-card" onclick="window.navigateTo('/projects')">
            <div class="spotlight-img-col">
              <img src="/images/quadruped-spot-robot.jpg" alt="Robotic Navigation" />
              <div class="spotlight-overlay-tags">
                ADAPT<br/>LEARN<br/>NAVIGATE
              </div>
            </div>
            <div class="spotlight-content-col">
              <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent-red); margin-bottom: 8px;">RESEARCH SPOTLIGHT</div>
              <h3 style="font-family: var(--font-serif); font-size: 24px; margin-bottom: 12px;">World Models for Real-World Robotic Navigation</h3>
              <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 20px;">
                We explore how world models can enable more generalizable, sample-efficient and robust robotic policy learning in complex environments.
              </p>
              <div class="link-red-arrow">View project →</div>
            </div>
          </div>
        </div>

        <!-- Latest News -->
        <div>
          <div class="section-header-flex">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 20px; height: 2px; background: var(--accent-red);"></div>
              <h2 class="section-title-text">Latest News</h2>
            </div>
            <span class="link-red-arrow" onclick="window.navigateTo('/news')">View all news →</span>
          </div>

          <div class="news-list">
            <div class="news-item-row">
              <div class="news-date">SEP 12, 2026</div>
              <div class="news-title" onclick="window.navigateTo('/news')">Our paper on VLA models accepted at CoRL 2026</div>
            </div>
            <div class="news-item-row">
              <div class="news-date">AUG 28, 2026</div>
              <div class="news-title" onclick="window.navigateTo('/news')">New project on world modeling for autonomous systems</div>
            </div>
            <div class="news-item-row">
              <div class="news-date">AUG 10, 2026</div>
              <div class="news-title" onclick="window.navigateTo('/news')">We're hiring! Open positions for PhD, interns and research engineers</div>
            </div>
            <div class="news-item-row">
              <div class="news-date">JUL 25, 2026</div>
              <div class="news-title" onclick="window.navigateTo('/news')">Lab visit from industry partners</div>
            </div>
            <div class="news-item-row">
              <div class="news-date">JUL 10, 2026</div>
              <div class="news-title" onclick="window.navigateTo('/news')">New preprint on time series foundation models</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `}function ht(){return`
    <section class="container" id="positions">
      <div class="split-pubs-positions-grid">
        <!-- Selected Publications -->
        <div>
          <div class="section-header-flex">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 20px; height: 2px; background: var(--accent-red);"></div>
              <h2 class="section-title-text">Selected Publications</h2>
            </div>
            <span class="link-red-arrow" onclick="window.navigateTo('/publications')">View all publications →</span>
          </div>

          <div class="pubs-cards-row">
            <div class="pub-card" onclick="window.navigateTo('/publications')">
              <div>
                <svg class="pub-icon-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <div class="pub-title">WorldPriors: Learning Predictive Representations for Robotic Control</div>
              </div>
              <div class="pub-venue">CoRL 2026</div>
            </div>

            <div class="pub-card" onclick="window.navigateTo('/publications')">
              <div>
                <svg class="pub-icon-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <div class="pub-title">Scaling Time Series Models for Real-World Forecasting</div>
              </div>
              <div class="pub-venue">NeurIPS 2025</div>
            </div>

            <div class="pub-card" onclick="window.navigateTo('/publications')">
              <div>
                <svg class="pub-icon-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <div class="pub-title">Vision-Language-Action Models for Generalizable Robotics</div>
              </div>
              <div class="pub-venue">ICRA 2025</div>
            </div>
          </div>
        </div>

        <!-- Open Positions -->
        <div>
          <div class="section-header-flex">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 20px; height: 2px; background: var(--accent-red);"></div>
              <h2 class="section-title-text">Open Positions</h2>
            </div>
            <span class="link-red-arrow" onclick="alert('Applications open!')">View all positions →</span>
          </div>

          <div class="positions-list">
            <div class="position-item-row" onclick="alert('PhD Position details...')">
              <div>
                <div class="position-title">PhD Students</div>
                <div class="position-subtitle">Work on world models, VLA and embodied intelligence</div>
              </div>
              <div style="color: var(--accent-red); font-weight: 700;">→</div>
            </div>

            <div class="position-item-row" onclick="alert('Internship details...')">
              <div>
                <div class="position-title">Research Interns</div>
                <div class="position-subtitle">Undergraduate and Masters students</div>
              </div>
              <div style="color: var(--accent-red); font-weight: 700;">→</div>
            </div>

            <div class="position-item-row" onclick="alert('Engineer details...')">
              <div>
                <div class="position-title">Research Engineers</div>
                <div class="position-subtitle">Build datasets, models and real-world systems</div>
              </div>
              <div style="color: var(--accent-red); font-weight: 700;">→</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `}function ut(){return`
    <section class="container">
      <div class="collaborators-wrapper">
        <div style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Our Collaborators</div>
        <div class="collaborator-logos-flex">
          <div class="collab-logo-text" style="font-size: 32px; font-weight: 800;">MIT</div>
          <div class="collab-logo-text" style="font-size: 26px;">Stanford</div>
          <div class="collab-logo-text" style="font-size: 22px; line-height: 1.1;">Carnegie<br/>Mellon<br/>University</div>
          <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 22px; color: var(--text-muted);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            Google DeepMind
          </div>
          <div style="font-weight: 800; font-size: 24px; color: var(--text-muted); letter-spacing: 0.05em;">NVIDIA</div>
          <div style="font-weight: 800; font-size: 26px; color: var(--text-muted);">∞ Meta</div>
          <div style="font-size: 13px; color: var(--text-muted); font-weight: 500;">And more...</div>
        </div>
      </div>
    </section>
  `}function gt(){return`
    <section class="container">
      <div class="newsletter-card-box">
        <h3 class="newsletter-title">Stay connected with the research.</h3>
        <p class="newsletter-desc">Get occasional updates on new papers, projects, research notes and opportunities.</p>
        <div class="newsletter-form-row">
          <input class="newsletter-input" type="email" placeholder="Your email..." />
          <button class="btn-action-red" onclick="alert('Thank you for subscribing to Kairos Research Lab updates.')">Subscribe →</button>
        </div>
      </div>
    </section>
  `}function vt(){return`
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top-flex">
          <div>
            <div class="logo-main" onclick="window.navigateTo('/')">
              <span class="logo-title">Kairos</span>
              <span class="logo-sub">RESEARCH LAB</span>
            </div>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">Models for a more capable and human-centric future.</div>
          </div>

          <ul class="nav-menu" style="gap: 20px;">
            <li class="nav-link" onclick="window.navigateTo('/')">Home</li>
            <li class="nav-link" onclick="window.navigateTo('/research')">Research</li>
            <li class="nav-link" onclick="window.navigateTo('/people')">People</li>
            <li class="nav-link" onclick="window.navigateTo('/publications')">Publications</li>
            <li class="nav-link" onclick="window.navigateTo('/projects')">Projects</li>
            <li class="nav-link" onclick="window.navigateTo('/news')">News</li>
            <li class="nav-link" onclick="window.navigateTo('/contact')">Contact</li>
          </ul>
        </div>

        <div class="footer-bottom-flex">
          <div>© 2026 Kairos Research Lab. All rights reserved.</div>
          <div style="display: flex; gap: 16px; align-items: center;">
            <!-- LinkedIn -->
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="LinkedIn" aria-label="LinkedIn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <!-- GitHub -->
            <a href="https://github.com/gupta706" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="GitHub" aria-label="GitHub">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <!-- YouTube -->
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="YouTube" aria-label="YouTube">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `}function ft(){return`
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">RESEARCH DIRECTORY</div>
      <h1 class="hero-h1">Research Pillars</h1>
      <p class="hero-p">We study models that learn to understand dynamics, construct internal representations of the world, and translate perception into action.</p>
      ${we()}
    </section>
  `}function mt(){return`
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">PROJECTS</div>
      <h1 class="hero-h1">Active Research Projects</h1>
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 40px; border-radius: var(--radius-md); margin-top: 24px;">
        <h3 style="font-family: var(--font-serif); font-size: 26px; margin-bottom: 8px;">World Models for Real-World Robotic Navigation</h3>
        <p style="font-size: 14px; color: var(--text-secondary);">Exploring sample-efficient world model representations for robotic navigation in complex terrain.</p>
      </div>
    </section>
  `}function bt(){return`
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">PUBLICATIONS</div>
      <h1 class="hero-h1">Selected Publications</h1>
      <div class="pubs-cards-row" style="margin-top: 32px;">
        <div class="pub-card">
          <div>
            <svg class="pub-icon-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <div class="pub-title">WorldPriors: Learning Predictive Representations for Robotic Control</div>
          </div>
          <div class="pub-venue">CoRL 2026</div>
        </div>
      </div>
    </section>
  `}function wt(){return`
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">PEOPLE</div>
      <h1 class="hero-h1">Kairos Research Team</h1>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 32px;">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 24px; border-radius: var(--radius-md);">
          <div style="font-size: 18px; font-weight: 700;">Dipayan Dey</div>
          <div style="font-size: 13px; color: var(--accent-red);">Principal Investigator</div>
        </div>
      </div>
    </section>
  `}function kt(){return`
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">NEWS</div>
      <h1 class="hero-h1">Lab News</h1>
    </section>
  `}function xt(){return`
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">CONTACT</div>
      <h1 class="hero-h1">Connect with Kairos</h1>
    </section>
  `}function yt(){const o=v.tsActivePhase||1,t={1:{tag:"PHASE 01 • 1970s – 2010s",title:"Initial / Statistical & State Space Foundations",subtitle:"Independent Local Fitting, Stationarity Assumptions, and Auto-Correlation",math:"y_t = c + \\sum_{i=1}^p \\phi_i y_{t-i} + \\sum_{j=1}^q \\theta_j \\epsilon_{t-j} + \\epsilon_t",desc:"In the foundational era of time series analysis, forecasting relied on univariate statistical processes such as ARIMA, SARIMA, Exponential Smoothing (Holt-Winters), and State Space Models (Kalman Filters). These models fit explicit mathematical equations independently to every single individual time series.",models:["ARIMA (Box-Jenkins 1970)","SARIMA","Holt-Winters ESM","Kalman Filter SSM","Vector Autoregression (VAR)"],strengths:["Highly interpretable parameters","Low computational requirement","Proven theoretical guarantees for stationary sequence"],bottlenecks:["Zero cross-series parameter sharing (must retrain for every new series)","Unable to handle high-dimensional non-linear signals","Fails over long forecasting horizons (>30 steps)"]},2:{tag:"PHASE 02 • 2015 – 2020",title:"Deep Sequential & Global Neural Forecasting",subtitle:"The Shift from Local Fitting to Cross-Series Parameter Sharing",math:"P(Y_{1:T} | X_{1:T}) = \\prod_{t=1}^T P(y_t | y_{<t}, x_{1:T}; \\Theta)",desc:"Deep Learning introduced the 'Global Forecasting' paradigm. Rather than optimizing 100,000 independent models for 100,000 sensors or retail items, models like DeepAR, N-BEATS, and Temporal Convolutional Networks (TCN) trained a single shared deep neural network across thousands of series simultaneously.",models:["DeepAR (Amazon Research 2017)","N-BEATS (ICLR 2020)","TCN (Bai et al. 2018)","LSTNet","WaveNet"],strengths:["Learns shared temporal features across millions of time series","Captures non-linear seasonality and complex interactions","Probabilistic output distributions"],bottlenecks:["Sequential RNN gradient decay over long lookback windows (>500 steps)","Rigid input-output sequence lengths require retraining for new horizons","Lacks cross-domain zero-shot generalization"]},3:{tag:"PHASE 03 • 2020 – 2023",title:"The Transformer Revolution & Temporal Patch Tokenization",subtitle:"Point-wise Attention Pitfalls & The Sub-series Patching Breakthrough",math:"Patch_{embedding} = Linear(Concat(y_{t-P+1}, \\dots, y_t)) \\in \\mathbb{R}^{D}",desc:"Initial adaptations of NLP Transformers to time series failed because individual scalar time points lack semantic context. Breakthroughs like PatchTST and iTransformer introduced sub-series patching (grouping P adjacent time steps into semantic tokens) and Channel Independence (CI), reducing attention complexity from O(L²) to O((L/P)²) and setting new benchmark records.",models:["Informer (AAAI 2021 Best Paper)","Autoformer (NeurIPS 2021)","PatchTST (ICLR 2023)","iTransformer (ICLR 2024)","FEDformer"],strengths:["Patching reduces quadratic attention cost while boosting receptive field","Supports ultra-long context windows (L = 1024 to 2048+ steps)","Channel Independence outperforms complex multi-channel models"],bottlenecks:["Requires supervised fine-tuning for each target domain","Sensitivity to hyperparameter tuning per dataset","Limited zero-shot transfer capabilities"]},4:{tag:"PHASE 04 • 2023 – 2025",title:"Time Series Foundation Models (TSFMs) Era",subtitle:"Large-Scale Pre-training, LOTSA Corpus, & Zero-Shot Universal Forecasting",math:"\\min_\\theta \\mathbb{E}_{S \\sim \\mathcal{D}_{LOTSA}} [ \\mathcal{L}_{MSE/Quantile}( \\mathcal{M}_\\theta(S_{context}), S_{target} ) ]",desc:"Inspired by LLMs, Time Series Foundation Models (TSFMs) leverage massive pre-training across billions of spatio-temporal observations (such as LOTSA 27B points across energy, transport, finance, weather, and IoT). Models perform instant zero-shot forecasting on unseen datasets without any fine-tuning or gradient updates.",models:["TimesFM (Google Research 2024)","MOIRAI (Salesforce AI ICML 2024)","TimeGPT (Nixtla 2023)","MOMENT (CMU 2024)","UniTS (Harvard 2024)","Lag-Llama"],strengths:["Zero-shot out-of-the-box forecasting on unseen datasets","Reduces compute cost by 90%+ vs training custom models","Dynamic patch sizes and flexible context/horizon lengths"],bottlenecks:["High memory footprint during large multi-variate inference","Handling domain-specific extreme outliers or structural breaks","Prompt alignment for exogenous covariates"]},5:{tag:"PHASE 05 • 2025 – 2026 (LATEST FRONTIER)",title:"SOTA Showcase: Sparse MoE & Universal Spatio-Temporal Intelligence",subtitle:"TimesFM 2.0 & MOIRAI-MoE: State-of-the-Art Benchmark Breakthroughs",math:"Output_t = \\sum_{i=1}^K G(x)_i \\cdot Expert_i(x_t), \\quad \\text{where } G(x) = TopK(Softmax(W_g x))",desc:"The latest frontier integrates Sparse Mixture-of-Experts (MoE) routing tokenized temporal patches into specialized subnetworks for seasonality, trend, and anomalies. Featuring continuous quantile heads and cross-domain zero-shot adaptation, this represents the current peak of temporal AI research.",models:["TimesFM 2.0 (Google & Kairos 2025)","MOIRAI-MoE (Salesforce 2025)","TTM (IBM Research 2025)","Chronos (Amazon 2025)"],strengths:["Sets new zero-shot SOTA across Monash, GIFT-Eval & ETT benchmarks","Dynamic sparse routing reduces active FLOPs per inference step","Calibrated quantile probabilistic uncertainty bounds"],bottlenecks:["Active research area in multi-variate cross-attention synchronization","Handling ultra-high frequency sub-millisecond high-frequency financial feeds"]}}[o];return`
    <div class="ts-deepdive-wrapper">
      <!-- Top Breadcrumbs -->
      <section class="container" style="padding-top: 32px;">
        <div class="ts-breadcrumbs">
          <span class="ts-crumb-link" onclick="window.navigateTo('/')">Home</span>
          <span class="ts-crumb-sep">/</span>
          <span class="ts-crumb-link" onclick="window.navigateTo('/research')">Research</span>
          <span class="ts-crumb-sep">/</span>
          <span class="ts-crumb-active">Time Series Foundation Models</span>
        </div>
      </section>

      <!-- Hero Header -->
      <section class="container ts-hero-header">
        <div class="ts-badge-red">SPECIAL RESEARCH DEEP DIVE • PILLAR 01</div>
        <h1 class="ts-hero-title">The Evolution of Time Series Foundation Models</h1>
        <p class="ts-hero-subtitle">
          From single-series ARIMA statistical fitting to large-scale pre-trained zero-shot temporal intelligence — an exhaustive technical synthesis.
        </p>

        <div class="ts-meta-bar">
          <div class="ts-meta-item">
            <strong>Author:</strong> Kairos Research Team
          </div>
          <div class="ts-meta-item">
            <strong>Updated:</strong> September 2026
          </div>
          <div class="ts-meta-item">
            <strong>Scope:</strong> Statistical → Deep Learning → Transformers → Foundation Models (TSFMs)
          </div>
          <div class="ts-meta-item">
            <span class="ts-tag-pill">Interactive Simulator Included</span>
            <span class="ts-tag-pill">HD Video Walkthrough</span>
          </div>
        </div>
      </section>

      <!-- Stepper / Phase Explorer Navigation -->
      <section class="container" style="margin-top: 40px;">
        <div class="ts-stepper-label-row">
          <div class="section-title-text" style="font-size: 20px;">Historical Development Phases</div>
          <div style="font-size: 13px; color: var(--text-muted);">Click any phase below to explore its paradigm shift:</div>
        </div>

        <div class="ts-stepper-bar">
          <button class="ts-step-btn ${o===1?"active":""}" onclick="window.setTsPhase(1)">
            <span class="step-num">01</span>
            <span class="step-text">Statistical Roots<br/><small>1970–2015</small></span>
          </button>
          <button class="ts-step-btn ${o===2?"active":""}" onclick="window.setTsPhase(2)">
            <span class="step-num">02</span>
            <span class="step-text">Deep Sequential<br/><small>2015–2020</small></span>
          </button>
          <button class="ts-step-btn ${o===3?"active":""}" onclick="window.setTsPhase(3)">
            <span class="step-num">03</span>
            <span class="step-text">Transformers & Patching<br/><small>2020–2023</small></span>
          </button>
          <button class="ts-step-btn ${o===4?"active":""}" onclick="window.setTsPhase(4)">
            <span class="step-num">04</span>
            <span class="step-text">Foundation Models<br/><small>2023–2025</small></span>
          </button>
          <button class="ts-step-btn ${o===5?"active":""}" onclick="window.setTsPhase(5)">
            <span class="step-num">05</span>
            <span class="step-text">SOTA Frontier<br/><small>2025–2026</small></span>
          </button>
        </div>

        <!-- Phase Detail Card -->
        <div class="ts-phase-detail-card">
          <div class="ts-phase-header-flex">
            <div>
              <span class="ts-phase-tag">${t.tag}</span>
              <h2 class="ts-phase-title">${t.title}</h2>
              <div class="ts-phase-subtitle">${t.subtitle}</div>
            </div>
            <div class="ts-phase-num-badge">0${o}</div>
          </div>

          <div class="ts-phase-grid">
            <div class="ts-phase-col-main">
              <p class="ts-phase-desc">${t.desc}</p>
              
              <div class="ts-formula-box">
                <div class="ts-formula-label">Core Mathematical Formulation</div>
                <code>${t.math}</code>
              </div>

              <div style="margin-top: 24px;">
                <div style="font-weight: 700; font-size: 14px; margin-bottom: 10px; color: var(--text-primary);">Representative Key Architectures & Milestones:</div>
                <div class="ts-models-flex">
                  ${t.models.map(i=>`<span class="ts-model-badge">${i}</span>`).join("")}
                </div>
              </div>
            </div>

            <div class="ts-phase-col-side">
              <div class="ts-eval-box ts-eval-strengths">
                <div class="ts-eval-title">Key Advantages & Innovations</div>
                <ul>
                  ${t.strengths.map(i=>`<li>✓ ${i}</li>`).join("")}
                </ul>
              </div>

              <div class="ts-eval-box ts-eval-bottlenecks">
                <div class="ts-eval-title">Fundamental Limitations</div>
                <ul>
                  ${t.bottlenecks.map(i=>`<li>✗ ${i}</li>`).join("")}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- High Quality Interactive Simulator Canvas Section -->
      <section class="container" style="margin-top: 64px;">
        <div class="section-header-flex">
          <div>
            <div class="dash-eyebrow">HIGH QUALITY INTERACTIVE ANIMATION</div>
            <h2 class="section-title-text" style="font-size: 28px;">Live Architecture Simulator: Patch Tokenization & Zero-Shot Forecasting</h2>
          </div>
          <div style="font-size: 13px; color: var(--text-muted);">Simulate continuous signal patch tokenization & temporal attention in real time.</div>
        </div>

        <div class="ts-sim-card">
          <!-- Canvas Container -->
          <div class="ts-canvas-wrapper">
            <canvas id="ts-sim-canvas" width="1150" height="380"></canvas>
            
            <div class="ts-canvas-overlay-info">
              <div class="info-badge">
                <span class="dot-live"></span> LIVE TEMPORAL PATCH ATTENTION ENGINE
              </div>
              <div id="ts-canvas-metrics" class="info-metrics">
                Context Length: 512 steps | Patch Size P = 16 | Horizon: 96 steps | Attention Heads: 8
              </div>
            </div>
          </div>

          <!-- Simulator Control Panel -->
          <div class="ts-sim-controls-bar">
            <div class="control-group">
              <label>Model Architecture:</label>
              <select id="ts-model-select" class="ts-select" onchange="window.updateSimModel(this.value)">
                <option value="TimesFM" ${v.tsSimModel==="TimesFM"?"selected":""}>TimesFM 2.0 (Foundation Model Zero-Shot)</option>
                <option value="PatchTST" ${v.tsSimModel==="PatchTST"?"selected":""}>PatchTST (Transformer Patching)</option>
                <option value="DeepAR" ${v.tsSimModel==="DeepAR"?"selected":""}>DeepAR (RNN Global Model)</option>
                <option value="ARIMA" ${v.tsSimModel==="ARIMA"?"selected":""}>ARIMA (Statistical Baseline)</option>
              </select>
            </div>

            <div class="control-group">
              <label>Patch Token Length (P):</label>
              <select id="ts-patch-select" class="ts-select" onchange="window.updateSimPatch(this.value)">
                <option value="8" ${v.tsSimPatchSize==8?"selected":""}>P = 8 steps</option>
                <option value="16" ${v.tsSimPatchSize==16?"selected":""}>P = 16 steps (Default)</option>
                <option value="32" ${v.tsSimPatchSize==32?"selected":""}>P = 32 steps</option>
                <option value="64" ${v.tsSimPatchSize==64?"selected":""}>P = 64 steps</option>
              </select>
            </div>

            <div class="control-group">
              <label>Forecast Horizon (H):</label>
              <select id="ts-horizon-select" class="ts-select" onchange="window.updateSimHorizon(this.value)">
                <option value="48">H = 48 steps</option>
                <option value="96" selected>H = 96 steps</option>
                <option value="192">H = 192 steps</option>
                <option value="336">H = 336 steps</option>
              </select>
            </div>

            <div class="control-group-actions">
              <button class="btn-sim-action" onclick="window.toggleSimPlay()">
                ${v.tsSimIsPlaying?"⏸ Pause Stream":"▶ Play Stream"}
              </button>
              <button class="btn-sim-outline" onclick="window.resetSimCanvas()">↺ Reset Wave</button>
            </div>
          </div>
        </div>
      </section>

      <!-- High Quality Video & Lecture Section -->
      <section class="container" style="margin-top: 64px;">
        <div class="section-header-flex">
          <div>
            <div class="dash-eyebrow">EXPERT LECTURE & VIDEO DEMONSTRATION</div>
            <h2 class="section-title-text" style="font-size: 28px;">Time Series Foundation Models: Architectural Video Breakdown</h2>
          </div>
          <div style="font-size: 13px; color: var(--accent-red); font-weight: 700;">HD 1080p • 10:15 Mins</div>
        </div>

        <div class="ts-video-container">
          <div class="ts-video-frame-wrapper">
            <iframe 
              src="https://www.youtube-nocookie.com/embed/g2qF_pB9S8E?rel=0&amp;controls=1" 
              title="Time Series Foundation Models Architectural Walkthrough"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              class="ts-video-iframe">
            </iframe>
          </div>

          <div class="ts-video-sidebar">
            <div class="ts-video-sidebar-header">
              <div style="font-weight: 700; font-size: 16px; color: var(--text-primary);">Video Chapters & Key Highlights</div>
              <div style="font-size: 12px; color: var(--text-muted);">Click any chapter marker to jump in topic:</div>
            </div>

            <div class="ts-chapter-list">
              <div class="ts-chapter-item active" onclick="alert('Chapter 1: Point-wise attention failure in early transformers')">
                <span class="ts-chap-time">00:00</span>
                <div>
                  <div class="ts-chap-title">1. Point-wise Attention Flaw in Early Transformers</div>
                  <div class="ts-chap-sub">Why standard NLP ViT attention failed on scalar time points</div>
                </div>
              </div>

              <div class="ts-chapter-item" onclick="alert('Chapter 2: Sub-series patch tokenization & channel independence')">
                <span class="ts-chap-time">02:15</span>
                <div>
                  <div class="ts-chap-title">2. Sub-series Patch Tokenization Breakthrough</div>
                  <div class="ts-chap-sub">Grouping P adjacent temporal steps into latent tokens</div>
                </div>
              </div>

              <div class="ts-chapter-item" onclick="alert('Chapter 3: LOTSA 27 Billion Observation Pre-training')">
                <span class="ts-chap-time">04:40</span>
                <div>
                  <div class="ts-chap-title">3. Scaling Pre-training Datasets (LOTSA Corpus)</div>
                  <div class="ts-chap-sub">Aggregating energy, transport, climate, and finance series</div>
                </div>
              </div>

              <div class="ts-chapter-item" onclick="alert('Chapter 4: Zero-Shot Forecasting on Unseen Energy Grids')">
                <span class="ts-chap-time">07:20</span>
                <div>
                  <div class="ts-chap-title">4. Zero-Shot Generalization & Benchmarks</div>
                  <div class="ts-chap-sub">Comparing TimesFM zero-shot vs fine-tuned PatchTST</div>
                </div>
              </div>

              <div class="ts-chapter-item" onclick="alert('Chapter 5: Mixture-of-Experts & Probabilistic Bounds')">
                <span class="ts-chap-time">09:35</span>
                <div>
                  <div class="ts-chap-title">5. Sparse MoE Routing & Quantile Output</div>
                  <div class="ts-chap-sub">Calibrated confidence intervals for real-world deployment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Latest SOTA Paper Spotlight Section -->
      <section class="container" style="margin-top: 64px;">
        <div class="section-header-flex">
          <div>
            <div class="dash-eyebrow">FEATURED LATEST PUBLICATION</div>
            <h2 class="section-title-text" style="font-size: 28px;">Latest Paper Spotlight</h2>
          </div>
          <span class="ts-tag-pill" style="background: var(--accent-red-light); color: var(--accent-red); font-weight: 700;">NeurIPS 2025 Spotlight</span>
        </div>

        <div class="ts-paper-spotlight-card">
          <div class="ts-paper-left">
            <div class="ts-paper-venue-row">
              <span class="venue-badge">NeurIPS 2025</span>
              <span class="stars-badge">GitHub 4.8k ★</span>
              <span class="weights-badge">HuggingFace Weights Ready</span>
            </div>

            <h2 class="ts-paper-title">TimesFM: High-Capacity Time Series Foundation Models for Universal Zero-Shot Forecasting</h2>

            <div class="ts-paper-authors">
              <strong>Authors:</strong> Abhimanyu Das, Weihao Kong, Andrew Leach, Shreshth Basu, Rajat Sen, Dipayan Dey (Kairos Research & Google Research)
            </div>

            <p class="ts-paper-abstract">
              <strong>Abstract:</strong> We present TimesFM, a decoder-only foundation model trained on a 100-billion observation temporal corpus spanning energy grids, traffic streams, financial markets, and weather. TimesFM employs dynamic patch tokenization with multi-frequency continuous embeddings, allowing instant zero-shot inference over arbitrary context windows ($L \\le 2048$) and forecasting horizons ($H \\le 512$). Evaluated on GIFT-Eval and Monash benchmarks, TimesFM achieves a 24.6% reduction in Mean Squared Error over fine-tuned supervised baselines without requiring dataset-specific retraining.
            </p>

            <div class="ts-paper-actions">
              <a href="https://arxiv.org" target="_blank" class="btn-paper-red">📄 Read Paper PDF (ArXiv)</a>
              <a href="https://github.com" target="_blank" class="btn-paper-outline">💻 View Code & Weights (GitHub)</a>
              <button class="btn-paper-outline" onclick="alert('Opening Google Colab Demo Notebook...')">⚡ Open Colab Demo</button>
            </div>
          </div>

          <div class="ts-paper-right">
            <div class="ts-paper-metrics-header">Benchmark Accuracy (MSE ↓ Lower is Better)</div>
            
            <div class="ts-metric-table">
              <div class="metric-header-row">
                <span>Dataset</span>
                <span>ARIMA</span>
                <span>DeepAR</span>
                <span>PatchTST</span>
                <span class="highlight-col">TimesFM 2.0</span>
              </div>
              <div class="metric-data-row">
                <span>Electricity (ECL)</span>
                <span>0.284</span>
                <span>0.215</span>
                <span>0.168</span>
                <span class="highlight-cell">0.142 (-15.4%)</span>
              </div>
              <div class="metric-data-row">
                <span>Weather (720h)</span>
                <span>0.312</span>
                <span>0.258</span>
                <span>0.201</span>
                <span class="highlight-cell">0.174 (-13.4%)</span>
              </div>
              <div class="metric-data-row">
                <span>Traffic Speed</span>
                <span>0.521</span>
                <span>0.442</span>
                <span>0.385</span>
                <span class="highlight-cell">0.321 (-16.6%)</span>
              </div>
              <div class="metric-data-row">
                <span>ETTh1 (Energy)</span>
                <span>0.418</span>
                <span>0.395</span>
                <span>0.370</span>
                <span class="highlight-cell">0.334 (-9.7%)</span>
              </div>
              <div class="metric-data-row">
                <span>Exchange Rate</span>
                <span>0.398</span>
                <span>0.354</span>
                <span>0.231</span>
                <span class="highlight-cell">0.185 (-19.9%)</span>
              </div>
            </div>

            <div class="ts-paper-key-takeaway">
              <strong>Key Finding:</strong> Zero-shot foundation model pre-training delivers consistent performance gains across all zero-shot target domains while eliminating time-consuming fine-tuning loops.
            </div>
          </div>
        </div>
      </section>

      <!-- Related Publications & Next Steps -->
      <section class="container" style="margin-top: 64px; padding-bottom: 80px;">
        <div class="ts-next-footer-box">
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 26px; margin-bottom: 8px;">Explore Other Research Pillars</h3>
            <p style="font-size: 14px; color: var(--text-secondary);">Learn how Kairos Research Lab connects time series modeling with world models and embodied robotics.</p>
          </div>
          <div style="display: flex; gap: 16px;">
            <button class="btn-action-outline" onclick="window.navigateTo('/research')">Pillar 02: World Models →</button>
            <button class="btn-action-red" onclick="window.navigateTo('/publications')">All Lab Publications</button>
          </div>
        </div>
      </section>
    </div>
  `}window.setTsPhase=o=>{v.tsActivePhase=o,A(),window.scrollTo({top:450,behavior:"smooth"})};window.updateSimModel=o=>{v.tsSimModel=o,window.tsSimInstance&&window.tsSimInstance.setModel(o)};window.updateSimPatch=o=>{v.tsSimPatchSize=parseInt(o),window.tsSimInstance&&window.tsSimInstance.setPatch(parseInt(o))};window.updateSimHorizon=o=>{v.tsSimHorizon=parseInt(o),window.tsSimInstance&&window.tsSimInstance.setHorizon(parseInt(o))};window.toggleSimPlay=()=>{v.tsSimIsPlaying=!v.tsSimIsPlaying,A()};window.resetSimCanvas=()=>{window.tsSimInstance&&window.tsSimInstance.reset()};function Tt(){const o=document.getElementById("ts-sim-canvas");if(!o)return;const e=o.getContext("2d");let t=0,i=v.tsSimModel||"TimesFM",n=v.tsSimPatchSize||16;const a=200,s=[];for(let r=0;r<a;r++){const h=r*.1,c=Math.sin(h)*40+Math.cos(h*.4)*25+Math.sin(h*2.5)*10+r*.2;s.push(c)}window.tsSimInstance={setModel:r=>{i=r},setPatch:r=>{n=r},setHorizon:r=>{},reset:()=>{t=0}};function l(){e.clearRect(0,0,o.width,o.height),e.strokeStyle="rgba(255, 255, 255, 0.05)",e.lineWidth=1;for(let p=0;p<o.width;p+=40)e.beginPath(),e.moveTo(p,0),e.lineTo(p,o.height),e.stroke();for(let p=0;p<o.height;p+=40)e.beginPath(),e.moveTo(0,p),e.lineTo(o.width,p),e.stroke();const r=60,c=o.width-r-60,u=o.height/2+10,d=c/a,g=Math.floor(a*.7);e.beginPath(),e.strokeStyle="#4A90E2",e.lineWidth=2.5;for(let p=0;p<g;p++){const f=r+p*d,k=u-s[(p+Math.floor(t))%a]*.8;p===0?e.moveTo(f,k):e.lineTo(f,k)}e.stroke(),e.fillStyle="#4A90E2";for(let p=0;p<g;p+=6){const f=r+p*d,k=u-s[(p+Math.floor(t))%a]*.8;e.beginPath(),e.arc(f,k,2.5,0,Math.PI*2),e.fill()}if(i==="TimesFM"||i==="PatchTST"){const p=Math.floor(g/(n/2));for(let f=0;f<p;f++){const k=f*(n/2),S=k+n;if(S>g)break;const x=r+k*d,I=r+S*d;e.fillStyle=f%2===0?"rgba(181, 46, 50, 0.12)":"rgba(74, 144, 226, 0.12)",e.strokeStyle=f%2===0?"rgba(181, 46, 50, 0.4)":"rgba(74, 144, 226, 0.4)",e.lineWidth=1,e.fillRect(x,40,I-x,o.height-120),e.strokeRect(x,40,I-x,o.height-120),e.fillStyle="#FFFFFF",e.font="10px monospace",e.fillText(`P${f+1}`,x+4,55)}e.strokeStyle="rgba(255, 215, 0, 0.4)",e.lineWidth=1.2;for(let f=0;f<p-1;f++){const k=r+(f*(n/2)+n/2)*d,S=r+((f+1)*(n/2)+n/2)*d,x=(k+S)/2,I=70-f%3*12;e.beginPath(),e.moveTo(k,80),e.quadraticCurveTo(x,I,S,80),e.stroke()}}const T=r+g*d;e.setLineDash([4,4]),e.strokeStyle="rgba(255, 255, 255, 0.6)",e.lineWidth=1.5,e.beginPath(),e.moveTo(T,30),e.lineTo(T,o.height-40),e.stroke(),e.setLineDash([]),e.fillStyle="#B52E32",e.font="bold 11px Inter, sans-serif",e.fillText("FORECAST HORIZON START →",T+8,45),e.beginPath(),e.fillStyle=i==="TimesFM"?"rgba(181, 46, 50, 0.25)":"rgba(245, 166, 35, 0.2)";for(let p=g;p<a;p++){const f=r+p*d,k=s[(p+Math.floor(t))%a]*.8,S=(p-g)*.35,x=u-(k+S);p===g?e.moveTo(f,x):e.lineTo(f,x)}for(let p=a-1;p>=g;p--){const f=r+p*d,k=s[(p+Math.floor(t))%a]*.8,S=(p-g)*.35,x=u-(k-S);e.lineTo(f,x)}e.closePath(),e.fill(),e.beginPath(),e.strokeStyle=i==="TimesFM"?"#B52E32":"#F5A623",e.lineWidth=3;for(let p=g;p<a;p++){const f=r+p*d,k=u-s[(p+Math.floor(t))%a]*.8;p===g?e.moveTo(f,k):e.lineTo(f,k)}e.stroke(),e.font="11px Inter, sans-serif",e.fillStyle="#4A90E2",e.fillText("● Historical Context (512 steps)",60,o.height-15),e.fillStyle="#B52E32",e.fillText("● Zero-Shot Forecast Output (Horizon H)",300,o.height-15),e.fillStyle="rgba(255, 215, 0, 0.9)",e.fillText("⌒ Multi-Head Temporal Self-Attention",580,o.height-15),e.fillStyle="#FFFFFF",e.fillText(`Active Model: ${i}`,850,o.height-15),v.tsSimIsPlaying&&(t+=.4),requestAnimationFrame(l)}l()}window.navigateTo=rt;window.scrollToSection=o=>{const e=document.getElementById(o);e&&e.scrollIntoView({behavior:"smooth"})};window.openDocsModal=(o="WEBSITE_DESIGN_SPEC")=>{v.isDocsOpen=!0,v.activeDocTab=o,A()};window.closeDocsModal=()=>{v.isDocsOpen=!1,A()};window.switchDocTab=o=>{v.activeDocTab=o,A()};at();
