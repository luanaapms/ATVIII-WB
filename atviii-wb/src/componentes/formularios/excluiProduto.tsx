import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

type Props = {
    tema: string;
    nomeInicial: string;
    onExcluir: (nome: string) => void;
    onCancelar: () => void;
};

const FormularioExcluirProduto: React.FC<Props> = ({ tema, nomeInicial, onExcluir, onCancelar }) => {
    const [nome, setNome] = useState<string>(nomeInicial);
    const [mensagem, setMensagem] = useState<string>('');

    useEffect(() => {
        setNome(nomeInicial);
    }, [nomeInicial]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNome(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onExcluir(nome);
        setMensagem('Produto excluído com sucesso!');
    };

    const estiloBotao = `btn waves-effect waves-light ${tema}`;

    return (
        <div className="row">
            <form className="col s12" onSubmit={handleSubmit}>
                <h5>Excluir Produto</h5>
                <div className="row">
                    <div className="input-field col s6">
                        <input
                            name="nome"
                            type="text"
                            value={nome}
                            onChange={handleChange}
                        />
                        <label className="active">Nome do Produto</label>
                    </div>
                </div>
                <button className={estiloBotao} type="submit">Excluir
                </button>
                <button type="button" className="btn grey" style={{ marginLeft: 10 }} onClick={onCancelar}>Cancelar</button>
                {mensagem && (
                    <div className="row">
                        <div className="col s12">
                            <span className="green-text">{mensagem}</span>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default FormularioExcluirProduto;
