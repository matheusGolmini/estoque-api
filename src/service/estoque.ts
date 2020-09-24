import { getRepository } from "typeorm";
import { Tables } from "../enum/tables";

export async function controleEntradaProdutoEstoque(
produto_id: string, deposito_id: string,
valorDepo: number, quantEntrada: number, valorEntrada:number
): Promise<number> {
    const instaceProdutoEstoque = getRepository(Tables.PRODUTO_ESTOQUE);
   
    const result: any = await instaceProdutoEstoque.findOne({ 
        where: {
            produto: produto_id,
            deposito: deposito_id 
        }
    })
    if(!result || result === "unknown") {
        instaceProdutoEstoque.save({
            produto: produto_id,
            deposito: deposito_id,
            quantidade: quantEntrada
        })
        return valorEntrada
    } else {
        const media = calcValorMediaProduto(result.quantidade, valorDepo, quantEntrada, valorEntrada) 
        result.quantidade += quantEntrada
        instaceProdutoEstoque.save(result)
        return media
    }
}


function calcValorMediaProduto(quantDepo: number, valorDepo: number, quantEntrada: number, valorEntrada:number ): number {
    const valorTotal = (quantDepo * valorDepo) + (quantEntrada * valorEntrada)
    const base = quantDepo + quantEntrada
    const result = valorTotal / base
    return Math.round(result * 100) / 100
}

export async function controleSaidaProdutoEstoque( produto_id: string, deposito_id: string, quantidade: number): Promise<any> {
    const instaceProdutoEstoque = getRepository(Tables.PRODUTO_ESTOQUE);
    
    const result: any = await instaceProdutoEstoque.findOne({ 
        where: {
            produto: produto_id,
            deposito: deposito_id 
        }
    })
    if(!result || result === "unknown") {
        return { value: false, quantidade: 0}
    } 
    if(result.quantidade < quantidade) return { value: false, quantidade: result.quantidade}

    result.quantidade -= quantidade
    instaceProdutoEstoque.save(result)

    return { value: true, quantidade: result.quantidade}
}