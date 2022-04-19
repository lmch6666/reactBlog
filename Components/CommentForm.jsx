import React, { useState, useEffect, useRef } from 'react'
import { submitData } from '../service/index'

const CommentForm = ({ slug, set }) => {

  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({ name:' ', email:' ', comment:' ', storeData:false});

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') === undefined && window.localStorage.getItem('email') === undefined 
    };
    setFormData(initData);
  }, [])

  const onInputChange = (event) => {
    const { target } = event;
    if (target.type === 'checkbox') {
      console.log(formData[target.name]);
      setFormData( (prev) => {
        return {
          ...prev,
          [target.name]: !prev.storeData
        }
      })
    } else {
      setFormData( (prev) => {
        return {
          ...prev,
          [target.name]: target.value
        }
      })

    }
  }

  const handlePostSubmission = () => {
    setError(false);

    const {name, email, comment, storeData} = formData;
    if (!name || !email || !comment) {
      setError(true);
      return;
    }

    const sendData = {
      name,
      email,
      comment,
      slug
    };

    if (storeData) {
      localStorage.setItem('name');
      localStorage.setItem('email');
    }else{
      console.log(localStorage);
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    submitData(sendData).then(res => {
      if (res.createComment) {
        formData.name = ' ';
        formData.email = ' ';
      }
      formData.comment = ' ';
      setFormData((prev) => ({
          ...prev,
          ...formData
        }));
        setShowMessage(true);
        set(formData.comment);
        setTimeout(() => {
          setShowMessage(false);
        }, 1500);
    })
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
    <h3 className="text-xl mb-8 font-semibold border-b pb-4">不妨留下你滴评论</h3>
    <div className="grid grid-cols-1 gap-4 mb-4">
      <textarea value={formData.comment || ' '} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Comment" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <input type="text" value={formData.name || ' '} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="name" />
      <input type="email" value={formData.email || ' '} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="email" />
    </div>
    <div className="grid grid-cols-1 gap-4 mb-4">
      <div>
      <input checked={formData.storeData} onChange={onInputChange} type="checkbox" id="storeData" name="storeData" value={formData.storeData} />
        <label className="text-gray-500 cursor-pointer" htmlFor="storeData"> 保存我的信息到下一次提交。</label>
      </div>
    </div>
    {error && <p className="text-xs text-red-500">不能有空项！！！</p>}
    <div className="mt-8">
      <button type="button" onClick={handlePostSubmission} className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">评论</button>
      {showMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">评论成功！！</span>}
    </div>
  </div>
  )
}

export default CommentForm
