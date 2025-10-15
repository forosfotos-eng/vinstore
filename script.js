// --- Carregar produtos da memória ---
const lista = document.getElementById("listaProdutos");

if (lista) {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  lista.innerHTML = produtos.map(p => `
    <article>
      <img src="${p.img}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>${p.preco} €</p>
    </article>
  `).join("");
}

// --- Adicionar produtos (admin) ---
const form = document.getElementById("formProduto");
if (form) {
  if (localStorage.getItem("logado") !== "sim") {
    alert("Acesso restrito! Faça login primeiro.");
    window.location.href = "login.html";
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const img = document.getElementById("img").value;

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.push({ nome, preco, img });
    localStorage.setItem("produtos", JSON.stringify(produtos));

    alert("Produto adicionado!");
    form.reset();
  });
}

// --- Logout ---
function logout() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}
