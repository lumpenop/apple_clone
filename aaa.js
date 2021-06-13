// let a ='ABCDZ'.split('')


// // console.log(a)
// // a.forEach(v=>{
// //     console.log(v.charCodeAt())

// // })

// // 0~9  48~57 ok
// // A~Z  65~90
// // a~z  97~122
// // 모든 기호 33~47, 58~64, 91~96, 123~126 

// let b = '`~!@#$%^&*()-_=+[{]}\|;:",<.>/?'.split('')
// let c = "'"

// let A = []
// b.forEach(v=>{
//     vv = v.charCodeAt()
//     A.push(vv)
// })

// A.push("'".charCodeAt())
// console.log(A.sort((a,b)=>{
//     return a-b
// }))

c = 'b'


console.log(c.charCodeAt(0) - 'a'.charCodeAt(0) >= 0)
console.log(-c.charCodeAt(0) + 'z'.charCodeAt(0) >= 0)
console.log()


// console.log(String.fromCharCode(92))

// let AB=0
// let cc ='asdf'.split('');
// let CC =[];
// cc.forEach(v=>{
//     if (v=='a') {CC[0] = 1;}
//     if (v=='s')  {CC[1] = 1;}
// })

// console.log(CC)