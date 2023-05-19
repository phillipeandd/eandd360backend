import prisma from "../utils/prisma";
import { Request, Response, response } from "express";
import {
  addDays,
  format,
  set,
  addHours,
  differenceInMinutes,
  getMonth,
  getYear,
  isValid,
} from "date-fns";
export const getPms = async () => {
  try {
    const pms = await prisma.performance.findMany({
      // where: {
      //   employee_id: req.params.empId,
      // },
      orderBy: [
        {
          created_at: "desc",
        },
      ],
      include: {
        employee: {
          select: {
            username: true,
            passport_size_photo: true,
          },
        },
        creator: {
          select: {
            username: true,
            passport_size_photo: true,
          },
        },
      },
    });
    return pms;
  } catch (error: any) {
    console.error("Error Message - ", error.message);
    console.error(error);
    throw new Error("");
  }
};
export const createUserPms = async (
    userId: string[],
    ownership:number,
    punctuality:number,
    integrity:number,
    feedback_positively:number,
    attitude_towards_others:number,
    attitude_towards_work:number,
    professional_development:number,
    problem_solving:number,
    created_by:string,
    month:string

  ) => {
    let start_date = set(new Date(), {
      date: 1,
      hours: 0,
      minutes: 0,
      milliseconds: 0,
    });

    if (month != null && isValid(new Date(month))) {
     start_date = set(start_date, {
        month: getMonth(new Date(month)),
        year: getYear(new Date(month)),
      });
    }

    let end_date = set(start_date, {
      month: getMonth(start_date) + 1,
    });
    try {
      const getUser= await prisma.performance.findFirst({
        where:{
          employee_id: userId[0],
          created_by:created_by,
          month:{
            gt:start_date,
            lte:end_date
          }
        }
      })
      if(getUser){
        return "already existed";
      }
      const userPms = await prisma.performance.createMany({
        data: userId.map((user) => ({
          employee_id: user,
          ownership:ownership,
          punctuality:punctuality,
          integrity:integrity,
          feedback_positively:feedback_positively,
          attitude_towards_others:attitude_towards_others,
          attitude_towards_work:attitude_towards_work,
          professional_development:professional_development,
          problem_solving:problem_solving,
          created_by:created_by,
          month:new Date(month)
        })),
      });
      return userPms;
    } catch (error) {
      throw new Error("Error While create user pms");
    }
  };

  export const getUserPms=async(empId: string,date:string) => {
    let start_date = set(new Date(), {
      date: 1,
      hours: 0,
      minutes: 0,
      milliseconds: 0,
    });

    if (date != null && isValid(new Date(date))) {
     start_date = set(start_date, {
        month: getMonth(new Date(date)),
        year: getYear(new Date(date)),
      });
    }

    let end_date = set(start_date, {
      month: getMonth(start_date) + 1,
    });

    try{
      // const userPmsById= await prisma.performance.findMany({
      //   where:{
      //     employee_id: empId,
      //     month:{
      //       lte: end_date,
      //       gte:start_date
      //     }
      //   },
      //   orderBy:{
      //     created_at :"asc"
      //   },
      //   include: {
      //     employee: {
      //       select: {
      //         username: true,
      //         passport_size_photo: true,
      //       },
      //     }
      //   }
      // });
      // return userPmsById;
      const userPmsById= await prisma.$queryRaw `select id, 
      AVG(punctuality) as punctuality,
      AVG(problem_solving) as problem_solving,
      AVG(attitude_towards_others) as attitude_towards_others,
      AVG(attitude_towards_work) as attitude_towards_work,
      AVG(feedback_positively) as feedback_positively,
      AVG(integrity) as integrity,AVG(ownership) as ownership,
      AVG(professional_development) as professional_development 
      from performance where employee_id=${empId} and month between ${start_date} and ${end_date}
      group by ${empId}`;
      return userPmsById;
    }catch (error: any) {
      throw new Error("Error While fetching user pms");
    }
  }
  // export const getUserPms=async(empId: string,date:string) => {
  //   let start_date = set(new Date(), {
  //         date: 1,
  //         hours: 0,
  //         minutes: 0,
  //         milliseconds: 0,
  //       });
    
  //       if (date != null && isValid(new Date(date))) {
  //        start_date = set(start_date, {
  //           month: getMonth(new Date(date)),
  //           year: getYear(new Date(date)),
  //         });
  //       }
    
  //       let end_date = set(start_date, {
  //         month: getMonth(start_date) + 1,
  //       });
    
  //   try{
  //     const userPmsById= await prisma.performance.groupBy({
  //       by:['employee_id'],

  //       where:{
  //         employee_id: empId,
  //         month: {
  //           gte: start_date,
  //           lte:end_date,
  //         },  
  //     },
  //       _avg:{
  //         punctuality:true,
  //         problem_solving:true,
  //         attitude_towards_others:true,
  //         attitude_towards_work:true,
  //         feedback_positively:true,
  //         integrity:true,
  //         ownership:true,
  //         professional_development:true,
  //       },
  //     });
  //     return userPmsById;
  //   }catch (error: any) {
  //     throw new Error("Error While fetching user pms");
  //   }
  // }

export const getUserPmsByYear=async (empId: string,year:string) => {
  var start_date = new Date();
  start_date.setMonth(0, 1);
  start_date.setTime(0)
  if (year != null && isValid(new Date(year))) {
   start_date = set(start_date, {
    year: getYear(new Date(year)),
   });
  }
let end_date = set(start_date, {
    year: getYear(new Date(year))+1,
  });
  try{
    const userPmsById= await prisma.$queryRaw `select id, SUM(punctuality) as punctuality,
    SUM(problem_solving) as problem_solving,
    SUM(attitude_towards_others) as attitude_towards_others,
    SUM(attitude_towards_work) as attitude_towards_work,
    SUM(feedback_positively) as feedback_positively,
    SUM(integrity) as integrity,SUM(ownership) as ownership,
    SUM(professional_development) as professional_development from
    (select id, employee_id,
    AVG(punctuality) as punctuality,
    AVG(problem_solving) as problem_solving,
    AVG(attitude_towards_others) as attitude_towards_others,
    AVG(attitude_towards_work) as attitude_towards_work,
    AVG(feedback_positively) as feedback_positively,
    AVG(integrity) as integrity,AVG(ownership) as ownership,
    AVG(professional_development) as professional_development
    from performance where employee_id=${empId} and month between ${start_date} and ${end_date}
    group by employee_id, DATE_FORMAT(month,'%Y-%m')) as a group by employee_id;`;
return userPmsById;
  }catch (error: any) {
    throw new Error("Error While fetching user pms");
  }
}

export const getAllPms=async (empId: string,date: string)=>{
  let start_date=set(new Date(),{
    date:1,
    hours:0,
    minutes:0,
    milliseconds:0
  });
  if (date != null && isValid(new Date(date))) {
    start_date = set(start_date, {
       month: getMonth(new Date(date)),
       year: getYear(new Date(date)),
     });
   }

   let end_date = set(start_date, {
     month: getMonth(start_date) + 1,
   });
  try {
    const userPms= await prisma.performance.findMany({
    where: {
        created_by: empId,
        month:{
          lte:end_date,
          gte:start_date,
          
        }
      },
      orderBy: [
        {
          created_at: "desc",
        },
      ],
      include: {
        employee: {
          select: {
            username: true,
            passport_size_photo: true,
          },
        },
        creator: {
          select: {
            username: true,
            passport_size_photo: true,
          },
        },
      },
    });
    return userPms
  } catch (error) {
    throw new Error("Error While fetching users pms");
  }
}
export const getAllPmsByYear =async (empId:string, year:string) => {
  var start_date = new Date();
  start_date.setMonth(0, 1);
  start_date.setTime(0)
  if (year != null && isValid(new Date(year))) {
   start_date = set(start_date, {
    year: getYear(new Date(year)),
   });
  }
let end_date = set(start_date, {
    year: getYear(new Date(year))+1,
  });
  try{
    const userPmsById= await prisma.$queryRaw `select id,employee_id, SUM(punctuality) as punctuality,
    SUM(problem_solving) as problem_solving,
    SUM(attitude_towards_others) as attitude_towards_others,
    SUM(attitude_towards_work) as attitude_towards_work,
    SUM(feedback_positively) as feedback_positively,
    SUM(integrity) as integrity,SUM(ownership) as ownership,
    SUM(professional_development) as professional_development from
    (select id, employee_id,
    AVG(punctuality) as punctuality,
    AVG(problem_solving) as problem_solving,
    AVG(attitude_towards_others) as attitude_towards_others,
    AVG(attitude_towards_work) as attitude_towards_work,
    AVG(feedback_positively) as feedback_positively,
    AVG(integrity) as integrity,AVG(ownership) as ownership,
    AVG(professional_development) as professional_development
    from performance where month between ${start_date} and ${end_date}
    group by employee_id, DATE_FORMAT(month,'%Y-%m')) as a group by employee_id;`;
return userPmsById;
  }catch (error: any) {
    throw new Error("Error While fetching user pms");
  }
}

export const getAdminPms =async (empId:string, date:string) => {
  let start_date = set(new Date(), {
    date: 1,
    hours: 0,
    minutes: 0,
    milliseconds: 0,
  });

  if (date != null && isValid(new Date(date))) {
   start_date = set(start_date, {
      month: getMonth(new Date(date)),
      year: getYear(new Date(date)),
    });
  }

  let end_date = set(start_date, {
    month: getMonth(start_date) + 1,
  });
  try{
    const userPmsById= await prisma.$queryRaw `select id,employee_id, SUM(punctuality) as punctuality,
    SUM(problem_solving) as problem_solving,
    SUM(attitude_towards_others) as attitude_towards_others,
    SUM(attitude_towards_work) as attitude_towards_work,
    SUM(feedback_positively) as feedback_positively,
    SUM(integrity) as integrity,SUM(ownership) as ownership,
    SUM(professional_development) as professional_development from
    (select id, employee_id,
    AVG(punctuality) as punctuality,
    AVG(problem_solving) as problem_solving,
    AVG(attitude_towards_others) as attitude_towards_others,
    AVG(attitude_towards_work) as attitude_towards_work,
    AVG(feedback_positively) as feedback_positively,
    AVG(integrity) as integrity,AVG(ownership) as ownership,
    AVG(professional_development) as professional_development
    from performance where created_by=${empId} and month between ${start_date} and ${end_date}
    group by employee_id, DATE_FORMAT(month,'%Y-%m')) as a group by employee_id;`;
return userPmsById;
  }catch (error: any) {
    throw new Error("Error While fetching user pms");
  }
}
