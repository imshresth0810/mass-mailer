import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const App = () => {
  const [sn, setSN] = useState("");
  const [se, setSE] = useState("");
  const [sub, setSub] = useState("");
  const [tex, setTex] = useState("");
  const [arr, setArr] = useState([""]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8000/mail/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "POST",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sn: sn,
          se: se,
          sub: sub,
          tex: tex,
          arr: [arr],
        }),
      });
      let resJson = await res.json();
      console.log(resJson);

      if (resJson.success === true) {
        setTimeout(() => {
          toast.success("All Email Sent Successfully", {
            position: "top-center",
          });
        }, 100);
      } else {
        toast.warn("Invalid Credentials", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form method="POST" onSubmit={handleSubmit}>
        <Stack
          spacing={3}
          style={{
            color: "#fff",
            backgroundColor: "rgba(155, 155, 155, 0.45)",
            borderRadius: "12px",
            border: "3px solid #6a3406",
            backdropFilter: "blur(6px) saturate(180%)",
            padding: "10px 10px",
          }}
        >
          <TextField
            sx={{ input: { color: "black" }, label: { color: "black" } }}
            fullWidth
            label="Sender Name"
            type="text"
            id="SenderName"
            value={sn}
            aria-describedby="emailHelp"
            onChange={(e) => setSN(e.target.value)}
            style={{ color: "#fff" }}
          />

          <TextField
            sx={{ input: { color: "black" }, label: { color: "black" } }}
            fullWidth
            label="Sender Email Address"
            type="email"
            id="SenderEmailAddress"
            value={se}
            aria-describedby="emailHelp"
            onChange={(e) => setSE(e.target.value)}
            style={{ color: "#fff" }}
          />

          <TextField
            sx={{ input: { color: "black" }, label: { color: "black" } }}
            fullWidth
            label="Recipients"
            type="array"
            id="Recipients"
            value={arr}
            aria-describedby="emailHelp"
            onChange={(e) => setArr(e.target.value)}
            style={{ color: "#fff" }}
          />

          <TextField
            sx={{ input: { color: "black" }, label: { color: "black" } }}
            fullWidth
            label="Subject"
            type="text"
            id="Subject"
            value={sub}
            aria-describedby="emailHelp"
            onChange={(e) => setSub(e.target.value)}
            style={{ color: "#fff" }}
          />

          <TextField
            sx={{ input: { color: "black" }, label: { color: "black" } }}
            fullWidth
            label="Text For Email"
            type="text"
            id="TextForEmail"
            value={tex}
            aria-describedby="emailHelp"
            onChange={(e) => setTex(e.target.value)}
            style={{ color: "#fff" }}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Send...
          </LoadingButton>
        </Stack>
        <ToastContainer />
      </form>
    </>
  );
};

export default App;
