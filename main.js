const { sample } = require("lodash");

const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

let currentDna = mockUpStrand();

//Create a factory function to make pAeuqor
const pAeuqorFactory = (num, arr) => {
  return {
    specimenNum : num,
    dna: arr,
    mutate: function(){
        let randomIndex = Math.floor(Math.random() * this.dna.length);
        let newBase = returnRandBase();
        while (this.dna[randomIndex] === newBase){
          newBase = returnRandBase();
        }
        this.dna[randomIndex] = newBase;
        return this.dna;
    
      },
    compareDNA: function(){
      let compare1 = this.dna;
      let compare2 = currentDna;
      let score = 0;
      for (let i = 0; i < compare1.length; i++){
        for (let j = 0; j < compare2.length; j++){
          if (i === j && compare1[i] === compare2[j]){
            score = score + 1;
          }
        }
      }
      let comparisonScore = Math.floor(100 / 15 * score)
      console.log(`The first and second specimen have ${comparisonScore}% DNA in common.`)
    },
    willLikelySurvive: function(){
      let dnaScore = 0;
      const survivingStrands = [];
      for (let k = 0; k < this.dna.length; k++){
        if (this.dna[k] === 'C' || this.dna[k] === 'G'){
          dnaScore = dnaScore += 1;
        }
      }
      if (Math.floor(100 / 15 * dnaScore > 60)){
        survivingStrands.push(this.dna);
        return true;
      } else {
        return false;
      }
      
    } 
    }
}

const create30Samples = () => {
  let sampleList = [];
  let i = 0;
  for (let i = 0; i <= 30; i++){
    	let sample = pAeuqorFactory(i, mockUpStrand());
      sampleList.push(sample);
      let surviving = sample.willLikelySurvive();
      while (!surviving){
        sample.dna = mockUpStrand();
        surviving = sample.willLikelySurvive();
      }
      
      console.log(`Sample ${sample.specimenNum}: ${sample.dna.join(',')} ${surviving}`);
  }
  return sampleList;
  } 
create30Samples();










