import axios from 'axios'


export const handleSignup = async (email, password, name) => {
  try {
    const response = await axios.post('api/auth/signup',
      {
        email,
        password,
        name,
      })
    console.log(response.data)
    return { status: 200 }
  } catch (err) {
    console.log('Error during signup:', err)
    return { status: err.response.status }
  }
}


// export const handleLogin = async (email, password) => {
//   try {
//     const response = await axios.post('api/auth/login',
//       {
//         email,
//         password,
//       })
//     console.log(response.data)
//     return { status: 200 }
//   } catch (err) {
//     console.log('Error during login:', err)
//     return { status: err.response.status }
//   }
// }


// export const handleLogout = async () => {
//   try {
//     await axios.post('http://localhost:3000/api/auth/logout')
//     // console.log(response.data)
//   } catch (err) {
//     console.log('Error during logout:', err)
//   }
// }
