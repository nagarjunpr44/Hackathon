let container=document.createElement('div');
container.setAttribute('class','queue');

let searchh=document.createElement('div');
searchh.setAttribute('class','search');
searchh.innerHTML=`
<input type="text" class="form-control" id="inputText" placeholder="Search cats:-:cute, gif">
<svg <button type="button" onclick="search()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>`
container.append(searchh);
let data=[];

async function start() 
{
  try {
    const response = await fetch("https://cataas.com/api/cats")
    data = await response.json();
//  console.log(data);
    displaylist(data);
  } 
  catch (e) 
  {
    console.log("There was a problem fetching the list.")
  }
}

document.body.append(container);
let outer=document.createElement('div');
outer.setAttribute('class','outer')
container.append(outer);

async function displaylist(lists)
{
  for(var cats of lists)
  {
    let catimages=document.createElement('div');
    catimages.setAttribute('class','catimages');
    let link="https://cataas.com/cat/" + cats.id;
    try
    {
        let imagess=await fetch(link);
        catimages.innerHTML=
        `
        <img src="${imagess.url}" alt="cat-images" class="imagec">
        `
      outer.append(catimages)
    }
    catch(e)
    {
      console.log("Error");
    }
  }
}
start()

let pop=document.createElement('div');
pop.setAttribute('class','pop');
pop.innerHTML=`
<div class="top">
    <button onclick="closeSearch()" class="closebtn" ><span class="material-icons-outlined">
    x
    </span></button>
    <div class="out"><div>
</div>`
document.body.append(pop);

let poptopc=document.querySelector('.top');
let popcontainer=document.querySelector('.out');


async function search(){
    poptopc.style.display="block";
    try{
        popcontainer.innerHTML=``;
        let searchvalue=document.querySelector('#inputText').value;
        const searchCat=await fetch("https://cataas.com/api/cats?tags="+searchvalue);
        const searchres=await searchCat.json();
        displaySearch(searchres);
    }
    catch(e){
        console.log("Error");
    }
}
async function displaySearch(array){
    try{
        for(var search of array){
            let resultbox=document.createElement('div');
            resultbox.setAttribute('class','catBox resultBox');
            const searchfetch=await fetch("https://cataas.com/cat/"+search.id);
            resultbox.innerHTML=`
            <img class="catimage" src="${searchfetch.url}">`
            popcontainer.append(resultbox);
        }
       }
    catch(e)
    {
        console.log("Error")
    }
}
function closeSearch(){
    poptopc.style.display="none";
}