import { Router } from 'express';
import routerLoja from './loja';
import routerFornecedor from './fornecedor';
import routerDeposito from './deposito';
import routerProduto from './produto';
import routerDocumento from './documento'

const router = Router();

router.use("/loja", routerLoja);
router.use("/fornecedor", routerFornecedor);
router.use("/deposito", routerDeposito);
router.use("/produto", routerProduto);
router.use("/documento", routerDocumento);

export default router;