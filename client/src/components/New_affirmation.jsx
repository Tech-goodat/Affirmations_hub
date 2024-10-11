import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const New_affirmation = () => {
  const userName=sessionStorage.getItem('user_name')
  const navigate=useNavigate()
  const [newAffirmation, setNewAffirmation] = useState({
    hashtag: '',
    affirmation: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAffirmation((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    fetch('http://127.0.0.1:5555/affirmations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Ensure content type is correct
      },
      body: JSON.stringify(newAffirmation),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit form'); // Correct error handling
        }
        return response.json();
      })
      .then(data => {
        console.log('Affirmation added:', data); // Log the response for confirmation
        // Optionally reset the form or update the UI here
        setNewAffirmation({ hashtag: '', affirmation: '', date: '' }); // Reset form after submission
        navigate('/affirmations')
      })
      .catch(error => {
        console.error('Failed to fetch:', error);
      });
      
  };

  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <div className='flex items-center justify-center flex-col border rounded-lg p-9 mt-[100px] lg:shadow-md hover:border-green-900'>
        <div className='flex w-full items-center mt-[10px] justify-center'>
          <h1 className='text-sm text-center text-green-900 italic'>
            ~ Welcome <span className='font-bold'>Back.</span> Let's add that affirmation of STRENGTH ~
          </h1>
        </div>
        <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col mt-[100px] gap-5'>
          <input
            className='border outline-none rounded-md text-sm p-2 w-[350px]'
            type='text'
            onChange={handleChange}
            name='hashtag'
            value={newAffirmation.hashtag}
            placeholder='Add hashtag'
          />
          <input
            className='border outline-none rounded-md text-sm p-2 w-[350px]'
            type='text'
            onChange={handleChange}
            name='affirmation'
            value={newAffirmation.affirmation}
            placeholder='Add affirmation'
          />
          <input
            className='border outline-none rounded-md text-sm p-2 w-[350px]'
            type='text'
            onChange={handleChange}
            name='date'
            value={newAffirmation.date}
            placeholder='Enter date'
          />
          <button type='submit' className='flex items-center justify-center text-white border rounded-md w-[350px] lg:w-[200px] p-2 bg-orange-500 text-sm hover:bg-green-600'>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default New_affirmation;
