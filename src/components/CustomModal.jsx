// import React from "react";
// import { Box, Modal } from "@mui/material";

export const customModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // bgcolor: "background.paper",
  // boxShadow: 24,
  backgroundColor: "rgba(10, 20, 2, 0)",
  backdropFilter: "saturate(100%) blur(10px)",
  // boxShadow: "inset 0 -1px 0 0 hsla(0,0%,100%,.1)",
  boxShadow: 24,
  py: 4,
  px: 4,
  border: "1px solid  hsla(0,0%,100%,.2)",
};

// const CustomModal = ({ open, setOpen, children, label, desc }) => {
//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     // bgcolor: "background.paper",
//     // boxShadow: 24,
//     backgroundColor: "rgba(10, 20, 2, 0)",
//     backdropFilter: "saturate(100%) blur(5px)",
//     // boxShadow: "inset 0 -1px 0 0 hsla(0,0%,100%,.1)",
//     boxShadow: 24,
//     py: 4,
//     px: 4,
//     border: "1px solid  hsla(0,0%,100%,.2)",
//   };

//   return (
//     <React.Fragment>
//       <Modal
//         open={open}
//         onClose={() => setOpen(false)}
//         aria-labelledby="post-modal"
//         aria-describedby="use-this-to-post"
//         closeAfterTransition
//         // BackdropComponent={Backdrop}
//         // BackdropProps={{
//         //   timeout: 500,
//         // }}
//       >
//         {/* <Fade in={open}> */}
//         <Box sx={{ ...style }}>{children}</Box>
//         {/* </Fade> */}
//       </Modal>
//     </React.Fragment>
//   );
// };

// export default CustomModal;
