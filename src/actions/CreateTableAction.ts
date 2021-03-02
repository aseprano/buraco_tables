import { AbstractAction, ApiResponse, Context, ContextBindings, Injectable, LoggedUser, Logger, MicroserviceApiError, MicroserviceApiResponse } from '@darkbyte/herr';
import { Request } from 'express';
import { TablesManagementService } from '../domain/app_services/TablesManagementService';
import { InvalidTableNameException } from '../domain/exceptions/InvalidTableNameException';
import { TableName } from '../domain/value_objects/TableName';

@Injectable()
export class CreateTableAction extends AbstractAction {
    
    constructor(
        logger: Logger,
        context: ContextBindings,
        private readonly tablesManagementService: TablesManagementService
    ) {
        super(logger, context);
    }

    public requiredParameters(): Array<string> {
        return [
            'name',
        ];
    }

    protected isAuthorized(user: LoggedUser): boolean {
        return user.role === 'admin';
    }

    public async serveRequest(request: Request, context: Context): Promise<ApiResponse> {
        try {
            return this.tablesManagementService
                .create(new TableName(request.body.name))
                .then((tableId) => new MicroserviceApiResponse({
                    id: tableId.asNumber()
                }));
        } catch (error) {
            if (error instanceof InvalidTableNameException) {
                throw new MicroserviceApiError(1001, 400, 'Invalid table name');
            } else {
                throw error;
            }
        }
    }

}