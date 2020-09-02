'use strict'

const Database = use('Database')
const Validator = use("Validator")
const Group = use('App/Models/Group')

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number))) 
        return { error: `param: ${number} is not supported, please use param as a number` }
        
  return {}      
}


class GroupController {

    async index() {
        
        const groups = Group.query()
        
        

        return { status: 200, error: undefined , data: await groups.fetch()
         }
    }

    async show({ request }){
        const { id } = request.params

        const validatedValue = numberTypeParamValidator(id)

        if (validatedValue.error) 
            return { status: 500, error: validatedValue.error, data: undefined }

        const group = await Group.find(id)

        return { status: 200, error: undefined , data: group || {} }
        
    }
    async store ({request}) {
        const { name }  = request.body

        const rules = {name:'required'}

        const validation =await Validator.validate(request.body,rules)

        if(validation.fails())
            return {status:422,error: validation.messages(),data: undefined}


        const group = new Group();
        group.name =name;

        await group.save()
    }

    async update ({request}){

        const {body, params} = request
        const {id} =params
        const {name} = body

        const group = await Group.find(id)

        group.merge({name:name})
        await group.save()

    }
    async destroy ({request}){
        const {id} = request.params

        const group = await Group.find(id)
        await group.delete()

    }
}

module.exports = GroupController
