import React, { useState, useEffect } from "react";
import { api } from "../../services/server";
import VisualizarSecretario from "../visualizar/secretario";
import Excluir from "../excluir/excluir";
import Editar from "../editar/editar";
import editar from "../../assets/editar-icon.svg";
import excluir from "../../assets/excluir-icon.svg";
import "./style.css";

export default function Table({renderFormTable}) {
  const [isVisualizarOpen, setIsVisualizarOpen] = useState(false);
  const [isExcluirOpen, setIsExcluirOpen] = useState(false);
  const [isEditarOpen, setIsEditarOpen] = useState(false);
  const [usuarioClick, setUsuarioClick] = useState({});
  const [clickCheckbox, setClickcheckbox] = useState(false);
  const [dadosSecretario, setDadosSecretario] = useState([]); //utilizar [] por se tratar de uma array para armazenar os itens

  useEffect(() => {
    receberDadosSecretario();
  }, [renderFormTable]); // utilizei para chamar o receberDadosSecretario quando o componente for montado, para os dados serem renderizados quando a tabela for montada

  const receberDadosSecretario = async() => {
    try {
      var receberDados = await api.get("/secretario"); 
      var dados = receberDados.data;
      console.log(dados)
      setDadosSecretario(dados);
    } catch (e) {
      console.log("erro", e)
    }
  }

  const handleVisualizarClick = (originalData) => {
    setUsuarioClick(originalData);
    setIsVisualizarOpen(true);
  };

  const handleCloseVisualizar = () => {
    setIsVisualizarOpen(false);
  };

  const handleExcluirClick = (originalData) => {
    setUsuarioClick(originalData);
    setIsExcluirOpen(true);
  };

  const handleExcluirClose = () => {
    setIsExcluirOpen(false);
  };

  const handleEditarClick = (originalData) => {
    setUsuarioClick(originalData);
    setIsEditarOpen(true);
}

const handleEditarClose = () => {
    setIsEditarOpen(false);
}

  return (
    <>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" className="checkbox-header" id="checkbox-table"/></th>
            <th>Id</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Turno</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dadosSecretario.map((dados, index) => (
            <tr key={index}>
              <td className="checkbox-conteudo"><input type="checkbox" className="checkbox" id="checkbox" /></td>
                <td className="conteudo-table" id="idSecretario" onClick={() => handleVisualizarClick(dados)}>{dados.id}</td>
                <td className="conteudo-table" id="nomeSecretario" onClick={() => handleVisualizarClick(dados)}>{dados.nome}</td>
                <td className="conteudo-table" id="cpfSecretario" onClick={() => handleVisualizarClick(dados)}>{dados.cpf}</td>
                <td className="conteudo-table" id="turnoSecretario" onClick={() => handleVisualizarClick(dados)}>{dados.turno}</td> 
                <td className="icones-acao">
                  <img src={editar} alt="editar" id="icon-acao" onClick={() => handleEditarClick(dados)} />
                  <img src={excluir} alt="excluir" id="icon-acao" onClick={() => handleExcluirClick(dados)}/>
                </td>   
            </tr>
          ))}
        </tbody>
        <caption>{dadosSecretario.length}/100</caption>
      </table>
      {isVisualizarOpen && (<VisualizarSecretario handleCloseVisualizar={handleCloseVisualizar} dadosSecretario={usuarioClick} />)}
      {isExcluirOpen && (<Excluir handleExcluirClose={handleExcluirClose} dadosSecretario={usuarioClick}  />)}
      {isEditarOpen && (<Editar handleEditarClose={handleEditarClose} dadosSecretario={usuarioClick} />)}
    </>
  );
}
