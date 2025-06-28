import React, { useState, ChangeEvent } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import FormularioAtualizarCliente from "../formularios/atualizaClientes";
import FormularioExcluirCliente from "../formularios/excluiCliente";

type Cliente = {
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: string;
  rgs: string[];
  telefones: string[];
};

type Props = {
  tema?: string;
  clientes: Cliente[];
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
};

const ListaCliente: React.FC<Props> = ({ tema, clientes, setClientes }) => {
  const [busca, setBusca] = useState<string>('');
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [cpfParaExcluir, setCpfParaExcluir] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const clientesPorPagina = 5;

  const handleBuscaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPaginaAtual(1); 
  };

  const atualizarCliente = (clienteAtualizado: Cliente) => {
    setClientes(prev =>
      prev.map(c => (c.cpf === clienteAtualizado.cpf ? clienteAtualizado : c))
    );
    setClienteEditando(null);
  };

  const excluirCliente = (cpf: string) => {
    setClientes(prev => prev.filter(c => c.cpf !== cpf));
    setCpfParaExcluir(null);
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.cpf.toLowerCase().includes(busca.toLowerCase())
  );

 
  const indexUltimoCliente = paginaAtual * clientesPorPagina;
  const indexPrimeiroCliente = indexUltimoCliente - clientesPorPagina;
  const clientesPaginaAtual = clientesFiltrados.slice(indexPrimeiroCliente, indexUltimoCliente);
  const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);

  const irParaPagina = (num: number) => {
    if (num < 1) num = 1;
    else if (num > totalPaginas) num = totalPaginas;
    setPaginaAtual(num);
  };

  return (
    <div className="container">
      <h4 className="center-align">Lista de Clientes</h4>

      <div className="input-field">
        <input
          type="text"
          placeholder="Buscar por CPF"
          value={busca}
          onChange={handleBuscaChange}
        />
      </div>

      {clienteEditando && (
        <FormularioAtualizarCliente
          tema={tema || ''}
          cliente={clienteEditando}
          onAtualizar={atualizarCliente}
          onCancelar={() => setClienteEditando(null)}
        />
      )}

      {cpfParaExcluir && (
        <FormularioExcluirCliente
          tema={tema || ''}
          cpf={cpfParaExcluir}
          onExcluir={excluirCliente}
          onCancelar={() => setCpfParaExcluir(null)}
        />
      )}

      {clientesPaginaAtual.length > 0 ? (
        <>
          <ul className="collection">
            {clientesPaginaAtual.map((cliente, index) => (
              <li key={indexPrimeiroCliente + index} className="collection-item">
                <strong>Nome:</strong> {cliente.nome}<br />
                <strong>Nome Social:</strong> {cliente.nomeSocial}<br />
                <strong>Gênero:</strong> {cliente.genero}<br />
                <strong>CPF:</strong> {cliente.cpf}<br />
                <strong>RG(s):</strong> {cliente.rgs.join(", ")}<br />
                <strong>Telefone(s):</strong> {cliente.telefones.join(", ")}<br />
                <button
                  className="btn green lighten-2"
                  onClick={() => setClienteEditando(cliente)}
                >
                  Atualizar
                </button>
                <button
                  className="btn purple darken-2" 
                  style={{ marginLeft: "10px" }}
                  onClick={() => setCpfParaExcluir(cliente.cpf)}
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
        <p className="center-align">Nenhum cliente encontrado.</p>
      )}
    </div>
  );
};

export default ListaCliente;
