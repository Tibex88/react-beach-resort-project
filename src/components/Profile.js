import React from 'react'
import { withUserConsumer } from "../context/userContext";


function Profile ({ context }) {
    const {firstName, lastName, role} = context
  return (
    <div>
        {firstName + "" + lastName+","+ role }
    </div>
  )
}

export default withUserConsumer(Profile); 