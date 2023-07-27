import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import auth from "@/firebase/firebase.auth";

const LoginPage = () => {
  const [signInWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password);
  };

  console.log("user", user);
  return (
    <div>
      <Head>
        <title>Next Login</title>
      </Head>
      <div className={styles.form}>
        <h3>LOGIN</h3>
        <div className={styles.social_icons}>
          <GoogleOutlined onClick={() => signIn("google", { callbackUrl: "http://localhost:3000/" })} />
          <GithubOutlined onClick={() => signIn("github", { callbackUrl: "http://localhost:3000/" })} />
        </div>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor=''>Your Email</label>
          <input type='email' {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}

          <label htmlFor=''>Your Password</label>
          <input type='password' {...register("password", { required: true })} />
          {errors.password && <span>This field is required</span>}

          <br />

          <button style={{ padding: "5px 0", cursor: "pointer" }} type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
