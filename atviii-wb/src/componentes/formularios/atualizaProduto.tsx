import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

type Props = {
    tema: string;
    nomeInicial: string;
    precoInicial: string;
    onAtualizar: (produtoAtualizado: { nome: string; preco: string }) => void;
    onCancelar: () => void;
};

const FormularioAtualizarProduto: React.FC<Props> = ({ tema, nomeInicial, precoInicial, onAtualizar, onCancelar }) => {
    const [nome, setNome] = useState<string>(nomeInicial);
    const [preco, setPreco] = useState<string>(precoInicial);

    useEffect(() => {
        setNome(nomeInicial);
        setPreco(precoInicial);
    }, [nomeInicial, precoInicial]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'nome') setNome(value);
        else if (name === 'preco') setPreco(value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onAtualizar({ nome, preco });
    };

    const estiloBotao = `btn waves-effect waves-light ${tema}`;

    return (
        <div className="row">
            <form className="col s12" onSubmit={handleSubmit}>
                <h5>Atualizar Produto</h5>
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
                    <div className="input-field col s6">
                        <input
                            name="preco"
                            type="text"
                            value={preco}
                            onChange={handleChange}
                        />
                        <label className="active">Preço</label>
                    </div>
                </div>
                <button className={estiloBotao} type="submit">Atualizar</button>
                <button type="button" className="btn grey" style={{ marginLeft: 10 }} onClick={onCancelar}>Cancelar</button>
            </form>
        </div>
    );
};

export default FormularioAtualizarProduto;
