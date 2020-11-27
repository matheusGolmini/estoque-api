import { Response, Request } from "express";
import { returnConnection } from '../database/config';
import Produto  from '../database/models/Produto'


export async function criar(req: Request, res: Response) {
    const { nome, quantidade, user_id } = req.body
    if(!nome && quantidade && !user_id) return res.status(404).send({message: "informe o nome e a quantidade"})
    const connection = await returnConnection();
    const produto = new Produto()
    produto.nome = nome;
    produto.quantidade = quantidade;
    produto.user_id = user_id
    const produ: Produto = await connection.mongoManager.save(produto);
    connection.close()
    return res.status(201).json(produ)
}

export async function buscarProdutoPorUsuario(req: Request, res: Response) {
    const { user_id } = req.query;
    if(!user_id) return res.status(404).send({message: "informe o user_id"})
    const connection = await returnConnection();
    const produ: Array<Produto> = await connection.mongoManager.find(Produto, {where: { user_id }});
    connection.close()
    return res.status(202).json(produ)
}

export async function buscarProdutoPorNomeDoProduto(req: Request, res: Response) {
    const { nome } = req.query;
    if(!nome) return res.status(404).send({message: "informe o nome do produto"})
    const connection = await returnConnection();
    const produ: Array<Produto> = await connection.mongoManager.find(Produto, {where: { nome }});
    connection.close()
    return res.status(202).json(produ)
}

export async function buscarProdutoPelaQuantidade(req: Request, res: Response) {
    const { quantidade } = req.query;
    if(!quantidade) return res.status(404).send({message: "informe a quantidade do produto"})
    const connection = await returnConnection();
    const produ: Array<Produto> = await connection.mongoManager.find(Produto, {where: { quantidate: Number(quantidade) }});
    connection.close()
    return res.status(202).json(produ)
}
export async function atualizarQuantidade(req: Request, res: Response) {
    const { nome, quantidade } = req.body
    if(!nome && quantidade) return res.status(404).send({message: "informe o nome e a quantidade"})
    const connection = await returnConnection();
    const produ: Produto | undefined = await connection.mongoManager.findOne(Produto, { where: { nome }});
    if(!produ) return res.status(404).send("Produto não encontrado");
    produ.quantidade = quantidade;
    const newProd: Produto | undefined = await connection.mongoManager.save(produ);
    connection.close()
    return res.status(200).json(newProd)
}

export async function deletar(req: Request, res: Response) {
    const { nome, user_id } = req.body
    if(!nome && !user_id) return res.status(404).send({message: "informe o nome e a quantidade"})
    const connection = await returnConnection();
    const produ: Produto | undefined = await connection.mongoManager.findOne(Produto, {where: { user_id, nome }});
    if(!produ) return res.status(404).send("Produto não encontrado");
    await connection.mongoManager.delete(Produto, produ);

    connection.close()
    return res.status(202).json({message: "usuario deletado"})
}

