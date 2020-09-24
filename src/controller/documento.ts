import { Response, Request } from "express";
import Crud from "../repository";
import { Tables } from "../enum/tables";
import { controleEntradaProdutoEstoque, controleSaidaProdutoEstoque } from "../service/estoque";

const crudRepository = new Crud(Tables.DOCUMENTO)

export async function entradaProduto(req: Request, res: Response) {
    const { nota } = req.body
    
    const instaceProduto = new Crud(Tables.PRODUTO);
    const produto: any = await instaceProduto.findById(nota.produto)
    if(!produto || produto === "unknown") return res.status(404).json({ message: "produto não encontrado" })
    const volumeTotalNota = produto.volume * nota.quantidade
    
    const instaceDeposito = new Crud(Tables.DEPOSITO);
    const deposito: any = await instaceDeposito.findById(nota.deposito)
    if(!deposito || deposito === "unknown") return res.status(404).json({message: "deposito não encontrado"})
    const espacoLivre = deposito.volumeMax - deposito.volumeLivre
    if(volumeTotalNota > espacoLivre) return res.status(404).json({ message: "deposito lotado" })

    const valorUnitario = nota.valor / nota.quantidade

    controleEntradaProdutoEstoque(
        produto.id, 
        deposito.id, 
        nota.quantidade,
        valorUnitario,
        deposito.tipo
    )

    deposito.volumeLivre += volumeTotalNota
    instaceDeposito.update(deposito)

    const novaNota =  await crudRepository.create(nota)
   
    return res.status(200).json(novaNota)
}




export async function saidaProduto(req: Request, res: Response) {
    const pedido = req.body
    const instaceProduto = new Crud(Tables.PRODUTO);
    const produto: any = await instaceProduto.findById(pedido.produto)
    if(!produto || produto === "unknown") return res.status(404).json({message: "produto não encontrado"})
    const volumeTotalPeido = produto.volume * pedido.quantidade
    
    const instaceDeposito = new Crud(Tables.DEPOSITO);
    const deposito: any = await instaceDeposito.findById(pedido.deposito)
    if(!deposito || deposito === "unknown") return res.status(404).json({message: "deposito não encontrado"})

    const result = await controleSaidaProdutoEstoque(produto.id, deposito.id, pedido.quantidade)
    if(!result.value) return res.status(404).json({message: `Não foi possivel gerar a saida desse produto pois no deposito possui apenas ${result.quantidade} unidades.`})

    deposito.volumeLivre -= volumeTotalPeido
    instaceDeposito.update(deposito)

    const valorTotal = result.valor_medio * pedido.quantidade
    const instaceNotaSaida = new Crud(Tables.NOTAS_SAIDA);

    const notaSaida = await instaceNotaSaida.create({
        valor: valorTotal,
        quantidade: pedido.quantidade,
        produto: produto.id,
        deposito: deposito.id
    })
    return res.status(200).json(notaSaida)
}




