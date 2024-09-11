// キャラクターの画像を取得してhtmlの要素を生成するメソッド
async function getdata(){
  const api = "https://ihatov08.github.io/kimetsu_api/api/all.json"
  const url = "https://ihatov08.github.io"
  const response = await fetch(api);
  const characters = await response.json();
  const charaItems = document.querySelector("#chara-list");

  await characters.forEach(async character => {
    const tr = document.createElement("tr")
    const td_name = document.createElement("td")
    const td_img = document.createElement("td")
    const td_category = document.createElement("td")
    const img = document.createElement("img")
    const image = await fetch(url+character.image)
    img.setAttribute("src",image.url)
    td_name.textContent = character.name
    td_category.textContent = character.category
    td_img.appendChild(img)
    tr.setAttribute("class","characters")
    tr.appendChild(td_name)
    tr.appendChild(td_img)
    tr.appendChild(td_category)
    charaItems.appendChild(tr)
  });
}

// ラジオボタン押下時のメソッド
async function formSwitch(){
  const radioButtonValue = document.querySelector("#radioButton").character.value
  const tr_characters = document.getElementsByClassName('characters')
  const charaItems = document.querySelector("#chara-list");
  const api = `https://ihatov08.github.io/kimetsu_api/api/${radioButtonValue}.json`
  const url = "https://ihatov08.github.io"
  const response = await fetch(api);
  const characters = await response.json();

  for (let i = 0; i < tr_characters.length;){
    tr_characters[i].remove()
  }

  if(radioButtonValue === "all"){
    getdata();
  } else{
    await characters.forEach(async character => {
      const tr = document.createElement("tr")
      const td_name = document.createElement("td")
      const td_img = document.createElement("td")
      const td_category = document.createElement("td")
      const img = document.createElement("img")
      const image = await fetch(url+character.image)
      img.setAttribute("src",image.url)

      img.onload = () => {
        const loading = document.querySelector(".loading")
        loading.style.display = ""
        setTimeout( function(){
          document.body.style.overflow = "auto"
          loading.style.display = "none"
        },1000)
      }

      tr.setAttribute("class","characters")
      td_name.textContent = character.name
      td_category.textContent = character.category
      td_img.appendChild(img)
      tr.appendChild(td_name)
      tr.appendChild(td_img)
      tr.appendChild(td_category)
      charaItems.appendChild(tr)
    });
  }
}

function loaddingAction(){
  window.addEventListener('load', function(){
    setTimeout( function(){
      const loading = document.querySelector(".loading")
      document.body.style.overflow = "auto"
      loading.style.display = "none"
    },1000)
  });
}

getdata();
loaddingAction()
