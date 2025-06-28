import React, { useState, ChangeEvent, FormEvent } from "react";

type Produto = {
  nome: string;
  preco: string;
};

type Props = {
  tema: string;
  onAdicionarProduto: (produto: Produto) => void;
};

const FormularioCadastroProduto: React.FC<Props> = ({ tema, onAdicionarProduto }) => {
  const [nome, setNome] = useState<string>('');
  const [preco, setPreco] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "nome") setNome(value);
    if (name === "preco") setPreco(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!nome || !preco) return;

    const novoProduto = { nome, preco };
    onAdicionarProduto(novoProduto);

    setNome('');
    setPreco('');
    setMensagem('Produto cadastrado com sucesso!');
  };

  const estiloBotao = `btn waves-effect waves-light ${tema}`;

  return (
    <div className="container" style={{ paddingTop: '40px', maxWidth: 600 }}>
      <div className="card">
        <div className="card-content">
          <form className="row" onSubmit={handleSubmit}>
            <h5 className="card-title">Cadastro de Produto</h5>

            <div className="input-field col s12">
              <input
                id="nome"
                name="nome"
                type="text"
                className="validate"
                value={nome}
                onChange={handleChange}
                required
              />
              <label htmlFor="nome" className={nome ? 'active' : ''}>
                Nome do Produto
              </label>
            </div>

            <div className="input-field col s12">
              <input
                id="preco"
                name="preco"
                type="text"
                className="validate"
                value={preco}
                onChange={handleChange}
                required
              />
              <label htmlFor="preco" className={preco ? 'active' : ''}>
                Preço
              </label>
            </div>

            <div className="col s12" style={{ marginTop: 30 }}>
              <button className={estiloBotao} type="submit" name="action">
                Cadastrar
              </button>
            </div>

            {mensagem && (
              <div className="col s12" style={{ marginTop: 20 }}>
                <span className="green-text">{mensagem}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioCadastroProduto;
