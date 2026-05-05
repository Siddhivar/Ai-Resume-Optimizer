const mongoose=require("mongoose")

/**
 * --job description: String
 * --resume text: String
 * self desription:String
 * 
 * matchScore: Number
 * technical question:[{question:"",
                    *  intention:"",
                    * answer:""}]
 * behavioral questions:[]
 * skills gaps:[]
 * preperation plans:[{
 *          day:Number,
 *          focus:String,
 *          task:[String]
 * }]
 */
const technicalQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
    intention:{
        type:String,
        required:[true, "Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})

const behavioralQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Behavioral question is required"]
    },
    intention:{
        type:String,
        required:[true, "Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})

const skillGapsSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true, "Severity is required"]
    }
},{
    _id:false
})

const preparationPlanSchema= new mongoose.Schema({
    day:{
        type:Number,
        required:[true, "Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    },
    tasks:[{
        type:String,
        reuqired:[true,"Task is required"]
    }]
})

const interviewReportSchema= new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Job description is required"]
    },
    resume:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillsGaps:[skillGapsSchema],
    preparationPlan:[preparationPlanSchema]
},{
    timestamps:true
})

const interviewReportModel=mongoose.model("InterviewReport",interviewReportSchema)
module.exports=interviewReportModel;