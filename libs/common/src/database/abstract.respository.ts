import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractSchema } from "./abstract.schema";
import { BadRequestException, Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository<TDocument extends AbstractSchema>{
    protected abstract readonly logger : Logger
    constructor(
        private readonly model : Model<TDocument>
    ){}

    async findAll(filterQuery : FilterQuery<TDocument>): Promise<TDocument[]>{
        return await this.model.find(filterQuery)
    }

    async findOne(filterQuery : FilterQuery<TDocument>): Promise<TDocument>{
        const document = await this.model.findOne(filterQuery)
        if(!document) {
            this.logger.log("Document with proven filterQuery is not found...", filterQuery)
            throw new NotFoundException("Document is not found...")
        }
        return document 
    }

    async createOne(
        document : Omit<TDocument, "_id">
    ) : Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id : new Types.ObjectId()
        })

        return await this.model.create(createdDocument)
    }

    async findOneAndUpdate(
        filterQuery : FilterQuery<TDocument>,
        updateQuery : UpdateQuery<TDocument>
    ) : Promise<TDocument>{
        const document = await this.model.findOneAndUpdate(
            filterQuery
        ,
            updateQuery
        ,
        {
            new : true
        })
        if(!document) {
            this.logger.log("Document with proven filterQuery is not found...", filterQuery)
            throw new NotFoundException("Document is not found...")
        }

        return document
    }
    
    async findOneAndDelete(
        filterQuery : FilterQuery<TDocument>
    ) : Promise<{msg: string}>{
        const document =  await this.model.findOneAndRemove(filterQuery)
        if(!document) {
            this.logger.log("Document with proven filterQuery is not found...", filterQuery)
            throw new NotFoundException("Document is not found...")
        }
        return {msg :"Document has been deleted..."}
    }
}