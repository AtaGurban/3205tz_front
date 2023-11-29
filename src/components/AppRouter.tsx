import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import Submit from "../pages/Submit";
import { SUBMIT_PAGE } from "../utils/pathConsts";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={SUBMIT_PAGE} element={<Submit/>} />
      <Route
        path="/*"
        element={<Navigate to={SUBMIT_PAGE} />}
      />
    </Routes>
  );
};

export default AppRouter;
