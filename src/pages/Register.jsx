import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


const Register = () => {

    const [formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        password2: '' //Confirmar que el password y password2 son iguales
    })

    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message } = useSelector((state)=>state.auth)


    useEffect(()=> {
        if (isError){
            toast.error(message)
        } 
        if (isSuccess){
            navigate('/login')
        }
        dispatch(reset())
       

    },[user, isError, isSuccess, message, navigate, dispatch])


    const onChange = (e) =>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) =>{

        e.preventDefault()

        if(password !== password2){
            toast.error('Los passwords no coinciden')
        } else{
            const userData = {
                name, 
                email, 
                password
            }

            dispatch(register(userData))
        }
    }

    if (isLoading){
        return <Spinner />
    }

  return (
    <>
        <section className="heading">
            <h1>
                <FaUser /> Registrar
            </h1>
            <p>Por favor crea tus credenciales</p>

        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="text"
                        className='form-control'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='Teclea tu nombre'
                        onChange={onChange}
                    />
                       <input 
                        type="text"
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Teclea tu email'
                        onChange={onChange}
                    />
                       <input 
                        type="password"
                        className='form-control'
                        id='password'
                        name='password'
                        value={password}
                        placeholder='Teclea tu password'
                        onChange={onChange}
                    />
                       <input 
                        type="password"
                        className='form-control'
                        id='password2'
                        name='password2'
                        value={password2}
                        placeholder='Confirma tu password'
                        onChange={onChange}
                    />

                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}



export default Register