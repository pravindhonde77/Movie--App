const url = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const searchApi="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main=document.getElementById("main")
const form=document.getElementById("form")
const search=document.getElementById("search")
const search_res=document.getElementById("search_res")
const total_records=document.getElementById("total_records")

getMovies(url)

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    if (respData.results.length == 0) {
        search_res.innerHTML = "No Results Founds";
        total_records.innerHTML = '';
    }else{
        total_records.innerHTML = "Total Records "+respData.total_results
    }
    
    console.log(respData);

    showMovies(respData.results);
}
function showMovies(movies){
    main.innerHTML=""
    movies.forEach(function(el,index){
        //  console.log(el);
        let div=document.createElement("div") 
        div.setAttribute("class","movie") 

        let image=document.createElement("img")

        if(el.poster_path !=null){
            image.src=IMGPATH+el.poster_path;
        }else{
            image.src= "https://www.peakndt.com/wp-content/uploads/2017/02/No_picture_available.png";
        }
        
         let div1=document.createElement("div") 
        div1.setAttribute("class","movie-info") 

        let h3=document.createElement("h3")
        h3.innerText=el.title;

        let span=document.createElement("span")
        span.setAttribute("class",getClassByRate(el.vote_average))
        span.innerText=el.vote_average
 
       
         div.append(image,div1)
         div1.append(h3,span)
         main.append(div)
  
    })

    function getClassByRate(vote){
        // console.log(vote);
        if(vote>=8){
            return "green";
        }else if(vote>=5){
            return "orange"
        }else {
          return"red"
        }
    }
}

form.addEventListener("submit",function(e) {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchApi + searchTerm);
        search.value = searchTerm;
        search_res.innerHTML = "Search Result for "+searchTerm;
    } else {
        getMovies(url);
    }

});
