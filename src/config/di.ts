import { FactoriesList } from '@darkbyte/herr/lib/container/impl/ContainerImpl';
import { FakeAuthService } from '@darkbyte/herr';
import { TablesManagementServiceImpl } from '../domain/app_services/impl/TablesManagementServiceImpl';
import { TableFactoryImpl } from '../domain/factories/impl/TableFactoryImpl';
import { TablesRepositoryImpl } from '../domain/repositories/impl/TablesRepositoryImpl';
import { ChairFactoryImpl } from '../domain/factories/impl/ChairFactoryImpl';

const singletons: FactoriesList = {
    AuthService: () => {
        const users = new Map(Object.entries({
            'kdarkbyte': {username: 'darkbyte', role: 'user'},
            'kjohn':     {username: 'john',     role: 'user'},
            'kdaddy':    {username: 'daddy',    role: 'user'},
            'kmummy':    {username: 'mummy',    role: 'user'},
            'kmoo':      {username: 'moo',      role: 'user'},
            'kadmin':    {username: 'admin',    role: 'admin'},
        }));

        return new FakeAuthService(users);
    },
    TableFactory: TableFactoryImpl,
    TablesRepository: TablesRepositoryImpl,
    TablesManagementService: TablesManagementServiceImpl,
    ChairFactory: ChairFactoryImpl,
}

const transients: FactoriesList = {

}

export { singletons, transients }
