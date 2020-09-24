import { Router } from 'express';
import * as ControllerFornecedor from '../controller/documento'

const router = Router();

router.post('/',ControllerFornecedor.entradaProduto);
router.post('/saida',ControllerFornecedor.saidaProduto);


export default router;