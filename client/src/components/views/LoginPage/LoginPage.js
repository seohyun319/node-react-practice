import React from 'react'

function LoginPage() {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    //usestate 치면 자동완성

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems:'center',
            width:'100%', height:'100vh'
        }}>

            <form style={{ display:'flex', flexDirection:'column'}}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Email} onChange={onPasswordHandler}/>
                <br />
                <button>
                    Login
                </button>
            </form>
            
        </div>
    )
}

export default LoginPage
