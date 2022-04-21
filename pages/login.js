import { Controller, useForm } from 'react-hook-form';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import jsCookie from 'js-cookie';
import { useSnackbar } from 'notistack';
import { Store } from '../utils/Store';

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

  const submitHandler = async ({ username, password }) => {
    try {
      const jsonData = {
        username,
        password,
      };

      fetch('https://625be02350128c570208a033.mockapi.io/users', {
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
    <Layout title={'Login'}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={styles.title}>Login</div>
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
          <div>Password</div>
          <Controller
            name="pasword"
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
        <button className={styles.button_submit} type="submit">
          Submit
        </button>

        <div className={styles.register}>
          Do not have an account?{' '}
          <NextLink
            className={styles.register_link}
            href={`/register?redirect=${redirect || '/'}`}
            passHref
          >
            Register
          </NextLink>
        </div>
      </form>
    </Layout>
  );
}
