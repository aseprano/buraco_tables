import { Injectable, RouteHandler } from '@darkbyte/herr';
import { AbstractAction, ApiResponse, Context, ContextBindings, Injectable, LoggedUser, Logger, MicroserviceApiError, MicroserviceApiResponse } from '@darkbyte/herr';
import { Request } from 'express';

@Injectable()
export class TestAction extends AbstractAction {

    public requiredParameters(): Array<string> {
        return [
            // list of required parameters
        ];
    }

    protected isAuthorized(user: LoggedUser): boolean {
        return true; // perform any check
    }

    public async serveRequest(request: Request, context: Context): Promise<ApiResponse> {
        return new MicroserviceApiResponse({
            message: 'Hi there!',
            items: [
                { id: 314, label: 'Pi' },
                { id: 100, label: 'A hundred' },
            ]
        });
    }
    
}