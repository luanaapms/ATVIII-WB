import React, { useState, ChangeEvent, FormEvent } from "react";

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
  onAdicionarCliente: (cliente: Cliente) => void;
};

const FormularioCadastroCliente: React.FC<Props> = ({ tema, onAdicionarCliente }) => {
  const [nome, setNome] = useState<string>('');
  const [nomeSocial, setNomeSocial] = useState<string>('');
  const [genero, setGenero] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [rgs, setRgs] = useState<string[]>(['']);
  const [telefones, setTelefones] = useState<string[]>(['']);
  const [mensagem, setMensagem] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nome") setNome(value);
    else if (name === "nomeSocial") setNomeSocial(value);
    else if (name === "genero") setGenero(value);
    else if (name === "cpf") setCpf(value);
  };

  const handleRgChange = (index: number, value: string) => {
    const novosRgs = [...rgs];
    novosRgs[index] = value;
    setRgs(novosRgs);
  };

  const handleTelefoneChange = (index: number, value: string) => {
    const novosTelefones = [...telefones];
    novosTelefones[index] = value;
    setTelefones(novosTelefones);
  };

  const adicionarRG = () => {
    setRgs([...rgs, '']);
  };

  const removerRG = (index: number) => {
    setRgs(rgs.filter((_, i) => i !== index));
  };

  const adicionarTelefone = () => {
    setTelefones([...telefones, '']);
  };

  const removerTelefone = (index: number) => {
    setTelefones(telefones.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!nome || !genero || !cpf) {
      setMensagem('Por favor, preencha os campos obrigatórios: Nome, Gênero e CPF.');
      return;
    }

    const novoCliente: Cliente = {
      nome,
      nomeSocial,
      genero,
      cpf,
      rgs,
      telefones,
    };

    onAdicionarCliente(novoCliente);

    setNome('');
    setNomeSocial('');
    setGenero('');
    setCpf('');
    setRgs(['']);
    setTelefones(['']);
    setMensagem('Cliente cadastrado com sucesso!');
  };

  const estiloBotao = `btn waves-effect waves-light ${tema || ''}`;

  return (
    <div className="container" style={{ paddingTop: '40px', maxWidth: 700 }}>
      <div className="card">
        <div className="card-content">
          <form className="row" onSubmit={handleSubmit}>
            <h5 className="card-title">Cadastro de Cliente</h5>

            <div className="input-field col s12 m6">
              <input name="nome" type="text" value={nome} onChange={handleChange} required />
              <label className={nome ? "active" : undefined}>Nome</label>
            </div>
            <div className="input-field col s12 m6">
              <input name="nomeSocial" type="text" value={nomeSocial} onChange={handleChange} />
              <label className={nomeSocial ? "active" : undefined}>Nome Social</label>
            </div>

            <div className="input-field col s12 m6">
              <input name="genero" type="text" value={genero} onChange={handleChange} required />
              <label className={genero ? "active" : undefined}>Gênero</label>
            </div>
            <div className="input-field col s12 m6">
              <input name="cpf" type="text" value={cpf} onChange={handleChange} required />
              <label className={cpf ? "active" : undefined}>CPF</label>
            </div>

            <div className="col s12">
              <label>RGs</label>
              {rgs.map((rg, index) => (
                <div key={index} className="row" style={{ marginBottom: 0, alignItems: 'center' }}>
                  <div className="input-field col s10 m11">
                    <input
                      type="text"
                      value={rg}
                      onChange={(e) => handleRgChange(index, e.target.value)}
                    />
                  </div>
                  <div className="input-field col s10 m11" style={{ paddingTop: '10px' }}>
                    <button type="button" className="btn dark purple" onClick={() => removerRG(index)}>Remover</button>
                  </div>
                </div>
              ))}
              <button type="button" className="btn green" onClick={adicionarRG}>Adicionar</button>
            </div>

            <div className="col s12" style={{ marginTop: 20 }}>
              <label>Telefones</label>
              {telefones.map((tel, index) => (
                <div key={index} className="row" style={{ marginBottom: 0, alignItems: 'center' }}>
                  <div className="input-field col s10 m11">
                    <input
                      type="text"
                      value={tel}
                      onChange={(e) => handleTelefoneChange(index, e.target.value)}
                    />
                  </div>
                  <div className="input-field col s10 m11" style={{ paddingTop: '10px' }}>
                    <button type="button" className="btn dark purple" onClick={() => removerTelefone(index)}>Remover</button>
                  </div>
                </div>
              ))}
              <button type="button" className="btn green" onClick={adicionarTelefone}>Adicionar</button>
            </div>

            <div className="col s12" style={{ marginTop: 30 }}>
              <button className={estiloBotao} type="submit">Cadastrar</button>
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
};

export default FormularioCadastroCliente;
