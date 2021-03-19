import { RouteDeclarations } from '@darkbyte/herr';
import { ListTablesAction } from '../actions/ListTablesAction';
import { CreateTableAction } from '../actions/CreateTableAction';
import { DeleteTableAction } from '../actions/DeleteTableAction';

const routes: RouteDeclarations = {
    'GET     /tables':     ListTablesAction,
    'POST    /tables':     CreateTableAction,
    'DELETE  /tables/:id': DeleteTableAction,
};

export { routes };