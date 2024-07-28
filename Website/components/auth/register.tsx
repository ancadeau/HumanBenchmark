"use client";

import { RegisterSchema } from "@/helpers/schemas";
import { RegisterFormType } from "@/helpers/types";
import { Input, Button, DateInput, DateValue } from "@nextui-org/react";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import Image from "next/image";
import logo from "@/public/logo.png";
import {register} from "@/utils/api";

export const Register = () => {
  const router = useRouter();

  const initialValues: RegisterFormType = {
    username: "",
    password: "",
    confirmPassword: "",
    dob: parseDate("2000-01-01"),
  };

  const handleRegister = useCallback(
    async (values: RegisterFormType) => {
      const response = await register(values.username, values.password, values.dob);
      const data = await response.json();
      if (response.ok) {
        router.push("/wdp/Group3/index.html");
      } else if (response.status == 307 && response.headers.has("Location")) {
        router.push(response.headers.get("Location")!);
      } else {
        console.log(data.error);
      }
    },
    [router]
  );

  return (
    <div className="flex justify-center items-center h-screen bg-light">
      <div className="w-7/8 flex flex-col items-center">
        <div className="text-center text-[25px] font-bold mb-6 w-full">
          <Image
            src={logo}
            alt="Logo"
            className="mx-auto mb-4"
          />
          <h1>Welcome to Brainer</h1>
          <p className="text-gray-500 text-base font-normal">
            Sign up now and get full access to our brain tester.
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form className="w-full flex flex-col items-center">
              <div className="flex flex-col w-full gap-4 mb-4">
                <Input
                  isRequired
                  variant="bordered"
                  label="Username"
                  type="text"
                  isInvalid={!!errors.username}
                  onChange={handleChange("username")}
                />
                <Input
                  isRequired
                  variant="bordered"
                  label="Password"
                  type="password"
                  isInvalid={!!errors.password && !!touched.password}
                  errorMessage={errors.password}
                  onChange={handleChange("password")}
                />
                <Input
                  isRequired
                  variant="bordered"
                  label="Confirm Password"
                  type="password"
                  isInvalid={
                    !!errors.confirmPassword && !!touched.confirmPassword
                  }
                  errorMessage={errors.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                />
                <DateInput
                  isRequired
                  variant="bordered"
                  label="Date of Birth"
                  labelPlacement="outside-left"
                  maxValue={today(getLocalTimeZone())}
                  minValue={parseDate("1900-01-01")}
                  onChange={(value: DateValue) =>
                    handleChange("dob")(value.toString())
                  }
                />
              </div>
              <Button
                onPress={() => handleSubmit()}
                variant="flat"
                color="primary"
                className="w-full"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <div className="font-light text-slate-400 mt-4 text-sm w-2/3 text-center">
          Already have an account ?{" "}
          <Link href="/login" className="font-bold text-blue-500">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};
