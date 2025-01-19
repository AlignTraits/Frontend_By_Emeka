
import AccountIcon from "../../assets/admin/icons/adminImage.png";
import {  FiUser } from "react-icons/fi";
import { useAuth } from "../../contexts/useAuth";

export default function Index() {
  const {admin} = useAuth()

  const loggedInAdmins = [
    {
      name: "Olamide Damilola",
      time: "19:27",
      image: AccountIcon,
      online: true,
    },
    {
      name: "Olamide Damilola",
      time: "19:27",
      image: AccountIcon,
      online: false,
    },
    {
      name: "Emmanuel Solomon",
      time: "18: 27",
      image: AccountIcon,
      online: true,
    },
    {
      name: "Samuel Emmanuel",
      time: "20: 27",
      image: AccountIcon,
      online: false,
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="basis-[65%] xl:basis-[70%] h-full"></div>
      <div className="basis-[35%] xl:basis-[30%] space-y-4">
        <div className="flex flex-col justify-center bg-[#E8EAEE] rounded-[30px] w-full space-y-2 p-5">
          {admin?.image ? (
            <img
              src={admin?.image ? admin.image : AccountIcon}
              alt=""
              className="mx-auto w-[100px] h-[100px]"
            />
          ) : (
            <FiUser className="mx-auto w-[100px] h-[100px]" />
          )}
          <h2 className="text-[#000000] text-[20px] font-[400] text-center">
            {admin?.username}
          </h2>
          <div>
            <h3 className="text-[#007AFF] text-[18px] text-center">2</h3>
            <p className="text-[#000000] text-[16px] font-semibold text-center">
              Hours spent
            </p>
          </div>
          <div>
            {" "}
            <h3 className="text-[#007AFF] text-[18px] text-center">15</h3>
            <p className="text-[#000000] text-[16px] font-semibold text-center">
              Actions made
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center mx-auto w-full px-5">
          <h2 className="text-[#000000] text-[20px] font-medium">
            Admin Sessions
          </h2>
          <div className="space-y-4">
            {loggedInAdmins.map((admin, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    {admin.image ? (
                      <img
                        src={admin.image}
                        alt=""
                        className="w-[50px] h-[50px] rounded-[50px]"
                      />
                    ) : (
                      <FiUser className="w-[50px] h-[50px] rounded-[50px]" />
                    )}
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                        admin.online ? "bg-[#13F721]" : "bg-[#D9D9D9]"
                      }`}
                    ></span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[#000000] text-[16px] font-semibold">
                      {admin.name}
                    </h3>
                    <p className="text-[#000000] text-[14px] font-medium">
                      Logged in {admin.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
