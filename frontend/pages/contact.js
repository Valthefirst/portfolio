import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_rkjvxdk", "template_m43grqc", form.current, {
        publicKey: "tvP0gYCgD3eSic_lv",
      })
      .then(
        (result) => {
          console.log("message sent...", result.text);
        },
        (error) => {
          console.log("message failed to send...", error.text);
        }
      );
  };

  return (
    <StyledContactForm>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" placeholder="Full Name" name="user_name" />
        <label>Email</label>
        <input type="email" placeholder="Your Email" name="user_email" />
        <label>Subject</label>
        <input type="text" placeholder="Subject Title" name="user_subject" />
        <label>Message</label>
        <textarea name="message" placeholder="Message Content" />
        <input type="submit"  value="Send" />
      </form>
    </StyledContactForm>
  );
};

export default Contact;

const StyledContactForm = styled.div`
width: 100%;
  max-width: 100%;
  margin: auto; /* Center the form horizontally */

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    height: 50%;
    font-size: 16px;

    input,
    textarea {
      width: 100%;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-height: 100%;
      min-height: 50%;
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }

  @media screen and (min-width: 50%) {
    max-width: 100%;
  }

  @media screen and (min-width: 50%) {
    max-width: 100%;
  }
`;