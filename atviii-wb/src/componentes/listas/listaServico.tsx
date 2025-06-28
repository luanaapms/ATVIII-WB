import React, { useState, ChangeEvent } from "react";
import FormularioExcluirServico from "../formularios/excluiServico";
import FormularioAtualizarServico from "../formularios/atualizaServico";

type Servico = {
  nome: string;
  preco: string;
};

type Props = {
  tema?: string;
  servicos: Servico[];
  setServicos: React.Dispatch<React.SetStateAction<Servico[]>>;
};

const ListaServico: React.FC<Props> = ({ tema = "blue", servicos, setServicos }) => {
  const [busca, setBusca] = useState<string>("");
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);
  const [excluindoIndex, setExcluindoIndex] = useState<number | null>(null);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const servicosPorPagina = 5;

  const handleBuscaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPaginaAtual(1);
  };

  const servicosFiltrados = servicos.filter((s) =>
    s.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const atualizarServico = (servicoAtualizado: Servico) => {
    if (editandoIndex === null) return;
    const novosServicos = [...servicos];
    novosServicos[editandoIndex] = servicoAtualizado;
    setServicos(novosServicos);
    setEditandoIndex(null);
  };

  const excluirServico = (nome: string) => {
    setServicos(servicos.filter((s) => s.nome !== nome));
    setExcluindoIndex(null);
  };

  const cancelarEdicao = () => setEditandoIndex(null);
  const cancelarExclusao = () => setExcluindoIndex(null);

  const indexUltimoServico = paginaAtual * servicosPorPagina;
  const indexPrimeiroServico = indexUltimoServico - servicosPorPagina;
  const servicosPaginaAtual = servicosFiltrados.slice(indexPrimeiroServico, indexUltimoServico);
  const totalPaginas = Math.ceil(servicosFiltrados.length / servicosPorPagina);

  const irParaPagina = (num: number) => {
    if (num < 1) num = 1;
    else if (num > totalPaginas) num = totalPaginas;
    setPaginaAtual(num);
  };

  return (
    <div className="container">
      <h4 className="center-align">Lista de Serviços</h4>

      <div className="input-field">
        <input
          type="text"
          placeholder="Buscar por nome"
          value={busca}
          onChange={handleBuscaChange}
        />
      </div>

      {editandoIndex !== null ? (
        <FormularioAtualizarServico
          tema={tema}
          nomeInicial={servicos[editandoIndex].nome}
          precoInicial={servicos[editandoIndex].preco}
          onAtualizar={atualizarServico}
          onCancelar={cancelarEdicao}
        />
      ) : excluindoIndex !== null ? (
        <FormularioExcluirServico
          tema={tema}
          nomeInicial={servicos[excluindoIndex].nome}
          onExcluir={excluirServico}
          onCancelar={cancelarExclusao}
        />
      ) : servicosPaginaAtual.length > 0 ? (
        <>
          <ul className="collection">
            {servicosPaginaAtual.map((servico, index) => (
              <li key={indexPrimeiroServico + index} className="collection-item">
                <strong>Nome do serviço:</strong> {servico.nome}<br />
                <strong>Preço:</strong> {servico.preco}<br />
                <button
                  className="btn green lighten-2"
                  onClick={() => setEditandoIndex(indexPrimeiroServico + index)}
                  style={{ marginRight: 10 }}
                >
                  Atualizar
                </button>
                <button
                  className="btn purple darken-2"
                  onClick={() => setExcluindoIndex(indexPrimeiroServico + index)}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>

          <div className="center-align" style={{ marginTop: 20 }}>
            <button
              className="btn purple lighten-4"
              disabled={paginaAtual === 1}
              onClick={() => irParaPagina(paginaAtual - 1)}
              style={{ marginRight: 10 }}
            >
              Anterior
            </button>

            {[...Array(totalPaginas)].map((_, i) => {
              const numPagina = i + 1;
              return (
                <button
                  key={numPagina}
                  className={`btn ${paginaAtual === numPagina ? 'purple darken-2' : 'purple lighten-4'}`}
                  style={{ marginRight: 5 }}
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
              style={{ marginLeft: 10 }}
            >
              Próxima
            </button>
          </div>
        </>
      ) : (
        <p className="center-align">Nenhum serviço encontrado.</p>
      )}
    </div>
  );
};

export default ListaServico;
