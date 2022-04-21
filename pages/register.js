import { Controller, useForm } from 'react-hook-form';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.scss';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';
import { Store } from '../utils/Store';
import { useSnackbar } from 'notistack';
import { environment } from '../environment/environment';

export default function LoginScreen() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (userInfo) {
      router.push(redirect || '/');
    }
  }, [router, userInfo, redirect]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async ({
    username,
    name,
    email,
    password,
    confirmPassword,
  }) => {
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: 'error' });
      return;
    }
    try {
      const jsonData = {
        username,
        name,
        email,
        password,
      };

      fetch(`${environment.baseUrl}users`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(jsonData),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: 'USER_LOGIN', payload: data });
          jsCookie.set('userInfo', JSON.stringify(data));
          router.push(redirect || '/');
        });
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Layout title={'Register'}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={styles.title}>Register</div>
        <div>
          <div>Username</div>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <input
                className={styles.input}
                aria-invalid={errors.username ? 'true' : 'false'}
                {...field}
              />
            )}
          />
        </div>
        <div>
          <div>Name</div>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <input className={styles.input} {...field} />
            )}
          />
        </div>
        <div>
          <div>Email</div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <input
                className={styles.input}
                aria-invalid={errors.username ? 'true' : 'false'}
                {...field}
              />
            )}
          />
        </div>
        <div>
          <div>Password</div>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <input
                className={styles.input}
                aria-invalid={errors.username ? 'true' : 'false'}
                {...field}
              />
            )}
          />
        </div>
        <div>
          <div>Confirm Password</div>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <input
                className={styles.input}
                aria-invalid={errors.username ? 'true' : 'false'}
                {...field}
              />
            )}
          />
        </div>
        <button className={styles.button_submit} type="submit">
          Submit
        </button>

        <div className={styles.register}>
          Already have an account?{' '}
          <NextLink
            className={styles.register_link}
            href={`/login?redirect=${redirect || '/'}`}
            passHref
          >
            Login
          </NextLink>
        </div>
      </form>
    </Layout>
  );
}
