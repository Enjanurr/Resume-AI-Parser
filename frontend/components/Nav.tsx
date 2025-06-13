
const Navigation = () =>{
    return(
        <div className=" min-h-[50px] px-4 py-2 text-black border-b border-gray-300 flex justify-between ">
           <div className="text-white hover:text-gray-200 ml-10 cursor-pointer font-bold text-2xl">
           <a href="/"> Resume</a>
           </div>
           <div className=" text-white hover:text-gray-200 mr-10 cursor-pointer font-bold   text-2xl">
            Profile
           </div>
        </div>
    )
}
export default Navigation;