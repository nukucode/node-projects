import express from 'express';
import ShortURL from '../models/url.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const allData = await ShortURL.find()
    res.status(200).json({ allData })
})

router.post('/short', async (req, res) => {
    // Grab the fullUrl parameter from the req.body
    const fullUrl = req.body.fullUrl

    // insert and wait for the record to be inserted using the model
    const record = new ShortURL({
        full: fullUrl
    })

    await record.save()

    res.redirect('/')
})

router.get('/:shortid', async (req, res) => {
    // grab the :shortid param
    const shortid = req.params.shortid
    // perform the mongoose call to find the long URL
    const rec = await ShortURL.findOne({ short: shortid })

    // if null, set status to 404 (res.sendStatus(404))
    if (!rec) return res.sendStatus(404)

    // if not null, increment the click count in database
    rec.clicks++
    await rec.save()

    // redirect the user to original link
    res.redirect(rec.full)
})


export default router