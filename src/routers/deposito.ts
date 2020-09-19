import { Router } from 'express';
import * as ControllerDeposito from '../controller/deposito'

const router = Router();

router.post('/',ControllerDeposito.criar);
router.get('/',ControllerDeposito.buscar);
router.get('/:id',ControllerDeposito.buscarPorId);
router.delete('/:id',ControllerDeposito.deletar);


export default router;