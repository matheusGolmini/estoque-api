import { Router } from 'express';

import routerProduto from './produto';

const router = Router();

router.use("/produto", routerProduto);

export default router;