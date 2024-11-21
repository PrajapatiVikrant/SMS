# SETUP PROCESS

To start this backend project run following command in your terminal

- git clone repository link
- cd SMS
- npm i
- npm run dev
  server will start


# API ENDPOINT


* Signup

- For admin 
 http://localhost:4000/SMS/auth/api/signup    
 method:POST    
 request params: /admin_secret      
 request body:email,password          
 access: required admin_secret key 

 For any
 http://localhost:4000/SMS/auth/api/signup     
 method:POST    
 request body:email,password             
 access: for any                       





 * Login
 http://localhost:4000/SMS/auth/api/login        
 method:POST      
 request body:email,password           
 access: for any





 1. Student

- Create new student
 http://localhost:4000/SMS/student/api           
 method:POST       
 request body:name,email,classId              
 access: admin            
 jwttoken
       
- Get all students (with pagination and filtering by class).
 http://localhost:4000/SMS/student/api           
 method:GET         
 request params: /classId/pageNo            
 access: admin,teacher       
 jwttoken
 example: http://localhost:4000/SMS/student/api/673d776aabd26d441a3f5d32/1

- Get a single student by ID
 http://localhost:4000/SMS/student/api           
 method:GET         
 request params: /studentId                   
 access: admin,student,teacher     
 jwttoken

- Update a student (e.g., name, class, profile image).
 http://localhost:4000/SMS/student/api          
 method:PUT          
 request params: /studentId    
 request body:name,email,classId               
 access:admin   jwttoken

- upload student profile image
 http://localhost:4000/SMS/student/api/upload             
 method:PUT          
 request params: /studentId
 request body: url   (student image url)    
 request file:profileImage     
 access:student

- Delete a student (soft delete preferred).
 http://localhost:4000/SMS/student/api          
 method:DELETE      
 requrest params: /studentId                 
 access:admin                 
 jwttoken



2. Teacher

- Add a new teacher.
 http://localhost:4000/SMS/teacher/api           ]
 method:POST     
 requrest body:name,email,subject          
 access: admin           
 jwttoken

- Get all teachers (with pagination).
 http://localhost:4000/SMS/teacher/api               
 method:GET       
 request params: /pageNo                 
 access:admin          
 jwttoken

- Get a teacher by ID.
 http://localhost:4000/SMS/teacher/api             
 method:PUT         
 request params: /teacherId              
 access:admin,teacher       
 jwttoken

- Update a teacher (e.g., name, subject).
 http://localhost:4000/SMS/teacher/api             
 method:PUT         
 request params: /teacherId        
 request body:name,email,subject    
 access:admin       jwttoken

- Upload teacher profile image
 http://localhost:4000/SMS/teacher/api/upload              
 method:PUT          
 request params: /teacherId
 request body: url  (teacher image url)        
 request file:profileImage     
 access: teacher


- Delete a teacher (soft delete preferred).
 http://localhost:4000/SMS/teacher/api            
 method:DELETE       
 request params: /teacherId      
 access:admin        
 jwttoken





3. Class

- Create a class.
 http://localhost:4000/SMS/class/api         
 method:POST        
 request body:name,teacherId            
 access:admin     
 jwttoken

- Assign a teacher to a class.
 http://localhost:4000/SMS/class/api/assign/teacher        
 method:PUT   
 request params:classId         
 request body:teacherId  (who will assign)         
 access:admin      
 jwttoken

- Get all classes (with pagination).
 http://localhost:4000/SMS/class/api                 
 method:GET         
 request params:pageNo              
 access:admin       
 jwttoken

- Update class details (e.g., name, teacher).
 http://localhost:4000/SMS/class/api              
 method:PUT           
 request params: classId      
 request body:name, teacherId            
 access:admin          
 jwttoken

- Delete a class.
 http://localhost:4000/SMS/class/api            
 method:PUT            
 request params: classId           
 access:admin         
 jwt token








# ATTENDANCE TRACKING SYSTEM

4. Attendance

- Create attendance    
 http://localhost:4000/SMS/attendance/api       
 method:POST         
 access: teacher,admin        
 jwttoken

- Get all attendance of any class by classId
 http://localhost:4000/SMS/attendance/api               
 method:GET  
 request params:classId       
 access:teacher,admin                
 jwttoken

- Get all attendance by given date
 http://localhost:4000/SMS/attendance/api              
 method:GET      
 request params:classId/date   (year-month-date      example:- 2024-02-01)     
 access: teacher, admin      
 jwttoken

- Get single attendance by given date and student
 http://localhost:4000/SMS/attendance/api            
 method:GET      
 request params:classId/date/studentId          
 access: teacher, admin    jwt token









# EXAM MANAGEMENT

5. Exam

- create exam
 http://localhost:4000/SMS/exam/api         
 method:POST          
 request body: date, classId, className, totalQuestion, maxNo, duration        
 access: admin                 
 jwttoken

- get all exam
 http://localhost:4000/SMS/exam/api         
 method:GET        
 access: admin, teacher        
 jwttoken

- get single exam by exam id
 http://localhost:4000/SMS/exam/api             
 method:GET      
 request params: examId        
 access: teacher, admin      
 jwttoken

- update single exam by exam id
 http://localhost:4000/SMS/exam/api              
 method:PUT      
 request params: examId      
 request body: date, classId, className, totalQuestion, maxNo, duration        
 access: teacher, admin      
 jwttoken

- delete single exam by exam id
 http://localhost:4000/SMS/exam/api          
 method: DELETE     
 request params: examId     
 access: admin     
 jwttoken



# RESULT MANAGEMENT

6. Result

- create result
 http://localhost:4000/SMS/result/api
 method:POST         
 request body: date,examId, classId, className,studentId, studentName,totalQuestion, maxNo, score
 access: admin
 jwttoken

- get all exam
 http://localhost:4000/SMS/result/api         
 method:GET        
 access: admin, teacher        
 jwttoken

- get single result by result id
 http://localhost:4000/SMS/result/api             
 method:GET      
 request params: resultId       
 access: teacher, admin      
 jwttoken

- update single result by result id
 http://localhost:4000/SMS/result/api             
 method:PUT      
 request params: resultId      
 request body: date, classId, className,studentId, studentName,totalQuestion, maxNo, score       
 access: teacher, admin      
 jwttoken

- delete single result by student id
 http://localhost:4000/SMS/result/api          
 method: DELETE     
 request params: resultId     
 access: admin     
 jwttoken




