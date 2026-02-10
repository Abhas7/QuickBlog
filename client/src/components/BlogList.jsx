import React from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from 'framer-motion'
import Blogcard from './Blogcard'
import { useAppContext } from '../context/AppContext'


const BlogList = () => {
  const { blogs, input, menu, setMenu } = useAppContext();

  const filteredBlogs = () => {
    if (input === '') {
      return blogs;
    }
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase()) ||
      (blog.subTitle && blog.subTitle.toLowerCase().includes(input.toLowerCase()))
    )
  }


  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {blogCategories.map((item) => (
          <div key={item} className='relative'>
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 focus:outline-none ${menu === item ? 'bg-primary text-white rounded-full px-6 py-2 flex items-center justify-center text-sm font-semibold transition-all' : 'bg-transparent'} `}
            >
              {item}
              {menu === item && (
                <motion.div layoutId='underline'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'></motion.div>
              )}
              <div>

              </div>
            </button>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {(() => {
          const blogsToDisplay = filteredBlogs().filter((blog) => {
            const isTestBlog = blog.title.toLowerCase().includes('test');
            if (menu !== 'All' && input === '' && isTestBlog) return false;
            return menu === "All" ? true : blog.category === menu;
          });

          if (blogsToDisplay.length === 0) {
            return (
              <div className='col-span-full text-center py-20'>
                <p className='text-gray-500 text-lg'>No blogs found matching "{input}"</p>
                <button
                  onClick={() => { setInput(''); setMenu('All') }}
                  className='mt-4 text-primary font-medium hover:underline cursor-pointer'
                >
                  Clear all filters
                </button>
              </div>
            );
          }

          return blogsToDisplay.map((blog) => <Blogcard key={blog._id} blog={blog} />);
        })()}
      </div>
    </div>

  )
}

export default BlogList