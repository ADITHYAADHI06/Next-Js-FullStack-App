"use client"
// import { useRouter } from 'next/navigation'
// import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation';

const page = () => {
    const searchParams = usePathname();
    // console.log(searchParams.split("/")[2]);
    
  return (
    <div>profile {searchParams.split("/")[2]}</div>
  )
}

export default page