
import React from 'react';

const Form = () => {
  return (
    <form className="flex flex-col gap-4">
      <label className="flex flex-col">
        <span className="text-gray-700">Name</span>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"

        />
      </label>
    </form>
  )
}

export default Form;