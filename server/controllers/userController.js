const User = require('../Model/User');
const Widthdraw = require('../Model/widthdrawSchema');
const Verify = require("../Model/verifySchema");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");



// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }




  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, 'piuscandothis', {
      expiresIn: maxAge
    });
  };




module.exports.homePage = (req, res)=>{
res.render("index")
}

module.exports.aboutPage = (req, res)=>{
    res.render("about")
    }
    
module.exports.invplanPage = async(req, res)=>{
    res.render("inv-plans")
}

    module.exports.contactPage = (req, res)=>{
        res.render("contact")
   }
        
   module.exports.affliatePage = (req, res)=>{
    res.render("affiliate")
    }
    

   module.exports.faqPage = (req, res)=>{
    res.render("faqs")
    }
    
    module.exports.termsPage = (req, res)=>{
        res.render("terms")
    }

    module.exports.registerPage = (req, res)=>{
        res.render("register")
    }
    


const sendEmail = async ( fullname, email,  password ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.fxlite-market.com',
      port:  465,
      auth: {
        user: 'fxlitema',
        pass: ')}Y@v~1hwuHf'
      }
  
      });
    const mailOptions = {
      from:'fxlitema@fxlite-market.com',
      to:email,
      subject: 'Welcome to TMGSTOCKTRADES',
      html: `<p>Hello  ${fullname},<br>You are welcome to Tmgstoctrades, we will help you make profit from the financial market after trading. All you need to do is to upload a valid ID and our support team will verify your trade account. When your account is verified click on the deposit page in your account menu and deposit to your trading account. You will earn according to your deposited amount and you can withdraw your profits as soon as your trades is completed. Good luck and we are waiting to get testimonies from you.

      Please note that your deposit is with the wallet address provided by Tmgstocktrades trading Platform, do not invest to any copied wallet address or bank details provided by any account manager or third party other than that provided by Tmgstocktrades, hence your deposit is invalid.<br><br>
      
      <br><br>Best Regards,
      Management<br><br>
      
      Copyrights 2023 @ Tmgstocktrades. All Rights Reserved..<br><br>
      Your login information:<br>Email: ${email}<br>Password: ${password}<br><br>You can login here: <br>  Contact us immediately if you did not authorize this registration.<br>Thank you.</p>`
  }
  // 0x8C0E7B1436E4BbA8D6CF2CE1AEc931187a6DD73F
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})


  } catch (error) {
    console.log(error.message);
  }
}


module.exports.register_post = async (req, res) =>{
    const {fullname,country, gender,tel,email, password, } = req.body;
    try {
        const user = await User.create({fullname,country, gender, tel, email,  password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });

        if(user){
          sendEmail(req.body.fullname,req.body.email, req.body.password)
        }else{
          console.log(error);
        }
      }
    
        catch(err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
          }
    
}

module.exports.loginPage = (req, res)=>{
    res.render("login")
}

const loginEmail = async (  email ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.fxlite-market.com',
      port:  465,
      auth: {
        user: 'fxlitema',
        pass: ')}Y@v~1hwuHf'
      }
  
      });
    const mailOptions = {
      from:'fxlitema@fxlite-market.com',
      to:email,
      subject: 'Your account has recently been logged In',
      html: `<p>Greetings,${email}<br>your trading account has just been logged in by a device .<br>
     if it's not you kindly message support to terminate access  <br>You can login here: https://tmgstocktrades.org/login.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})


  } catch (error) {
    console.log(error.message);
  }
}



module.exports.login_post = async(req, res) =>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });

        if(user){
          loginEmail(req.body.email)
        }else{
          console.log(error);
        }
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.loginAdmin = (req, res)=>{
    res.render("loginAdmin")
}

module.exports.dashboardPage = async(req, res) =>{
  res.render('dashboard');
}

// module.exports.navbarPage = async(req, res)=>{
//     res.render("navbarPage")
//     }

module.exports.verifyPage = async(req, res)=>{
    res.render("verify")
}

module.exports.settingPage = async(req, res)=>{
  res.render("setting")
}

module.exports.chartPage = async(req, res)=>{
  res.render("charts")
}

module.exports.quotePage = async(req, res)=>{
  res.render("quotes")
}


module.exports.buyCrypto = async(req, res)=>{
  res.render("merchants")
}

module.exports.calendar = async(req, res)=>{
  res.render("calendar")
}


module.exports.manager = async(req, res)=>{
  res.render("managers")
}


const verifyEmail = async (email,fullname ) =>{
    
    try {
      const transporter =  nodemailer.createTransport({
        host: 'mail.fxlite-market.com',
        port:  465,
        auth: {
          user: 'fxlitema',
          pass: ')}Y@v~1hwuHf'
        }
    
        });
      const mailOptions = {
        from:email,
        to:'fxlitema@fxlite-market.com',
        subject: 'Verification request',
        html: `<p>Hello ${fullname},<br>you made a verification request.<br>
        and it is immeditaly under review by admins<br>You can login here: https://tmgstocktrades.org/login<br> to check your verification status.<br>Thank you.</p>`
    }
    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){
          console.log(error);
          res.send('error');
      }else{
          console.log('email sent: ' + info.response);
          res.send('success')
      }
  })
  
  
    } catch (error) {
      console.log(error.message);
    }
  }


module.exports.verifyPage_post = async(req, res)=>{
    // const { email, username,fullname,city,gender,dateofBirth,marital,age,address,image} =req.body
    let theImage;
    let uploadPath;
    let newImageName;


    if(!req.files || Object.keys(req.files).length === 0){
        console.log('no files to upload')
    }else{
            theImage = req.files.image;
            newImageName = theImage.name;
            uploadPath = require('path').resolve('./') + '/public/IMG_UPLOADS' + newImageName

            theImage.mv(uploadPath, function(err){
                if(err){
                    console.log(err)
                }
           })

    }
    try{
        const verification = new Verify({
           
          image: newImageName,
        })
        verification.save()
        const id = req.params.id;
        const user = await User.findById(id);
        user.verified.push(verification);
        // await User.findById(id).populate("verify")
        await user.save();

        if(user){
            res.redirect("/dashboard")   
        }else{
            console.log(error)
        }
    }catch(error){
        console.log(error)
    }

}

module.exports.accountPage = async(req, res) =>{
  const id = req.params.id
  const user = await User.findById(id);
  res.render('account')
}

module.exports.editProfilePage = async(req, res)=>{
    res.render("editProfile")
}

module.exports.transactionPage = async(req, res)=>{
  const id = req.params.id
  const user = await User.findById(id).populate("widthdraws")
   res.render('transactions', { user})
}


module.exports.upgradePage = async(req, res)=>{
    res.render("accountUpgrade")
}



module.exports.depositPage = async(req, res) =>{
    res.render("fundAccount")
}

module.exports.widthdrawPage = async(req, res)=>{
    res.render("widthdrawFunds")
}


module.exports.accountPage_post = async(req, res) =>{
  let theImage;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
      console.log('no files to upload')
  }else{
          theImage = req.files.image;
          newImageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/public/IMG_UPLOADS' + newImageName

          theImage.mv(uploadPath, function(err){
              if(err){
                  console.log(err)
              }
          })

  }

    try {
        await User.findByIdAndUpdate(req.params.id,{
          fullname: req.body.fullname,
          tel: req.body.tel,
          email: req.body.email,
          country: req.body.country,
          gender: req.body.gender,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          image: newImageName,
          
          updatedAt: Date.now()
        });

          await res.redirect(`/account/${req.params.id}`);
          
          console.log('redirected');
        
      // } catch (error) {
      //   console.log(error);
      // }

        await res.redirect(`/editUser/${req.params.id}`);
        
        console.log('redirected');
      } catch (error) {
        console.log(error);
      }
    
}
 
module.exports.widthdrawPage_post = async(req, res) =>{
  try {
    const widthdraw = new Widthdraw({
    amount: req.body.amount,
    type: req.body.type,
    status: req.body.status,
    });
    widthdraw.save()
    const id = req.params.id;
    const user = await User.findById(id)
    user.widthdraws.push(widthdraw);
    await user.save()

    res.render("transactions", {user})
        if(user){
            widthdrawEmail(req.body.amount,req.body.type )
        }else{
            console.log(error)
        }
 
  } catch (error) {
    console.log(error)
  }

}


// module.exports.widthdrawHistory = async(req, res) =>{

// }


module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }



