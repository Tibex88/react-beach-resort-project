import { Box, Typography } from '@mui/material';
import React, { useState } from 'react'

const atLeastMinimumLength = (password) => new RegExp(/(?=.{8,})/).test(password);
const atLeastOneUppercaseLetter = (password) => new RegExp(/(?=.*?[A-Z])/).test(password);
const atLeastOneLowercaseLetter = (password) => new RegExp(/(?=.*?[a-z])/).test(password);
const atLeastOneNumber = (password) => new RegExp(/(?=.*?[0-9])/).test(password);
const atLeastOneSpecialChar = (password) => new RegExp(/(?=.*?[#?!@$ %^&*-])/).test(password);

const PasswordStrength =  Object.freeze({
    STRONG :"Strong",
    MEDIUM :"Medium",
    WEAK :"Weak",
})


function testingPasswordStrength(password) {
    if ( ! password) return PasswordStrength.WEAK;
    let points = 0;
    if (atLeastMinimumLength(password)) points += 1;
    if (atLeastOneUppercaseLetter( password)) points += 1;
    if (atLeastOneLowercaseLetter( password)) points += 1;
    if (atLeastOneNumber( password)) points += 1;
    if (atLeastOneSpecialChar(password)) points += 1;
    if (points >= 5) return PasswordStrength.STRONG;
    if (points >= 3) return PasswordStrength.MEDIUM;
    return PasswordStrength.WEAK;
}

// function getlcon( PasswordStrength) {
//     let icon = ErrorOutlinedlcon ;
//     switch (strength) {
//     case PasswordStrength.WEAK:
//     icon
//     = ErrorOutline0utlinedIcon;
//     break;
//     case PasswordStrength.MEDIUM:
//     icon = ErrorOutline0utlinedIcon;
//     break;
//     case PasswordStrength.STRONG:
//     icon
//     = CheckOutltnedIcon;
//     break;
//     return icon;
//     }

function generateColors(strength){
    let result=  []
    const COLORS = {
    NEUTRAL: 'hsla(0,0%, 88%, 1)' ,
    WEAK: 'hsla(353, 100%, 38%, 1)' ,
    MEDIUM: 'hsla(40, 71%, 51%, 1)' ,
    STRONG: 'hsla(134, 73%, 30%, 1)'
    };

    switch (strength) {
    case PasswordStrength.WEAK:
        result = [COLORS.WEAK,COLORS.NEUTRAL,COLORS.NEUTRAL,COLORS.NEUTRAL];
        break;
    case PasswordStrength.MEDIUM:
        result = [COLORS.MEDIUM,COLORS.MEDIUM,COLORS.NEUTRAL,COLORS.NEUTRAL];
        break;
    case PasswordStrength.STRONG:
        result = [COLORS.STRONG,COLORS.STRONG,COLORS.STRONG,COLORS.STRONG];
        break;
    default: 
        result = [COLORS.WEAK,COLORS.WEAK,COLORS.WEAK,COLORS.WEAK];
    }

    return result; 

}

const CheckPasswordStrength = ({password}) => {
    const passwordStrength = testingPasswordStrength(password)
    // const Icon get Icon( passwordStrength);
    const colors = generateColors(passwordStrength);

    return (
        <>
            <Box display="flex" gap="5px" alignItems={"center"} justifyContent="center" margin="10px 0">
            {colors.map((color,index)=>
                ( <Box key={index} flex={1} bgcolor={color} borderRadius={"5px"} height="5px"></Box>)
            )}
            </Box>

            <Box display={'flex'} alignItems={"center"} justifyContent={"flex-start"} gap="5px" margin="0 0 15px 0">
                <Typography color={colors[0]}> {passwordStrength} </Typography>
            </Box>
            {
                passwordStrength !== PasswordStrength.STRONG && (
                    <>
                <Typography>
                    Include Special characters and Numbers
                </Typography>
                <Typography>
                    Include Capital and Small Letters
                </Typography>
                <Typography>
                    No smaller than 8 characters 
                </Typography>
                    </>
            )} 
        </>
    )
}
  

const Form = () => {
    const [pwd, setPwd] = useState("")
  return (
    <div>
        {/* <input onChange={(e)=>{
            console.log(setPwd(e.target.value))
        }} /> */}
        <CheckPasswordStrength password={pwd} />
    </div>
  )
}

export default CheckPasswordStrength