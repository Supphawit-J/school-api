'use strict'



const Database = use('Database')
const Hash = use('Hash')
const Validator = use("Validator")
const Teacher = use('App/Models/Teacher')

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number))) 
        return { error: `param: ${number} is not supported, please use param as a number` }
        
  return {}      
}


class TeacherController {
    
    async index() {
        
      
        const teachers = Teacher.query()
        
        return { status: 200, error: undefined , data: await teachers.fetch() }
    }


    async show({ request }){
        const { id } = request.params
        const validatedValue = numberTypeParamValidator(id)

        if (validatedValue.error) 
            return { status: 500, error: validatedValue.error, data: undefined }

    
        const teacher = await Teacher.find(id)    

        return { status: 200, error: undefined , data: teacher || {} }
        
    }

    async store ({request}) {

        const { first_name , last_name , email , password }  = request.body

        
        const rules = {
            first_name:'required',
            last_name:'required',
            email:'required|email|unique:teachers,email',
            password:'required|min:8'}

        const validation =await Validator.validate(request.body,rules)

        if(validation.fails())
            return {status:422,error: validation.messages(),data: undefined}

    
        const hashedPassword = await Hash.make(password)
        
        const teacher = new Teacher();
        teacher.first_name =first_name;
        teacher.last_name = last_name;
        teacher.email = email;
        teacher.password = hashedPassword;

        await teacher.save()
    }
    async update ({request}){

        const {body, params} = request
        const {id} =params
        const { first_name , last_name , email } = body

        
        const teacher = await Teacher.find(id)
        teacher.merge({first_name , last_name , email});
        await teacher.save()        

    }
    async destroy ({request}){
        const {id} = request.params
        const teacher = await Teacher.find(id)
        await teacher.delete()

    }


}

module.exports = TeacherController
