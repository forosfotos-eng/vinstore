// --- Login Cliente ---
const formCliente = document.getElementById("loginFormCliente");
if(formCliente){
  formCliente.addEventListener("submit", e=>{
    e.preventDefault();
    const cliente = document.getElementById("cliente").value;
    localStorage.setItem("clienteLogado", cliente);
    window.location.href = "index.html";
  });
}

// --- Login Admin ---
const formAdmin = document.getElementById("loginFormAdmin");
if(formAdmin){
  formAdmin.addEventListener("submit", e=>{
    e.preventDefault();
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    if(user==="admin" && pass==="1234"){
      localStorage.setItem("logado","sim");
      window.location.href="admin.html";
    } else { alert("Credenciais inválidas!"); }
  });
}

// --- Admin Add Produto ---
const formProduto = document.getElementById("formProduto");
if(formProduto){
  if(localStorage.getItem("logado")!=="sim"){ alert("Acesso restrito! Faça login."); window.location.href="admin-login.html"; }
  formProduto.addEventListener("submit", e=>{
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const img = document.getElementById("img").value;
    const produtos = JSON.parse(localStorage.getItem("produtos"))||[];
    produtos.push({nome,preco,img});
    localStorage.setItem("produtos", JSON.stringify(produtos));
    alert("Produto adicionado!");
    formProduto.reset();
  });
}

// --- Render Produtos ---
const lista = document.getElementById("listaProdutos");
if(lista){
  const produtos = JSON.parse(localStorage.getItem("produtos"))||[];
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

// --- Favoritos ---
function adicionarFavorito(index){
  const produtos = JSON.parse(localStorage.getItem("produtos"))||[];
  let favs = JSON.parse(localStorage.getItem("favoritos"))||[];
  const p = produtos[index];
  if(!favs.find(x=>x.nome===p.nome)){
    favs.push(p);
    localStorage.setItem("favoritos", JSON.stringify(favs));
    alert(`${p.nome} adicionado aos favoritos!`);
  } else { alert(`${p.nome} já está nos favoritos.`); }
}

const listaFavoritos = document.getElementById("listaFavoritos");
if(listaFavoritos){
  const favs = JSON.parse(localStorage.getItem("favoritos"))||[];
  listaFavoritos.innerHTML = favs.map(p=>`
    <article>
      <img src="${p.img}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>${p.preco} €</p>
    </article>
  `).join("");
}

// --- Carrinho ---
function comprar(index){
  const produtos = JSON.parse(localStorage.getItem("produtos"))||[];
  const p = produtos[index];
  let carrinho = JSON.parse(localStorage.getItem("carrinho"))||[];
  carrinho.push(p);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert(`${p.nome} adicionado ao carrinho!`);
}

const listaCarrinho = document.getElementById("listaCarrinho");
if(listaCarrinho){
  let carrinho = JSON.parse(localStorage.getItem("carrinho"))||[];
  listaCarrinho.innerHTML = carrinho.map((p,i)=>`
    <article>
      <img src="${p.img}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>${p.preco} €</p>
      <button onclick="removerCarrinho(${i})">Remover</button>
    </article>
  `).join("");
}

function removerCarrinho(index){
  let carrinho = JSON.parse(localStorage.getItem("carrinho"))||[];
  carrinho.splice(index,1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  location.reload();
}

// --- Logout Admin ---
function logout(){ localStorage.removeItem("logado"); window.location.href="index.html"; }
