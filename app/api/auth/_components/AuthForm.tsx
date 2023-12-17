"use client";

import React from 'react'
import { z } from 'zod'
import { userSchema } from '@/app/validationSchemas'
import { Button, Callout, Flex, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

type AuthFormData = z.infer<typeof userSchema>;

const AuthForm = () => {
  const router = useRouter();
  const {
    register, handleSubmit, control, formState: { errors }
  } = useForm<AuthFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
    resolver: zodResolver(userSchema)
  });
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  console.log(errors);
  const onSubmit = handleSubmit(async (data: AuthFormData) => {
    console.log(data);
    // try {
    //   const res = await fetch('/api/auth/signup', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //   });
    //   const json = await res.json();
    //   if (!res.ok) throw new Error(json.message);
    //   router.push('/api/auth/signin');
    // } catch (error) {
    //   setAuthError("An error occurred while signing up.");
    // }
  })

  return (
    <div className="flex flex-col items-center">
      {Object.keys(errors).length > 0 && <Callout.Root color="red" className='mb-5 max-w-xl w-full'>
        <Callout.Text>{errors.name?.message}</Callout.Text>
        <Callout.Text>{errors.email?.message}</Callout.Text>
        <Callout.Text>{errors.password?.message}</Callout.Text>
      </Callout.Root>}
      <form className="max-w-xl w-full" onSubmit={onSubmit}>
        <Flex direction="column" gap="4">
          <label>Full Name
            <Controller
              control={control}
              {...register("name", { required: true, minLength: 3, maxLength: 80 })}
              render={({ field }) => (
                <TextField.Input
                  type="text"
                  placeholder="Name"
                  className="m-1"
                  {...field}
                />
              )}
            />
          </label>
          <label>Email
            <Controller
              control={control}
              {...register("email", { required: true, minLength: 3 })}
              render={({ field }) => (
                <TextField.Input
                  type="email"
                  placeholder="Email"
                  className="m-1"
                  {...field}
                />
              )}
            />
          </label>
          <label>Password
            <Controller
              control={control}
              {...register("password", { required: true, minLength: 8 })}
              render={({ field }) => (
                <TextField.Input
                  type="password"
                  placeholder="Password"
                  className="m-1"
                  {...field}
                />
              )}
            />
          </label>
          <Button type="submit" className="m-1">Submit</Button>
        </Flex>
      </form>
    </div>
  )
}

export default AuthForm;
