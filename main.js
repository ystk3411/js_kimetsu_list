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
function formSwitch(){
  const radioButton = document.getElementsByName("character")
  const kisatutai = document.getElementsByClassName('kisatutai')
  const hashira = document.getElementsByClassName('hashira')
  const oni = document.getElementsByClassName('oni')

  if (radioButton[0].checked){
    // 全キャラクターボタンを押下時に全キャラクターを表示
    for (let i = 0; i < kisatutai.length; i++) {
      kisatutai[i].style.display = ""
    }

    for (let i = 0; i < hashira.length; i++) {
      hashira[i].style.display = ""
    }

    for (let i = 0; i < oni.length; i++) {
      oni[i].style.display = ""
    }
  } else if(radioButton[1].checked){
    // 鬼殺隊ボタンを押下時に鬼殺隊のキャラクターを表示
    for (let i = 0; i < kisatutai.length; i++) {
      kisatutai[i].style.display = ""
    }

    for (let i = 0; i < hashira.length; i++) {
      hashira[i].style.display = "none"
    }

    for (let i = 0; i < oni.length; i++) {
      oni[i].style.display = "none"
    }
  } else if(radioButton[2].checked){
    // 柱ボタンを押下時に柱のキャラクターを表示
    for (let i = 0; i < kisatutai.length; i++) {
      kisatutai[i].style.display = "none"
    }

    for (let i = 0; i < hashira.length; i++) {
      hashira[i].style.display = ""
    }

    for (let i = 0; i < oni.length; i++) {
      oni[i].style.display = "none"
    }
  } else if(radioButton[3].checked){
    // 鬼ボタンを押下時に鬼のキャラクターを表示
    for (let i = 0; i < kisatutai.length; i++) {
      kisatutai[i].style.display = "none"
    }

    for (let i = 0; i < hashira.length; i++) {
      hashira[i].style.display = "none"
    }

    for (let i = 0; i < oni.length; i++) {
      oni[i].style.display = ""
    }
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
window.addEventListener('change', formSwitch());

