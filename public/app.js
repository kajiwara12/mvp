console.log("here");
fetch("/things").then((response) => {
  return response.json;
});
.then((thing)=>{
    for(let thing of thing){
        const p = document.createElement("p")
        p.innerText
    }
})