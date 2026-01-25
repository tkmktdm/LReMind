"use client";

import {
  Stack,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  // FormErrorMessageを追加
  FormErrorMessage,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import React from "react";
import axios from "axios";
import { signActionServer } from "@/services/signActionServices";
import { useRouter } from "next/navigation";

// フォームで使用する変数の型を定義
type FormInputs = {
  email: string;
  password: string;
  // passwordConfirm: string;
};

export default function LoginIndex() {
  const router = useRouter();

  // React Hook Formでバリデーションやフォームが送信されたときの処理などを書くために必要な関数
  const {
    handleSubmit,
    register,
    // getValuesを追加
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    const signAction = new signActionServer();
    const response = await signAction.postLogin(data);

    if (response.status == 200) {
      console.log(response.data);
      // const user = response.data.user ?? "";
      // localStorage.setItem("user", JSON.stringify(user)); // JSON文字列化
      router.push("/");
      router.refresh(); // ← これ！！！！！
    } else {
      console.log(response);
    }
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Stack spacing={4} py="4rem" px="2rem" h="70vh">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">メールアドレス</FormLabel>
          <Input
            id="email"
            {...register("email", {
              // 後でバリデーション追加
              required: "メールを入力してください",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "有効なメールアドレスを入力してください",
              },
            })}
            placeholder="example@mail.com"
          />
          <Text color="red.500" fontSize="sm" minHeight="1.5rem">
            {errors.email?.message || ""}
          </Text>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">パスワード</FormLabel>
          <InputGroup size={"md"}>
            <Input
              id="password"
              {...register("password", {
                // 後でバリデーション追加
                required: "パスワードを入力してください",
                minLength: {
                  value: 8,
                  message: "8文字以上で入力してください",
                },
                maxLength: {
                  value: 32,
                  message: "32文字以上で入力してください",
                },
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message: "半角英数字で入力してください",
                },
              })}
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter Password"
            />
            <InputRightElement width={"4.5rem"}>
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Text color="red.500" fontSize="sm" minHeight="1.5rem">
            {errors.password?.message || ""}
          </Text>
        </FormControl>
        <br />
        <Button
          width={"4.5rem"}
          colorScheme="blue"
          type="submit"
          isLoading={isSubmitting}
          // variant={"solid"}
          // onSubmit={onSubmit}
        >
          送信
        </Button>
      </form>
    </Stack>
  );
}
