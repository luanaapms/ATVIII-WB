import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

type Cliente = {
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: string;
  rgs: string[];
  telefones: string[];
};

type Props = {
  tema: string;
  cliente: Cliente;
  onAtualizar: (cliente: Cliente) => void;
  onCancelar: () => void;
};

const FormularioAtualizarCliente: React.FC<Props> = ({ tema, cliente, onAtualizar, onCancelar }) => {
  const [nome, setNome] = useState<string>('');
  const [nomeSocial, setNomeSocial] = useState<string>('');
  const [genero, setGenero] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [rgs, setRgs] = useState<string[]>(['']);
  const [telefones, setTelefones] = useState<string[]>(['']);

  useEffect(() => {
    setNome(cliente.nome);
    setNomeSocial(cliente.nomeSocial);
    setGenero(cliente.genero);
    setCpf(cliente.cpf);
    setRgs(cliente.rgs);
    setTelefones(cliente.telefones);
  }, [cliente]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'nome': setNome(value); break;
      case 'nomeSocial': setNomeSocial(value); break;
      case 'genero': setGenero(value); break;
      default: break;
    }
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

  const adicionarRG = () => setRgs([...rgs, '']);
  const removerRG = (index: number) => setRgs(rgs.filter((_, i) => i !== index));

  const adicionarTelefone = () => setTelefones([...telefones, '']);
  const removerTelefone = (index: number) => setTelefones(telefones.filter((_, i) => i !== index));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onAtualizar({
      nome,
      nomeSocial,
      genero,
      cpf,
      rgs,
      telefones
    });
  };

  const estiloBotao = `btn waves-effect waves-light ${tema}`;

  return (
    <div className="card-panel">
      <form onSubmit={handleSubmit}>
        <h5>Atualizar Cliente</h5>
        <div className="row">
          <div className="input-field col s6">
            <input name="nome" type="text" value={nome} onChange={handleChange} />
            <label className="active">Nome</label>
          </div>
          <div className="input-field col s6">
            <input name="nomeSocial" type="text" value={nomeSocial} onChange={handleChange} />
            <label className="active">Nome Social</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
            <input name="genero" type="text" value={genero} onChange={handleChange} />
            <label className="active">Gênero</label>
          </div>
          <div className="input-field col s6">
            <input name="cpf" type="text" value={cpf} disabled />
            <label className="active">CPF</label>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <label className="active">RGs</label>
            {rgs.map((rg, index) => (
              <div key={index} className="input-field col s6">
                <input
                  type="text"
                  value={rg}
                  onChange={(e) => handleRgChange(index, e.target.value)}
                />
                <button type="button" className="btn red" onClick={() => removerRG(index)}>Remover</button>
              </div>
            ))}
            <button type="button" className="btn green" onClick={adicionarRG}>Adicionar RG</button>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <label className="active">Telefones</label>
            {telefones.map((tel, index) => (
              <div key={index} className="input-field col s6">
                <input
                  type="text"
                  value={tel}
                  onChange={(e) => handleTelefoneChange(index, e.target.value)}
                />
                <button type="button" className="btn red" onClick={() => removerTelefone(index)}>Remover</button>
              </div>
            ))}
            <button type="button" className="btn green" onClick={adicionarTelefone}>Adicionar Telefone</button>
          </div>
        </div>

        <div className="row">
          <div className="col s6">
            <button className={estiloBotao} type="submit">Atualizar</button>
          </div>
          <div className="col s6">
            <button type="button" className="btn grey" onClick={onCancelar}>Cancelar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioAtualizarCliente;
