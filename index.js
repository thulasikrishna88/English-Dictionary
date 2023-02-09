const inputEl=document.getElementById("input");
const infoEl=document.getElementById("info-text");
const titleEl=document.getElementById("title");
const meaningEl=document.getElementById("meaning");
const audioEl=document.getElementById("audio");
const meaningContainerEl=document.getElementById("meaning-container")

async function fetchAPI(word){
    try {
        infoEl.style.display="block";
        meaningContainerEl.style.display="none";
        infoEl.innerText=`searching for ${word}......`
        const apiURL=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const  result =await fetch(apiURL).then(res=>res.json());
        infoEl.style.display="none";
        meaningContainerEl.style.display="block";
        if(result.title){
            titleEl.innerText=`${word}`;
            meaningEl.innerText="No definition found";
            audioEl.style.display="none";

        }else{
            audioEl.style.display="inline-flex";
            titleEl.innerText=result[0].word;
            meaningEl.innerText=result[0].meanings[0].definitions[0].definition;
            audioEl.src=result[0].phonetics[0].audio;
        }
        
    } catch (error) {
        infoEl.innerText="an error";
        
    }
    

}


inputEl.addEventListener("keyup",(event)=>{
    if(event.target.value && event.key==="Enter"){
        fetchAPI(event.target.value);
    }
})
