import { Router } from 'express';
import * as ControllerLoja from '../controller/produto'

const router = Router();

router.post('/',ControllerLoja.criar);
router.get('/',ControllerLoja.buscarProdutoPorUsuario);
router.patch('/',ControllerLoja.atualizarQuantidade);
router.delete('/',ControllerLoja.deletar);



export default router;