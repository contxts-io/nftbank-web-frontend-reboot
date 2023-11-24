import styles from './InputEmail.module.css';
type Props = {
  email: [string, React.Dispatch<React.SetStateAction<string>>];
};
const InputEMail = (props: Props) => {
  const [email, setEmail] = props.email;
  return (
    <div className={styles.container}>
      <span className='text-[var(--color-text-subtle)]'>Email</span>
      <input
        type='text'
        placeholder='Email Address'
        className={styles.inputText}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* <p className='text-[var(--color-text-subtle)] mt-4'>
        Looks like you already have an account.{' '}
        <span className='text-[var(--color-text-brand)] cursor-pointer'>
          Please Continue with Google.
        </span>
      </p> */}
    </div>
  );
};
export default InputEMail;
