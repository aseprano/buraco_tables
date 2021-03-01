import { RouteDeclarations } from '@darkbyte/herr';
import { TestAction } from "../actions/TestAction";

const routes: RouteDeclarations = {
    'GET /test': TestAction,
};

export { routes };