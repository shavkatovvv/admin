// import React from "react";
// import { Tabs, message } from "antd";
// import { CreateSubCategory } from "./Create-Sub-Category";
// import { CreateAttribute } from "./createAttribute";

// export const TabSub: React.FC = () => {
//     const [active, setActive] = React.useState<string>("1");

//     const handleTabChange = (key: string) => {
//         if (
//             (key === "2" && active === "1") ||
//             (key === "1" && active === "2")
//         ) {
//             message.warning(
//                 "Please complete the Category form before proceeding!"
//             );
//             return;
//         }
//         setActive(key);
//     };

//     return (
//         <Tabs
//             defaultActiveKey="1"
//             activeKey={active}
//             onChange={handleTabChange}
//             items={[
//                 {
//                     label: "Create-Sub-Category",
//                     key: "1",
//                     children: <CreateSubCategory setActive={setActive} />,
//                 },
//                 {
//                     label: "Attribute",
//                     key: "2",
//                     children: <CreateAttribute />,
//                 },
//             ]}
//         />
//     );
// };
