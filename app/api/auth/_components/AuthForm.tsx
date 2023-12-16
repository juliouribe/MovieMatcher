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
      email: '',
      password: ''
    },
    resolver: zodResolver(userSchema)
  });
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: AuthFormData) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      router.push('/api/auth/signin');
    } catch (error: any) {
      setAuthError(error.message);
    }
  }


  return (
    <div className="flex justify-center">
      <form className="max-w-xl w-full">
        <Flex direction="column" gap="4">
          <label htmlFor="Name">Name
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField.Input
                  type="text"
                  placeholder="Name"
                  className="mb-2"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                />
              )}
            />
          </label>
          <label htmlFor="email">Email
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField.Input
                  type="email"
                  placeholder="Email"
                  className="mb-2"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                />
              )}
            />
          </label>
          <label htmlFor="password">Password
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField.Input
                  type="password"
                  placeholder="Password"
                  className="mb-2"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                />
              )}
            />
          </label>
          <Button type="submit" className="mb-2">Submit</Button>
        </Flex>
      </form>
    </div>
  )
}

export default AuthForm;
