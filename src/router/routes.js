import home from '@/views/home/route'
import about from '@/views/about/route'
import category from '@/views/category/route'

const result = [
  ...home,
  ...about,
  ...category
]


export default result