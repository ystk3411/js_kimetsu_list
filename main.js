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
    td_category.setAttribute("class","character_data")
    td_name.textContent = character.name
    td_category.textContent = character.category
    
    if (character.category === "鬼殺隊"){
      tr.setAttribute("class","kisatutai")
    } else if (character.category === "柱"){
      tr.setAttribute("class","hashira")
    } else if (character.category === "鬼"){
      tr.setAttribute("class","oni")
    }

    td_img.appendChild(img)
    tr.appendChild(td_name)
    tr.appendChild(td_img)
    tr.appendChild(td_category)
    charaItems.appendChild(tr)
  });
}

// ラジオボタン押下時のメソッド
async function formSwitch(){
  const radioButtonValue = document.querySelector("#radioButton").character.value
  const kisatutai = document.getElementsByClassName('kisatutai')
  const hashira = document.getElementsByClassName('hashira')
  const oni = document.getElementsByClassName('oni')
  const charaItems = document.querySelector("#chara-list");
  const api = "https://ihatov08.github.io/kimetsu_api/api/all.json"
  const url = "https://ihatov08.github.io"
  const response = await fetch(api);
  const characters = await response.json();
  const character_data = characters.filter((value) => {
    return value.category === radioButtonValue
  })

  // 現在の表示内容をリセット
  for (let i = 0; i < kisatutai.length; ) {
    kisatutai[i].remove()
  }

  for (let i = 0; i < hashira.length;) {
    hashira[i].remove()
  }

  for (let i = 0; i < oni.length; i++) {
    oni[i].remove()
  }

  if(radioButtonValue === "all"){
    getdata();
  } else{
    await character_data.forEach(async character => {
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
        },3000)
      }

      td_category.setAttribute("class","character_data")
      td_name.textContent = character.name
      td_category.textContent = character.category
      
      if (character.category === "鬼殺隊"){
        tr.setAttribute("class","kisatutai")
      } else if (character.category === "柱"){
        tr.setAttribute("class","hashira")
      } else if (character.category === "鬼"){
        tr.setAttribute("class","oni")
      }
  
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
    },3000)
  });
}

getdata();
loaddingAction()
window.addEventListener('load', function(){
  console.log(1)
});

