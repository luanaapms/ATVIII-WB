import React, { useState } from "react";
import ComprasGenero from "./comprasGenero";
import Geral from "./comprasGeral";
import MaiorQuantidade from "./maiorQuantidade";
import MenorQuantidade from "./menorQuantidade";
import MaiorValor from "./maiorValor";
import ListarPorGenero from "./todosGenero"; 
import 'materialize-css/dist/css/materialize.min.css';

type CardProps = {
  titulo: string;
  descricao: string;
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({ titulo, descricao, onClick }) => (
  <div 
    className="card purple lighten-5 hoverable" 
    style={{ cursor: "pointer", minHeight: 140 }}
    onClick={onClick}
  >
    <div className="card-content purple-text text-darken-3">
      <span className="card-title">{titulo}</span>
      <p>{descricao}</p>
    </div>
  </div>
);

const Consulta: React.FC = () => {
  const [cardSelecionado, setCardSelecionado] = useState("");

  const renderConteudo = () => {
    switch (cardSelecionado) {
      case "maior-quantidade":
        return <MaiorQuantidade />;
      case "geral":
        return <Geral />;
      case "compras-genero":
        return <ComprasGenero />;
      case "menor-quantidade":
        return <MenorQuantidade />;
      case "maior-valor":
        return <MaiorValor />;
      case "listar-por-genero":       
        return <ListarPorGenero />;
      default:
        return (
          <p className="center-align purple-text text-darken-2">
            Selecione um relatório acima para visualizar os dados.
          </p>
        );
    }
  };

  return (
    <div className="container">
      <h4 className="center-align"> Relatórios de Consulta </h4>
      <div className="row" style={{ marginTop: "2rem" }}>
        <div className="col s12 m6" style={{ marginBottom: "1.5rem" }}>
          <Card
            titulo="Maiores consumidores em quantidade"
            descricao="Top 10 clientes que mais compraram (em quantidade)."
            onClick={() => setCardSelecionado("maior-quantidade")}
          />
        </div>
        <div className="col s12 m6" style={{ marginBottom: "1.5rem" }}>
          <Card
            titulo="Mais consumidos no geral"
            descricao="Produtos e serviços mais consumidos no geral."
            onClick={() => setCardSelecionado("geral")}
          />
        </div>
        <div className="col s12 m6" style={{ marginBottom: "1.5rem" }}>
          <Card
            titulo="Mais consumidos por gênero"
            descricao="Produtos e serviços mais consumidos por gênero."
            onClick={() => setCardSelecionado("compras-genero")}
          />
        </div>
        <div className="col s12 m6" style={{ marginBottom: "1.5rem" }}>
          <Card
            titulo="Menores consumidores em quantidade"
            descricao="Top 10 clientes que menos compraram (em quantidade)."
            onClick={() => setCardSelecionado("menor-quantidade")}
          />
        </div>
        <div className="col s12 m6" style={{ marginBottom: "1.5rem" }}>
          <Card
            titulo="Maiores consumidores em valor"
            descricao="Top 5 clientes que mais consumiram (em valor)."
            onClick={() => setCardSelecionado("maior-valor")}
          />
        </div>
        <div className="col s12 m6" style={{ marginBottom: "1.5rem" }}>
          <Card
            titulo="Todos os clientes por gênero"
            descricao="Lista de todos os clientes separados por gênero."
            onClick={() => setCardSelecionado("listar-por-genero")}
          />
        </div>
      </div>

      <div className="section">
        <div className="card-panel grey lighten-4 z-depth-1">
          {renderConteudo()}
        </div>
      </div>
    </div>
  );
};

export default Consulta;
