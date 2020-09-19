import { Router } from 'express';
import routerLoja from './loja';
import routerFornecedor from './fornecedor';
import routerDeposito from './deposito';
import routerProduto from './produto'

const router = Router();

router.use("/loja", routerLoja);
router.use("/fornecedor", routerFornecedor);
router.use("/deposito", routerDeposito);
router.use("/produto", routerProduto);

export default router;