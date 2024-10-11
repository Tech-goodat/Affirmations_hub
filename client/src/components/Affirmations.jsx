import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Affirmations = () => {
  const [affirmations, setAffirmations] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/affirmations')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch affirmations');
        }
        return response.json();
      })
      .then((data) => {
        setAffirmations(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5555/affirmations/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete affirmation');
        }
        setAffirmations((prevAffirmations) =>
          prevAffirmations.filter((affirmation) => affirmation.id !== id)
        );
        console.log(`Affirmation with ID ${id} deleted successfully`);
      })
      .catch((error) => {
        console.error('Error deleting affirmation:', error);
      });
  };

  return (
    <div className='flex flex-col'>
      <div className='flex w-full items-center justify-center mt-11'>
        <h1 className='flex text-center items-center text-green-600 italic justify-center'>
          ~ Welcome Pick an affirmation and walk by it through the day ~
        </h1>
      </div>
      <div className='flex flex-col w-full items-center justify-center mt-11'>
        <Link to='/new_affirmation'>
          <button className='border rounded-md p-2 w-[200px] font-bold text-sm text-white hover:bg-green-500 bg-orange-400'>
            Add new affirmation
          </button>
        </Link>
        <div className='w-full flex flex-col lg:grid lg:grid-cols-4 lg:gap-4'>
          {affirmations.map((affirmation) => (
            <div
              className='w-full lg:p-5 flex flex-col items-center justify-center mt-5 lg:border rounded-lg lg:shadow-md bg-pink-50 hover:bg-pink-200'
              key={affirmation.id}
            >
              <img
                className='w-[250px] h-[250px]'
                src='/src/assets/tom.png' // Ensure this path is correct
                alt='Affirmation'
              />
              <hr className='w-full mt-4 text-green-900 flex' />
              <h2 className='font-bold text-xl text-green-700'>
                {affirmation.hashtag}
              </h2>
              <h1 className='font-bold text-lg mt-2'>{affirmation.date}</h1>
              <p className='text-center text-sm italic'>{affirmation.affirmation}</p>
              <div className='w-full flex items-center justify-center mt-5 p-2 gap-4'>
                <button className='flex text-white text-sm w-[100px] items-center justify-center bg-green-500 rounded-md p-1 hover:bg-green-700'>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(affirmation.id)}
                  className='flex text-white text-sm w-[100px] items-center justify-center bg-red-500 rounded-md p-1 hover:bg-red-700'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Affirmations;
