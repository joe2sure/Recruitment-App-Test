import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";

const Security = () => {
    const [toggleButton, setToggleButton] = useState({
    button1: true,
    button2: false,
    button3: false,
    button4: true,
    button5: false,
    });

    const handleToggle = (key) => {
    setToggleButton(prev => ({
        ...prev,
        [key]: !prev[key],
    }));
    };

    return(
        <section className="bg-white py-4 px-6">
            <div>
                <h4 className="font-semibold text-[16px] leading-[27px]">Authentication & Login</h4>
            </div>

            <div className="md:w-[40%] mt-4 flex items-center gap-6">
                <p className="security-text-two">Enable 2FA (Two-Factor-Auth)</p>
                <button
                  onClick={() => handleToggle("button1")}
                  className={`
                    relative inline-flex items-center h-6 w-12 rounded-full p-1
                    transition-colors duration-300 focus:outline-none
                    ${toggleButton.button1 ? "bg-[#46007A]" : "bg-gray-300"}`}
                >
                  <span
                    className={`
                      inline-block h-5 w-5 rounded-full bg-white shadow
                      transform transition-transform duration-300
                      ${toggleButton.button1 ? "translate-x-5" : "translate-x-0"}
                    `}
                  />
                </button>
            </div>

            <div className="my-6">
                <p className="security-text-two pb-4">Login Methods</p>
                <div className="flex flex-col md:flex-row gap-1 md:gap-12">
                    <div className="items-center flex gap-2">
                        <Checkbox className="w-4 h-4 data-[state=checked]:bg-[#46007A] data-[state=checked]:text-white" />
                        <p>Email & Password</p>
                    </div>
                    <div className="items-center flex gap-2">
                        <Checkbox className="w-4 h-4 data-[state=checked]:bg-[#46007A] data-[state=checked]:text-white" />
                        <p>Google Authentication</p>
                    </div>
                </div>
            </div>

            <div className="mt-6  grid grid-cols-1 gap-y-6 w-full lg:w-[50%]">
                <div className="grid grid-cols-6 gap-y-6 items-center">
                    <p className="col-span-4 lg:col-span-3 security-text-two">{`Force Logout After Inactivity (mins)`}</p>
                    <div>
                        <input type="text" value={`60 mins`}  className="border border-gray-300 rounded-[2px] p-2 w-[64px] h-7 text-xs" />
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-y-6 items-center">
                    <p className="col-span-4 lg:col-span-3 security-text-two">{`Lock Account After X Failed Attempts`}</p>
                    <div>
                        <input type="text" value={`3`} className="border border-gray-300 rounded-[2px] p-2 w-[64px] h-7 text-xs" />
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-y-6 items-center">
                    <p className="col-span-4 lg:col-span-3 security-text-two">{`Auto-Unlock Account After (mins)`}</p>
                    <div>
                        <input type="text" value={`120 mins`} className="border border-gray-300 rounded-[2px] p-2 w-[64px] h-7 text-xs" />
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-y-6 items-center">
                    <p className="col-span-2 md:col-span-4 lg:col-span-3 security-text-two">{`Logo Upload:`}</p>
                    <div className="col-span-4 md:col-span-2 lg:col-span-3">
                        {/* <input type="file" className="border border-gray-300 rounded-[2px] p-2 h-7 text-xs" /> */}
                        <input type="file" id="files" className="hidden"/>
                        <label for="files" className="text-[15px] font-medium text-[#46007A] border border-gray-300 rounded-[5px] px-2 py-2 cursor-pointer">Upload Image</label>
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-y-6 items-center">
                    <p className="col-span-2 md:col-span-4 lg:col-span-3 security-text-two">{`Support Email:`}</p>
                    <div className="col-span-4 md:col-span-2 lg:col-span-3 ">
                        <input type="text" placeholder="help@diamondiva.com" className="border border-gray-300 rounded-[5px] p-2 flex h-8 text-sm w-full" />
                    </div>
                </div>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
                <div className="grid gap-4">
                    <h1 className="font-semibold text-[18px] leading-[27px]">Admin Access Controls</h1>
                    <div className="grid grid-cols-2 mb-2">
                        <p className="col-span-1 security-text-two">{`Enable Role-Based Access Control (RBAC)`}</p>
                        <div className="col-span-1">
                            <button
                            onClick={() => handleToggle("button2")}
                            className={`
                                relative inline-flex items-center h-6 w-12 rounded-full p-1
                                transition-colors duration-300 focus:outline-none
                                ${toggleButton.button2 ? "bg-[#46007A]" : "bg-gray-300"}`}
                            >
                            <span
                                className={`
                                inline-block h-5 w-5 rounded-full bg-white shadow
                                transform transition-transform duration-300
                                ${toggleButton.button2 ? "translate-x-5" : "translate-x-0"}
                                `}
                            />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mb-2">
                        <p className="col-span-1 security-text-two"> Delete Role Permissions </p>
                        <div className="col-span-1">
                            <button className="text-[15px] font-medium hover:bg-[#46007A] text-[#46007A] hover:text-white border border-gray-300 rounded-[5px] px-6 py-1 cursor-pointer transition duration-300">
                                Edit
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mb-2">
                        <p className="col-span-1 security-text-two"> Audit Admin Activity </p>
                        <div className="col-span-1">
                            <button
                            onClick={() => handleToggle("button3")}
                            className={`
                                relative inline-flex items-center h-6 w-12 rounded-full p-1
                                transition-colors duration-300 focus:outline-none
                                ${toggleButton.button3 ? "bg-[#46007A]" : "bg-gray-300"}`}
                            >
                            <span
                                className={`
                                inline-block h-5 w-5 rounded-full bg-white shadow
                                transform transition-transform duration-300
                                ${toggleButton.button3 ? "translate-x-5" : "translate-x-0"}
                                `}
                            />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mb-2">
                        <p className="col-span-1 security-text-two">Export Admin Logs</p>
                        <div className="col-span-1">
                            <button className="text-[15px] font-medium hover:bg-[#46007A] text-[#46007A] hover:text-white border border-gray-300 rounded-[5px] px-2 py-1 cursor-pointer transition duration-300">
                                Download
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid gap-4">
                    <h4 className="font-semibold text-[18px] leading-[27px]">Sessions & Token Settings</h4>
                    <div className="grid grid-cols-2 mb-2">
                        <p className="col-span-1 security-text-two">{`Session Expiry Duration (mins)`}</p>
                        <div className="col-span-1">
                           <input type="text" value={`120 mins`} className="border border-gray-300 rounded-[2px] p-2 w-[72px] h-7 text-xs" /> 
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mb-2">
                        <p className="col-span-1 security-text-two">{`Refresh token Lifespan`}</p>
                        <div className="col-span-1">
                           <input type="text" value={`120 mins`} className="border border-gray-300 rounded-[2px] p-2 w-[72px] h-7 text-xs" /> 
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mb-2">
                        <p className="col-span-1 security-text-two">{`Block Multiple Sessions per User`}</p>
                        <div className="col-span-1">
                            <button
                            onClick={() => handleToggle("button4")}
                            className={`
                                relative inline-flex items-center h-6 w-12 rounded-full p-1
                                transition-colors duration-300 focus:outline-none
                                ${toggleButton.button4 ? "bg-[#46007A]" : "bg-gray-300"}`}
                            >
                            <span
                                className={`
                                inline-block h-5 w-5 rounded-full bg-white shadow
                                transform transition-transform duration-300
                                ${toggleButton.button4 ? "translate-x-5" : "translate-x-0"}
                                `}
                            />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mb-2">
                        <p className="col-span-1 security-text-two">{`Enable Session Logging`}</p>
                        <div className="col-span-1">
                            <button
                                onClick={() => handleToggle("button5")}
                                className={`
                                    relative inline-flex items-center h-6 w-12 rounded-full p-1
                                    transition-colors duration-300 focus:outline-none
                                    ${toggleButton.button5 ? "bg-[#46007A]" : "bg-gray-300"}`}
                                >
                                <span
                                    className={`
                                    inline-block h-5 w-5 rounded-full bg-white shadow
                                    transform transition-transform duration-300
                                    ${toggleButton.button5 ? "translate-x-5" : "translate-x-0"}
                                    `}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Security