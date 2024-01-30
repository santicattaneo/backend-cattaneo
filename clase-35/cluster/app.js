import cluster from 'cluster';
import { cpus } from 'os';

console.log(cluster.isPrimary);

const numeroNucleos = cpus().length;

if (cluster.isPrimary) {
    //responsabilidad -> crear un proceso worker
    console.log('soy el proceso primario y mi trabajo es generar workers');
    for(let i=0; i<numeroNucleos; i++) {
        cluster.fork();
    };
    //levantar nuevos workers si fallan
    cluster.on('exit', (worker, code, signal) => {
        console.log(`el trabajado con pid ${worker.process.pid} murio`);
        cluster.fork();
    });
} else {
    console.log('soy un proceso forkeado y hago todo el trabajo');
    
    const app = express();
    app.get("/operacionsencilla", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i;
    }
    res.send({ message: "Operación sencilla", result: sum });
    });

    app.get("/operacioncompleja", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 5e8; i++) {
        sum += i;
    }
    res.send({ message: "Operación compleja", result: sum });
    });

    app.listen(3030, () => {
    console.log("Server listening on port 3030");
    });
};