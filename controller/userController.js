import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  if(req.body.role == 'admin'){
    if(req.user != null){
      if(req.user.role != 'admin'){
        res.json({
          message : 'you are not an admin'
        })

        return;
      } 
    }else{
      res.json({
        message : 'you can not register as admin'
      })
  
      return;
    }
    

  }

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthday: req.body.birthday,
    role: req.body.role,
    email: req.body.email,
    password: hashedPassword,
  });

  user
    .save()
    .then(() => {
      res.json({
        message: "user saved successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "user not saved",
      });
    });
}

export function userLogin(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((data) => {
    if (data != null) {
      const isPasswordCorrect = bcrypt.compareSync(password, data.password);
      console.log(password);

      console.log(isPasswordCorrect);

      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            role: data.role,
            birthday: data.birthday,
          },
          "dinesha123"
        );

        console.log(token);

        res.json({
          message: "user found",
        });
      }else{
        console.log('Credential not correct')
      }
    } else {
      res.json({
        message: "user not found",
      });
    }
  });
}

export function isAdmin(req){
  if(req.user == null){
    return false;
  } 
  if(req.user.role != 'admin'){
    return false;
  }
  return true;
}
