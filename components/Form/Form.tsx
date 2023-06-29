import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'
import Swal from 'sweetalert2'

import Eye from './img/Eye'
import EyeOff from './img/EyeOff'

//styles
import s from './Form.module.sass'

export default function Form({ }) {

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setErrors({})
  }, [name, email, phone, password, confirmPassword])


  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!name || name.length < 3) {
      setErrors({ ...errors, name: 'Name is required and should contain at least 3 characters' })
      return
    }

    if (!email || !validateEmail(email)) {
      setErrors({ ...errors, email: 'Email is required and should be in a valid email format.' })
      return
    }

    if (password !== confirmPassword) {
      console.log('passwords are not match')
      setErrors({ ...errors, password: 'Passwords do not match' })
      return
    }


    if (!isPasswordStrong(password)) {
      setErrors({ ...errors, password: 'Password should contain at least one uppercase letter, one lowercase letter, one special character and minimum 6 characters' })
      return
    }

    try {
      const response = await axios.post('/api/register', {
        name,
        lastName,
        phone,
        address,
        email,
        password,
        confirmPassword
      })
      console.log('Registration successful:', response.data.userData)
      router.push('/success')
    } catch (error: any) {
      console.log('Registration Error:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error! Try Again',
        text: error.message
      })
    }
  }

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const toggleConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword)
  }


  const isPasswordStrong = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[`!@#$%^&*.,\-_()+=|\\/}{'";:/?<>]).{6,}$/;
    return regex.test(password);
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9!@#$%^&*.,\\\-_()+=|\\/}{'";:/?<>]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    return regex.test(email);
  };

  return (
    <section className={s.formSection}>
      <div className={s.formWrap}>
        <form onSubmit={handleSubmit} autoComplete='none'>
          <div className={s.formGroup}>
            <label htmlFor='name'>First Name <span className={s.required}>*</span></label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? s.errorInput : ''}
            />
            {errors.name
              ? <span className={s.errorText}>{errors.name}</span>
              : ''
            }
          </div>
          <div className={s.formGroup}>
            <label htmlFor='lastname'>Last Name</label>
            <input
              id='lastname'
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={errors.lastName ? s.errorInput : ''}
            />
            {errors.lastName && <span className={s.errorText}>{errors.lastName}</span>}
          </div>
          <div className={s.formGroup}>
            <label htmlFor='address'>Your Address</label>
            <input
              id='address'
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor='email'>Email <span className={s.required}>*</span></label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? s.errorInput : ''}
            />
            {errors.email && <span className={s.errorText}>{errors.email}</span>}
          </div>
          <div className={s.formGroup}>
            <label htmlFor='phone'>Phone Number</label>
            <input
              id='phone'
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? s.errorInput : ''}
            />
            <span
              className={s.showPassword}
              onClick={togglePassword}>
              {isShowPassword
                ? <EyeOff />
                : <Eye />
              }
            </span>
            {errors.password && <span className={s.errorText}>{errors.password}</span>}
          </div>
          <div className={s.formGroup}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              id='confirmPassword'
              type={isShowConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? s.errorInput : ''}
            />
            <span
              className={s.showPassword}
              onClick={toggleConfirmPassword}>
              {isShowConfirmPassword
                ? <EyeOff />
                : <Eye />
              }
            </span>
            {errors.confirmPassword && <span className={s.errorText}>{errors.confirmPassword}</span>}
          </div>
          {errors.general && <span className={s.errorText}>{errors.general}</span>}
          <button type='submit'>Create Account</button>
        </form>
      </div>
    </section>
  );
};
