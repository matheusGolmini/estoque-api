import { Router } from 'express';
import * as ControllerLoja from '../controller/produto'

const router = Router();

router.post('/',ControllerLoja.criar);
router.get('/user',ControllerLoja.buscarProdutoPorUsuario);
router.get('/nome',ControllerLoja.buscarProdutoPorNomeDoProduto);
router.get('/quantidade',ControllerLoja.buscarProdutoPelaQuantidade);
router.patch('/',ControllerLoja.atualizarQuantidade);
router.delete('/',ControllerLoja.deletar);



export default router;