import { Response, Request } from "express";
import Crud from "../repository";
import { Tables } from "../enum/tables";

const crudRepository = new Crud(Tables.DOCUMENTO)

export async function compraProduto(req: Request, res: Response) {
    const { nota } = req.body
    
    const instaceProduto = new Crud(Tables.PRODUTO);
    const produto: any = await instaceProduto.findById(nota.produto_id)
    if(!produto || produto === "unknown") return res.status(404).json({message: "produto não encontrado"})
    const volumeTotalNota = produto.volume * nota.quantidade
    console.log(volumeTotalNota)
    const instaceDeposito = new Crud(Tables.DEPOSITO);
    const deposito: any = await instaceDeposito.findById(nota.deposito_id)
    if(!deposito || deposito === "unknown") return res.status(404).json({message: "deposito não encontrado"})
    const espacoLivre = deposito.volumeMax - deposito.volumeLivre
    console.log(espacoLivre)
    if(volumeTotalNota > espacoLivre) return res.status(404).json({ message: "deposito lotado" })

    const novaNota =  await crudRepository.create(nota)

    deposito.volumeLivre += volumeTotalNota
    instaceDeposito.update(deposito)

    return res.status(200).json(novaNota)
}


