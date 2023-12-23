"use client";

import React from 'react'
import { z } from 'zod'
import { userSchema } from '@/app/validationSchemas'
import { Button, Callout, Card, Flex, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import axios from 'axios';
import Spinner from '@/app/components/Spinner';


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
  // Always propagates user exists error when we might have other issues.
  const [authError, setAuthError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data: AuthFormData) => {
    try {
      setIsSubmitting(true);
      await axios.post('/api/register', data);
      router.push('/');
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setAuthError("User already exists with that email.");
    }
  })

  return (
    <div className="flex flex-col items-center content-center m-auto">
      <Card className="max-w-xl w-full p-5">
        {Object.keys(errors).length > 0 && <Callout.Root color="red" className='mb-5 max-w-xl w-full'>
          <Callout.Text>{errors.name?.message}</Callout.Text>
          <Callout.Text>{errors.email?.message}</Callout.Text>
          <Callout.Text>{errors.password?.message}</Callout.Text>
        </Callout.Root>}
        {authError && <Callout.Root color="red" className='mb-5 max-w-xl w-full'>
          <Callout.Text>{authError}</Callout.Text>
        </Callout.Root>}
        <form className="max-w-xl w-full" onSubmit={onSubmit}>
          <Flex direction="column" gap="4">
            <label>Full Name
              <TextField.Input
                type="text"
                placeholder="Name"
                className="m-1"
                {...register("name", { required: true, minLength: 3, maxLength: 80 })}
              />
            </label>
            <label>Email
              <TextField.Input
                type="email"
                placeholder="Email"
                className="m-1"
                {...register("email", { required: true, minLength: 3 })}
              />
            </label>
            <label>Password
              <TextField.Input
                type="password"
                placeholder="Password"
                className="m-1"
                {...register("password", { required: true, minLength: 3 })}
              />
            </label>
            <Button type="submit" className="m-1">
              51  `````
              `
              {isSubmitting && <Spinner />}
            </Button>
          </Flex>
        </form>
      </Card>
    </div>
  )
}

export default AuthForm;
