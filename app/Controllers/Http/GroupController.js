'use strict'

class GroupController {

    async index() {
        const teachers = await Database.table('groups')

        return { status: 200, error: undefined , data: teachers
         }
    }

    async show({ request }){
        const { id } = request.params

        const validatedValue = numberTypeParamValidator(id)

        if (validatedValue.error) 
            return { status: 500, error: validatedValue.error, data: undefined }

        const group = await Database
            .select('*')
            .from('groups')
            .where("group_id",id)
            .first()

        return { status: 200, error: undefined , data: group || {} }
        
    }
    async store ({request}) {
        const { name }  = request.body

        const missingKeys = [] 

        if (!name) {missingKeys.push('first_name')}
        

        if(missingKeys.length)
            return {status: 422 , error: `${missingKeys} is missing.`, data: undefined}



        const group = await Database
            .table('groups')
            .insert({name})

        return group
    }

}

module.exports = GroupController
