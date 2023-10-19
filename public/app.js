console.log("here");
fetch("/things")
  .then((response) => {
    return response.json();
  })
  .then((things) => {
    console.log(things);
    for (let thing of things) {
      const p = document.createElement("p");
      p.innerText = thing.num;
      document.body.append(p);
    }
  });
