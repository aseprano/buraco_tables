import { RouteDeclarations } from '@darkbyte/herr';
import { ListTablesAction } from '../actions/ListTablesAction';
import { CreateTableAction } from '../actions/CreateTableAction';
import { DeleteTableAction } from '../actions/DeleteTableAction';
import { ViewTableAction } from '../actions/ViewTableAction';

const routes: RouteDeclarations = {
    'GET     /tables':     ListTablesAction,
    'GET     /tables/:id': ViewTableAction,
    'POST    /tables':     CreateTableAction,
    'DELETE  /tables/:id': DeleteTableAction,
};

export { routes };