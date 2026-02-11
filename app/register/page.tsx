"use client";

import {
  Stack,
  VStack,
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
import { ItemList } from "@/components/ItemList";
import { signActionServer } from "@/services/signActionServices";
import { useRouter } from "next/navigation";
import axios from "axios";

// フォームで使用する変数の型を定義
type FormInputs = {
  name: string;
  kana: string;
  gender: number;
  birthday: string;
  email: string;
  password: string;
  confirm: string;
  phone?: string;
};

export default function RegisterIndex() {
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
    // 並列取得
    const [register] = await Promise.all([
      fetch(`/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(data),
      }),
    ]);
    const res = await register.json();
    console.log(register);
    if (register.status === 200) {
      router.push("/");
      router.refresh(); // ← これ超重要！！
    }
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Stack spacing={4} py="4rem" px="2rem" h="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">名前</FormLabel>
          <Input
            id="name"
            {...register("name", {
              // 後でバリデーション追加
              required: "入力してください",
            })}
            placeholder="名前を入力してください"
          />
          <Text color="red.500" fontSize="sm" minHeight="1.5rem">
            {errors.name?.message || ""}
          </Text>
        </FormControl>

        <FormControl isInvalid={!!errors.kana}>
          <FormLabel htmlFor="kana">カナ</FormLabel>
          <Input
            id="kana"
            {...register("kana", {
              // 後でバリデーション追加
              required: "入力してください",
            })}
            placeholder="カタカナを入力してください"
          />
          <Text color="red.500" fontSize="sm" minHeight="1.5rem">
            {errors.kana?.message || ""}
          </Text>
        </FormControl>

        <FormControl isInvalid={!!errors.gender}>
          <FormLabel htmlFor="gender">性別</FormLabel>
          <Input
            id="gender"
            {...register("gender", {
              // 後でバリデーション追加
              required: "数字で入力してください 例: 0=男性, 1=女性",
              pattern: {
                value: /^\d$/,
                message: "数字で入力してください 例: 0=男性, 1=女性",
              },
            })}
            placeholder="0"
          />
          <Text color="red.500" fontSize="sm" minHeight="1.5rem">
            {errors.gender?.message || ""}
          </Text>
        </FormControl>

        <FormControl isInvalid={!!errors.birthday}>
          <FormLabel htmlFor="birthday">生年月日</FormLabel>
          <Input
            id="birthday"
            {...register("birthday", {
              // 後でバリデーション追加
              required: "入力してください 例: 1990-01-01",
            })}
            placeholder="1990-01-01"
          />
          <Text color="red.500" fontSize="sm" minHeight="1.5rem">
            {errors.birthday?.message || ""}
          </Text>
        </FormControl>

        <FormControl isInvalid={!!errors.phone}>
          <FormLabel htmlFor="phone">携帯電話番号</FormLabel>
          <Input
            id="phone"
            {...register("phone", {
              // 後でバリデーション追加
              // required: "入力してください",
              pattern: {
                value: /^(070|080|090)\d{8}$/,
                message: "070, 080, 090から始まる携帯電話を入力してください",
              },
            })}
            placeholder="090-0000-0000"
          />
          <Text color="red.500" fontSize="sm" minHeight="1.5rem">
            {errors.phone?.message || ""}
          </Text>
        </FormControl>

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
        <FormControl isInvalid={!!errors.confirm}>
          <FormLabel htmlFor="confirm">パスワードを再入力</FormLabel>
          <InputGroup size={"md"}>
            <Input
              id="confirm"
              {...register("confirm", {
                // 後でバリデーション追加
                required: "入力してください",
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
                validate: (value) =>
                  value === getValues("password") || "パスワードが一致しません",
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
            {errors.confirm?.message || ""}
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
