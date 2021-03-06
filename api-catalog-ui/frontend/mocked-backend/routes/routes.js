// * Tile info
let containers = require('../assets/containers');
const apicatalog = require('../assets/services/apicatalog');
const testinson = require('../assets/services/testinson');
const cademoapps = require('../assets/services/cademoapps');
const loginSuccess = require('../assets/services/login_success');

const apiCatalog = require('../assets/apidoc/apicatalog.json');
const discoverableClient = require('../assets/apidoc/discoverableclient');
const sampleClient = require('../assets/apidoc/sample');

let allUP = false;

function sleep(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i + 1) {
        if (new Date().getTime() - start > milliseconds) {
            break;
        }
    }
}

const appRouter = app => {
    // NOTE: The root route
    app.get('/', (req, res) => {
        res.status(200).send('Welcome to our Mocked backend!');
    });

    app.post('/api/v1/apicatalog/auth/login', (req, res) => {
        res.status(200).send(loginSuccess);
    });

    app.post('/api/v1/apicatalog/auth/logout', (req, res) => {
        res.status(200).send(loginSuccess);
    });

    app.get('/api/v1/apicatalog/containers', async (req, res) => {
        const data = containers;
        // await setTimeout(() => {res.status(200).send(data);}, 2000); // TODO can we externalise timeouts to dynamically simulate long running processes ?
        res.status(200).send(data);
    });

    /**
     * Toggle containers json
     */
    app.get('/api/v1/apicatalog/containers/some-down', (req, res) => {
        if (allUP) {
            containers = require('../assets/containers.json'); // eslint-disable-line global-require
            res.status(200).send({ message: 'Some tiles are down now' });
        } else {
            containers = require('../assets/containers-all-up.json'); // eslint-disable-line global-require
            res.status(200).send({ message: 'All tiles are up now' });
        }
        allUP = !allUP;
    });

    app.get('/api/v1/apicatalog/containers/:serviceID', (req, res) => {
        const apiCatalog = apicatalog;
        const caDemoApps = cademoapps;
        const Testinson = testinson;
        console.log(`Fetching:${req.params.serviceID}`);
        switch (req.params.serviceID) {
            case 'apicatalog':
                res.status(200).send(apiCatalog);
                break;
            case 'cademoapps':
                res.status(200).send(caDemoApps);
                break;
            case 'testinson':
                res.status(200).send(Testinson);
                break;
            default:
                res.status(400).send({ message: 'invalid serviceID' });
                break;
        }
    });

    app.get('/api/v1/apicatalog/apidoc/:serviceID/:version', (req, res) => {
        switch (req.params.serviceID) {
            case 'apicatalog':
                res.status(200).send(apiCatalog);
                break;
            case 'discoverableclient':
                res.status(200).send(discoverableClient);
                break;
            case 'otherclient':
                res.status(200).send(sampleClient);
                break;
            default:
                res.status(400).send({ message: 'invalid serviceID' });
                break;
        }
    });
};

module.exports = {
    router: appRouter,
};
