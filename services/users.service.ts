const express = require("express");
const app = express();
import moment from "moment";
app.use(express.json())
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { resolve } from "path/posix";
import { timeStamp } from "console";
const prisma = new PrismaClient();
var SUCCESS = "Data Interted Successfully";
var FAILED = "Data Not Interted";

export async function getAllUsers(req: any, res: any) {
  return await prisma.users.findMany({
    where: {
      status: req.params.status,
    },
  });
}

export async function getAdminData(req: any, res: any) {
  return await prisma.users.findMany({
    where: {
    OR:[
      {
        role:"admin"
      },{
        role:"hr"
      }
    ]
    },
  });
}
export async function getAllUsersData(req: any, res: any) {
  return await prisma.users.findMany({});
}

export async function getUsersById(req: any, res: any) {
  return await prisma.users.findFirst({
    where: {
      employee_id: req.params.empId,
    },
  });
}

export async function getUsersLoginDetails(req: any, res: any) {
  return await prisma.users.findFirst({
    where: {
      employee_id: req.body.employee_id,
      password: req.body.password,
    },
    select: {
      employee_id: true,
      first_name: true,
      last_name: true,
      email: true,
      role: true,
      username: true,
      department: true,
      passport_size_photo: true,
      created_at:true,
      shifts :true,
      
    },
  });
}

export async function updateUsersById(req: any, res: any) {
 
   await prisma.users.update({
    where: {
      id: parseInt(req.params.Id),
    },
    data: {
      status: req.body.status,
      employee_id: req.body.employee_id || "",
      notice_period: req.body.notice_period || "",
      password: req.body.password || "",
      department: req.body.department || "",
      designation: req.body.designation || "",
      compensation: req.body.compensation || "",
      // accepted_at: req.body.accepted_at || "",
      role: req.body.role || "",
    },
  });

}

export async function getUsersByempId(req: Request, res: any) {
  return await prisma.users.findFirst({
    where: {
      id: parseInt(req.params.Id),
    },
  });
}

export async function createUser(req: any, res: any) {
  const empID =
    "ED" +
    moment(new Date(req.body.doj)).utc().format("DDMMYY") +
    req.body.username.substring(0, 3) +
    moment(new Date(req.body.dob)).utc().format("DDMM");
    
    
  try {
    var data = await prisma.users.create({
      data: {
        username: req.body.username,
        highest_qualification: req.body.highest_qualification,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mother_name: req.body.mother_name,
        father_name: req.body.father_name,
        email: req.body.email,
        phone: req.body.phone,
        guardian_phone: req.body.guardian_phone,
        gender: req.body.gender,
        doj: new Date(req.body.doj),
        dob: new Date(req.body.dob),
        // doj: new Date(5/25/2022),
        // dob:new Date(4/20/1999),
        blood_group: req.body.blood_group,
        house_no: req.body.house_no,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        nationality: req.body.nationality,
        passport_size_photo:
          req.files["passport_size_photo"] != undefined
            ? req.files["passport_size_photo"][0].filename
            : " ",
        aadhar_no: req.body.aadhar_no,
        aadhar_img:
          req.files["aadhar_img"] != undefined
            ? req.files["aadhar_img"][0].filename
            : " ",
        pancard_no: req.body.pancard_no || 0,
        pancard_img:
          req.files["pancard_img"] != undefined
            ? req.files["pancard_img"][0].filename
            : " ",
        ssc: req.files["ssc"] != undefined ? req.files["ssc"][0].filename : " ",
        intermediate:
          req.files["intermediate"] != undefined
            ? req.files["intermediate"][0].filename
            : " ",
        diploma:
          req.files["diploma"] != undefined
            ? req.files["diploma"][0].filename
            : " ",
        bachelor:
          req.files["bachelor"] != undefined
            ? req.files["bachelor"][0].filename
            : " ",
        master:
          req.files["master"] != undefined
            ? req.files["master"][0].filename
            : " ",
        passout_year: parseInt(req.body.passout_year) || 2020,
        expected_passout_year: parseInt(req.body.expected_passout_year) || 2020,
        marks_memo:
          req.files["marks_memo"] != undefined
            ? req.files["marks_memo"][0].filename
            : " ",
        transfer_certificate:
          req.files["transfer_certificate"] != undefined
            ? req.files["transfer_certificate"][0].filename
            : " ",
        bank_account_no: req.body.bank_account_no,
        ifsc_code: req.body.ifsc_code,
        bank_name: req.body.bank_name,
        branch_name: req.body.branch_name,
        account_holder_name: req.body.account_holder_name,
        upi_id: req.body.upi_id || " ",
        offer_letter:
          req.files["offer_letter"] != undefined
            ? req.files["offer_letter"][0].filename
            : " ",
        increment_letter:
          req.files["increment_letter"] != undefined
            ? req.files["increment_letter"][0].filename
            : " ",
        resignation_letter:
          req.files["resignation_letter"] != undefined
            ? req.files["resignation_letter"][0].filename
            : " ",
        payslips:
          req.files["payslips"] != undefined
            ? req.files["payslips"][0].filename
            : " ",
        experience_certificate:
          req.files["experience_certificate"] != undefined
            ? req.files["experience_certificate"][0].filename
            : " ",
        linkedIn_profile_link: req.body.linkedIn_profile_link || " ",
        facebook_profile_link: req.body.facebook_profile_link || " ",
        twitter_profile_link: req.body.twitter_profile_link || " ",
        instagram_profile_link: req.body.instagram_profile_link || " ",
        employee_id: empID,
        status: "pending",
      },
      
   
    });
    // res.data = { data: data, status: 200, message: SUCCESS };
    return res.status(200).json({ data: data, status: 200, message: SUCCESS });
  } catch (error) {
    
    return res.data = { data: { message: FAILED }, status: 300 };;
  }
  // .then((data: any) => {
  //   return { data: data, status: 200, message: SUCCESS };
  // })
  // .catch((error: any) => {
  //   return { data: { message: FAILED }, status: 300 };
  // });
}

export async function updateUser(req: any, res: any) {
  const data = {
    username: req.body.username,
    highest_qualification: req.body.highest_qualification,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    mother_name: req.body.mother_name,
    father_name: req.body.father_name,
    email: req.body.email,
    phone: req.body.phone,
    guardian_phone: req.body.guardian_phone,
    gender: req.body.gender,
    doj: new Date(req.body.doj),
    dob: new Date(req.body.dob),
    blood_group: req.body.blood_group,
    house_no: req.body.house_no,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    nationality: req.body.nationality,
    aadhar_no: req.body.aadhar_no,
    pancard_no: req.body.pancard_no,
    passout_year: parseInt(req.body.passout_year) || 0,
    expected_passout_year: parseInt(req.body.expected_passout_year) || 0,
    bank_account_no: req.body.bank_account_no,
    ifsc_code: req.body.ifsc_code,
    bank_name: req.body.bank_name,
    branch_name: req.body.branch_name,
    account_holder_name: req.body.account_holder_name,
    linkedIn_profile_link: req.body.linkedIn_profile_link,
    facebook_profile_link: req.body.facebook_profile_link,
    twitter_profile_link: req.body.twitter_profile_link,
    instagram_profile_link: req.body.instagram_profile_link,

    passport_size_photo:
      req.files["passport_size_photo"] != undefined
        ? req.files["passport_size_photo"][0].filename
        : req.body.passport_size_photo,
    aadhar_img:
      req.files["aadhar_img"] != undefined
        ? req.files["aadhar_img"][0].filename
        : req.body.aadhar_img,
    pancard_img:
      req.files["pancard_img"] != undefined
        ? req.files["pancard_img"][0].filename
        : req.body.pancard_img,
    ssc:
      req.files["ssc"] != undefined
        ? req.files["ssc"][0].filename
        : req.body.ssc,
    intermediate:
      req.files["intermediate"] != undefined
        ? req.files["intermediate"][0].filename
        : req.body.intermediate,
    diploma:
      req.files["diploma"] != undefined
        ? req.files["diploma"][0].filename
        : req.body.diploma,
    bachelor:
      req.files["bachelor"] != undefined
        ? req.files["bachelor"][0].filename
        : req.body.bachelor,
    master:
      req.files["master"] != undefined
        ? req.files["master"][0].filename
        : req.body.master,
    marks_memo:
      req.files["marks_memo"] != undefined
        ? req.files["marks_memo"][0].filename
        : req.body.marks_memo,
    transfer_certificate:
      req.files["transfer_certificate"] != undefined
        ? req.files["transfer_certificate"][0].filename
        : req.body.transfer_certificate,

    upi_id: req.body.upi_id || " ",
    offer_letter:
      req.files["offer_letter"] != undefined
        ? req.files["offer_letter"][0].filename
        : req.body.offer_letter,
    increment_letter:
      req.files["increment_letter"] != undefined
        ? req.files["increment_letter"][0].filename
        : req.body.increment_letter,
    resignation_letter:
      req.files["resignation_letter"] != undefined
        ? req.files["resignation_letter"][0].filename
        : req.body.resignation_letter,
    payslips:
      req.files["payslips"] != undefined
        ? req.files["payslips"][0].filename
        : req.body.payslips,
    experience_certificate:
      req.files["experience_certificate"] != undefined
        ? req.files["experience_certificate"][0].filename
        : req.body.experience_certificate,
  };

  return await prisma.users.update({
    where: {
      id: parseInt(req.params.Id),
    },
    data: data,
  });
  // return res.json(users);
}

// export async function updateUser(req: any, res: any) {
//   return await prisma.users.findMany({
//     where: {
//       employee_id: "ED270521MIN1304",
//     },
//   });
// }
