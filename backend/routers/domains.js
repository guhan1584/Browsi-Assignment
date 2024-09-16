import express from "express";
import {publishers} from '../server.js'


const domainsRouter = express.Router();

domainsRouter.get('/', (req , res) => {
    const publisherInData = req.query.publisherInData?.toLowerCase();

    if(publisherInData){
        const publisherName = publishers.find((p) => p.publisher.toLowerCase() === publisherInData)
        if(publisherName){
            res.status(200).json(publisherName.domains);
        }
        else{
            res.status(404).json({errorMessage: 'Domain not found'})
        }
    }
    else{
        res.status(404).json({errorMessage: 'Publisher does not exist'})
    }
});

export default domainsRouter;
