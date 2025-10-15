// Inicialização de produtos
if (!localStorage.getItem("produtos")) {
    const produtos = [
        {nome:"Top Ed Hardy", preco:45, img:"https://edhardy.eu/cdn/shop/products/TrueToMyLoveCroppedVestTopPink_1024x1024.jpg?v=1633029393"},
        {nome:"Pulseira 60's", preco:35, img:"https://www.enjoei.com.br/p/pulseiras-retro-anos-60-103951014"},
        {nome:"Vela Exclusiva", preco:10, img:"https://images.unsplash.com/photo-1601979031896-32f6e8f2c4f3?w=400"},
        {nome:"Calças Von Dutch", preco:67, img:"https://cdn.aboutyou.de/file/1a3a48aa8a0f877e1b5c5bbf7cfa8e38?width=400"}
    ];
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// ----------------------
// Login Cliente
// ----------------------
const formCliente = document.getElementById("loginFormCliente");
if (formCliente) {
    const criarBtn = document.getElementById("criarConta");
    criarBtn.addEventListener("click", () => {
        const nome = document.getElementById("cliente").value;
        const pass = document.getElementById("passCliente").value;
        if (!nome || !pass) { alert("Preencha nome e palavra-passe!"); return; }

        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        if (clientes.find(c => c.nome === nome)) {
            alert("Cliente já existe!");
            return;
        }
        clientes.push({nome, pass});
        localStorage.setItem("clientes", JSON.stringify(clientes));
        alert("Conta criada com sucesso! Agora faça login.");
        formCliente.reset();
    });

    formCliente.addEventListener("submit", e => {
        e.preventDefault();
        const nome = document.getElementById("cliente").value;
        const pass = document.getElementById("passCliente").value;
        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

        const user = clientes.find(c => c.nome === nome && c.pass === pass);
        if (user) {
            localStorage.setItem("clienteLogado", nome);
            alert("Login efetuado com sucesso!");
            window.location.href = "index.html";
        } else {
            alert("Nome ou palavra-passe incorretos!");
        }
    });
}

// ----------------------
// Login Admin
// ----------------------
const formAdmin = document.getElementById("loginFormAdmin");
if (formAdmin) {
    formAdmin.addEventListener("submit", e => {
        e.preventDefault();
        const user = document.getElementById("user").value;
        const pass = document.getElementById("pass").value;
        if (user === "admin" && pass === "1234") {
            localStorage.setItem("logado", "sim");
            window.location.href = "admin.html";
        } else {
            alert("Credenciais inválidas!");
        }
    });
}

// Logout Admin
function logout() {
    localStorage.removeItem("logado");
    window.location.href = "index.html";
}

// ----------------------
// Admin adiciona produto
// ----------------------
const formProduto = document.getElementById("formProduto");
if (formProduto) {
    if (localStorage.getItem("logado") !== "sim") {
        alert("Acesso restrito! Faça login como admin.");
        window.location.href = "admin-login.html";
    }

    formProduto.addEventListener("submit", e => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        const preco = document.getElementById("preco").value;
        const img = document.getElementById("img").value;

        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos.push({nome, preco, img});
        localStorage.setItem("produtos", JSON.stringify(produtos));

        alert("Produto adicionado!");
        formProduto.reset();
    });
}

// ----------------------
// Renderizações catálogo, favoritos e carrinho
// ----------------------
function renderProdutos() {
    const lista = document.getElementById("listaProdutos");
    if (!lista) return;

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    lista.innerHTML = produtos.map((p,i) => `
        <article>
            <img src="${p.img}" alt="${p.nome}">
            <h3>${p.nome}</h3>
            <p>${p.preco} €</p>
            <button onclick="comprar(${i})">Comprar</button>
            <button onclick="adicionarFavorito(${i})">❤️ Favorito</button>
        </article>
    `).join("");
}

function renderFavoritos() {
    const listaFavoritos = document.getElementById("listaFavoritos");
    if (!listaFavoritos) return;

    let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (favs.length === 0) { listaFavoritos.innerHTML = "<p>Não há favoritos ainda.</p>"; return; }

    listaFavoritos.innerHTML = favs.map((p,i) => `
        <article>
            <img src="${p.img}" alt="${p.nome}">
            <h3>${p.nome}</h3>
            <p>${p.preco} €</p>
            <button onclick="removerFavorito(${i})">Remover</button>
        </article>
    `).join("");
}

function adicionarFavorito(index) {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    const p = produtos[index];

    if (!favs.find(x => x.nome === p.nome)) {
        favs.push(p);
        localStorage.setItem("favoritos", JSON.stringify(favs));
        alert(`${p.nome} adicionado aos favoritos!`);
        renderFavoritos();
    } else { alert(`${p.nome} já está nos favoritos.`); }
}

function removerFavorito(index) {
    let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    favs.splice(index,1);
    localStorage.setItem("favoritos", JSON.stringify(favs));
    renderFavoritos();
}

function renderCarrinho() {
    const listaCarrinho = document.getElementById("listaCarrinho");
    if (!listaCarrinho) return;

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    if (carrinho.length === 0) { listaCarrinho.innerHTML = "<p>Carrinho vazio.</p>"; return; }

    listaCarrinho.innerHTML = carrinho.map((p,i) => `
        <article>
            <img src="${p.img}" alt="${p.nome}">
            <h3>${p.nome}</h3>
            <p>${p.preco} €</p>
            <button onclick="removerCarrinho(${i})">Remover</button>
        </article>
    `).join("");
}

function comprar(index) {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const p = produtos[index];
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(p);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${p.nome} adicionado ao carrinho!`);
    renderCarrinho();
}

function removerCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index,1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderCarrinho();
}

document.addEventListener("DOMContentLoaded", () => {
    renderProdutos();
    renderFavoritos();
    renderCarrinho();
});
