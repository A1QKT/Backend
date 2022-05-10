import { APIRouter } from './helpers/apiRouter';
import app , { startServer } from './helpers/express';
import {GraphqlServer} from './helpers/graphql/apollo';

startServer();

const apiRouter = new APIRouter(app);
apiRouter.start();

const graphqlServer = new GraphqlServer(app);
graphqlServer.start();