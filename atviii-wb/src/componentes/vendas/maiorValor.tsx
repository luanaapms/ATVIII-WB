import React, { useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';

const MaiorValor: React.FC = () => {
  const [clientes, setClientes] = useState([
    { nome: "Fernanda Costa", valor: 2750.50 },
    { nome: "Roberto Lima", valor: 2430.00 },
    { nome: "Juliana Martins", valor: 2215.75 },
    { nome: "Lucas Almeida", valor: 1980.90 },
    { nome: "Tatiane Rocha", valor: 1820.60 }
  ]);

  return (
    <div className="container">
      <h4 className="center-align purple-text text-darken-2">Maiores Consumidores em Valor</h4>
      <table className="highlight centered responsive-table z-depth-1">
        <thead className="purple lighten-4">
          <tr>
            <th>Nome</th>
            <th>Valor Gasto (R$)</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index} className="hoverable">
              <td>{cliente.nome}</td>
              <td>R$ {cliente.valor.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaiorValor;
