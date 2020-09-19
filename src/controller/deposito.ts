import { Response, Request } from "express";
import Crud from "../repository";
import { Tables } from "../enum/tables"

const crudRepository = new Crud(Tables.DEPOSITO)

export async function criar(req: Request, res: Response) {
    const loja = req.body
    const result = await crudRepository.create(loja)
    if(!result) return res.status(404).json({message: "não foi possivel cadastrar a loja no sistema"})
    return res.status(202).json(result)
}

export async function buscar(req: Request, res: Response) {
    const result = await crudRepository.findAll()
    if(!result) return res.status(404).json({message: "não possui lojas"})
    return res.status(202).json(result)
}

export async function buscarPorId(req: Request, res: Response) {
    const { id } = req.params
    const result = await crudRepository.findById(String(id))
    if(!result) return res.status(404).json({message: "loja não encontrada"})
    return res.status(202).json(result)
}

export async function deletar(req: Request, res: Response) {
    const { id } = req.params
    const result = await crudRepository.delete(String(id))
    if(!result) return res.status(404).json({message: "não foi possivel deletar a loja"})
    return res.status(202).json(result)
}