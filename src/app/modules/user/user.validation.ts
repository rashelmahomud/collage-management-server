import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.conestent';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'student first Name is required.',
        }),
        middleName: z
          .string({
            required_error: 'student first Name is required.',
          })
          .optional(),

        lastName: z.string({
          required_error: 'student Last Name is required.',
        }),
      }),

      dateOfBirth: z.string({
        required_error: 'Data Of Birth is required.',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'gender is required....',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'blood group is required...',
        })
        .optional(),

      email: z.string({ required_error: 'Email is required' }).email(),

      contactNo: z.string({ required_error: 'contact Number is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact Number is reqired',
      }),

      presentAddress: z.string({
        required_error: 'Present Address is Required',
      }),
      academicSemester: z.string({
        required_error: 'Academic Semester is Required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is Required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is Required',
      }),
      //=============
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father Name is Required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation is Required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact Number is Required',
        }),
        motherName: z.string({
          required_error: 'Mother Name is Required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is Required',
        }),
        motherContactNo: z.string({
          required_error: 'MOther Contact Number is Required',
        }),
        address: z.string({
          required_error: 'Address is Required',
        }),
      }),
      //=============

      localGuardian: z.object({
        name: z.string({
          required_error: 'Name is  is Required',
        }),
        occupation: z.string({
          required_error: 'occupation  is Required',
        }),
        contactNo: z.string({
          required_error: 'Contact is Required',
        }),
        address: z.string({
          required_error: 'Address is Required',
        }),
      }),

      //===============
      profileImage: z.string().optional(),
    }),
  }),
});

//===========faculty Zod Schema ========>
const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),
      gender: z.string({
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: z
        .string({
          required_error: 'Blood group is required',
        })
        .optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),

      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});
//===========faculty Zod Schema ========^

//==================admin zodSchema ================>
const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),

      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),

      gender: z.string({
        required_error: 'Gender is required',
      }),

      bloodGroup: z.string({
        required_error: 'Blood group is required',
      }),

      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),

      contactNo: z.string({
        required_error: 'Contact number is required',
      }),

      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),

      presentAddress: z.string({
        required_error: 'Present address is required',
      }),

      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),

      managementDepartment: z.string({
        required_error: 'Management department is required',
      }),

      designation: z.string({
        required_error: 'Designation is required',
      }),

      profileImage: z.string().optional(),
    }),
  }),
});
//==================admin zodSchema ================^

export const userValidation = {
  createUserZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
