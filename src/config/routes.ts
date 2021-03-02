import { RouteDeclarations } from '@darkbyte/herr';
import { ListTablesAction } from '../actions/ListTablesAction';
import { CreateTableAction } from '../actions/CreateTableAction';

const routes: RouteDeclarations = {
    'GET /tables':  ListTablesAction,
    'POST /tables': CreateTableAction,
};

export { routes };