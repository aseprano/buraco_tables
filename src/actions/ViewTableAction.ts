import {
    AbstractQueryAction,
    ApiResponse,
    Context,
    Injectable,
    MicroserviceApiResponse,
    NotFoundHTTPError
} from '@darkbyte/herr';
import { Request } from 'express';

@Injectable()
export class ViewTableAction extends AbstractQueryAction {

    public async serveRequest(request: Request, context: Context): Promise<ApiResponse> {
        return this.getConnection()
            .query(
                'SELECT * FROM tables WHERE id = :id',
                {id: request.params.id}
            ).then((data) => {
                if (!data.fields.length) {
                    throw new NotFoundHTTPError();
                }

                const row = data.fields[0];

                return new MicroserviceApiResponse(
                    {
                        id: row.field,
                        name: row.name,
                    }
                );
            });
    }

}