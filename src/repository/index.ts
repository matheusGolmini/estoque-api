import { getRepository } from 'typeorm';


export default class Crud {
    private readonly table: string

    constructor(table: string){
        this.table = table
    }

    async create(values: any){
        try {
            const instaceTable = getRepository(this.table)
            const res = await instaceTable.save(values)
            return res
        } catch (error) {
            console.log(`Class Crud ${error}`)
            return false
        }
    }

    async findAll(){
        try {
            const instaceTable = getRepository(this.table)
            const res = await instaceTable.find()
            if(!res.length) return false
            return res
        } catch (error) {
            console.log(`Class Crud ${error}`)
            return false
        }
    }

    async findById(id: string) {
        try {
            const instaceTable = getRepository(this.table)
            const res = await instaceTable.findOne(id)
            if(res === "unknown" || !res) return false
            return res
        } catch (error) {
            console.log(`Class Crud ${error}`)
            return false
        }
    }

    async delete(id: string){
        try {
            const instaceTable = getRepository(this.table)
            const res = await instaceTable.delete(id)
            return res
        } catch (error) {
            console.log(`Class Crud ${error}`)
            return false
        }
    }

    async insert(value: string) {
        try {
            const instaceTable = getRepository(this.table)
            const res = await instaceTable.insert(value)
            return res
        } catch (error) {
            console.log(`Class Crud ${error}`)
            return false
        }
    }

    async update(value: string) {
        try {
            const instaceTable = getRepository(this.table)
            const res = await instaceTable.save(value)
            return res
        } catch (error) {
            console.log(`Class Crud ${error}`)
            return false
        }
    }

}