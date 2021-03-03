import {
    Injectable,
    ApiResponse,
    MicroserviceApiResponse, AbstractQueryAction, Context,
} from '@darkbyte/herr';

import e from 'express';

@Injectable()
export class ListTablesAction extends AbstractQueryAction {

    private static mapRecord(field: any): any {
        return {
            id: field.id,
            name: field.name
        };
    }

    public async serveRequest(request: e.Request, context: Context): Promise<ApiResponse> {
        return this.getConnection()
            .query('SELECT id, name FROM tables ORDER BY name ASC')
            .then((result) => result.fields.map(ListTablesAction.mapRecord))
            .then((tables) => new MicroserviceApiResponse({
                tables
            }));
    }
    
}