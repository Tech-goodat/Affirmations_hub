import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';



const Home = () => {
  const navigate=useNavigate()
  const [newUser, setNewUser] = useState({
    user_name:'',
    age:''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit =(e)=>{
    e.preventDefault()

    fetch(`http://127.0.0.1:5555/users`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newUser)

    })
    .then(response=>{
      if(!response.ok){
        throw new error ('failed to create user')
      }
    })
    .then(data=>{
      console.log('user created successfully........', data)
      setNewUser({user_name:'', age:''})
      
      navigate('/affirmations')
    })

    .catch(error=>{console.error('error creating user', error)})
  }

  return (
    <div className='flex flex-col lg:grid w-full lg:grid-cols-2 items-center justify-center'>
      <div className='mt-8 flex items-center justify-center'>
      <img className='w-[300px] h-[300px] lg:w-[500px] lg:h-[500px]' src='/src/assets/tom.png' alt='cat picture'/>
      </div>
      <div className='flex flex-col text-green-950 mt-2 lg:mt-8 items-center justify-center lg:shadow-md lg:border h-full lg:mr-8 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
        <h1 className='text-center  font-bold text-xl'>Hi There </h1>
        <h2 className='text-center font-bold text-lg'>Glad you came around</h2>
        <h3 className='text-center font-bold'>Let's know your name so we can Salute you  better</h3>
        </div>
        <div className='flex flex-col items-center justify-center mt-2 lg:mt-8'>
          <form onSubmit={handleSubmit} className='flex  gap-6 flex-col items-center justify-center'>
            <input name='user_name' value={newUser.user_name} onChange={handleChange} className='border rounded-md p-2 w-[350px] lg:w-[400px] text-sm outline-none' type='text' placeholder='Enter your name ...' />
            <input name='age' value={newUser.age} onChange={handleChange} className='border rounded-md p-2 w-[350px] lg:w-[400px] text-sm outline-none' type='text' placeholder='Enter your age ...' />
            <button  className='border rounded-md w-[350px] lg:w-[100px] p-1 text-sm mt-2 lg:mt-9 bg-orange-600 hover:shadow-md hover:bg-green-900 text-white'>Submit</button>
          </form>
        </div>
        <div className='flex w-full items-center justify-center mt-[50px] lg:mt-[100px]'><p className='text-sm'>Created by ~GoodAt</p></div>
        
      </div>
      
      </div>
  )
}

export default Home