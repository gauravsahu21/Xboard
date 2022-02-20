 async function fetchData(items)
 {  try{
     const response=await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${items}`);
     const result=await response.json();
     return result; }
     catch{
       return null;
     }
 }
 
 async function addItems()
 { for(let i=0;i<magazines.length;i++)
    {
        const  data=await fetchData(magazines[i]);
        console.log(data);
        console.log(data.feed.title);
        var div=document.createElement("div");
        div.classList.add("accordion-item");
        var h2=document.createElement("h2");
        h2.classList.add("accordion-header");
        h2.setAttribute("id",`headingOne${i}`);
        var button=document.createElement("button");
        button.setAttribute("class","accordion-button");
        button.setAttribute("type","button");
        button.setAttribute("data-bs-toggle","collapse");
        button.setAttribute("data-bs-target",`#a${i}`);
        button.setAttribute("aria-expanded","true");
        button.setAttribute("aria-controls","collapseOne");
        button.innerHTML=`${data.feed.title}`;
        h2.append(button);
        div.append(h2);
        var div1=document.createElement("div");
        if(i===0)
        {
          div1.setAttribute("id",`a${i}`);
         div1.classList.add("accordion-collapse","collapse","show");
        }
        else
        {
          div1.setAttribute("id",`a${i}`);
          div1.classList.add("accordion-collapse","collapse");
        }
        div1.setAttribute("aria-labelledby",`headingOne${i}`);
        div1.setAttribute("data-bs-parent","#accordionExample");
        
        div.append(div1);
      
        div1.innerHTML=`<div class="accordion-body">

           <div id="carouselExampleControls${i}" class="carousel slide" data-bs-ride="carousel">
             <div class="carousel-inner" id="carousel-inner${i}">
             </div>
             <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${i}" data-bs-slide="prev">
             <span class="carousel-control-prev-icon" aria-hidden="true"></span>
             <span class="visually-hidden">Previous</span>
             </button>
             <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${i}" data-bs-slide="next">
             <span class="carousel-control-next-icon" aria-hidden="true"></span>
             <span class="visually-hidden">Next</span>
            </button>
           </div>



        </div>
      </div>`
      
      document.getElementById("accordionExample").append(div);
      data.items.forEach((value,index) => {
        var div=document.createElement("div");
        if(index===0)
        {
            div.classList.add("carousel-item","active");
        }
        else{
            div.classList.add("carousel-item");
        }
        const date=new Date(value.pubDate);
        
        div.innerHTML=`
        <a href=${value.link}
        <div class="card">
        <img src=${value.enclosure.link} class="d-block w-100 card-img-top">
       <div class="card-body">
       <h5 class="card-title ">${value.title}</h5>
       <h6>${value.author} • ${date.toLocaleDateString()}</h6>
       <p class="card-text">${value.content}</p>
    
        </div>
        </div></a>`
        document.getElementById(`carousel-inner${i}`).append(div);
        
      });
    }
 }
 addItems();