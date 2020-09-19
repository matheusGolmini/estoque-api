import { Router } from 'express';
import routerLoja from './loja';
import routerFornecedor from './fornecedor';
import routerDeposito from './deposito';

const router = Router();

router.use("/loja", routerLoja);
router.use("/fornecedor", routerFornecedor);
router.use("/deposito", routerDeposito);

export default router;