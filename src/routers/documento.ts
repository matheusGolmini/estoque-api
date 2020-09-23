import { Router } from 'express';
import * as ControllerFornecedor from '../controller/documento'

const router = Router();

router.post('/',ControllerFornecedor.compraProduto);


export default router;