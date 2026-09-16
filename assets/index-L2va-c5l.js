var xe=Object.defineProperty;var ee=a=>{throw TypeError(a)};var ye=(a,t,e)=>t in a?xe(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var v=(a,t,e)=>ye(a,typeof t!="symbol"?t+"":t,e),Te=(a,t,e)=>t.has(a)||ee("Cannot "+e);var te=(a,t,e)=>t.has(a)?ee("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,e);var L=(a,t,e)=>(Te(a,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function q(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let S=q();function ce(a){S=a}const de=/[&<>"']/,Re=new RegExp(de.source,"g"),pe=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,$e=new RegExp(pe.source,"g"),Se={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ne=a=>Se[a];function w(a,t){if(t){if(de.test(a))return a.replace(Re,ne)}else if(pe.test(a))return a.replace($e,ne);return a}const ze=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function Ee(a){return a.replace(ze,(t,e)=>(e=e.toLowerCase(),e==="colon"?":":e.charAt(0)==="#"?e.charAt(1)==="x"?String.fromCharCode(parseInt(e.substring(2),16)):String.fromCharCode(+e.substring(1)):""))}const Ie=/(^|[^\[])\^/g;function f(a,t){let e=typeof a=="string"?a:a.source;t=t||"";const n={replace:(s,r)=>{let i=typeof r=="string"?r:r.source;return i=i.replace(Ie,"$1"),e=e.replace(s,i),n},getRegex:()=>new RegExp(e,t)};return n}function ie(a){try{a=encodeURI(a).replace(/%25/g,"%")}catch{return null}return a}const I={exec:()=>null};function se(a,t){const e=a.replace(/\|/g,(r,i,o)=>{let l=!1,p=i;for(;--p>=0&&o[p]==="\\";)l=!l;return l?"|":" |"}),n=e.split(/ \|/);let s=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(/\\\|/g,"|");return n}function _(a,t,e){const n=a.length;if(n===0)return"";let s=0;for(;s<n&&a.charAt(n-s-1)===t;)s++;return a.slice(0,n-s)}function Pe(a,t){if(a.indexOf(t[1])===-1)return-1;let e=0;for(let n=0;n<a.length;n++)if(a[n]==="\\")n++;else if(a[n]===t[0])e++;else if(a[n]===t[1]&&(e--,e<0))return n;return-1}function re(a,t,e,n){const s=t.href,r=t.title?w(t.title):null,i=a[1].replace(/\\([\[\]])/g,"$1");if(a[0].charAt(0)!=="!"){n.state.inLink=!0;const o={type:"link",raw:e,href:s,title:r,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,o}return{type:"image",raw:e,href:s,title:r,text:w(i)}}function Ae(a,t){const e=a.match(/^(\s+)(?:```)/);if(e===null)return t;const n=e[1];return t.split(`
`).map(s=>{const r=s.match(/^\s+/);if(r===null)return s;const[i]=r;return i.length>=n.length?s.slice(n.length):s}).join(`
`)}class B{constructor(t){v(this,"options");v(this,"rules");v(this,"lexer");this.options=t||S}space(t){const e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){const e=this.rules.block.code.exec(t);if(e){const n=e[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?n:_(n,`
`)}}}fences(t){const e=this.rules.block.fences.exec(t);if(e){const n=e[0],s=Ae(n,e[3]||"");return{type:"code",raw:n,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:s}}}heading(t){const e=this.rules.block.heading.exec(t);if(e){let n=e[2].trim();if(/#$/.test(n)){const s=_(n,"#");(this.options.pedantic||!s||/ $/.test(s))&&(n=s.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(t){const e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:e[0]}}blockquote(t){const e=this.rules.block.blockquote.exec(t);if(e){let n=e[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);n=_(n.replace(/^ *>[ \t]?/gm,""),`
`);const s=this.lexer.state.top;this.lexer.state.top=!0;const r=this.lexer.blockTokens(n);return this.lexer.state.top=s,{type:"blockquote",raw:e[0],tokens:r,text:n}}}list(t){let e=this.rules.block.list.exec(t);if(e){let n=e[1].trim();const s=n.length>1,r={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const i=new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);let o="",l="",p=!1;for(;t;){let c=!1;if(!(e=i.exec(t))||this.rules.block.hr.test(t))break;o=e[0],t=t.substring(o.length);let h=e[2].split(`
`,1)[0].replace(/^\t+/,W=>" ".repeat(3*W.length)),d=t.split(`
`,1)[0],g=0;this.options.pedantic?(g=2,l=h.trimStart()):(g=e[2].search(/[^ ]/),g=g>4?1:g,l=h.slice(g),g+=e[1].length);let y=!1;if(!h&&/^ *$/.test(d)&&(o+=d+`
`,t=t.substring(d.length+1),c=!0),!c){const W=new RegExp(`^ {0,${Math.min(3,g-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),J=new RegExp(`^ {0,${Math.min(3,g-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),Y=new RegExp(`^ {0,${Math.min(3,g-1)}}(?:\`\`\`|~~~)`),X=new RegExp(`^ {0,${Math.min(3,g-1)}}#`);for(;t;){const H=t.split(`
`,1)[0];if(d=H,this.options.pedantic&&(d=d.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),Y.test(d)||X.test(d)||W.test(d)||J.test(t))break;if(d.search(/[^ ]/)>=g||!d.trim())l+=`
`+d.slice(g);else{if(y||h.search(/[^ ]/)>=4||Y.test(h)||X.test(h)||J.test(h))break;l+=`
`+d}!y&&!d.trim()&&(y=!0),o+=H+`
`,t=t.substring(H.length+1),h=d.slice(g)}}r.loose||(p?r.loose=!0:/\n *\n *$/.test(o)&&(p=!0));let b=null,T;this.options.gfm&&(b=/^\[[ xX]\] /.exec(l),b&&(T=b[0]!=="[ ] ",l=l.replace(/^\[[ xX]\] +/,""))),r.items.push({type:"list_item",raw:o,task:!!b,checked:T,loose:!1,text:l,tokens:[]}),r.raw+=o}r.items[r.items.length-1].raw=o.trimEnd(),r.items[r.items.length-1].text=l.trimEnd(),r.raw=r.raw.trimEnd();for(let c=0;c<r.items.length;c++)if(this.lexer.state.top=!1,r.items[c].tokens=this.lexer.blockTokens(r.items[c].text,[]),!r.loose){const h=r.items[c].tokens.filter(g=>g.type==="space"),d=h.length>0&&h.some(g=>/\n.*\n/.test(g.raw));r.loose=d}if(r.loose)for(let c=0;c<r.items.length;c++)r.items[c].loose=!0;return r}}html(t){const e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){const e=this.rules.block.def.exec(t);if(e){const n=e[1].toLowerCase().replace(/\s+/g," "),s=e[2]?e[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:n,raw:e[0],href:s,title:r}}}table(t){const e=this.rules.block.table.exec(t);if(!e||!/[:|]/.test(e[2]))return;const n=se(e[1]),s=e[2].replace(/^\||\| *$/g,"").split("|"),r=e[3]&&e[3].trim()?e[3].replace(/\n[ \t]*$/,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const o of s)/^ *-+: *$/.test(o)?i.align.push("right"):/^ *:-+: *$/.test(o)?i.align.push("center"):/^ *:-+ *$/.test(o)?i.align.push("left"):i.align.push(null);for(const o of n)i.header.push({text:o,tokens:this.lexer.inline(o)});for(const o of r)i.rows.push(se(o,i.header.length).map(l=>({text:l,tokens:this.lexer.inline(l)})));return i}}lheading(t){const e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){const e=this.rules.block.paragraph.exec(t);if(e){const n=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:n,tokens:this.lexer.inline(n)}}}text(t){const e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){const e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:w(e[1])}}tag(t){const e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&/^<a /i.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){const e=this.rules.inline.link.exec(t);if(e){const n=e[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;const i=_(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{const i=Pe(e[2],"()");if(i>-1){const l=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,l).trim(),e[3]=""}}let s=e[2],r="";if(this.options.pedantic){const i=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);i&&(s=i[1],r=i[3])}else r=e[3]?e[3].slice(1,-1):"";return s=s.trim(),/^</.test(s)&&(this.options.pedantic&&!/>$/.test(n)?s=s.slice(1):s=s.slice(1,-1)),re(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer)}}reflink(t,e){let n;if((n=this.rules.inline.reflink.exec(t))||(n=this.rules.inline.nolink.exec(t))){const s=(n[2]||n[1]).replace(/\s+/g," "),r=e[s.toLowerCase()];if(!r){const i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return re(n,r,n[0],this.lexer)}}emStrong(t,e,n=""){let s=this.rules.inline.emStrongLDelim.exec(t);if(!s||s[3]&&n.match(/[\p{L}\p{N}]/u))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const i=[...s[0]].length-1;let o,l,p=i,c=0;const h=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,e=e.slice(-1*t.length+i);(s=h.exec(e))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(l=[...o].length,s[3]||s[4]){p+=l;continue}else if((s[5]||s[6])&&i%3&&!((i+l)%3)){c+=l;continue}if(p-=l,p>0)continue;l=Math.min(l,l+p+c);const d=[...s[0]][0].length,g=t.slice(0,i+s.index+d+l);if(Math.min(i,l)%2){const b=g.slice(1,-1);return{type:"em",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}const y=g.slice(2,-2);return{type:"strong",raw:g,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(t){const e=this.rules.inline.code.exec(t);if(e){let n=e[2].replace(/\n/g," ");const s=/[^ ]/.test(n),r=/^ /.test(n)&&/ $/.test(n);return s&&r&&(n=n.substring(1,n.length-1)),n=w(n,!0),{type:"codespan",raw:e[0],text:n}}}br(t){const e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){const e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){const e=this.rules.inline.autolink.exec(t);if(e){let n,s;return e[2]==="@"?(n=w(e[1]),s="mailto:"+n):(n=w(e[1]),s=n),{type:"link",raw:e[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(t){var n;let e;if(e=this.rules.inline.url.exec(t)){let s,r;if(e[2]==="@")s=w(e[0]),r="mailto:"+s;else{let i;do i=e[0],e[0]=((n=this.rules.inline._backpedal.exec(e[0]))==null?void 0:n[0])??"";while(i!==e[0]);s=w(e[0]),e[1]==="www."?r="http://"+e[0]:r=e[0]}return{type:"link",raw:e[0],text:s,href:r,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(t){const e=this.rules.inline.text.exec(t);if(e){let n;return this.lexer.state.inRawBlock?n=e[0]:n=w(e[0]),{type:"text",raw:e[0],text:n}}}}const Ce=/^(?: *(?:\n|$))+/,Le=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,_e=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,A=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Me=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,he=/(?:[*+-]|\d{1,9}[.)])/,ue=f(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,he).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),j=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Be=/^[^\n]+/,G=/(?!\s*\])(?:\\.|[^\[\]\\])+/,De=f(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",G).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Oe=f(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,he).getRegex(),N="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Q=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ne=f("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",Q).replace("tag",N).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ge=f(j).replace("hr",A).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",N).getRegex(),We=f(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ge).getRegex(),U={blockquote:We,code:Le,def:De,fences:_e,heading:Me,hr:A,html:Ne,lheading:ue,list:Oe,newline:Ce,paragraph:ge,table:I,text:Be},oe=f("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",A).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",N).getRegex(),He={...U,table:oe,paragraph:f(j).replace("hr",A).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",oe).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",N).getRegex()},Ve={...U,html:f(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Q).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:I,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:f(j).replace("hr",A).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ue).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},fe=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ze=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ve=/^( {2,}|\\)\n(?!\s*$)/,qe=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,C="\\p{P}\\p{S}",je=f(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,C).getRegex(),Ge=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,Qe=f(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,C).getRegex(),Ue=f("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,C).getRegex(),Fe=f("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,C).getRegex(),Ke=f(/\\([punct])/,"gu").replace(/punct/g,C).getRegex(),Je=f(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ye=f(Q).replace("(?:-->|$)","-->").getRegex(),Xe=f("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ye).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),D=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,et=f(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",D).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ke=f(/^!?\[(label)\]\[(ref)\]/).replace("label",D).replace("ref",G).getRegex(),we=f(/^!?\[(ref)\](?:\[\])?/).replace("ref",G).getRegex(),tt=f("reflink|nolink(?!\\()","g").replace("reflink",ke).replace("nolink",we).getRegex(),F={_backpedal:I,anyPunctuation:Ke,autolink:Je,blockSkip:Ge,br:ve,code:Ze,del:I,emStrongLDelim:Qe,emStrongRDelimAst:Ue,emStrongRDelimUnd:Fe,escape:fe,link:et,nolink:we,punctuation:je,reflink:ke,reflinkSearch:tt,tag:Xe,text:qe,url:I},nt={...F,link:f(/^!?\[(label)\]\((.*?)\)/).replace("label",D).getRegex(),reflink:f(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",D).getRegex()},V={...F,escape:f(fe).replace("])","~|])").getRegex(),url:f(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},it={...V,br:f(ve).replace("{2,}","*").getRegex(),text:f(V.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},M={normal:U,gfm:He,pedantic:Ve},E={normal:F,gfm:V,breaks:it,pedantic:nt};class m{constructor(t){v(this,"tokens");v(this,"options");v(this,"state");v(this,"tokenizer");v(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||S,this.options.tokenizer=this.options.tokenizer||new B,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const e={block:M.normal,inline:E.normal};this.options.pedantic?(e.block=M.pedantic,e.inline=E.pedantic):this.options.gfm&&(e.block=M.gfm,this.options.breaks?e.inline=E.breaks:e.inline=E.gfm),this.tokenizer.rules=e}static get rules(){return{block:M,inline:E}}static lex(t,e){return new m(e).lex(t)}static lexInline(t,e){return new m(e).inlineTokens(t)}lex(t){t=t.replace(/\r\n|\r/g,`
`),this.blockTokens(t,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){const n=this.inlineQueue[e];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,e=[]){this.options.pedantic?t=t.replace(/\t/g,"    ").replace(/^ +$/gm,""):t=t.replace(/^( *)(\t+)/gm,(o,l,p)=>l+"    ".repeat(p.length));let n,s,r,i;for(;t;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(o=>(n=o.call({lexer:this},t,e))?(t=t.substring(n.raw.length),e.push(n),!0):!1))){if(n=this.tokenizer.space(t)){t=t.substring(n.raw.length),n.raw.length===1&&e.length>0?e[e.length-1].raw+=`
`:e.push(n);continue}if(n=this.tokenizer.code(t)){t=t.substring(n.raw.length),s=e[e.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=s.text):e.push(n);continue}if(n=this.tokenizer.fences(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.heading(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.hr(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.blockquote(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.list(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.html(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.def(t)){t=t.substring(n.raw.length),s=e[e.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+n.raw,s.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=s.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.lheading(t)){t=t.substring(n.raw.length),e.push(n);continue}if(r=t,this.options.extensions&&this.options.extensions.startBlock){let o=1/0;const l=t.slice(1);let p;this.options.extensions.startBlock.forEach(c=>{p=c.call({lexer:this},l),typeof p=="number"&&p>=0&&(o=Math.min(o,p))}),o<1/0&&o>=0&&(r=t.substring(0,o+1))}if(this.state.top&&(n=this.tokenizer.paragraph(r))){s=e[e.length-1],i&&s.type==="paragraph"?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):e.push(n),i=r.length!==t.length,t=t.substring(n.raw.length);continue}if(n=this.tokenizer.text(t)){t=t.substring(n.raw.length),s=e[e.length-1],s&&s.type==="text"?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):e.push(n);continue}if(t){const o="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,e}inline(t,e=[]){return this.inlineQueue.push({src:t,tokens:e}),e}inlineTokens(t,e=[]){let n,s,r,i=t,o,l,p;if(this.tokens.links){const c=Object.keys(this.tokens.links);if(c.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)c.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,o.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;t;)if(l||(p=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(c=>(n=c.call({lexer:this},t,e))?(t=t.substring(n.raw.length),e.push(n),!0):!1))){if(n=this.tokenizer.escape(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.tag(t)){t=t.substring(n.raw.length),s=e[e.length-1],s&&n.type==="text"&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):e.push(n);continue}if(n=this.tokenizer.link(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(n.raw.length),s=e[e.length-1],s&&n.type==="text"&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):e.push(n);continue}if(n=this.tokenizer.emStrong(t,i,p)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.codespan(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.br(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.del(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.autolink(t)){t=t.substring(n.raw.length),e.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(t))){t=t.substring(n.raw.length),e.push(n);continue}if(r=t,this.options.extensions&&this.options.extensions.startInline){let c=1/0;const h=t.slice(1);let d;this.options.extensions.startInline.forEach(g=>{d=g.call({lexer:this},h),typeof d=="number"&&d>=0&&(c=Math.min(c,d))}),c<1/0&&c>=0&&(r=t.substring(0,c+1))}if(n=this.tokenizer.inlineText(r)){t=t.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(p=n.raw.slice(-1)),l=!0,s=e[e.length-1],s&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):e.push(n);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return e}}class O{constructor(t){v(this,"options");this.options=t||S}code(t,e,n){var r;const s=(r=(e||"").match(/^\S*/))==null?void 0:r[0];return t=t.replace(/\n$/,"")+`
`,s?'<pre><code class="language-'+w(s)+'">'+(n?t:w(t,!0))+`</code></pre>
`:"<pre><code>"+(n?t:w(t,!0))+`</code></pre>
`}blockquote(t){return`<blockquote>
${t}</blockquote>
`}html(t,e){return t}heading(t,e,n){return`<h${e}>${t}</h${e}>
`}hr(){return`<hr>
`}list(t,e,n){const s=e?"ol":"ul",r=e&&n!==1?' start="'+n+'"':"";return"<"+s+r+`>
`+t+"</"+s+`>
`}listitem(t,e,n){return`<li>${t}</li>
`}checkbox(t){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(t){return`<p>${t}</p>
`}table(t,e){return e&&(e=`<tbody>${e}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+e+`</table>
`}tablerow(t){return`<tr>
${t}</tr>
`}tablecell(t,e){const n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong(t){return`<strong>${t}</strong>`}em(t){return`<em>${t}</em>`}codespan(t){return`<code>${t}</code>`}br(){return"<br>"}del(t){return`<del>${t}</del>`}link(t,e,n){const s=ie(t);if(s===null)return n;t=s;let r='<a href="'+t+'"';return e&&(r+=' title="'+e+'"'),r+=">"+n+"</a>",r}image(t,e,n){const s=ie(t);if(s===null)return n;t=s;let r=`<img src="${t}" alt="${n}"`;return e&&(r+=` title="${e}"`),r+=">",r}text(t){return t}}class K{strong(t){return t}em(t){return t}codespan(t){return t}del(t){return t}html(t){return t}text(t){return t}link(t,e,n){return""+n}image(t,e,n){return""+n}br(){return""}}class x{constructor(t){v(this,"options");v(this,"renderer");v(this,"textRenderer");this.options=t||S,this.options.renderer=this.options.renderer||new O,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new K}static parse(t,e){return new x(e).parse(t)}static parseInline(t,e){return new x(e).parseInline(t)}parse(t,e=!0){let n="";for(let s=0;s<t.length;s++){const r=t[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const i=r,o=this.options.extensions.renderers[i.type].call({parser:this},i);if(o!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(i.type)){n+=o||"";continue}}switch(r.type){case"space":continue;case"hr":{n+=this.renderer.hr();continue}case"heading":{const i=r;n+=this.renderer.heading(this.parseInline(i.tokens),i.depth,Ee(this.parseInline(i.tokens,this.textRenderer)));continue}case"code":{const i=r;n+=this.renderer.code(i.text,i.lang,!!i.escaped);continue}case"table":{const i=r;let o="",l="";for(let c=0;c<i.header.length;c++)l+=this.renderer.tablecell(this.parseInline(i.header[c].tokens),{header:!0,align:i.align[c]});o+=this.renderer.tablerow(l);let p="";for(let c=0;c<i.rows.length;c++){const h=i.rows[c];l="";for(let d=0;d<h.length;d++)l+=this.renderer.tablecell(this.parseInline(h[d].tokens),{header:!1,align:i.align[d]});p+=this.renderer.tablerow(l)}n+=this.renderer.table(o,p);continue}case"blockquote":{const i=r,o=this.parse(i.tokens);n+=this.renderer.blockquote(o);continue}case"list":{const i=r,o=i.ordered,l=i.start,p=i.loose;let c="";for(let h=0;h<i.items.length;h++){const d=i.items[h],g=d.checked,y=d.task;let b="";if(d.task){const T=this.renderer.checkbox(!!g);p?d.tokens.length>0&&d.tokens[0].type==="paragraph"?(d.tokens[0].text=T+" "+d.tokens[0].text,d.tokens[0].tokens&&d.tokens[0].tokens.length>0&&d.tokens[0].tokens[0].type==="text"&&(d.tokens[0].tokens[0].text=T+" "+d.tokens[0].tokens[0].text)):d.tokens.unshift({type:"text",text:T+" "}):b+=T+" "}b+=this.parse(d.tokens,p),c+=this.renderer.listitem(b,y,!!g)}n+=this.renderer.list(c,o,l);continue}case"html":{const i=r;n+=this.renderer.html(i.text,i.block);continue}case"paragraph":{const i=r;n+=this.renderer.paragraph(this.parseInline(i.tokens));continue}case"text":{let i=r,o=i.tokens?this.parseInline(i.tokens):i.text;for(;s+1<t.length&&t[s+1].type==="text";)i=t[++s],o+=`
`+(i.tokens?this.parseInline(i.tokens):i.text);n+=e?this.renderer.paragraph(o):o;continue}default:{const i='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,e){e=e||this.renderer;let n="";for(let s=0;s<t.length;s++){const r=t[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const i=this.options.extensions.renderers[r.type].call({parser:this},r);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){n+=i||"";continue}}switch(r.type){case"escape":{const i=r;n+=e.text(i.text);break}case"html":{const i=r;n+=e.html(i.text);break}case"link":{const i=r;n+=e.link(i.href,i.title,this.parseInline(i.tokens,e));break}case"image":{const i=r;n+=e.image(i.href,i.title,i.text);break}case"strong":{const i=r;n+=e.strong(this.parseInline(i.tokens,e));break}case"em":{const i=r;n+=e.em(this.parseInline(i.tokens,e));break}case"codespan":{const i=r;n+=e.codespan(i.text);break}case"br":{n+=e.br();break}case"del":{const i=r;n+=e.del(this.parseInline(i.tokens,e));break}case"text":{const i=r;n+=e.text(i.text);break}default:{const i='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}}class P{constructor(t){v(this,"options");this.options=t||S}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}}v(P,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var $,Z,be;class st{constructor(...t){te(this,$);v(this,"defaults",q());v(this,"options",this.setOptions);v(this,"parse",L(this,$,Z).call(this,m.lex,x.parse));v(this,"parseInline",L(this,$,Z).call(this,m.lexInline,x.parseInline));v(this,"Parser",x);v(this,"Renderer",O);v(this,"TextRenderer",K);v(this,"Lexer",m);v(this,"Tokenizer",B);v(this,"Hooks",P);this.use(...t)}walkTokens(t,e){var s,r;let n=[];for(const i of t)switch(n=n.concat(e.call(this,i)),i.type){case"table":{const o=i;for(const l of o.header)n=n.concat(this.walkTokens(l.tokens,e));for(const l of o.rows)for(const p of l)n=n.concat(this.walkTokens(p.tokens,e));break}case"list":{const o=i;n=n.concat(this.walkTokens(o.items,e));break}default:{const o=i;(r=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&r[o.type]?this.defaults.extensions.childTokens[o.type].forEach(l=>{const p=o[l].flat(1/0);n=n.concat(this.walkTokens(p,e))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,e)))}}return n}use(...t){const e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){const i=e.renderers[r.name];i?e.renderers[r.name]=function(...o){let l=r.renderer.apply(this,o);return l===!1&&(l=i.apply(this,o)),l}:e.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const i=e[r.level];i?i.unshift(r.tokenizer):e[r.level]=[r.tokenizer],r.start&&(r.level==="block"?e.startBlock?e.startBlock.push(r.start):e.startBlock=[r.start]:r.level==="inline"&&(e.startInline?e.startInline.push(r.start):e.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(e.childTokens[r.name]=r.childTokens)}),s.extensions=e),n.renderer){const r=this.defaults.renderer||new O(this.defaults);for(const i in n.renderer){if(!(i in r))throw new Error(`renderer '${i}' does not exist`);if(i==="options")continue;const o=i,l=n.renderer[o],p=r[o];r[o]=(...c)=>{let h=l.apply(r,c);return h===!1&&(h=p.apply(r,c)),h||""}}s.renderer=r}if(n.tokenizer){const r=this.defaults.tokenizer||new B(this.defaults);for(const i in n.tokenizer){if(!(i in r))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;const o=i,l=n.tokenizer[o],p=r[o];r[o]=(...c)=>{let h=l.apply(r,c);return h===!1&&(h=p.apply(r,c)),h}}s.tokenizer=r}if(n.hooks){const r=this.defaults.hooks||new P;for(const i in n.hooks){if(!(i in r))throw new Error(`hook '${i}' does not exist`);if(i==="options")continue;const o=i,l=n.hooks[o],p=r[o];P.passThroughHooks.has(i)?r[o]=c=>{if(this.defaults.async)return Promise.resolve(l.call(r,c)).then(d=>p.call(r,d));const h=l.call(r,c);return p.call(r,h)}:r[o]=(...c)=>{let h=l.apply(r,c);return h===!1&&(h=p.apply(r,c)),h}}s.hooks=r}if(n.walkTokens){const r=this.defaults.walkTokens,i=n.walkTokens;s.walkTokens=function(o){let l=[];return l.push(i.call(this,o)),r&&(l=l.concat(r.call(this,o))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return m.lex(t,e??this.defaults)}parser(t,e){return x.parse(t,e??this.defaults)}}$=new WeakSet,Z=function(t,e){return(n,s)=>{const r={...s},i={...this.defaults,...r};this.defaults.async===!0&&r.async===!1&&(i.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),i.async=!0);const o=L(this,$,be).call(this,!!i.silent,!!i.async);if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(i.hooks&&(i.hooks.options=i),i.async)return Promise.resolve(i.hooks?i.hooks.preprocess(n):n).then(l=>t(l,i)).then(l=>i.hooks?i.hooks.processAllTokens(l):l).then(l=>i.walkTokens?Promise.all(this.walkTokens(l,i.walkTokens)).then(()=>l):l).then(l=>e(l,i)).then(l=>i.hooks?i.hooks.postprocess(l):l).catch(o);try{i.hooks&&(n=i.hooks.preprocess(n));let l=t(n,i);i.hooks&&(l=i.hooks.processAllTokens(l)),i.walkTokens&&this.walkTokens(l,i.walkTokens);let p=e(l,i);return i.hooks&&(p=i.hooks.postprocess(p)),p}catch(l){return o(l)}}},be=function(t,e){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,t){const s="<p>An error occurred:</p><pre>"+w(n.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(n);throw n}};const R=new st;function u(a,t){return R.parse(a,t)}u.options=u.setOptions=function(a){return R.setOptions(a),u.defaults=R.defaults,ce(u.defaults),u};u.getDefaults=q;u.defaults=S;u.use=function(...a){return R.use(...a),u.defaults=R.defaults,ce(u.defaults),u};u.walkTokens=function(a,t){return R.walkTokens(a,t)};u.parseInline=R.parseInline;u.Parser=x;u.parser=x.parse;u.Renderer=O;u.TextRenderer=K;u.Lexer=m;u.lexer=m.lex;u.Tokenizer=B;u.Hooks=P;u.parse=u;u.options;u.setOptions;u.use;u.walkTokens;u.parseInline;x.parse;m.lex;u.setOptions({gfm:!0,breaks:!0});let k={currentPath:window.location.pathname||"/",isDocsOpen:!1,activeDocTab:"WEBSITE_DESIGN_SPEC"};const le={WEBSITE_DESIGN_SPEC:`# KAIROS RESEARCH LAB Specification

## Purpose
Build a premium academic research-lab website rather than a conventional article/blog website.

## Positioning
Models. Embodiment. Real-World Impact.

## Primary Research Themes
1. **Time Series Models**: Modeling, learning and forecasting dynamic systems.
2. **World Models**: Learning structured representations of the world.
3. **Vision-Language-Action (VLA)**: Bridging perception, language and action for embodied AI.
4. **Embodied AI**: Robotics, simulation, control, real-world deployment.`,PUBLICATIONS:`# Selected Publications
1. **WorldPriors: Learning Predictive Representations for Robotic Control** (CoRL 2026)
2. **Scaling Time Series Models for Real-World Forecasting** (NeurIPS 2025)
3. **Vision-Language-Action Models for Generalizable Robotics** (ICRA 2025)`},rt=document.getElementById("app");function ot(){window.addEventListener("popstate",lt),z()}function lt(){k.currentPath=window.location.pathname||"/",z()}function at(a){window.history.pushState({},"",a),k.currentPath=a,window.scrollTo({top:0,behavior:"smooth"}),z()}function z(){rt.innerHTML=`
    ${ct()}
    <main>
      ${dt()}
    </main>
    ${vt()}
    ${Tt()}
  `}function ct(){return`
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
          <li class="nav-link ${k.currentPath==="/"?"active":""}" onclick="window.navigateTo('/')">Home</li>
          <li class="nav-link ${k.currentPath.startsWith("/research")?"active":""}" onclick="window.navigateTo('/research')">Research</li>
          <li class="nav-link ${k.currentPath==="/people"?"active":""}" onclick="window.navigateTo('/people')">People</li>
          <li class="nav-link ${k.currentPath==="/publications"?"active":""}" onclick="window.navigateTo('/publications')">Publications</li>
          <li class="nav-link ${k.currentPath==="/projects"?"active":""}" onclick="window.navigateTo('/projects')">Projects</li>
          <li class="nav-link ${k.currentPath==="/news"?"active":""}" onclick="window.navigateTo('/news')">News</li>
          <li class="nav-link ${k.currentPath==="/contact"?"active":""}" onclick="window.navigateTo('/contact')">Contact</li>
        </ul>

        <div class="header-right">
          <button class="btn-icon-search" title="Search" onclick="window.openDocsModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <button class="btn-join-red" onclick="alert('Join Kairos Research Lab: Applications open for PhD, Interns &amp; Engineers.')">Join Us</button>
        </div>
      </div>
    </header>
  `}function dt(){const a=k.currentPath;return a==="/"||a==="/home"?ae():a.startsWith("/research")?kt():a.startsWith("/projects")?wt():a==="/publications"?bt():a==="/people"?mt():a==="/news"?xt():a==="/contact"?yt():ae()}function ae(){return`
    ${pt()}
    ${me()}
    ${ht()}
    ${ut()}
    ${gt()}
    ${ft()}
  `}function pt(){return`
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
  `}function me(){return`
    <section class="container" id="pillars" style="padding: 64px 0;">
      <div class="section-header-flex">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 20px; height: 2px; background: var(--accent-red);"></div>
          <h2 class="section-title-text">Our Research Pillars</h2>
        </div>
        <span class="link-red-arrow" onclick="window.navigateTo('/research')">Explore all research →</span>
      </div>

      <div class="pillars-section-grid">
        <!-- Pillar 01 -->
        <div class="pillar-item-card" onclick="window.navigateTo('/research')">
          <div class="pillar-svg-wrap">
            <span class="pillar-corner-num">01</span>
            <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
              <path d="M10 45 Q 35 10, 60 45 T 110 45 T 160 45 T 210 45" stroke="#B52E32" stroke-width="1.5" opacity="0.8"/>
              <path d="M10 45 Q 35 25, 60 45 T 110 45 T 160 45 T 210 45" stroke="#B52E32" stroke-width="1" opacity="0.5"/>
              <path d="M10 45 Q 35 60, 60 45 T 110 45 T 160 45 T 210 45" stroke="#B52E32" stroke-width="1" opacity="0.3"/>
            </svg>
          </div>
          <div>
            <h3 class="pillar-item-title">Time Series Models</h3>
            <p class="pillar-item-desc">Modeling, learning and forecasting dynamic systems.</p>
          </div>
          <div style="text-align: right; color: var(--accent-red); font-weight: 700;">→</div>
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
  `}function ht(){return`
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
  `}function ut(){return`
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
  `}function gt(){return`
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
  `}function ft(){return`
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
  `}function kt(){return`
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">RESEARCH DIRECTORY</div>
      <h1 class="hero-h1">Research Pillars</h1>
      <p class="hero-p">We study models that learn to understand dynamics, construct internal representations of the world, and translate perception into action.</p>
      ${me()}
    </section>
  `}function wt(){return`
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
  `}function mt(){return`
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
  `}function xt(){return`
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">NEWS</div>
      <h1 class="hero-h1">Lab News</h1>
    </section>
  `}function yt(){return`
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">CONTACT</div>
      <h1 class="hero-h1">Connect with Kairos</h1>
    </section>
  `}function Tt(){const a=le[k.activeDocTab]||le.WEBSITE_DESIGN_SPEC,t=u.parse(a);return`
    <div class="modal-overlay ${k.isDocsOpen?"open":""}" onclick="if(event.target === this) window.closeDocsModal()">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title">
            <span style="font-family: var(--font-serif); font-size: 24px;">Kairos Research Specs Explorer</span>
          </div>
          <button class="btn-close-modal" onclick="window.closeDocsModal()">✕</button>
        </div>

        <div class="modal-tabs">
          <button class="modal-tab-btn ${k.activeDocTab==="WEBSITE_DESIGN_SPEC"?"active":""}" onclick="window.switchDocTab('WEBSITE_DESIGN_SPEC')">WEBSITE_DESIGN_SPEC.md</button>
          <button class="modal-tab-btn ${k.activeDocTab==="PUBLICATIONS"?"active":""}" onclick="window.switchDocTab('PUBLICATIONS')">PUBLICATIONS.md</button>
        </div>

        <div class="modal-body article-body">
          ${t}
        </div>
      </div>
    </div>
  `}window.navigateTo=at;window.scrollToSection=a=>{const t=document.getElementById(a);t&&t.scrollIntoView({behavior:"smooth"})};window.openDocsModal=(a="WEBSITE_DESIGN_SPEC")=>{k.isDocsOpen=!0,k.activeDocTab=a,z()};window.closeDocsModal=()=>{k.isDocsOpen=!1,z()};window.switchDocTab=a=>{k.activeDocTab=a,z()};ot();
