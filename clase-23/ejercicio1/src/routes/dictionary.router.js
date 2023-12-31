import { Router } from 'express';

const router = Router();

const words = ['test', 'products'];

router.get('/:word([a-zA-Z]+)', (req, res) => {
    res.send(req.params.word)
});

router.put('/:word', (req, res) => {
    res.send(req.word);
});

router.delete('/:word', (req, res) => {
    res.send(req.word);
});

router.param('word', (req, res, next, word) => {
    const searchWord = words.find((wordDB) => wordDB === word);
    if(!searchWord) {
        return res.status(404).send({ status: 'error', message: 'word not found'})
    };
    req.word = searchWord;
    next();
});

router.get('*', (req, res) => {
    res.status(404).send('cannot get specified word');
});

export default router;