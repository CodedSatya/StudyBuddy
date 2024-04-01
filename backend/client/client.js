const reg_form = document.getElementById('reg_form')
const login_form = document.getElementById('login_form')


reg_form.addEventListener('submit', (e)=> {
  e.preventDefault();
  const data = new FormData(reg_form);
  const name = data.get('name');
  const email = data.get('email');
  const password = data.get('password');
  const re_password = data.get('re_password');
  if(name === '' || email === '' || password === '' || re_password === ''){
    alert("All fields are required")
  }
  else if(password !== re_password){
    alert("passwords do not match")
  }else{
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    }).then(
      res => res.json()
    ).then(
      data => {
        if(data.message){
          alert(data.message)
        }else{
          alert("User registered successfully")
        }
      }
    ).catch(err => console.log(err))
  }
})



login_form.addEventListener('submit', (e)=> {
  e.preventDefault();
  const data = new FormData(login_form);
  const email = data.get('log_email');
  const password = data.get('log_password');
  if(email === '' || password === ''){
    alert("All fields are required")
  }
  else{
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    }).then(
      res => res.json()
    ).then(
      data => {
        if(data.message){
          alert(data.message)
          localStorage.setItem('user', JSON.stringify(data.user))
        }else{
          alert("Login successful from client side")
        }
      }
    ).catch(err => console.log(err))
  }
})


const logout = document.getElementById('logout')

logout.addEventListener('click', ()=> {
  fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(
    res => res.json()
  ).then(
    data => {
      if(data.message){
        alert(data.message)
        localStorage.removeItem('user')
      }else{
        alert("Logged out successfully")
      }
    }
  ).catch(err => console.log(err))
});