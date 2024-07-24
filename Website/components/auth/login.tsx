"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Input, Button, Checkbox, Spacer } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const Login = () => {
  const router = useRouter();

  const initialValues: LoginFormType = {
    username: "",
    password: "",
    rememberMe: false,
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      // `values` contains email & password. You can use provider to connect user

      await createAuthCookie();
      router.replace("/");
    },
    [router]
  );

  return (
    <div className="flex justify-center items-center h-screen bg-light">
      <div className="w-7/8 flex flex-col items-center">
        <div className="text-center text-[25px] font-bold mb-6 w-full">
          <img src="logo.png" alt="Logo" className="mx-auto mb-4" />
          <h1>Welcome back to Brainer</h1>
          <p className="text-gray-500 text-base font-normal">
            Login to your account and continue training your brain.
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form className="w-full flex flex-col items-center">
              <div className="flex flex-col w-full gap-4 mb-4">
                <Input
                  variant="bordered"
                  label="Username"
                  type="text"
                  value={values.username}
                  onChange={handleChange("username")}
                />
                <Input
                  variant="bordered"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange("password")}
                />
              </div>
              <div className="flex w-full justify-between items-center mb-4">
                <Checkbox
                  className="text-gray-500 text-base font-normal"
                  checked={values.rememberMe}
                  onChange={handleChange("rememberMe")}
                >
                  Remember me
                </Checkbox>
                <Link
                  href="/forgot-password"
                  className="text-blue-500 text-sm font-bold"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                onPress={() => handleSubmit()}
                variant="flat"
                color="primary"
                className="w-full"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <div className="font-light text-slate-400 mt-4 text-sm w-2/3 text-center">
          Don&apos;t have an account ?{" "}
          <Link href="/register" className="font-bold text-blue-500">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
