import {
    AbstractAction,
    ApiResponse,
    Context,
    ContextBindings,
    Injectable,
    Logger, MicroserviceApiError,
    MicroserviceApiResponse, NotFoundHTTPError
} from '@darkbyte/herr';

import { TablesManagementService } from '../domain/app_services/TablesManagementService';
import { Request } from 'express';
import { TableID } from '../domain/value_objects/TableID';
import { InvalidTableIDException } from '../domain/exceptions/InvalidTableIDException';
import { TableNotFoundException } from '../domain/exceptions/TableNotFoundException';

@Injectable()
export class DeleteTableAction extends AbstractAction {

    constructor(
        logger: Logger,
        context: ContextBindings,
        private readonly tablesManagementService: TablesManagementService
    ) {
        super(logger, context);
    }

    private getTableId(request: Request): TableID {
        return new TableID(parseInt(request.params.id as string, 10));
    }

    public async serveRequest(request: Request, context: Context): Promise<ApiResponse> {
        try {
            await this.tablesManagementService
                .delete(this.getTableId(request));
                return new MicroserviceApiResponse(null);
        } catch (error) {
            if (error instanceof InvalidTableIDException) {
                return new MicroserviceApiError(1001, 400, 'Invalid table id');
            } else if (error instanceof TableNotFoundException) {
                return new NotFoundHTTPError('Table not found');
            } else {
                throw error;
            }
        }
    }

}
