import axios from "axios";
import { useEffect, useState } from "react";
import { GrMailOption } from "react-icons/gr"
import { BsTelephone } from "react-icons/bs"
import { FiMapPin } from "react-icons/fi"

function App() {
  const [list, Setlist] = useState([])
  const [data, SetData] = useState({})
  const url = "https://randomuser.me/api";

  function Adduser() {
    if (list) {
      if (list.filter(x => x.data.login.uuid === data.login.uuid).length === 0) {
        Setlist([...list, {data}]);
      }
    }
    console.log(list);
  }

  const GetData = async () => {
    const {data} = await axios(url)
    console.log(data.results[0]);
    SetData(data.results[0])
  }

  useEffect(() => {
    GetData();
  }, [])

  const { name, dob, email, phone, picture, location, registered } = data;

  return (
    <div className="h-screen bg-gray-800 flex items-center justify-center overflow-hidden">
      <div className="w-[800px] h-[900px] flex flex-col items-center bg-gray-900 rounded-lg">
        <h1 className="text-2xl mt-5 text-white">Random User V2</h1>
        <div className="w-[90%] h-[100px] flex flex-row items-center justify-between mt-10">
          <img src={picture?.large} alt="Profile Pic." className="w-[150px] h-[150px] rounded-full"/>
          <h1 className="text-3xl text-white">{name?.title}. {name?.first} {name?.last}</h1>
        </div>
        <div className="w-[90%] h-[80px] flex flex-row items-center justify-between mt-10">
          <GrMailOption className="w-[50px] h-[50px]"/>
          <h1 className="text-xl text-white">{email}</h1>
        </div>
        <div className="w-[90%] h-[80px] flex flex-row items-center justify-between mt-10">
          <BsTelephone className="w-[50px] h-[50px]"/>
          <h1 className="text-xl text-white">+{phone}</h1>
        </div>
        <div className="w-[90%] h-[80px] flex flex-row items-center justify-between mt-10">
          <FiMapPin className="w-[50px] h-[50px]"/>
          <h1 className="text-xl text-white">{location?.country}/{location?.city}</h1>
        </div>
        <div className="flex flex-row items-center justify-evenly w-[90%] h-[50px]">
          <button className="text-xl bg-white p-2 rounded-lg hover:scale-90 transition-all duration-300" onClick={() => GetData()}>Random User</button>
          <button className="text-xl bg-white p-2 rounded-lg hover:scale-90 transition-all duration-300" onClick={() => Adduser()}>Add User</button>
        </div>
        <div className="w-[90%] h-[250px] flex flex-col gap-3 overflow-y-scroll">
          {list?.map((user) => (
            <div className="w-[100%] h-[75px] items-center flex flex-row justify-between" key={user?.data.name.first}>
              <img src={user?.data.picture.medium} alt="profile pic. list" className="rounded-full" />
              <h1 className="text-lg text-white">{user?.data.name.title}. {user?.data.name.first} {user?.data.name.last}</h1>
              <div className="w-[30%] h-[50%] flex flex-col items-start justif-center">
                <h1 className="text-sm text-white">{user?.data.email}</h1>
                <h1 className="text-sm text-white">{user?.data.phone}</h1>
              </div>
              <h1 className="text-xl text-white mr-5">{user?.data.location.city}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
