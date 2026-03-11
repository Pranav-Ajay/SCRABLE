let nbModel = {}

function trainNB(data){

let crimeCounts={}
let cityCounts={}
let genderCounts={}
let weaponCounts={}
let total=data.length

data.forEach(row=>{

let crime=row.crime

crimeCounts[crime]=(crimeCounts[crime]||0)+1

cityCounts[crime]=cityCounts[crime]||{}
cityCounts[crime][row.city]=(cityCounts[crime][row.city]||0)+1

genderCounts[crime]=genderCounts[crime]||{}
genderCounts[crime][row.gender]=(genderCounts[crime][row.gender]||0)+1

weaponCounts[crime]=weaponCounts[crime]||{}
weaponCounts[crime][row.weapon]=(weaponCounts[crime][row.weapon]||0)+1

})

nbModel={
crimeCounts,
cityCounts,
genderCounts,
weaponCounts,
total
}

}

function predictCrime(city,age,gender,weapon){

let bestCrime=null
let bestProb=-Infinity

for(let crime in nbModel.crimeCounts){

let prior=Math.log(nbModel.crimeCounts[crime]/nbModel.total)

let cityProb=Math.log((nbModel.cityCounts[crime][city]||1)/nbModel.crimeCounts[crime])

let genderProb=Math.log((nbModel.genderCounts[crime][gender]||1)/nbModel.crimeCounts[crime])

let weaponProb=Math.log((nbModel.weaponCounts[crime][weapon]||1)/nbModel.crimeCounts[crime])

let score=prior+cityProb+genderProb+weaponProb

if(score>bestProb){
bestProb=score
bestCrime=crime
}

}

return bestCrime

}
