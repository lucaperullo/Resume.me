// CURD 
import { Router } from 'express';
import companySchema from './schema';
import { Request, Response, NextFunction } from 'express';

const companiesRouter = Router();

companiesRouter.get('/', async (req, res, next) => {
    try {
        const companies = await companySchema.find();
        res.send(companies);
    } catch (error) {
        console.log(error);
        next(error);
    }
    }
);

companiesRouter.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const company = await companySchema
            .findById(id)
            .populate('location');
        if (company) {
            res.send(company);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

companiesRouter.post('/', async (req, res, next) => {
    try {
        const newCompany = new companySchema(req.body);
        const { _id } = await newCompany.save();
        res.status(201).send(_id);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
);

companiesRouter.put('/:id', async (req, res, next) => {
    try {
        const company = await companySchema.findByIdAndUpdate(
            req.params.id,
            req
                .body
                .location
        );
        if (company) {
            res.send('Ok');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

companiesRouter.delete('/:id', async (req, res, next) => {
    try {
        const company = await companySchema.findByIdAndDelete(req.params.id);
        if (company) {
            res.send('Deleted');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}
);

