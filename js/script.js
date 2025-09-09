const produtos = [
    { id: 1, nome: "Placa-mãe", preco: 389.00, img: "prod1.jpg" },
    { id: 2, nome: "Processador", preco: 700.00, img: "prod2.jpg" },
    { id: 3, nome: "Memoória-ram", preco: 200.00, img: "prod3.jpg" },
    { id: 4, nome: "Fonte", preco: 550.00, img: "prod4.jpg" }
  ];
  
  const carrinho = [];
  
  function adicionarProduto(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    const item = carrinho.find(i => i.id === produtoId);
    if (item) {
      item.qtd += 1;
    } else {
      carrinho.push({ ...produto, qtd: 1 });
    }
    atualizarCarrinho();
  }
  
  function alterarQuantidade(id, btnValue) {
    const item = carrinho.find(i => i.id === id);
    if (!item) return;
  
    switch (btnValue) {
      case 1: item.qtd++; break;
      case -1: item.qtd--; break;
    }
  
    if (item.qtd <= 0) {
      const idx = carrinho.findIndex(i => i.id === id);
      carrinho.splice(idx, 1);
    }
  
    atualizarCarrinho();
  }
  
  function atualizarCarrinho() {
    const carrinhoDiv = document.querySelector('.carrinho');
    carrinhoDiv.innerHTML = '<h2>Produtos e Serviços</h2>';
    let total = 0;
    carrinho.forEach(item => {
      const subtotal = (item.preco * item.qtd).toFixed(2);
      total += parseFloat(subtotal);
      carrinhoDiv.innerHTML += `
        <div class="item-carrinho">
          <img src="${item.img}" alt="${item.nome}" class="img-carrinho">
          <span>${item.nome}</span>
          <span>R$${item.preco.toFixed(2)}</span>
          <div class="contador">
            <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
            <span>${item.qtd}</span>
            <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
          </div>
          <span>Subtotal: R$${subtotal}</span>
        </div>
      `;
    });
    carrinhoDiv.innerHTML += `<hr><div>Total: R$${total.toFixed(2)}</div>`;
  }
  

  // Ao terminar de carregar a página por completo, é adicionado a funcao click com o id do produto a cada botão 
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cartao button').forEach((btn, i) => {
      btn.addEventListener('click', () => adicionarProduto(produtos[i].id));
    });
  });
  