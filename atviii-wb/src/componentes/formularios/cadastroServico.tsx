import React, { useState, ChangeEvent, FormEvent } from "react";

type Props = {
  tema: string;
  onAdicionarServico: (servico: { nome: string; preco: string }) => void;
};

const FormularioCadastroServico: React.FC<Props> = ({ tema, onAdicionarServico }) => {
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
    if (!nome.trim() || !preco.trim()) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    onAdicionarServico({ nome: nome.trim(), preco: preco.trim() });
    setNome('');
    setPreco('');
    setMensagem('Serviço cadastrado com sucesso!');
  };

  const estiloBotao = `btn waves-effect waves-light ${tema}`;

  return (
    <div className="container" style={{ paddingTop: '40px', maxWidth: 600 }}>
      <div className="card">
        <div className="card-content">
          <form className="row" onSubmit={handleSubmit}>
            <h5 className="card-title">Cadastro de Serviço</h5>

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
                Nome do Serviço
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
export default FormularioCadastroServico;
