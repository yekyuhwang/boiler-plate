import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

const RegisterPage = (props) => {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const onEmailHandler = (event) => {

        setEmail(event.currentTarget.value)
        
    }
    
    const onNamedHandler = (event) => {
    
        setName(event.currentTarget.value)
            
    }

    const onPasswordHandler = (event) => {

        setPassword(event.currentTarget.value)
        
    }

    const onConfirmHandler = (event) => {

        setConfirm(event.currentTarget.value)
        
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 페이지가 새로고침되는 것을 막아줌

        if(password !== confirm) {
            return alert("비밀번호가 다릅니다.")
        } 

        let body = {
            email: Email,
            name: name,
            password: password
        }

        // axios.post("/api/users/register", body)

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('Failed to sign up')
                }
            })
        
    }
    return (
        <div>
            <div style={{
            display: 'flex', justifyContent:' center', alignItems: 'center',
            width: '100%', height: '100vh'}}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <br />
                <label>Name</label>
                <input type="text" value={name} onChange={onNamedHandler} />
                <br />
                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler} />
                <br />
                <label>Confirm Password</label>
                <input type="password" value={confirm} onChange={onConfirmHandler} />
                <br />
                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
        </div>
    )
}

export default withRouter(RegisterPage);