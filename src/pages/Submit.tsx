import { TextField } from "@mui/material";
import React, { FC, useState } from "react";
import { checkNewReq, submit } from "../http/userApi";
import { useStore } from "../store/store";
import { SubmitCredentials } from "../types/userTypes";

import styles from "./style.module.css";
function validateEmail(email: string | undefined): boolean {
  if (typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function removeDashes(input: string): string {
  return input.replace(/-/g, "");
}
function numberMask(number: string): string {
  let inputValue = number;

  // Оставляем только цифры
  inputValue = inputValue.replace(/\D/g, "");

  // Применяем маску "12-34-56-78"
  inputValue = inputValue.replace(/(\d{2})(?=\d{2,})/g, "$1-");

  return inputValue;
}
const initFormState = {
  email: "",
  number: "",
};
const Submit: FC = () => {
  const { data, setData, isFetched } = useStore();
  const [fetched, setFetched] = useState<boolean>(false);
  const [formData, setFormData] = useState<SubmitCredentials>(initFormState);
  const handlerForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "number" ? numberMask(value) : value,
    }));
  };
  const handleSubmit = async () => {
    const dataForSend: SubmitCredentials = { email: "" };
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        const element = formData[key];
        if (key === "email" && (!validateEmail(element) || !element)) {
          alert("Email is not valid");
        } else if (key === "email" && element) {
          dataForSend[key] = element;
        } else if (key === "number" && element) {
          dataForSend[key] = removeDashes(element);
        }
      }
    }
    if (fetched) {
      checkNewReq();
    } else {
      setFetched(true);
    }
    try {
      submit(dataForSend).then((dt) => {
        setData(dt);
        setFetched(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`d-flex align-items-center flex-column justify-content-center ${styles.login_wrapper}`}
    >
      <div
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            handleSubmit();
          }
        }}
        className={styles.container}
      >
        <>
          <h4 className="mb-3 text-center">Форма</h4>
          <div className={styles.form}>
            <TextField
              type="text"
              label="Email:"
              name="email"
              color="secondary"
              variant="outlined"
              className="mb-3 bg-white"
              value={formData.email}
              onChange={handlerForm}
            />
            <TextField
              disabled={false}
              type="text"
              label="Number:"
              name="number"
              color="secondary"
              variant="outlined"
              value={formData.number}
              onChange={handlerForm}
              className="mb-3"
            />
            {isFetched && !data.result && (
              <p className={`${styles.error_message}`}>{data.message}</p>
            )}
            <div>
              {isFetched && data.result && data.data && (
                data.data.map(i =>
                <div className={`${styles.success_message}`}>
                  <p className="m-0">Email: {i.email}</p>
                  <p className="m-0">Number: {i.number}</p>
                  <hr/>
                </div>
                )
              )}
            </div>
            <button
              className={`${styles.btn}`}
              type="button"
              onClick={handleSubmit}
            >
              Отправить
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default Submit;
