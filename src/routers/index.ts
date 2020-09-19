import { Router } from 'express';
import routerLoja from './loja';
import routerFornecedor from './fornecedor'

const router = Router();

router.use("/loja",routerLoja);
router.use("/fornecedor", routerFornecedor)

export default router;