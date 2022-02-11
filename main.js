const urlAll = 'https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json'
const searchInput = document.querySelector('.search_city')
const results = document.querySelector('.result')

document.addEventListener('DOMContentLoaded', async() => {
  var cityNameInfo = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json');
  
  const request = await cityNameInfo.json();
  // console.log(request);
  // console.log(request[0]);
  // let aa=request[0]
  // console.losg(aa.districts[0]);
  const newD = document.createElement('div');
  newD.innerHTML = "<div >城市 </div>";
  const cityArea = [];
  const areaList = Object.keys(request).map(function(e){
    let city = request[e].name;
    // console.log(request[e].districts);
    // let areas = request[e].districts.forEach(element=>{
      // console.log(city);
    //   return element.name;
    // });
    let areas = request[e].districts.forEach(element=>{
      // console.log(request[e].name);
      // console.log(element.name);
      let ans = request[e].name+element.name;
      // console.log(ans);
      cityArea.push(ans);
      // return request[e].name+element.name
    });
    // console.log(cityArea);

    // for(let j=0; j<request[e].districts.length; j++) {
    //   let cityname = request[e].name;
    //   let areaName = request[e].districts[j].name;
    //   console.log(areaName);
    //   return request[e].name + request[e].districts[j].name
    // };
    // console.log(area);
    return cityArea;
  })
  // console.log(cityArea);

  
  //把所有資料render出來
  request.forEach(element => {
    let e = element.districts
    for(let i=0; i<e.length; i++){
      let show = document.createElement('div');
      show.className = "show_city";
      show.setAttribute("data-index", element.name+ e[i].name+e[i].zipCode+ e[i].latitude+ e[i].longitude);
      show.innerHTML = `
      <div class="css-th">城市: ${element.name} </div>
      <div class="css-th">區域: ${e[i].name} </div>
      <div class="css-th">郵遞區號: ${e[i].zipCode}</div>
      <div class="css-th">lat: ${e[i].latitude}</div>
      <div class="css-th">lon: ${e[i].longitude}</div>
    `
      document.querySelector('.result').appendChild(show);
    }
  });
    
  //搜尋功能
  var searchStyle = document.getElementById('search_style');
  document.getElementById('search').addEventListener('keyup', function() {
    if (!this.value) {
      searchStyle.innerHTML = "";
      return;
    }
  // look ma, no indexOf!
  searchStyle.innerHTML = ".show_city:not([data-index*=\"" + this.value.toLowerCase() + "\"]) { display: none; }";
  // beware of css injections!
  });
  document.getElementById('search').addEventListener('input', function() {
    if (!this.value) {
      searchStyle.innerHTML = "";
      return;
    }
  // look ma, no indexOf!
  searchStyle.innerHTML = ".show_city:not([data-index*=\"" + this.value.toLowerCase() + "\"]) { display: none; }";
  // beware of css injections!
  });
  


  //自動填寫
  //Awesomplete
  new Awesomplete(document.getElementById('search'), {
    list: cityArea
  });
  
  

});
