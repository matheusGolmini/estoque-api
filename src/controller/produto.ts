import { Response, Request } from "express";
import Crud from "../repository";
import { Tables } from "../enum/tables"
import { getRepository } from "typeorm";

const crudRepository = new Crud(Tables.PRODUTO)

export async function criar(req: Request, res: Response) {
    const loja = req.body
    const result = await crudRepository.create(loja)
    if(!result) return res.status(404).json({message: "não foi possivel cadastrar o fornecedor no sistema"})
    return res.status(202).json(result)
}

export async function buscar(req: Request, res: Response) {
    const result = await crudRepository.findAll()
    if(!result) return res.status(404).json({message: "não possui fornecedores"})
    return res.status(202).json(result)
}

export async function buscarPorId(req: Request, res: Response) {
    const { id } = req.params
    const result = await crudRepository.findById(String(id))
    if(!result) return res.status(404).json({message: "fornecedor não encontrada"})
    return res.status(202).json(result)
}

export async function deletar(req: Request, res: Response) {
    const { id } = req.params
    const result = await crudRepository.delete(String(id))
    if(!result) return res.status(404).json({message: "não foi possivel deletar o fornecedor"})
    return res.status(202).json(result)
}

export async function getQuantidadeDeprodutoPorDeposito(req: Request, res: Response) {
    const { depositoId } = req.query
    const instaceProdutoEstoque = getRepository(Tables.PRODUTO_ESTOQUE);

    if(!depositoId) return res.status(400).json({message: "não foi passado os parametros corretos"})

    const result = await instaceProdutoEstoque.find({ where: [ {deposito: depositoId } ] })

    return res.status(200).json(result)
}