'use client';
import { Field, Form, FormikProps, withFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { FormValues } from '@/types/custom-types';
import Loader from '@/assets/images/loader.svg';
import Image from 'next/image';

export default function SignInPage() {
  const router = useRouter();
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Слишком коротко! 5-20 символов')
      .max(20, 'Слишком много! 5-20 символов')
      .required('Необходимо заполнить'),
    password: Yup.string()
      .min(0, 'Слишком коротко! 5-20 символов')
      .max(20, 'Слишком много! 5-20 символов')
      .required('Необходимо заполнить'),
  });

  interface OtherProps {
    message: string;
  }
  const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, message } = props;
    return (
      <Form
        className={
          'flex flex-col w-80 h-auto text-center bg-slate-800 rounded-lg p-8'
        }
      >
        <h1>{message}</h1>
        <h1 className={'text-red-700'}>{errors?.error}</h1>
        <label className={'text-left mt-2'} htmlFor="username">
          Username
        </label>
        <Field
          type="text"
          name="username"
          id="username"
          className={`rounded-lg p-2  ${
            touched?.username &&
            errors?.username &&
            errors.error &&
            'border border-red-700 focus:border-0 focus:outline outline-[2px] outline-red-700'
          }`}
        />
        {touched.username && errors.username && (
          <div className={''}>{errors.username}</div>
        )}
        <label className={'text-left  mt-2'} htmlFor="password">
          Password
        </label>
        <Field
          type="password"
          name="password"
          id="password"
          className={`rounded-lg p-2  ${
            touched?.username &&
            errors?.username &&
            errors.error &&
            'border border-red-700 focus:border-0 focus:outline outline-[2px] outline-red-700'
          }`}
        />
        {touched.password && errors.password && <div>{errors.password}</div>}

        <button
          type="submit"
          className={'rounded-lg p-2 mt-2 border'}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Image
              src={Loader}
              alt={'loading...'}
              className={'p-0 overflow-hidden bg-transparent'}
              //width={52}
            />
          ) : (
            `Вход`
          )}
        </button>
      </Form>
    );
  };
  interface MyFormProps {
    username?: string;
    message: string; // if this passed all the way through you might do this or make a union type
  }

  const MyForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: (props) => {
      return {
        error: '',
        username: props.username || '',
        password: '',
      };
    },
    validationSchema: SignupSchema,
    validateOnBlur: true,
    handleSubmit: async (values, { setErrors }) => {
      const response = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false,
      });
      if (response?.ok) {
        router.push('/protected');
      } else {
        setErrors({
          error: 'Введенные данные не верны!',
        });
      }
    },
  })(InnerForm);

  return (
    <div className={'fixed h-full w-full flex items-center justify-center'}>
      <MyForm message="Вход" />
    </div>
  );

  // return (
  //   <div>
  //     <Formik
  //       validationSchema={SignupSchema}
  //       initialValues={{
  //         username: '',
  //         password: '',
  //       }}
  //       // onSubmit={async (values) => {
  //       //
  //       // }}
  //     >
  //       <Form
  //
  //       >
  //         <h1 className={'text-xl'}>Sign In</h1>
  //         {error && (
  //           <h1 className={'text-red-800'}>
  //             Ошибка авторизации. Данные не верны
  //           </h1>
  //         )}
  //         <label className={'text-left mt-2'} htmlFor="firstName">
  //           Username
  //         </label>
  //         <Field
  //           className={'rounded-lg p-2'}
  //           id="username"
  //           name="username"
  //           placeholder="Username"
  //         />
  //
  //
  //         <Field
  //
  //           id="password"
  //           name="password"
  //           placeholder="Password"
  //           type="password"
  //         />
  //
  //         <button >Submit</button>
  //       </Form>
  //     </Formik>
  //   </div>
  // );
}
