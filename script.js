// --- Produtos na página principal ---
const lista = document.getElementById("listaProdutos");
if(lista){
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  lista.innerHTML = produtos.map((p,i)=>`
    <article>
      <img src="${p.img}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>${p.preco} €</p>
      <button onclick="comprar(${i})">Comprar</button>
      <button onclick="adicionarFavorito(${i})">❤️ Favorito</button>
    </article>
  `).join("");
}

// --- Comprar ---
function comprar(index){
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const p = produtos[index];
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(p);
  localStorage.setItem("carrinho",JSON.stringify(carrinho));
  alert(`${p.nome} adicionado ao carrinho!`);
}

// --- Favoritos ---
function adicionarFavorito(index){
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
  const p = produtos[index];
  if(!favs.find(x=>x.nome===p.nome)){ favs.push(p); localStorage.setItem("favoritos",JSON.stringify(favs)); alert(`${p.nome} adicionado aos favoritos!`);}
  else{alert(`${p.nome} já está nos favoritos.`);}
}

// --- Admin ---
const form = document.getElementById("formProduto");
if(form){
  if(localStorage.getItem("logado")!=="sim"){ alert("Acesso restrito! Faça login."); window.location.href="admin-login.html"; }
  form.addEventListener("submit", e=>{
    e.preventDefault();
    const nome=document.getElementById("nome").value;
    const preco=document.getElementById("preco").value;
    const img=document.getElementById("img").value;
    const produtos=JSON.parse(localStorage.getItem("produtos"))||[];
    produtos.push({nome,preco,img});
    localStorage.setItem("produtos",JSON.stringify(produtos));
    alert("Produto adicionado!");
    form.reset();
  });
}

// --- Logout ---
function logout(){ localStorage.removeItem("logado"); window.location.href="index.html"; }

