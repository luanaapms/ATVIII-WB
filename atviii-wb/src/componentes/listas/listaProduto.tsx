import React, { useState, ChangeEvent } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import FormularioAtualizarProduto from "../formularios/atualizaProduto";
import FormularioExcluirProduto from "../formularios/excluiProduto";

type Produto = {
  nome: string;
  preco: string;
};

type Props = {
  tema?: string;
  produtos: Produto[];
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
};

const ListaProduto: React.FC<Props> = ({ tema, produtos, setProdutos }) => {
  const [busca, setBusca] = useState<string>('');
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [nomeParaExcluir, setNomeParaExcluir] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const produtosPorPagina = 5;

  const handleBuscaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPaginaAtual(1); 
  };

  const atualizarProduto = (produtoAtualizado: Produto) => {
    setProdutos(prev =>
      prev.map(p => (p.nome === produtoAtualizado.nome ? produtoAtualizado : p))
    );
    setProdutoEditando(null);
  };

  const excluirProduto = (nome: string) => {
    setProdutos(prev => prev.filter(p => p.nome !== nome));
    setNomeParaExcluir(null);
  };

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const indexUltimoProduto = paginaAtual * produtosPorPagina;
  const indexPrimeiroProduto = indexUltimoProduto - produtosPorPagina;
  const produtosPaginaAtual = produtosFiltrados.slice(indexPrimeiroProduto, indexUltimoProduto);
  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

  const irParaPagina = (num: number) => {
    if (num < 1) num = 1;
    else if (num > totalPaginas) num = totalPaginas;
    setPaginaAtual(num);
  };

  return (
    <div className="container">
      <h4 className="center-align">Lista de Produtos</h4>

      <div className="input-field">
        <input
          type="text"
          placeholder="Buscar por nome"
          value={busca}
          onChange={handleBuscaChange}
        />
      </div>

      {produtoEditando && (
        <FormularioAtualizarProduto
          tema={tema || ''}
          nomeInicial={produtoEditando.nome}
          precoInicial={produtoEditando.preco}
          onAtualizar={atualizarProduto}
          onCancelar={() => setProdutoEditando(null)}
        />
      )}

      {nomeParaExcluir && (
        <FormularioExcluirProduto
          tema={tema || ''}
          nomeInicial={nomeParaExcluir}
          onExcluir={excluirProduto}
          onCancelar={() => setNomeParaExcluir(null)}
        />
      )}

      {produtosPaginaAtual.length > 0 ? (
        <>
          <ul className="collection">
            {produtosPaginaAtual.map((produto, index) => (
              <li key={indexPrimeiroProduto + index} className="collection-item">
                <strong>Nome do produto:</strong> {produto.nome}<br />
                <strong>Preço:</strong> {produto.preco}<br />
                <button
                  className="btn green lighten-2"
                  onClick={() => setProdutoEditando(produto)}
                >
                  Atualizar
                </button>
                <button
                  className="btn purple darken-2"
                  style={{ marginLeft: '10px' }}
                  onClick={() => setNomeParaExcluir(produto.nome)}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>

          <div className="center-align" style={{ marginTop: '20px' }}>
            <button
              className="btn purple lighten-4"
              disabled={paginaAtual === 1}
              onClick={() => irParaPagina(paginaAtual - 1)}
              style={{ marginRight: '10px' }}
            >
              Anterior
            </button>

            {[...Array(totalPaginas)].map((_, i) => {
              const numPagina = i + 1;
              return (
                <button
                  key={numPagina}
                  className={`btn ${paginaAtual === numPagina ? 'purple darken-2' : 'purple lighten-4'}`}
                  style={{ marginRight: '5px' }}
                  onClick={() => irParaPagina(numPagina)}
                >
                  {numPagina}
                </button>
              );
            })}

            <button
              className="btn purple lighten-4"
              disabled={paginaAtual === totalPaginas}
              onClick={() => irParaPagina(paginaAtual + 1)}
              style={{ marginLeft: '10px' }}
            >
              Próxima
            </button>
          </div>
        </>
      ) : (
        <p className="center-align">Nenhum produto encontrado.</p>
      )}
    </div>
  );
};

export default ListaProduto;
